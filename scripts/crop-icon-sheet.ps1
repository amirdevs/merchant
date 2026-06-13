param(
  [Parameter(Mandatory = $true)]
  [string]$Sheet,

  [Parameter(Mandatory = $true)]
  [string]$Config,

  [Parameter(Mandatory = $true)]
  [string]$OutputRoot,

  [int]$Threshold = 215,
  [int]$MinArea = 150,
  [int]$RowTolerance = 45,
  [int]$Padding = 12,
  [int]$OutputSize = 512,
  [int]$GridColumns = 0,
  [int]$GridRows = 0,
  [int]$BackgroundTolerance = 34,
  [int]$BackgroundMinBrightness = 176,
  [int]$BackgroundColorSamples = 8,
  [double]$EdgeArtifactMaxAreaPercent = 0.04,
  [int]$ComponentMergeGap = 0
)

Add-Type -AssemblyName System.Drawing

$scannerCode = @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class IconSheetBox {
  public int X;
  public int Y;
  public int W;
  public int H;
  public int Area;
  public int Cx { get { return X + W / 2; } }
  public int Cy { get { return Y + H / 2; } }
}

public class IconSheetScanner {
  static bool IsForeground(byte[] bytes, int stride, int x, int y, int threshold) {
    int idx = y * stride + x * 3;
    byte b = bytes[idx];
    byte g = bytes[idx + 1];
    byte r = bytes[idx + 2];
    return r < threshold || g < threshold || b < threshold;
  }

  public static List<IconSheetBox> Scan(string path, int threshold, int minArea) {
    Bitmap bmp = new Bitmap(path);
    int width = bmp.Width;
    int height = bmp.Height;
    BitmapData data = bmp.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.ReadOnly, PixelFormat.Format24bppRgb);
    int stride = data.Stride;
    byte[] bytes = new byte[Math.Abs(stride) * height];
    Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);
    bmp.UnlockBits(data);
    bmp.Dispose();

    bool[] visited = new bool[width * height];
    List<IconSheetBox> boxes = new List<IconSheetBox>();
    int[] qx = new int[width * height];
    int[] qy = new int[width * height];
    int[] dx = new int[] { 1, -1, 0, 0 };
    int[] dy = new int[] { 0, 0, 1, -1 };

    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        int vi = y * width + x;
        if (visited[vi]) continue;
        visited[vi] = true;
        if (!IsForeground(bytes, stride, x, y, threshold)) continue;

        int head = 0;
        int tail = 0;
        qx[tail] = x;
        qy[tail] = y;
        tail++;

        int minX = x, maxX = x, minY = y, maxY = y, area = 0;
        while (head < tail) {
          int px = qx[head];
          int py = qy[head];
          head++;
          area++;
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;

          for (int d = 0; d < 4; d++) {
            int nx = px + dx[d];
            int ny = py + dy[d];
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            int nvi = ny * width + nx;
            if (visited[nvi]) continue;
            visited[nvi] = true;
            if (IsForeground(bytes, stride, nx, ny, threshold)) {
              qx[tail] = nx;
              qy[tail] = ny;
              tail++;
            }
          }
        }

        if (area >= minArea) {
          boxes.Add(new IconSheetBox { X = minX, Y = minY, W = maxX - minX + 1, H = maxY - minY + 1, Area = area });
        }
      }
    }

    return boxes;
  }
}
'@

if (-not ("IconSheetScanner" -as [type])) {
  Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition $scannerCode
}

