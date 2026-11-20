// ================= v1.7: Trips! Florida (Grandpa Brian's house, Gammy's house), Colorado mountains, Michigan state park campout =================
// all new places live in PLACES (keys fl1/fl2/colo) so stars, helper task, mini-game spot and stickers work exactly like home places
// grandparents are generic cozy cartoon people (not likenesses). Everything is spoken; nothing can be lost.
if(!SAVE.x||typeof SAVE.x!=='object')SAVE.x={};
(function(){const x=SAVE.x;if(!x.vis||typeof x.vis!=='object')x.vis={};if(!x.souv||typeof x.souv!=='object')x.souv={};if(!Array.isArray(x.tray))x.tray=[];if(!x.trip||typeof x.trip!=='object')x.trip={};if(!x.song||typeof x.song!=='object')x.song={}})();
const v7say=(s,p)=>sayT(s,p||2);
// recorded clips only exist for the old places: voice lines for the new ones go through speech (keys starting with 'v7:')
{const _as=AUD.say;AUD.say=function(k,p){if(typeof k==='string'&&k.startsWith('v7:'))return SPEAK.say(k.slice(3),p);
  if(typeof k==='string'&&/^p\d+$/.test(k)&&state==='play'&&pl&&pl.vac){return SPEAK.say(pl.vac.hi,p)}return _as.apply(this,arguments)}}
// ---------- art helpers ----------
function v7palm(x,s,lean){X.save();X.translate(x,0);X.scale(s,s);X.strokeStyle='#a1887f';X.lineWidth=12;X.lineCap='round';X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(lean*30,-90,lean*16,-180);X.stroke();
  X.strokeStyle='#8d6e63';X.lineWidth=2;for(let y=-20;y>-170;y-=18){X.beginPath();X.moveTo(lean*(y/-180)*20-6,y);X.lineTo(lean*(y/-180)*20+6,y-4);X.stroke()}
  X.translate(lean*16,-180);for(let i=0;i<6;i++){X.save();X.rotate(-2.6+i*0.95);ell(36,0,40,10,i%2?'#43a047':'#66bb6a');X.restore()}circ(-6,8,7,'#8d6e63');circ(6,10,7,'#795548');X.restore()}
function v7flamingo(x,y,s,f,t){X.save();X.translate(x,y);X.scale(s*(f||1),s);X.strokeStyle='#f48fb1';X.lineWidth=3;X.beginPath();X.moveTo(0,-30);X.lineTo(0,0);X.moveTo(0,-30);X.lineTo(8,-14);X.lineTo(2,-14);X.stroke();
  ell(0,-38,16,10,'#f48fb1');X.lineWidth=5;X.strokeStyle='#f48fb1';X.beginPath();X.moveTo(10,-40);X.quadraticCurveTo(22,-56,12,-66);X.stroke();circ(12,-70,7,'#f48fb1');poly([16,-72,26,-68,18,-64],'#37474f');circ(12,-72,1.6,'#222');ell(-6,-40,8,5,'#ec407a',-0.3+Math.sin((t||0)*3)*0.2);X.restore()}
function v7pelican(x,y,s,f){X.save();X.translate(x,y);X.scale(s*(f||1),s);ell(0,-18,18,13,'#eceff1');ell(-6,-18,10,7,'#cfd8dc');circ(12,-36,8,'#fff');poly([16,-38,40,-32,18,-30],'#ffb74d');ell(26,-28,10,4,'#ffcc80');circ(14,-38,1.6,'#222');X.fillStyle='#ffb74d';X.fillRect(-4,-6,3,6);X.fillRect(4,-6,3,6);X.restore()}
// friendly cartoon gator: big smile, rosy cheeks, a flower. Never snappy.
function v7gator(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);const b=Math.sin((t||0)*2)*1.5;ell(0,-10+b,46,13,'#81c784');ell(34,-14+b,24,10,'#81c784');ell(-48,-6+b,22,6,'#81c784',-0.2);
  for(let i=-30;i<30;i+=12)circ(i,-21+b,4,'#66bb6a');circ(36,-24+b,6,'#81c784');circ(36,-25+b,4,'#fff');circ(37,-25+b,2,'#333');X.beginPath();X.arc(42,-12+b,10,0.2,Math.PI-0.6);sl(2,'#2e7d32');ell(44,-15+b,3,2,'rgba(255,130,160,0.6)');
  for(let i=0;i<5;i++){const a=i*TAU/5;circ(28+Math.cos(a)*4,-32+b+Math.sin(a)*4,3,'#ff8fc8')}circ(28,-32+b,2.4,'#fff59d');X.restore()}
