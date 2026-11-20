// ================= state, save data, Alex physics, Doodle follower, interactions, tasks =================
let state='title',T=0,stT=0,TS=1,overlay=null,camX=0;
const ITEMS=[{k:'bow',n:'Adventure Bandana'},{k:'crown',n:'Crown'},{k:'tutu',n:'Tutu'},{k:'cape',n:'Cape'},{k:'glasses',n:'Cool Shades'},{k:'flower',n:'Leaf Badge'},{k:'collar',n:'Bell Collar'},
  {k:'horn',n:'Unicorn Horn'},{k:'bowtie',n:'Purple Bow Tie'},{k:'trail',n:'Sparkle Trail'},{k:'wings',n:'Fairy Wings'},{k:'sweater',n:'Heart Sweater'},
  {k:'witch',n:'Witch Hat',sea:'hal'},{k:'santa',n:'Santa Hat',sea:'win'},{k:'party',n:'Party Hat',sea:'bday'},{k:'dino',n:'Dino Hood'},{k:'explorer',n:'Explorer Hat'},{k:'pack',n:'Treasure Pack'}];
// how the new items unlock (all gentle): kitty friends found, different mini-games played; seasonal hats unlock on their own during the season
const UNLOCK2={bowtie:()=>kitCount()>=1,horn:()=>mgCount()>=1,trail:()=>mgCount()>=2,wings:()=>kitCount()>=3,sweater:()=>mgCount()>=3};
const UNLOCK_HINT={bowtie:'Find a kitty friend!',horn:'Play a game!',trail:'Play 2 games!',wings:'Find 3 kitty friends!',sweater:'Play 3 games!',witch:'Comes in October!',santa:'Comes in December!',party:"Comes on Alex's birthday!",collar:'Collect 30 fish!',dino:'Finish Meadow Brook!',explorer:"Help Dad!",pack:"Help Mom!"};
const UNLOCK={dad:'explorer',mom:'pack',klub:'dino',park:'glasses',gma:'flower'};
const TOPS=['#ff9cc8','#c39bef','#9fd8ff','#ffe08a','#a8e6c8','#d1a6ff','#ff6fae'],TOPFISH=[0,10,25,40,60,75,90],TUTUS=['#bfe3ff','#ffc1e3','#e1bee7','#fff59d','#c9a8ff','#ffffff'],HBOWS=[null,'#ff5c9e','#b388ff','#ffd54f'],ZEARS=[null,'#ff8fc8','#b388ff','#f2eef0'];
function defSave(){return{p:{},fish:0,un:{cape:1,bow:1},wear:{cape:1},zoe:{top:TOPS[0],tutu:TUTUS[0],bow:HBOWS[1],ears:null},kit:{},mg:{},fl:{},quest:{}}}
// older saves (v1.2) simply lack the new fields: fill them in without touching what is there
let SAVE;try{SAVE=Object.assign(defSave(),JSON.parse(LS.get('save','{}')))}catch(e){SAVE=defSave()}
for(const k of ['kit','mg','fl','un','wear','p'])if(!SAVE[k]||typeof SAVE[k]!=='object')SAVE[k]={};if(!SAVE.zoe||typeof SAVE.zoe!=='object')SAVE.zoe=defSave().zoe;if(typeof SAVE.fish!=='number')SAVE.fish=+SAVE.fish||0;if(!SAVE.fl.noBow){SAVE.fl.noBow=1;if(SAVE.wear)SAVE.wear.bow=0;save()}
const kitCount=()=>Object.keys(SAVE.kit).length,mgCount=()=>Object.keys(SAVE.mg).length;
// returns the items that just unlocked (so the caller can celebrate)
function checkUnlocks(){const got=[];for(const k in UNLOCK2)if(!SAVE.un[k]&&UNLOCK2[k]()){SAVE.un[k]=1;got.push(k)}if(got.length)save();return got}
function save(){LS.set('save',JSON.stringify(SAVE))}
function pdata(k){return SAVE.p[k]||(SAVE.p[k]={stars:[],task:0,sticker:0})}
const say=(k,p)=>SPEAK.on?AUD.say(k,p):false;// recorded voice clips follow the voice toggle too
let PI=0,pl=PLACES[0],plats=[],cat=null,zoe=null,stars=[],fish=[],task=null,giver=null,ex=[],parts=[],floats=[],bubbles=[],banner=null;
// ---------- flow ----------
function enterPlace(i){PI=i;pl=PLACES[i];plats=buildPlace(pl);const d=pdata(pl.k);
  cat={x:80,y:0,vx:0,vy:0,ground:'floor',face:1,st:'idle',sT:0,idle:0,coy:0,buf:0,jumps:0,drop:0,carry:null,t:0};
  zoe={x:30,face:1,walk:0,pet:0,happy:0,petCD:3,t:0};
  stars=pl.stars.map((s,j)=>({x:s[0],y:s[1],got:d.stars.includes(j),j}));fish=pl.fish.map(f=>({x:f[0],y:f[1],got:0}));
  const tk=pl.task;task={k:tk.item,x:tk.ix,y:tk.iy,st:d.task?'done':(tk.hide?'hidden':'free')};giver={k:tk.who,x:tk.x,said:-99,wave:0};
  ex=pl.extras.map(e=>Object.assign({},e,{ox:e.x,oy:e.y,vx:0,vy:0,st:0,tm:0,ph:R()*6}));parts=[];floats=[];bubbles=[];overlay=null;camX=0;
  kitsEnter();spotEnter();seasonEnter();
  state='play';stT=0;resetInput();AUD.setTheme(pl.th);banner={s:pl.n,t:0};if(typeof questEnter==='function')questEnter();setTimeout(()=>say('p'+(i+1),3),300)}