$backgroundRemoverCode = @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class IconBackgroundRemover {
  struct BgColor {
    public byte R;
    public byte G;
    public byte B;
    public int Count;
  }

  static bool IsLightNeutral(byte r, byte g, byte b, int tolerance, int minBrightness) {
    int max = Math.Max(r, Math.Max(g, b));
    int min = Math.Min(r, Math.Min(g, b));
    return max >= minBrightness && (max - min) <= tolerance;
  }

  static bool IsNearSample(byte r, byte g, byte b, List<BgColor> samples, int tolerance) {
    int limit = tolerance * tolerance;
    for (int i = 0; i < samples.Count; i++) {
      int dr = r - samples[i].R;
      int dg = g - samples[i].G;
      int db = b - samples[i].B;
      if ((dr * dr) + (dg * dg) + (db * db) <= limit) return true;
    }
    return false;
  }

  static bool IsBackground(byte[] bytes, int index, int tolerance, int minBrightness, List<BgColor> samples) {
    byte b = bytes[index];
    byte g = bytes[index + 1];
    byte r = bytes[index + 2];
    byte a = bytes[index + 3];
    if (a == 0) return true;
    return IsNearSample(r, g, b, samples, tolerance) || (minBrightness <= 255 && IsLightNeutral(r, g, b, tolerance, minBrightness));
  }

  static void CountColor(Dictionary<int, BgColor> counts, byte r, byte g, byte b) {
    int qr = (r / 4) * 4;
    int qg = (g / 4) * 4;
    int qb = (b / 4) * 4;
    int key = (qr << 16) | (qg << 8) | qb;
    BgColor color;
    if (counts.TryGetValue(key, out color)) {
      color.Count++;
      counts[key] = color;
    } else {
      counts[key] = new BgColor { R = (byte)qr, G = (byte)qg, B = (byte)qb, Count = 1 };
    }
  }

  static List<BgColor> GetBorderSamples(byte[] bytes, int width, int height, int stride, int maxSamples, int tolerance, int minBrightness) {
    Dictionary<int, BgColor> counts = new Dictionary<int, BgColor>();
    Action<int, int> sample = delegate(int x, int y) {
      int idx = y * stride + x * 4;
      byte b = bytes[idx];
      byte g = bytes[idx + 1];
      byte r = bytes[idx + 2];
      byte a = bytes[idx + 3];
      if (a == 0 || minBrightness > 255 || IsLightNeutral(r, g, b, tolerance, minBrightness)) CountColor(counts, r, g, b);
    };

    for (int x = 0; x < width; x++) {
      sample(x, 0);
      sample(x, height - 1);
    }
    for (int y = 0; y < height; y++) {
      sample(0, y);
      sample(width - 1, y);
    }

    List<BgColor> colors = new List<BgColor>(counts.Values);
    colors.Sort(delegate(BgColor a, BgColor b) { return b.Count.CompareTo(a.Count); });
    if (colors.Count > maxSamples) colors.RemoveRange(maxSamples, colors.Count - maxSamples);
    return colors;
  }

  public static void Remove(Bitmap image, int tolerance, int minBrightness, int maxSamples) {
    int width = image.Width;
    int height = image.Height;
    Rectangle rect = new Rectangle(0, 0, width, height);
    BitmapData data = image.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    int stride = data.Stride;
    byte[] bytes = new byte[Math.Abs(stride) * height];
    Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);
    List<BgColor> samples = GetBorderSamples(bytes, width, height, stride, maxSamples, tolerance, minBrightness);

    bool[] visited = new bool[width * height];
    Queue<int> queue = new Queue<int>();

    Action<int, int> addSeed = delegate(int x, int y) {
      if (x < 0 || x >= width || y < 0 || y >= height) return;
      int vi = y * width + x;
      if (visited[vi]) return;
      visited[vi] = true;
      int idx = y * stride + x * 4;
      if (IsBackground(bytes, idx, tolerance, minBrightness, samples)) queue.Enqueue(vi);
    };

    for (int x = 0; x < width; x++) {
      addSeed(x, 0);
      addSeed(x, height - 1);
    }
    for (int y = 0; y < height; y++) {
      addSeed(0, y);
      addSeed(width - 1, y);
    }

    int[] dx = new int[] { 1, -1, 0, 0 };
    int[] dy = new int[] { 0, 0, 1, -1 };
    while (queue.Count > 0) {
      int vi = queue.Dequeue();
      int x = vi % width;
      int y = vi / width;
      int idx = y * stride + x * 4;
      bytes[idx] = 0;
      bytes[idx + 1] = 0;
      bytes[idx + 2] = 0;
      bytes[idx + 3] = 0;

      for (int d = 0; d < 4; d++) {
        int nx = x + dx[d];
        int ny = y + dy[d];
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        int nvi = ny * width + nx;
        if (visited[nvi]) continue;
        visited[nvi] = true;
        int nidx = ny * stride + nx * 4;
        if (IsBackground(bytes, nidx, tolerance, minBrightness, samples)) queue.Enqueue(nvi);
      }
    }

    Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);
    image.UnlockBits(data);
  }

  public static void RemoveEdgeArtifacts(Bitmap image, double maxAreaPercent) {
    if (maxAreaPercent <= 0) return;
    int width = image.Width;
    int height = image.Height;
    Rectangle rect = new Rectangle(0, 0, width, height);
    BitmapData data = image.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    int stride = data.Stride;
    byte[] bytes = new byte[Math.Abs(stride) * height];
    Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);

    bool[] visited = new bool[width * height];
    int[] qx = new int[width * height];
    int[] qy = new int[width * height];
    int[] dx = new int[] { 1, -1, 0, 0 };
    int[] dy = new int[] { 0, 0, 1, -1 };
    int maxArea = Math.Max(1, (int)(width * height * maxAreaPercent));

    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        int vi = y * width + x;
        if (visited[vi]) continue;
        visited[vi] = true;
        int idx = y * stride + x * 4;
        if (bytes[idx + 3] == 0) continue;

        int head = 0;
        int tail = 0;
        int area = 0;
        bool touchesEdge = false;
        qx[tail] = x;
        qy[tail] = y;
        tail++;

        while (head < tail) {
          int px = qx[head];
          int py = qy[head];
          head++;
          area++;
          if (px == 0 || py == 0 || px == width - 1 || py == height - 1) touchesEdge = true;

          for (int d = 0; d < 4; d++) {
            int nx = px + dx[d];
            int ny = py + dy[d];
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            int nvi = ny * width + nx;
            if (visited[nvi]) continue;
            visited[nvi] = true;
            int nidx = ny * stride + nx * 4;
            if (bytes[nidx + 3] > 0) {
              qx[tail] = nx;
              qy[tail] = ny;
              tail++;
            }
          }
        }

        if (touchesEdge && area <= maxArea) {
          for (int i = 0; i < tail; i++) {
            int px = qx[i];
            int py = qy[i];
            int pidx = py * stride + px * 4;
            bytes[pidx] = 0;
            bytes[pidx + 1] = 0;
            bytes[pidx + 2] = 0;
            bytes[pidx + 3] = 0;
          }
        }
      }
    }

    Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);
    image.UnlockBits(data);
  }
}
'@

