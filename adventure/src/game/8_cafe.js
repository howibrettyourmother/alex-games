// ================= Kitty Café: pick a bowl, a treat and sprinkles, then tap a kitty to feed them =================
const CAFE={bowls:[['#ff6f00','heart','Pink bowl'],['#b388ff','star','Purple bowl'],['#80deea','dots','Blue bowl'],['#ffd54f','crown','Gold bowl']],
  treats:[['fish','Fish'],['cupcake','Cupcake'],['milk','Milk'],['kibble','Star crunchies']],
  sprinkles:[['rainbow','Rainbow sprinkles'],['hearts','Heart sprinkles'],['stars','Star sprinkles'],['glitter','Sparkly sprinkles']]};
const CSTEP=['Pick a bowl!','Pick a treat!','Add sprinkles!','Tap a kitty to feed!'];
let CF=null;
function cafeOpen(){CF={step:0,bowl:0,treat:0,spr:0,fly:null,eat:{},full:{},pick:-1,adv:0,tabs:[]};AUD.setTheme('cozy');sayT('Welcome to the Kitty Café! Pick a bowl!',3)}
function cafeCats(){return[{k:'doodle'}].concat(parade().map(K=>({k:K.k})))}
function drawBowl(x,y,s,b,t,sp,eaten){X.save();X.translate(x,y);X.scale(s,s);const B=CAFE.bowls[b];
  if(t!=null&&!eaten){const T0=CAFE.treats[t][0];
    if(T0==='fish'){for(let i=0;i<3;i++){X.save();X.translate(-14+i*14,-14-(i===1?6:0));X.rotate(-0.3+i*0.3);drawItem('fish',0,0,0);X.restore()}}
    else if(T0==='cupcake'){X.fillStyle='#ffb74d';X.beginPath();X.moveTo(-14,-10);X.lineTo(14,-10);X.lineTo(10,4);X.lineTo(-10,4);X.fill();circ(-7,-16,9,'#fff0f6');circ(7,-16,9,'#fff0f6');circ(0,-23,9,'#ffc1e3');circ(0,-33,4,'#ff5252')}
    else if(T0==='milk'){ell(0,-8,30,9,'#fffdf7');circ(-10,-12,3,'#fff');circ(8,-13,2.4,'#fff');heartP(0,-10,5,'#ffe0ef')}
    else{for(let i=0;i<9;i++)star5(-22+(i%5)*11,-12-((i/5)|0)*8,5,['#ffcc80','#ffab91','#ffe082'][i%3],i)}
    if(sp!=null){const S=CAFE.sprinkles[sp][0];for(let i=0;i<9;i++){const sx=-22+((i*17)%44),sy=-28+((i*11)%18);
      if(S==='rainbow'){X.save();X.translate(sx,sy);X.rotate(i);X.fillStyle=['#ff5c9e','#ffd54f','#81c784','#64b5f6','#b388ff'][i%5];X.fillRect(-3,-1,6,2.4);X.restore()}
      else if(S==='hearts')heartP(sx,sy,3.4,['#ff5c9e','#ff6f00'][i%2]);else if(S==='stars')star5(sx,sy,3.6,'#fff59d');else circ(sx,sy,1.8,['#fff','#ffe0f7','#e1d4ff'][i%3])}}}
  X.fillStyle=B[0];X.beginPath();X.moveTo(-34,-8);X.quadraticCurveTo(-32,18,0,18);X.quadraticCurveTo(32,18,34,-8);X.closePath();X.fill();ell(0,-8,34,6,'rgba(255,255,255,0.35)');
  if(B[1]==='heart')heartP(0,6,6,'#fff');else if(B[1]==='star')star5(0,5,7,'#fff');else if(B[1]==='dots'){for(let i=0;i<3;i++)circ(-12+i*12,5,3,'#fff')}else crown(0,8,0.7);X.restore()}
