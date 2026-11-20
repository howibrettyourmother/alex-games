// ================= UI: map, menus, sticker book, closet, kitty collection, HUD, controls, render =================
const VERSION='1.9.0 (Nov 20 2026)';let UI=[],HUDB=[],retTo='title';const ICONM=/[?&]icon=1/.test(Q);
function btn(id,x,y,w,h,fn){const b={id,x,y,w,h,fn};UI.push(b);return b}
// last-drawn button wins (it is the one on top)
function uiTap(p){for(let i=UI.length-1;i>=0;i--){const b=UI[i];if(inR(p,b)){if(b.id!=='block'&&b.id!=='stage')AUD.SFX.click();b.fn();return true}}return false}
// ---------- screen navigation: every screen has a big Back button and Esc goes back; Back always returns to play (or the map) ----------
const SCREEN_SAY={menu:'What do you want to do?',closet:null,book:null};
function openScreen(s){const S0=SCR[state];if(state==='play'||state==='title')retTo=(state==='play'&&cat)?'play':'title';else if(S0&&S0.close)S0.close();
  state=s;stT=0;resetInput();UI=[];const S=SCR[s];if(S&&S.open)S.open()}
function backToGame(){const S=SCR[state];if(S&&S.close)S.close();if(retTo==='play'&&cat){state='play';stT=0;overlay=null;resetInput();AUD.setTheme(pl.th)}else goMap()}
function goBack(){const S=SCR[state];if(S&&S.back&&S.back())return;backToGame()}
function uiKey(code){if(state==='play'&&overlay){if(overlay.k==='name')nameConfirm();else{overlay=null;AUD.setTheme(pl.th)}return}
  if(state==='title'){if(code==='Enter'){let i=PLACES.findIndex(q=>!pdata(q.k).sticker);enterPlace(i<0?0:i)}return}
  if(code==='Escape'||state==='book'||state==='closet'||state==='kitties'||state==='menu')goBack()}
function openBook(){openScreen('book')}
SCR.book={open(){say('book',2)}};SCR.closet={open(){closetTab=0;say('closet',2)}};SCR.menu={open(){sayT('What do you want to do?',2)}};
function pill(x,y,w,h,label,c,size,o){o=o||{};X.fillStyle='rgba(13,27,71,0.22)';rrect(x,y+4,w,h,h/2);X.fill();X.fillStyle=c;rrect(x,y,w,h,h/2);X.fill();X.fillStyle='rgba(255,255,255,0.35)';rrect(x+6,y+3,w-12,h*0.36,h*0.18);X.fill();txt(label,x+w/2,y+h/2+1,size||20,o.fc||'#fff')}
function wrap(s,maxW,size){X.font='800 '+size+'px '+FONT;const out=[];let line='';for(const w of s.split(' ')){const t=line?line+' '+w:w;if(X.measureText(t).width>maxW&&line){out.push(line);line=w}else line=t}out.push(line);return out}
function softBg(top,bot){const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(1,bot);X.fillStyle=g;X.fillRect(0,0,W,H);
  for(let i=0;i<18;i++){const x=(i*137.5)%W,y=(i*91.3+T*8*(1+i%3))%H,a=0.28+0.28*Math.sin(T*2+i);X.globalAlpha=a;star5(x,y,4+(i%4),i%2?'#fff59d':'#fff')}X.globalAlpha=1}
const tB=()=>Math.max(48,PT(44));// small square buttons: never under 44pt
function sqBtn(list,id,x,y,icon,fn,on){const s=tB(),b={id,x,y,w:s,h:s,fn};list.push(b);X.fillStyle=on===false?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.82)';rrect(x,y,s,s,16);X.fill();txt(icon,x+s/2,y+s/2+1,s*0.46,'#1565c0');return b}
function muteBtn(list,x,y){return sqBtn(list,'mute',x,y,AUD.muted?'🔇':'🔊',()=>{AUD.setMuted(!AUD.muted)})}
function voiceBtn(list,x,y){const b=sqBtn(list,'voice',x,y,'🗣️',()=>{SPEAK.setOn(!SPEAK.on);if(SPEAK.on)setTimeout(()=>sayT('Hi Alex!',3),50)},SPEAK.on);if(!SPEAK.on){X.beginPath();X.moveTo(x+8,y+8);X.lineTo(x+b.w-8,y+b.h-8);strokeC('#e57373',4)}return b}
// big kid-sized Back button (top-left, gently bouncing)
function bigBack(label){const play=retTo==='play'&&cat,bw=Math.max(play?212:200,PT(150)),bh=Math.max(64,PT(46)),bx=INL+12,by=TOP+12,s=1+Math.sin(T*3)*0.025;
  X.save();X.translate(bx+bw/2,by+bh/2);X.scale(s,s);X.translate(-bx-bw/2,-by-bh/2);pill(bx,by,bw,bh,label||(play?'✕  Back to Play':'🗺️  Back to Map'),'#1565c0',22);X.restore();btn('back',bx-6,by-6,bw+12,bh+12,backToGame)}
