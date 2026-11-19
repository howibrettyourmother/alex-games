// ================= v1.7: animal visitors, backpack souvenirs + scrapbook, campout, music maker, cookie decorating, weather play =================
// ---------- shared: big round picture button (>=72px on iPad) ----------
function v7btn(id,x,y,r,col,draw,fn,glow){const s=1+(glow?Math.sin(T*5)*0.05:0);X.fillStyle='rgba(120,60,140,0.18)';X.beginPath();X.arc(x+1,y+4,r*s,0,TAU);X.fill();circ(x,y,r*s,'#fff');circ(x,y,(r-5)*s,col);
  if(typeof draw==='string')txt(draw,x,y+2,r*0.95,'#000');else if(draw)draw(x,y,r);btn(id,x-r-4,y-r-4,2*r+8,2*r+8,fn)}
const V7R=()=>Math.max(PT(72)/2+1,30);// radius: 72px+ diameter on iPad
// ---------- souvenirs: one in every place and trip, kept in Doodle's backpack ----------
const SOUV={dad:['🧩','a puzzle piece',"Dad's House"],mom:['💜','a purple heart',"Mom's Apartment"],klub:['🖍️','a crayon','Meadow Brook'],park:['🍂','a pretty leaf','The Park'],gma:['🧶','a yarn ball',"Grandma Gail's"],
  pumpkin:['🌻','a sunflower','Upland Hills Farm'],snow:['🪁','a kite','Raintree Park'],beach:['🪨','a smooth stone','Stony Creek Beach'],downtown:['💌','a postcard','Downtown Rochester'],
  fl1:['🐚','a seashell',"Grandpa Brian's"],fl2:['🦩','a flamingo postcard',"Gammy's House"],colo:['pinecone','a pinecone','Colorado'],camp:['🌟','a wishing star','the Campout']};
const SOUVK=Object.keys(SOUV);
function souvDraw(k,x,y,sz){const e=SOUV[k][0];if(e==='pinecone')v7pinecone(x,y,sz/26);else txt(e,x,y,sz,'#000')}
function souvGet(k,x,y){if(!SOUV[k]||SAVE.x.souv[k])return false;SAVE.x.souv[k]=dayKey();save();AUD.SFX.sticker();sConf(24);v7say('Into the backpack! '+SOUV[k][1].replace(/^a /,'A ').replace(/^an /,'An ')+'!',2);return true}
let SV=null;
function svEnter(){SV=SOUV[pl.k]&&!SAVE.x.souv[pl.k]?{k:pl.k,x:Math.min(pl.w-200,620+((pl.k.length*397)%900)),y:-30,got:0,t:0}:null}
// ---------- cute animal visitors: a daily rotation that wanders between places ----------
const VIS=[['bunny','🐰','a bunny'],['duckling','🐥','a duckling'],['fawn','🦌','a baby deer'],['hedgehog','🦔','a hedgehog'],['puppy','🐶','a puppy'],['goat','🐐','a baby goat'],
  ['owl','🦉','an owl'],['otter','🦦','an otter'],['squirrel','🐿️','a squirrel'],['turtle','🐢','a turtle'],['lamb','🐑','a lamb'],['piglet','🐷','a piglet']];
const dayNum=()=>{const d=new Date();return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()))/864e5)};
function hsh(a){a=(a^61)^(a>>>16);a=a+(a<<3);a=a^(a>>>4);a=Math.imul(a,0x27d4eb2d);a=a^(a>>>15);return a>>>0}
function todaysVisitors(){const d=dayNum(),out=[],used={};for(let i=0;out.length<4&&i<40;i++){const j=hsh(d*31+i)%VIS.length;if(!used[j]){used[j]=1;out.push(j)}}return out}
// each visitor hops to a new place every couple of minutes (trips included)
function visitorPlace(j){return hsh(dayNum()*977+j*131+Math.floor(Date.now()/120000))%PLACES.length}
let VV=[],vvSpawn=0;
function vvMake(j,edge){const fromL=R()<0.5;return{j,x:edge?(fromL?-40:pl.w+40):rr(300,pl.w-300),tx:rr(200,pl.w-200),face:1,st:'roam',t:0,life:rr(45,80),hop:R()*6,f:0}}
function vvEnter(){VV=[];vvSpawn=rr(18,30);const tv=todaysVisitors(),here=tv.filter(j=>visitorPlace(j)===PI);(here.length?here:[pick(tv)]).slice(0,2).forEach((j,i)=>{const v=vvMake(j,!here.length);if(!here.length)v.x=i?pl.w-60:Math.min(pl.w-60,700);VV.push(v)})}
function vvUpd(dt){vvSpawn-=dt;if(vvSpawn<=0&&VV.length<3){vvSpawn=rr(25,45);const tv=todaysVisitors().filter(j=>!VV.some(v=>v.j===j));if(tv.length){const v=vvMake(pick(tv),1);VV.push(v)}}
  VV.forEach((v,i)=>{v.t+=dt;v.hop+=dt;if(v.st==='follow'){v.f-=dt;const tx=cat.x-cat.face*(110+i*46),d=tx-v.x;if(Math.abs(d)>8){v.x+=Math.sign(d)*Math.min(Math.abs(d),(Math.abs(d)>200?320:180)*dt);v.face=Math.sign(d);v.mv=1}else v.mv=0;
      if(v.f<=0){v.st='roam';v.tx=rr(200,pl.w-200);sHearts&&0}return}
    if(v.st==='roam'&&v.t>v.life){v.st='leave';v.tx=v.x<pl.w/2?-80:pl.w+80}
    const d=v.tx-v.x;if(Math.abs(d)>6){v.x+=Math.sign(d)*Math.min(Math.abs(d),70*dt);v.face=Math.sign(d);v.mv=1}else{v.mv=0;if(v.st==='roam'&&R()<dt*0.4)v.tx=clamp(v.x+rr(-400,400),100,pl.w-100)}});
  VV=VV.filter(v=>!(v.st==='leave'&&(v.x<-60||v.x>pl.w+60)));
  if(SV&&!SV.got){SV.t+=dt;if(Math.hypot(SV.x-cat.x,SV.y-(cat.y-20))<46){SV.got=1;sparkles(SV.x,SV.y,16);souvGet(SV.k)}}}
function vvBefriend(v){const A=VIS[v.j],x=SAVE.x.vis,first=!x[A[0]];x[A[0]]={n:((x[A[0]]&&x[A[0]].n)||0)+1,at:Date.now()};save();v.st='follow';v.f=25;hearts(v.x,-60,8);AUD.SFX.heart();AUD.SFX.squeak();
  if(first){sConf&&0;confetti(40);v7say('You made a new friend! '+A[2].replace(/^a /,'A ').replace(/^an /,'An ')+'! It wants to follow Doodle!',3)}else v7say(pick(['Hi again, ','Hello, ','Yay, '])+A[2].replace(/^an? /,'little ')+'!',2)}