function goMap(){state='title';overlay=null;resetInput();AUD.setTheme('title');stT=0}
// ---------- fx ----------
function burst(x,y,n,cols,sp,r){for(let i=0;i<n&&parts.length<160;i++){const a=R()*TAU,v=rr(0.3,1)*(sp||160);parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:rr(0.5,0.9),r:rr(2,r||5),c:pick(cols)})}}
function hearts(x,y,n){for(let i=0;i<n&&parts.length<160;i++)parts.push({x:x+rr(-14,14),y,vx:rr(-30,30),vy:rr(-110,-60),t:0,life:rr(0.9,1.4),r:rr(6,10),c:pick(['#ffd54f','#ff6f00','#43a047','#1565c0']),star:1})}
function sparkles(x,y,n){for(let i=0;i<n&&parts.length<160;i++){const a=R()*TAU,v=rr(40,160);parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:rr(0.5,1),r:rr(4,8),c:pick(['#fff59d','#ffffff','#ffd54f','#4fc3f7']),star:1})}}
function confetti(n){for(let i=0;i<n&&parts.length<160;i++)parts.push({x:camX+rr(0,W),y:-GY()-10,vx:rr(-40,40),vy:rr(60,180),t:0,life:rr(1.6,3),r:rr(3,6),c:pick(['#ffd23f','#e53935','#4fc3f7','#81c784','#ff8a26','#1565c0']),conf:1,rot:rr(0,6)})}
function float(s,x,y,c){if(floats.length<10)floats.push({s,x,y,t:0,c:c||'#fff'})}
function bubble(x,y,s,who){bubbles=bubbles.filter(b=>b.who!==who);bubbles.push({x,y,s,t:0,who})}
// ---------- actions ----------
function setSt(s){cat.st=s;cat.sT=0}
function nearEx(t,r){let b=null,bd=r;for(const e of ex){if(e.t!==t)continue;const ey=e.y!=null?e.y:0;const cx=t==='nap'||t==='blanket'?clamp(cat.x,e.x,e.x+e.w):e.x;const d=Math.hypot(cx-cat.x,(ey-cat.y)*0.8);if(d<bd){bd=d;b=e}}return b}
function knockCup(c){if(c.st)return;c.st=1;c.vx=cat.face*120;c.vy=-200;AUD.SFX.knock();cat.st!=='air'&&setSt('bat');setTimeout(()=>{if(R()<0.7)say('oops',2)},400);zoe.happy=1.5;bubble(zoe.x,-120,'Hee hee!','zoe')}
function petCat(){zoe.pet=2;zoe.happy=2;zoe.petCD=7;AUD.SFX.purr(1.6);hearts(zoe.x+10,-60,6);if(R()<0.6)say(R()<0.5?'good':'pet',2);bubble(zoe.x,-125,pick(['Good kitty!','I love you, Doodle!','Soft kitty!']),'zoe')}
let pawCycle=0;
function paw(){if(kitPaw()||spotPaw())return;const c=nearEx('cup',70);if(c&&!c.st){knockCup(c);return}
  const lf=nearEx('leaves',60);if(lf){pounce(lf);return}
  const y=nearEx('yarn',60);if(y){setSt('bat');y.vx=cat.face*300;AUD.SFX.squeak();return}
  if(Math.abs(zoe.x-cat.x)<80&&cat.y>-80&&zoe.petCD<=4){petCat();return}
  const b=nearEx('blanket',40);if(b){setSt('bisc');AUD.SFX.purr(1.4);return}
  const n=nearEx('nap',40);if(n){sleep();return}
  const ck=nearEx('cookie',70);if(ck){hearts(ck.x,ck.y-20,5);AUD.SFX.treat();bubble(giver.x,-150,'Cookies for good kitties!','npc');return}
  const a=['cheer','wave','cape'][pawCycle++%3];setSt(a);
  if(a==='cheer'){AUD.SFX.hop();hearts(cat.x,cat.y-70,6);bubble(cat.x,cat.y-110,pick(['Yeah!','I got this!','Adventure time!']),'hero')}
  else if(a==='wave'){AUD.SFX.squeak();bubble(cat.x,cat.y-110,pick(['Hi!','Hello!']),'hero')}
  else{AUD.SFX.hop();sparkles(cat.x,cat.y-50,10);bubble(cat.x,cat.y-110,pick(['Cape power!','Whoosh!']),'hero')}}