function v7pine(x,s,c){X.save();X.translate(x,0);X.scale(s,s);X.fillStyle='#6d4c41';X.fillRect(-6,-30,12,30);for(let i=0;i<3;i++)poly([-40+i*8,-24-i*34,40-i*8,-24-i*34,0,-84-i*34],c||'#2e7d32');X.restore()}
function v7mount(x0,x1,base,h,col,snow){X.fillStyle=col;X.beginPath();X.moveTo(x0,base);X.lineTo((x0+x1)/2,base-h);X.lineTo(x1,base);X.fill();if(snow){const cx=(x0+x1)/2,k=0.28,w=(x1-x0)/2*k;X.fillStyle='#fff';X.beginPath();X.moveTo(cx,base-h);X.lineTo(cx+w,base-h+h*k);X.lineTo(cx+w*0.4,base-h+h*k-8);X.lineTo(cx,base-h+h*k+4);X.lineTo(cx-w*0.5,base-h+h*k-8);X.lineTo(cx-w,base-h+h*k);X.fill()}}
function v7tent(x,y,s,col){X.save();X.translate(x,y);X.scale(s,s);poly([-60,0,0,-80,60,0],col||'#ff8a65');poly([-14,0,0,-60,14,0],'#5d4037');X.strokeStyle='#fff';X.lineWidth=3;X.beginPath();X.moveTo(0,-80);X.lineTo(0,-92);X.stroke();poly([0,-92,14,-87,0,-82],'#ffd54f');X.restore()}
function v7fire(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#795548';X.save();X.rotate(0.3);X.fillRect(-26,-6,52,9);X.restore();X.save();X.rotate(-0.3);X.fillRect(-26,-6,52,9);X.restore();
  for(let i=0;i<8;i++){const a=i*TAU/8;circ(Math.cos(a)*30,Math.sin(a)*5,6,'#9e9e9e')}const f=Math.sin((t||0)*12)*3;
  poly([-18,-4,-6,-44-f,0,-20,8,-52+f,18,-4],'#ff7043');poly([-10,-4,-2,-30+f,4,-14,8,-34-f,12,-4],'#ffca28');ell(0,-6,8,4,'#fff59d');X.restore()}
function v7elk(x,y,s,f){X.save();X.translate(x,y);X.scale(s*(f||1),s);ell(0,-40,34,16,'#a1887f');[-22,-12,14,24].forEach(l=>{X.fillStyle='#8d6e63';X.fillRect(l-3,-28,6,28)});ell(30,-62,9,16,'#8d6e63',0.4);ell(40,-74,12,8,'#a1887f');circ(42,-77,1.8,'#222');circ(50,-72,2.5,'#5d4037');
  X.strokeStyle='#d7ccc8';X.lineWidth=3;X.beginPath();X.moveTo(36,-80);X.lineTo(30,-104);X.lineTo(22,-110);X.moveTo(31,-98);X.lineTo(40,-108);X.moveTo(42,-80);X.lineTo(48,-102);X.lineTo(56,-108);X.stroke();ell(-30,-44,6,4,'#efebe9');X.restore()}
function v7moose(x,y,s,f){X.save();X.translate(x,y);X.scale(s*(f||1),s);ell(0,-42,36,20,'#6d4c41');[-22,-10,14,26].forEach(l=>{X.fillStyle='#5d4037';X.fillRect(l-4,-26,8,26)});ell(34,-56,12,16,'#6d4c41',0.3);ell(46,-58,14,11,'#795548');circ(40,-64,2,'#222');circ(55,-56,2.5,'#3e2723');X.beginPath();X.arc(48,-52,5,0.2,Math.PI-0.2);sl(1.6,'#3e2723');
  ell(22,-76,16,7,'#d7ccc8',-0.3);ell(48,-80,16,7,'#d7ccc8',0.3);ell(44,-50,3,2,'rgba(255,140,160,0.6)');X.restore()}
function v7chip(x,y,s,f,t){X.save();X.translate(x,y-Math.abs(Math.sin((t||0)*6))*3);X.scale(s*(f||1),s);ell(-12,-16,6,14,'#a1887f',-0.6);ell(0,-10,11,9,'#bc8f6f');X.fillStyle='#5d4037';X.fillRect(-6,-18,12,2);circ(9,-18,7,'#bc8f6f');circ(11,-20,1.4,'#222');circ(15,-17,1.2,'#5d4037');X.restore()}
function v7marmot(x,y,s,f){X.save();X.translate(x,y);X.scale(s*(f||1),s);ell(0,-16,14,17,'#a1887f');ell(0,-10,8,10,'#d7ccc8');circ(0,-36,10,'#a1887f');circ(-4,-38,1.6,'#222');circ(4,-38,1.6,'#222');ell(0,-33,4,3,'#efebe9');circ(-8,-44,3,'#8d6e63');circ(8,-44,3,'#8d6e63');X.restore()}
function v7waterfall(x,top,w,t){X.fillStyle='#78909c';rrect(x-w/2-30,top,w+60,-top+10,20);X.fill();X.fillStyle='#81d4fa';X.fillRect(x-w/2,top+20,w,-top-20);X.fillStyle='rgba(255,255,255,0.6)';for(let i=0;i<6;i++)X.fillRect(x-w/2+8+i*(w-16)/5,top+30+((i*37)%60),4,-top-60);
  for(let i=0;i<6;i++)circ(x-w/2+i*w/5,-6,12,'rgba(255,255,255,0.9)')}
