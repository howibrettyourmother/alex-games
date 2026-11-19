// ================= v1.4: Kitty Sleepover, Build-a-House, Pet Care =================
function petList(){return[{k:'doodle',n:'Doodle'}].concat(parade().map(K=>({k:K.k,n:kitName(K.k)})))}
function drawPet(k,x,y,s,st){if(k==='doodle')drawCat(x,y,{t:T,face:1,st:st||'idle',acc:catAcc(),s:s*0.9});else blitKit(k,'sit',0,x,y,1,s,{closed:st==='sleep'||st==='purr'})}

// ---------- Kitty Sleepover: tuck everyone in, night light, soft lullaby ----------
let SL=null;const BLANK=['#ffc1e3','#c5a3ff','#9fd8ff','#fff59d','#a8e6c8'];
SCR.sleep={open(){const ps=petList();SL={ps,tuck:ps.map(()=>0),bl:ps.map((p,i)=>i%BLANK.length),light:1,done:0,zz:[]};AUD.setTheme('lull');
  sayT(ps.length>1?'Sleepover time! Tap each kitty to tuck them in.':'Sleepover time! Tap Doodle to tuck him in. Find kitty friends for a bigger sleepover!',2)},close(){SL=null}};
function sleepLay(){const n=SL.ps.length,L=XL(),cols=L.land?Math.min(n,4):Math.min(n,2),rows=Math.ceil(n/cols),top=TOP+L.bb+60,bot=H-Math.max(BOT,8)-20,cw=(W-INL-INR-20)/cols,ch=Math.min((bot-top)/rows,cw*1.1);
  return SL.ps.map((p,i)=>{const r=(i/cols)|0,inRow=Math.min(cols,n-r*cols);return{x:W/2+((i%cols)-(inRow-1)/2)*cw,y:top+ch*(r+0.82),w:Math.min(cw-16,n<3?320:220),s:Math.min(n<3?2.2:1.4,ch/150,cw/130)}})}
