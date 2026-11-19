// ================= seasons & surprises, picked automatically from the device date (zero maintenance) =================
// October: pumpkins + a witch-hat costume for Doodle. December: snow, twinkly lights, presents, Santa hat.
// December 10 (Alex's birthday): cake, balloons, party hats for everyone and "Happy Birthday, Alex!" (spoken too). Spring petals, summer sunshine.
// Test any of them with ?season=hal|win|bday|spring|summer|none
const SEASON=(()=>{const d=new Date();let mo=d.getMonth()+1,da=d.getDate();const m=Q.match(/[?&]season=(\w+)/);
  if(m){const v=m[1];[mo,da]={hal:[10,15],win:[12,15],bday:[12,10],spring:[4,10],summer:[7,10],none:[9,10]}[v]||[mo,da]}
  const bday=mo===12&&da===10,k=bday?'bday':mo===10?'hal':mo===12?'win':(mo>=3&&mo<=5)?'spring':(mo>=6&&mo<=8)?'summer':null;return{k,bday,year:d.getFullYear()}})();
function catAcc(){return SEASON.bday?Object.assign({},SAVE.wear,{party:1}):SAVE.wear}
function seasonBoot(){const y=SEASON.year;
  if(SEASON.k==='hal'){SAVE.un.witch=1;if(!SAVE.fl['hal'+y]){SAVE.fl['hal'+y]=1;Object.assign(SAVE.wear,{crown:0,horn:0,santa:0,witch:1})}}
  if(SEASON.k==='win'){SAVE.un.santa=1;if(!SAVE.fl['win'+y]){SAVE.fl['win'+y]=1;Object.assign(SAVE.wear,{crown:0,horn:0,witch:0,santa:1})}}
  if(SEASON.bday)SAVE.un.party=1;save()}
// ---------- seasonal art (small, cached as sprites) ----------
function pumpkin(x,y,s){X.save();X.translate(x,y);X.scale(s,s);ell(-10,-16,12,16,'#ffa94d');ell(10,-16,12,16,'#ffa94d');ell(0,-16,13,17,'#ffb866');X.fillStyle='#7cb342';X.fillRect(-2,-36,4,8);ell(6,-34,6,3,'#9ccc65',0.4);
  ell(-6,-19,2.2,3,'#7a4a2a');ell(6,-19,2.2,3,'#7a4a2a');X.beginPath();X.arc(0,-13,5,0.3,Math.PI-0.3);strokeC('#7a4a2a',1.8);ell(-11,-12,3,1.8,'rgba(255,120,150,0.55)');ell(11,-12,3,1.8,'rgba(255,120,150,0.55)');X.restore()}
function present(x,y,s,c){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle=c;rrect(-18,-30,36,30,4);X.fill();X.fillStyle='#fff59d';X.fillRect(-3,-30,6,30);X.fillRect(-18,-18,36,6);bow(0,-31,0.9,'#fff');X.restore()}
function cake(x,y,s){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#ffd6ec';rrect(-30,-34,60,34,8);X.fill();X.fillStyle='#fff';rrect(-30,-38,60,12,6);X.fill();for(let i=0;i<5;i++)circ(-24+i*12,-26,3,'#fff');X.fillStyle='#ff8fc8';rrect(-22,-60,44,24,6);X.fill();X.fillStyle='#fff';rrect(-22,-62,44,8,4);X.fill();
  for(let i=0;i<5;i++){X.fillStyle=['#b388ff','#80deea','#ffd54f','#ff8fc8','#81c784'][i];X.fillRect(-15+i*7,-76,3,14);ell(-13.5+i*7,-80,2.4,4,'#ffb74d')}X.restore()}
function balloon(x,y,c){X.beginPath();X.moveTo(x,y+26);X.quadraticCurveTo(x-6,y+60,x+2,y+90);strokeC('rgba(150,120,170,0.7)',1.5);ell(x,y,18,23,c);poly([x-4,y+26,x+4,y+26,x,y+21],c);ell(x-6,y-8,4,7,'rgba(255,255,255,0.5)',-0.4)}
function bunting(x0,x1,step,C){X.beginPath();X.moveTo(x0,8);for(let x=x0;x<=x1;x+=step)X.lineTo(x,8+Math.sin(x*0.05)*3);strokeC('rgba(150,120,170,0.6)',1.5);let i=0;for(let x=x0+step/2;x<x1;x+=step)poly([x-step*0.38,9,x+step*0.38,9,x,9+step*0.8],C[i++%C.length])}
function lights(x0,x1,y,ph){X.beginPath();X.moveTo(x0,y);for(let x=x0;x<=x1;x+=30)X.quadraticCurveTo(x+15,y+10,x+30,y);strokeC('#4a7a4a',1.5);let i=0;const C=['#ff5c9e','#ffd54f','#80d8ff','#b388ff','#81c784'];
  for(let x=x0+15;x<x1;x+=30){const on=((i+((ph*2)|0))%3)!==0;X.globalAlpha=on?1:0.45;ell(x,y+11,3.6,5,C[i%5]);X.globalAlpha=1;i++}}
