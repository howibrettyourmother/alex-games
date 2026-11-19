// ================= v1.5: My House delete fixes + kid polish (idle voice hints, tap sparkles) =================
// --- My House: robust bin drop, tap-to-select red X bubble, broom "start over" with picture yes/no ---
(function(){const H=SCR.house,o0=H.open;
  H.open=function(){o0.call(this);HS.sel=null;HS.conf=0};
  H.down=function(p,id){if(HS.conf)return;const R0=houseRoom(),it=houseHit(p,R0);if(it){HS.drag={id,it,ox:p.x-(R0.x+it.u*R0.w),oy:p.y-(R0.y+it.v*R0.h),sx:p.x,sy:p.y,px:p.x,py:p.y,moved:0};const a=SAVE.x.house.items;a.splice(a.indexOf(it),1);a.push(it);AUD.SFX.pat()}else if(HS.sel){HS.sel=null}};
  H.move=function(p,id){const d=HS&&HS.drag;if(!d||d.id!==id)return;if(Math.hypot(p.x-d.sx,p.y-d.sy)>14)d.moved=1;if(!d.moved)return;const R0=houseRoom();d.it.u=clamp((p.x-d.ox-R0.x)/R0.w,0.03,0.97);d.it.v=clamp((p.y-d.oy-R0.y)/R0.h,0.08,1);d.px=p.x;d.py=p.y;HS.sel=null};
  H.up=function(p,id){const d=HS&&HS.drag;if(!d||d.id!==id)return;HS.drag=null;
    if(!d.moved){HS.sel=HS.sel===d.it?null:d.it;if(HS.sel)sayT('Tap the red X to take it away!',1);return}
    // iPad can send pointercancel / odd coords on lift: use the last tracked finger spot too
    const bn=houseBin(),near=q=>Math.hypot(q.x-bn.x,q.y-bn.y)<bn.r+44;if(near({x:d.px,y:d.py})||(p&&isFinite(p.x)&&near(p)))houseRemove(d.it);save()}})();
function houseRemove(it){const a=SAVE.x.house.items,i=a.indexOf(it);if(i<0)return;const R0=houseRoom();a.splice(i,1);AUD.SFX.plop();AUD.SFX.whoosh();sSpark(R0.x+it.u*R0.w,R0.y+it.v*R0.h-30,16);if(HS)HS.sel=null;sayT(pick(['Poof!','Bye bye!','All gone!']),1);save()}
houseBin=function(){const R0=houseRoom();return{x:R0.x+R0.w-70,y:R0.fy-10,r:48}};
(function(){const d0=XS.house.draw;XS.house.draw=function(){d0();if(!HS)return;const R0=houseRoom(),S=Math.max(70/SC,64);
  if(HS.drag&&HS.drag.moved){const b=houseBin(),hot=Math.hypot(HS.drag.px-b.x,HS.drag.py-b.y)<b.r+44;circ(b.x,b.y,(b.r+8)*(hot?1.2:1),hot?'#ff8a80':'rgba(255,255,255,0.9)');txt('🗑️',b.x,b.y+2,b.r*1.1,'#000')}
  const it=HS.sel;if(it&&SAVE.x.house.items.includes(it)){const s=houseSize(it,R0),x=R0.x+it.u*R0.w+s.w/2-6,y=R0.y+it.v*R0.h-s.h+6,r=S/2*(1+Math.sin(T*6)*0.05);
    X.save();X.setLineDash([10,8]);X.strokeStyle='#ff4f9a';X.lineWidth=4;rrect(x-s.w-8+6,y-8-6+6,s.w+16,s.h+16,14);X.stroke();X.restore();
    circ(x,y,r+4,'#fff');circ(x,y,r,'#e53935');txt('✕',x,y+2,r*1.2,'#fff');btn('hdel',x-S/2,y-S/2,S,S,()=>houseRemove(it))}
  // broom: start over
  const bx=INL+12,by=H-Math.max(BOT,8)-R0.pal-10-S-16;X.fillStyle='#fff';rrect(bx,by,S,S,18);X.fill();txt('🧹',bx+S/2,by+S/2+2,S*0.6,'#000');btn('broom',bx,by,S,S,()=>{HS.conf=1;HS.sel=null;sayT('Clean up everything?',1)});
  if(HS.conf){UI=[];X.fillStyle='rgba(60,20,80,0.55)';X.fillRect(0,0,W,H);const c=Math.min(H*0.3,W*0.2,190),cy=H*0.55;txt('🧹',W/2,H*0.25,c*0.7,'#000');
    [['✅','#66bb6a',-1,()=>{SAVE.x.house.items=[];HS.conf=0;save();AUD.SFX.whoosh();sConf(60);sayT('All clean! Let\'s decorate again!',2)}],['❌','#ef5350',1,()=>{HS.conf=0;AUD.SFX.click();sayT('Okay! Keep it!',1)}]].forEach(([e,col,sd,fn])=>{const x=W/2+sd*c*0.8;circ(x,cy,c/2+6,'#fff');circ(x,cy,c/2,col);txt(e,x,cy+3,c*0.5,'#fff');btn('conf'+sd,x-c/2,cy-c/2,c,c,fn)})}}})();
