// ================= v1.6: real local places (Rochester Hills area) + Downtown Rochester Main Street =================
// display names only: internal keys (pumpkin/snow/beach) stay the same so saves keep working
(()=>{const ren={pumpkin:'Upland Hills Farm',snow:'Raintree Park',beach:'Stony Creek Beach'};for(const P of PLACES)if(ren[P.k])P.n=ren[P.k];
  const lab={Pumpkins:['Upland Hills','Upland Hills Farm!'],'Snowy Park':['Raintree Park','Raintree Park!'],Beach:['Stony Creek','Stony Creek Beach!']};
  for(const f of FUN)if(lab[f[1]]){f[4]=lab[f[1]][1];f[1]=lab[f[1]][0]}})();
Object.assign(MGINFO.pumpkin,{n:'Pumpkin Peek'});
function signBoard(x,y,label,bg,fg,sz){X.font='800 '+sz+'px '+FONT;const w=X.measureText(label).width+28,h=sz+18;X.fillStyle='#6d4c41';X.fillRect(x-5,y,10,-y>0?-y:40);X.fillStyle='rgba(0,0,0,0.15)';rrect(x-w/2+3,y-h/2+4,w,h,10);X.fill();X.fillStyle=bg;rrect(x-w/2,y-h/2,w,h,10);X.fill();X.strokeStyle='#fff';X.lineWidth=3;rrect(x-w/2+4,y-h/2+4,w-8,h-8,7);X.stroke();txt(label,x,y+1,sz,fg||'#fff')}
function redBarn(x,s){X.save();X.translate(x,0);X.scale(s,s);poly([-100,-110,-74,-160,74,-160,100,-110],'#5d4037');X.fillStyle='#c62828';X.fillRect(-92,-112,184,112);X.fillStyle='#fff';X.fillRect(-92,-114,184,6);
  X.fillStyle='#8e1c1c';X.fillRect(-34,-70,68,70);X.strokeStyle='#fff';X.lineWidth=5;X.strokeRect(-34,-70,68,70);X.beginPath();X.moveTo(-34,-70);X.lineTo(34,0);X.moveTo(34,-70);X.lineTo(-34,0);X.stroke();
  X.fillStyle='#fff8e1';X.fillRect(-16,-144,32,24);X.strokeRect(-16,-144,32,24);X.restore()}
function cow(x,y,s,f){X.save();X.translate(x,y);X.scale(s*(f||1),s);ell(0,-26,30,18,'#fff');ell(-8,-30,9,7,'#3e2723');ell(12,-22,7,6,'#3e2723');X.fillStyle='#fff';[-20,-8,10,20].forEach(l=>X.fillRect(l-3,-12,6,12));
  ell(32,-36,12,10,'#fff');ell(38,-32,8,6,'#ffc1d6');circ(30,-40,2,'#222');poly([24,-44,20,-52,28,-46],'#fff');X.restore()}
function hay(x,y){X.fillStyle='#f0c75e';rrect(x-26,y-30,52,30,8);X.fill();X.strokeStyle='#c99a2e';X.lineWidth=2;for(let i=-14;i<=14;i+=14){X.beginPath();X.moveTo(x+i,y-28);X.lineTo(x+i,y-2);X.stroke()}}
function playground(x,s){X.save();X.translate(x,0);X.scale(s,s);
  // swing set
  X.strokeStyle='#e53935';X.lineWidth=7;X.lineCap='round';X.beginPath();X.moveTo(-130,0);X.lineTo(-100,-110);X.lineTo(-70,0);X.moveTo(50,0);X.lineTo(20,-110);X.lineTo(-10,0);X.stroke();X.strokeStyle='#ffca28';X.beginPath();X.moveTo(-100,-110);X.lineTo(20,-110);X.stroke();
  X.strokeStyle='#555';X.lineWidth=2;[-70,-10].forEach(sx=>{X.beginPath();X.moveTo(sx-8,-108);X.lineTo(sx-8,-34);X.moveTo(sx+8,-108);X.lineTo(sx+8,-34);X.stroke();X.fillStyle='#1e88e5';X.fillRect(sx-12,-36,24,6)});
  X.fillStyle='#fff';X.fillRect(-104,-116,128,5);
  // slide tower
  X.fillStyle='#43a047';X.fillRect(90,-90,8,90);X.fillRect(140,-90,8,90);X.fillStyle='#ffca28';X.fillRect(84,-96,70,10);poly([84,-96,119,-130,154,-96],'#1e88e5');X.fillStyle='#fff';X.fillRect(84,-100,70,4);
  X.strokeStyle='#8d6e63';X.lineWidth=3;for(let y=-80;y<0;y+=16){X.beginPath();X.moveTo(90,y);X.lineTo(98,y);X.stroke()}
  X.strokeStyle='#ec407a';X.lineWidth=12;X.beginPath();X.moveTo(150,-90);X.quadraticCurveTo(190,-40,230,-4);X.stroke();X.restore()}