function sleep(){setSt('sleep');cat.vx=0;AUD.SFX.purr(2);if(R()<0.6)say('nap',2)}
function pounce(lf){if(lf.st>0)return;lf.st=1.5;AUD.SFX.rustle();burst(lf.x,-12,26,['#ffb74d','#ff8a65','#ffd54f','#f48fb1'],220,6);setSt('air');cat.vy=Math.min(cat.vy,-380);cat.ground=null;
  if(task.st==='hidden'&&Math.abs(task.x-lf.x)<40){task.st='free';sparkles(task.x,-20,12);AUD.SFX.chime();bubble(task.x,-60,'Peep!','duckling')}}
function collectStar(s){s.got=1;const d=pdata(pl.k);if(!d.stars.includes(s.j))d.stars.push(s.j);save();AUD.SFX.chime();sparkles(s.x,s.y,28);hearts(s.x,s.y,6);burst(s.x,s.y,16,['#ffd54f','#fff59d','#fff','#ff8fc8'],200,6);float('★ '+d.stars.length+'/5',s.x,s.y-30,'#fff59d');if(zoe)zoe.happy=1.6;if(cat)cat.pop=1;
  if(d.stars.length>=5)say('allstars',3);else if(!AUD.count(d.stars.length))say('star',3);checkDone()}// one line per star, never stacked
function deliver(){task.st='done';const d=pdata(pl.k);d.task=1;save();say(pl.task.ty,3);AUD.SFX.sticker();hearts(giver.x,-140,10);sparkles(giver.x,-100,16);bubble(giver.x,-170,pl.task.thanks,'npc');giver.wave=3;cat.carry=null;zoe.happy=2;setTimeout(checkDone,1800)}
function checkDone(){const d=pdata(pl.k);if(d.sticker||d.stars.length<5||!d.task)return;d.sticker=1;const it=UNLOCK[pl.k];SAVE.un[it]=1;SAVE.wear[it]=1;save();
  overlay={k:'done',t:0,item:it};AUD.SFX.sticker();AUD.setTheme('win');confetti(80);say('sticker',3);setTimeout(()=>say('newitem',2),1800)}
