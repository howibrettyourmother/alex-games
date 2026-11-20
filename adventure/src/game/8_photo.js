// ================= Photo Booth: pose Doodle, Alex and the kitties, add a backdrop, frame and stickers, then save to Photos =================
const PBG=['space','park','dino','garage'],PFR=['none','bolt','gold','stars','paws'],PSTK=['star','bolt','dino','truck','rocket','paw'],POSES=['idle','loaf','bigloaf','judgy','pawface','treesnooze','limp','sticker','meow','flop','sleep','purr'];
let PH=null;
function photoOpen(){const items=[{t:'alex',x:78,y:262,s:1.25,face:1},{t:'cat',x:170,y:262,s:1.25,face:1,pose:0}];parade().forEach((K,i)=>items.push({t:'kit',k:K.k,x:40+i*55,y:292,s:0.95,face:i%2?-1:1}));
  PH={bg:0,fr:2,items,drag:null,snap:0,flash:0,prev:null,blob:null,file:null,pend:false,msg:''};AUD.setTheme('cozy');sayT('Photo booth! Make a cool picture!',3)}
const pbgList=()=>SEASON.k&&SEASON.k!=='spring'&&SEASON.k!=='summer'?PBG.concat([SEASON.k]):PBG;
const pstkList=()=>PSTK.concat([SEASON.k==='hal'?'pumpkin':SEASON.k==='win'?'snowflake':SEASON.k==='bday'?'cake':'paw']);
function drawStk(k,s){X.save();X.scale(s,s);
  if(k==='heart'||k==='bolt'){X.fillStyle='#ffd54f';X.beginPath();X.moveTo(-6,-16);X.lineTo(8,-2);X.lineTo(-2,-2);X.lineTo(6,16);X.lineTo(-8,2);X.lineTo(2,2);X.closePath();X.fill()}else if(k==='star'){star5(0,0,20,'#ffd54f');star5(0,0,11,'#fff59d')}else if(k==='dino'){ell(0,4,16,10,'#43a047');circ(12,-6,8,'#2e7d32');circ(15,-8,1.6,'#222')}else if(k==='truck'){X.fillStyle='#e53935';rrect(-18,-8,36,14,3);X.fill();X.fillStyle='#1565c0';rrect(-4,-16,18,10,2);X.fill();circ(-10,8,6,'#212121');circ(10,8,6,'#212121')}else if(k==='rocket'){poly([0,-20,10,10,-10,10],'#e53935');ell(0,-2,5,8,'#90caf9');poly([-6,10,0,20,6,10],'#ffd54f')}
  else if(k==='rainbow'){['#2e7d32','#ffd54f','#81c784','#64b5f6','#b388ff'].forEach((c,i)=>{X.beginPath();X.arc(0,10,24-i*4,Math.PI,TAU);strokeC(c,4)});circ(-22,10,6,'#fff');circ(22,10,6,'#fff')}
  else if(k==='crown')crown(0,4,1.6);else if(k==='flower'){for(let i=0;i<5;i++){const a=i*TAU/5;circ(Math.cos(a)*9,Math.sin(a)*9,8,'#c5a3ff')}circ(0,0,6,'#fff59d')}
  else if(k==='bow')bow(0,0,1.6,'#ff5c9e');else if(k==='paw'){circ(0,5,9,'#2e7d32');for(let i=0;i<4;i++)circ(-10+i*6.6,-6-(i===1||i===2?4:0),4,'#2e7d32')}
  else if(k==='pumpkin')pumpkin(0,12,0.9);else if(k==='snowflake'){for(let i=0;i<6;i++){X.save();X.rotate(i*Math.PI/3);X.beginPath();X.moveTo(0,0);X.lineTo(0,-18);X.moveTo(0,-10);X.lineTo(-5,-15);X.moveTo(0,-10);X.lineTo(5,-15);strokeC('#9ec5ff',3);X.restore()}}
  else if(k==='cake')cake(0,16,0.8);X.restore()}