const _wallBg2=wallBg;wallBg=function(sec,top,bot){_wallBg2(sec,top,bot);const o=sec.out,x0=sec.x0,x1=sec.x1;
  if(o==='pumpkin'){for(let x=x0+620;x<x1;x+=1400){redBarn(x,0.9);cow(x+170,-2,0.9,1);hay(x-150,-2);hay(x-110,-2)}signBoard(x0+150,-150,'Upland Hills Farm','#2e7d32','#fff',22);for(let x=x0+1300;x<x1;x+=1400){X.strokeStyle='#8d6e63';X.lineWidth=5;X.beginPath();X.moveTo(x,-34);X.lineTo(x+180,-34);X.moveTo(x,-14);X.lineTo(x+180,-14);X.stroke()}}
  else if(o==='snow'){for(let x=x0+600;x<x1;x+=1300){playground(x,0.85);X.fillStyle='#fff';X.fillRect(x-115,-122,120,5)}signBoard(x0+150,-150,'Raintree Park','#1565c0','#fff',22)}
  else if(o==='beach'){// Stony Creek Lake: far wooded shore across the water, kayaks
    X.fillStyle='#2e7d32';X.beginPath();X.moveTo(x0,-70);for(let x=x0;x<=x1;x+=30)X.lineTo(x,-82-14*Math.abs(Math.sin(x*0.03))-8*Math.sin(x*0.004));X.lineTo(x1,-70);X.fill();X.fillStyle='#43a047';for(let x=x0+15;x<x1;x+=60)circ(x,-82-((x*7)%9),12);
    for(let x=x0+300;x<x1;x+=700){X.fillStyle=['#ff7043','#ffca28','#26c6da'][((x/700)|0)%3];X.beginPath();X.ellipse(x,-48,30,6,0,0,TAU);X.fill();X.strokeStyle='#5d4037';X.lineWidth=2;X.beginPath();X.moveTo(x-16,-62);X.lineTo(x+16,-40);X.stroke()}
    signBoard(x0+150,-150,'Stony Creek Beach','#00838f','#fff',22)}};