// ---------- screen-space sparkles/hearts/confetti for menus and mini-games (capped) ----------
let scr=[];
function sHearts(x,y,n){for(let i=0;i<n&&scr.length<120;i++)scr.push({x:x+rr(-14,14),y,vx:rr(-30,30),vy:rr(-120,-60),t:0,life:rr(0.9,1.3),r:rr(7,11),c:pick(['#ffd54f','#ff6f00','#43a047']),k:2})}
function sSpark(x,y,n){for(let i=0;i<n&&scr.length<120;i++){const a=R()*TAU,v=rr(40,170);scr.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:rr(0.5,0.9),r:rr(4,8),c:pick(['#fff59d','#ffffff','#ffd54f','#4fc3f7']),k:2})}}
function sConf(n){for(let i=0;i<n&&scr.length<120;i++)scr.push({x:rr(0,W),y:-10,vx:rr(-40,40),vy:rr(80,200),t:0,life:rr(1.8,3),r:rr(3,6),c:pick(['#ffd23f','#e53935','#4fc3f7','#81c784','#ff6f00']),k:3,rot:rr(0,6)})}
function updScr(dt){for(const p of scr){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.k===2){p.vx*=0.95;p.vy=p.vy*0.95+60*dt}else if(p.k===3)p.rot+=dt*4}scr=scr.filter(p=>p.t<p.life)}
function drawScr(){for(const p of scr){X.globalAlpha=Math.max(0,1-p.t/p.life);if(p.k===1)heartP(p.x,p.y,p.r,p.c);else if(p.k===2)star5(p.x,p.y,p.r,p.c,p.t*4);else{X.save();X.translate(p.x,p.y);X.rotate(p.rot);X.fillStyle=p.c;X.fillRect(-p.r,-p.r*0.4,p.r*2,p.r*0.8);X.restore()}}X.globalAlpha=1}
// sparkle trail (dress-up item): a few sparkles behind Doodle while he moves
let trailT=0;function updTrail(dt){if(!SAVE.wear.trail||!SAVE.un.trail)return;trailT-=dt;if(trailT<=0&&(Math.abs(cat.vx)>40||!cat.ground)&&parts.length<70){trailT=0.05;parts.push({x:cat.x-cat.face*20+rr(-6,6),y:cat.y-rr(10,34),vx:rr(-20,20),vy:rr(-30,10),t:0,life:rr(0.4,0.7),r:rr(3,6),c:pick(['#fff59d','#ffc1e3','#e1bee7','#fff']),star:1})}}
// ---------- place icons for the map + stickers ----------
function placeIcon(k,x,y,s){X.save();X.translate(x,y);X.scale(s,s);
  if(k==='dad'){X.fillStyle='#9fd8ff';X.fillRect(-18,-6,36,26);poly([-24,-4,0,-24,24,-4],'#7aa7e8');X.fillStyle='#fff59d';X.fillRect(-6,6,12,14);X.fillStyle='#fff';X.fillRect(-15,0,8,8);X.fillRect(7,0,8,8)}
  else if(k==='mom'){X.fillStyle='#c39bef';X.fillRect(-14,-24,28,44);X.fillStyle='#fff';for(let r=0;r<4;r++)for(let c=0;c<2;c++)X.fillRect(-9+c*11,-19+r*10,7,6);star5(0,-28,6,'#ffd54f')}
  else if(k==='klub'){X.fillStyle='#ffd27f';X.fillRect(-20,-6,40,26);poly([-24,-4,0,-20,24,-4],'#ff8a80');txt('ABC',0,6,10,'#0d47a1');X.fillStyle='#fff';X.fillRect(-2,-30,2,12);poly([0,-30,10,-27,0,-24],'#e53935')}
  else if(k==='park'){X.fillStyle='#8d6e63';X.fillRect(-3,-2,6,22);circ(0,-12,15,'#81c784');circ(-9,-6,10,'#a5d6a7');circ(9,-6,10,'#66bb6a');circ(-5,-15,2.5,'#ff6f00');circ(6,-9,2.5,'#fff59d')}
  else if(k==='gma'){X.fillStyle='#ffe0b2';X.fillRect(-16,-22,32,42);X.fillStyle='#fff';for(let r=0;r<3;r++){X.fillRect(-11,-16+r*11,8,7);X.fillRect(3,-16+r*11,8,7)}circ(0,-30,6,'#ff6f00');txt('★',0,-30,8,'#fff')}
  X.restore()}
function sticker(k,x,y,r,got){X.save();if(got){X.fillStyle='rgba(120,60,140,0.2)';X.beginPath();X.arc(x+2,y+4,r,0,TAU);X.fill();circ(x,y,r,'#fff');circ(x,y,r-5,['#bbdefb','#c8e6c9','#fff3c4','#ffe0b2','#90caf9'][PLACES.findIndex(p=>p.k===k)]);placeIcon(k,x,y-4,r/30);star5(x+r*0.62,y-r*0.62,r*0.25,'#ffd54f')}
  else{X.setLineDash([6,6]);X.beginPath();X.arc(x,y,r,0,TAU);strokeC('rgba(150,90,170,0.5)',3);X.setLineDash([]);txt('?',x,y+2,r*0.8,'rgba(150,90,170,0.5)')}X.restore()}
// ---------- map / title ----------
function mapLayout(){const land=W>H*1.15,b=Math.max(62,PT(48)),rowY=H-Math.max(BOT,8)-b-24;const N=[];let r=land?52:46;
  if(land){for(let i=0;i<5;i++)N.push({x:W*(0.12+0.19*i),y:H*(0.5+(i%2?0.13:-0.02))})}
  else{const y0=TOP+172,y1=rowY-90-(H>740?150:0),sp=(y1-y0)/4;
    if(sp>=88)for(let i=0;i<5;i++)N.push({x:W*(i%2?0.7:0.3),y:y0+sp*i});
    else{r=44;const yA=TOP+165,yB=yA+r*2+70;for(let i=0;i<3;i++)N.push({x:W*(1+2*i)/6,y:yA});N.push({x:W*2/3,y:yB});N.push({x:W/3,y:yB})}}
  return{land,b,rowY,N,r}}
