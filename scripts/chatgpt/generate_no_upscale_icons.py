from pathlib import Path
from collections import deque
import csv, json, re, shutil
import numpy as np
from PIL import Image, ImageDraw

ROOT=Path('.')
PROMPTS=ROOT/'docs/assets/icon-prompts'
SHEETS=ROOT/'docs/assets/icon-sheets'
OUT=ROOT/'public/game-assets/items'
TRACE=SHEETS/'no-upscale-clean'
QA=TRACE/'qa-boards'
SIZE=256
ALLOW=json.loads((PROMPTS/'few-variant-allowlist.json').read_text()) if (PROMPTS/'few-variant-allowlist.json').exists() else {}
SETS={k:set(ALLOW.get(k) or []) for k in ['allowedOutputPaths','allowedItemNames','allowedFamilies','allowedSubfamilies','allowedTags']}

def clean_name(s):
    s=re.sub(r'[^a-z0-9._/-]+','-',str(s or 'item').lower()).strip('-')
    return s or 'item'

def out_path(v):
    s=str(v or '').replace('\\','/').strip()
    if not s: return ''
    if not s.endswith('.png'): s+='.png'
    if s.startswith('public/game-assets/items/'): return s
    if s.startswith('game-assets/items/'): return 'public/'+s
    if s.startswith('items/'): return 'public/game-assets/'+s
    if s.startswith('public/'): return s
    return 'public/game-assets/items/'+s

def slots(data):
    raw=data.get('slots') or data.get('order') or data.get('items') or []
    res=[]
    for x in raw:
        if isinstance(x,str):
            p=out_path(x); res.append({'name':Path(p).stem,'output':p})
        elif isinstance(x,dict):
            p=x.get('output') or x.get('outputPath') or x.get('output_path') or x.get('path') or x.get('filename') or x.get('file') or x.get('id') or clean_name(x.get('name') or x.get('itemName') or x.get('title'))
            y=dict(x); y['output']=out_path(p); res.append(y)
    return res

def name(s): return str(s.get('itemName') or s.get('name') or s.get('title') or s.get('id') or Path(s.get('output','')).stem)
def variant(s):
    v=str(s.get('variant') or s.get('quantityVariant') or '').lower().strip()
    if v: return v
    o=str(s.get('output') or '').lower(); n=name(s).lower()
    if '__few' in o or '-few.png' in o or ' few' in n: return 'few'
    if '__many' in o or '-many.png' in o or ' many' in n: return 'many'
    return 'one'
def allow_few(s):
    o=s.get('output') or ''; rel=o.replace('public/game-assets/items/',''); stem=Path(o).stem
    tags={str(t) for t in (s.get('tags') or [])}
    return o in SETS['allowedOutputPaths'] or rel in SETS['allowedOutputPaths'] or stem in SETS['allowedOutputPaths'] or name(s) in SETS['allowedItemNames'] or stem in SETS['allowedItemNames'] or str(s.get('family') or s.get('category') or '') in SETS['allowedFamilies'] or str(s.get('subfamily') or s.get('subCategory') or '') in SETS['allowedSubfamilies'] or bool(tags & SETS['allowedTags'])

def box(size,i):
    w,h=size; c=i%10; r=i//10
    return round(c*w/10),round(r*h/5),round((c+1)*w/10),round((r+1)*h/5)

def gmask(a):
    r=a[:,:,0].astype(int); g=a[:,:,1].astype(int); b=a[:,:,2].astype(int); al=a[:,:,3]>0
    return al & (g>170) & (g>r+65) & (g>b+65) & (r<155) & (b<155)

def edge(m):
    h,w=m.shape; out=np.zeros_like(m,bool); q=deque()
    for x in range(w):
        for y in (0,h-1):
            if m[y,x] and not out[y,x]: out[y,x]=1; q.append((x,y))
    for y in range(h):
        for x in (0,w-1):
            if m[y,x] and not out[y,x]: out[y,x]=1; q.append((x,y))
    while q:
        x,y=q.popleft()
        for nx,ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
            if 0<=nx<w and 0<=ny<h and m[ny,nx] and not out[ny,nx]: out[ny,nx]=1; q.append((nx,ny))
    return out