function drawBackdrop(k){if(k==='space'||k==='stars'){X.fillStyle='#0d47a1';X.fillRect(0,0,300,300);for(let i=0;i<22;i++)star5((i*67)%300,(i*41)%220,i%3?3:5,'#fff59d');circ(240,50,22,'#fff8e1');circ(250,44,20,'#ffd54f')}
  else if(k==='park'){X.fillStyle='#4fc3f7';X.fillRect(0,0,300,300);cloud(70,60,0.7);cloud(220,90,0.55);circ(260,40,18,'#fff59d');X.fillStyle='#2e7d32';X.beginPath();X.moveTo(0,200);X.quadraticCurveTo(150,150,300,200);X.lineTo(300,300);X.lineTo(0,300);X.fill();X.fillStyle='#43a047';X.fillRect(0,236,300,64)}
  else if(k==='dino'){X.fillStyle='#81d4fa';X.fillRect(0,0,300,300);X.fillStyle='#5d4037';poly([40,220,110,80,180,220],'#5d4037');X.fillStyle='#1b5e20';X.fillRect(0,220,300,80);ell(70,210,40,18,'#2e7d32');ell(200,200,50,22,'#1b5e20')}
  else if(k==='garage'||k==='rainbow'||k==='hearts'){X.fillStyle='#546e7a';X.fillRect(0,0,300,300);X.fillStyle='#37474f';X.fillRect(0,220,300,80);X.fillStyle='#e53935';rrect(40,200,90,36,4);X.fill();X.fillStyle='#1565c0';rrect(55,184,40,20,3);X.fill();circ(60,236,12,'#212121');circ(110,236,12,'#212121');X.fillStyle='#ffd54f';X.fillRect(0,0,300,16)}
  else if(k==='hal'){X.fillStyle='#e9d5ff';X.fillRect(0,0,300,300);circ(240,60,30,'#fff3c4');X.fillStyle='#ffd8a8';X.fillRect(0,240,300,60);pumpkin(40,250,0.9);pumpkin(262,252,0.75);bunting(0,300,24,['#ffb74d','#b388ff'])}
  else if(k==='win'){X.fillStyle='#dcecff';X.fillRect(0,0,300,300);for(let i=0;i<30;i++)circ((i*53)%300,(i*37)%300,2+(i%3),'#fff');X.fillStyle='#fff';X.fillRect(0,244,300,56);present(36,250,0.8,'#2e7d32');present(262,250,0.7,'#b388ff');lights(0,300,18,0)}
  else if(k==='bday'){X.fillStyle='#0d47a1';X.fillRect(0,0,300,300);bunting(0,300,20,['#e53935','#ffd54f','#43a047','#29b6f6']);balloon(36,120,'#e53935');balloon(270,110,'#ff6f00');cake(260,262,0.8);txt('Happy Birthday, Alex!',150,62,22,'#ffd54f',{st:'#0d47a1',sw:5})}}
function drawFrame(k){if(k==='none')return;X.lineWidth=14;X.strokeStyle=k==='gold'?'#ffd54f':k==='stars'?'#1565c0':k==='paws'?'#43a047':'#ff6f00';rrect(7,7,286,286,20);X.stroke();
  if(k==='bolt'||k==='hearts')for(let i=0;i<8;i++){star5(14+i*39,12,6,'#ffd54f');star5(14+i*39,288,6,'#ffd54f')}
  else if(k==='gold')for(let i=0;i<8;i++){star5(14+i*39,12,6,'#fff59d');star5(14+i*39,288,6,'#fff59d')}
  else if(k==='stars'||k==='flowers')for(let i=0;i<8;i++){star5(14+i*39,12,6,'#ffd54f');star5(14+i*39,288,6,'#1565c0')}
  else if(k==='paws')for(let i=0;i<7;i++)for(const y of [10,290]){const x=22+i*43;circ(x,y+2,4.5,'#43a047');for(let j=0;j<3;j++)circ(x-5+j*5,y-4,2.2,'#2e7d32')}}