// --- idle voice hints: after ~8s with no touch, a gentle spoken nudge (max 3 per screen, ~12s apart) ---
const IDLE_HINT={title:'Tap Alex and Doodle to play!',map:'Tap a place to visit!',fun:'Tap a picture to play!',gift:'Tap the present!',sleep:'Tap a kitty to tuck them in!',house:'Tap a picture at the bottom to add it to the house!',
  care:'Pick a tool, then rub your kitty!',art:'Tap a picture to color it!',fridge:'Tap a picture to see it big!',closet:'Tap something to dress up!',photo:'Tap the camera to take a picture!',cafe:'Tap a treat for the kitties!',book:'Look at all your stickers! Tap Back when you are done.',
  kitties:'Tap a kitty!',menu:'Tap a big picture!',play:'Find the kitties! Tap them!'};
let idleT=0,idleN=0,idleS='';addEventListener('pointerdown',()=>{idleT=0;idleN=0},{capture:true});
(function(){const u0=update;update=function(dt){u0(dt);if(state!==idleS){idleS=state;idleT=0;idleN=0}if(overlay&&state==='play'){idleT=0;return}idleT+=dt;
  const h=state==='art'&&AR&&AR.page>=0?(AR.tool===0?'Pick a color, then tap the picture!':'Draw with your finger!'):IDLE_HINT[state];
  if(h&&idleN<3&&idleT>(idleN?12:8)){idleT=0;idleN++;sayT(h,1)}}})();
// --- juicy feedback: every button tap sparkles where the finger is ---
(function(){const t0=uiTap;uiTap=function(p){const r=t0(p);if(r)sSpark(p.x,p.y,6);return r}})();
if(window.__X)window.__X.itemC=i=>{const R0=houseRoom(),it=SAVE.x.house.items[i],s=houseSize(it,R0);return{x:(R0.x+it.u*R0.w)*SC,y:(R0.y+it.v*R0.h-s.h/2)*SC}};if(window.__X)window.__X.binC=()=>{const b=houseBin();return{x:b.x*SC,y:b.y*SC}};
if(window.__X)window.__X.tapG=(x,y)=>{const r=uiTap({x,y});return [r,SAVE.x.house.items.length,SAVE===window.__D.save]};
// --- Kitty Dance Party: disco lights, everyone bops to the beat; tap a kitty to make it spin; star button = confetti jump ---
let DP=null;
FUN.push(['🪩','Dance Party',()=>openScreen('dance'),'#f8bbd0','Kitty dance party!']);
SCR.dance={open(){DP={sp:{},jump:0,lights:0};AUD.setTheme('park');sayT('Dance party! Tap a kitty to make it dance!',2)},close(){DP=null;AUD.setTheme('cozy')}};
function danceLay(){const L=XL(),P=petList().slice(0,7),n=P.length+1,fy=H*0.86,span=W-INL-INR-120,gap=span/Math.max(n,2),k=Math.min(1.15,(H-TOP-L.bb)/190);
  return P.map((p,i)=>{const j=i<P.length/2?i:i+1;return{p,x:INL+60+gap*(j+0.5),y:fy,s:k}}).concat([{zoe:1,x:INL+60+gap*(Math.ceil(P.length/2)+0.5),y:fy,s:k}])}