XS.sleep={upd(dt){if(!SL)return;for(const z of SL.zz){z.t+=dt;z.y-=18*dt}SL.zz=SL.zz.filter(z=>z.t<2.4);if(R()<dt*1.5){const L=sleepLay();SL.tuck.forEach((t,i)=>{if(t>0&&R()<0.4)SL.zz.push({x:L[i].x+20,y:L[i].y-80*L[i].s,t:0})})}SL.tuck=SL.tuck.map(t=>t>0?Math.min(1,t+dt*2):0)},
  draw(){UI=[];const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1d1b4f');g.addColorStop(1,'#4a3a7a');X.fillStyle=g;X.fillRect(0,0,W,H);if(!SL){bigBack();return}
    for(let i=0;i<30;i++){const x=(i*97.3)%W,y=TOP+60+((i*53.7)%(H*0.4));X.globalAlpha=0.4+0.4*Math.sin(T*2+i);star5(x,y,2+(i%3),'#fff59d');X.globalAlpha=1}
    const L0=XL(),mx=W-INR-80,my=TOP+L0.bb+40;circ(mx,my,30,'#fff8c4');circ(mx+12,my-8,26,'#2a2660');
    // night light: warm glow when on
    const lx=INL+60,ly=H-Math.max(BOT,8)-70;if(SL.light){const rg=X.createRadialGradient(lx,ly-40,10,lx,ly-40,Math.max(W,H)*0.6);rg.addColorStop(0,'rgba(255,214,140,0.45)');rg.addColorStop(1,'rgba(255,214,140,0)');X.fillStyle=rg;X.fillRect(0,0,W,H)}
    const L=sleepLay();L.forEach((b,i)=>{const p=SL.ps[i],t=SL.tuck[i],s=b.s;X.fillStyle='#8d6e63';rrect(b.x-b.w/2,b.y-10*s,b.w,26*s,10*s);X.fill();X.fillStyle='#fff';rrect(b.x-b.w/2+6,b.y-26*s,b.w-12,22*s,10*s);X.fill();
      ell(b.x-b.w/2+34*s,b.y-30*s,26*s,12*s,'#fdf4ff');drawPet(p.k,b.x,b.y-14*s,s,t>0?'sleep':'idle');
      if(t>0){const c=BLANK[SL.bl[i]],bh=24*s*t;X.fillStyle=c;rrect(b.x-b.w/2+4,b.y-bh,b.w-8,bh+6,14*s);X.fill();X.fillStyle='rgba(255,255,255,0.6)';for(let k=0;k<4;k++)heartP(b.x-b.w/2+24+k*(b.w-40)/3,b.y-bh/2,5*s,'rgba(255,255,255,0.7)')}
      else{X.globalAlpha=0.35+0.25*Math.sin(T*3+i);circ(b.x,b.y-60*s,10,'#fff59d');X.globalAlpha=1}
      btn('bed'+i,b.x-b.w/2,b.y-120*s,b.w,140*s,()=>{if(!SL.tuck[i]){SL.tuck[i]=0.01;AUD.SFX.purr(1);sayT(pick(['Night night, ','Sweet dreams, ','Sleep tight, '])+p.n+'!',2);
        if(SL.tuck.every(v=>v>0)&&!SL.done){SL.done=1;SAVE.x.sleep.n=(SAVE.x.sleep.n||0)+1;save();setTimeout(()=>sayT('Goodnight, everyone! Sweet dreams!',2),1600)}}else{SL.bl[i]=(SL.bl[i]+1)%BLANK.length;AUD.SFX.pat();sayT('Cozy blanket!',1)}})});
    for(const z of SL.zz){X.globalAlpha=Math.max(0,1-z.t/2.4);txt('z',z.x+Math.sin(z.t*3)*6,z.y,14+z.t*6,'#fff');X.globalAlpha=1}
    // big night-light button
    const r=Math.max(40,PT(36));circ(lx,ly,r+6,SL.light?'#ffe082':'rgba(255,255,255,0.3)');txt(SL.light?'💡':'🌑',lx,ly+2,r,'#000');btn('light',lx-r-8,ly-r-8,2*r+16,2*r+16,()=>{SL.light=!SL.light;AUD.SFX.click();sayT(SL.light?'Night light on!':'Night light off. So sleepy!',2)});
    bigBack()}};

// ---------- Build-a-House: wallpaper, floor, furniture (tap to add, drag to move, drag to the bin to remove), kitty cushions ----------
const WPS=[['#ffe3ef','#ffd0e4','dots'],['#efe1ff','#e2ccff','stripes'],['#e3f2ff','#cfe6ff','hearts'],['#fff8e1','#ffecb3','stars'],['#eafaf2','#d2f3e3','flowers'],['#fde2e4','#fbd1d6','plain']];
const FLS=['#e5c09a','#f3e5f5','#d7ecff','#c8e6c9','#ffe0b2'];
const HF={couch:{w:220,h:125,o:{}},bed:{w:220,h:120,o:{}},armchair:{w:110,h:120,o:{}},table:{w:120,h:60,o:{w:120,h:60,cloth:1}},shelf:{w:100,h:160,o:{w:100,h:160}},cattree:{w:110,h:220,o:{}},rocker:{w:110,h:130,o:{}},dresser:{w:140,h:110,o:{}}};
const HE=[['🪴',90],['🖼️',80],['💡',80],['🧸',70],['🛋️',90],['🌈',90],['🕰️',70],['🪟',100]];
function houseItems(){return Object.keys(HF).filter(k=>FURN[k]).map(k=>({t:k})).concat(HE.map(e=>({t:'e',e:e[0],sz:e[1]}))).concat(SAVE.x.toys.map(e=>({t:'e',e,sz:60})))}
let HS=null;
SCR.house={open(){HS={drag:null,pal:0};AUD.setTheme('home');sayT('Let\'s decorate! Tap a picture to put it in the house!',2)},close(){HS=null;save()},
  down(p,id){const R0=houseRoom(),it=houseHit(p,R0);if(it){HS.drag={id,it,ox:p.x-(R0.x+it.u*R0.w),oy:p.y-(R0.y+it.v*R0.h)};const a=SAVE.x.house.items;a.splice(a.indexOf(it),1);a.push(it);AUD.SFX.pat()}},
  move(p,id){const d=HS&&HS.drag;if(!d||d.id!==id)return;const R0=houseRoom();d.it.u=clamp((p.x-d.ox-R0.x)/R0.w,0.03,0.97);d.it.v=clamp((p.y-d.oy-R0.y)/R0.h,0.08,1);d.px=p.x;d.py=p.y},
  up(p,id){const d=HS&&HS.drag;if(!d||d.id!==id)return;HS.drag=null;const bn=houseBin();if(Math.hypot(p.x-bn.x,p.y-bn.y)<bn.r+20){const a=SAVE.x.house.items;a.splice(a.indexOf(d.it),1);AUD.SFX.plop();sayT('Bye bye!',1)}save()}};