function drawTitle(){UI=[];softBg('#c8f0d8','#d6ecff');const L=mapLayout(),land=L.land,ty=TOP+(land?50:62),bob=Math.sin(T*2)*3;drawSeasonMap(land);
  txt("Alex & Doodle's",W/2,ty+bob,land?40:34,'#0d47a1',{});txt(SEASON.bday?'Happy Birthday, Alex!':'Big Adventure',W/2,ty+(land?42:38)+bob,land?32:28,SEASON.bday?'#e65100':'#1565c0',SEASON.bday?{st:'#fff',sw:5}:{});
  const N=L.N;X.setLineDash([2,14]);X.beginPath();N.forEach((p,i)=>i?X.lineTo(p.x,p.y):X.moveTo(p.x,p.y));strokeC('rgba(255,255,255,0.95)',8);X.setLineDash([]);
  N.forEach((p,i)=>{const P=PLACES[i],d=pdata(P.k),r=L.r,s=1+Math.sin(T*2.5+i)*0.03;X.fillStyle='rgba(120,60,140,0.18)';X.beginPath();X.arc(p.x+2,p.y+6,r,0,TAU);X.fill();circ(p.x,p.y,r*s,'#fff');circ(p.x,p.y,(r-6)*s,['#bbdefb','#c8e6c9','#fff3c4','#ffe0b2','#90caf9'][i]);placeIcon(P.k,p.x,p.y-2,r/30);
    if(d.sticker){circ(p.x+r*0.7,p.y-r*0.7,13,'#81c784');txt('✓',p.x+r*0.7,p.y-r*0.7+1,16,'#fff')}
    const K=KITTIES.find(q=>q.p===P.k);if(K&&SAVE.kit[K.k]){X.save();X.translate(p.x-r*0.72,p.y-r*0.38);blitKit(K.k,'sit',0,0,0,1,0.42);X.restore()}
    txt(P.n,p.x,p.y+r+16,land?17:16,'#0d47a1');txt('★ '+d.stars.length+'/5'+(d.task?'  ✓':'')+(pdata(P.k).gem?'  💎':''),p.x,p.y+r+35,14,'#2e7d32');
    btn('place'+i,p.x-r,p.y-r,r*2,r*2+44,()=>enterPlace(i))});
  // Alex, Doodle and the kitty parade on the map (when there is room)
  const dz=land?{x:W*0.88,y:L.rowY-8}:H>740?{x:W*0.5,y:L.rowY-30}:null;
  if(dz){X.save();X.translate(dz.x,dz.y);X.scale(0.85,0.85);drawAlex(-36,0,{t:T,face:1,acc:heroAcc()});drawCat(36,0,{t:T,st:'idle',acc:catAcc()});
    parade().forEach((K,i)=>blitKit(K.k,'sit',0,(land?-110:84)+(land?-i*40:i*38),0,land?1:-1,0.9));X.restore()}
  // bottom row: big picture buttons (labels are for grown-ups)
  const items=[['📖','Stickers',openBook],['👕','Closet',()=>openScreen('closet')],['🐱','Kitties',()=>openScreen('kitties')],['🍰','Café',()=>openScreen('cafe')],['📷','Photo',()=>openScreen('photo')],[giftReady()?'🎁':'✨','Fun',()=>openScreen('fun')]];
  const NB=items.length,b=Math.min(L.b,land?L.b:(W-INL-INR-6*(NB+1))/NB),gap=land?Math.min(36,(W-NB*b)/(NB+1)):Math.max(6,(W-INL-INR-NB*b)/(NB+1)),tw=NB*b+(NB-1)*gap,x0=land?Math.max(INL+10,Math.min(W/2-tw/2,W*0.78-tw)):W/2-tw/2;
  items.forEach(([ic,lab,fn],i)=>{const x=x0+i*(b+gap),y=L.rowY,bb=1+Math.sin(T*2+i)*0.03;X.fillStyle='rgba(120,60,140,0.18)';X.beginPath();X.arc(x+b/2+1,y+b/2+4,b/2,0,TAU);X.fill();circ(x+b/2,y+b/2,b/2*bb*(lab==='Fun'&&giftReady()?1+Math.sin(T*6)*0.06:1),['#1565c0','#ff6f00','#43a047','#ffd54f','#e53935','#0288d1'][i]);
    txt(ic,x+b/2,y+b/2+2,b*0.48,'#000');txt(lab,x+b/2,y+b+12,13,'#0d47a1');btn('m_'+lab.toLowerCase(),x-gap/2,y-4,b+gap,b+24,fn)});
  /* version label hidden (kid UI) */const s=tB();muteBtn(UI,W-INR-s-10,TOP+10);voiceBtn(UI,W-INR-s-10,TOP+18+s);
  if(stT>0.4&&stT<0.45&&AUD.unlocked)say('map',1)}
// ---------- sticker book ----------
function drawBook(){UI=[];softBg('#e3f2fd','#fff8e1');const land=W>H*1.15;txt('My Sticker Book',W/2,TOP+(land?52:110),land?34:30,'#0d47a1');const NP=PLACES.length,cols=land?(NP>5?4:5):(NP>6?3:3),r=land?Math.min(NP>5?56:70,W/14,H/(NP>5?11:9)):Math.min(NP>6?40:50,W/9),cw=land?W/(cols+0.6):W/3.2;
  const tot=PLACES.reduce((a,p)=>a+pdata(p.k).stars.length,0);txt('★ '+tot+'/'+PLACES.length*5+' stars   🪙 '+SAVE.fish+'   🐱 '+kitCount()+'/'+KITTIES.length,W/2,TOP+(land?92:142),18,'#e65100');
  PLACES.forEach((P,i)=>{const c=i%cols,rw=(i/cols)|0,n=Math.min(cols,NP-rw*cols),x=W/2+(c-(n-1)/2)*cw,y=TOP+(land?(NP>5?H*0.3:H*0.42):(NP>6?205:235))+rw*(r*2+(NP>5?66:76)),d=pdata(P.k);sticker(P.k,x,y,r,d.sticker);txt(P.n,x,y+r+18,16,'#0d47a1');txt('★'+d.stars.length+'/5 '+(d.task?'✓ helped':'○ help'),x,y+r+38,13,'#2e7d32');
    const m=MGSPOT[P.k],g=SAVE.mg[m.k];if(g){circ(x-r*0.7,y-r*0.7,16,'#fff');mgIcon(m.k,x-r*0.7,y-r*0.7,0.9)}});
  bigBack()}