function seaSpr(k){return spr('sea:'+k,90,110,()=>{X.translate(0,50);if(k==='hal')pumpkin(0,0,1.2);else if(k==='win'){present(-14,0,0.9,'#ff8fc8');present(16,0,0.7,'#b388ff')}else if(k==='bday'){balloon(-12,-80,'#ff8fc8');balloon(14,-90,'#b388ff')}else if(k==='spring'){for(let i=0;i<3;i++){X.fillStyle='#7fcf9a';X.fillRect(-16+i*16,-24,2,24);for(let j=0;j<5;j++){const a=j*TAU/5;circ(-15+i*16+Math.cos(a)*5,-26+Math.sin(a)*5,4.5,['#ffb3d9','#d7c6ff','#fff59d'][i])}}}})}
let seaSpots=[];
function seasonEnter(){seaSpots=[];if(!SEASON.k||SEASON.k==='summer')return;for(const f of [0.2,0.48,0.82])seaSpots.push(Math.round(pl.w*f))}
function drawSeasonWorld(){if(!seaSpots.length)return;const s=seaSpr(SEASON.k);for(const x of seaSpots)if(x>camX-60&&x<camX+W+60)X.drawImage(s.c,x-45,-105,90,110)}
// ---------- falling snow / petals (screen space, capped at 30) ----------
let flakes=[];
function updSeason(dt){const k=SEASON.k;if(SEASON.bday&&!bdaySaid&&AUD.unlocked&&SPEAK.unlocked&&state==='title'){bdaySaid=1;setTimeout(()=>{sayT('Happy Birthday, Alex!',3);sConf(60);AUD.SFX.sticker()},600)}if(k!=='win'&&k!=='spring'){flakes.length=0;return}const n=k==='win'?30:12;while(flakes.length<n)flakes.push({x:R()*W,y:R()*H,v:rr(25,60),ph:R()*6,r:rr(1.6,3.6)});
  for(const f of flakes){f.y+=f.v*dt;f.x+=Math.sin(T+f.ph)*12*dt;if(f.y>H+6){f.y=-6;f.x=R()*W}if(f.x>W+6)f.x=-6;if(f.x<-6)f.x=W+6}}
let bdaySaid=0;
function outdoorsNow(){if(state!=='play')return true;const cx=camX+W/2;const s=pl.secs.find(q=>cx>=q.x0&&cx<q.x1);return !!(s&&s.out)}
function drawSeasonFx(){const k=SEASON.k;if(k==='win'||k==='spring'){if(!outdoorsNow())return;X.globalAlpha=0.85;for(const f of flakes){if(k==='win')circ(f.x,f.y,f.r,'#fff');else ell(f.x,f.y,f.r+2,f.r*0.8,'#ffc1e3',f.ph+T)}X.globalAlpha=1}}
// top-of-screen garland, cached as a sprite (redrawn only on resize / blink frame)
function drawSeasonPlay(){const k=SEASON.k,w=Math.ceil(W)+40;
  if(k==='win'){const f=((T*2)|0)%3,s=spr('lights'+f+'_'+w,w,26,()=>{X.translate(-w/2,-13);lights(0,w,1,f/2)});X.drawImage(s.c,-20,TOP+1,w,26)}
  else if(k==='hal'||SEASON.bday){const s=spr('bunt'+k+'_'+w,w,40,()=>{X.translate(-w/2,-20);bunting(0,w,26,SEASON.bday?['#ff8fc8','#ffd54f','#b388ff','#80deea']:['#ffb74d','#b388ff','#fff59d'])});X.drawImage(s.c,-20,TOP-4,w,40)}}
function drawSeasonMap(land){const k=SEASON.k,b=H-Math.max(BOT,8);if(!k)return;
  if(k==='hal'){const p=seaSpr('hal');X.drawImage(p.c,INL+40-45,b-90-55,90,110);X.drawImage(p.c,W-INR-46-36,b-96-44,72,88);drawSeasonPlay()}
  else if(k==='win'){const p=seaSpr('win');X.drawImage(p.c,INL+40-45,b-94-55,90,110);X.drawImage(p.c,W-INR-44-45,b-94-55,90,110);drawSeasonPlay()}
  else if(k==='bday'){drawSeasonPlay();balloon(INL+34,TOP+160,'#ff8fc8');balloon(W-INR-34,TOP+170,'#b388ff');cake(INL+48,b-90,0.9)}
  else if(k==='summer'){const x=INL+40,y=TOP+120;circ(x,y,22,'#fff59d');for(let i=0;i<8;i++){const a=i*TAU/8+T*0.3;circ(x+Math.cos(a)*30,y+Math.sin(a)*30,3,'#ffe082')}circ(x-7,y-3,2,'#7a4a2a');circ(x+7,y-3,2,'#7a4a2a');X.beginPath();X.arc(x,y+3,7,0.3,Math.PI-0.3);strokeC('#7a4a2a',2)}
  drawSeasonFx()}
