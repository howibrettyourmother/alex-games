// ================= mini-games: one per place, launched from a glowing spot. ~40s, can't lose, always ends with a celebration =================
const MGSPOT={dad:{k:'laser',x:1440},mom:{k:'bubble',x:920},klub:{k:'dance',x:1580},park:{k:'fish',x:950},gma:{k:'yarn',x:960}};
const MGINFO={fish:{n:'Fish Catch',say:'Fish Catch! Catch the falling fish!',bg:'#bfe3ff'},laser:{n:'Laser Chase',say:'Laser Chase! Tap the red dot so Doodle can pounce!',bg:'#efe1ff'},
  yarn:{n:'Yarn Tower',say:'Yarn Tower! Tap to drop the yarn ball!',bg:'#f9e8ff'},dance:{n:'Kitty Dance',say:'Kitty Dance! Tap the glowing paw!',bg:'#e8dcff'},bubble:{n:'Bubble Pop',say:'Bubble Pop! Tap the bubbles!',bg:'#ffe9f3'}};
const MGDUR=40,PRAISE=['Great job, Alex!','You did it, Zoe!','Wow, Zoe! Amazing!','Yay! Super job, Zoe!'],CHEER=['Yay!','Nice!','Wow!','Good kitty!','Hooray!'];
// little icon per game (map, HUD, spot, end card)
function mgIcon(k,x,y,s){X.save();X.translate(x,y);X.scale(s,s);
  if(k==='fish'){ell(0,0,13,7,'#ff9ec7');poly([10,0,19,-7,19,7],'#ff9ec7');circ(-6,-1,1.8,'#5d3a4a')}
  else if(k==='laser'){circ(0,0,12,'rgba(255,61,127,0.3)');circ(0,0,7,'#ff3d7f');circ(-2,-2,2.4,'#fff')}
  else if(k==='yarn'){circ(0,0,12,'#c5a3ff');X.strokeStyle='#fff';X.lineWidth=1.6;for(let i=-1;i<=1;i++){X.beginPath();X.ellipse(0,0,11,5,i*0.9,0,TAU);X.stroke()}}
  else if(k==='dance'){circ(0,4,8,'#ff8fc8');for(let i=0;i<4;i++)circ(-9+i*6,-6-(i===1||i===2?3:0),3.4,'#ff8fc8');star5(12,-10,4,'#ffd54f')}
  else if(k==='bubble'){X.beginPath();X.arc(0,0,12,0,TAU);X.fillStyle='rgba(191,227,255,0.6)';X.fill();strokeC('#9ec5ff',2);heartP(0,2,6,'#ff8fc8');circ(-5,-5,2.5,'#fff')}
  X.restore()}
// ---------- the glowing spot in each place ----------
let spot=null;
function spotEnter(){const m=MGSPOT[pl.k];spot=m?{k:m.k,x:m.x,near:0,said:0}:null}
function updSpot(dt){if(!spot)return;const n=Math.abs(cat.x-spot.x)<60&&cat.y>-60;if(n&&!spot.near&&T-spot.said>12){spot.said=T;sayT(MGINFO[spot.k].n+'! Tap the paw to play!',2);AUD.SFX.chime()}spot.near=n}
function spotPaw(){if(spot&&spot.near){startMini(spot.k);return true}return false}
function spotTap(wx,wy){if(spot&&Math.abs(wx-spot.x)<Math.max(50,PT(30))&&wy>-160&&wy<24&&Math.abs(cat.x-spot.x)<420){startMini(spot.k);return true}return false}
function tapWorld(p){const wx=p.x+camX,wy=p.y-GY();return (typeof questTap==='function'&&questTap(wx,wy))||kitTap(wx,wy)||spotTap(wx,wy)}
function drawSpot(){if(!spot||Math.abs(spot.x-camX-W/2)>W)return;const x=spot.x,g=0.5+0.5*Math.sin(T*3);
  X.globalAlpha=0.35+0.25*g;ell(x,2,46+g*6,11+g*2,'#fff59d');X.globalAlpha=1;ell(x,2,34,8,'#ffc1e3');ell(x,1,24,5,'#fff');
  for(let i=0;i<3;i++){const a=T*1.5+i*TAU/3;star5(x+Math.cos(a)*40,-10+Math.sin(a)*8-((T*20+i*12)%30),4,'#fff59d')}
  const by=(spot.near?-118:-86)+Math.sin(T*3)*4,r=spot.near?30:22;circ(x,by,r+4,'rgba(255,255,255,0.6)');circ(x,by,r,'#fff');mgIcon(spot.k,x,by-(spot.near?4:0),spot.near?1.4:1.1);
  if(spot.near){poly([x-7,by+14,x-7,by+24,x+3,by+19],'#ff5c9e')}}