function houseRoom(){const L=XL(),pal=Math.max(86,PT(70)),top=TOP+L.bb+24,bot=H-Math.max(BOT,8)-pal-24;return{x:INL+12,y:top,w:W-INL-INR-24,h:bot-top,fy:top+(bot-top)*0.66,pal,k:Math.min(1.3,(bot-top)/330)}}
function houseBin(){const R0=houseRoom();return{x:R0.x+R0.w-40,y:R0.y+40,r:32}}
function houseSize(it,R0){if(it.t==='e')return{w:it.sz*R0.k,h:it.sz*R0.k};const f=HF[it.t];return{w:f.w*R0.k*0.8,h:f.h*R0.k*0.8}}
function houseHit(p,R0){const a=SAVE.x.house.items;for(let i=a.length-1;i>=0;i--){const it=a[i],s=houseSize(it,R0),x=R0.x+it.u*R0.w,y=R0.y+it.v*R0.h;if(p.x>x-s.w/2-10&&p.x<x+s.w/2+10&&p.y>y-s.h-10&&p.y<y+10)return it}return null}
function drawHouseItem(it,x,y,R0){if(it.t==='e'){txt(it.e,x,y-it.sz*R0.k*0.45,it.sz*R0.k*0.85,'#000');return}const f=HF[it.t],k=R0.k*0.8;X.save();X.translate(x,y);X.scale(k,k);try{FURN[it.t].draw(Object.assign({x:-f.w/2},f.o))}catch(e){}X.restore()}
XS.house={draw(){UI=[];const H0=SAVE.x.house,R0=houseRoom(),wp=WPS[H0.wp%WPS.length];softBg('#fff0f8','#f3e5ff');
    X.save();rrect(R0.x,R0.y,R0.w,R0.h,20);X.clip();X.fillStyle=wp[0];X.fillRect(R0.x,R0.y,R0.w,R0.h);X.fillStyle=wp[1];
    for(let y=R0.y+24;y<R0.fy;y+=44)for(let x=R0.x+((y/44)%2)*22;x<R0.x+R0.w;x+=44){if(wp[2]==='dots')circ(x,y,4,wp[1]);else if(wp[2]==='hearts')heartP(x,y,7,wp[1]);else if(wp[2]==='stars')star5(x,y,7,wp[1]);else if(wp[2]==='flowers'){for(let i=0;i<5;i++){const a=i*TAU/5;circ(x+Math.cos(a)*5,y+Math.sin(a)*5,3.5,wp[1])}}}
    if(wp[2]==='stripes')for(let x=R0.x;x<R0.x+R0.w;x+=36)X.fillRect(x,R0.y,14,R0.fy-R0.y);
    X.fillStyle=FLS[H0.fl%FLS.length];X.fillRect(R0.x,R0.fy,R0.w,R0.h);X.fillStyle='rgba(0,0,0,0.06)';X.fillRect(R0.x,R0.fy,R0.w,4);
    // kitty cushions
    const cs=Math.min(1,R0.w/700);for(let i=0;i<3;i++){const cx=R0.x+R0.w*(0.25+i*0.25),cy=R0.y+R0.h*0.93;ell(cx,cy,44*cs*R0.k,13*cs*R0.k,['#ff8fc8','#b388ff','#80deea'][i]);const k=H0.cush[i];if(k&&(k==='doodle'||SAVE.kit[k]))drawPet(k,cx,cy-4,0.75*R0.k,'idle');else{X.globalAlpha=0.5;txt('🐾',cx,cy-22*R0.k,26,'#000');X.globalAlpha=1}
      btn('cush'+i,cx-50*R0.k,cy-90*R0.k,100*R0.k,100*R0.k,()=>{const ps=petList().map(p=>p.k),cur=ps.indexOf(H0.cush[i]),nx=cur+1<ps.length?ps[cur+1]:null;H0.cush[i]=nx;save();AUD.SFX.meow(i);if(nx)sayT((nx==='doodle'?'Doodle':kitName(nx))+' sits here!',1)})}
    const a=H0.items.slice().sort((p,q)=>p.v-q.v);for(const it of a)drawHouseItem(it,R0.x+it.u*R0.w,R0.y+it.v*R0.h,R0);X.restore();
    if(HS&&HS.drag){const b=houseBin();circ(b.x,b.y,b.r+6,'rgba(255,255,255,0.8)');txt('🗑️',b.x,b.y+2,b.r,'#000')}
    // wallpaper / floor buttons (top-right)
    const s=Math.max(64,PT(46)),bx=W-INR-12-s;[[wp[1],'🎨',()=>{H0.wp=(H0.wp+1)%WPS.length;save();AUD.SFX.sticker();sayT('New wallpaper!',1)}],[FLS[(H0.fl+1)%FLS.length],'🟫',()=>{H0.fl=(H0.fl+1)%FLS.length;save();AUD.SFX.sticker();sayT('New floor!',1)}]].forEach(([c,ic,fn],i)=>{const x=bx-i*(s+10),y=TOP+12;X.fillStyle='#fff';rrect(x,y,s,s,16);X.fill();circ(x+s/2,y+s/2,s*0.36,c);txt(ic,x+s/2,y+s/2+1,s*0.4,'#000');btn('wp'+i,x,y,s,s,fn)});
    // palette: big buttons, scroll with the arrow when they don't all fit
    const P=houseItems(),ps=R0.pal,py=H-Math.max(BOT,8)-ps-10,av=W-INL-INR-24,per=Math.max(1,Math.floor((av-2*ps*0.6)/(ps+8))),pages=Math.ceil(P.length/per),pg=HS?HS.pal%pages:0;
    X.fillStyle='rgba(255,255,255,0.9)';rrect(INL+8,py-6,W-INL-INR-16,ps+12,24);X.fill();
    P.slice(pg*per,pg*per+per).forEach((it,i)=>{const x=INL+12+ps*0.6+i*(ps+8)+4,y=py;X.fillStyle='#fdeaf5';rrect(x,y,ps,ps,18);X.fill();
      if(it.t==='e')txt(it.e,x+ps/2,y+ps/2+2,ps*0.55,'#000');else{const f=HF[it.t],k=Math.min((ps-14)/f.w,(ps-14)/f.h);X.save();X.translate(x+ps/2,y+ps-8);X.scale(k,k);try{FURN[it.t].draw(Object.assign({x:-f.w/2},f.o))}catch(e){}X.restore()}
      btn('pal'+i,x,y,ps,ps,()=>{if(SAVE.x.house.items.length>=30){sayT('The house is full! Tap something, then tap the red X!',2);return}SAVE.x.house.items.push(Object.assign({u:rr(0.35,0.65),v:it.t==='e'&&(it.e==='🖼️'||it.e==='🪟'||it.e==='🕰️'||it.e==='🌈')?0.35:0.9},it));save();AUD.SFX.boing();sSpark(W/2,R0.y+R0.h*0.7,8)})});
    if(pages>1){const x=W-INR-12-ps*0.6;pill(x-4,py,ps*0.6,ps,'▶','#ff8fc8',28);btn('palnext',x-8,py-4,ps*0.6+8,ps+8,()=>{HS.pal=(HS.pal+1)%pages;AUD.SFX.click()})}
    bigBack()}};

