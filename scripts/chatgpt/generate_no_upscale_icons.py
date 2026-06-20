from __future__ import annotations

import csv, json, re, shutil
from collections import deque
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

ROOT=Path('.')
PROMPTS=ROOT/'docs/assets/icon-prompts'
SHEETS=ROOT/'docs/assets/icon-sheets'
OUT=ROOT/'public/game-assets/items'
TRACE=ROOT/'docs/assets/icon-sheets/no-upscale-clean'
QA=TRACE/'qa-boards'
TARGET=256
ALLOW=json.loads((PROMPTS/'few-variant-allowlist.json').read_text()) if (PROMPTS/'few-variant-allowlist.json').exists() else {}
AO=set(ALLOW.get('allowedOutputPaths') or [])
AN=set(ALLOW.get('allowedItemNames') or [])
AF=set(ALLOW.get('allowedFamilies') or [])
AS=set(ALLOW.get('allowedSubfamilies') or [])
AT=set(ALLOW.get('allowedTags') or [])

def norm(raw):
    s=str(raw or '').replace('\\','/').strip()
    if not s: return ''
    if not s.endswith('.png'): s+='.png'
    if s.startswith('public/game-assets/items/'): return s
    if s.startswith('game-assets/items/'): return 'public/'+s
    if s.startswith('items/'): return 'public/game-assets/'+s
    if s.startswith('public/'): return s
    return 'public/game-assets/items/'+s

def slug(x):
    s=re.sub(r'[^a-z0-9._/-]+','-',str(x or 'item').lower()).strip('-')
    return re.sub('-+','-',s) or 'item'

def slots(data):
    out=[]
    for it in (data.get('slots') or data.get('order') or data.get('items') or []):
        if isinstance(it,str):
            p=norm(it); out.append({'name':Path(p).stem,'output':p}); continue
        if isinstance(it,dict):
            p=it.get('output') or it.get('outputPath') or it.get('output_path') or it.get('path') or it.get('filename') or it.get('file') or it.get('id') or slug(it.get('name') or it.get('itemName') or it.get('title'))
            x=dict(it); x['output']=norm(p); out.append(x)
    return out

def name(s):
    return str(s.get('itemName') or s.get('name') or s.get('title') or s.get('id') or Path(s.get('output','')).stem)

def variant(s):
    v=str(s.get('variant') or s.get('quantityVariant') or '').lower().strip()
    o=str(s.get('output') or '').lower(); n=name(s).lower()
    if v: return v
    if '__few' in o or o.endswith('-few.png') or ' few' in n: return 'few'
    if '__many' in o or o.endswith('-many.png') or ' many' in n: return 'many'
    return 'one'

def allow_few(s):
    o=s.get('output') or ''; rel=o.replace('public/game-assets/items/',''); stem=Path(o).stem
    fam=str(s.get('family') or s.get('category') or ''); sub=str(s.get('subfamily') or s.get('subCategory') or '')
    tags={str(t) for t in (s.get('tags') or [])}
    return o in AO or rel in AO or stem in AO or name(s) in AN or stem in AN or fam in AF or sub in AS or bool(tags & AT)

def box(sz,i):
    w,h=sz; c=i%10; r=i//10
    return round(c*w/10),round(r*h/5),round((c+1)*w/10),round((r+1)*h/5)

def green(a):
    rgb=a[:,:,:3].astype(np.int16); al=a[:,:,3]>0; r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
    return al & (((g>225)&(r<70)&(b<70)) | ((g>165)&(g>r+70)&(g>b+70)&(r<135)&(b<135)))

def edge(m):
    h,w=m.shape; out=np.zeros_like(m,bool); q=deque()
    def add(x,y):
        if m[y,x] and not out[y,x]: out[y,x]=1; q.append((x,y))
    for x in range(w): add(x,0); add(x,h-1)
    for y in range(h): add(0,y); add(w-1,y)
    while q:
        x,y=q.popleft()
        for nx,ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
            if 0<=nx<w and 0<=ny<h: add(nx,ny)
    return out