// ---------- framework ----------
let MG=null;const MGS={};
function startMini(k){openScreen('mini');MG={k,t:0,ph:'intro',score:0,o:{},fish:0,got:[]};MGS[k].init(MG.o);AUD.setTheme(k==='dance'?'home':'park');AUD.SFX.chime();sayT(MGINFO[k].say,3)}
function endMini(){const m=MG;m.ph='end';m.t=0;m.fish=clamp(3+Math.floor(m.score/3),3,12);SAVE.fish+=m.fish;const pv=SAVE.mg[m.k]||{n:0,best:0};SAVE.mg[m.k]={n:pv.n+1,best:Math.max(pv.best,m.score)};save();
  m.got=checkUnlocks();AUD.SFX.sticker();AUD.setTheme('win');sConf(50);setTimeout(()=>{if(MG===m)sayT(pick(PRAISE),3)},250);if(m.got.length)setTimeout(()=>{if(MG===m)say('newitem',2)},2600)}
function mgScore(n,x,y){MG.score+=n||1;sSpark(x,y,10);if(MG.score%5===0)sayT(pick(CHEER),1)}
function updMini(dt){const m=MG;if(!m)return;m.t+=dt;if(m.ph==='intro'){if(m.t>2.4){m.ph='play';m.t=0}return}
  if(m.ph==='play'){MGS[m.k].update(dt,m.o);if(m.t>=MGDUR)endMini()}else if(R()<dt*2)sConf(4)}
function mgTop(){return TOP+Math.max(64,PT(46))+40}// below the back button + timer
function drawMini(){UI=[];const m=MG;if(!m)return;MGS[m.k].draw(m.o);
  // timer: a little kitty walking along a ribbon of paw prints (no numbers to read)
  const bw=Math.min(W-40,460),bx=W/2-bw/2,by=TOP+Math.max(64,PT(46))+20,f=m.ph==='play'?clamp(m.t/MGDUR,0,1):m.ph==='end'?1:0;
  X.fillStyle='rgba(255,255,255,0.75)';rrect(bx,by,bw,14,7);X.fill();X.fillStyle='#ff8fc8';rrect(bx,by,Math.max(14,bw*f),14,7);X.fill();circ(bx+bw*f,by+7,11,'#fff');heartP(bx+bw*f,by+9,7,'#ff5c9e');
  const sw=Math.max(110,PT(80)),sx=W-INR-sw-12,sy=TOP+12;X.fillStyle='rgba(255,255,255,0.88)';rrect(sx,sy,sw,Math.max(56,PT(44)),20);X.fill();mgIcon(m.k,sx+30,sy+Math.max(56,PT(44))/2,1.2);txt(''+m.score,sx+sw-34,sy+Math.max(56,PT(44))/2+1,26,'#c2185b');
  if(m.ph==='intro'){const s=back(m.t*2.5),w=Math.min(W-40,420),h=200;X.save();X.translate(W/2,H/2);X.scale(s,s);X.fillStyle='rgba(255,255,255,0.95)';rrect(-w/2,-h/2,w,h,30);X.fill();mgIcon(m.k,0,-40,3);txt(MGINFO[m.k].n+'!',0,40,34,'#c2185b');X.restore();
    btn('skip',0,0,W,H,()=>{m.ph='play';m.t=0})}
  if(m.ph==='end')drawMiniEnd();
  bigBack()}