function drawPhoto(hq){drawBackdrop(pbgList()[PH.bg]);const its=PH.items.filter(i=>i.t!=='stk').sort((a,b)=>a.y-b.y).concat(PH.items.filter(i=>i.t==='stk'));
  for(const it of its){X.save();X.translate(it.x,it.y);
    if(it.t==='zoe'||it.t==='alex'||it.t==='hero'){X.scale(it.s*it.face,it.s);drawAlex(0,0,{t:hq?0.5:T,face:1,acc:heroAcc()})}
    else if(it.t==='cat'){drawCat(0,0,{t:hq?0.5:T,face:it.face,st:POSES[it.pose],acc:catAcc(),s:it.s})}
    else if(it.t==='kit'){if(hq){X.scale(it.face*it.s,it.s);drawKit(KIT(it.k),'sit',0,{party:SEASON.bday})}else blitKit(it.k,'sit',0,0,0,it.face,it.s)}
    else drawStk(it.k,it.s);X.restore()}
  drawFrame(PFR[PH.fr])}
function photoLayout(){const land=W>H*1.15,bb=Math.max(64,PT(46)),ts=Math.max(PT(46),land?60:52),head=TOP+bb+24;
  if(land){const ps=Math.min(H-head-Math.max(BOT,8)-10,W*0.5);return{land,bb,ts,ps,px:INL+16,py:head,tx:INL+32+ps,tw:W-INR-16-(INL+32+ps)}}
  const toolsH=3*(ts+12)+10,ps=Math.min(W-24,H-head-toolsH-Math.max(BOT,8));return{land,bb,ts,ps,px:W/2-ps/2,py:head,tx:INL+12,tw:W-INL-INR-24,ty:head+ps+12}}
function drawPhotoScreen(){UI=[];const P=PH,L=photoLayout();softBg('#e3f2fd','#fff8e1');
  X.save();X.fillStyle='rgba(120,60,140,0.2)';rrect(L.px+3,L.py+6,L.ps,L.ps,18);X.fill();X.beginPath();rrect(L.px,L.py,L.ps,L.ps,18);X.clip();X.translate(L.px,L.py);X.scale(L.ps/300,L.ps/300);drawPhoto(false);X.restore();
  btn('stage',L.px,L.py,L.ps,L.ps,()=>{});
  // tool rows: backdrop, frame, stickers (+ clear)
  const rows=[['bg',pbgList().length,(i,s)=>{X.save();X.beginPath();rrect(-s/2,-s/2,s,s,12);X.clip();X.translate(-s/2,-s/2);X.scale(s/300,s/300);drawBackdrop(pbgList()[i]);X.restore()}],
    ['fr',PFR.length,(i,s)=>{X.fillStyle='#fff';rrect(-s/2,-s/2,s,s,12);X.fill();X.save();X.translate(-s/2,-s/2);X.scale(s/300,s/300);if(i===0){txt('✕',150,150,140,'#ccc')}else drawFrame(PFR[i]);X.restore()}],
    ['stk',pstkList().length+1,(i,s)=>{X.fillStyle='#fff';rrect(-s/2,-s/2,s,s,12);X.fill();if(i<pstkList().length)drawStk(pstkList()[i],s/60);else txt('🧹',0,2,s*0.5,'#000')}]];
  let y=L.land?L.py:L.ty;rows.forEach(([key,n,dr],r)=>{const s=Math.min(L.land?70:64,Math.max(L.ts,(L.tw-6*(n-1))/n)),per=Math.max(1,Math.floor((L.tw+6)/(s+6))),lines=Math.ceil(n/per);
    for(let i=0;i<n;i++){const c=i%per,ln=(i/per)|0,inl=Math.min(per,n-ln*per),x=L.tx+L.tw/2-(inl*s+(inl-1)*6)/2+c*(s+6)+s/2,yy=y+ln*(s+6)+s/2,on=(key==='bg'&&P.bg===i)||(key==='fr'&&P.fr===i);
      if(on){X.fillStyle='#ff6f00';rrect(x-s/2-4,yy-s/2-4,s+8,s+8,15);X.fill()}X.save();X.translate(x,yy);dr(i,s);X.restore();btn(key+i,x-s/2-3,yy-s/2-3,s+6,s+6,()=>photoTool(key,i))}
    y+=lines*(s+6)+(L.land?18:6)});
  // snap button (top-right)
  const sw=Math.max(150,PT(110)),sh=L.bb,sx=W-INR-sw-12,sy=TOP+12;pill(sx,sy,sw,sh,'📷 Snap!','#ff6f00',24);btn('snap',sx,sy,sw,sh,photoSnap);
  if(P.snap>0){txt(P.snap>0.5?'😺':'📸',L.px+L.ps/2,L.py+L.ps/2,80,'#000')}
  if(P.flash>0){X.globalAlpha=P.flash;X.fillStyle='#fff';X.fillRect(0,0,W,H);X.globalAlpha=1}
  bigBack();
  if(P.prev)drawPhotoPreview()}