if (-not ("IconBackgroundRemover" -as [type])) {
  Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition $backgroundRemoverCode
}

function Get-OutputRefs {
  param([string]$Path)
  $json = Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json
  $refs = New-Object System.Collections.Generic.List[string]
  foreach ($item in $json.items) {
    $outputs = $item.outputs
    foreach ($property in $outputs.PSObject.Properties) {
      $refs.Add([string]$property.Value)
    }
  }
  return $refs
}

function Get-Cells {
  param([string]$Path)
  if ($GridColumns -gt 0 -and $GridRows -gt 0) {
    $image = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $Path))
    $cellWidth = $image.Width / $GridColumns
    $cellHeight = $image.Height / $GridRows
    $gridCells = New-Object System.Collections.Generic.List[object]
    for ($row = 0; $row -lt $GridRows; $row++) {
      for ($col = 0; $col -lt $GridColumns; $col++) {
        $x = [int][Math]::Round($col * $cellWidth)
        $y = [int][Math]::Round($row * $cellHeight)
        $right = [int][Math]::Round(($col + 1) * $cellWidth)
        $bottom = [int][Math]::Round(($row + 1) * $cellHeight)
        $gridCells.Add([pscustomobject]@{
          X = $x
          Y = $y
          W = $right - $x
          H = $bottom - $y
          Area = ($right - $x) * ($bottom - $y)
          Cx = [int](($x + $right) / 2)
          Cy = [int](($y + $bottom) / 2)
        })
      }
    }
    $image.Dispose()
    return $gridCells
  }

  $boxes = [IconSheetScanner]::Scan((Resolve-Path -LiteralPath $Path), $Threshold, $MinArea)
  $rows = New-Object System.Collections.Generic.List[object]
  foreach ($box in ($boxes | Sort-Object Cy)) {
    $row = $rows | Where-Object { [Math]::Abs($_.Cy - $box.Cy) -lt $RowTolerance } | Select-Object -First 1
    if ($row) {
      [void]$row.Items.Add($box)
      $row.Cy = [Math]::Round((($row.Cy * ($row.Items.Count - 1)) + $box.Cy) / $row.Items.Count)
    } else {
      $items = New-Object System.Collections.ArrayList
      [void]$items.Add($box)
      $rows.Add([pscustomobject]@{ Cy = $box.Cy; Items = $items })
    }
  }

  $cells = New-Object System.Collections.Generic.List[object]
  foreach ($row in ($rows | Sort-Object Cy)) {
    $sortedBoxes = @($row.Items | Sort-Object X)
    if ($ComponentMergeGap -gt 0) {
      $merged = New-Object System.Collections.Generic.List[object]
      $current = $null
      foreach ($box in $sortedBoxes) {
        if (-not $current) {
          $current = [pscustomobject]@{
            X = $box.X
            Y = $box.Y
            W = $box.W
            H = $box.H
            Area = $box.Area
            Cx = $box.Cx
            Cy = $box.Cy
          }
          continue
        }
        $currentRight = $current.X + $current.W
        $gap = $box.X - $currentRight
        if ($gap -le $ComponentMergeGap) {
          $newRight = [Math]::Max($currentRight, $box.X + $box.W)
          $newBottom = [Math]::Max($current.Y + $current.H, $box.Y + $box.H)
          $current.X = [Math]::Min($current.X, $box.X)
          $current.Y = [Math]::Min($current.Y, $box.Y)
          $current.W = $newRight - $current.X
          $current.H = $newBottom - $current.Y
          $current.Area += $box.Area
          $current.Cx = [int]($current.X + ($current.W / 2))
          $current.Cy = [int]($current.Y + ($current.H / 2))
        } else {
          $merged.Add($current)
          $current = [pscustomobject]@{
            X = $box.X
            Y = $box.Y
            W = $box.W
            H = $box.H
            Area = $box.Area
            Cx = $box.Cx
            Cy = $box.Cy
          }
        }
      }
      if ($current) {
        $merged.Add($current)
      }
      $sortedBoxes = @($merged | Sort-Object X)
    }

    foreach ($box in $sortedBoxes) {
      $cells.Add($box)
    }
  }
  return $cells
}