function vvTap(wx,wy){for(const v of VV){if(Math.abs(wx-v.x)<Math.max(48,PT(36))&&wy>-100&&wy<20){vvBefriend(v);return true}}
  if(SV&&!SV.got&&Math.hypot(wx-SV.x,wy-SV.y)<Math.max(48,PT(36))){if(Math.abs(cat.x-SV.x)<500){SV.got=1;sparkles(SV.x,SV.y,16);souvGet(SV.k);return true}}return false}
function vvDraw(){if(SV&&!SV.got&&Math.abs(SV.x-camX-W/2)<W){const b=Math.sin(T*3)*5;X.globalAlpha=0.4+0.2*Math.sin(T*4);circ(SV.x,SV.y+b,30,'#fff59d');X.globalAlpha=1;circ(SV.x,SV.y+b,24,'#fff');souvDraw(SV.k,SV.x,SV.y+b+2,30);star5(SV.x+22,SV.y-22+b,6,'#ffd54f',T)}
  for(const v of VV){if(Math.abs(v.x-camX-W/2)>W)continue;const A=VIS[v.j],h=v.mv?Math.abs(Math.sin(v.hop*9))*10:Math.abs(Math.sin(v.hop*2))*3,fr=!SAVE.x.vis[A[0]];
    ell(v.x,2,22,5,'rgba(80,40,90,0.15)');if(fr){X.globalAlpha=0.35+0.2*Math.sin(T*4);circ(v.x,-26,34,'#fff59d');X.globalAlpha=1}
    X.save();X.translate(v.x,-26-h);X.scale(-v.face,1);txt(A[1],0,0,48,'#000');X.restore();if(v.st==='follow'&&R()<0.02)hearts(v.x,-60,1)}}
const _enterPlace7=enterPlace;enterPlace=function(i){_enterPlace7(i);vvEnter();svEnter()};
const _updSpot7=updSpot;updSpot=function(dt){_updSpot7(dt);vvUpd(dt)};
const _drawKits7=drawKits;drawKits=function(){_drawKits7();vvDraw()};
const _tapWorld7=tapWorld;tapWorld=function(p){const wx=p.x+camX,wy=p.y-GY();return vvTap(wx,wy)||_tapWorld7(p)};
// ---------- Visitor Friends collection ----------
SCR.visitors={open(){const n=Object.keys(SAVE.x.vis).length;v7say(n?'Your visitor friends! You have '+n+(n===1?' friend!':' friends!'):'Visitor friends! Find cute animals around town and tap them to make friends!',2)}};
XS.visitors={draw(){UI=[];softBg('#e8f5e9','#fff3e0');const L=XL();xHead('Visitor Friends','#2e7d32');const tv=todaysVisitors();
  const cols=L.land?6:4,n=VIS.length,rows=Math.ceil(n/cols),top=TOP+L.bb+34,bot=H-Math.max(BOT,8)-20,gap=14,ts=Math.min((W-INL-INR-30-gap*(cols-1))/cols,(bot-top-gap*(rows-1))/rows,150);
  VIS.forEach((A,i)=>{const r=(i/cols)|0,c=i%cols,x=W/2-(cols*ts+(cols-1)*gap)/2+c*(ts+gap),y=top+r*(ts+gap),f=SAVE.x.vis[A[0]],today=tv.includes(i);
    X.fillStyle=f?'#fff':'rgba(255,255,255,0.55)';rrect(x,y,ts,ts,24);X.fill();if(today){X.strokeStyle='#ffd54f';X.lineWidth=5;rrect(x+3,y+3,ts-6,ts-6,22);X.stroke()}
    X.globalAlpha=f?1:0.25;const b=f?Math.abs(Math.sin(T*3+i))*6:0;txt(A[1],x+ts/2,y+ts*0.48-b,ts*0.5,'#000');X.globalAlpha=1;
    if(f){for(let h=0;h<Math.min(5,f.n);h++)heartP(x+ts/2+(h-(Math.min(5,f.n)-1)/2)*16,y+ts*0.86,6,'#ff5c9e')}else txt('?',x+ts/2,y+ts*0.82,22,'#9e9e9e');if(today)star5(x+ts-16,y+16,10,'#ffb300');
    btn('vis_'+A[0],x,y,ts,ts,()=>{if(f){AUD.SFX.heart();sSpark(x+ts/2,y+ts/2,12);v7say('Your friend, '+A[2].replace(/^an? /,'the ')+'!',2)}else{AUD.SFX.boing();v7say(today?A[2].replace(/^a /,'A ').replace(/^an /,'An ')+' is visiting today! Look around town!':'Look for me around town!',2)}})});
  bigBack()}};
// ---------- Scrapbook (backpack souvenirs), flip pages ----------
let SB=null;
SCR.scrap={open(){SB={pg:0,t:0,dir:0};const n=SOUVK.filter(k=>SAVE.x.souv[k]).length;AUD.SFX.rustle();v7say(n?'My scrapbook! Tap the arrows to turn the page!':'My scrapbook! Find a sparkly souvenir in every place for Doodle\'s backpack!',2)},close(){SB=null}};
XS.scrap={upd(dt){if(SB)SB.t+=dt},draw(){UI=[];softBg('#fff8e1','#ffe0f0');const L=XL();xHead('My Scrapbook','#8d6e63');if(!SB){bigBack();return}
  const per=4,np=Math.ceil(SOUVK.length/per),top=TOP+L.bb+30,bot=H-Math.max(BOT,8)-20,ar=V7R(),bx0=INL+16+ar*2+16,bx1=W-INR-16-ar*2-16,bw=bx1-bx0,bh=bot-top,sl0=SB.dir*(1-ease(SB.t*3))*W*0.3;
  X.save();X.translate(sl0,0);X.fillStyle='#d7ccc8';rrect(bx0-6,top+6,bw,bh,26);X.fill();X.fillStyle='#fffdf7';rrect(bx0,top,bw,bh,26);X.fill();X.fillStyle='#efebe9';X.fillRect(bx0+bw/2-3,top+10,6,bh-20);
  const ks=SOUVK.slice(SB.pg*per,SB.pg*per+per);ks.forEach((k,i)=>{const cx=bx0+bw*((i%2)*0.5+0.25),cy=top+bh*(((i/2)|0)*0.5+0.25),r=Math.min(bw/4.6,bh/4.6),got=SAVE.x.souv[k];X.save();X.translate(cx,cy);X.rotate(((i*37)%7-3)*0.03);
    X.fillStyle=got?'#fff':'rgba(255,255,255,0.5)';X.fillRect(-r,-r,2*r,2*r*1.05);if(!got){X.setLineDash([8,8]);X.strokeStyle='#bcaaa4';X.lineWidth=3;X.strokeRect(-r+8,-r+8,2*r-16,2*r-16);X.setLineDash([])}
    X.fillStyle='rgba(255,213,79,0.6)';X.fillRect(-20,-r-8,40,16);if(got){souvDraw(k,0,-6,r*0.95);}else txt('?',0,-6,r*0.6,'#bcaaa4');X.restore();
    if(got)placeIcon(k==='downtown'?'park':k,cx+r*0.7,cy+r*0.7,0.6);
    btn('sb_'+k,cx-r,cy-r,2*r,2*r,()=>{if(got){AUD.SFX.sticker();sSpark(cx,cy,14);v7say(SOUV[k][1].replace(/^a /,'A ')+' from '+SOUV[k][2]+'!',2)}else{AUD.SFX.boing();v7say('Visit '+SOUV[k][2]+' to find it!',2)}})});X.restore();
  for(let i=0;i<np;i++)circ(W/2+(i-(np-1)/2)*22,bot+8,6,i===SB.pg?'#ff5c9e':'#d7ccc8');
  const flip=d=>{SB.pg=(SB.pg+d+np)%np;SB.t=0;SB.dir=d;AUD.SFX.rustle();AUD.SFX.whoosh()};
  v7btn('sb_prev',INL+16+ar,top+bh/2,ar,'#ffcc80','◀',()=>flip(-1));v7btn('sb_next',W-INR-16-ar,top+bh/2,ar,'#ffcc80','▶',()=>flip(1),1);
  bigBack()}};