function photoTool(k,i){const P=PH;AUD.SFX.click();if(k==='bg'){P.bg=i;sayT(['Space!','The park!','Dino jungle!','The garage!','Party time!'][Math.min(i,4)],1)}else if(k==='fr'){P.fr=i}
  else if(i>=pstkList().length){P.items=P.items.filter(q=>q.t!=='stk');AUD.SFX.whoosh()}else{const n=P.items.filter(q=>q.t==='stk').length;if(n>=12)P.items.splice(P.items.findIndex(q=>q.t==='stk'),1);P.items.push({t:'stk',k:pstkList()[i],x:rr(50,250),y:rr(40,140),s:1.2});AUD.SFX.pop()}}
function photoHit(p){const L=photoLayout(),k=300/L.ps,x=(p.x-L.px)*k,y=(p.y-L.py)*k;if(x<0||y<0||x>300||y>300)return null;
  for(let i=PH.items.length-1;i>=0;i--){const it=PH.items[i],h=it.t==='stk'?24*it.s:it.t==='kit'?60*it.s: (it.t==='zoe'||it.t==='alex'||it.t==='hero')?110*it.s:60*it.s,w=it.t==='stk'?26*it.s:it.t==='kit'?30*it.s:it.t==='zoe'?24*it.s:42*it.s;
    const cy=it.t==='stk'?it.y:it.y-h/2;if(Math.abs(x-it.x)<w+8&&Math.abs(y-cy)<h/2+(it.t==='stk'?it.s*24:8))return{it,x,y,ox:it.x-x,oy:it.y-y}}return{it:null,x,y}}
SCR.photo={open:photoOpen,close(){PH=null},
  down(p,id){if(!PH||PH.prev)return;const h=photoHit(p);if(h&&h.it){PH.drag={id,it:h.it,ox:h.ox,oy:h.oy,mv:0,sx:p.x,sy:p.y};const i=PH.items.indexOf(h.it);if(h.it.t==='stk'){PH.items.splice(i,1);PH.items.push(h.it)}}},
  move(p,id){const d=PH&&PH.drag;if(!d||d.id!==id)return;const L=photoLayout(),k=300/L.ps;if(Math.hypot(p.x-d.sx,p.y-d.sy)>8)d.mv=1;if(!d.mv)return;d.it.x=clamp((p.x-L.px)*k+d.ox,10,290);d.it.y=clamp((p.y-L.py)*k+d.oy,30,300)},
  up(p,id){const d=PH&&PH.drag;if(!d||d.id!==id)return;PH.drag=null;if(d.mv)return;const it=d.it;
    if(it.t==='cat'){it.pose=(it.pose+1)%POSES.length;AUD.SFX.meow(it.pose%3);if(POSES[it.pose]==='purr')AUD.SFX.purr(1)}else if(it.t==='zoe'||it.t==='alex'||it.t==='hero'){it.face=-it.face;AUD.SFX.squeak()}else if(it.t==='kit'){it.face=-it.face;AUD.SFX.meow(2)}else{it.s=it.s>1.6?0.9:it.s+0.35;AUD.SFX.pop()}},
  back(){if(PH&&PH.prev){PH.prev=null;return true}return false}};
