import os,sys
from PIL import Image
S='/home/claude/audit/img'; D='public/media'
M={
 'ritratto-poltrona':'MAT05119-Modifica.jpg','ritratto-piedi':'MAT05192-Modifica-2.jpg',
 'studio-attesa':'MAT02847-HDR.jpg','studio-lounge':'MAT02867-HDR.jpg','studio-operativa-faccette':'MAT02927-HDR.jpg',
 'studio-sterilizzazione':'MAT02932-HDR.jpg','studio-operativa-legno':'MAT02942-HDR.jpg','studio-ingresso':'MAT03006-HDR.jpg',
 'studio-operativa-itero':'MAT03011-HDR.jpg','studio-operativa-prugna':'MAT03026-HDR.jpg','studio-direzione':'MAT03036-HDR.jpg','studio-reception':'MAT03057-HDR.jpg',
 'prima':'bbb.jpg','dopo':'aaa.jpg',
 't-invisalign':'photo_5773675243129389340_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-faccette':'faccette-dentali-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-sbiancamento':'IMG_2146-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-igiene':'igiene-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-ortodonzia':'ortodonzia3-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-gnatologia':'photo_5769415004938945655_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-pedodonzia':'IMG_2143-scaled-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-conservativa':'photo_5769415004938945596_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-endodonzia':'photo_5769415004938945662_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-parodontologia':'photo_5769415004938945654_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-implantologia':'photo_5769415004938945658_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-protesi-fissa':'photo_5769415004938945657_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-protesi-mobile':'photo_5769415004938945656_y-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-chirurgia':'chirurgia-orale3-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
 't-impronta-digitale':'Untitled-2-r84owgv6za6ltwb26ngqvrxvtele8fx6nlcz0kamqo.png',
}
out={}
for k,f in M.items():
  im=Image.open(os.path.join(S,f)).convert('RGB'); w,h=im.size; ws=[]
  for W in (640,1280,1920):
    if W>w and ws: break
    W2=min(W,w); r=im.resize((W2,round(h*W2/w)),Image.LANCZOS)
    r.save(f'{D}/{k}-{W}.webp','WEBP',quality=78,method=6); ws.append(W)
  out[k]=(w,h,ws)
import json; json.dump(out,open('scripts/media.json','w'),indent=0)
print(json.dumps(out))