// ---------- Michigan state park campout ----------
let CP=null;
SCR.campout={open(){CP={t:0,mar:0,smore:0,ff:[],ffn:0,st:[],stn:0,owl:0,done:0,fin:0};for(let i=0;i<9;i++)CP.ff.push({u:0.22+i/8*0.74,v:i%3/2,ph:R()*6,lit:0});for(let i=0;i<7;i++)CP.st.push({u:i<4?0.04+i*0.22:0.15+(i-4)*0.22,v:i<4?(i%2?0.3:0.05):(i%2?0.95:0.75),lit:0});
  AUD.setTheme('lull');v7say('Campout at the Michigan state park! Toast a marshmallow, catch fireflies, tap the stars, and say goodnight to the owl!',3)},close(){CP=null;AUD.setTheme('title')},
  down(p){}};
function cpLay(){const L=XL(),top=TOP+L.bb+30+(L.land?0:Math.max(56,PT(40))+8),gy=H-Math.max(BOT,8)-70;return{L,top,gy}}
function cpCheck(){const c=CP;const ok=c.smore>0&&c.ffn>=5&&c.stn>=5&&c.owl>0;if(ok&&!c.done){c.done=1;c.fin=0;setTimeout(()=>{if(CP){AUD.setTheme('win');sConf(80);v7say('Goodnight, Alex! Goodnight, Doodle! Sweet dreams under the stars!',3);souvGet('camp')}},700)}}
XS.campout={upd(dt){if(!CP)return;CP.t+=dt;if(CP.done)CP.fin+=dt;for(const f of CP.ff){f.ph+=dt;if(f.lit>0)f.lit=Math.max(0.6,f.lit-dt*0.1)}},
  draw(){UI=[];const c=CP;if(!c){softBg('#1a237e','#311b92');bigBack();return}const {L,top,gy}=cpLay();const g=X.createLinearGradient(0,0,0,gy);g.addColorStop(0,'#0d1b4c');g.addColorStop(1,'#3949ab');X.fillStyle=g;X.fillRect(0,0,W,H);
    for(let i=0;i<60;i++)circ((i*137)%W,(i*71)%(gy*0.7),1.2+(i%3)*0.5,'rgba(255,255,255,'+(0.4+0.3*Math.sin(T*2+i))+')');circ(W-INR-90,top+50,34,'#fff9c4');circ(W-INR-76,top+42,30,'#283593');
    // constellation stars: tap each one
    const sp=c.st.map(s=>({x:INL+30+s.u*(W-INL-INR-60),y:top+20+s.v*(gy*0.5-top-20)}));X.beginPath();let first=1;sp.forEach((q,i)=>{if(c.st[i].lit){first?X.moveTo(q.x,q.y):X.lineTo(q.x,q.y);first=0}});strokeC('rgba(255,245,157,0.7)',3);
    sp.forEach((q,i)=>{const s=c.st[i];const r=s.lit?16:10+Math.sin(T*3+i)*2;if(!s.lit){X.globalAlpha=0.3;circ(q.x,q.y,26,'#fff59d');X.globalAlpha=1}star5(q.x,q.y,r,s.lit?'#ffeb3b':'#fffde7',T*0.3);
      btn('star'+i,q.x-38,q.y-38,76,76,()=>{if(!s.lit){s.lit=1;c.stn++;AUD.SFX.inst(72+[0,2,4,7,9,12,14][i%7],'bell');sSpark(q.x,q.y,10);if(c.stn===5)v7say('Wow! The stars make a kitty in the sky!',2);cpCheck()}else AUD.SFX.inst(84,'bell')})});
    X.fillStyle='#1b5e20';X.fillRect(0,gy,W,H-gy);X.save();X.translate(0,gy);for(let x=INL-20;x<W;x+=120)v7pine(x,0.9+((x*7)%3)*0.15,'#0b3d1a');X.restore();X.fillStyle='#2e7d32';X.fillRect(0,gy,W,H-gy);
    // owl in a tree on the left
    const ox=INL+80,oy=gy-200;X.fillStyle='#4e342e';X.fillRect(ox-14,oy,28,200);X.fillRect(ox,oy+30,70,12);X.save();X.translate(ox+44,oy+26);const ob=c.owl>0&&T-c.owlT<1.5?Math.sin(T*16)*3:0;ell(0,-20+ob,22,26,'#8d6e63');ell(0,-14+ob,14,16,'#d7ccc8');circ(-8,-30+ob,8,'#fff');circ(8,-30+ob,8,'#fff');
      const blink=Math.sin(T*1.3)>0.97;if(blink){X.fillStyle='#5d4037';X.fillRect(-14,-31+ob,12,2);X.fillRect(2,-31+ob,12,2)}else{circ(-8,-30+ob,3.5,'#222');circ(8,-30+ob,3.5,'#222')}poly([-4,-24+ob,4,-24+ob,0,-18+ob],'#ffb74d');poly([-16,-42+ob,-10,-52+ob,-6,-42+ob],'#8d6e63');poly([16,-42+ob,10,-52+ob,6,-42+ob],'#8d6e63');X.restore();
    if(!c.owl){X.globalAlpha=0.3+0.2*Math.sin(T*4);circ(ox+44,oy+4,42,'#fff59d');X.globalAlpha=1}
    // tent and campfire
    const tx=W*0.62,fx=W*0.4;v7tent(tx,gy,L.land?1.3:1.1,'#ff8a65');if(c.done){X.save();X.beginPath();X.rect(tx-30,gy-90,60,90);X.clip();drawCat(tx-4,gy,{t:T,st:'sleep',acc:catAcc(),s:0.6});X.restore();if(R()<0.03)floats&&0;txt('💤',tx+40,gy-110-Math.sin(T*2)*6,30,'#fff')}
    X.globalAlpha=0.25;circ(fx,gy-30,90+Math.sin(T*9)*4,'#ffab40');X.globalAlpha=1;v7fire(fx,gy-4,1.4,T);
    // marshmallow stick: tap the fire to toast (3 taps), then a s'more
    const mx=fx+40,my=gy-90;X.beginPath();X.moveTo(fx+130,gy-30);X.lineTo(mx,my);sl(5,'#8d6e63');const mc=['#ffffff','#ffe0b2','#ffcc80','#d7a86e'][Math.min(3,c.mar)];rrect(mx-14,my-12,28,22,8);X.fillStyle=mc;X.fill();
    if(c.smore>0){const sx=fx+150,sy=gy-26;X.fillStyle='#d7a86e';rrect(sx-24,sy-4,48,10,3);X.fill();X.fillStyle='#fff3e0';rrect(sx-20,sy-12,40,9,4);X.fill();X.fillStyle='#6d4c41';X.fillRect(sx-22,sy-16,44,5);X.fillStyle='#d7a86e';rrect(sx-24,sy-26,48,10,3);X.fill()}
    if(!c.smore){X.globalAlpha=0.3+0.2*Math.sin(T*4);circ(fx,gy-50,70,'#fff59d');X.globalAlpha=1}
    X.save();X.translate(0,gy);drawZoe(fx-130,{t:T,face:1,happy:1,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,ears:SAVE.zoe.ears});X.restore();if(!c.done){X.save();X.translate(0,gy);drawCat(fx-60,0,{t:T,st:'idle',face:1,acc:catAcc(),s:1});X.restore()}
    // fireflies
    c.ff.forEach((f,i)=>{const x0f=INL+40+f.u*(W-INL-INR-80)+Math.sin(f.ph*0.7)*10,x=L.land?x0f:W*0.33+(x0f-INL)*0.62,y=gy*0.56+f.v*(gy*0.1)+Math.cos(f.ph)*6,on=f.lit>0||Math.sin(f.ph*2)>0.6;X.globalAlpha=f.lit?0.6:on?0.45:0.15;circ(x,y,f.lit?22:14,'#eeff41');X.globalAlpha=1;circ(x,y,5,f.lit?'#f4ff81':'#c6ff00');
      btn('ff'+i,x-38,y-38,76,76,()=>{if(!f.lit){f.lit=1;c.ffn++;AUD.SFX.inst(76+[0,2,4,7,9][i%5],'bell');sSpark(x,y,8);v7say(c.ffn===5?'Five fireflies! So glowy!':pick(['Glow!','Twinkle!','A firefly!']),1);cpCheck()}})});
    btn('fire',fx-80,gy-150,180,150,()=>{AUD.SFX.crackle();sSpark(mx,my,8);if(c.mar<3){c.mar++;v7say(['Toasty!','Golden!','Yummy and gooey!'][c.mar-1],1);if(c.mar===3)setTimeout(()=>{if(!CP)return;CP.smore++;CP.mar=0;AUD.SFX.munch();sHearts(fx+150,gy-60,6);v7say("A s'more! Graham cracker, chocolate and marshmallow! Yum!",2);cpCheck()},500)}});
    btn('owl',ox,oy-50,100,100,()=>{AUD.SFX.hoot();c.owlT=T;if(!c.owl){c.owl=1;cpCheck()}setTimeout(()=>v7say('Hoo hoo! Goodnight, Alex!',2),900)});
    // goal chips (pictures only)
    const gs=[["🍫",c.smore>0],["✨",c.ffn>=5],["⭐",c.stn>=5],["🦉",c.owl>0]],gw=Math.max(56,PT(40));gs.forEach(([e,ok],i)=>{const x=W-INR-16-(gs.length-i)*(gw+8),y=L.land?TOP+12:TOP+L.bb+24;X.fillStyle=ok?'#81c784':'rgba(255,255,255,0.8)';rrect(x,y,gw,gw,16);X.fill();txt(e,x+gw/2,y+gw/2+2,gw*0.5,'#000');if(ok)txt('✓',x+gw-10,y+12,16,'#fff')});
    if(c.done&&c.fin>1.2){const s=back((c.fin-1.2)*2),w=Math.min(W-40,420),h=200;X.save();X.translate(W/2,H*0.42);X.scale(s,s);X.fillStyle='rgba(255,255,255,0.95)';rrect(-w/2,-h/2,w,h,30);X.fill();txt('🌙 Goodnight! 🌙',0,-40,34,'#3949ab');for(let i=0;i<3;i++)star5((i-1)*70,30,26,'#ffd54f');X.restore();
      const bh=Math.max(60,PT(48));pill(W/2-110,H*0.42+h/2-bh-10,220,bh,'↻ Again','#7986cb',22);btn('cp_again',W/2-110,H*0.42+h/2-bh-10,220,bh,()=>openScreen('campout'))}
    bigBack()}};