// ================= Downtown Rochester: Main Street walk =================
// real storefronts on Main Street, Rochester MI (checked Oct 2026), south to north by street number
const SHOPS=[
 {k:'givethanks',n:'Give Thanks Bakery',a:'225 S. Main',c:'#8d6e63',aw:['#fff','#a1887f'],ic:'🥐',kind:'pick',hi:'Give Thanks Bakery! Pick a yummy treat!',opts:[['🥐','a croissant'],['🍪','a cookie'],['🍰','a slice of cake']]},
 {k:'homebakery',n:'The Home Bakery',a:'300 S. Main',c:'#f06292',aw:['#fff','#f48fb1'],ic:'🧁',kind:'cupcake',hi:'The Home Bakery! Let\'s frost a cupcake! Tap a color!'},
 {k:'knapps',n:"Red Knapp's Dairy Bar",a:'304 S. Main',c:'#d32f2f',aw:['#fff','#e53935'],ic:'🥤',kind:'shake',hi:"Red Knapp's! Pick a milkshake!"},
 {k:'novel',n:'Novel',sub:'Books',a:'307 S. Main',c:'#3949ab',aw:['#fff','#5c6bc0'],ic:'📚',kind:'book',hi:'Novel, the book shop! Pick a book!'},
 {k:'threedog',n:'Three Dog Bakery',a:'422 S. Main',c:'#00897b',aw:['#fff','#26a69a'],ic:'🦴',kind:'pup',hi:'Three Dog Bakery makes treats for puppies! Pick one for the puppy!'},
 {k:'funkyfrog',n:'The Funky Frog',a:'433 S. Main',c:'#7cb342',aw:['#fff','#9ccc65'],ic:'🐸',kind:'toy',hi:'The Funky Frog! Pick a toy!'},
 {k:'sanders',n:'Sanders',sub:'Chocolate & Ice Cream',a:'436 S. Main',c:'#6d4c41',aw:['#fff','#ff80ab'],ic:'🍦',kind:'scoop',hi:'Sanders! Let\'s make an ice cream tower! Tap a flavor!'}];
const DT_W0=260,DT_SW=270,DT_LEN=DT_W0*2+SHOPS.length*DT_SW;let DT=null;
const FLAV=[['#6d4c41','chocolate'],['#f8bbd0','strawberry'],['#fff3c4','vanilla'],['#a5d6a7','mint']];
function dtSave(){if(!SAVE.x.dt||typeof SAVE.x.dt!=='object')SAVE.x.dt={};return SAVE.x.dt}
function dtLay(){const L=XL(),top=TOP+L.bb+20,G=Math.min(H*0.74,H-Math.max(BOT,8)-110),ab=Math.max(96,PT(80));return{L,top,G,ab}}
function shopX(i){return DT_W0+i*DT_SW+DT_SW/2}
SCR.downtown={open(){DT={x:120,tx:120,cam:0,go:-1,shop:-1,p:null,face:1,t:0};AUD.setTheme('park');setTimeout(()=>say('p9',3),200);setTimeout(()=>sayT('Tap a shop to go inside!',1),2200)},close(){DT=null;save()},
  back(){if(DT&&DT.shop>=0){dtClose();return true}return false},
  down(p){if(!DT||DT.shop>=0)return;const l=dtLay();if(p.y<l.top)return;const wx=p.x+DT.cam;
    for(let i=0;i<SHOPS.length;i++){const sx=shopX(i);if(Math.abs(wx-sx)<DT_SW/2-6&&p.y<l.G+10){DT.tx=sx;DT.go=i;AUD.SFX.click();sSpark(p.x,p.y,6);return}}
    DT.tx=clamp(wx,60,DT_LEN-60);DT.go=-1;sSpark(p.x,p.y,4)}};