// ---------- closet (tabs: Alex / Doodle) ----------
let closetTab=0;
function itemIcon(k){if(k==='bow'){X.fillStyle='#c62828';X.beginPath();X.moveTo(-16,-2);X.lineTo(0,-16);X.lineTo(16,-2);X.lineTo(10,6);X.lineTo(0,-6);X.lineTo(-10,6);X.closePath();X.fill();X.fillStyle='#ffd54f';X.fillRect(-4,-4,8,6)}else if(k==='crown')crown(0,-4,1.3);else if(k==='tutu'){for(let j=0;j<5;j++)ell(-14+j*7,-6,8,7,j%2?'#1565c0':'#43a047')}else if(k==='cape'){poly([-12,-22,12,-22,18,8,-18,8],'#c62828');star5(0,-6,5,'#ffd54f')}
  else if(k==='glasses'){X.fillStyle='#212121';rrect(-16,-12,14,8,3);X.fill();rrect(2,-12,14,8,3);X.fill();X.fillRect(-4,-9,8,3)}else if(k==='flower'){for(let j=0;j<5;j++){const a=j*TAU/5;circ(Math.cos(a)*7,-8+Math.sin(a)*7,5,'#43a047')}circ(0,-8,4,'#ffd54f')}
  else if(k==='collar'){X.beginPath();X.arc(0,-14,14,0.5,2.6);strokeC('#1565c0',5);circ(0,0,5,'#ffd54f')}
  else if(k==='horn'){poly([-7,6,7,6,0,-24],'#fff3b0');X.beginPath();X.moveTo(-5,0);X.lineTo(5,-3);X.moveTo(-3,-8);X.lineTo(3,-11);X.moveTo(-2,-15);X.lineTo(2,-17);strokeC('#ff6f00',2);circ(-10,6,4,'#43a047');circ(10,6,4,'#1565c0')}
  else if(k==='bowtie')bow(0,-6,1.4,'#b388ff');else if(k==='trail'){star5(-10,0,7,'#fff59d');star5(6,-12,10,'#ffd54f');star5(12,6,5,'#4fc3f7');circ(-14,-12,2,'#ffd54f')}
  else if(k==='wings'){ell(-9,-6,9,16,'#90caf9',-0.4);ell(9,-6,9,16,'#4fc3f7',0.4)}else if(k==='sweater'){X.fillStyle='#1565c0';rrect(-16,-20,32,28,8);X.fill();star5(0,-6,7,'#ffd54f')}
  else accHead({[k]:1},-2,14,1,0)}
function drawCloset(){UI=[];softBg('#e3f2fd','#fff8e1');const land=W>H*1.15,bb=Math.max(64,PT(46)),head=TOP+bb+20;
  const pr=land?{x:W*0.22,y:H*0.66,s:Math.min(2,H/320)}:{x:W/2,y:head+(H>640?150:118),s:H>640?1.1:0.9};
  X.save();X.translate(pr.x,pr.y);circ(0,-50*pr.s,85*pr.s,'rgba(255,255,255,0.6)');X.scale(pr.s,pr.s);drawAlex(-36,0,{t:T,face:1,acc:heroAcc()});
  if(SAVE.wear.trail&&SAVE.un.trail&&R()<0.15)sSpark(pr.x+10*pr.s,pr.y-20*pr.s,1);drawCat(40,0,{t:T,st:'idle',acc:catAcc(),s:1.1});X.restore();
  const x0=land?W*0.42:INL+12,x1=W-INR-12,cw=x1-x0;let y=land?head:pr.y+18;
  const tw=Math.min(180,(cw-12)/2),th=Math.max(52,PT(44));[['🦸 Alex',0],['🐱 Doodle',1]].forEach(([l,i])=>{const x=x0+cw/2-tw-6+i*(tw+12);pill(x,y,tw,th,l,closetTab===i?'#1565c0':'#90a4ae',20);btn('tab'+i,x,y,tw,th,()=>{closetTab=i;sayT(i?'Doodle!':'Alex!',2)})});y+=th+16;
  const ALEX_GEAR=['cape','dino','explorer','pack','witch','santa','party','pirate','helm','astro','visor','goggs','laser','truck','rocket','mech','detroit'];
  const list0=ITEMS.filter(it=>it.k!=='tutu'&&(!it.sea||SAVE.un[it.k]||it.sea===SEASON.k)).concat(ITEMS.filter(it=>it.k!=='tutu'&&it.sea&&!SAVE.un[it.k]&&it.sea!==SEASON.k));
  const list=list0.filter(it=>closetTab===0?ALEX_GEAR.indexOf(it.k)>=0:ALEX_GEAR.indexOf(it.k)<0);
  const s=Math.max(PT(46),Math.min(land?96:64,(cw-6*(land?4:7))/(land?5:8))),cols=Math.max(1,Math.floor((cw+6)/(s+6)));
  if(!list.length){txt(closetTab?'New outfits for Doodle are hiding in the worlds!':'New adventure gear is hiding in the worlds!',x0+cw/2,y+40,16,'#0d47a1')}
  list.forEach((it,i)=>{const c=i%cols,r=(i/cols)|0,n=Math.min(cols,list.length-r*cols),x=x0+cw/2-(n*s+(n-1)*6)/2+c*(s+6),yy=y+r*(s+6),on=SAVE.wear[it.k],un=SAVE.un[it.k];X.fillStyle=on&&un?'#ffcc02':'rgba(255,255,255,0.85)';rrect(x,yy,s,s,14);X.fill();
    if(un){X.save();X.translate(x+s/2,yy+s*0.62);const k=s/54;X.scale(k,k);itemIcon(it.k);X.restore()}else{X.globalAlpha=0.3;X.save();X.translate(x+s/2,yy+s*0.62);X.scale(s/54,s/54);itemIcon(it.k);X.restore();X.globalAlpha=1;txt('🔒',x+s-12,yy+12,13,'#999')}
    btn('it_'+it.k,x,yy,s,s,()=>{if(!un){AUD.SFX.boing();sayT(UNLOCK_HINT[it.k]||'Keep playing!',2);return}SAVE.wear[it.k]=on?0:1;save();AUD.SFX.sticker();AUD.SFX.meow(1);if(!on)sayT(it.n+'!',1)})})
  const pw=Math.max(150,PT(110));pill(W-INR-pw-12,TOP+12,pw,bb,'📷 Photo','#ff6f00',22);btn('toPhoto',W-INR-pw-12,TOP+12,pw,bb,()=>openScreen('photo'));
  bigBack()}