// ---------- Music maker: pentatonic pads (never a wrong note), record + loop playback, dancing kitties ----------
const PADS=[['🐱','bell',60,'#ffc1e3'],['🐶','pluck',62,'#ffe0b2'],['🐰','flute',64,'#e1bee7'],['🦉','box',67,'#c8e6c9'],['🐥','bell',69,'#fff9c4'],['🎹','box',72,'#bbdefb'],['🎸','pluck',74,'#ffccbc'],['🎺','flute',76,'#b2ebf2'],['🥁','drum',60,'#d1c4e9']];
let MU=null;
SCR.music={open(){MU={rec:0,rt:0,ev:[],play:0,pt:0,pi:0,bounce:{},hit:{},t:0};if(Array.isArray(SAVE.x.song.ev))MU.ev=SAVE.x.song.ev.slice(0,64);AUD.setTheme('none');v7say('Music time! Tap the animals and instruments to make music! Tap the red button to record a song!',2)},close(){MU=null;AUD.setTheme('title')}};
function muNote(i,fromPlay){const P=PADS[i];AUD.SFX.inst(P[2],P[1]);MU.hit[i]=0.35;const ks=Object.keys(MU.bounce);MU.bounce['d']=0.5;MU.lastNote=T;for(const k of parade())MU.bounce[k.k]=0.5;
  if(MU.rec&&!fromPlay&&MU.ev.length<64)MU.ev.push([MU.rt,i])}