XS.dance={upd(dt){if(!DP)return;DP.jump=Math.max(0,DP.jump-dt);for(const k in DP.sp)DP.sp[k]=Math.max(0,DP.sp[k]-dt)},
 draw(){UI=[];if(!DP){bigBack();return}const L=XL(),beat=T*2.2*Math.PI;
  const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a1050');g.addColorStop(1,'#6a1b9a');X.fillStyle=g;X.fillRect(0,0,W,H);
  // light beams from the disco ball
  const bx=W/2,by=TOP+30;X.save();X.globalCompositeOperation='lighter';['#ff4f9a','#4fc3f7','#ffd54f','#81c784','#b388ff'].forEach((c,i)=>{const a=Math.PI/2+Math.sin(T*0.9+i*1.3)*0.9;X.fillStyle=c+'33';X.beginPath();X.moveTo(bx,by);X.lineTo(bx+Math.cos(a-0.09)*H*1.4,by+Math.sin(a-0.09)*H*1.4);X.lineTo(bx+Math.cos(a+0.09)*H*1.4,by+Math.sin(a+0.09)*H*1.4);X.closePath();X.fill()});X.restore();
  X.strokeStyle='#ccc';X.lineWidth=3;X.beginPath();X.moveTo(bx,0);X.lineTo(bx,by-26);X.stroke();circ(bx,by,30,'#cfd8dc');for(let i=0;i<14;i++){const a=i*0.9+T*1.5;circ(bx+Math.cos(a)*18,by+Math.sin(a*1.3)*18,5,i%2?'#ffffff':'#90a4ae')}
  // checker dance floor
  const fy=H*0.86-30;for(let x=0,i=0;x<W;x+=60,i++)for(let y=fy,j=0;y<H;y+=36,j++){const on=((i+j+Math.floor(T*2.2))%3)===0;X.fillStyle=on?['#ff8fc8','#80deea','#fff59d'][(i+j)%3]:'#4a148c';X.fillRect(x,y,60,36)}
  for(const d of danceLay()){const id=d.zoe?'zoe':d.p.k,sp=DP.sp[id]||0,hop=Math.abs(Math.sin(beat+d.x*0.01))*16*d.s+(DP.jump>0?Math.sin(DP.jump/0.8*Math.PI)*60:0);
    X.save();X.translate(d.x,d.y-hop);X.rotate(sp>0?(1-sp/0.9)*Math.PI*2:Math.sin(beat/2)*0.12);
    if(d.zoe){X.scale(d.s*1.15,d.s*1.15);drawZoe(0,{t:T*2,face:1,happy:1,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,ears:SAVE.zoe.ears})}else{const m=d.p.k==='doodle'?0.95:1.45;X.scale(m,m);drawPet(d.p.k,0,0,d.s,sp>0?'meow':'idle')};X.restore();
    const S=Math.max(110*d.s,PT(72));btn('dk_'+id,d.x-S/2,d.y-S*1.4,S,S*1.5,()=>{DP.sp[id]=0.9;AUD.SFX.meow(Math.floor(R()*3));sHearts(d.x,d.y-90*d.s,5);sSpark(d.x,d.y-60*d.s,10);if(R()<0.6)sayT(d.zoe?pick(['Go Alex!','Alex can dance!']):pick([d.p.n+' is dancing!','Wiggle wiggle!','Spin, '+d.p.n+'!']),1)})}
  const S=Math.max(96,PT(80)),sx=W-INR-S-16,sy=TOP+12;circ(sx+S/2,sy+S/2,S/2+(1+Math.sin(beat))*3,'#ffd54f');txt('⭐',sx+S/2,sy+S/2+3,S*0.55,'#000');btn('djump',sx,sy,S,S,()=>{DP.jump=0.8;sConf(50);AUD.SFX.boing();sayT(pick(['Everybody jump!','Yay!','Party time!']),1)});
  bigBack()}};
IDLE_HINT.dance='Tap a kitty to make it dance!';
if(window.__X)window.__X.DP=()=>DP;
if(window.__X)window.__X.KITTIES=KITTIES;