def center(im):
    bb=im.getbbox(); can=Image.new('RGBA',(SIZE,SIZE),(0,0,0,0))
    if not bb: return can
    im=im.crop(bb); sc=min((SIZE-32)/max(1,im.width),(SIZE-32)/max(1,im.height),1)
    nw,nh=max(1,round(im.width*sc)),max(1,round(im.height*sc))
    if (nw,nh)!=im.size: im=im.resize((nw,nh),Image.Resampling.LANCZOS)
    can.alpha_composite(im,((SIZE-nw)//2,(SIZE-nh)//2)); return can

def crop(sheet,i):
    x0,y0,x1,y1=box(sheet.size,i); cw=x1-x0; ch=y1-y0; p=int(min(cw,ch)*.16)
    rx0,ry0=max(0,x0-p),max(0,y0-p); rx1,ry1=min(sheet.width,x1+p),min(sheet.height,y1+p)
    im=sheet.crop((rx0,ry0,rx1,ry1)).convert('RGBA'); a=np.array(im); eg=edge(gmask(a)); vis=(a[:,:,3]>5)&(~eg)
    tx0,ty0,tx1,ty1=x0-rx0,y0-ry0,x1-rx0,y1-ry0; focus=np.zeros_like(vis,bool); focus[ty0:ty1,tx0:tx1]=vis[ty0:ty1,tx0:tx1]
    if not focus.any(): focus=vis
    if not focus.any(): return center(sheet.crop((x0,y0,x1,y1)).convert('RGBA')),'FAIL_EMPTY'
    ys,xs=np.where(focus); bx0,by0=max(0,xs.min()-10),max(0,ys.min()-10); bx1,by1=min(im.width,xs.max()+11),min(im.height,ys.max()+11)
    cut=a[by0:by1,bx0:bx1].copy(); cut[eg[by0:by1,bx0:bx1],3]=0
    return center(Image.fromarray(cut,'RGBA')),'PASS'

def qa(name_,imgs):
    W=10*112+8; H=max(1,(len(imgs)+9)//10)*138+8; b=Image.new('RGB',(W,H),(35,35,35)); d=ImageDraw.Draw(b)
    for j,(n,im,st,fn) in enumerate(imgs):
        x=8+(j%10)*112; y=8+(j//10)*138; bg=Image.new('RGB',(104,104),(220,220,220)); bg.alpha_composite(im.resize((104,104)).convert('RGBA'))
        b.paste(bg,(x,y)); d.rectangle([x,y,x+103,y+103],outline=(20,160,60) if st=='PASS' else (210,40,30),width=3); d.text((x+2,y+108),f'{n} {fn[:12]}',fill=(255,255,255))
    b.save(QA/f'{name_}-qa.jpg',quality=88)

def main():
    shutil.rmtree(OUT,ignore_errors=True); shutil.rmtree(TRACE,ignore_errors=True); OUT.mkdir(parents=True,exist_ok=True); QA.mkdir(parents=True,exist_ok=True)
    rec=[]; sh=sl=wr=sk=fail=0
    for cfg in sorted(p for p in PROMPTS.glob('items-*.json') if p.name!='few-variant-allowlist.json'):
        ss=slots(json.loads(cfg.read_text())); sl+=len(ss); sp=SHEETS/f'{cfg.stem}.png'
        if not sp.exists(): fail+=1; rec.append([cfg.stem,0,'FAIL_MISSING_SHEET','','',str(sp)]); continue
        sh+=1; sheet=Image.open(sp).convert('RGBA'); thumbs=[]
        for i,s in enumerate(ss[:50]):
            v=variant(s); op=s['output']
            if v=='few' and not allow_few(s): sk+=1; rec.append([cfg.stem,i+1,'SKIP_FEW',name(s),v,op]); continue
            im,st=crop(sheet,i); dest=ROOT/op; dest.parent.mkdir(parents=True,exist_ok=True); im.save(dest,'PNG',optimize=True); wr+=1; fail+=0 if st=='PASS' else 1; rec.append([cfg.stem,i+1,st,name(s),v,op]); thumbs.append((i+1,im,st,Path(op).name))
        qa(cfg.stem,thumbs)
    (TRACE/'NO_UPSCALE_CLEAN_REPORT.md').write_text(f'# No-upscale clean item icon report\n\n- Prompt sheets processed: {sh}\n- Input slots: {sl}\n- Icons written: {wr}\n- Few variants skipped: {sk}\n- Failed/warning crops: {fail}\n- Output size: {SIZE}x{SIZE}\n- Upscaling: disabled\n- Cleanup: edge-connected green only; interior pixels preserved\n- Old output folder cleared before generation\n',encoding='utf-8')
    with (TRACE/'no_upscale_clean_manifest.csv').open('w',newline='',encoding='utf-8') as f: csv.writer(f).writerows([['sheet','slot','status','name','variant','output'],*rec])
    if fail: raise SystemExit(f'failures={fail}')
    if wr < sl-sk or wr < 3000: raise SystemExit(f'icon count too low: {wr}')
    print(f'OK sheets={sh} slots={sl} written={wr} skipped_few={sk}')
if __name__=='__main__': main()
