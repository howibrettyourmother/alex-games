// ================= v1.4: Fun Corner, Doodle's daily surprise + weekly sticker chart, 3 new places (kitty friend + mini-game each) =================
// all saved inside SAVE.x (older saves simply lack it); every line is read aloud with the existing voice (sayT)
if(!SAVE.x||typeof SAVE.x!=='object')SAVE.x={};
(function(){const x=SAVE.x;x.gift=x.gift||{last:'',days:[],n:0};x.bst=x.bst||[];x.toys=x.toys||[];x.house=x.house||{wp:0,fl:0,items:[],cush:[null,null,null]};x.seek=x.seek||{};x.care=x.care||{};x.sleep=x.sleep||{n:0}})();
const dayKey=d=>{d=d||new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
function giftReady(){return SAVE.x.gift.last!==dayKey()}
function weekKeys(){const d=new Date(),wd=(d.getDay()+6)%7,out=[];for(let i=0;i<7;i++){const q=new Date(d.getFullYear(),d.getMonth(),d.getDate()-wd+i);out.push(dayKey(q))}return out}
const XL=()=>({land:W>H*1.15,bb:Math.max(64,PT(46))});
function xHead(title,col){const L=XL(),x0=INL+12+Math.max(200,PT(150))+10,x1=W-INR-8;let sz=L.land?32:Math.min(26,W/14);if(!L.land){X.font='800 '+sz+'px '+FONT;const w=X.measureText(title).width+sz*0.44;if(w>x1-x0)sz=Math.max(14,sz*(x1-x0)/w)}txt(title,L.land?W/2:(x0+x1)/2,TOP+12+L.bb/2,sz,col||'#c2185b',{st:'#fff',sw:5})}
function bigTile(x,y,w,h,ic,lab,c,fn,id,glow){const s=1+(glow?Math.sin(T*5)*0.04:0);X.save();X.translate(x+w/2,y+h/2);X.scale(s,s);X.translate(-x-w/2,-y-h/2);
  X.fillStyle='rgba(120,60,140,0.15)';rrect(x+2,y+5,w,h,24);X.fill();X.fillStyle=c;rrect(x,y,w,h,24);X.fill();if(glow){X.strokeStyle='#fff';X.lineWidth=5;rrect(x+3,y+3,w-6,h-6,22);X.stroke()}
  txt(ic,x+w/2,y+h*0.43,Math.min(w,h)*0.42,'#000');txt(lab,x+w/2,y+h*0.84,Math.min(19,w/7),'#7b3fa0');X.restore();btn(id,x,y,w,h,fn)}

// ---------- new places: same reachable layout as The Park, new looks, kitty friend, helper task and mini-game ----------
const PARKLIKE={stars:[[320,-336],[825,-110],[1150,-268],[1720,-100],[2560,-60]],fish:[[100,-30],[250,-180],[400,-260],[600,-30],[820,-70],[1000,-30],[1090,-180],[1440,-70],[1700,-90],[1900,-30],[2200,-60],[2450,-30]]};
PLACES.push(
 {k:'pumpkin',n:'Pumpkin Patch',th:'park',w:2800,col:'#ffa94d',secs:[{x0:0,x1:2800,out:'pumpkin'}],
  deco:[{t:'fence',x:0,w:260},{t:'flowers',x:1540,n:4},{t:'fence',x:2600,w:200}],
  furn:[{t:'tree',x:320,c:'#ffb74d'},{t:'bench',x:760},{t:'tree',x:1100,c:'#ff8a65'},{t:'rock',x:1400},{t:'picnic',x:1640},{t:'tree',x:2760,c:'#ffd54f'}],
  stars:PARKLIKE.stars,fish:PARKLIKE.fish,extras:[{t:'leaves',x:560},{t:'leaves',x:1250},{t:'leaves',x:1900},{t:'fly',x:700},{t:'nap',x:770,y:-40,w:110}],
  task:{who:'gma',x:2500,item:'yarn',ix:1900,iy:0,hi:'gma2hi',ty:'gma2ty',say:'My yarn ball rolled into the leaves!',thanks:'My yarn! Thank you, Alex!',hide:1}},
 {k:'snow',n:'Snowy Park',th:'cozy',w:2800,col:'#90caf9',secs:[{x0:0,x1:2800,out:'snow'}],
  deco:[{t:'fence',x:2600,w:200}],
  furn:[{t:'tree',x:320,c:'#e3f2fd'},{t:'bench',x:760},{t:'tree',x:1100,c:'#ffffff'},{t:'rock',x:1400},{t:'picnic',x:1640},{t:'tree',x:2760,c:'#e1f5fe'}],
  stars:PARKLIKE.stars,fish:PARKLIKE.fish,extras:[{t:'leaves',x:560},{t:'leaves',x:1250},{t:'leaves',x:1900},{t:'nap',x:770,y:-40,w:110}],
  task:{who:'teacher',x:2500,item:'bunny',ix:560,iy:0,hi:'teach2hi',ty:'teach2ty',say:'Our class bunny is hiding!',thanks:'Our bunny! Thank you!',hide:1}},
 {k:'beach',n:'The Beach',th:'park',w:2800,col:'#4fc3f7',secs:[{x0:0,x1:2800,out:'beach'}],
  deco:[{t:'pond',x:2050,w:600},{t:'flowers',x:120,n:3}],
  furn:[{t:'tree',x:320,c:'#a5d6a7'},{t:'bench',x:760},{t:'tree',x:1100,c:'#c5e1a5'},{t:'rock',x:1400},{t:'picnic',x:1640},{t:'tree',x:2760,c:'#b2dfdb'}],
  stars:PARKLIKE.stars,fish:PARKLIKE.fish,extras:[{t:'leaves',x:560},{t:'leaves',x:1250},{t:'leaves',x:1900},{t:'ducks',x:2150},{t:'nap',x:770,y:-40,w:110}],
  task:{who:'mom',x:2500,item:'earring',ix:1250,iy:0,hi:'mom2hi',ty:'mom2ty',say:'I lost my sparkly earring in the sand!',thanks:'My earring! Thank you!',hide:1}});
KITTIES.push(
 {k:'ginger',p:'pumpkin',n:'Pumpkin Kitty',x:1440,y:-38,s:0.66,c:'#ffb35c',d:'#f08c2a',w:'#fff1dd',tip:'#fff1dd',eye:'#7cb342',ear:'#ffc1a6',names:[['Pumpkin','🎃'],['Ginger','🍊'],['Cinnamon','🍂'],['Sunny','🌻']]},
 {k:'snowy',p:'snow',n:'Snowflake Kitty',x:1440,y:-38,s:0.68,c:'#f4f9ff',d:'#d6e6f7',w:'#ffffff',fluff:1,eye:'#4fc3f7',ear:'#ffc1d6',names:[['Snowflake','❄️'],['Frosty','⛄'],['Sparkle','✨'],['Icicle','🧊']]},
 {k:'sandy',p:'beach',n:'Beach Kitty',x:1440,y:-38,s:0.64,c:'#f3d9a6',d:'#d9b77a',w:'#fff8ea',bow:'#29b6f6',eye:'#26a69a',names:[['Shelly','🐚'],['Coral','🪸'],['Sandy','🏖️'],['Wave','🌊']]});
Object.assign(UNLOCK,{pumpkin:'witch',snow:'santa',beach:'party'});
Object.assign(MGSPOT,{pumpkin:{k:'pumpkin',x:950},snow:{k:'snow',x:950},beach:{k:'shell',x:950}});
Object.assign(MGINFO,{pumpkin:{n:'Pumpkin Peek',say:'Pumpkin Peek! Tap the glowing pumpkin!',bg:'#ffe0b2'},snow:{n:'Snowflake Catch',say:'Snowflake Catch! Tap the snowflakes!',bg:'#e3f2fd'},shell:{n:'Seashell Dig',say:'Seashell Dig! Tap the sparkly sand!',bg:'#fff3d6'}});
function snowflake(x,y,r,c){X.save();X.translate(x,y);X.strokeStyle=c||'#fff';X.lineWidth=Math.max(1.5,r*0.18);X.lineCap='round';for(let i=0;i<6;i++){X.rotate(TAU/6);X.beginPath();X.moveTo(0,0);X.lineTo(0,-r);X.moveTo(0,-r*0.6);X.lineTo(r*0.25,-r*0.8);X.moveTo(0,-r*0.6);X.lineTo(-r*0.25,-r*0.8);X.stroke()}X.restore()}
function shellArt(x,y,s,c){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle=c||'#ffc1d6';X.beginPath();X.moveTo(0,8);X.lineTo(-14,-4);X.quadraticCurveTo(0,-20,14,-4);X.closePath();X.fill();X.strokeStyle='rgba(255,255,255,0.8)';X.lineWidth=1.5;for(let i=-2;i<=2;i++){X.beginPath();X.moveTo(0,7);X.lineTo(i*6,-10+Math.abs(i)*2);X.stroke()}X.restore()}
const _mgIcon=mgIcon;mgIcon=function(k,x,y,s){if(k==='pumpkin'){X.save();X.translate(x,y);X.scale(s*0.8,s*0.8);pumpkin(0,16,1);X.restore()}else if(k==='snow'){X.save();X.translate(x,y);X.scale(s,s);circ(0,0,13,'#90caf9');snowflake(0,0,10,'#fff');X.restore()}else if(k==='shell'){X.save();X.translate(x,y);X.scale(s,s);shellArt(0,2,0.9);X.restore()}else _mgIcon(k,x,y,s)};
const _placeIcon=placeIcon;placeIcon=function(k,x,y,s){if(k==='pumpkin'){X.save();X.translate(x,y);X.scale(s,s);pumpkin(0,18,1.1);X.restore()}else if(k==='snow'){X.save();X.translate(x,y);X.scale(s,s);snowflake(0,0,18,'#64b5f6');X.restore()}
  else if(k==='beach'){X.save();X.translate(x,y);X.scale(s,s);circ(8,-8,9,'#ffd54f');X.fillStyle='#4fc3f7';X.fillRect(-20,4,40,8);X.fillStyle='#ffe0a3';X.fillRect(-20,12,40,8);shellArt(-8,12,0.5);X.restore()}else _placeIcon(k,x,y,s)};
// outdoor backgrounds for the new places (drawn into the cached chunks, so they cost nothing per frame)
const _wallBg=wallBg;wallBg=function(sec,top,bot){const o=sec.out;if(o!=='pumpkin'&&o!=='snow'&&o!=='beach')return _wallBg(sec,top,bot);const x0=sec.x0,x1=sec.x1,w=x1-x0;
  if(o==='snow'){const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#bfdcff');g.addColorStop(1,'#eef6ff');X.fillStyle=g;X.fillRect(x0,top,w,-top);for(let x=x0+60;x<x1;x+=260)cloud(x,top+90+((x*7)%50),1);
    X.fillStyle='#dbe9fb';X.beginPath();X.moveTo(x0,-40);for(let x=x0;x<=x1;x+=40)X.lineTo(x,-70-30*Math.sin(x*0.005));X.lineTo(x1,0);X.lineTo(x0,0);X.fill();
    X.fillStyle='#ffffff';X.fillRect(x0,0,w,bot);X.fillStyle='#e3effc';X.fillRect(x0,0,w,6);for(let x=x0+20;x<x1;x+=70)snowflake(x,top+40+((x*13)%((-top)-100>0?(-top)-100:60)),5+(x%3),'rgba(255,255,255,0.9)');
    for(let x=x0+180;x<x1;x+=620){circ(x,-18,18,'#fff');circ(x,-46,13,'#fff');circ(x-4,-49,1.8,'#333');circ(x+5,-49,1.8,'#333');poly([x,-45,x+10,-43,x,-41],'#ff8a26');X.fillStyle='#e53935';X.fillRect(x-12,-36,24,5)}return}
  if(o==='pumpkin'){const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#ffd8b0');g.addColorStop(1,'#fff3e0');X.fillStyle=g;X.fillRect(x0,top,w,-top);for(let x=x0+60;x<x1;x+=260)cloud(x,top+90+((x*7)%50),1);
    X.fillStyle='#ffcc80';X.beginPath();X.moveTo(x0,-40);for(let x=x0;x<=x1;x+=40)X.lineTo(x,-60-24*Math.sin(x*0.006));X.lineTo(x1,0);X.lineTo(x0,0);X.fill();
    X.fillStyle='#c5a46d';X.fillRect(x0,0,w,bot);X.fillStyle='#9ccc65';X.fillRect(x0,0,w,6);for(let x=x0+40;x<x1;x+=150)pumpkin(x,-2+((x*3)%7),0.8+((x/150)%3)*0.15);
    for(let x=x0+90;x<x1;x+=150){X.strokeStyle='#7cb342';X.lineWidth=3;X.beginPath();X.moveTo(x,10);X.quadraticCurveTo(x+30,0,x+60,12);X.stroke()}return}
  // beach: sky, sea, sand
  sky(x0,x1,top,0);for(let x=x0+60;x<x1;x+=260)cloud(x,top+90+((x*7)%50),1);
  X.fillStyle='#4fc3f7';X.fillRect(x0,-70,w,70);X.fillStyle='#81d4fa';for(let x=x0;x<x1;x+=60){X.beginPath();X.arc(x+30,-70,30,Math.PI,0);X.fill()}
  X.fillStyle='rgba(255,255,255,0.7)';for(let x=x0+20;x<x1;x+=90)X.fillRect(x,-40+((x*7)%20),30,3);
  X.fillStyle='#ffe0a3';X.fillRect(x0,0,w,bot);X.fillStyle='#fff3c4';X.fillRect(x0,0,w,6);for(let x=x0+50;x<x1;x+=170)shellArt(x,22+((x*5)%14),0.8,['#ffc1d6','#fff','#ffd59e'][((x/170)|0)%3]);
  for(let x=x0+400;x<x1;x+=900){X.fillStyle='#8d6e63';X.fillRect(x-2,-150,4,150);X.fillStyle='#ff5c9e';X.beginPath();X.moveTo(x-70,-140);X.quadraticCurveTo(x,-200,x+70,-140);X.closePath();X.fill();X.fillStyle='#fff';X.beginPath();X.moveTo(x-24,-152);X.quadraticCurveTo(x,-196,x+24,-152);X.closePath();X.fill()}};

// ---------- the 3 new mini-games (same framework: ~40s, can't lose) ----------
MGS.pumpkin={init(o){o.p=[];o.glow=0;o.gt=0;o.pop=[]},
  lay(){const gy=mGround(),top=mgTop()+40,cols=3,rows=2,cw=(W-INL-INR)/cols,rh=(gy-top)/rows;const a=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)a.push({x:INL+cw*(c+0.5),y:top+rh*(r+0.78),s:Math.min(cw/70,rh/60,2.4)});return a},
  update(dt,o){o.gt-=dt;if(o.gt<=0){o.glow=(o.glow+1+((R()*4)|0))%6;o.gt=2.2}for(const q of o.pop)q.t+=dt;o.pop=o.pop.filter(q=>q.t<1.2)},
  down(p){const o=MG.o,L=MGS.pumpkin.lay();L.forEach((q,i)=>{if(Math.abs(p.x-q.x)<40*q.s&&p.y>q.y-60*q.s&&p.y<q.y+10*q.s){if(i===o.glow){o.pop.push({x:q.x,y:q.y-40*q.s,t:0,k:pick(['🐱','🍬','⭐','🐟'])});AUD.SFX.boing();mgScore(1,q.x,q.y-30*q.s);o.gt=0.25}else AUD.SFX.rustle()}})},
  draw(o){const gy=mGround(),g=X.createLinearGradient(0,0,0,gy);g.addColorStop(0,'#ffd8b0');g.addColorStop(1,'#fff3e0');X.fillStyle=g;X.fillRect(0,0,W,H);X.fillStyle='#c5a46d';X.fillRect(0,gy,W,H-gy);
    MGS.pumpkin.lay().forEach((q,i)=>{const gl=i===o.glow;ell(q.x,q.y+2,34*q.s,8*q.s,'rgba(90,60,30,0.25)');if(gl){X.globalAlpha=0.45+0.3*Math.sin(T*8);ell(q.x,q.y-22*q.s,42*q.s,34*q.s,'#fff59d');X.globalAlpha=1}const b=gl?Math.abs(Math.sin(T*9))*4:0;pumpkin(q.x,q.y-b,q.s*1.3)});
    for(const q of o.pop){X.globalAlpha=Math.max(0,1-q.t/1.2);txt(q.k,q.x,q.y-q.t*80,44,'#000');X.globalAlpha=1}
    drawCat(INL+60,gy,{t:T,face:1,st:'idle',acc:catAcc(),s:1})}};