function drawMiniEnd(){const m=MG,w=Math.min(W-30,440),h=Math.min(H-TOP-BOT-30,m.got.length?400:360),x=W/2-w/2,y=Math.max(TOP+10,H/2-h/2+20),s=back(m.t*2.2);
  btn('block',0,0,W,H,()=>{});X.fillStyle='rgba(90,40,110,0.4)';X.fillRect(0,0,W,H);X.save();X.translate(W/2,H/2);X.scale(s,s);X.translate(-W/2,-H/2);
  X.fillStyle='#fff';rrect(x,y,w,h,30);X.fill();txt('Great job, Alex!',W/2,y+42,30,'#c2185b');
  for(let i=0;i<3;i++){const sc=back(clamp(m.t*3-i*0.4,0,1));if(sc>0)star5(W/2+(i-1)*70,y+104-(i===1?10:0),30*sc,'#ffd54f',Math.sin(T*2+i)*0.1)}
  drawItem('fish',W/2-36,y+164,T);txt('+'+m.fish,W/2+16,y+166,30,'#ff5c9e');
  let yy=y+200;if(m.got.length){const it=ITEMS.find(q=>q.k===m.got[0]);X.save();X.translate(W/2-110,yy+30);drawCat(0,0,{t:T,st:'idle',acc:{[it.k]:1},s:0.7});X.restore();txt('New: '+it.n+'!',W/2+30,yy+12,18,'#7b3fa0');yy+=60}
  const bh=Math.max(60,PT(48)),bw2=(w-60)/2;pill(x+20,y+h-bh-20,bw2,bh,'↻ Again','#ba68c8',22);pill(x+40+bw2,y+h-bh-20,bw2,bh,'✓ Done','#66bb6a',22);X.restore();
  btn('again',x+20,y+h-bh-20,bw2,bh,()=>startMini(m.k));btn('done',x+40+bw2,y+h-bh-20,bw2,bh,backToGame)}
SCR.mini={down(p,id){if(MG&&MG.ph==='play'&&p.y>TOP+Math.max(64,PT(46))+10&&MGS[MG.k].down)MGS[MG.k].down(p,id)},move(p,id){if(MG&&MG.ph==='play'&&MGS[MG.k].move)MGS[MG.k].move(p,id)},
  key(c){if(MG&&MG.ph==='play'&&MGS[MG.k].key)MGS[MG.k].key(c)},close(){MG=null}};
const mGround=()=>H-Math.max(BOT,8)-30;
// ---------- Park: Fish Catch ----------
MGS.fish={init(o){o.cx=W/2;o.tx=W/2;o.items=[];o.sp=0.5;o.idle=0;o.mt=0;o.face=1},
  update(dt,o){const gy=mGround();o.sp-=dt;if(o.sp<=0){o.sp=rr(0.75,1.05);o.items.push({x:rr(INL+50,W-INR-50),y:mgTop()+10,vy:rr(95,135),k:R()<0.15?'star':'fish',dead:0})}
    if(keys.ArrowLeft||keys.KeyA){o.tx=o.cx-60;o.idle=0}if(keys.ArrowRight||keys.KeyD){o.tx=o.cx+60;o.idle=0}
    o.idle+=dt;if(o.idle>2.5){let b=null;for(const it of o.items)if(!it.dead&&(!b||it.y>b.y))b=it;if(b)o.tx=b.x}
    o.tx=clamp(o.tx,INL+40,W-INR-40);const d=o.tx-o.cx;if(Math.abs(d)>4){o.cx+=Math.sign(d)*Math.min(Math.abs(d),560*dt);o.face=Math.sign(d)}o.mv=Math.abs(d)>4;o.mt-=dt;
    for(const it of o.items){if(it.dead){it.dead+=dt;continue}it.y+=it.vy*dt;if(Math.abs(it.x-o.cx)<58&&it.y>gy-100&&it.y<gy){it.dead=0.01;it.got=1;AUD.SFX.treat();o.mt=0.35;mgScore(it.k==='star'?2:1,it.x,it.y)}else if(it.y>gy){it.dead=0.01;it.y=gy}}
    o.items=o.items.filter(it=>!it.dead||it.dead<0.4&&!it.got)},
  down(p){MG.o.tx=p.x;MG.o.idle=0},move(p){if(minPtrs.size){MG.o.tx=p.x;MG.o.idle=0}},
  draw(o){const gy=mGround(),g=X.createLinearGradient(0,0,0,gy);g.addColorStop(0,'#ffd6ec');g.addColorStop(1,'#cfe8ff');X.fillStyle=g;X.fillRect(0,0,W,gy);
    circ(W-INR-70,mgTop()+50,30,'#fff59d');cloud(W*0.25,mgTop()+70,0.8);cloud(W*0.7,mgTop()+150,0.6);
    X.fillStyle='#a8e6b4';X.fillRect(0,gy,W,H-gy);X.fillStyle='#8fd6a0';X.fillRect(0,gy,W,6);for(let x=20;x<W;x+=60)circ(x,gy+18+(x%3)*6,4,['#ff8fc8','#fff59d','#c5a3ff'][(x/60|0)%3]);
    for(const it of o.items){X.globalAlpha=it.dead?Math.max(0,1-it.dead*2.5):1;if(it.k==='star')drawItem('star',it.x,it.y,T);else{X.save();X.translate(it.x,it.y);X.scale(1.5,1.5);drawItem('fish',0,0,T+it.x);X.restore()}}X.globalAlpha=1;
    drawCat(o.cx,gy,{t:T,face:o.face,st:o.mt>0?'meow':o.mv?'walk':'idle',acc:catAcc(),s:1.3})}};