// ---------- Pet Care: brush, bubble bath and food for Doodle and the kitty friends ----------
let PC=null;
SCR.care={open(){PC={sel:0,tool:0,joy:{},bub:[],brush:0,food:0,rinse:0,happy:0,ht:0,dragging:null};AUD.setTheme('home');sayT('Pet care! Pick brush, bath or food!',2)},close(){PC=null;save()},
  down(p,id){if(!PC)return;PC.dragging=id;careAct(p,true)},move(p,id){if(PC&&PC.dragging===id)careAct(p,false)},up(p,id){if(PC&&PC.dragging===id)PC.dragging=null}};
function careLay(){const L=XL(),tb=Math.max(80,PT(64)),top=TOP+L.bb+20,pr=Math.max(56,PT(46)),bot=H-Math.max(BOT,8)-tb-30;return{L,tb,top,pr,cx:W/2,cy:bot-10,s:Math.min(2.6,(bot-top-pr-40)/110,W/240)}}
function careAct(p,first){const c=careLay(),P=PC,dx=p.x-c.cx,dy=p.y-(c.cy-55*c.s);if(Math.abs(dx)>80*c.s||Math.abs(dy)>70*c.s)return;
  if(P.tool===0){P.brush+=first?2:1;if(R()<0.5)sSpark(p.x,p.y,2);if(P.brush%25===0)AUD.SFX.purr(1.4);if(P.brush>=90&&!P.joy.b){P.joy.b=1;careDone('So soft and fluffy!')}}
  else if(P.tool===1){if(P.bub.length<40&&(first||R()<0.25)){P.bub.push({x:dx,y:dy,r:rr(8,16)});AUD.SFX.pop()}if(P.bub.length>=24&&!P.rinse&&!P.joy.w){P.rinse=0.01;sayT('Rinse! Splish splash!',2)}}
  else if(P.tool===2&&first&&!P.food){P.food=0.01;AUD.SFX.munch();sayT('Yum yum!',1)}}