// ---------- update ----------
function update(dt){T+=dt;stT+=dt;if(banner){banner.t+=dt;if(banner.t>2.6)banner=null}
  for(const p of parts){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.conf){p.vy=Math.min(p.vy+60*dt,160);p.vx+=Math.sin(T*3+p.rot)*20*dt;p.rot+=dt*4}else if(p.heart){p.vy+=20*dt}else{p.vx*=0.95;p.vy*=0.95;p.vy+=60*dt}}parts=parts.filter(p=>p.t<p.life);
  for(const f of floats){f.t+=dt;f.y-=36*dt}floats=floats.filter(f=>f.t<1.4);for(const b of bubbles)b.t+=dt;bubbles=bubbles.filter(b=>b.t<2.8);
  updScr(dt);updSeason(dt);if(state==='mini')updMini(dt);else if(state==='cafe')updCafe(dt);else if(state==='photo')updPhoto(dt);else if(XS[state]&&XS[state].upd)XS[state].upd(dt);
  if(state!=='play')return;if(overlay){overlay.t+=dt;if(overlay.k==='done'&&R()<0.05)confetti(3);return}
  const c=cat;c.t+=dt;c.sT+=dt;
  let ix=0,iy=0;{if(Math.abs(joy.dx)>0.15)ix=joy.dx;iy=joy.dy;ix+=arrowDir();ix+=(keys.ArrowRight||keys.KeyD?1:0)-(keys.ArrowLeft||keys.KeyA?1:0);if(keys.ArrowDown||keys.KeyS)iy=1;ix=clamp(ix,-1,1)}
  if(tapQ){const p=tapQ;tapQ=null;const wx=p.x+camX,wy=p.y-GY();if(typeof questTap==='function'&&questTap(wx,wy)){}else if(Math.abs(wx-zoe.x)<40&&wy>-140&&wy<10){if(Math.abs(zoe.x-c.x)<110)petCat();else{zoe.happy=1.5;AUD.SFX.squeak();bubble(zoe.x,-125,'Come here, Doodle!','zoe')}}else if(Math.hypot(wx-c.x,wy-(c.y-50))<56){AUD.SFX.hop();hearts(c.x,c.y-70,3);bubble(c.x,c.y-110,pick(['I got this!','Come on, Doodle!','Adventure time!']),'hero')}else jumpQ=1}
  if(jumpQ){c.buf=0.16;jumpQ=0}if(pawQ){pawQ=0;paw()}
  const cozy=['sleep','bisc','flop','purr','loaf','bigloaf','judgy','pawface','treesnooze','limp','sticker'];
  const busy=cozy.indexOf(c.st)>=0||c.st==='meow'||c.st==='bat';
  if(busy&&(Math.abs(ix)>0.2||c.buf>0)){if(cozy.indexOf(c.st)>=0)setSt('idle')}
  if((c.st==='meow'||c.st==='bat'||c.st==='cheer'||c.st==='wave'||c.st==='cape')&&c.sT>0.7)setSt('idle');if(c.st==='flop'&&c.sT>3.5)setSt('idle');if(c.st==='purr'&&c.sT>2.2)setSt('idle');
  if((c.st==='loaf'||c.st==='bigloaf'||c.st==='judgy'||c.st==='sticker')&&c.sT>5)setSt('idle');
  if((c.st==='pawface'||c.st==='treesnooze'||c.st==='limp')&&c.sT>4.8)setSt('idle');
  const still=cozy.indexOf(c.st)>=0;
  // horizontal: snappy with light inertia
  const onG=c.ground!=null,tv=still?0:ix*310;c.vx+=(tv-c.vx)*Math.min(1,dt*(onG?16:8));c.pop=Math.max(0,(c.pop||0)-dt*5);if(Math.abs(ix)>0.15)c.face=ix>0?1:-1;
  // jump: buffered, coyote time, one extra air jump (forgiving)
  c.coy=onG?0.13:c.coy-dt;c.buf-=dt;c.drop-=dt;
  if(c.buf>0&&!still){if(onG||c.coy>0){if(iy>0.6&&c.ground&&c.ground!=='floor'){c.drop=0.28;c.dropP=c.ground;c.ground=null;c.vy=60}else{c.vy=-720;AUD.SFX.hop()}c.ground=null;c.coy=0;c.buf=0;c.jumps=1;setSt('air')}
    else if(c.jumps<2){c.vy=-610;c.jumps=2;c.buf=0;AUD.SFX.hop2();sparkles(c.x,c.y-10,6)}}
  if(onG&&c.ground!=='floor'&&iy>0.75&&Math.abs(ix)<0.3&&c.sT>0.2&&!still){c.drop=0.28;c.dropP=c.ground;c.ground=null}
  const py=c.y;c.x=clamp(c.x+c.vx*dt,20,pl.w-20);
  if(c.ground&&c.ground!=='floor'){const g=c.ground;if(c.x<g.x1-4||c.x>g.x2+4){c.ground=null}else{c.y=surfY(g,c.x);if(g.slide){c.vx+=420*dt*Math.sign(g.y2-g.y1)*(g.x2>g.x1?1:-1);c.vx=Math.min(c.vx,420)}}}
  if(!c.ground){c.vy=Math.min(c.vy+1700*dt,900);c.y+=c.vy*dt;
    if(c.vy>=0){let best=null,by=1e9;for(const p of plats){if(c.drop>0&&p===c.dropP)continue;if(c.x<p.x1||c.x>p.x2)continue;const sy=surfY(p,c.x);if(py<=sy+3&&c.y>=sy&&sy<by){by=sy;best=p}}
      if(best){c.y=by;c.vy=0;c.ground=best;c.jumps=0;AUD.SFX.land();c.pop=1;burst(c.x,c.y+2,8,['#d7ccc8','#fff59d','#ffe0b2'],80,3);if(c.st==='air')setSt('idle');if(R()<0.08){AUD.SFX.squeak();float(pick(['Toot!','Boing!','Pffft!']),c.x,c.y-70,'#c5e1a5')}}else if(c.y>=0){c.y=0;c.vy=0;c.ground='floor';c.jumps=0;AUD.SFX.land();c.pop=1;burst(c.x,2,8,['#d7ccc8','#fff59d','#ffe0b2'],80,3);if(c.st==='air')setSt('idle');if(R()<0.08){AUD.SFX.squeak();float(pick(['Toot!','Boing!','Pffft!']),c.x,c.y-70,'#c5e1a5')}}}}
  if(!still&&c.st!=='meow'&&c.st!=='bat'&&c.st!=='cheer'&&c.st!=='wave'&&c.st!=='cape'){const ns=!c.ground?'air':Math.abs(c.vx)>25?'walk':'idle';if(ns!==c.st)setSt(ns)}
  c.idle=(c.st==='idle')?c.idle+dt:0;
  // Doodle (the follower) takes cat-naps; Alex stays on his feet
  if(c.st==='bisc'||c.st==='sleep'||c.st==='loaf'||c.st==='bigloaf'||c.st==='judgy'||c.st==='pawface'||c.st==='treesnooze'||c.st==='limp'||c.st==='sticker'||c.st==='purr')setSt('idle');
  // camera
  // camera: lead Alex a little, but also keep Doodle in frame when he lags behind
  let tx=c.x-W*0.42+c.face*40;if(zoe)tx=clamp(tx,zoe.x-W+50,zoe.x-50);tx=clamp(tx,c.x-W+70,c.x-70);
  tx=clamp(tx,0,Math.max(0,pl.w-W));camX+=(tx-camX)*Math.min(1,dt*5);
  // Doodle follows (on the floor), runs when far, nuzzles Alex when he rests nearby
  const z=zoe;z.t+=dt;z.pet-=dt;z.happy-=dt;z.petCD-=dt;const zt=c.x-c.face*72,dz=zt-z.x;
  if(z.pet>0)z.walk=0;else if(Math.abs(dz)>14){const sp=Math.abs(dz)>260?330:170;z.x+=Math.sign(dz)*Math.min(Math.abs(dz),sp*dt);z.face=Math.sign(dz);z.walk=1}else{z.walk=0;z.face=c.x>z.x?1:-1}
  updKits(dt);updSpot(dt);updTrail(dt);
  if(z.petCD<=0&&z.pet<=0&&c.st==='idle'&&c.idle>1.2&&Math.abs(z.x-c.x)<90&&c.y>-70)petCat();
  // collectibles
  for(const s of stars)if(!s.got&&Math.hypot(s.x-c.x,s.y-(c.y-26))<34)collectStar(s);
  for(const f of fish)if(!f.got&&Math.hypot(f.x-c.x,f.y-(c.y-24))<30){f.got=1;SAVE.fish++;save();AUD.SFX.treat();sparkles(f.x,f.y,6);{const t=performance.now();if(t-(window._fcT||0)>1800)window._fcN=0;window._fcT=t;window._fcN=(window._fcN||0)%10+1;float(String(window._fcN),f.x,f.y-46,'#fff59d');AUD.count(window._fcN,window._fcN===1)}// count each fish: one, two, three...
  float('+1 🪙',f.x,f.y-20,'#ffd54f');
    if(SAVE.fish&&SAVE.fish%15===0){float('Coins!',c.x,c.y-80,'#ffd54f');AUD.SFX.sticker()}if(SAVE.fish===30){SAVE.un.collar=1;save();float('Bell Collar unlocked!',c.x,c.y-100,'#fff59d')}}
  // task item
  if(task.st==='free'&&Math.hypot(task.x-c.x,task.y-(c.y-20))<38){task.st='carried';cat.carry=task.k;AUD.SFX.chime();sparkles(task.x,task.y,10);float('Bring it back!',c.x,c.y-80,'#fff59d')}
  if(task.st==='carried'){if(task.k==='duckling'){task.x+=((c.x-c.face*40)-task.x)*Math.min(1,dt*4);task.y=0}else{task.x=c.x+c.face*24;task.y=c.y-34}
    if(Math.abs(c.x-giver.x)<90&&c.y>-120)deliver()}
  if(task.st!=='done'&&Math.abs(c.x-giver.x)<240&&T-giver.said>18){giver.said=T;giver.wave=2;bubble(giver.x,-170,pl.task.say,'npc');say(pl.task.hi,3)}
  giver.wave-=dt;
  // extras
  for(const e of ex){e.tm+=dt;
    switch(e.t){
      case 'cup':if(e.st===1){e.vy+=1200*dt;e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.y>=0){e.y=0;e.vy=-e.vy*0.35;e.vx*=0.6;if(Math.abs(e.vy)<40){e.st=2;e.back=6}}}else if(e.st===2){e.back-=dt;if(e.back<=0){e.st=0;e.x=e.ox;e.y=e.oy;sparkles(e.x,e.y-10,8)}}
        else if(c.ground&&Math.abs(e.x-c.x)<22&&Math.abs(e.y-c.y)<6&&Math.abs(c.vx)>60)knockCup(e);break;
      case 'yarn':e.x+=e.vx*dt;e.vx*=Math.pow(0.4,dt);if(e.x<30||e.x>pl.w-30)e.vx=-e.vx;e.x=clamp(e.x,30,pl.w-30);if(Math.abs(e.x-c.x)<22&&Math.abs(c.y)<20&&Math.abs(c.vx)>40&&Math.abs(e.vx)<120){e.vx=c.vx*1.4;AUD.SFX.squeak()}break;
      case 'leaves':if(e.st>0)e.st-=dt;else if(Math.abs(e.x-c.x)<46&&c.y>-16&&(c.vy>100||Math.abs(c.vx)>60))pounce(e);break;
      case 'fly':{const near=Math.hypot(e.fx-c.x||0,(e.fy||0)-(c.y-30))<90;if(e.fx==null){e.fx=e.x;e.fy=-120}const tx=near?e.x+Math.sin(e.ph)*40:e.x+Math.sin(e.tm*0.7+e.ph)*80,ty=near?-300:-110+Math.sin(e.tm*1.3+e.ph)*40;e.fx+=(tx-e.fx)*dt*(near?2.5:1);e.fy+=(ty-e.fy)*dt*(near?2.5:1);break}
      case 'ducks':if(Math.abs(e.x+120-c.x)<200&&T-(e.q||0)>6){e.q=T;AUD.SFX.quack()}break}}
  if(typeof updQuest==='function')updQuest(dt);
}