const minPtrs=new Set();cv.addEventListener('pointerdown',e=>minPtrs.add(e.pointerId));['pointerup','pointercancel'].forEach(n=>cv.addEventListener(n,e=>minPtrs.delete(e.pointerId)));
// ---------- Dad's House: Laser Chase ----------
MGS.laser={init(o){o.cat={x:W*0.3,y:mGround(),j:null,face:1,st:'idle'};o.dot={x:W*0.6,y:mGround()-30,tx:W*0.6,ty:mGround()-30,pause:0.6}},
  band(){const gy=mGround(),top=Math.max(mgTop()+60,H*0.5);return[top,gy-10]},
  newT(o){const [a,b]=this.band();o.dot.tx=rr(INL+60,W-INR-60);o.dot.ty=rr(a,b)},
  update(dt,o){const d=o.dot,c=o.cat;if(!c.j){if(d.pause>0)d.pause-=dt;else{const dx=d.tx-d.x,dy=d.ty-d.y,l=Math.hypot(dx,dy);if(l<6){d.pause=rr(0.5,1.3);this.newT(o)}else{d.x+=dx/l*Math.min(l,150*dt);d.y+=dy/l*Math.min(l,150*dt)}}
      const cx=d.x-c.x;if(Math.abs(cx)>30){c.x+=Math.sign(cx)*90*dt;c.face=Math.sign(cx);c.st='walk'}else c.st='idle';c.y+=(d.y+8-c.y)*Math.min(1,dt*2)}
    else{const j=c.j;j.t+=dt/j.d;const t=Math.min(1,j.t);c.x=lerp(j.x0,j.x1,t);c.y=lerp(j.y0,j.y1,t)-Math.sin(t*Math.PI)*90;c.st='air';
      if(t>=1){c.j=null;c.st='idle';if(j.hit){AUD.SFX.squeak();mgScore(1,c.x,c.y-20);sHearts(c.x,c.y-50,3);const [a,b]=this.band();d.x=c.x<W/2?rr(W*0.6,W-INR-60):rr(INL+60,W*0.4);d.y=rr(a,b);d.pause=0.4;this.newT(o)}else AUD.SFX.land()}}},
  down(p){const o=MG.o,d=o.dot,c=o.cat;if(c.j)return;const hit=Math.hypot(p.x-d.x,p.y-d.y)<Math.max(80,PT(50));const [a,b]=this.band();
    c.j={x0:c.x,y0:c.y,x1:hit?d.x:lerp(c.x,p.x,0.4),y1:hit?d.y+8:clamp(lerp(c.y,p.y,0.4),a,b),t:0,d:hit?0.42:0.3,hit};c.face=(c.j.x1>=c.x)?1:-1;AUD.SFX.hop();if(hit)d.pause=1},
  draw(o){const [a]=this.band(),fy=a-30;X.fillStyle='#efe1ff';X.fillRect(0,0,W,fy);for(let y=mgTop()+10;y<fy-20;y+=40)for(let x=((y/40)%2)*20;x<W;x+=40)circ(x,y,3.5,'#e2ccff');
    X.fillStyle='#fff';X.fillRect(0,fy-12,W,12);X.fillStyle='#e5c09a';X.fillRect(0,fy,W,H-fy);X.fillStyle='rgba(0,0,0,0.06)';for(let x=0;x<W;x+=90)X.fillRect(x,fy,2,H-fy);
    X.save();X.translate(W-INR-150,fy);X.scale(0.7,0.7);FURN.couch.draw({x:0});X.restore();
    const c=o.cat,d=o.dot,zx=INL+50;X.save();X.translate(0,mGround()+10);drawZoe(zx,{t:T,face:1,happy:1,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,ears:SAVE.zoe.ears,party:SEASON.bday});X.restore();
    X.globalAlpha=0.25;X.beginPath();X.moveTo(zx+18,mGround()-40);X.lineTo(d.x,d.y);strokeC('#ff3d7f',2);X.globalAlpha=1;
    const g=0.6+0.4*Math.sin(T*10);circ(d.x,d.y,20*g+6,'rgba(255,61,127,0.18)');circ(d.x,d.y,10,'rgba(255,61,127,0.45)');circ(d.x,d.y,6,'#ff3d7f');circ(d.x-2,d.y-2,2,'#fff');
    drawCat(c.x,c.y,{t:T,face:c.face,st:c.st,acc:catAcc(),s:1.15})}};