MGS.snow={init(o){o.f=[];o.sp=0.3},
  update(dt,o){o.sp-=dt;if(o.sp<=0){o.sp=rr(0.45,0.7);o.f.push({x:rr(INL+40,W-INR-40),y:mgTop(),vy:rr(40,70),ph:R()*6,r:rr(16,24),dead:0})}const gy=mGround();
    for(const f of o.f){if(f.dead){f.dead+=dt;continue}f.y+=f.vy*dt;f.x+=Math.sin(T*1.5+f.ph)*22*dt;if(f.y>gy-10)f.dead=0.01}o.f=o.f.filter(f=>!f.dead||f.dead<0.5)},
  down(p){for(const f of MG.o.f)if(!f.dead&&Math.hypot(p.x-f.x,p.y-f.y)<f.r+28){f.dead=0.01;f.got=1;AUD.SFX.chime();mgScore(1,f.x,f.y);return}},
  draw(o){const gy=mGround(),g=X.createLinearGradient(0,0,0,gy);g.addColorStop(0,'#bfdcff');g.addColorStop(1,'#eef6ff');X.fillStyle=g;X.fillRect(0,0,W,H);X.fillStyle='#fff';X.fillRect(0,gy,W,H-gy);
    for(const f of o.f){X.globalAlpha=f.dead?Math.max(0,1-f.dead*2):1;const s=f.got&&f.dead?1+f.dead*2:1;circ(f.x,f.y,f.r*s+6,'rgba(255,255,255,0.35)');snowflake(f.x,f.y,f.r*s,'#fff');snowflake(f.x,f.y,f.r*s*0.55,'#90caf9')}X.globalAlpha=1;
    drawCat(W/2,gy,{t:T,face:1,st:'idle',acc:catAcc(),s:1.2})}};
