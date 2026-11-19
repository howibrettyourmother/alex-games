// ================= v1.4: Color & Draw (big-tap fill, crayons, free drawing) and the Fridge gallery =================
// pages are made from the game's own art: drawn once into a 512px canvas, then turned into black outlines (edge detect), so every part is a fill region
const ART_N=768,ART_LW=7,CRAY=['#ff5c9e','#ff8a65','#ffd54f','#81c784','#4fc3f7','#7e57c2','#f48fb1','#a1887f','#ffffff','#90a4ae','#ffb74d','#212121'];
// v1.4.1: hand-drawn vector pages in a 512 box, bold fully-closed outlines (no edge detection, so no gaps)
const PG={E(x,cx,cy,rx,ry,r){x.beginPath();x.ellipse(cx,cy,rx,ry,r||0,0,TAU);x.stroke()},C(x,cx,cy,r){x.beginPath();x.arc(cx,cy,r,0,TAU);x.stroke()},
  P(x,pts){x.beginPath();x.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)x.lineTo(pts[i],pts[i+1]);x.closePath();x.stroke()},
  L(x,pts){x.beginPath();x.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)x.lineTo(pts[i],pts[i+1]);x.stroke()},
  catFace(x,cx,cy,k,bow){const E=PG.E,C=PG.C,P=PG.P,L=PG.L;x.save();x.translate(cx,cy);x.scale(k,k);
    P(x,[-150,-40,-120,-190,-40,-110]);P(x,[150,-40,120,-190,40,-110]);P(x,[-125,-75,-112,-150,-70,-110]);P(x,[125,-75,112,-150,70,-110]);
    E(x,0,0,165,135);E(x,-60,-15,32,38);E(x,60,-15,32,38);C(x,-52,-25,11);C(x,68,-25,11);P(x,[-18,38,18,38,0,58]);
    L(x,[0,58,0,72]);x.beginPath();x.arc(-18,72,18,0,Math.PI);x.stroke();x.beginPath();x.arc(18,72,18,0,Math.PI);x.stroke();
    E(x,-110,45,24,16);E(x,110,45,24,16);L(x,[-60,55,-150,40]);L(x,[-60,68,-150,75]);L(x,[60,55,150,40]);L(x,[60,68,150,75]);
    if(bow){P(x,[0,-125,-60,-165,-60,-95]);P(x,[0,-125,60,-165,60,-95]);C(x,0,-128,16)}x.restore()},
  catBody(x){const E=PG.E,C=PG.C,P=PG.P;x.beginPath();x.moveTo(330,430);x.bezierCurveTo(470,420,470,250,410,230);x.stroke();
    x.beginPath();x.moveTo(400,236);x.bezierCurveTo(440,250,450,400,330,410);x.stroke();
    E(x,256,350,120,110);E(x,256,370,62,72);E(x,200,455,42,26);E(x,312,455,42,26)}};
const PAGES=[['Doodle',x=>{PG.catFace(x,256,280,1.35,1);PG.C(x,70,70,30);PG.C(x,450,460,26)}],
  ['Zoe',x=>{const E=PG.E,C=PG.C,P=PG.P,L=PG.L;E(x,256,250,190,200);E(x,256,280,140,150);P(x,[120,200,180,120,330,110,395,200,300,165,210,170]);
    E(x,80,330,40,90);E(x,432,330,40,90);E(x,205,270,24,30);E(x,307,270,24,30);C(x,210,262,8);C(x,312,262,8);E(x,170,330,22,14);E(x,342,330,22,14);
    x.beginPath();x.arc(256,330,45,0.15*Math.PI,0.85*Math.PI);x.stroke();L(x,[256,295,248,312,262,312]);
    P(x,[256,85,170,40,170,130]);P(x,[256,85,342,40,342,130]);C(x,256,85,22);x.beginPath();x.moveTo(140,420);x.lineTo(110,500);x.lineTo(402,500);x.lineTo(372,420);x.stroke()}],
  ['Kitty',x=>{PG.catBody(x);PG.catFace(x,256,175,0.95,0)}],
  ['Doodle and Zoe',x=>{PG.catFace(x,150,320,0.72,1);const E=PG.E,C=PG.C,P=PG.P;E(x,370,320,105,115);E(x,370,345,78,82);P(x,[285,290,320,230,420,225,455,290,400,265,330,270]);
    C(x,345,335,9);C(x,395,335,9);x.beginPath();x.arc(370,370,24,0.15*Math.PI,0.85*Math.PI);x.stroke();
    x.beginPath();x.moveTo(256,130);x.bezierCurveTo(200,60,120,110,256,200);x.bezierCurveTo(392,110,312,60,256,130);x.stroke();C(x,80,80,24);C(x,440,90,20);C(x,256,470,22)}],
  ['Blank page',null]];