function muRecStop(){MU.rec=0;SAVE.x.song={ev:MU.ev.slice(0,64)};save();AUD.SFX.check();v7say(MU.ev.length?'Great song! Tap play to hear it!':'Tap the animals to make music!',2)}
XS.music={upd(dt){if(!MU)return;MU.t+=dt;for(const k in MU.bounce)MU.bounce[k]=Math.max(0,MU.bounce[k]-dt);for(const k in MU.hit)MU.hit[k]=Math.max(0,MU.hit[k]-dt);
    if(MU.rec){MU.rt+=dt;if(MU.rt>10||MU.ev.length>=64)muRecStop()}
    if(MU.play&&MU.ev.length){const len=Math.max(1.5,MU.ev[MU.ev.length-1][0]+0.6);MU.pt+=dt;while(MU.pi<MU.ev.length&&MU.ev[MU.pi][0]<=MU.pt){muNote(MU.ev[MU.pi][1],1);MU.pi++}if(MU.pt>=len){MU.pt=0;MU.pi=0}}},
  draw(){UI=[];softBg('#ede7f6','#fce4ec');const L=XL();xHead('Music Maker','#6a1b9a');if(!MU){bigBack();return}
    const top=TOP+L.bb+20,bot=H-Math.max(BOT,8)-10,stageH=(bot-top)*(L.land?0.42:0.38),fy=top+stageH;
    // stage + dancing kitties
    X.fillStyle='rgba(255,255,255,0.5)';rrect(INL+12,top,W-INL-INR-24,stageH,24);X.fill();const beat=MU.lastNote&&T-MU.lastNote<0.6;
    for(let i=0;i<6;i++){const a=T*2+i;X.globalAlpha=beat?0.35:0.12;circ(INL+40+((i*173)%(W-80)),top+20+((i*61)%40),18,['#ff8fc8','#b388ff','#80deea','#ffd54f'][i%4]);X.globalAlpha=1}
    const ps=parade().slice(0,4),n=ps.length+1,gap=Math.min(150,(W-INL-INR-60)/n),k=Math.min(1,stageH/150);
    for(let i=0;i<n;i++){const x=W/2+(i-(n-1)/2)*gap,id=i===0?'d':ps[i-1].k,b=MU.bounce[id]||0,hop=Math.sin(b/0.5*Math.PI)*30*k,sw=Math.sin(T*8+i)*(b>0?0.15:0);X.save();X.translate(x,fy-8-hop);X.rotate(sw);
      if(i===0)drawCat(0,0,{t:T,st:'idle',face:1,acc:catAcc(),s:0.9*k});else blitKit(id,'sit',0,0,0,i%2?-1:1,0.9*k);X.restore();if(b>0.45)txt(pick(['♪','♫']),x+30,fy-110*k-hop,26,'#ab47bc')}
    // pads
    const pr=Math.max(V7R(),Math.min(L.land?60:56,(W-INL-INR-40)/(L.land?10.6:6.8))),cols=L.land?5:3,rows=Math.ceil(PADS.length/cols),ctr=pr*1.0+12,padTop=fy+20,padBot=bot-ctr*2-6,rh=Math.min(pr*2+16,(padBot-padTop)/rows);
    PADS.forEach((P,i)=>{const r=(i/cols)|0,c=i%cols,inR=Math.min(cols,PADS.length-r*cols),x=W/2+(c-(inR-1)/2)*(pr*2+18),y=padTop+rh*(r+0.5),h=MU.hit[i]||0;
      v7btn('pad'+i,x,y+(h>0?3:0),pr*(1+h*0.3),P[3],P[0],()=>{muNote(i);sSpark(x,y,6)})});
    // record / play / stop
    const by=bot-ctr,cr=Math.max(V7R(),40);
    v7btn('rec',W/2-cr*2.6,by,cr,MU.rec?'#ff1744':'#ef9a9a',(x,y)=>{circ(x,y,cr*0.42,MU.rec&&Math.sin(T*8)>0?'#fff':'#d50000')},()=>{if(MU.rec){muRecStop()}else{MU.play=0;MU.rec=1;MU.rt=0;MU.ev=[];AUD.SFX.beep();v7say('Recording! Tap the animals!',2)}},MU.rec);
    v7btn('play',W/2,by,cr,MU.play?'#a5d6a7':'#c8e6c9',(x,y)=>{if(MU.play){X.fillStyle='#2e7d32';X.fillRect(x-cr*0.3,y-cr*0.3,cr*0.6,cr*0.6)}else poly([x-cr*0.25,y-cr*0.38,x-cr*0.25,y+cr*0.38,x+cr*0.42,y],'#2e7d32')},()=>{if(MU.rec)muRecStop();if(!MU.ev.length){v7say('Tap the red button and make a song first!',2);return}MU.play=!MU.play;MU.pt=0;MU.pi=0;if(MU.play)v7say('Here is your song! It plays again and again!',1)},!MU.play&&MU.ev.length>0);
    v7btn('auto',W/2+cr*2.6,by,cr,'#fff59d','🎶',()=>{MU.play=0;MU.ev=[];let t=0;const tune=[0,2,4,5,4,2,0,3,4,7,5,4];tune.forEach(i=>{MU.ev.push([t,i]);t+=0.36});SAVE.x.song={ev:MU.ev};save();MU.play=1;MU.pt=0;MU.pi=0;v7say('Doodle\'s song!',1)});
    bigBack()}};
// ---------- Cookie decorating at Give Thanks Bakery ----------
const CK_SH=['circle','heart','star','kitty','flower'],CK_FR=['#f8bbd0','#e1bee7','#b3e5fc','#fff9c4','#ffffff','#c8e6c9'],CK_SP=['none','rainbow','dots','hearts'],CK_CA=['gum','heart','star','choc'];
let CK=null;
function ckNew(){return{sh:0,fr:-1,sp:0,ca:[]}}
SCR.cookies={open(){CK={c:ckNew(),cust:null,t:0,tray:0,from:retTo};AUD.setTheme('cozy');v7say('Give Thanks Bakery! Let\'s decorate a cookie! Pick a shape!',2)},close(){CK=null},
  back(){if(CK&&CK.tray){CK.tray=0;return true}if(CK&&CK.fromDT){openScreen('downtown');return true}return false}};
function ckPath(sh,r){X.beginPath();if(sh==='circle')X.arc(0,0,r,0,TAU);else if(sh==='heart'){X.moveTo(0,r*0.8);X.bezierCurveTo(-r*1.5,-r*0.2,-r*0.6,-r*1.3,0,-r*0.45);X.bezierCurveTo(r*0.6,-r*1.3,r*1.5,-r*0.2,0,r*0.8)}
  else if(sh==='star'){for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rd=i%2?r*0.55:r*1.08;X.lineTo(Math.cos(a)*rd,Math.sin(a)*rd)}X.closePath()}
  else if(sh==='kitty'){X.arc(0,r*0.1,r*0.9,0,TAU);X.moveTo(-r*0.85,-r*0.2);X.lineTo(-r*0.75,-r*1.05);X.lineTo(-r*0.25,-r*0.7);X.moveTo(r*0.85,-r*0.2);X.lineTo(r*0.75,-r*1.05);X.lineTo(r*0.25,-r*0.7)}
  else{for(let i=0;i<6;i++){const a=i*TAU/6;X.moveTo(Math.cos(a)*r*0.55+r*0.45,Math.sin(a)*r*0.55);X.arc(Math.cos(a)*r*0.55,Math.sin(a)*r*0.55,r*0.45,0,TAU)}}}