MGS.shell={init(o){o.m=[];const n=W>H?6:4;for(let i=0;i<n;i++)o.m.push({t:-rr(0,1),dig:0,k:0})},
  pos(i,n){const gy=mGround(),top=mgTop()+60,rows=n>4?2:2,cols=n/rows,cw=(W-INL-INR)/cols;return{x:INL+cw*((i%cols)+0.5),y:top+((gy-top)/rows)*(((i/cols)|0)+0.75)}},
  update(dt,o){for(const m of o.m){m.t+=dt;if(m.dig>0){m.dig+=dt;if(m.dig>1.6){m.dig=0;m.t=-rr(0.3,1)}}}},
  down(p){const o=MG.o;o.m.forEach((m,i)=>{const q=MGS.shell.pos(i,o.m.length);if(m.dig===0&&m.t>0&&Math.hypot(p.x-q.x,p.y-q.y)<70){m.dig=0.01;m.k=(R()*4)|0;AUD.SFX.pat();mgScore(1,q.x,q.y-40)}})},
  draw(o){const gy=mGround(),g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#81d4fa');g.addColorStop(0.3,'#4fc3f7');g.addColorStop(0.31,'#ffe0a3');g.addColorStop(1,'#ffd59e');X.fillStyle=g;X.fillRect(0,0,W,H);
    o.m.forEach((m,i)=>{const q=MGS.shell.pos(i,o.m.length);ell(q.x,q.y,58,20,'#f5c97a');if(m.dig>0){const k=Math.min(1,m.dig*3),y=q.y-30*k;if(m.k===0)shellArt(q.x,y,1.8);else if(m.k===1)star5(q.x,y,22,'#ff8a65');else if(m.k===2)shellArt(q.x,y,1.8,'#fff');else txt('🦀',q.x,y,40,'#000')}
      else if(m.t>0){const s=0.5+0.5*Math.sin(T*6+i);star5(q.x+18,q.y-14,6+s*4,'#fff');star5(q.x-20,q.y-6,4+s*3,'#fff59d');ell(q.x,q.y-6,40,14,'#fbd38d')}});
    drawCat(INL+60,gy+10,{t:T,face:1,st:'idle',acc:catAcc(),s:1})}};