function v7pinecone(x,y,s){X.save();X.translate(x,y);X.scale(s,s);ell(0,0,9,13,'#8d6e63');X.strokeStyle='#5d4037';X.lineWidth=1.4;for(let i=-8;i<=8;i+=5){X.beginPath();X.moveTo(-8,i);X.quadraticCurveTo(0,i+5,8,i);X.stroke()}X.fillStyle='#5d4037';X.fillRect(-1.5,-17,3,5);X.restore()}
// ---------- the three trip places ----------
const VACK=['fl1','fl2','colo'];
PLACES.push(
 {k:'fl1',n:"Grandpa Brian's",th:'park',w:2800,col:'#4dd0e1',secs:[{x0:0,x1:2800,out:'fl1'}],vac:{hi:"Florida! Grandpa Brian's house! Palm trees and a sunny pool!"},
  deco:[{t:'flowers',x:120,n:3},{t:'flowers',x:1540,n:4}],
  furn:[{t:'tree',x:320,c:'#66bb6a'},{t:'bench',x:760},{t:'tree',x:1100,c:'#81c784'},{t:'rock',x:1400},{t:'picnic',x:1640},{t:'tree',x:2760,c:'#a5d6a7'}],
  stars:PARKLIKE.stars,fish:PARKLIKE.fish,extras:[{t:'fly',x:700},{t:'fly',x:1900},{t:'nap',x:770,y:-40,w:110}],
  task:{who:'gpa',x:480,item:'gpahat',ix:2250,iy:0,hi:'v7:Hi Alex! Hi Doodle! Welcome to Florida! The wind blew my sun hat away. Can you find it?',ty:'v7:My sun hat! Thank you, Alex! You are the best helper!',say:'Hi Alex! Can you find my sun hat?',thanks:'My hat! Thank you, Alex!'}},
 {k:'fl2',n:"Gammy's House",th:'park',w:2800,col:'#ffab91',secs:[{x0:0,x1:2800,out:'fl2'}],vac:{hi:"Florida! Gammy's house by the beach! Look, flamingos!"},
  deco:[{t:'flowers',x:120,n:3}],
  furn:[{t:'tree',x:320,c:'#81c784'},{t:'bench',x:760},{t:'tree',x:1100,c:'#a5d6a7'},{t:'rock',x:1400},{t:'picnic',x:1640},{t:'tree',x:2760,c:'#66bb6a'}],
  stars:PARKLIKE.stars,fish:PARKLIKE.fish,extras:[{t:'leaves',x:560},{t:'leaves',x:1250},{t:'leaves',x:1900},{t:'nap',x:770,y:-40,w:110}],
  task:{who:'gammy',x:480,item:'gamshell',ix:1900,iy:0,hide:1,hi:'v7:Hi Alex! Hi Doodle! Gammy missed you! My pretty pink seashell is hiding in the leaves. Can you find it?',ty:'v7:My seashell! Thank you, sweetie! Big hugs!',say:'Hi Alex! Can you find my seashell?',thanks:'My seashell! Thank you, sweetie!'}},
 {k:'colo',n:'Colorado Mountains',th:'cozy',w:3000,col:'#81c784',secs:[{x0:0,x1:3000,out:'colo'}],vac:{hi:'Colorado! Big mountains, tall pine trees and a waterfall!'},
  deco:[{t:'flowers',x:1540,n:4}],
  furn:[{t:'tree',x:320,c:'#2e7d32'},{t:'bench',x:760},{t:'tree',x:1100,c:'#388e3c'},{t:'rock',x:1400},{t:'picnic',x:1640},{t:'tree',x:2760,c:'#1b5e20'}],
  stars:PARKLIKE.stars,fish:PARKLIKE.fish,extras:[{t:'leaves',x:560},{t:'fly',x:2000},{t:'nap',x:770,y:-40,w:110}],
  task:{who:'moose',x:520,item:'pinecone',ix:2300,iy:0,hi:'v7:Hello Alex! I am Mister Moose! My little chipmunk friend lost her pinecone. Can you find it?',ty:'v7:The pinecone! Thank you, Alex! The chipmunk is so happy!',say:'Hello Alex! Can you find the pinecone?',thanks:'Thank you, Alex!'}});