// ---------- menu (from the 🐾 button while playing) ----------
function drawMenu(){UI=[];softBg('#e3f2fd','#fff8e1');const land=W>H*1.15,bb=Math.max(64,PT(46));txt('What do you want to do?',W/2,TOP+bb+(land?34:50),land?28:24,'#0d47a1');
  const tiles=[['🐱','Kitties',()=>openScreen('kitties'),'#81c784'],['🍰','Café',()=>openScreen('cafe'),'#ffe0b2'],['📷','Photo Booth',()=>openScreen('photo'),'#90caf9'],['👕','Closet',()=>openScreen('closet'),'#ffcc80'],['📖','Stickers',openBook,'#d6ecff'],['🗺️','Map',goMap,'#dff7e6']];
  const cols=land?3:2,rows=6/cols,tg=Math.max(56,PT(46)),top=TOP+bb+(land?60:80),bot=H-Math.max(BOT,8)-tg-24,gap=14,ts=Math.min((W-INL-INR-30-gap*(cols-1))/cols,(bot-top-gap*(rows-1))/rows,land?190:170);
  tiles.forEach(([ic,lab,fn,c],i)=>{const cc=i%cols,r=(i/cols)|0,x=W/2-(cols*ts+(cols-1)*gap)/2+cc*(ts+gap),y=top+r*(ts+gap);X.fillStyle='rgba(120,60,140,0.15)';rrect(x+2,y+5,ts,ts,24);X.fill();X.fillStyle=c;rrect(x,y,ts,ts,24);X.fill();
    txt(ic,x+ts/2,y+ts*0.44,ts*0.4,'#000');txt(lab,x+ts/2,y+ts*0.84,Math.min(20,ts/7),'#0d47a1');btn('menu_'+lab.split(' ')[0].toLowerCase(),x,y,ts,ts,fn)});
  const tw=Math.min(200,(W-60)/2),ty=H-Math.max(BOT,8)-tg-12;pill(W/2-tw-8,ty,tw,tg,(AUD.muted?'🔇':'🔊')+' Sound',AUD.muted?'#bdbdbd':'#9575cd',20);btn('menu_sound',W/2-tw-8,ty,tw,tg,()=>AUD.setMuted(!AUD.muted));
  pill(W/2+8,ty,tw,tg,'🗣️ Voice '+(SPEAK.on?'on':'off'),SPEAK.on?'#9575cd':'#bdbdbd',20);btn('menu_voice',W/2+8,ty,tw,tg,()=>{SPEAK.setOn(!SPEAK.on);if(SPEAK.on)setTimeout(()=>sayT('Hi Alex!',3),50)});
  bigBack()}
function drawEx(e){switch(e.t){
  case 'nap':{const cx=e.x+e.w/2;ell(cx,e.y-4,Math.min(40,e.w/2),8,'#1565c0');ell(cx,e.y-7,Math.min(30,e.w/2-6),5,'#42a5f5');X.globalAlpha=0.5+0.3*Math.sin(T*2+e.ph);txt('z',cx+30,e.y-24-Math.sin(T*2)*4,14,'#0d47a1');X.globalAlpha=1;break}
  case 'blanket':{X.fillStyle='#1565c0';rrect(e.x,e.y-7,e.w,9,4);X.fill();for(let i=0;i<e.w/18;i++)star5(e.x+9+i*18,e.y-3,4,'#ffd54f');break}
  case 'cup':{X.save();X.translate(e.x,e.y);if(e.st===1)X.rotate(T*14);else if(e.st===2)X.rotate(Math.PI/2);X.fillStyle='#ff6f00';X.beginPath();X.moveTo(-7,-16);X.lineTo(7,-16);X.lineTo(5,0);X.lineTo(-5,0);X.fill();X.beginPath();X.arc(8,-9,4,-1.4,1.4);strokeC('#ff6f00',2.5);ell(0,-16,7,2,'#fff');X.restore();break}
  case 'yarn':{X.save();X.translate(e.x,0);X.rotate(e.x/12);circ(0,-12,12,e.c||'#ce93d8');X.strokeStyle='rgba(255,255,255,0.7)';X.lineWidth=1.5;for(let i=-1;i<=1;i++){X.beginPath();X.ellipse(0,-12,11,5,i*0.9,0,TAU);X.stroke()}X.restore();break}
  case 'fly':{if(e.fx==null)break;const fl=Math.abs(Math.sin(T*14+e.ph));X.save();X.translate(e.fx,e.fy);ell(-6*fl,-3,8*fl+1,7,'#43a047');ell(6*fl,-3,8*fl+1,7,'#66bb6a');ell(-5*fl,5,5*fl+1,4,'#2e7d32');ell(5*fl,5,5*fl+1,4,'#81c784');ell(0,0,1.6,7,'#0d47a1');X.restore();break}
  case 'leaves':{const g=e.st>0?Math.max(0.2,1-e.st):1;X.save();X.translate(e.x,0);X.scale(1,g);const C=['#ffb74d','#ff8a65','#ffd54f','#66bb6a','#2e7d32'];for(let i=0;i<14;i++)ell(-40+((i*23)%80),-6-((i*7)%22),12,6,C[i%5],(i*0.7)%3);X.restore();
    if(task&&task.st==='hidden'&&Math.abs(task.x-e.x)<40&&Math.sin(T*3)>0.6)star5(e.x+Math.sin(T)*20,-36,5,'#fff');break}
  case 'ducks':for(let i=0;i<2;i++){const x=e.x+i*70+Math.sin(T*0.8+i)*30;X.save();X.translate(x,-10+Math.sin(T*2+i)*1.5);ell(0,-6,13,8,'#fff');circ(9,-16,6,'#fff');poly([14,-16,20,-15,14,-13],'#ffb74d');circ(10,-17,1.3,'#333');X.restore()}break;
  case 'cookie':{ell(e.x,e.y-3,22,6,'#fff');for(let i=0;i<3;i++){circ(e.x-10+i*10,e.y-8,7,'#d7a86e');circ(e.x-12+i*10,e.y-9,1.4,'#6d4c41');circ(e.x-8+i*10,e.y-6,1.4,'#6d4c41')}break}}}