// ---------- Fun Corner (one big new entry on the main menu) ----------
const FUN=[['🎁','Surprise',()=>openScreen('gift'),'#ffe0b2','Doodle\'s surprise!'],['🌙','Sleepover',()=>openScreen('sleep'),'#d1c4e9','Kitty sleepover!'],['🏠','My House',()=>openScreen('house'),'#ffd6ec','Build a house!'],
  ['🛁','Pet Care',()=>openScreen('care'),'#b3e5fc','Pet care!'],['🖍️','Color',()=>openScreen('art'),'#fff59d','Color and draw!'],['🧲','Fridge',()=>openScreen('fridge'),'#c8e6c9','The fridge gallery!'],
  ['🎃','Pumpkins',()=>enterPlace(5),'#ffcc80',''],['❄️','Snowy Park',()=>enterPlace(6),'#e3f2fd',''],['🏖️','Beach',()=>enterPlace(7),'#b2ebf2','']];
SCR.fun={open(){sayT(giftReady()?'Fun Corner! Doodle has a surprise for you! Tap the present!':'Fun Corner! What do you want to do?',2)}};
XS.fun={draw(){UI=[];softBg('#fff0f8','#e0f2ff');const L=XL();xHead('Fun Corner','#7b3fa0');
  const cols=L.land?5:3,n=FUN.length,rows=Math.ceil(n/cols),gap=14,top=TOP+L.bb+30,bot=H-Math.max(BOT,8)-16,ts=Math.min((W-INL-INR-30-gap*(cols-1))/cols,(bot-top-gap*(rows-1))/rows,L.land?170:160);
  FUN.forEach(([ic,lab,fn,c,sy],i)=>{const r=(i/cols)|0,inRow=Math.min(cols,n-r*cols),cc=i%cols,x=W/2-(inRow*ts+(inRow-1)*gap)/2+cc*(ts+gap),y=top+r*(ts+gap);
    bigTile(x,y,ts,ts,i===0&&giftReady()?'🎁':ic,lab,c,()=>{if(sy)sayT(sy,2);fn()},'fun_'+lab.split(' ')[0].toLowerCase(),i===0&&giftReady());
    if(i>=6&&PLACES[i-1]){const d=pdata(PLACES[i-1].k);if(d.sticker)star5(x+ts-18,y+18,12,'#ffd54f')}});
  bigBack()}};