def center(im):
    im=im.convert('RGBA'); bb=im.getbbox()
    if not bb: return Image.new('RGBA',(TARGET,TARGET),(0,0,0,0))
    im=im.crop(bb); scale=min((TARGET-32)/max(im.width,1),(TARGET-32)/max(im.height,1),1.0)
    ns=(max(1,round(im.width*scale)),max(1,round(im.height*scale)))
    if ns!=im.size: im=im.resize(ns,Image.Resampling.LANCZOS)
    cv=Image.new('RGBA',(TARGET,TARGET),(0,0,0,0)); cv.alpha_composite(im,((TARGET-im.width)//2,(TARGET-im.height)//2)); return cv

def crop(sheet,i):
    x0,y0,x1,y1=box(sheet.size,i); pad=int(min(x1-x0,y1-y0)*.18)
    rx0,ry0=max(0,x0-pad),max(0,y0-pad); rx1,ry1=min(sheet.width,x1+pad),min(sheet.height,y1+pad)
    reg=sheet.crop((rx0,ry0,rx1,ry1)).convert('RGBA'); a=np.array(reg); eg=edge(green(a)); vis=(a[:,:,3]>5)&(~eg)
    tx0,ty0,tx1,ty1=x0-rx0,y0-ry0,x1-rx0,y1-ry0; cv=np.zeros_like(vis,bool); cv[ty0:ty1,tx0:tx1]=vis[ty0:ty1,tx0:tx1]
    use=cv if cv.any() else vis
    if not use.any(): return center(sheet.crop((x0,y0,x1,y1)).convert('RGBA')),'FALLBACK',0
    ys,xs=np.where(use); m=12; bx0,by0=max(0,xs.min()-m),max(0,ys.min()-m); bx1,by1=min(reg.width,xs.max()+m+1),min(reg.height,ys.max()+m+1)
    cut=a[by0:by1,bx0:bx1].copy(); ceg=edge(green(cut)); removed=int(ceg.sum()); cut[ceg,3]=0
    return center(Image.fromarray(cut,'RGBA')),'PASS',removed

def qa(cfg,thumbs):
    cell=88; pad=6; lab=24; board=Image.new('RGB',(10*(cell+pad)+pad,5*(cell+lab+pad)+pad),(35,35,35)); d=ImageDraw.Draw(board)
    for j,(idx,im,st,nm) in enumerate(thumbs[:50]):
        x=pad+(j%10)*(cell+pad); y=pad+(j//10)*(cell+lab+pad); bg=Image.new('RGB',(cell,cell),(210,210,210)); p=im.copy(); p.thumbnail((cell,cell)); bg.paste(p,((cell-p.width)//2,(cell-p.height)//2),p); board.paste(bg,(x,y)); d.rectangle([x,y,x+cell-1,y+cell-1],outline=(60,210,80) if st=='PASS' else (255,180,60),width=2); d.text((x,y+cell+2),f'{idx:02d} {nm[:14]}',fill=(240,240,240))
    board.save(QA/f'{cfg}-qa.jpg',quality=88)

def main():
    shutil.rmtree(OUT,ignore_errors=True); shutil.rmtree(TRACE,ignore_errors=True); OUT.mkdir(parents=True,exist_ok=True); QA.mkdir(parents=True,exist_ok=True)
    rows=[]; summary=[]; written=skip=fail=total=processed=0
    for cfg in sorted(p for p in PROMPTS.glob('items-*.json') if p.name!='few-variant-allowlist.json'):
        sl=slots(json.loads(cfg.read_text())); total+=len(sl); sp=SHEETS/f'{cfg.stem}.png'
        if not sp.exists(): fail+=1; summary.append([cfg.stem,'FAIL',0,0,'missing sheet']); continue
        sheet=Image.open(sp).convert('RGBA'); processed+=1; tw=ts=warn=0; thumbs=[]
        for i,s in enumerate(sl[:50]):
            v=variant(s); out=s.get('output')
            if v=='few' and not allow_few(s): skip+=1; ts+=1; rows.append([cfg.stem,i+1,'SKIP_FEW',name(s),v,out,0]); continue
            im,st,rm=crop(sheet,i); dest=ROOT/out; dest.parent.mkdir(parents=True,exist_ok=True); im.save(dest,'PNG',optimize=True); written+=1; tw+=1; warn+= st!='PASS'; rows.append([cfg.stem,i+1,st,name(s),v,out,rm]); thumbs.append((i+1,im,st,Path(out).name))
        qa(cfg.stem,thumbs); summary.append([cfg.stem,'PASS' if warn==0 else 'WARN',tw,ts,f'warnings={warn}'])
    with (TRACE/'NO_UPSCALE_CROP_REPORT.csv').open('w',newline='',encoding='utf-8') as f: csv.writer(f).writerows([['config','slot','status','name','variant','output','removed_edge_green_pixels'],*rows])
    with (TRACE/'NO_UPSCALE_SUMMARY.csv').open('w',newline='',encoding='utf-8') as f: csv.writer(f).writerows([['config','status','written','skipped_few','detail'],*summary])
    q=len(list(QA.glob('*-qa.jpg')))
    report=f'# No-Upscale Item Icon Generation Report\n\n- Prompt config sheets processed: {processed}\n- Input slots found: {total}\n- Icons written: {written}\n- Few variants skipped: {skip}\n- Final icon size: {TARGET}x{TARGET} PNG\n- Upscaling: disabled\n- Background cleanup: edge-connected green only\n- Failed/missing sheets: {fail}\n- QA boards: {q}\n\nThis pass keeps one and many by default and skips few unless allowed in few-variant-allowlist.json.\n'
    (TRACE/'NO_UPSCALE_CROP_REPORT.md').write_text(report,encoding='utf-8'); print(report)
    if written<3000: raise SystemExit(f'Too few icons written: {written}')
    if fail: raise SystemExit(f'Missing sheets: {fail}')
if __name__=='__main__': main()