function drawBubble(b){const a=Math.min(1,b.t*6,(2.8-b.t)*3);if(a<=0)return;X.globalAlpha=a;const ls=wrap(b.s,180,15),w=Math.max(...ls.map(l=>X.measureText(l).width))+24,h=ls.length*19+14,x=clamp(b.x,camX+w/2+6,camX+W-w/2-6),y=b.y-h;
  X.fillStyle='#fff';rrect(x-w/2,y,w,h,12);X.fill();poly([b.x-8,y+h-1,b.x+8,y+h-1,b.x,y+h+10],'#fff');ls.forEach((l,i)=>txt(l,x,y+16+i*19,15,'#0d47a1'));X.globalAlpha=1}
// ---------- world render ----------
function drawWorld(){drawScene(pl);const gy=GY();X.save();X.translate(-camX,gy);
  drawSeasonWorld();drawSpot();
  for(const e of ex)drawEx(e);
  for(const f of fish)if(!f.got&&Math.abs(f.x-camX-W/2)<W)drawItem('fish',f.x,f.y+Math.sin(T*3+f.x)*3,T);
  for(const s of stars)if(!s.got&&Math.abs(s.x-camX-W/2)<W)drawItem('star',s.x,s.y+Math.sin(T*2.4+s.x)*4,T);
  drawNPC(giver.k,giver.x,{t:T,wave:giver.wave>0});if(task.st!=='done'){const bx=giver.x,by=-(giver.k==='duck'?62:178)+Math.sin(T*4)*3;circ(bx,by,13,'#fff');txt(task.st==='carried'?'★':'!',bx,by+1,17,'#ef6c00')}
  if(task.st==='done'&&task.k==='duckling')drawItem('duckling',giver.x-34+Math.sin(T*1.5)*6,0,T);
  drawKits();
  drawCat(zoe.x,0,{t:zoe.t,face:zoe.face,st:zoe.walk?'walk':'idle',acc:catAcc(),s:0.95});
  if(task.st==='free')drawItem(task.k,task.x,task.y+(task.k==='duckling'||task.k==='dino'?0:Math.sin(T*3)*3),T);
  if(typeof drawQuest==='function')drawQuest();
  drawAlex(cat.x,cat.y,{t:cat.t,face:cat.face,st:cat.st,walk:Math.abs(cat.vx)>25,acc:heroAcc(),pop:cat.pop||0});
  if(task.st==='carried')drawItem(task.k,task.x,task.y,T);
  for(const p of parts){const a=1-p.t/p.life;X.globalAlpha=Math.max(0,a);if(p.heart)heartP(p.x,p.y,p.r,p.c);else if(p.star)star5(p.x,p.y,p.r*(0.6+a*0.4),p.c,p.t*4);else if(p.conf){X.save();X.translate(p.x,p.y);X.rotate(p.rot);X.fillStyle=p.c;X.fillRect(-p.r,-p.r*0.4,p.r*2,p.r*0.8);X.restore()}else circ(p.x,p.y,p.r,p.c)}X.globalAlpha=1;
  for(const f of floats){X.globalAlpha=Math.max(0,1-f.t/1.4);txt(f.s,f.x,f.y,18,f.c);X.globalAlpha=1}
  for(const b of bubbles){const bx=b.who==='zoe'?zoe.x:b.who==='npc'?giver.x:b.who==='hero'?cat.x:b.x;drawBubble(Object.assign({},b,{x:bx}))}
  X.restore();
  if(task.st==='carried'){const sx=giver.x-camX;if(sx<0||sx>W){const l=sx<0,ax=l?INL+30:W-INR-30,ay=gy-90+Math.sin(T*5)*4;circ(ax,ay,22,'rgba(255,255,255,0.9)');poly(l?[ax-12,ay,ax+6,ay-10,ax+6,ay+10]:[ax+12,ay,ax-6,ay-10,ax-6,ay+10],'#ef6c00')}}
  // off-screen star / help hints so a 7-year-old always knows where to go
  for(const s of stars)if(!s.got){const sx=s.x-camX;if(sx<-30||sx>W+30){const l=sx<0,ax=l?INL+26:W-INR-26,ay=clamp(gy+s.y,TOP+90,ctrlTop()-24),pulse=1+Math.sin(T*5)*0.08;circ(ax,ay,16*pulse,'rgba(255,255,255,0.9)');star5(ax,ay,9*pulse,'#ffd54f')}}
  if(task&&task.st!=='done'&&task.st!=='carried'){const tx=(task.st==='free'?task.x:giver.x)-camX;if(tx<-40||tx>W+40){const l=tx<0,ax=l?INL+26:W-INR-26,ay=gy-130+Math.sin(T*4)*3;circ(ax,ay,15,'rgba(255,255,255,0.9)');txt(task.st==='free'?'!':'♥',ax,ay+1,16,'#ef6c00')}}
  drawSeasonFx();drawSeasonPlay()}