// gift button on the map when today's surprise is waiting
const _drawTitle=drawTitle;drawTitle=function(){_drawTitle();if(!giftReady())return;const x=INL+46,y=TOP+50,b=Math.abs(Math.sin(T*3))*6,r=Math.max(30,PT(30));
  X.globalAlpha=0.5+0.3*Math.sin(T*4);circ(x,y,r+8,'#fff59d');X.globalAlpha=1;giftBox(x,y-b,r/30,0);btn('gift',x-r-8,y-r-8,2*r+16,2*r+16,()=>openScreen('gift'));
  if(stT>1.2&&stT<1.26&&!XS._giftSaid){XS._giftSaid=1;sayT('Doodle left you a surprise! Tap the present!',1)}};
function giftBox(x,y,s,lid){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#ff5c9e';rrect(-24,-12,48,36,6);X.fill();X.fillStyle='#ffd54f';X.fillRect(-5,-12,10,36);
  X.save();X.translate(0,-14-lid*60);X.rotate(-lid*0.6);X.fillStyle='#ff8fc8';rrect(-28,-10,56,14,5);X.fill();X.fillStyle='#ffd54f';X.fillRect(-5,-10,10,14);bow(0,-12,1.3,'#ffd54f');X.restore();X.restore()}

// ---------- Doodle's daily surprise ----------
const BST=[['🦄','a unicorn'],['🌈','a rainbow'],['🧁','a cupcake'],['🌸','a flower'],['🦋','a butterfly'],['⭐','a star'],['🍓','a strawberry'],['🐠','a fishy'],['🎀','a bow'],['🌙','a moon'],['🍭','a lollipop'],['🐣','a baby chick']];
const TOYS=[['🧶','a yarn ball'],['🐭','a toy mouse'],['🪶','a feather wand'],['🎾','a bouncy ball'],['📦','a cozy box'],['🔔','a jingle bell'],['🧸','a teddy bear'],['🎈','a balloon']];
let GF=null;
function giftPick(){const x=SAVE.x,n=x.gift.n%3;
  if(n===1){const it=ITEMS.find(q=>!q.sea&&!SAVE.un[q.k]&&!UNLOCK2[q.k]);if(it){SAVE.un[it.k]=1;return{k:'item',it,say:'A new outfit for Doodle! '+it.n+'!'}}}
  if(n===2||n===1){const t=TOYS.find(q=>!x.toys.includes(q[0]));if(t){x.toys.push(t[0]);return{k:'toy',e:t[0],say:'A new kitty toy! '+t[1]+'!'}}}
  let s=BST.find(q=>!x.bst.includes(q[0]));if(!s)s=pick(BST);else x.bst.push(s[0]);return{k:'st',e:s[0],say:'A new sticker! '+s[1]+'!'}}