const V7I={fl1:PLACES.findIndex(p=>p.k==='fl1'),fl2:PLACES.findIndex(p=>p.k==='fl2'),colo:PLACES.findIndex(p=>p.k==='colo')};
Object.assign(UNLOCK,{fl1:'sunhat',fl2:'shades',colo:'knit'});
ITEMS.push({k:'sunhat',n:'Sun Hat',trip:1},{k:'shades',n:'Sunglasses',trip:1},{k:'knit',n:'Knit Hat',trip:1},{k:'boots',n:'Hiking Boots',trip:1});
Object.assign(UNLOCK_HINT,{sunhat:'Take a trip to Florida!',shades:'Take a trip to Florida!',knit:'Take a trip to Colorado!',boots:'Take a trip to Colorado!'});
// gifts and unlock rules skip the trip clothes (they come from trips)
for(const k of ['sunhat','shades','knit','boots'])UNLOCK2[k]=()=>false;
Object.assign(MGSPOT,{fl1:{k:'ball',x:950},fl2:{k:'flamingo',x:950},colo:{k:'hike',x:950}});
Object.assign(MGINFO,{ball:{n:'Pool Party',say:'Pool party! Tap the beach balls!',bg:'#b2ebf2'},flamingo:{n:'Flamingo Peek',say:'Flamingo peek! Tap the flamingo that pops up!',bg:'#ffe0e8'},hike:{n:'Trail Hike',say:'Trail hike! Tap the glowing paw prints to climb the mountain!',bg:'#dcedc8'}});
// ---------- NPCs: Grandpa Brian, Gammy, Mister Moose ----------
function v7person(o,t,wave){const T0=o.tall;X.beginPath();X.moveTo(-7,-T0*0.42);X.lineTo(-8,-4);X.moveTo(7,-T0*0.42);X.lineTo(8,-4);sl(9,o.leg);ell(-9,-3,8,4,o.shoe||'#6d4c41');ell(10,-3,8,4,o.shoe||'#6d4c41');
  if(o.skirt){X.fillStyle=o.skirt;X.beginPath();X.moveTo(-18,-T0*0.36);X.lineTo(18,-T0*0.36);X.lineTo(24,-T0*0.12);X.lineTo(-24,-T0*0.12);X.fill()}
  X.fillStyle=o.top;rrect(-19,-T0*0.78,38,T0*0.44,12);X.fill();if(o.pat)for(let i=0;i<5;i++)o.pat(-10+((i*13)%22),-T0*0.7+((i*9)%(T0*0.34)));
  X.beginPath();X.moveTo(-16,-T0*0.72);X.lineTo(-22,-T0*0.46);sl(8,o.top);const ar=wave?-2.4+Math.sin(t*10)*0.3:0.2;X.save();X.translate(16,-T0*0.72);X.rotate(ar);X.beginPath();X.moveTo(0,0);X.lineTo(4,26);sl(8,o.top);circ(4,30,5,o.sk);X.restore();
  const hy=-T0*0.86;circ(0,hy,15,o.sk);X.fillStyle=o.h;
  if(o.curly){for(let i=0;i<7;i++)circ(-14+i*4.7,hy-11+Math.abs(i-3)*1.2,6,o.h);circ(-15,hy-3,5,o.h);circ(15,hy-3,5,o.h)}else{X.beginPath();X.arc(0,hy-3,15,Math.PI*1.1,TAU*0.95);X.fill();circ(-13,hy-2,4,o.h);circ(13,hy-2,4,o.h)}
  if(o.glasses){X.beginPath();X.arc(-5,hy,4.5,0,TAU);X.moveTo(11.5,hy);X.arc(7,hy,4.5,0,TAU);sl(1.6,o.glasses)}else{circ(-5,hy,2,'#3a2b2b');circ(6,hy,2,'#3a2b2b')}
  if(o.glasses){circ(-5,hy,1.6,'#3a2b2b');circ(7,hy,1.6,'#3a2b2b')}
  if(o.cap){X.fillStyle=o.cap;X.beginPath();X.arc(0,hy-6,15,Math.PI,0);X.fill();X.fillRect(0,hy-8,22,4)}
  if(o.visor){X.fillStyle=o.visor;X.fillRect(-15,hy-14,30,5);ell(10,hy-10,14,3,o.visor)}
  if(o.mus){ell(0,hy+6,7,2.6,o.h)}X.beginPath();X.arc(0.5,hy+6,4,0.3,Math.PI-0.3);sl(1.6,'#c2185b');ell(-9,hy+5,3,1.8,'rgba(255,130,160,0.45)');ell(10,hy+5,3,1.8,'rgba(255,130,160,0.45)')}
const _drawNPC7=drawNPC;drawNPC=function(k,x,o){if(k!=='gpa'&&k!=='gammy'&&k!=='moose')return _drawNPC7(k,x,o);const t=o.t||0;X.save();X.translate(x,0);ell(0,2,30,5,'rgba(80,40,90,0.15)');
  if(k==='moose'){v7moose(-20,0,1.1,1);X.restore();return}
  if(k==='gpa')v7person({tall:150,top:'#4fc3f7',leg:'#ffe0b2',shoe:'#8d6e63',sk:'#f2c9a8',h:'#e0e0e0',glasses:'#5d4037',cap:'#ef5350',mus:1,pat:(px,py)=>{for(let i=0;i<5;i++){const a=i*TAU/5;circ(px+Math.cos(a)*3,py+Math.sin(a)*3,2.2,'#fff59d')}}},t,o.wave);
  else v7person({tall:132,top:'#f48fb1',leg:'#f8bbd0',skirt:'#ce93d8',shoe:'#fff',sk:'#f4d6c4',h:'#f5f5f5',curly:1,glasses:'#ab47bc',visor:'#4dd0e1',pat:(px,py)=>circ(px,py,2.5,'#fff')},t,o.wave);
  X.restore()};
const _drawItem7=drawItem;drawItem=function(k,x,y,t){if(k==='gpahat'){X.save();X.translate(x,y);ell(0,-4,20,6,'#ffe082');ell(0,-10,11,8,'#ffd54f');X.fillStyle='#ef5350';X.fillRect(-11,-9,22,4);X.restore();return}
  if(k==='gamshell'){X.save();X.translate(x,y-8);shellArt(0,0,1.4,'#ff8fc8');X.restore();return}if(k==='pinecone'){v7pinecone(x,y-12,1);return}return _drawItem7(k,x,y,t)};
const _placeIcon7=placeIcon;placeIcon=function(k,x,y,s){if(k==='fl1'){X.save();X.translate(x-4*s,y+16*s);X.scale(s*0.17,s*0.17);v7palm(0,1,1);X.restore();X.save();X.translate(x,y);X.scale(s,s);ell(10,14,14,5,'#4fc3f7');X.restore()}
  else if(k==='fl2'){X.save();X.translate(x,y+22*s);X.scale(s*0.62,s*0.62);v7flamingo(0,0,1,1,T);X.restore()}
  else if(k==='colo'){X.save();X.translate(x,y);X.scale(s,s);v7mount(-24,24,16,40,'#90a4ae',1);X.save();X.translate(14,18);X.scale(0.3,0.3);v7pine(0,1);X.restore();X.restore()}
  else if(k==='camp'){X.save();X.translate(x,y);X.scale(s,s);v7tent(-6,14,0.36,'#ff8a65');v7fire(14,16,0.32,T);star5(-14,-16,5,'#fff59d');X.restore()}
  else _placeIcon7(k,x,y,s)};