function nearHint(){return kitHint()||(spot&&spot.near)||nearEx('cup',70)||nearEx('leaves',60)||nearEx('yarn',60)||nearEx('blanket',40)||nearEx('nap',40)||nearEx('cookie',70)||(Math.abs(zoe.x-cat.x)<80&&cat.y>-80)}
function hudLayout(){const s=tB(),x=INL+10+76,y=TOP+10,rx=W-INR-s-10;let SP=W<520?22:26,FW=W<520?74:96;const K=KITTIES.find(q=>q.p===pl.k);
  const row=()=>x+s+10+5*SP+16+10+FW+(W<500?6:10)+s+12;let kitRow=0;if(row()+(K?s+10:0)>rx-8){SP=18;FW=66}if(row()+(K?s+10:0)>rx-8)kitRow=1;return{s,x,y,rx,SP,FW,K,kitRow}}
function drawHUD(){HUDB=[];const L=hudLayout(),s=L.s,y=L.y,x=L.x;
  const hb={id:'home',x,y,w:s,h:s,fn:goMap};HUDB.push(hb);X.fillStyle='rgba(255,255,255,0.8)';rrect(x,y,s,s,16);X.fill();txt('🗺️',x+s/2,y+s/2+1,s*0.5,'#1565c0');
  const d=pdata(pl.k),SP=L.SP,sx=x+s+10;X.fillStyle='rgba(255,255,255,0.8)';rrect(sx,y,5*SP+16,s,16);X.fill();for(let i=0;i<5;i++)star5(sx+8+SP/2+i*SP,y+s/2,SP<22?9:SP<26?10:11,i<d.stars.length?'#ffd54f':'rgba(170,130,190,0.35)');
  const fx=sx+5*SP+26,FW=L.FW;X.fillStyle='rgba(255,255,255,0.8)';rrect(fx,y,FW,s,16);X.fill();drawItem('fish',fx+22,y+s/2,0);txt(''+SAVE.fish,fx+FW-(FW<70?22:28),y+s/2+1,SAVE.fish>99?16:20,'#e65100');
  const tx=fx+FW+(W<500?6:10),tw=s+12;X.fillStyle='rgba(255,255,255,0.8)';rrect(tx,y,tw,s,16);X.fill();X.save();X.translate(tx+tw/2,y+s/2+(task.k==='bunny'||task.k==='duckling'||task.k==='yarn'?12:0));const k=task.k==='remote'?0.8:0.9;X.scale(k,k);drawItem(task.k,0,0,0);X.restore();if(task.st==='done'){circ(tx+tw-10,y+10,10,'#81c784');txt('✓',tx+tw-10,y+11,13,'#fff')}
  if(L.K){const kx=L.kitRow?x:tx+tw+10,ky=L.kitRow?y+s+8:y,got=!!SAVE.kit[L.K.k];X.fillStyle='rgba(255,255,255,0.8)';rrect(kx,ky,s,s,16);X.fill();X.globalAlpha=got?1:0.3;blitKit(L.K.k,'sit',0,kx+s/2,ky+s-6,1,s/80,{party:false});X.globalAlpha=1;
    if(got){circ(kx+s-8,ky+8,9,'#81c784');txt('✓',kx+s-8,ky+9,12,'#fff')}else txt('?',kx+s/2,ky+s/2,22,'#ab47bc')}
  // right column: menu (kitties, café, photo booth, closet, stickers), sound
  const mb=sqBtn(HUDB,'menu',L.rx,y,'🐾',()=>openScreen('menu'));if(T%3<0.4){X.globalAlpha=0.5;X.lineWidth=3;X.strokeStyle='#ff6f00';rrect(mb.x-2,mb.y-2,s+4,s+4,18);X.stroke();X.globalAlpha=1}
  muteBtn(HUDB,L.rx,y+s+8);
  // controls: semi-transparent while idle, solid while pressed
  if(joy.id!=null){X.globalAlpha=0.6;circ(joy.ox,joy.oy,JR+8,'rgba(255,255,255,0.5)');circ(joy.ox+joy.dx*JR,joy.oy+joy.dy*JR,26,'rgba(255,143,200,0.9)')}
  const A=arrowBtns(),ad=arrowDir();for(const [b,dr] of [[A.L,-1],[A.R,1]]){const on=ad===dr,yy=b.y+(on?3:0);X.globalAlpha=on?0.95:0.55;circ(b.x,yy,b.r,on?'#1565c0':'#fff');X.beginPath();X.arc(b.x,yy,b.r-3,0,TAU);strokeC(on?'#fff':'#0d47a1',4);
    const k=b.r*0.42;poly([b.x+dr*k*1.1,yy,b.x-dr*k*0.6,yy-k,b.x-dr*k*0.6,yy+k],on?'#fff':'#0d47a1')}
  const j=jumpBtn(),pr=jumpHeld>0;X.globalAlpha=pr?0.95:0.55;circ(j.x,j.y+(pr?3:0),j.r,pr?'#ef6c00':'#ff8f00');poly([j.x,j.y-j.r*0.5,j.x-j.r*0.32,j.y-j.r*0.1,j.x+j.r*0.32,j.y-j.r*0.1],'#fff');txt('JUMP',j.x,j.y+j.r*0.3,Math.max(12,j.r*0.32),'#fff');
  const pb=pawBtn(),hint=nearHint(),pg=hint?1+Math.sin(T*6)*0.06:1;X.globalAlpha=hint?0.9:0.55;if(hint)circ(pb.x,pb.y,pb.r*pg+6,'rgba(255,245,157,0.7)');circ(pb.x,pb.y,pb.r*pg,'#2e7d32');const pk=pb.r/40;circ(pb.x,pb.y+5*pk,11*pk,'#fff');for(let i=0;i<4;i++)circ(pb.x+(-13+i*8.6)*pk,pb.y+(-9-(i===1||i===2?4:0))*pk,4.6*pk,'#fff');X.globalAlpha=1;
  if(banner){const a=Math.min(1,banner.t*4,(2.6-banner.t)*3);X.globalAlpha=Math.max(0,a);const w=Math.min(W-40,360),by=TOP+s+(L.kitRow?s+24:22);X.fillStyle='#fff';rrect(W/2-w/2,by,w,54,27);X.fill();txt(banner.s,W/2,by+28,24,'#0d47a1');X.globalAlpha=1}
  else if(task){const d=pdata(pl.k),needS=d.stars.length<5,needT=task.st!=='done';if(needS||needT){const msg=needS&&needT?'Find 5 stars and help out!':needS?'Find the missing stars!':'Bring them what they lost!';
    const by=TOP+s+(L.kitRow?s+16:10),w=Math.min(W-80,320);X.globalAlpha=0.92;X.fillStyle='rgba(255,255,255,0.88)';rrect(W/2-w/2,by,w,28,14);X.fill();txt(msg,W/2,by+15,14,'#0d47a1');X.globalAlpha=1}}
  if(!LS.get('ctrlTip')&&stT<8){const A=arrowBtns(),j=jumpBtn(),pb=pawBtn();txt('Walk', (A.L.x+A.R.x)/2, A.L.y-A.L.r-12, 13, '#fff',{st:'#0d47a1',sw:4});txt('Jump', j.x, j.y-j.r-12, 13, '#fff',{st:'#e65100',sw:4});txt('Play', pb.x, pb.y-pb.r-12, 13, '#fff',{st:'#1b5e20',sw:4})}
  else if(stT>8&&!LS.get('ctrlTip'))LS.set('ctrlTip','1')}