// ---------- Grandma Gail's: Yarn Tower ----------
const YARNC=['#f48fb1','#c5a3ff','#80deea','#fff176','#ffab91','#a5d6a7'];
MGS.yarn={init(o){o.stack=[];o.fly=[];o.ci=0;o.ball=null;o.wait=0.3;o.st=0;o.bat=0},
  baseY(){return mGround()-26},R:22,swY(){return Math.max(mgTop()+60,this.baseY()-7*22*1.7-120)},
  update(dt,o){o.st+=dt;o.bat-=dt;const R=this.R,swX=W/2+Math.sin(o.st*1.5)*Math.min(W*0.33,200),swY=this.swY();
    if(!o.ball){o.wait-=dt;if(o.wait<=0)o.ball={x:swX,y:swY,st:'swing',vy:0,c:YARNC[o.ci++%YARNC.length]}}
    else if(o.ball.st==='swing'){o.ball.x=swX;o.ball.y=swY}
    else{const b=o.ball;b.vy+=1500*dt;b.y+=b.vy*dt;const topY=this.baseY()-R-o.stack.length*R*1.7;
      if(b.y>=topY){const tx=o.stack.length?o.stack[o.stack.length-1].x:W/2;b.x=tx+clamp(b.x-tx,-12,12);b.y=topY;o.stack.push({x:b.x,y:b.y,c:b.c,w:1});o.ball=null;o.wait=0.35;o.bat=0.4;AUD.SFX.pat();AUD.SFX.squeak();mgScore(1,b.x,b.y);
        if(o.stack.length>=Math.min(7,Math.floor((this.baseY()-swY-60)/(R*1.7)))){AUD.SFX.chime();sayT('Wow! A tall tower!',2);sConf(20);const bx=W-INR-70;o.stack.forEach((s,i)=>o.fly.push({x:s.x,y:s.y,c:s.c,x0:s.x,y0:s.y,x1:bx+rr(-16,16),y1:mGround()-30,t:-i*0.08}));o.stack=[];o.wait=1.2}}}
    for(const s of o.stack)s.w=Math.max(0,s.w-dt*2);for(const f of o.fly)f.t+=dt*1.6;o.fly=o.fly.filter(f=>f.t<1.2)},
  down(){const o=MG.o;if(o.ball&&o.ball.st==='swing'){o.ball.st='fall';o.ball.vy=0;AUD.SFX.hop()}},key(c){if(c==='Space'||c==='Enter')this.down()},
  draw(o){const R=this.R,gy=mGround();X.fillStyle='#f9e8ff';X.fillRect(0,0,W,gy);for(let y=mgTop()+20;y<gy-40;y+=60)for(let x=((y/60)%2)*30;x<W;x+=60){for(let i=0;i<5;i++){const a=i*TAU/5;circ(x+Math.cos(a)*5,y+Math.sin(a)*5,3.5,'#efd2ff')}circ(x,y,2.5,'#fff')}
    X.fillStyle='#d9b38c';X.fillRect(0,gy,W,H-gy);ell(W/2,this.baseY()+12,70,16,'#ce93d8');ell(W/2,this.baseY()+8,58,10,'#e1bee7');
    const bx=W-INR-70;X.fillStyle='#d7a77a';rrect(bx-40,gy-50,80,50,10);X.fill();X.fillStyle='rgba(0,0,0,0.08)';for(let i=0;i<5;i++)X.fillRect(bx-38,gy-44+i*9,76,2);
    for(let i=0;i<3;i++)circ(bx-20+i*20,gy-52,12,YARNC[i+2]);
    for(const s of o.stack){X.save();X.translate(s.x+Math.sin(T*12)*s.w*3,s.y);this.ball(s.c);X.restore()}
    for(const f of o.fly){const t=clamp(f.t,0,1);X.save();X.translate(lerp(f.x0,f.x1,t),lerp(f.y0,f.y1,t)-Math.sin(t*Math.PI)*120);X.scale(1-t*0.4,1-t*0.4);this.ball(f.c);X.restore()}
    if(o.ball){const b=o.ball;if(b.st==='swing'){X.beginPath();X.moveTo(b.x,b.y-90);X.lineTo(b.x,b.y-R);strokeC(b.c,2.5);circ(b.x,b.y-90,5,'#a1887f')}X.save();X.translate(b.x,b.y);this.ball(b.c);X.restore();
      if(b.st==='swing'&&MG.score<2){X.globalAlpha=0.5+0.5*Math.sin(T*6);poly([b.x-10,b.y+R+10,b.x+10,b.y+R+10,b.x,b.y+R+24],'#ff5c9e');X.globalAlpha=1}}
    drawCat(INL+70,gy,{t:T,face:1,st:o.bat>0?'bat':'idle',acc:catAcc(),s:1.1})},
  ball(c){circ(0,0,this.R,c);X.strokeStyle='rgba(255,255,255,0.75)';X.lineWidth=2;for(let i=-1;i<=1;i++){X.beginPath();X.ellipse(0,0,this.R-2,9,i*0.9,0,TAU);X.stroke()}}};