function drawCookie(c,x,y,r){X.save();X.translate(x,y);const sh=CK_SH[c.sh];X.save();X.translate(r*0.04,r*0.08);ckPath(sh,r);X.fillStyle='rgba(120,60,40,0.2)';X.fill();X.restore();ckPath(sh,r);X.fillStyle='#e0b070';X.fill();
  if(c.fr>=0){X.save();X.scale(0.84,0.84);ckPath(sh,r);X.fillStyle=CK_FR[c.fr];X.fill();X.restore();
    X.save();X.scale(0.84,0.84);ckPath(sh,r);X.clip();const sp=CK_SP[c.sp];for(let i=0;i<28;i++){const px=((i*53)%100/100-0.5)*1.8*r,py=((i*31)%100/100-0.5)*1.8*r,col=['#ff1744','#ffea00','#00e676','#2979ff','#d500f9','#fff'][i%6];
      if(sp==='rainbow'){X.save();X.translate(px,py);X.rotate(i);X.fillStyle=col;X.fillRect(-r*0.06,-r*0.015,r*0.12,r*0.03);X.restore()}else if(sp==='dots')circ(px,py,r*0.03,col);else if(sp==='hearts'&&i%2)heartP(px,py,r*0.06,'#ff5c9e')}X.restore()}
  if(sh==='kitty'&&c.fr>=0){circ(-r*0.3,0,r*0.07,'#4e342e');circ(r*0.3,0,r*0.07,'#4e342e');poly([-r*0.07,r*0.15,r*0.07,r*0.15,0,r*0.24],'#ff8fb3')}
  for(const q of c.ca)ckCandy(q,q[1]*r*0.6,q[2]*r*0.6,r*0.11);
  X.restore()}
function ckCandy(q,px,py,cr){if(q[0]==='gum')circ(px,py,cr,['#ff4081','#7c4dff','#00e5ff','#ffd740'][q[3]%4]);else if(q[0]==='heart')heartP(px,py,cr*1.2,'#e91e63');else if(q[0]==='star')star5(px,py,cr*1.3,'#ffc400');else{circ(px,py,cr,'#6d4c41');circ(px-cr*0.3,py-cr*0.3,cr*0.3,'rgba(255,255,255,0.4)')}}
function ckServe(){const ks=parade(),fr=Object.keys(SAVE.x.vis).map(k=>VIS.find(v=>v[0]===k)).filter(Boolean),opts=[{t:'doodle'}].concat(ks.map(K=>({t:'kit',k:K.k}))).concat(fr.map(A=>({t:'vis',e:A[1],n:A[2]})));
  CK.cust={o:pick(opts),t:0,c:JSON.parse(JSON.stringify(CK.c))};SAVE.x.tray.push(CK.c);if(SAVE.x.tray.length>12)SAVE.x.tray.shift();save();AUD.SFX.knock();v7say('Here comes a customer!',1);
  setTimeout(()=>{if(CK&&CK.cust){AUD.SFX.munch();AUD.SFX.purr(1.2);sConf(30);v7say(pick(['Yum yum! Thank you, Alex!','The best cookie ever!','Mmm! So pretty and yummy!']),2)}},1600);setTimeout(()=>{if(CK){CK.cust=null;CK.c=ckNew();v7say('It went on the cookie tray! Let\'s make another one!',1)}},4200)}