function cafeLayout(){const land=W>H*1.15,bb=Math.max(64,PT(46)),ts=Math.max(PT(58),Math.min(land?108:100,land?(W-INL-INR-300)/4-14:(W-INL-INR-40-130)/2-8)),tab=Math.max(48,PT(44));
  const ph=tab+16+(land?ts:2*ts+12)+24,py=H-Math.max(BOT,8)-ph,catsY=py-26,cats=cafeCats(),n=cats.length,sp=Math.min(land?130:96,(W-INL-INR-30)/n),sc=land?clamp((catsY-TOP-bb-40)/130,1,1.5)*Math.min(1,sp/100):clamp(sp/80,0.7,H>650?1.3:0.95);
  return{land,bb,ts,tab,ph,py,catsY,sp,sc,n,cats,x0:W/2-(n-1)*sp/2}}
function drawCafe(){UI=[];const c=CF,L=cafeLayout();
  X.fillStyle='#ffe9f3';X.fillRect(0,0,W,H);X.fillStyle='#ffd3e6';for(let y=TOP+L.bb+30;y<L.catsY-60;y+=56)for(let x=((y/56)%2)*28;x<W;x+=56)heartP(x,y,7,'#ffd3e6');
  for(let x=0;x<W;x+=44){X.fillStyle=(x/44)%2?'#fff':'#ff6f00';X.beginPath();X.moveTo(x,0);X.lineTo(x+44,0);X.lineTo(x+44,TOP+18);X.quadraticCurveTo(x+22,TOP+34,x,TOP+18);X.fill()}
  cafeDecor(L);X.fillStyle='#e8c7a5';X.fillRect(0,L.catsY-4,W,H-L.catsY+4);X.fillStyle='rgba(0,0,0,0.06)';X.fillRect(0,L.catsY-4,W,3);
txt('Kitty Café',L.land?W/2:(INL+222+W-INR)/2,TOP+12+L.bb/2,L.land?32:24,'#0d47a1',{st:'#fff',sw:5});
  // cats waiting for their snack
  L.cats.forEach((ct,i)=>{const x=L.x0+i*L.sp,y=L.catsY,eat=c.eat[i]>0,full=c.full[i];ell(x,y+2,34*L.sc,7*L.sc,'#fff');
    if(c.step===3&&!eat&&!c.fly){X.globalAlpha=0.4+0.3*Math.sin(T*5+i);ell(x,y-30*L.sc,40*L.sc,46*L.sc,'#fff59d');X.globalAlpha=1}
    const bob=eat?Math.abs(Math.sin(T*10))*3:0;
    if(ct.k==='doodle')drawCat(x,y+bob,{t:T,face:1,st:eat?'purr':full?'flop':'idle',acc:catAcc(),s:0.85*L.sc});else blitKit(ct.k,'sit',0,x,y+bob,i%2?1:-1,L.sc,{closed:eat||full});
    if(eat||c.eat[i]!=null)drawBowl(x+(ct.k==='doodle'?30:16)*L.sc,y-6,0.55*L.sc,c.eat[i+'b'][0],c.eat[i+'b'][1],c.eat[i+'b'][2],!eat);
    if(full&&!eat)heartP(x,y-(ct.k==='doodle'?95:72)*L.sc+Math.sin(T*3+i)*3,9,'#ff5c9e');
    btn('cat'+i,x-L.sp/2,y-110*L.sc,L.sp,120*L.sc,()=>cafeFeed(i,x,y))});
  if(c.fly){const f=c.fly,t=clamp(f.t,0,1);drawBowl(lerp(f.x0,f.x1,t),lerp(f.y0,f.y1,t)-Math.sin(t*Math.PI)*90,lerp(1,0.55*L.sc,t),c.bowl,c.treat,c.spr)}
  // panel: step tabs, the bowl being made, and big picture choices
  const px=INL+10,pw=W-INL-INR-20;X.fillStyle='rgba(255,255,255,0.92)';rrect(px,L.py,pw,L.ph+Math.max(BOT,8),26);X.fill();
  const tabs=[(x,y)=>drawBowl(x,y+4,0.42,0),(x,y)=>drawItem('fish',x,y,0),(x,y)=>{for(let i=0;i<5;i++)circ(x-10+i*5,y+((i*7)%9)-4,2.4,['#ff5c9e','#ffd54f','#81c784','#64b5f6','#b388ff'][i])},(x,y)=>{const c=CF.step===3?'#fff':'#ff6f00';circ(x,y+4,7,c);for(let i=0;i<4;i++)circ(x-8+i*5.4,y-5-(i===1||i===2?3:0),2.8,c)}];
  const tw=L.tab,tg=14,tx0=W/2-(4*tw+3*tg)/2;for(let i=0;i<4;i++){const x=tx0+i*(tw+tg),y=L.py+10,on=c.step===i,done=i<c.step;X.fillStyle=on?'#ff6f00':done?'#e1bee7':'#f3e5f5';rrect(x,y,tw,tw,16);X.fill();X.save();if(on){X.translate(x+tw/2,y+tw/2);X.scale(1.2,1.2);X.translate(-x-tw/2,-y-tw/2)}tabs[i](x+tw/2,y+tw/2);X.restore();
    if(i<3)btn('tab'+i,x,y,tw,tw,()=>{c.step=i;AUD.SFX.click();sayT(CSTEP[i],2)})}
  const cy=L.py+L.tab+26,area=L.land?L.ts:2*L.ts+12,pvx=px+(L.land?120:76);ell(pvx,cy+area/2+26,58,10,'rgba(0,0,0,0.06)');
  const pulse=c.step===3&&!c.fly?1+Math.sin(T*6)*0.05:1;if(!c.fly)drawBowl(pvx,cy+area/2+8,(L.land?1.35:1.05)*pulse,c.bowl,c.step>=1?c.treat:null,c.step>=2?c.spr:null);
  const opts=c.step===0?CAFE.bowls:c.step===1?CAFE.treats:c.step===2?CAFE.sprinkles:null;
  if(opts){const cols=L.land?4:2,gx=L.land?px+250:pvx+70,gw=px+pw-gx-10,ts=L.ts,gap=Math.min(14,(gw-cols*ts)/(cols-1||1));
    opts.forEach((op,i)=>{const x=gx+(i%cols)*(ts+gap)+(gw-cols*ts-(cols-1)*gap)/2,y=cy+((i/cols)|0)*(ts+12),sel=(c.step===0?c.bowl:c.step===1?c.treat:c.spr)===i&&c.pick===i;
      X.fillStyle=sel?'#ffc1e3':'#fff0f7';rrect(x,y,ts,ts,20);X.fill();if(sel){X.lineWidth=4;X.strokeStyle='#ff5c9e';rrect(x,y,ts,ts,20);X.stroke()}
      const k=ts/100;if(c.step===0)drawBowl(x+ts/2,y+ts*0.58,k*1.1,i);else if(c.step===1)drawBowl(x+ts/2,y+ts*0.62,k*0.95,c.bowl,i);else drawBowl(x+ts/2,y+ts*0.62,k*0.95,c.bowl,c.treat,i);
      btn('opt'+i,x,y,ts,ts,()=>cafePick(i))})}
  else{const gx=L.land?px+250:pvx+70;txt('👆',gx+(px+pw-gx)/2,cy+area/2-16+Math.sin(T*5)*6,40,'#000');poly([gx+(px+pw-gx)/2-12,cy+area/2+20,gx+(px+pw-gx)/2+12,cy+area/2+20,gx+(px+pw-gx)/2,cy+area/2+40],'#ff5c9e')}
  bigBack()}