function dtOpen(i){DT.shop=i;const S=SHOPS[i];DT.p={k:S.kind,sel:-1,sc:[],t:0,col:null};AUD.SFX.knock();AUD.SFX.chime();sayT(S.hi,2);const d=dtSave();if(!d[S.k]){d[S.k]=1;save();sConf(24);if(SHOPS.every(s=>d[s.k]))setTimeout(()=>{sConf(80);sayT('You visited every shop on Main Street! Hooray!',3)},2600)}}
function dtClose(){DT.shop=-1;DT.p=null;AUD.SFX.whoosh();sayT(pick(['Bye bye!','Let\'s go to another shop!','See you next time!']),1)}
XS.downtown={upd(dt){if(!DT)return;DT.t+=dt;if(DT.p)DT.p.t+=dt;const d=DT.tx-DT.x;if(Math.abs(d)>3){const v=Math.sign(d)*Math.min(Math.abs(d),240*dt);DT.x+=v;DT.face=d>0?1:-1;DT.walk=1}else{DT.walk=0;if(DT.go>=0){const g=DT.go;DT.go=-1;dtOpen(g)}}
   const want=clamp(DT.x-W*0.4,0,Math.max(0,DT_LEN-W));DT.cam+=(want-DT.cam)*Math.min(1,dt*5)},
 draw(){UI=[];if(!DT){bigBack();return}const l=dtLay(),G=l.G,cam=DT.cam,fest=SEASON&&(SEASON.k==='dec'||SEASON.k==='xmas'||new Date().getMonth()>=10||new Date().getMonth()===0);
  // sky
  const g=X.createLinearGradient(0,0,0,G);g.addColorStop(0,fest?'#283593':'#81d4fa');g.addColorStop(1,fest?'#7986cb':'#e1f5fe');X.fillStyle=g;X.fillRect(0,0,W,G);
  if(!fest)for(let i=0;i<4;i++)cloud(((i*260-cam*0.3)%(W+300)+W+300)%(W+300)-150,TOP+60+i%2*30,0.8);else for(let i=0;i<40;i++)circ((i*97-cam*0.2)%W<0?(i*97-cam*0.2)%W+W:(i*97-cam*0.2)%W,TOP+20+(i*53)%120,1.6,'rgba(255,255,255,0.8)');
  X.save();X.translate(-cam,0);
  // back row of brick buildings + street name banners
  for(let x=-40;x<DT_LEN+80;x+=150){X.fillStyle=['#a1887f','#bcaaa4','#8d6e63'][((x/150)|0+3)%3];X.fillRect(x,G-300,150,300)}
  for(let i=0;i<SHOPS.length;i++){const S=SHOPS[i],x=shopX(i)-DT_SW/2+8,w=DT_SW-16,h=230+(i%3)*24,y=G-h,vis=dtSave()[S.k],bob=DT.go===i?Math.sin(T*8)*3:0;
    X.fillStyle=S.c;X.fillRect(x,y,w,h);X.fillStyle='rgba(255,255,255,0.12)';for(let yy=y+10;yy<G-130;yy+=18)X.fillRect(x,yy,w,2);
    X.fillStyle='#fff8e1';X.fillRect(x+20,y+18,w-40,40);X.strokeStyle='rgba(0,0,0,0.25)';X.lineWidth=2;X.strokeRect(x+20,y+18,w-40,40);
    X.font='800 22px '+FONT;const nw=X.measureText(S.n).width,fs=Math.min(22,22*(w-56)/nw);txt(S.n,x+w/2,y+38,fs,S.c);
    if(fest){for(let k=0;k<9;k++)circ(x+10+k*(w-20)/8,y+6,4,['#ff1744','#ffea00','#00e676','#2979ff','#ff4081'][(k+i+Math.floor(T*2))%5])}
    // awning
    const ay=G-150;for(let k=0;k<8;k++){X.fillStyle=S.aw[k%2];X.beginPath();X.moveTo(x+k*w/8,ay);X.lineTo(x+(k+1)*w/8,ay);X.lineTo(x+(k+1)*w/8,ay+26);X.arc(x+(k+0.5)*w/8,ay+26,w/16,0,Math.PI);X.closePath();X.fill()}
    // window with the shop's thing + door
    X.fillStyle='#e1f5fe';rrect(x+14,G-106,w*0.52,90,8);X.fill();X.strokeStyle='#fff';X.lineWidth=5;rrect(x+14,G-106,w*0.52,90,8);X.stroke();txt(S.ic,x+14+w*0.26,G-60+bob,46,'#000');
    if(S.sub)txt(S.sub,x+w/2,y+70,13,'#fff');
    X.fillStyle='#4e342e';rrect(x+w*0.64,G-120,w*0.3,120,8);X.fill();circ(x+w*0.64+w*0.25,G-60,4,'#ffd54f');
    if(vis){circ(x+w-18,y+14,15,'#fff');txt('⭐',x+w-18,y+15,18,'#000')}
    if(DT.go===i){X.strokeStyle='#ffeb3b';X.lineWidth=6;rrect(x-3,y-3,w+6,h+6,6);X.stroke()}}
  // lamp posts with Rochester banners
  for(let x=DT_W0-20;x<DT_LEN;x+=DT_SW*2){X.fillStyle='#263238';X.fillRect(x-3,G-200,6,200);circ(x,G-206,10,fest?'#fff59d':'#eceff1');X.fillStyle='#c62828';X.fillRect(x+4,G-190,30,46);txt('R',x+19,G-166,20,'#fff')}
  // town sign at the start
  signBoard(120,G-150,'Main Street','#2e7d32','#fff',20);txt('Downtown Rochester',120,G-196,18,'#fff',{st:'#2e7d32',sw:5});
  // sidewalk + street
  X.fillStyle='#cfd8dc';X.fillRect(-40,G,DT_LEN+80,40);X.fillStyle='#b0bec5';for(let x=0;x<DT_LEN;x+=60)X.fillRect(x,G,2,40);X.fillStyle='#90a4ae';X.fillRect(-40,G+40,DT_LEN+80,8);
  X.fillStyle='#546e7a';X.fillRect(-40,G+48,DT_LEN+80,H);X.fillStyle='#fff59d';for(let x=0;x<DT_LEN;x+=90)X.fillRect(x,G+90,46,6);
  // Zoe + Doodle on the sidewalk
  X.save();X.translate(DT.x,G+30);X.scale(0.95,0.95);X.save();X.scale(DT.face,1);drawZoe(-30,{t:T,face:1,walk:DT.walk,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,ears:SAVE.zoe.ears,happy:1});X.restore();drawCat(DT.face*-85,0,{t:T,face:DT.face,st:DT.walk?'walk':'idle',acc:catAcc(),s:0.85});X.restore();
  X.restore();
  // stamp row (shops visited)
  const d=dtSave(),n=SHOPS.filter(s=>d[s.k]).length,ss=26;for(let i=0;i<SHOPS.length;i++){const x=W/2-(SHOPS.length*(ss+6))/2+i*(ss+6)+ss/2,y=TOP+12+l.L.bb/2;circ(x,y,ss/2,d[SHOPS[i].k]?'#ffd54f':'rgba(255,255,255,0.6)');txt(d[SHOPS[i].k]?SHOPS[i].ic:'',x,y+1,15,'#000')}
  // big walk arrows at the thumb edges
  if(DT.shop<0){const ab=l.ab,ay=H-Math.max(BOT,8)-ab-10;[[-1,INL+12,'◀'],[1,W-INR-12-ab,'▶']].forEach(([dir,x,ic])=>{circ(x+ab/2,ay+ab/2,ab/2,'rgba(255,255,255,0.92)');circ(x+ab/2,ay+ab/2,ab/2-6,'#ff8fc8');txt(ic,x+ab/2,ay+ab/2+2,ab*0.4,'#fff');
    btn('dtw'+dir,x,ay,ab,ab,()=>{DT.go=-1;DT.tx=clamp(DT.x+dir*DT_SW,60,DT_LEN-60);sSpark(x+ab/2,ay+ab/2,6)})})}
  if(DT.shop>=0)dtPanel();
  bigBack(DT.shop>=0?'◀  Main Street':undefined);if(DT.shop>=0)UI[UI.length-1].fn=goBack}};