function pageInk(x,f,sc,lw){x.save();x.scale(sc,sc);x.strokeStyle='#2a1e32';x.lineWidth=lw;x.lineCap='round';x.lineJoin='round';try{f(x)}catch(e){console.error(e)}x.restore()}
let AR=null;
function artMake(i){const N=ART_N,pc=document.createElement('canvas');pc.width=pc.height=N;const px=pc.getContext('2d');px.fillStyle='#fff';px.fillRect(0,0,N,N);
  const lc=document.createElement('canvas');lc.width=lc.height=N;const f=PAGES[i][1];let mask=null,wall=null;
  if(f){const lx=lc.getContext('2d');pageInk(lx,f,N/512,ART_LW);const d=lx.getImageData(0,0,N,N).data;mask=new Uint8Array(N*N);for(let p=0;p<N*N;p++)if(d[p*4+3]>40)mask[p]=1;
    // gap-closing: fill walls = line mask dilated 2px
    wall=mask.slice();for(let it=0;it<2;it++){const w2=wall.slice();for(let y=1;y<N-1;y++)for(let x=1;x<N-1;x++){const p=y*N+x;if(!wall[p]&&(wall[p-1]||wall[p+1]||wall[p-N]||wall[p+N]))w2[p]=1}wall=w2}
    for(let k=0;k<N;k++){wall[k]=wall[(N-1)*N+k]=wall[k*N]=wall[k*N+N-1]=1}}
  return{pc,px,lc,mask,wall,undo:[]}}
function artFill(sx,sy,col){const a=AR.a,N=ART_N,W2=a.wall;if(!W2)return false;sx|=0;sy|=0;if(sx<0||sy<0||sx>=N||sy>=N||W2[sy*N+sx])return false;
  const seen=new Uint8Array(N*N),st=[sy*N+sx];let cnt=0;seen[sy*N+sx]=1;
  while(st.length){const p=st.pop();cnt++;for(const q of [p-1,p+1,p-N,p+N])if(!seen[q]&&!W2[q]){seen[q]=1;st.push(q)}}
  if(cnt>N*N*0.6)return 'big';
  // grow the region under the ink (3px) so no white seams show along the outlines
  for(let it=0;it<4;it++){const add=[];for(let p=N;p<N*N-N;p++)if(!seen[p]&&W2[p]&&(seen[p-1]===1||seen[p+1]===1||seen[p-N]===1||seen[p+N]===1))add.push(p);for(const p of add)seen[p]=1}
  const img=a.px.getImageData(0,0,N,N),d=img.data,c=parseInt(col.slice(1),16),cr=c>>16&255,cg=c>>8&255,cb=c&255;
  for(let p=0;p<N*N;p++)if(seen[p]){const q=p*4;d[q]=cr;d[q+1]=cg;d[q+2]=cb}a.px.putImageData(img,0,0);return true}
function artSnap(){const a=AR.a;try{a.undo.push(a.px.getImageData(0,0,ART_N,ART_N));if(a.undo.length>3)a.undo.shift()}catch(e){}}
SCR.art={open(){AR={page:-1,col:0,tool:0,last:null,draw:null,saved:0};AUD.setTheme('home');sayT('Color and draw! Pick a picture!',2)},close(){AR=null},
  back(){if(AR&&AR.page>=0){AR.page=-1;AR.a=null;sayT('Pick a picture!',1);return true}return false},
  down(p,id){if(!AR||AR.page<0)return;const r=artRect();if(!inR(p,r))return;const u=(p.x-r.x)/r.w*ART_N,v=(p.y-r.y)/r.h*ART_N;AR.saved=0;
    if(AR.tool===0&&AR.a.mask){artSnap();const fr=artFill(u,v,CRAY[AR.col]);if(fr==='big'){AR.a.undo.pop();AUD.SFX.boing();sayT('Oops! Tap inside a shape!',1)}else if(fr){AUD.SFX.pop();if(R()<0.3)sayT(pick(['Pretty!','Beautiful!','Ooh, nice color!']),1)}else AR.a.undo.pop()}
    else{artSnap();AR.draw={id,u,v};const x=AR.a.px;x.fillStyle=CRAY[AR.col];x.beginPath();x.arc(u,v,13,0,TAU);x.fill()}},
  move(p,id){const d=AR&&AR.draw;if(!d||d.id!==id)return;const r=artRect(),u=(p.x-r.x)/r.w*ART_N,v=(p.y-r.y)/r.h*ART_N,x=AR.a.px;x.strokeStyle=CRAY[AR.col];x.lineWidth=27;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(d.u,d.v);x.lineTo(u,v);x.stroke();d.u=u;d.v=v},
  up(p,id){if(AR&&AR.draw&&AR.draw.id===id)AR.draw=null}};