function cafePick(i){const c=CF;if(c.adv)return;const k=['bowl','treat','spr'][c.step];c[k]=i;c.pick=i;AUD.SFX.sticker();const op=[CAFE.bowls,CAFE.treats,CAFE.sprinkles][c.step][i];sayT(op[op.length-1]+'!',2);sSpark(W/2,H*0.7,6);
  c.adv=setTimeout(()=>{c.adv=0;c.pick=-1;c.step++;if(CF===c)setTimeout(()=>sayT(CSTEP[c.step],1),900)},450)}
function cafeFeed(i,x,y){const c=CF;if(c.step!==3||c.fly||c.eat[i]>0){if(c.step<3){AUD.SFX.boing();sayT(CSTEP[c.step],2)}return}const L=cafeLayout();
  c.fly={t:0,x0:INL+10+(L.land?120:76),y0:L.py+L.tab+26+(L.land?L.ts:2*L.ts+12)/2,x1:x+(i?16:30)*L.sc,y1:y-6,i}}
function updCafe(dt){const c=CF;if(!c)return;if(c.fly){c.fly.t+=dt*1.8;if(c.fly.t>=1){const i=c.fly.i;c.eat[i]=2.4;c.eat[i+'b']=[c.bowl,c.treat,c.spr];c.fly=null;AUD.SFX.munch();
      const ct=cafeCats()[i],nm=ct.k==='doodle'?'Doodle':kitName(ct.k);setTimeout(()=>sayT(pick(['Yum yum! ','Nom nom nom! ','Yummy! '])+nm+' loves it!',2),500)}}
  for(let i=0;i<8;i++)if(c.eat[i]>0){const L=cafeLayout(),x=L.x0+i*L.sp;c.eat[i]-=dt;if(R()<dt*5)sHearts(x,L.catsY-70*L.sc,1);if(((c.eat[i]*1.4)|0)!==(((c.eat[i]+dt)*1.4)|0))AUD.SFX.munch();
    if(c.eat[i]<=0){c.full[i]=1;AUD.SFX.purr(1.2);AUD.SFX.meow(i%3);c.step=0;
      if(cafeCats().every((q,j)=>c.full[j])){sConf(60);AUD.SFX.sticker();sayT('Everyone is happy and full! Great job, Alex!',3);setTimeout(()=>{if(CF===c){c.full={};for(const k in c.eat)delete c.eat[k]}},5000)}
      else setTimeout(()=>sayT('Make another bowl!',1),1600)}}}
