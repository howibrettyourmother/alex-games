// ================= v1.7.1 polish: trip kitty friends, trip sticker page, visitors on Main Street =================
KITTIES.push(
 {k:'coco',p:'fl1',n:'Coconut Kitty',x:1440,y:-38,s:0.64,c:'#fff3e0',d:'#ffcc80',w:'#ffffff',bow:'#26c6da',eye:'#00897b',ear:'#ffc1d6',names:[['Coconut','🥥'],['Sunny','☀️'],['Mango','🥭'],['Palm','🌴']]},
 {k:'flora',p:'fl2',n:'Flamingo Kitty',x:1440,y:-38,s:0.62,c:'#ffd6e7',d:'#f8a5c2',w:'#fff5f9',lash:1,eye:'#ec407a',ear:'#ff8fb3',names:[['Flamingo','🦩'],['Shelly','🐚'],['Coral','🪸'],['Peaches','🍑']]},
 {k:'pine',p:'colo',n:'Mountain Kitty',x:1440,y:-38,s:0.7,c:'#a1887f',d:'#795548',w:'#efebe9',fluff:1,eye:'#7cb342',ear:'#ffc1d6',tip:'#efebe9',names:[['Maple','🍁'],['Pinecone','🌲'],['Snowcap','🏔️'],['Bear','🐻']]});
// ---------- sticker book page 2: trips (Florida x2, Colorado, campout) ----------
let BKP=0;{const _o=SCR.book.open;SCR.book.open=function(){BKP=0;_o&&_o.apply(this,arguments)}}
const _drawBook71=drawBook;drawBook=function(){if(BKP===0){_drawBook71()}else{UI=[];softBg('#e1f5fe','#ffe0f0');const land=W>H*1.15;txt('My Trip Stickers',W/2,TOP+(land?52:110),land?34:30,'#0277bd');
    const ts=TRIPS,n=ts.length,cols=land?4:2,r=land?Math.min(70,W/12,H/8):Math.min(56,W/6),cw=land?W/(cols+0.4):W/2.4;
    ts.forEach((tr,i)=>{const c=i%cols,rw=(i/cols)|0,x=W/2+(c-(Math.min(cols,n-rw*cols)-1)/2)*cw,y=TOP+(land?H*0.42:240)+rw*(r*2+90),got=tr.k==='camp'?!!SAVE.x.souv.camp:pdata(tr.k).sticker;
      sticker(tr.k,x,y,r,got);if(!got){X.globalAlpha=0.35;placeIcon(tr.k,x,y-4,r/30);X.globalAlpha=1}txt(tr.n,x,y+r+18,16,'#6a1b9a');
      if(tr.k!=='camp'){const d=pdata(tr.k);txt('★'+d.stars.length+'/5 '+(d.task?'✓ helped':'○ help'),x,y+r+38,13,'#ab47bc')}else txt(got?'✓ goodnight!':'○ campout',x,y+r+38,13,'#ab47bc');
      btn('bk_'+tr.k,x-r,y-r,2*r,2*r,()=>{AUD.SFX.boing();v7say(got?'A '+tr.n+' sticker!':'Go on a trip to '+tr.n+' to get this sticker!',2)})});
    bigBack()}
  const ar=V7R(),y=H-Math.max(BOT,8)-ar-14;
  if(BKP===0)v7btn('bk_next',W-INR-20-ar,y,ar,'#b3e5fc','✈️',()=>{BKP=1;AUD.SFX.rustle();v7say('Trip stickers!',2)},1);
  else v7btn('bk_prev',INL+20+ar,y,ar,'#e1bee7','◀',()=>{BKP=0;AUD.SFX.rustle();v7say('My sticker book!',1)})};
// sticker() needs a background colour for the trip keys
{const _st=sticker;sticker=function(k,x,y,r,got){if(['fl1','fl2','colo','camp'].includes(k)&&got){X.save();X.fillStyle='rgba(120,60,140,0.2)';X.beginPath();X.arc(x+2,y+4,r,0,TAU);X.fill();circ(x,y,r,'#fff');circ(x,y,r-5,{fl1:'#b2ebf2',fl2:'#ffe0e8',colo:'#dcedc8',camp:'#d1c4e9'}[k]);placeIcon(k,x,y-4,r/30);star5(x+r*0.62,y-r*0.62,r*0.25,'#ffd54f');X.restore();return}return _st(k,x,y,r,got)}}
// ---------- visitors stroll along Main Street too ----------
let DV=[];
{const _o=SCR.downtown.open,_c=SCR.downtown.close;SCR.downtown.open=function(){_o.apply(this,arguments);const tv=todaysVisitors(),di=PLACES.length;let here=tv.filter(j=>hsh(dayNum()*977+j*131+Math.floor(Date.now()/120000))%(di+1)===di);if(!here.length)here=[pick(tv)];
  DV=here.slice(0,2).map((j,i)=>({j,x:300+i*600,tx:rr(200,DT_LEN-200),face:1,hop:R()*6,f:0}))};SCR.downtown.close=function(){DV=[];_c.apply(this,arguments)}}
{const U=XS.downtown.upd,D=XS.downtown.draw;XS.downtown.upd=function(dt){U(dt);if(!DT)return;for(const v of DV){v.hop+=dt;let tx=v.tx;if(v.f>0){v.f-=dt;tx=DT.x-DT.face*90}const d=tx-v.x;if(Math.abs(d)>6){v.x+=Math.sign(d)*Math.min(Math.abs(d),(v.f>0?260:60)*dt);v.face=Math.sign(d);v.mv=1}else{v.mv=0;if(v.f<=0&&R()<dt*0.4)v.tx=clamp(v.x+rr(-500,500),80,DT_LEN-80)}}};
  XS.downtown.draw=function(){D();if(!DT||DT.shop>=0)return;const G=dtLay().G;for(const v of DV){const A=VIS[v.j],sx=v.x-DT.cam;if(sx<-60||sx>W+60)continue;const h=v.mv?Math.abs(Math.sin(v.hop*9))*10:Math.abs(Math.sin(v.hop*2))*3,fr=!SAVE.x.vis[A[0]];
    ell(sx,G+2,22,5,'rgba(80,40,90,0.15)');if(fr){X.globalAlpha=0.35+0.2*Math.sin(T*4);circ(sx,G-26,34,'#fff59d');X.globalAlpha=1}X.save();X.translate(sx,G-26-h);X.scale(-v.face,1);txt(A[1],0,0,48,'#000');X.restore();
    const r=Math.max(PT(72)/2,34);btn('dv_'+A[0],sx-r,G-26-r,2*r,2*r,()=>{const x=SAVE.x.vis,first=!x[A[0]];x[A[0]]={n:((x[A[0]]&&x[A[0]].n)||0)+1,at:Date.now()};save();v.f=25;sHearts(sx,G-60,8);AUD.SFX.heart();AUD.SFX.squeak();
      if(first){sConf(40);v7say('You made a new friend on Main Street! '+A[2].replace(/^a /,'A ').replace(/^an /,'An ')+'!',3)}else v7say(pick(['Hi again, ','Hello, '])+A[2].replace(/^an? /,'little ')+'!',2)})}}}
if(window.__X)window.__X.DV=()=>DV;