const _wallBg7=wallBg;wallBg=function(sec,top,bot){const o=sec.out;if(o!=='fl1'&&o!=='fl2'&&o!=='colo')return _wallBg7(sec,top,bot);const x0=sec.x0,x1=sec.x1,w=x1-x0;
  if(o==='colo'){const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#90caf9');g.addColorStop(1,'#e3f2fd');X.fillStyle=g;X.fillRect(x0,top,w,-top);for(let x=x0+80;x<x1;x+=300)cloud(x,top+70+((x*7)%40),1);
    for(let x=x0-100;x<x1;x+=520)v7mount(x,x+640,-40,Math.min(-top-60,300+((x*13)%90)),'#90a4ae',1);for(let x=x0+160;x<x1;x+=760)v7mount(x,x+420,-40,200,'#78909c',0);
    X.fillStyle='#7cb342';X.fillRect(x0,-44,w,44);for(let x=x0+40;x<x1;x+=110)v7pine(x,0.55+((x*7)%5)*0.06,'#2e7d32');X.save();X.translate(0,-40);X.restore();
    v7waterfall(x0+1260,Math.max(top+80,-330),90,0);X.fillStyle='#4fc3f7';X.fillRect(x0+1180,-8,250,8);
    X.fillStyle='#8d6e63';X.fillRect(x0,0,w,bot);X.fillStyle='#9ccc65';X.fillRect(x0,0,w,6);
    v7tent(x0+2050,0,0.9,'#ffb74d');v7fire(x0+2200,-2,0.8,0);v7elk(x0+620,0,0.9,1);v7moose(x0+2580,0,0.8,-1);v7chip(x0+1500,0,1.1,1,0);v7chip(x0+1540,0,0.9,-1,0);v7marmot(x0+1900,0,1,1);v7marmot(x0+2870,0,0.9,1);
    signBoard(x0+150,-150,'Colorado Mountains','#2e7d32','#fff',22);return}
  // Florida: bright sky, palms, pool (Grandpa Brian) or beach (Gammy)
  const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#4fc3f7');g.addColorStop(1,'#e1f5fe');X.fillStyle=g;X.fillRect(x0,top,w,-top);for(let x=x0+80;x<x1;x+=320)cloud(x,top+70+((x*7)%40),1);
  if(o==='fl1'){circ(x0+2600,top+80,40,'#fff176');X.fillStyle='#fff8e1';X.fillRect(x0+120,-170,300,170);poly([x0+100,-170,x0+270,-240,x0+440,-170],'#ef9a9a');X.fillStyle='#81d4fa';X.fillRect(x0+180,-130,60,50);X.fillRect(x0+300,-130,60,50);X.fillStyle='#a1887f';X.fillRect(x0+250,-70,40,70);
    X.fillStyle='#e0f7fa';X.fillRect(x0,-30,w,30);X.fillStyle='#4dd0e1';rrect(x0+1150,-26,520,22,10);X.fill();X.fillStyle='rgba(255,255,255,0.7)';for(let x=x0+1170;x<x0+1650;x+=60)X.fillRect(x,-18,26,3);
    for(const [x,c] of [[x0+1230,'#ff5c9e'],[x0+1450,'#ffd54f']]){circ(x,-30,12,c);X.fillStyle='#fff';X.fillRect(x-12,-32,24,4)}
    signBoard(x0+620,-150,"Grandpa Brian's",'#00897b','#fff',22)}
  else{circ(x0+300,top+80,40,'#fff176');X.fillStyle='#4fc3f7';X.fillRect(x0,-70,w,70);X.fillStyle='#81d4fa';for(let x=x0;x<x1;x+=60){X.beginPath();X.arc(x+30,-70,30,Math.PI,0);X.fill()}
    X.fillStyle='#fffde7';X.fillRect(x0+2350,-190,300,190);poly([x0+2330,-190,x0+2500,-250,x0+2670,-190],'#80cbc4');X.fillStyle='#f8bbd0';X.fillRect(x0+2410,-150,60,50);X.fillRect(x0+2530,-150,60,50);X.fillStyle='#ce93d8';X.fillRect(x0+2480,-80,40,80);
    signBoard(x0+620,-150,"Gammy's House",'#ec407a','#fff',22)}
  for(let x=x0+60;x<x1;x+=420)v7palm(x,0.75+((x*3)%4)*0.06,((x/420)|0)%2?1:-1);
  X.fillStyle='#ffe0a3';X.fillRect(x0,0,w,bot);X.fillStyle='#fff3c4';X.fillRect(x0,0,w,6);
  for(let x=x0+900;x<x1;x+=1100){v7flamingo(x,-2,1,1,0);v7flamingo(x+46,-2,0.9,-1,1)}for(let x=x0+1900;x<x1;x+=1300)v7pelican(x,-2,1,-1);
  v7gator(o==='fl1'?x0+2000:x0+1550,-2,0.9,0)};