function artRect(){const L=XL(),side=Math.max(76,PT(60));if(L.land){const top=TOP+L.bb+16,s=Math.min(H-top-Math.max(BOT,8)-12,W-INL-INR-2*side*2-60);return{x:W/2-s/2,y:top,w:s,h:s,side}}
  const top=TOP+L.bb+Math.max(64,PT(46))+36,s=Math.min(W-INL-INR-24,H-top-Math.max(BOT,8)-side*1.5-30);return{x:W/2-s/2,y:top,w:s,h:s,side}}
function fridgeLoad(){try{return JSON.parse(LS.get('fridge','[]'))||[]}catch(e){return[]}}
function fridgeSave(){const a=AR.a,c=document.createElement('canvas');c.width=c.height=300;const x=c.getContext('2d');x.drawImage(a.pc,0,0,300,300);x.drawImage(a.lc,0,0,300,300);
  let url;try{url=c.toDataURL('image/jpeg',0.72)}catch(e){return}let f=fridgeLoad();f.push(url);while(f.length>12)f.shift();
  for(let tries=0;tries<8&&f.length;tries++){try{localStorage.setItem('adba_fridge',JSON.stringify(f));break}catch(e){f.shift()}}FRIMG={}}
function backBtn2(label){bigBack(label);UI[UI.length-1].fn=goBack}
XS.art={draw(){UI=[];softBg('#fffde7','#fce4ec');const L=XL();
    if(AR&&AR.page<0){xHead('Color & Draw','#ef6c00');const n=PAGES.length,cols=L.land?5:3,rows=Math.ceil(n/cols),gap=16,top=TOP+L.bb+30,bot=H-Math.max(BOT,8)-16,ts=Math.min((W-INL-INR-30-gap*(cols-1))/cols,(bot-top-gap*(rows-1))/rows,190);
      PAGES.forEach(([nm,f],i)=>{const r=(i/cols)|0,inRow=Math.min(cols,n-r*cols),x=W/2-(inRow*ts+(inRow-1)*gap)/2+(i%cols)*(ts+gap),y=top+r*(ts+gap);X.fillStyle='rgba(120,60,140,0.15)';rrect(x+2,y+5,ts,ts,20);X.fill();X.fillStyle='#fff';rrect(x,y,ts,ts,20);X.fill();
        if(f){X.save();X.beginPath();rrect(x,y,ts,ts,20);X.clip();X.translate(x+ts*0.06,y+ts*0.02);pageInk(X,f,ts*0.88/512,ART_LW*1.3);X.restore()}else{txt('🖍️',x+ts/2,y+ts*0.45,ts*0.4,'#000')}
        txt(nm,x+ts/2,y+ts-16,Math.min(17,ts/9),'#7b3fa0');btn('page'+i,x,y,ts,ts,()=>{AR.page=i;AR.a=artMake(i);AR.tool=f?0:1;sayT(f?'Tap to fill with color!':'Draw with your finger!',2)})});
      bigBack();return}
    if(!AR){bigBack();return}const r=artRect(),a=AR.a;X.fillStyle='rgba(120,60,140,0.18)';rrect(r.x+3,r.y+6,r.w,r.h,14);X.fill();X.save();rrect(r.x,r.y,r.w,r.h,14);X.clip();X.drawImage(a.pc,r.x,r.y,r.w,r.h);if(a.mask)X.drawImage(a.lc,r.x,r.y,r.w,r.h);X.restore();
    // crayons
    const s=r.side,nc=CRAY.length;let pos;if(L.land){const per=Math.ceil(nc/2),cs=Math.min(s,(H-TOP-L.bb-40)/per-6);pos=i=>({x:i<per?r.x-2*cs-30:r.x+r.w+20+cs+10,y:TOP+L.bb+16+(i%per)*(cs+6),s:cs})}else{const per=Math.ceil(nc/2),cs=Math.min(s*0.8,(W-INL-INR-20)/per-6);pos=i=>({x:W/2-(per*(cs+6))/2+(i%per)*(cs+6),y:(i<per?r.y+r.h+12:r.y+r.h+18+cs),s:cs})}
    CRAY.forEach((c,i)=>{const q=pos(i),on=i===AR.col;X.save();X.translate(q.x+q.s/2,q.y+q.s/2);if(on)X.scale(1.12,1.12);X.fillStyle=on?'#7b3fa0':'rgba(255,255,255,0.9)';rrect(-q.s/2,-q.s/2,q.s,q.s,14);X.fill();
      X.fillStyle=c;rrect(-q.s*0.18,-q.s*0.36,q.s*0.36,q.s*0.62,5);X.fill();poly([-q.s*0.18,-q.s*0.36,q.s*0.18,-q.s*0.36,0,-q.s*0.5],c);X.restore();btn('cray'+i,q.x,q.y,q.s,q.s,()=>{AR.col=i;AUD.SFX.click()})});
    // tools (top row): fill, crayon, undo, fridge
    const tl=[[a.mask?'🪣':null,()=>{AR.tool=0;sayT('Fill!',1)}],['🖍️',()=>{AR.tool=1;sayT('Crayon!',1)}],['↩️',()=>{const u=a.undo.pop();if(u){a.px.putImageData(u,0,0);AUD.SFX.pat()}}],['🧲',()=>{if(AR.saved)return;fridgeSave();AR.saved=1;AUD.SFX.sticker();sConf(40);sayT('Your picture is on the fridge!',2)}]].filter(t=>t[0]);
    const tb=Math.max(64,PT(46));const tY=L.land?TOP+12:TOP+L.bb+22,tX0=L.land?W-INR-12-tl.length*(tb+8):W/2-(tl.length*(tb+8)-8)/2;tl.forEach(([ic,fn],i)=>{const x=tX0+i*(tb+8),y=tY,on=(ic==='🪣'&&AR.tool===0)||(ic==='🖍️'&&AR.tool===1)||(ic==='🧲'&&AR.saved);X.fillStyle=on?'#ff8fc8':'rgba(255,255,255,0.9)';rrect(x,y,tb,tb,16);X.fill();txt(ic,x+tb/2,y+tb/2+1,tb*0.5,'#000');btn('tool_'+i,x,y,tb,tb,fn)});
    backBtn2('◀  Pictures')}};