function drawDone(){UI=[];X.fillStyle='rgba(90,40,110,0.45)';X.fillRect(0,0,W,H);const bh=Math.max(52,PT(46)),s=back(overlay.t*2.2),w=Math.min(W-40,420),h=Math.min(H-20,250+2*bh+30),x=W/2-w/2,y=H/2-h/2;X.save();X.translate(W/2,H/2);X.scale(s,s);X.translate(-W/2,-H/2);
  X.fillStyle='#fff';rrect(x,y,w,h,28);X.fill();txt('You earned a sticker!',W/2,y+40,26,'#0d47a1');sticker(pl.k,W/2-70,y+120,52,1);
  X.save();X.translate(W/2+70,y+160);drawCat(0,0,{t:T,st:'idle',acc:{[overlay.item]:1}});X.restore();const it=ITEMS.find(i=>i.k===overlay.item);txt('New adventure gear: '+it.n+'!',W/2,y+210,18,'#e65100');
  pill(x+24,y+240,w-48,bh,'Keep exploring','#ff6f00',20);pill(x+24,y+250+bh,w-48,bh,'🗺️ Map','#1565c0',20);X.restore();
  btn('keep',x+24,y+240,w-48,bh,()=>{overlay=null;AUD.setTheme(pl.th)});btn('map',x+24,y+250+bh,w-48,bh,goMap)}
function render(){X.setTransform(RS,0,0,RS,0,0);
  if(ICONM){const g=X.createRadialGradient(W/2,H*0.45,20,W/2,H/2,W*0.75);g.addColorStop(0,'#1565c0');g.addColorStop(1,'#0d47a1');X.fillStyle=g;X.fillRect(0,0,W,H);
    [[0.14,0.16,30],[0.86,0.2,24],[0.12,0.8,20],[0.88,0.84,30],[0.5,0.08,16],[0.78,0.55,14],[0.22,0.5,12]].forEach(([a,b,r])=>star5(W*a,H*b,r,'#fff'));star5(W*0.84,H*0.38,16,'#ffd54f');star5(W*0.17,H*0.33,12,'#ff6f00');
    X.save();X.translate(W/2,H/2);X.scale(5.2,5.2);drawAlex(-30,50,{t:0.3,face:1,acc:{cape:1}});drawCat(36,50,{t:0.3,st:'idle',acc:{bow:1},s:0.9});X.restore();return}
  if(state==='play'){drawWorld();drawHUD();if(overlay&&overlay.k==='done')drawDone();else if(overlay&&overlay.k==='name'){UI=[];drawNamePicker(overlay.K,overlay.sel,nameSel,nameConfirm,true)}else UI=[]}
  else if(state==='book')drawBook();else if(state==='closet')drawCloset();else if(state==='menu')drawMenu();else if(state==='kitties')drawKitties();
  else if(state==='mini')drawMini();else if(state==='cafe')drawCafe();else if(state==='photo')drawPhotoScreen();else if(XS[state])XS[state].draw();else drawTitle();
  drawScr();if(state!=='play')HUDB=[]}
// ---------- loop + adaptive quality ----------
let last=performance.now(),acc=0;const rafA=[],workA=[];let qWin=[];const FIXQ=/[?&]q=fixed/.test(Q);
function perfStats(){const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0,s=[...rafA].sort((a,b)=>a-b);return{fps:1000/(avg(rafA)||16.7),work:avg(workA),p95:s[(s.length*0.95)|0]||0,qual:QUAL,W,H,RS}}
function frame(now){const dt=Math.min(0.05,Math.max(0,(now-last)/1000));rafA.push(now-last);if(rafA.length>600)rafA.shift();last=now;acc+=dt*TS;const STEP=1/120;let n=0;const t0=performance.now();
  try{while(acc>=STEP&&n<120){update(STEP);acc-=STEP;n++}if(n>=120)acc=0;render()}catch(e){console.error(e&&e.stack||e)}
  const wt=performance.now()-t0;if(TS===1){workA.push(wt);if(workA.length>600)workA.shift()}
  if(!FIXQ&&TS===1&&(state==='play'||state==='mini')){qWin.push([wt,dt*1000]);if(qWin.length>=150){const a=qWin.reduce((x,y)=>x+y[0],0)/qWin.length,f=qWin.reduce((x,y)=>x+y[1],0)/qWin.length;qWin=[];
    if((a>10||f>21)&&qualI<QUALS.length-1){qualI++;QUAL=QUALS[qualI];resize()}}}
  requestAnimationFrame(frame)}