// ---------- trip mini-games ----------
MGS.ball={init(o){o.b=[];const n=W>H?6:4;for(let i=0;i<n;i++)o.b.push({u:(i+0.5)/n,up:0,c:pick(['#ff5c9e','#ffd54f','#4fc3f7','#81c784','#b388ff'])})},
  update(dt,o){for(const b of o.b){if(b.up>0){b.up+=dt;if(b.up>1.2)b.up=0}}},
  pos(b){const gy=mGround(),top=mgTop()+60;return{x:INL+40+b.u*(W-INL-INR-80),y:top+(gy-top)*0.6+Math.sin(T*2+b.u*9)*8}},
  down(p){for(const b of MG.o.b){const q=MGS.ball.pos(b);if(b.up===0&&Math.hypot(p.x-q.x,p.y-q.y)<64){b.up=0.01;AUD.SFX.splash();AUD.SFX.boing();mgScore(1,q.x,q.y-40);return}}},
  draw(o){const gy=mGround(),top=mgTop()+60,g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#81d4fa');g.addColorStop(1,'#e1f5fe');X.fillStyle=g;X.fillRect(0,0,W,H);
    X.fillStyle='#fff8e1';X.fillRect(0,top+(gy-top)*0.35,W,H);X.fillStyle='#26c6da';rrect(INL+14,top+(gy-top)*0.42,W-INL-INR-28,(gy-top)*0.5,30);X.fill();X.fillStyle='rgba(255,255,255,0.5)';for(let i=0;i<12;i++)X.fillRect(INL+40+((i*97+T*30)%(W-120)),top+(gy-top)*(0.5+(i%4)*0.1),40,4);
    for(const b of o.b){const q=MGS.ball.pos(b),h=b.up>0?Math.sin(b.up/1.2*Math.PI)*160:0;circ(q.x,q.y-h,36,b.c);X.fillStyle='#fff';X.beginPath();X.moveTo(q.x,q.y-h);X.arc(q.x,q.y-h,36,-0.5,0.5);X.fill();X.beginPath();X.moveTo(q.x,q.y-h);X.arc(q.x,q.y-h,36,2.6,3.6);X.fill();circ(q.x,q.y-h,8,'#fff')}
    v7palm(INL+40,1,1);X.save();X.translate(0,gy);v7gator(W-INR-110,0,0.8,T);X.restore();drawCat(INL+120,gy,{t:T,face:1,st:'idle',acc:catAcc(),s:1})}};
MGS.flamingo={init(o){o.glow=0;o.gt=0;o.pop=[]},
  lay(){const gy=mGround(),top=mgTop()+40,cols=3,rows=2,cw=(W-INL-INR)/cols,rh=(gy-top)/rows;const a=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)a.push({x:INL+cw*(c+0.5),y:top+rh*(r+0.85),s:Math.min(cw/120,rh/110,1.8)});return a},
  update(dt,o){o.gt-=dt;if(o.gt<=0){o.glow=(o.glow+1+((R()*4)|0))%6;o.gt=2.2}for(const q of o.pop)q.t+=dt;o.pop=o.pop.filter(q=>q.t<1.2)},
  down(p){const o=MG.o;MGS.flamingo.lay().forEach((q,i)=>{if(Math.abs(p.x-q.x)<70*q.s+20&&p.y>q.y-130*q.s&&p.y<q.y+20){if(i===o.glow){o.pop.push({x:q.x,y:q.y-100*q.s,t:0,k:pick(['💗','⭐','🌸','🐚'])});AUD.SFX.honk();mgScore(1,q.x,q.y-60*q.s);o.gt=0.3}else AUD.SFX.rustle()}})},
  draw(o){const gy=mGround(),g=X.createLinearGradient(0,0,0,gy);g.addColorStop(0,'#ffccbc');g.addColorStop(1,'#fff3e0');X.fillStyle=g;X.fillRect(0,0,W,H);X.fillStyle='#ffe0a3';X.fillRect(0,gy,W,H-gy);
    MGS.flamingo.lay().forEach((q,i)=>{const gl=i===o.glow,up=gl?Math.min(1,(2.2-o.gt)*4):0;X.save();X.translate(q.x,q.y);X.scale(q.s,q.s);if(up>0)v7flamingo(0,-10-30*up,1.3,1,T);
      for(let j=0;j<5;j++)circ(-44+j*22,-14-((j*7)%3)*6,26,j%2?'#43a047':'#66bb6a');if(gl){X.globalAlpha=0.35+0.25*Math.sin(T*8);circ(0,-40,60,'#fff59d');X.globalAlpha=1}X.restore()});
    for(const q of o.pop){X.globalAlpha=Math.max(0,1-q.t/1.2);txt(q.k,q.x,q.y-q.t*80,44,'#000');X.globalAlpha=1}
    drawCat(INL+60,gy,{t:T,face:1,st:'idle',acc:catAcc(),s:1})}};