// ---------- Meadow Brook: Dino Dance (tap the glowing paw) ----------
const PADC=['#ff8fc8','#b388ff','#80d8ff','#ffd54f'],PADN=[72,76,79,84];
MGS.dance={init(o){o.glow=-1;o.gT=0;o.next=0.5;o.last=-1;o.dance=0;o.mv=0;o.pads=[];o.press=[0,0,0,0]},
  layout(o){const land=W>H*1.15,s=Math.max(PT(66),Math.min(land?120:110,(W-INL-INR-60)/(land?4:2)-20)),gy=H-Math.max(BOT,8)-16;o.pads=[];
    if(land){const gap=s*0.35,tw=4*s+3*gap;for(let i=0;i<4;i++)o.pads.push({x:W/2-tw/2+i*(s+gap)+s/2,y:gy-s/2,r:s/2})}
    else{const gap=s*0.3;for(let i=0;i<4;i++)o.pads.push({x:W/2+(i%2?1:-1)*(s/2+gap/2),y:gy-s/2-((i<2)?s+gap:0),r:s/2})}},
  update(dt,o){o.dance-=dt;for(let i=0;i<4;i++)o.press[i]-=dt;if(o.glow<0){o.next-=dt;if(o.next<=0){let g;do g=(R()*4)|0;while(g===o.last);o.glow=g;o.last=g;o.gT=0}}else{o.gT+=dt;if(o.gT>2.4){o.glow=-1;o.next=0.3}}},
  down(p){const o=MG.o;o.pads.forEach((pd,i)=>{if(Math.hypot(p.x-pd.x,p.y-pd.y)<pd.r+12){o.press[i]=0.18;AUD.SFX.note(PADN[i]);if(i===o.glow){o.glow=-1;o.next=0.35;o.dance=0.7;o.mv++;mgScore(1,pd.x,pd.y-pd.r);sHearts(W/2,this.stageY(o)-80,2)}}})},
  stageY(o){const top=o.pads.length?Math.min(...o.pads.map(p=>p.y-p.r)):H*0.7;return Math.max(mgTop()+150,top-30)},
  draw(o){this.layout(o);const sy=this.stageY(o);X.fillStyle='#e8dcff';X.fillRect(0,0,W,H);X.fillStyle='#c39bef';for(let x=0;x<W;x+=50){X.beginPath();X.moveTo(x,0);X.quadraticCurveTo(x+25,mgTop()+30,x+50,0);X.fill()}
    X.fillStyle='#ffd6ec';rrect(INL+10,sy-6,W-INL-INR-20,22,10);X.fill();X.globalAlpha=0.25;for(let i=0;i<3;i++){const x=W*(0.25+i*0.25)+Math.sin(T+i)*30;poly([x-14,mgTop(),x+14,mgTop(),x+70,sy,x-70,sy],'#fff59d')}X.globalAlpha=1;
    const dn=o.dance>0,b=dn?-Math.abs(Math.sin(T*9))*16:-Math.abs(Math.sin(T*4.6))*4;const mv=o.mv%3;
    X.save();X.translate(W/2-(W<500?110:150),sy);drawZoe(0,{t:T*1.2,face:1,walk:1,happy:1,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,ears:SAVE.zoe.ears,party:SEASON.bday});X.restore();
    drawCat(W/2,sy+b,{t:T,face:dn&&mv===1?-1:1,st:dn?(mv===2?'meow':'air'):'idle',acc:catAcc(),s:1.25});
    parade().slice(0,4).forEach((K,i)=>blitKit(K.k,'sit',0,W/2+(W<500?80:110)+i*(W<500?28:46),sy-Math.abs(Math.sin(T*4.6+i))*8,-1,W<500?0.75:1));
    o.pads.forEach((pd,i)=>{const gl=i===o.glow,pr=o.press[i]>0,s=gl?1+Math.sin(T*10)*0.06:1;if(gl){circ(pd.x,pd.y,pd.r*s+14,'rgba(255,245,157,0.85)')}circ(pd.x,pd.y+(pr?3:0),pd.r*s,gl?PADC[i]:'rgba(255,255,255,0.9)');
      const k=pd.r/40,c=gl?'#fff':PADC[i];X.save();X.translate(pd.x,pd.y+(pr?3:0));circ(0,6*k,12*k,c);for(let j=0;j<4;j++)circ((-14+j*9.3)*k,(-10-(j===1||j===2?5:0))*k,5*k,c);X.restore()})}};