SCR.cafe={open:cafeOpen,close(){if(CF&&CF.adv)clearTimeout(CF.adv);CF=null}};
// wall decor: a kitty sign and a shelf of treats (only when there is room)
function cafeDecor(L){const top=TOP+L.bb+30,bot=L.catsY-120*L.sc;if(bot-top<110)return;const cy=(top+bot)/2,w=Math.min(W*0.7,420),x0=W/2-w/2;
  X.fillStyle='#b07f55';rrect(x0,cy+30,w,10,5);X.fill();
  for(let i=0;i<5;i++){const x=x0+w*(0.1+i*0.2),y=cy+30;if(i===2){X.beginPath();X.moveTo(x,y-120);X.lineTo(x-22,y-74);X.moveTo(x,y-120);X.lineTo(x+22,y-74);strokeC('#b07f55',2);circ(x,y-120,3,'#b07f55');
      circ(x,y-50,32,'#fff');circ(x,y-50,27,'#ffc1e3');poly([x-22,y-66,x-18,y-88,x-6,y-74],'#ffc1e3');poly([x+22,y-66,x+18,y-88,x+6,y-74],'#ffc1e3');circ(x-9,y-54,3,'#0d47a1');circ(x+9,y-54,3,'#0d47a1');poly([x-3,y-47,x+3,y-47,x,y-44],'#ff5c9e');X.beginPath();X.arc(x,y-40,6,0.3,Math.PI-0.3);strokeC('#0d47a1',2);continue}
    if(i%2){X.fillStyle='rgba(220,240,255,0.8)';rrect(x-14,y-38,28,38,6);X.fill();X.fillStyle='#ff6f00';X.fillRect(x-15,y-42,30,6);for(let j=0;j<3;j++){X.save();X.translate(x-4+j*4,y-12-j*8);X.scale(0.6,0.6);drawItem('fish',0,0,0);X.restore()}}
    else{X.fillStyle='#ffb74d';X.beginPath();X.moveTo(x-12,y-18);X.lineTo(x+12,y-18);X.lineTo(x+9,y);X.lineTo(x-9,y);X.fill();circ(x-6,y-24,8,'#fff0f6');circ(x+6,y-24,8,'#fff0f6');circ(x,y-30,8,i?'#d1a6ff':'#ffc1e3');circ(x,y-39,3.5,'#ff5252')}}}