MGS.hike={init(o){o.h=0;o.cx=0.1;o.mk=null;o.pop=[];o.an=0},
  update(dt,o){if(!o.mk)o.mk={u:clamp(o.cx+rr(0.15,0.3),0.08,0.92),t:0};o.mk.t+=dt;for(const q of o.pop)q.t+=dt;o.pop=o.pop.filter(q=>q.t<1.6)},
  path(u){const gy=mGround(),top=mgTop()+50;return{x:INL+40+u*(W-INL-INR-80),y:gy-(gy-top)*0.75*(0.5-0.5*Math.cos(u*Math.PI*2))}},
  down(p){const o=MG.o;if(!o.mk)return;const q=MGS.hike.path(o.mk.u);if(Math.hypot(p.x-q.x,p.y-q.y)<70){o.cx=o.mk.u;AUD.SFX.hop();mgScore(1,q.x,q.y-30);if(R()<0.5){o.pop.push({x:q.x,y:q.y-60,t:0,k:o.an++%4})}o.mk=null;if(o.cx>0.85){o.cx=0.05;sConf(30);sayT(pick(['We made it to the top!','What a view!','Yay, Alex!']),1)}}},
  draw(o){const gy=mGround(),top=mgTop()+50,g=X.createLinearGradient(0,0,0,gy);g.addColorStop(0,'#90caf9');g.addColorStop(1,'#e8f5e9');X.fillStyle=g;X.fillRect(0,0,W,H);
    v7mount(W*0.2,W*0.8,gy,(gy-top)*0.95,'#b0bec5',1);X.fillStyle='#7cb342';X.fillRect(0,gy,W,H-gy);X.save();X.translate(0,gy);for(let x=INL+20;x<W;x+=90)v7pine(x,0.5,'#2e7d32');X.restore();
    X.setLineDash([6,10]);X.beginPath();for(let u=0;u<=1;u+=0.02){const q=MGS.hike.path(u);u?X.lineTo(q.x,q.y):X.moveTo(q.x,q.y)}strokeC('rgba(121,85,72,0.7)',6);X.setLineDash([]);
    if(o.mk){const q=MGS.hike.path(o.mk.u),s=1+Math.sin(T*6)*0.1;circ(q.x,q.y,40*s,'rgba(255,245,157,0.6)');circ(q.x,q.y+4,10,'#8d6e63');for(let i=0;i<4;i++)circ(q.x-12+i*8,q.y-8-(i===1||i===2?4:0),4.5,'#8d6e63')}
    const c=MGS.hike.path(o.cx);drawCat(c.x,c.y,{t:T,face:1,st:'idle',acc:catAcc(),s:0.8});
    for(const q of o.pop){X.save();X.globalAlpha=Math.max(0,1-q.t/1.6);X.translate(0,-q.t*20);[()=>v7chip(q.x,q.y,1.6,1,T),()=>v7marmot(q.x,q.y,1.4,1),()=>v7elk(q.x,q.y+20,0.6,1),()=>v7moose(q.x,q.y+20,0.6,1)][q.k%4]();X.restore()}}};
const _mgIcon7=mgIcon;mgIcon=function(k,x,y,s){if(k==='ball'){X.save();X.translate(x,y);X.scale(s,s);circ(0,0,12,'#ff5c9e');X.fillStyle='#fff';X.beginPath();X.moveTo(0,0);X.arc(0,0,12,-0.5,0.5);X.fill();circ(0,0,3,'#fff');X.restore()}
  else if(k==='flamingo'){X.save();X.translate(x,y+12*s);X.scale(s*0.4,s*0.4);v7flamingo(0,0,1,1,T);X.restore()}else if(k==='hike'){X.save();X.translate(x,y);X.scale(s,s);circ(0,4,6,'#8d6e63');for(let i=0;i<4;i++)circ(-8+i*5.4,-4-(i===1||i===2?3:0),3,'#8d6e63');X.restore()}else _mgIcon7(k,x,y,s)};
// ---------- the flight (or car ride to the campout) ----------
let FL=null;
const TRIPS=[{k:'fl1',n:"Grandpa Brian's",sub:'Florida',go:()=>enterPlace(V7I.fl1),say:"Let's fly to Florida to see Grandpa Brian!",fly:1,wear:['sunhat','shades']},
 {k:'fl2',n:"Gammy's House",sub:'Florida',go:()=>enterPlace(V7I.fl2),say:"Let's fly to Florida to see Gammy!",fly:1,wear:['sunhat','shades']},
 {k:'colo',n:'Colorado',sub:'Mountains',go:()=>enterPlace(V7I.colo),say:"Let's fly to the Colorado mountains!",fly:1,wear:['knit','boots']},
 {k:'camp',n:'Campout',sub:'Michigan',go:()=>openScreen('campout'),say:"Let's drive to the state park for a campout!",fly:0}];
function tripGo(T0){openScreen('flight');FL={t:0,tr:T0,done:0};AUD.SFX.plane();v7say(T0.say,3)}
function tripLand(){const tr=FL.tr;FL.done=1;const x=SAVE.x;x.trip[tr.k]=(x.trip[tr.k]||0)+1;let neu=0;
  if(tr.wear){const other=tr.wear[0]==='knit'?['sunhat','shades']:['knit','boots'];for(const k of other)SAVE.wear[k]=0;for(const k of tr.wear){if(!SAVE.un[k])neu=1;SAVE.un[k]=1;SAVE.wear[k]=1}if(tr.wear.includes('knit')||tr.wear.includes('sunhat')){SAVE.wear.witch=0;SAVE.wear.santa=0;SAVE.wear.crown=0;SAVE.wear.horn=0}}
  save();tr.go();if(neu)setTimeout(()=>{v7say(tr.wear[0]==='knit'?'Trip clothes! A cozy knit hat and hiking boots for Doodle!':'Trip clothes! A sun hat and sunglasses for Doodle!',2);sConf(30)},3200)}