function dtPanel(){const S=SHOPS[DT.shop],P=DT.p,l=dtLay();X.fillStyle='rgba(40,20,60,0.45)';X.fillRect(0,0,W,H);UI=[];btn('dtblock',0,0,W,H,()=>{});
  const pw=Math.min(W-INL-INR-40,620),ph=Math.min(H-TOP-l.L.bb-40,400),px=W/2-pw/2,py=TOP+l.L.bb+24,k=Math.min(1,pw/560);X.fillStyle='#fff';rrect(px,py,pw,ph,28);X.fill();X.fillStyle=S.c;rrect(px,py,pw,58,28);X.fill();X.fillRect(px,py+30,pw,28);
  txt(S.n,W/2,py+30,Math.min(26,pw/16),'#fff');const ax=px+pw*0.3,ay=py+58+(ph-58)*0.62,cs=Math.max(PT(72),Math.min(92,(pw*0.42)/2-12));
  // art area (left), choices (right, 2x2)
  const t=P.t;let opts=[];
  if(P.k==='scoop'){X.save();X.translate(ax,ay);X.scale(k,k);poly([-40,0,40,0,0,110],'#e0a85c');X.strokeStyle='#c68a3e';X.lineWidth=2;for(let i=-30;i<40;i+=16){X.beginPath();X.moveTo(i,2);X.lineTo(i*0.3,80);X.stroke()}
    P.sc.forEach((c,i)=>{const y=-22-i*44,dy=Math.max(0,(0.3-(t-(P.at||0)))*200)*(i===P.sc.length-1?1:0);circ(0,y-dy,38,c);circ(-12,y-14-dy,9,'rgba(255,255,255,0.5)')});if(P.sc.length)circ(0,-22-(P.sc.length-1)*44-40,9,'#e53935');X.restore();
    opts=FLAV.map(([c,nm])=>[c,nm,()=>{if(P.sc.length>=4){P.sc=[];sayT('New cone!',1)}P.sc.push(c);P.at=P.t;AUD.SFX.plop();sSpark(ax,ay-40-P.sc.length*44*k,10);sayT(P.sc.length>=4?'Wow! A giant ice cream tower!':pick(['Yum! ','Ooh, ','One more! '])+nm+'!',1);if(P.sc.length>=4){sConf(40);AUD.SFX.meow(1)}}])}
  else if(P.k==='shake'){X.save();X.translate(ax,ay);X.scale(k,k);const c=P.col||'#eeeeee';poly([-40,-90,40,-90,28,40,-28,40],'rgba(225,245,254,0.9)');poly([-36,-74,36,-74,26,36,-26,36],c);if(P.col){circ(-18,-92,20,'#fff');circ(4,-100,22,'#fff');circ(22,-92,18,'#fff');circ(4,-122,10,'#e53935')}X.strokeStyle='#ff5c9e';X.lineWidth=7;X.beginPath();X.moveTo(14,-60);X.lineTo(30,-150);X.stroke();X.fillStyle='#bdbdbd';X.fillRect(-30,40,60,10);X.restore();
    opts=FLAV.slice(0,3).map(([c,nm])=>[c,nm,()=>{P.col=c;AUD.SFX.munch();sSpark(ax,ay-90*k,14);sayT(pick(['Slurp! A ','Yummy! A ',''])+nm+' milkshake!',1)}]).concat([['🍒','cherry',()=>{AUD.SFX.pop();sConf(20);sayT('A cherry on top!',1)}]])}
  else if(P.k==='cupcake'){X.save();X.translate(ax,ay);X.scale(k,k);poly([-44,-10,44,-10,32,60,-32,60],'#ffcc80');X.strokeStyle='#ffa726';X.lineWidth=3;for(let i=-30;i<=30;i+=15){X.beginPath();X.moveTo(i,-8);X.lineTo(i*0.75,58);X.stroke()}
    if(P.col){circ(-26,-22,24,P.col);circ(26,-22,24,P.col);circ(0,-34,30,P.col);circ(0,-62,18,P.col);for(let i=0;i<14;i++)X.fillStyle=['#ff1744','#ffea00','#00e676','#2979ff','#fff'][i%5],X.fillRect(-36+((i*37)%72),-60+((i*23)%40),6,3);circ(0,-84,10,'#e53935')}X.restore();
    opts=[['#f8bbd0','pink'],['#b39ddb','purple'],['#81d4fa','blue'],['#fff3c4','vanilla']].map(([c,nm])=>[c,nm,()=>{P.col=c;AUD.SFX.sticker();sSpark(ax,ay-40*k,16);sayT(pick(['Pretty! ','Sprinkles! ','So sweet! '])+nm+' frosting!',1)}])}
  else{const sets={pick:S.opts,book:[['🐱','a kitty book','Once upon a time, a little kitty found a big red ball. Bounce, bounce! The end!'],['🦄','a unicorn book','Once upon a time, a unicorn painted a rainbow in the sky. The end!'],['🌙','a bedtime book','The moon says good night to all the sleepy kitties. Good night! The end!']],
      pup:[['🦴','a bone'],['🧁','a pupcake'],['🍪','a doggy cookie']],toy:[['🧸','a teddy bear'],['🪀','a yo-yo'],['👑','a sparkly crown']]}[P.k];
    if(P.sel>=0){const o=sets[P.sel],hop=Math.abs(Math.sin(t*6))*14;circ(ax,ay-50,82*k,'#fff3f8');txt(o[0],ax,ay-50-hop*(P.k==='toy'?1:0.3),96*k,'#000');
      if(P.k==='pup'){txt('🐶',ax+90*k,ay+20-Math.abs(Math.sin(t*10))*10,64*k,'#000')}if(P.k==='toy')txt('🐸',ax-90*k,ay+30-Math.abs(Math.sin(t*5))*20,54*k,'#000')}
    else{txt(S.ic,ax,ay-50,110*k,'#000');if(P.k==='pup')txt('🐶',ax+90*k,ay+20,58*k,'#000')}
    opts=sets.map((o,i)=>[o[0],o[1],()=>{P.sel=i;P.t=0;sSpark(ax,ay-50,14);if(P.k==='book'){AUD.SFX.rustle();sayT(o[2],2)}else if(P.k==='pup'){AUD.SFX.munch();sayT('Woof woof! The puppy loves '+o[1]+'! Doodle says meow!',2);setTimeout(()=>AUD.SFX.meow(2),900)}else if(P.k==='toy'){AUD.SFX.boing();sayT('Ribbit! You found '+o[1]+'!',2)}else{AUD.SFX.munch();sayT('Yum! '+o[1].replace(/^a /,'A ')+'!',2)}}])}
  // choices: big circles in a 2x2 grid on the right
  opts.forEach(([v,nm,fn],i)=>{const cx=px+pw*0.72+((i%2)-0.5)*(cs+18),cy=py+58+(ph-58)*0.5+(((i/2)|0)-(opts.length>2?0.5:0))*(cs+18),pulse=1+Math.sin(T*3+i)*0.03;
    circ(cx,cy+4,cs/2,'rgba(0,0,0,0.12)');circ(cx,cy,cs/2*pulse,'#fff');circ(cx,cy,cs/2*pulse-5,v[0]==='#'?v:'#fff3f8');if(v[0]!=='#')txt(v,cx,cy+3,cs*0.52,'#000');
    btn('dto'+i,cx-cs/2,cy-cs/2,cs,cs,()=>{fn();P.react=P.t;sHearts(px+80,py+ph-110,3)})});
  {const re=P.react!=null&&P.t-P.react<1.2;X.save();X.translate(px+80,py+ph-18);X.scale(0.75,0.75);drawCat(0,0,{t:T,face:1,st:re?'purr':'idle',acc:catAcc()});X.restore()}
  const db=Math.max(PT(72),70);circ(px+pw-db/2-10,py+ph-db/2-10,db/2,'#66bb6a');txt('✓',px+pw-db/2-10,py+ph-db/2-8,db*0.5,'#fff');btn('dtdone',px+pw-db-10,py+ph-db-10,db,db,()=>{AUD.SFX.sticker();sConf(20);dtClose()})}