function Save-Crop {
  param(
    [System.Drawing.Bitmap]$Source,
    [object]$Box,
    [string]$Target
  )

  $x = [Math]::Max(0, $Box.X - $Padding)
  $y = [Math]::Max(0, $Box.Y - $Padding)
  $right = [Math]::Min($Source.Width, $Box.X + $Box.W + $Padding)
  $bottom = [Math]::Min($Source.Height, $Box.Y + $Box.H + $Padding)
  $w = $right - $x
  $h = $bottom - $y

  $square = [Math]::Max($w, $h)
  $crop = New-Object System.Drawing.Bitmap $square, $square, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($crop)
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($Source, [int](($square - $w) / 2), [int](($square - $h) / 2), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()

  $out = New-Object System.Drawing.Bitmap $OutputSize, $OutputSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g2 = [System.Drawing.Graphics]::FromImage($out)
  $g2.Clear([System.Drawing.Color]::Transparent)
  $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g2.DrawImage($crop, 0, 0, $OutputSize, $OutputSize)
  $g2.Dispose()
  $crop.Dispose()

  [IconBackgroundRemover]::Remove($out, $BackgroundTolerance, $BackgroundMinBrightness, $BackgroundColorSamples)
  [IconBackgroundRemover]::RemoveEdgeArtifacts($out, $EdgeArtifactMaxAreaPercent)

  $dir = Split-Path -Parent $Target
  if ($dir -and -not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  $out.Save($Target, [System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()
}

$refs = Get-OutputRefs -Path $Config
$cells = Get-Cells -Path $Sheet
if ($cells.Count -lt $refs.Count) {
  throw "Sheet has $($cells.Count) detected cells but config requires $($refs.Count) output references."
}

$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $Sheet))
$saved = 0
$skippedDuplicate = 0
$seen = @{}

for ($i = 0; $i -lt $refs.Count; $i++) {
  $ref = $refs[$i] -replace '/', [IO.Path]::DirectorySeparatorChar
  if ($seen.ContainsKey($ref)) {
    $skippedDuplicate++
    continue
  }
  $seen[$ref] = $true
  $relative = $ref
  if ($relative.StartsWith("public$([IO.Path]::DirectorySeparatorChar)")) {
    $relative = $relative.Substring(7)
  }
  $target = Join-Path $OutputRoot $relative
  Save-Crop -Source $source -Box $cells[$i] -Target $target
  $saved++
}

$source.Dispose()

[pscustomobject]@{
  Sheet = $Sheet
  Config = $Config
  DetectedCells = $cells.Count
  RequiredRefs = $refs.Count
  Saved = $saved
  SkippedDuplicateOutputs = $skippedDuplicate
  IgnoredExtraCells = $cells.Count - $refs.Count
}