SCR.flight={open(){AUD.setTheme('park')},close(){FL=null},back(){if(FL&&!FL.done){tripLand();return true}return false},down(){if(FL&&FL.t>0.8&&!FL.done)tripLand()}};
XS.flight={upd(dt){if(!FL)return;FL.t+=dt;if(FL.t>4.6&&!FL.done)tripLand()},
  draw(){UI=[];if(!FL){softBg('#b3e5fc','#e1f5fe');return}const t=FL.t,fly=FL.tr.fly,k=clamp(t/4.4,0,1);
    const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,fly?'#4fc3f7':'#ffcc80');g.addColorStop(1,fly?'#e1f5fe':'#fff3e0');X.fillStyle=g;X.fillRect(0,0,W,H);
    for(let i=0;i<7;i++)cloud(((i*230-t*(fly?260:120))%(W+300)+W+300)%(W+300)-150,H*(0.2+((i*37)%50)/100),1.2+(i%3)*0.3);
    if(fly){const x=lerp(-160,W+160,k),y=H*0.5-Math.sin(k*Math.PI)*H*0.18+Math.sin(t*3)*6;X.save();X.translate(x,y);X.rotate(-0.08+Math.cos(k*Math.PI)*-0.15);
      ell(0,0,140,34,'#ffffff');poly([120,-10,170,-4,120,20],'#fff');poly([-130,-10,-170,-70,-110,-14],'#ff8fc8');poly([-20,0,40,0,-50,70],'#e1bee7');poly([-20,-6,40,-6,-40,-60],'#f3e5f5');
      for(let i=0;i<5;i++){circ(-70+i*38,-6,13,'#81d4fa')}X.save();X.beginPath();X.arc(-32,-6,13,0,TAU);X.clip();drawCat(-32,10,{t:T,st:'idle',acc:catAcc(),s:0.32});X.restore();
      X.save();X.beginPath();X.arc(6,-6,13,0,TAU);X.clip();circ(6,-6,9,'#f7d5bf');circ(6,-14,9,'#a8754a');circ(3,-6,1.4,'#333');circ(9,-6,1.4,'#333');X.restore();txt('💗',70,-6,14,'#000');X.restore();
      for(let i=0;i<5;i++)circ(x-160-i*30,y+10+Math.sin(t*5+i)*4,10-i*1.6,'rgba(255,255,255,0.8)')}
    else{const gy=H*0.72;X.fillStyle='#81c784';X.fillRect(0,gy,W,H-gy);X.fillStyle='#90a4ae';X.fillRect(0,gy+20,W,60);X.fillStyle='#fff';for(let i=0;i<10;i++)X.fillRect(((i*160-t*300)%(W+200)+W+200)%(W+200)-100,gy+48,70,6);
      X.save();X.translate(0,gy);for(let i=0;i<8;i++)v7pine(((i*190-t*160)%(W+200)+W+200)%(W+200)-100,0.7);X.restore();
      const x=W*0.5,y=gy+40+Math.abs(Math.sin(t*8))*3;X.save();X.translate(x,y);X.fillStyle='#ba68c8';rrect(-110,-70,220,60,22);X.fill();X.fillStyle='#ce93d8';rrect(-70,-110,140,48,18);X.fill();X.fillStyle='#e1f5fe';rrect(-60,-102,56,34,8);X.fill();rrect(6,-102,56,34,8);X.fill();
      X.save();rrect(-60,-102,56,34,8);X.clip();drawCat(-32,-62,{t:T,st:'idle',acc:catAcc(),s:0.4});X.restore();circ(34,-84,9,'#f7d5bf');circ(34,-92,9,'#a8754a');v7tent(0,-110,0.4,'#ff8a65');circ(-60,-8,20,'#424242');circ(60,-8,20,'#424242');circ(-60,-8,8,'#bdbdbd');circ(60,-8,8,'#bdbdbd');X.restore()}
    const s=Math.min(1,t*2);X.globalAlpha=s;X.fillStyle='rgba(255,255,255,0.85)';const w=Math.min(W-40,420);rrect(W/2-w/2,TOP+20,w,64,32);X.fill();txt((fly?'✈️ ':'🚗 ')+FL.tr.n+'!',W/2,TOP+53,28,'#c2185b');X.globalAlpha=1;
    if(t>4.2){X.globalAlpha=clamp((t-4.2)*3,0,1);X.fillStyle='#fff';X.fillRect(0,0,W,H);X.globalAlpha=1}
    btn('skip',0,0,W,H,()=>{if(FL&&FL.t>0.8&&!FL.done)tripLand()})}};
// sticker book keeps its tidy 8-place layout; trip stickers show in the Trips hub
const _drawBook7=drawBook;drawBook=function(){const ex=PLACES.splice(8);try{_drawBook7()}finally{PLACES.push(...ex)}};
const _itemIcon7=itemIcon;itemIcon=function(k){if(k==='sunhat'){ell(0,-4,24,7,'#ffe082');ell(0,-11,13,10,'#ffd54f');X.fillStyle='#ff8fc8';X.fillRect(-13,-10,26,5);circ(10,-9,4,'#ff5c9e')}
  else if(k==='shades'){X.fillStyle='#263238';rrect(-20,-14,17,12,4);X.fill();rrect(3,-14,17,12,4);X.fill();X.fillRect(-4,-11,8,3);X.fillStyle='rgba(255,255,255,0.6)';X.fillRect(-17,-12,4,3);X.fillRect(6,-12,4,3)}
  else if(k==='knit'){X.fillStyle='#4fc3f7';X.beginPath();X.arc(0,-2,18,Math.PI,0);X.fill();X.fillStyle='#fff';rrect(-19,-6,38,9,4);X.fill();circ(0,-24,7,'#fff')}
  else if(k==='boots'){for(const bx of [-11,11]){X.fillStyle='#8d6e63';rrect(bx-8,-20,13,24,4);X.fill();rrect(bx-8,-2,19,8,4);X.fill();X.fillStyle='#ffcc80';X.fillRect(bx-8,-22,13,4)}}
  else _itemIcon7(k)};