function photoSnap(){const P=PH;if(P.snap>0||P.prev)return;P.snap=1.1;sayT('Say cheese!',3);AUD.SFX.chime()}
function updPhoto(dt){const P=PH;if(!P)return;if(P.flash>0)P.flash-=dt*2.5;if(P.snap>0){P.snap-=dt;if(P.snap<=0){P.snap=0;photoTake()}}}
function photoTake(){const P=PH,N=900,c=document.createElement('canvas');c.width=N;c.height=N;const x=c.getContext('2d'),keep=X;X=x;try{X.scale(N/300,N/300);drawPhoto(true);X.font='800 9px '+FONT;X.globalAlpha=0.6;txt("Alex & Doodle  "+new Date().toLocaleDateString(),150,284,8,'#0d47a1',{st:'#fff',sw:2})}catch(e){console.warn(e)}finally{X=keep}
  P.flash=1;AUD.SFX.shutter();P.prev=c;P.blob=null;P.file=null;P.msg='';sSpark(W/2,H/2,16);setTimeout(()=>sayT('Great picture, Alex!',2),500);
  try{c.toBlob(b=>{if(!b||PH!==P)return;P.blob=b;try{P.file=new File([b],'alex-and-doodle-'+Date.now()+'.png',{type:'image/png'})}catch(e){P.file=null}},'image/png')}catch(e){P.msg='x'}}
function drawPhotoPreview(){const P=PH;btn('block',0,0,W,H,()=>{});X.fillStyle='rgba(90,40,110,0.55)';X.fillRect(0,0,W,H);const land=W>H*1.15,bh=Math.max(60,PT(48)),ps=Math.min(W-40,H-TOP-Math.max(BOT,8)-bh*2-60,land?H-160:500),px=W/2-ps/2,py=TOP+bh+30;
  X.fillStyle='#fff';rrect(px-10,py-10,ps+20,ps+20,20);X.fill();X.drawImage(P.prev,px,py,ps,ps);
  const bw=Math.min(240,(W-60)/2),by=py+ps+20;pill(W/2-bw-8,by,bw,bh,P.blob?'💾 Save':'…','#66bb6a',22);btn('save',W/2-bw-8,by,bw,bh,()=>{if(P.blob){P.pend=lastPT==='touch'?'touch':'mouse';AUD.SFX.sticker()}});
  pill(W/2+8,by,bw,bh,'📷 Again','#1565c0',22);btn('again',W/2+8,by,bw,bh,()=>{P.prev=null});
  if(P.msg==='saved')txt('Saved! ✓',W/2,py-30+Math.max(0,TOP),22,'#fff');
  const bx=INL+12,bby=TOP+12,bw2=Math.max(200,PT(150));pill(bx,bby,bw2,bh,'✕ Back','#1565c0',22);btn('prevBack',bx-6,bby-6,bw2+12,bh+12,()=>{P.prev=null})}
// the share sheet needs a real user activation, which iOS grants on touchend/click (not pointerdown): run it there
function photoShare(){const P=PH;if(!P||!P.blob)return;const f=P.file;
  try{if(f&&navigator.canShare&&navigator.share&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:"Alex & Doodle"}).then(()=>{P.msg='saved'}).catch(e=>{if(!e||e.name!=='AbortError')photoDownload()});return}}catch(e){}
  photoDownload()}
function photoDownload(){const P=PH;try{const u=URL.createObjectURL(P.blob),a=document.createElement('a');a.href=u;a.download='alex-and-doodle-'+Date.now()+'.png';a.rel='noopener';document.body.appendChild(a);a.click();P.msg='saved';setTimeout(()=>{URL.revokeObjectURL(u);a.remove()},5000)}catch(e){}}
let lastPT='mouse';addEventListener('pointerdown',e=>{lastPT=e.pointerType||'mouse'},{capture:true});
addEventListener('touchend',()=>{if(PH&&PH.pend==='touch'){PH.pend=false;photoShare()}},{capture:true});
['pointerup','click'].forEach(ev=>addEventListener(ev,e=>{if(PH&&PH.pend==='mouse'){PH.pend=false;photoShare()}},{capture:true}));