// ---------- Mom's Apartment: Bubble Pop ----------
const BUBK=['heart','star','fish','flower'];
MGS.bubble={init(o){o.b=[];o.sp=0.2;o.bat=0},
  update(dt,o){o.sp-=dt;o.bat-=dt;if(o.sp<=0&&o.b.length<10){o.sp=rr(0.55,0.8);o.b.push({x:rr(INL+60,W-INR-60),y:H+40,r:rr(30,42),vy:rr(55,85),ph:R()*6,k:pick(BUBK),pop:0})}
    for(const b of o.b){if(b.pop){b.pop+=dt;continue}b.y-=b.vy*dt;b.x+=Math.sin(MG.t*1.5+b.ph)*22*dt}o.b=o.b.filter(b=>b.pop?b.pop<0.25:b.y>mgTop()-20)},
  down(p){const o=MG.o;let best=null,bd=1e9;for(const b of o.b){if(b.pop)continue;const d=Math.hypot(p.x-b.x,p.y-b.y);if(d<Math.max(b.r+14,PT(26))&&d<bd){bd=d;best=b}}if(best){best.pop=0.01;AUD.SFX.pop();o.bat=0.4;mgScore(1,best.x,best.y)}},
  draw(o){X.fillStyle='#fff3f9';X.fillRect(0,0,W,H);X.fillStyle='#ffe3f0';for(let x=0;x<W;x+=36)X.fillRect(x,0,14,H);const gy=mGround();X.fillStyle='#ecd8f5';X.fillRect(0,gy,W,H-gy);
    DECO.window({x:INL+30,y:mgTop()+30,w:110,h:90});
    for(const b of o.b){if(b.pop){X.globalAlpha=1-b.pop*4;X.beginPath();X.arc(b.x,b.y,b.r*(1+b.pop*3),0,TAU);strokeC('#9ec5ff',3);X.globalAlpha=1;continue}
      X.globalAlpha=0.35;circ(b.x,b.y,b.r,'#cfe8ff');X.globalAlpha=1;X.beginPath();X.arc(b.x,b.y,b.r,0,TAU);strokeC('rgba(150,190,255,0.9)',2.5);ell(b.x-b.r*0.4,b.y-b.r*0.45,b.r*0.22,b.r*0.13,'#fff',-0.6);
      const s=b.r/36;if(b.k==='heart')heartP(b.x,b.y+4*s,13*s,'#ff8fc8');else if(b.k==='star')star5(b.x,b.y,14*s,'#ffd54f');else if(b.k==='fish'){X.save();X.translate(b.x,b.y);X.scale(1.3*s,1.3*s);drawItem('fish',0,0,0);X.restore()}else{for(let i=0;i<5;i++){const a=i*TAU/5;circ(b.x+Math.cos(a)*7*s,b.y+Math.sin(a)*7*s,5*s,'#c5a3ff')}circ(b.x,b.y,4*s,'#fff59d')}}
    drawCat(W/2,gy,{t:T,face:1,st:o.bat>0?'bat':'idle',acc:catAcc(),s:1.2})}};