// ---------- Fridge gallery ----------
let FRIMG={},FR=null;
function frImg(i,url){let m=FRIMG[i];if(!m||m.src!==url){m=new Image();m.src=url;FRIMG[i]=m}return m}
SCR.fridge={open(){FR={view:-1};const n=fridgeLoad().length;sayT(n?'Your fridge gallery!':'The fridge is empty. Color a picture and tap the magnet to save it!',2)},close(){FR=null},back(){if(FR&&FR.view>=0){FR.view=-1;return true}return false}};
XS.fridge={draw(){UI=[];const g=X.createLinearGradient(0,0,W,0);g.addColorStop(0,'#eef2f5');g.addColorStop(1,'#ffffff');X.fillStyle=g;X.fillRect(0,0,W,H);X.fillStyle='#cfd8dc';X.fillRect(W-INR-28,H*0.3,10,H*0.3);
    const L=XL(),f=fridgeLoad();xHead('My Fridge','#546e7a');if(!FR){bigBack();return}
    if(FR.view>=0&&f[FR.view]){const s=Math.min(W-INL-INR-40,H-TOP-L.bb-60),x=W/2-s/2,y=TOP+L.bb+30,m=frImg(FR.view,f[FR.view]);X.fillStyle='#fff';rrect(x-10,y-10,s+20,s+20,10);X.fill();if(m.complete)X.drawImage(m,x,y,s,s);circ(W/2,y-6,14,'#ff5c9e');btn('big',x,y,s,s,()=>{FR.view=-1});backBtn2('◀  Fridge');return}
    if(!f.length){txt('🖍️ ➜ 🧲',W/2,H/2,60,'#000');bigBack();return}
    const cols=L.land?4:3,rows=Math.ceil(f.length/cols),gap=22,top=TOP+L.bb+36,ts=Math.min((W-INL-INR-60-gap*(cols-1))/cols,(H-top-Math.max(BOT,8)-20-gap*(Math.max(rows,2)-1))/Math.max(rows,2));
    f.forEach((u,i)=>{const r=(i/cols)|0,x=W/2-(cols*ts+(cols-1)*gap)/2+(i%cols)*(ts+gap),y=top+r*(ts+gap),m=frImg(i,u),rot=Math.sin(i*2.3)*0.05;X.save();X.translate(x+ts/2,y+ts/2);X.rotate(rot);X.fillStyle='rgba(0,0,0,0.12)';X.fillRect(-ts/2+3,-ts/2+5,ts,ts);X.fillStyle='#fff';X.fillRect(-ts/2-5,-ts/2-5,ts+10,ts+10);
      if(m.complete)X.drawImage(m,-ts/2,-ts/2,ts,ts);circ(0,-ts/2-2,11,['#ff5c9e','#4fc3f7','#ffd54f','#81c784'][i%4]);X.restore();btn('pic'+i,x,y,ts,ts,()=>{FR.view=i;AUD.SFX.boing();sayT('Wow! What a pretty picture!',2)})});
    bigBack()}};