SCR.gift={open(){GF={t:0,open:giftReady()?0:2,prize:null};AUD.setTheme('cozy');if(GF.open)sayT('You opened today\'s surprise! Come back tomorrow for another one!',2);else sayT('Tap the present!',2)},close(){GF=null}};
XS.gift={upd(dt){if(GF){GF.t+=dt;if(GF.open===1)GF.ot+=dt}},
  draw(){UI=[];softBg('#fff3e0','#ffe0f0');const L=XL(),g=GF;xHead('Surprise!','#e65100');if(!g){bigBack();return}
    const wkTop=H-Math.max(BOT,8)-Math.min(70,(W-INL-INR-30)/7)-94,top0=TOP+L.bb+30,s=Math.min(3.2,(wkTop-top0)/115,W/120),cx=W/2,cy=wkTop-20*s-10;
    if(g.open===0){const w=Math.sin(T*8)*0.06;X.save();X.translate(cx,cy);X.rotate(w);giftBox(0,0,s,0);X.restore();txt('👆',cx+50*s*0.6,cy+40*s*0.5+Math.sin(T*5)*6,40,'#000');
      btn('open',cx-40*s,cy-50*s,80*s,90*s,()=>{g.open=1;g.ot=0;g.prize=giftPick();const x=SAVE.x;x.gift.last=dayKey();x.gift.days=(x.gift.days||[]).concat([dayKey()]).slice(-40);x.gift.n++;save();checkUnlocks();AUD.SFX.sticker();AUD.setTheme('win');sConf(60);sSpark(cx,cy,30);
        setTimeout(()=>{if(GF&&GF.prize)sayT(GF.prize.say,3)},600);setTimeout(()=>{if(GF){const n=weekKeys().filter(k=>SAVE.x.gift.days.includes(k)).length;sayT('You opened '+n+(n===1?' surprise':' surprises')+' this week!',1)}},4200)})}
    else if(g.open===1){const k=Math.min(1,g.ot*1.5);giftBox(cx,cy,s,k);const p=g.prize,py=cy-26*s-38*s*k,ps=0.4+0.6*back(Math.min(1,g.ot*1.6));
      X.globalAlpha=0.6;circ(cx,py,36*s*ps,'#fff59d');X.globalAlpha=1;X.save();X.translate(cx,py);X.scale(ps*s/2.4,ps*s/2.4);
      if(p.k==='item'){X.scale(2.2,2.2);itemIcon(p.it.k)}else txt(p.e,0,0,90,'#000');X.restore()}
    else{X.globalAlpha=0.5;giftBox(cx,cy,s,1);X.globalAlpha=1;txt('🌙',cx+60,cy-70*s*0.5,50,'#000');drawCat(cx-40*s*0.3,cy+50*s*0.4,{t:T,st:'sleep',acc:catAcc(),s:1})}
    // weekly sticker chart: a star for every day this week a surprise was opened (letters are for grown-ups)
    const wk=weekKeys(),today=dayKey(),cw=Math.min(70,(W-INL-INR-30)/7),y=H-Math.max(BOT,8)-cw-60,x0=W/2-cw*3.5;X.fillStyle='rgba(255,255,255,0.85)';rrect(x0-10,y-34,cw*7+20,cw+70,22);X.fill();
    txt('My Sticker Week',W/2,y-14,18,'#c2185b');wk.forEach((k,i)=>{const x=x0+cw*i+cw/2,on=SAVE.x.gift.days.includes(k),cur=k===today;circ(x,y+cw/2+8,cw/2-4,cur?'#ffe082':'#f3e5f5');if(on)star5(x,y+cw/2+8,cw*0.32,'#ffb300',Math.sin(T*2+i)*0.2);txt('MTWTFSS'[i],x,y+cw+22,13,'#ab47bc')});
    btn('week',x0-10,y-34,cw*7+20,cw+70,()=>{const n=wk.filter(k=>SAVE.x.gift.days.includes(k)).length;sayT('You have '+n+(n===1?' star':' stars')+' this week!',2)});
    if(SAVE.x.bst.length){const ss=Math.min(40,(W-40)/12);txt(SAVE.x.bst.join(' '),W/2,y-50,ss*0.8,'#000')}
    bigBack()}};