XS.cookies={upd(dt){if(CK){CK.t+=dt;if(CK.cust)CK.cust.t+=dt}},draw(){UI=[];softBg('#fff3e0','#fce4ec');const L=XL();xHead('Cookie Decorating','#8d6e63');if(!CK){bigBack();return}
  const top=TOP+L.bb+24,bot=H-Math.max(BOT,8)-12,c=CK.c;
  if(CK.tray){const t=SAVE.x.tray,cols=L.land?6:4,cw=(W-INL-INR-40)/cols,r=Math.min(cw*0.38,60);txt('🍪 Cookie Tray',W/2,top+10,26,'#8d6e63');if(!t.length)txt('🍪 ?',W/2,H/2,60,'#bcaaa4');
    t.forEach((q,i)=>{const x=INL+20+cw*((i%cols)+0.5),y=top+50+r+((i/cols)|0)*(r*2+24);drawCookie(q,x,y,r);btn('tr'+i,x-r,y-r,2*r,2*r,()=>{AUD.SFX.munch();sHearts(x,y,4);v7say(pick(['Yummy!','So pretty!','Sprinkles!']),1)})});bigBack();return}
  const cx=L.land?W*0.3:W*0.42,cr=L.land?Math.min(W*0.18,(bot-top)*0.34):Math.min(W*0.2,(bot-top)*0.14),cy=L.land?(top+bot)/2+10:top+cr*1.3+10;
  X.fillStyle='rgba(255,255,255,0.7)';circ(cx,cy+cr*0.2,cr*1.35,'rgba(255,255,255,0.7)');ell(cx,cy+cr*1.1,cr*1.3,cr*0.25,'#e0e0e0');
  if(CK.cust){const u=CK.cust,k=clamp(u.t/1.2,0,1),x=lerp(W+80,cx+cr*1.1,ease(k)),y=cy+cr*1.1,eat=u.t>1.6;drawCookie(u.c,cx,cy,cr*(eat?Math.max(0.2,1-(u.t-1.6)*0.5):1));
    X.save();X.translate(x,y);if(u.o.t==='doodle')drawCat(0,0,{t:T,face:-1,st:eat?'purr':'walk',acc:catAcc(),s:1.4});else if(u.o.t==='kit')blitKit(u.o.k,eat?'sit':'walk',0,0,0,-1,1.4);else txt(u.o.e,0,-50-(eat?Math.abs(Math.sin(T*8))*10:0),90,'#000');X.restore();if(eat&&R()<0.2)sHearts(x,y-120,1)}
  else drawCookie(c,cx,cy,cr);
  // option rows: shape, frosting, sprinkles, candies (pictures only)
  const rr0=Math.max(V7R(),Math.min(44,(L.land?W*0.6:W-INL-INR-30)/14)),x0=L.land?W*0.56:INL+20+rr0,x1=W-INR-20-rr0,rowsY=L.land?[top+rr0+6,0,0,0]:[cy+cr*1.35+rr0,0,0,0],dy=rr0*2+14;for(let i=1;i<4;i++)rowsY[i]=rowsY[0]+dy*i;
  const row=(ri,n,fnDraw,fnTap,sel)=>{const sp=Math.min(rr0*2+12,(x1-x0)/Math.max(1,n-1));for(let i=0;i<n;i++){const x=x0+i*sp,y=rowsY[ri];v7btn('ck'+ri+'_'+i,x,y,rr0,sel===i?'#ff8fc8':'#fff8f0',(bx,by)=>fnDraw(i,bx,by),()=>fnTap(i,x,y))}};
  row(0,CK_SH.length,(i,x,y)=>{X.save();X.translate(x,y);X.scale(rr0/60,rr0/60);X.translate(-x,-y);drawCookie({sh:i,fr:-1,sp:0,ca:[]},x,y,36);X.restore()},i=>{if(CK.cust)return;c.sh=i;AUD.SFX.pop();v7say(['A circle!','A heart!','A star!','A kitty!','A flower!'][i],1)},c.sh);
  row(1,CK_FR.length,(i,x,y)=>{circ(x,y,rr0*0.6,CK_FR[i]);X.beginPath();X.arc(x,y,rr0*0.6,0,TAU);strokeC('rgba(0,0,0,0.12)',2)},i=>{if(CK.cust)return;c.fr=i;AUD.SFX.plop();v7say(['Pink frosting!','Purple frosting!','Blue frosting!','Yellow frosting!','White frosting!','Green frosting!'][i],1)},c.fr);
  row(2,CK_SP.length,(i,x,y)=>{const sp=CK_SP[i];if(sp==='none')txt('🚫',x,y+2,rr0*0.8,'#000');else for(let j=0;j<8;j++){const a=j*0.8,px=x+Math.cos(a)*rr0*0.4,py=y+Math.sin(a*1.3)*rr0*0.4,col=['#ff1744','#ffea00','#00e676','#2979ff'][j%4];if(sp==='rainbow'){X.fillStyle=col;X.fillRect(px-5,py-1.5,10,3)}else if(sp==='dots')circ(px,py,3,col);else heartP(px,py,5,'#ff5c9e')}},
    i=>{if(CK.cust)return;if(c.fr<0)c.fr=0;c.sp=i;AUD.SFX.rustle();v7say(['No sprinkles!','Rainbow sprinkles!','Dotty sprinkles!','Heart sprinkles!'][i],1)},c.sp);
  row(3,CK_CA.length,(i,x,y)=>{ckCandy([CK_CA[i],0,0,1],x,y,rr0*0.42)},(i,x,y)=>{if(CK.cust)return;if(c.ca.length>=10)c.ca.shift();const a=R()*TAU,d=Math.sqrt(R())*0.95;c.ca.push([CK_CA[i],Math.cos(a)*d,Math.sin(a)*d,(R()*4)|0]);AUD.SFX.pop();sSpark(cx,cy,6);v7say(pick(['Plop!','Pretty!','Yum!','Ooh!']),1)},-1);
  // serve + tray
  const sr=Math.max(V7R(),44),sy=L.land?rowsY[3]+dy:cy-sr-8,sx2=W-INR-24-sr;
  if(!CK.cust)v7btn('serve',L.land?(x0+x1)/2-sr*1.4:sx2,sy,sr,'#a5d6a7','🍽️',()=>{if(c.fr<0)c.fr=0;AUD.SFX.sticker();ckServe()},c.fr>=0);
  v7btn('tray',L.land?(x0+x1)/2+sr*1.4:sx2,L.land?sy:cy+sr+8,sr,'#ffe0b2','🧺',()=>{CK.tray=1;AUD.SFX.whoosh();v7say(SAVE.x.tray.length?'The cookie tray! Look at all your cookies!':'Serve a cookie to put it on the tray!',2)});
  bigBack(CK.fromDT?'✕  Back to Main St':null)}};