IDLE_HINT.downtown='Tap a shop to go inside!';
// ---------- home map: big landmark buttons for the local places + Downtown Rochester ----------
const LANDMARKS=[{k:'pumpkin',i:5,n:'Upland Hills Farm',c:'#ffe0b2'},{k:'snow',i:6,n:'Raintree Park',c:'#e3f2fd'},{k:'beach',i:7,n:'Stony Creek Beach',c:'#b2ebf2'},{k:'downtown',n:'Downtown Rochester',c:'#ffd6ec'}];
function downtownIcon(x,y,s){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#8d6e63';X.fillRect(-22,-20,20,34);X.fillStyle='#d32f2f';X.fillRect(0,-26,22,40);X.fillStyle='#fff8e1';X.fillRect(-19,-14,14,8);X.fillRect(3,-20,16,8);
  for(let k=0;k<4;k++){X.fillStyle=k%2?'#fff':'#ff80ab';X.fillRect(-22+k*11,-2,11,6)}X.fillStyle='#4e342e';X.fillRect(8,2,8,12);X.fillStyle='#90a4ae';X.fillRect(-26,14,52,4);X.restore()}
function lmLayout(){const L=mapLayout(),land=L.land,n=LANDMARKS.length;if(land){const r=Math.max(PT(40),40),y=H*0.66,x0=W*0.1,sp=W*0.158;return LANDMARKS.map((m,i)=>({m,x:x0+i*sp,y,r}))}
  const r=L.cmp?34:Math.max(PT(36),34),y=L.rowY-r-(L.cmp?40:46);return LANDMARKS.map((m,i)=>({m,x:W*(i+0.5)/n,y,r}))}