function careDone(s){const P=PC,pt=petList()[P.sel];P.happy=2;AUD.SFX.purr(2);sHearts(W/2,careLay().cy-120,8);sayT(s,2);const n=Object.keys(P.joy).length;SAVE.x.care[pt.k]=(SAVE.x.care[pt.k]||0)+1;save();
  if(n>=3)setTimeout(()=>{if(PC){sayT('Purr purr! '+pt.n+' is so happy!',2);sConf(50);AUD.SFX.sticker()}},1500)}
XS.care={upd(dt){const P=PC;if(!P)return;P.happy=Math.max(0,P.happy-dt);if(P.rinse){P.rinse+=dt;if(P.bub.length&&R()<0.3)P.bub.shift();if(P.rinse>2.2){P.rinse=0;P.bub=[];P.joy.w=1;careDone('All clean and sparkly!')}}
    if(P.food){P.food+=dt;if(P.food>2.5){P.food=0;if(!P.joy.f){P.joy.f=1;careDone('What a full tummy!')}}}},
  draw(){UI=[];softBg('#e0f7ff','#fff0f8');const c=careLay(),P=PC;if(!P){bigBack();return}const ps=petList();if(P.sel>=ps.length)P.sel=0;const pt=ps[P.sel];
    // pick a pet (row of portraits)
    const n=ps.length,gap=12,av=W-INL-INR-40,pr=Math.max(PT(36),Math.min(c.pr,(av-(n-1)*gap)/(2*n))),per=Math.max(1,Math.floor((av+gap)/(2*pr+gap)));ps.forEach((q,i)=>{const rw=(i/per)|0,nR=Math.min(per,n-rw*per),x=W/2-(nR*pr*2+(nR-1)*gap)/2+pr+(i%per)*(pr*2+gap),y=c.top+pr+rw*(pr*2+8),on=i===P.sel;circ(x,y,pr+4,on?'#ff5c9e':'rgba(255,255,255,0.7)');circ(x,y,pr,'#fff');X.save();X.beginPath();X.arc(x,y,pr,0,TAU);X.clip();drawPet(q.k,x,y+pr*0.75,pr/52,'idle');X.restore();
      btn('pet'+i,x-pr-4,y-pr-4,2*pr+8,2*pr+8,()=>{if(P.sel!==i){P.sel=i;P.joy={};P.bub=[];P.brush=0;P.food=0;P.rinse=0}AUD.SFX.meow(i%3);sayT(q.n+'!',2)})});
    // the pet, tub, bubbles, bowl
    const cx=c.cx,cy=c.cy,s=c.s;if(P.tool===1){X.fillStyle='#b3e5fc';rrect(cx-95*s,cy-30*s,190*s,44*s,20*s);X.fill();X.fillStyle='#fff';rrect(cx-100*s,cy-8*s,200*s,26*s,12*s);X.fill()}
    drawPet(pt.k,cx,cy,s,P.happy>0||P.food?'purr':'idle');
    if(P.tool===1||P.bub.length)for(const b of P.bub){X.globalAlpha=0.75;circ(cx+b.x,cy-55*s+b.y,b.r,'#fff');X.globalAlpha=1;circ(cx+b.x-b.r*0.3,cy-55*s+b.y-b.r*0.3,b.r*0.25,'#e1f5fe')}
    if(P.rinse){for(let i=0;i<14;i++){const x=cx+((i*37)%140-70)*s*0.6,y=cy-120*s+((T*300+i*40)%(90*s));X.fillStyle='#4fc3f7';X.beginPath();X.ellipse(x,y,3,6,0,0,TAU);X.fill()}}
    if(P.food){const k=Math.min(1,P.food*2);X.save();X.translate(cx+60*s,cy);X.scale(s*0.6,s*0.6);drawBowl(0,0,1,0,P.food<2?0:null,0,P.food>=2);X.restore();if(R()<0.05)sHearts(cx,cy-90*s,1)}
    if(P.happy>0&&R()<0.15)sHearts(cx+rr(-40,40),cy-100*s,1);
    // happiness: one heart per kind of care
    for(let i=0;i<3;i++){const on=[P.joy.b,P.joy.w,P.joy.f][i];heartP(W-INR-40-i*40,c.top+c.pr*2+40,14,on?'#ff5c9e':'rgba(255,92,158,0.25)')}
    // tools
    const tools=[['🪮','Brush','Brush brush!'],['🛁','Bath','Bubble bath!'],['🍽️','Food','Snack time!']],tb=c.tb,gap2=18,tx0=W/2-(3*tb+2*gap2)/2,ty=H-Math.max(BOT,8)-tb-12;
    tools.forEach(([ic,lab,sy],i)=>{const x=tx0+i*(tb+gap2),on=P.tool===i;X.fillStyle=on?'#ff8fc8':'#fff';rrect(x,ty,tb,tb,22);X.fill();txt(ic,x+tb/2,ty+tb*0.45,tb*0.46,'#000');txt(lab,x+tb/2,ty+tb*0.86,14,on?'#fff':'#7b3fa0');
      btn('tool'+i,x,ty,tb,tb,()=>{P.tool=i;AUD.SFX.click();sayT(sy+(i===2?'':' Rub the kitty!'),2);if(i===2&&!P.food){P.food=0.01;AUD.SFX.munch()}})});
    bigBack()}};