// Give Thanks Bakery on Main Street now opens cookie decorating
const _dtOpen7=dtOpen;dtOpen=function(i){if(SHOPS[i].k==='givethanks'){const d=dtSave();if(!d.givethanks){d.givethanks=1;save()}openScreen('cookies');if(CK)CK.fromDT=1;return}_dtOpen7(i)};
{const _o=SCR.downtown.open;SCR.downtown.open=function(){_o.apply(this,arguments);setTimeout(()=>{if(state==='downtown')souvGet('downtown')},5000)}}
// ---------- Weather play: sun, rain (puddle splashing) and snow (build a snow-kitty) ----------
let WX=null;
SCR.weather={open(){WX={k:'sun',drops:[],pud:[0.2,0.2,0.2],snow:0,sk:0,spl:[],rain:0,jump:0,jx:0.5,bow:0,t:0};AUD.setTheme('park');v7say('Weather play! Tap the sun, the rain or the snow!',2)},close(){WX=null;AUD.setTheme('title')}};
function wxLay(){const L=XL(),gy=H-Math.max(BOT,8)-40,top=TOP+L.bb+20;return{L,gy,top,pX:[0.22,0.5,0.78].map(u=>INL+u*(W-INL-INR))}}
XS.weather={upd(dt){const w=WX;if(!w)return;w.t+=dt;w.jump=Math.max(0,w.jump-dt);w.bow=Math.max(0,w.bow-dt*0.1);const {gy,top}=wxLay();
    if(w.k==='rain'||w.k==='snow'){const n=w.k==='rain'?3:1;for(let i=0;i<n;i++)if(w.drops.length<(w.k==='rain'?120:70))w.drops.push({x:rr(INL,W-INR),y:top+rr(-20,40),v:w.k==='rain'?rr(420,560):rr(50,90),ph:R()*6})}
    for(const d of w.drops){d.y+=d.v*dt;if(w.k==='snow')d.x+=Math.sin(T+d.ph)*20*dt}w.drops=w.drops.filter(d=>d.y<gy);
    if(w.k==='rain')w.pud=w.pud.map(p=>Math.min(1,p+dt*0.08));if(w.k==='snow')w.snow=Math.min(1,w.snow+dt*0.08);if(w.k==='sun'){w.pud=w.pud.map(p=>Math.max(0.2,p-dt*0.05));w.snow=Math.max(0,w.snow-dt*0.03)}
    for(const s of w.spl){s.t+=dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=500*dt}w.spl=w.spl.filter(s=>s.t<0.8)},
  draw(){UI=[];const w=WX;if(!w){bigBack();return}const {L,gy,top,pX}=wxLay();const sky={sun:['#81d4fa','#e1f5fe'],rain:['#90a4ae','#cfd8dc'],snow:['#b0bec5','#eceff1']}[w.k];const g=X.createLinearGradient(0,0,0,gy);g.addColorStop(0,sky[0]);g.addColorStop(1,sky[1]);X.fillStyle=g;X.fillRect(0,0,W,H);
    if(w.bow>0){X.globalAlpha=Math.min(1,w.bow);['#ef5350','#ffa726','#ffee58','#66bb6a','#42a5f5','#ab47bc'].forEach((c,i)=>{X.beginPath();X.arc(W/2,gy,Math.min(W*0.45,gy-top)-i*12,Math.PI,0);strokeC(c,12)});X.globalAlpha=1}
    if(w.k==='sun'){const sx=W-INR-110,sy=top+70;for(let i=0;i<10;i++){const a=i*TAU/10+T*0.4;X.beginPath();X.moveTo(sx+Math.cos(a)*50,sy+Math.sin(a)*50);X.lineTo(sx+Math.cos(a)*70,sy+Math.sin(a)*70);strokeC('#ffd54f',8)}circ(sx,sy,44,'#ffeb3b');circ(sx-14,sy-6,4,'#5d4037');circ(sx+14,sy-6,4,'#5d4037');X.beginPath();X.arc(sx,sy+6,16,0.3,Math.PI-0.3);strokeC('#5d4037',4);
      btn('sun',sx-70,sy-70,140,140,()=>{w.bow=3;AUD.SFX.chime();sConf(20);v7say('A rainbow! So pretty!',2)})}
    else for(let i=0;i<4;i++)cloud(INL+80+i*(W-INL-INR-160)/3,top+50+(i%2)*30,1.8);
    X.fillStyle=w.k==='snow'?'#fafafa':'#9ccc65';X.fillRect(0,gy,W,H-gy);if(w.snow>0){X.fillStyle='#fff';X.fillRect(0,gy-w.snow*24,W,w.snow*24+4)}
    if(w.k==='sun')for(let i=0;i<8;i++){const x=INL+30+i*(W-INL-INR-60)/7;X.fillStyle='#66bb6a';X.fillRect(x-2,gy-30,4,30);for(let j=0;j<5;j++){const a=j*TAU/5;circ(x+Math.cos(a)*7,gy-34+Math.sin(a)*7,6,['#ff8fc8','#ffd54f','#ce93d8'][i%3])}circ(x,gy-34,4,'#fff59d')}
    // puddles (only when not snowy): tap to splash
    if(w.k!=='snow')pX.forEach((x,i)=>{const s=w.pud[i];ell(x,gy+8,60*s+30,14*s+5,'#4fc3f7');ell(x-10,gy+5,30*s+10,5*s+2,'rgba(255,255,255,0.5)');btn('pud'+i,x-80,gy-60,160,100,()=>{w.jump=0.6;w.jx=i;AUD.SFX.splash();for(let j=0;j<14;j++)w.spl.push({x,y:gy,vx:rr(-160,160),vy:rr(-380,-180),t:0});v7say(pick(['Splish splash!','Splash!','Jump in the puddle!']),1)})});
    for(const s of w.spl)circ(s.x,s.y,5,'#81d4fa');
    for(const d of w.drops){if(w.k==='rain'){X.fillStyle='rgba(41,121,255,0.6)';X.fillRect(d.x,d.y,2.5,12)}else snowflake(d.x,d.y,6,'#fff')}
    // snow-kitty: tap the snow pile to build it (4 taps)
    const kx=pX[2],ks=1.1;if(w.k==='snow'||w.sk>0){X.save();X.translate(kx,gy);X.scale(ks,ks);if(w.sk===0&&w.k==='snow'){ell(0,-8,46,16,'#fff');X.globalAlpha=0.35+0.2*Math.sin(T*4);circ(0,-20,50,'#fff59d');X.globalAlpha=1}
      if(w.sk>=1){circ(0,-34,36,'#fff')}if(w.sk>=2){circ(0,-90,26,'#fff')}if(w.sk>=3){poly([-22,-104,-16,-130,-4,-112],'#fff');poly([22,-104,16,-130,4,-112],'#fff');poly([-17,-108,-14,-122,-8,-111],'#ffc1d6');poly([17,-108,14,-122,8,-111],'#ffc1d6')}
      if(w.sk>=4){circ(-9,-94,3.5,'#263238');circ(9,-94,3.5,'#263238');poly([-4,-86,4,-86,0,-81],'#ff8a65');X.beginPath();X.moveTo(-6,-86);X.lineTo(-24,-90);X.moveTo(6,-86);X.lineTo(24,-90);strokeC('#90a4ae',1.5);X.fillStyle='#ff5c9e';rrect(-26,-68,52,10,5);X.fill();X.fillRect(10,-62,10,24);if(w.k==='sun'){X.fillStyle='#263238';rrect(-18,-100,14,9,3);X.fill();rrect(4,-100,14,9,3);X.fill()}}
      X.restore();btn('sk',kx-80,gy-170,160,180,()=>{if(w.sk>=4){AUD.SFX.meow(1);sHearts(kx,gy-150,4);v7say('Meow! Hi, snow kitty!',1);return}if(w.k!=='snow'){v7say('We need snow! Tap the snowflake!',2);return}w.sk++;AUD.SFX.pat();sSpark(kx,gy-60,10);
        v7say(['A big snowball!','A snowy head!','Kitty ears!','You built a snow kitty! Hooray!'][w.sk-1],2);if(w.sk===4){sConf(60);AUD.SFX.sticker()}})}
    // Doodle and Zoe watch (Doodle hops into puddles)
    const jx=w.jump>0?pX[w.jx]:W*0.36,jh=w.jump>0?Math.sin((0.6-w.jump)/0.6*Math.PI)*60:0;X.save();X.translate(0,gy);drawZoe(W*0.3-60,{t:T,face:1,happy:1,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,ears:SAVE.zoe.ears});X.restore();
    X.save();X.translate(0,0);drawCat(jx,gy-jh,{t:T,face:1,st:w.jump>0?'air':'idle',acc:catAcc(),s:1});X.restore();
    // weather buttons
    const br=Math.max(V7R(),44),bx=W-INR-20-br;[['sun','☀️','#fff59d','Sunny day!'],['rain','🌧️','#b3e5fc','Rainy day! Splash in the puddles!'],['snow','❄️','#e3f2fd','Snowy day! Let\'s build a snow kitty!']].forEach(([k,e,c,s],i)=>{
      const x=L.land?bx:W/2+(i-1)*(br*2+20),y=L.land?TOP+L.bb+40+br+i*(br*2+16):TOP+L.bb+30+br;v7btn('wx_'+k,x,y,br,w.k===k?'#ff8fc8':c,e,()=>{if(w.k===k)return;w.k=k;w.drops=[];if(k==='sun'&&w.pud[0]>0.5)w.bow=3;AUD.SFX.whoosh();v7say(s,2)},w.k!==k&&Math.sin(T*2+i)>0.95)});
    bigBack()}};
// idle hints for the new screens (voice only)
Object.assign(IDLE_HINT,{music:'Tap the animals to make music!',cookies:'Pick a frosting, sprinkles and candies for your cookie!',weather:'Tap the sun, the rain or the snow!',campout:'Tap the campfire, the fireflies, the stars and the owl!',scrap:'Tap the arrow to turn the page!',visitors:'Tap a friend!',flight:'Here we go!'});