const _mapLayout6=mapLayout;mapLayout=function(){const L=_mapLayout6();if(L.land){L.N.forEach((p,i)=>{p.y=H*(0.29+(i%2?0.09:0))});L.r=40}else if(L.N.length===5&&L.N[0].y===L.N[1].y){const r=36,yA=TOP+150,yB=yA+2*r+50;L.r=r;L.N.forEach((p,i)=>{p.y=i<3?yA:yB});L.cmp=1}else if(L.N.length===5&&L.N[0].x!==L.N[1].x){const yl=L.rowY-Math.max(PT(36),34)*2-100,y0=L.N[0].y;if(L.N[4].y>yl){const k=(yl-y0)/Math.max(1,L.N[4].y-y0);L.N.forEach(p=>{p.y=y0+(p.y-y0)*k})}}return L};
const _drawTitle6=drawTitle;drawTitle=function(){_drawTitle6();if(!(XL().land)){/* portrait: keep tight */}
  const ls=lmLayout();X.fillStyle='rgba(255,255,255,0.55)';const a=ls[0],b=ls[ls.length-1];rrect(a.x-a.r-12,a.y-a.r-8,b.x-a.x+2*a.r+24,2*a.r+50,24);X.fill();
  ls.forEach(({m,x,y,r},i)=>{const s=1+Math.sin(T*2.2+i)*0.035;X.fillStyle='rgba(120,60,140,0.18)';X.beginPath();X.arc(x+2,y+5,r,0,TAU);X.fill();circ(x,y,r*s,'#fff');circ(x,y,(r-6)*s,m.c);
    if(m.k==='downtown')downtownIcon(x,y,r/30);else placeIcon(m.k,x,y-2,r/30);
    if(m.i!=null){const d=pdata(m.k);if(d.sticker){circ(x+r*0.7,y-r*0.7,12,'#81c784');txt('✓',x+r*0.7,y-r*0.7+1,15,'#fff')}const K=KITTIES.find(q=>q.p===m.k);if(K&&SAVE.kit[K.k]){X.save();X.translate(x-r*0.72,y-r*0.38);blitKit(K.k,'sit',0,0,0,1,0.38);X.restore()}}
    else{const n=SHOPS.filter(s=>dtSave()[s.k]).length;if(n)txt('⭐'+n,x+r*0.7,y-r*0.75,13,'#c2185b')}
    const nm=m.n.split(' '),l1=m.k==='downtown'?'Downtown':nm.slice(0,-1).join(' '),l2=m.k==='downtown'?'Rochester':nm[nm.length-1];txt(l1,x,y+r+14,14,'#6a1b9a');txt(l2,x,y+r+30,14,'#6a1b9a');
    btn('lm_'+m.k,x-r-8,y-r-8,2*r+16,2*r+46,()=>{AUD.SFX.boing();sSpark(x,y,12);if(m.k==='downtown')openScreen('downtown');else enterPlace(m.i)})})};
if(window.__X){window.__X.DT=()=>DT;window.__X.SHOPS=SHOPS;window.__X.dtOpen=i=>dtOpen(i)}
