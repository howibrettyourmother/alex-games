// ================= kitty friends: one per place. Find them, pet them (purr + hearts), pick a name, then they follow Doodle in a parade =================
const KITTIES=[
 {k:'persian',p:'dad',n:'Fluffy White Kitty',x:1585,y:0,s:0.72,c:'#fffdfb',d:'#ece3e8',w:'#ffffff',fluff:1,eye:'#64b5f6',ear:'#ffc1d6',names:[['Snowball','❄️'],['Cloud','☁️'],['Princess','👑'],['Marshmallow','🍡']]},
 {k:'galaxy',p:'mom',n:'Galaxy Kitty',x:1345,y:-100,s:0.66,c:'#9b7be0',d:'#7a5cc8',w:'#dccbff',stars:1,star:1,eye:'#ffd54f',ear:'#ffc1e3',names:[['Luna','🌙'],['Twinkle','✨'],['Starlight','⭐'],['Rainbow','🌈']]},
 {k:'tiny',p:'klub',n:'Tiny Kitten',x:250,y:-50,s:0.5,c:'#bbb6c1',d:'#9e98a6',w:'#f6f3f8',eye:'#81c784',names:[['Peanut','🥜'],['Cupcake','🧁'],['Mittens','🧤'],['Bubbles','🫧']]},
 {k:'calico',p:'park',n:'Calico Kitty',x:1440,y:-38,s:0.66,c:'#fffaf3',d:'#efe2d2',w:'#ffffff',pat:[[-10,-6,9,7,'#f5a142'],[10,-9,8,6,'#4a3f45'],[-2,7,7,4,'#f5a142']],hp:[-6,-8,7,6,'#f5a142'],tip:'#4a3f45',eye:'#8d6e63',names:[['Patches','🧩'],['Cookie','🍪'],['Daisy','🌼'],['Maple','🍁']]},
 {k:'bow',p:'gma',n:'Fancy Bow Kitty',x:1640,y:0,s:0.66,c:'#ffe4ef',d:'#f7c8db',w:'#ffffff',bow:'#ff5c9e',lash:1,eye:'#ab47bc',names:[['Rosie','🌹'],['Bella','🎀'],['Bubblegum','🍬'],['Lulu','💗']]}];
const KIT=k=>KITTIES.find(q=>q.k===k),PARADE_MAX=5;
const kitName=k=>SAVE.kit[k]&&SAVE.kit[k].name||KIT(k).names[0][0];
const kitEmoji=k=>{const K=KIT(k),n=kitName(k),e=K.names.find(q=>q[0]===n);return e?e[1]:'🐱'};
function parade(){return KITTIES.filter(K=>SAVE.kit[K.k]).sort((a,b)=>(SAVE.kit[a.k].at||0)-(SAVE.kit[b.k].at||0)).slice(-PARADE_MAX)}// newest five follow Doodle
// sprite cache: each kitty pose is drawn once and then blitted (cheap on the iPad's A10)
function kitSpr(k,pose,fr,party,closed){return spr('kit:'+k+pose+fr+(party?1:0)+(closed?1:0),120,130,()=>{X.translate(0,60);drawKit(KIT(k),pose,fr,{party,closed})})}
function blitKit(k,pose,fr,x,y,face,sc,o){o=o||{};sc=sc||1;const s=kitSpr(k,pose,fr,o.party!=null?o.party:SEASON.bday,o.closed);X.save();X.translate(x,y);X.scale(face<0?-sc:sc,sc);X.drawImage(s.c,-60,-125,120,130);X.restore()}
let kits=[],trail=[],kitSeen=0;
function kitsEnter(){kits=[];trail=[];kitSeen=0;for(let j=80;j>=0;j--)trail.push(zoe.x-j*4);
  parade().forEach((K,i)=>kits.push({K,x:Math.max(10,zoe.x-40*(i+1)),y:0,vy:0,face:1,st:'follow',t:R()*3,fr:0,ft:0}));
  const K=KITTIES.find(q=>q.p===pl.k);if(K&&!SAVE.kit[K.k])kits.push({K,x:K.x,y:K.y,vy:0,face:-1,st:'wait',t:0,fr:0,ft:0})}
function updKits(dt){const z=zoe;let last=trail[trail.length-1];while(Math.abs(z.x-last)>=4){last+=Math.sign(z.x-last)*4;trail.push(last)}if(trail.length>300)trail.splice(0,trail.length-300);
  let i=0;for(const k of kits){k.t+=dt;
    if(k.st==='follow'){const idx=Math.max(0,trail.length-1-(i+1)*11),tx=trail[idx],d=tx-k.x,sp=Math.abs(d)>220?620:340;i++;
      if(Math.abs(d)>3){k.x+=Math.sign(d)*Math.min(Math.abs(d),sp*dt);k.face=Math.sign(d);k.ft+=dt;if(k.ft>0.11){k.ft=0;k.fr^=1}k.moving=1}else{k.moving=0;k.face=cat.x>k.x?1:-1}
      if(k.y<0||k.vy<0){k.vy+=1500*dt;k.y+=k.vy*dt;if(k.y>=0){k.y=0;k.vy=0}}}
    else if(k.st==='wait'){if(!kitSeen&&Math.abs(cat.x-k.x)<300){kitSeen=1;AUD.SFX.meow(1);bubble(k.x,k.y-70,'Mew!','kit');sayT('Look! A kitty! Go pet the kitty!',2)}
      k.face=cat.x>k.x?1:-1}
    else if(k.st==='purr'){if(R()<dt*4)hearts(k.x,k.y-40,1);if(k.t>1.5&&!overlay){overlay={k:'name',K:k.K,sel:0,t:0,kit:k};sayT('Pick a name for your kitty!',2)}}}}
function petKit(k){if(k.st!=='wait')return;k.st='purr';k.t=0;AUD.SFX.purr(1.8);hearts(k.x,k.y-50,9);sparkles(k.x,k.y-40,8);zoe.happy=2;bubble(zoe.x,-125,'Soft kitty!','zoe');sayT('Purr! The kitty loves you!',2)}
const kitNear=k=>Math.abs(cat.x-k.x)<80&&Math.abs(cat.y-k.y)<140;
function kitPaw(){for(const k of kits)if(k.st==='wait'&&kitNear(k)){petKit(k);return true}return false}
function kitTap(wx,wy){for(const k of kits){const h=70*k.K.s/0.66;if(Math.abs(wx-k.x)<44&&wy>k.y-h-10&&wy<k.y+16){
    if(k.st==='wait'){if(Math.abs(cat.x-k.x)<360)petKit(k);else{AUD.SFX.meow(1);k.vy=-200;bubble(k.x,k.y-70,'Mew!','kit')}}
    else if(k.st==='follow'){AUD.SFX.purr(1);AUD.SFX.meow(2);hearts(k.x,k.y-40,5);k.vy=-260;sayT('Hi, '+kitName(k.K.k)+'!',1)}
    return true}}return false}
function kitHint(){return kits.some(k=>k.st==='wait'&&kitNear(k))}
function drawKits(){for(const k of kits){if(k.x<camX-80||k.x>camX+W+80)continue;const hop=k.st==='purr'?-Math.abs(Math.sin(k.t*8))*4:0;
  const pose=k.st==='follow'&&k.moving?'walk':'sit';blitKit(k.K.k,pose,k.fr,k.x,k.y+hop,k.face,1,{closed:k.st==='purr'});
  if(k.st==='wait'){const by=k.y-90*k.K.s/0.66-8+Math.sin(T*3)*4;circ(k.x,by,14,'rgba(255,255,255,0.92)');heartP(k.x,by+3,8,'#ff5c9e');if(Math.sin(T*4)>0.3)star5(k.x+18,by-12,5,'#fff59d')}}}
// ---------- name picker (after petting a new kitty, or from the collection page). Pictures + voice: no reading needed ----------
let kitPick=null;// {K,sel,onDone}
function nameDone(K,i){const n=K.names[i][0],first=!SAVE.kit[K.k];SAVE.kit[K.k]=Object.assign(SAVE.kit[K.k]||{at:Date.now()},{name:n});save();AUD.SFX.sticker();
  sayT(first?'Hi, '+n+'! '+n+' is your friend now!':'Hi, '+n+'!',3);return first}
function drawNamePicker(K,sel,onSel,onDone,inPlay){btn('block',0,0,W,H,()=>{});X.fillStyle='rgba(90,40,110,0.5)';X.fillRect(0,0,W,H);const land=W>H*1.15;
  const pw=Math.min(W-24,land?640:440),ph=Math.min(H-TOP-BOT-20,land?470:560),px=W/2-pw/2,py=Math.max(TOP+10,H/2-ph/2);X.fillStyle='#fff';rrect(px,py,pw,ph,28);X.fill();
  // back (= keep the picked name), always top-left of the card
  const bb=Math.max(56,PT(46));pill(px+12,py+12,bb*2.2,bb,'✕ Back','#ff5c9e',20);btn('nameBack',px+6,py+6,bb*2.2+12,bb+12,onDone);
  txt('Pick a name!',px+pw/2+bb*0.9,py+12+bb/2,land?28:24,'#c2185b');
  const ky=py+bb+24;X.save();const ks=land?1.5:1.25;circ(px+pw/2,ky+92*ks-34*ks,46*ks,'#ffe0f0');blitKit(K.k,'sit',0,px+pw/2,ky+92*ks,1,ks);X.restore();
  const cols=2,gap=12,cw=(pw-36-gap)/cols,ch=Math.max(PT(52),land?64:70),gy=ky+100*ks+8;
  K.names.forEach((nm,i)=>{const c=i%cols,r=(i/cols)|0,x=px+18+c*(cw+gap),y=gy+r*(ch+gap),on=i===sel;X.fillStyle=on?'#ff8fc8':'#fff0f7';rrect(x,y,cw,ch,18);X.fill();if(on){X.lineWidth=4;X.strokeStyle='#c2185b';rrect(x,y,cw,ch,18);X.stroke()}
    txt(nm[1],x+30,y+ch/2+2,28,'#000');txt(nm[0],x+cw/2+18,y+ch/2+1,Math.min(22,cw/7),on?'#fff':'#7b3fa0');btn('name'+i,x,y,cw,ch,()=>onSel(i))});
  const oy=gy+2*(ch+gap)+4,ow=Math.min(pw-36,260),oh=Math.max(58,PT(50));pill(W/2-ow/2,Math.min(oy,py+ph-oh-12),ow,oh,'✓ Yes!','#66bb6a',24);btn('nameOk',W/2-ow/2,Math.min(oy,py+ph-oh-12),ow,oh,onDone)}
function nameSel(i){const K=overlay?overlay.K:kitPick.K;if(overlay)overlay.sel=i;else kitPick.sel=i;AUD.SFX.meow(i%3);sayT(K.names[i][0]+'!',2)}
function nameConfirm(){const o=overlay;if(!o||o.k!=='name')return;nameDone(o.K,o.sel);const k=o.kit;overlay=null;AUD.setTheme(pl.th);
  if(k){k.st='follow';k.vy=-300;kits.splice(kits.indexOf(k),1);kits.push(k)}hearts(cat.x,cat.y-60,8);confetti(30);
  const got=checkUnlocks();if(got.length){setTimeout(()=>{float('Something new in the closet!',cat.x,cat.y-100,'#fff59d');say('newitem',2)},2600)}}
// ---------- collection page ----------
function drawKitties(){UI=[];softBg('#ffe0f0','#e8dcff');const land=W>H*1.15,n=kitCount();
  txt('My Kitty Friends',W/2,TOP+(land?50:104),land?32:28,'#c2185b');txt('🐱 '+n+' / '+KITTIES.length,W/2,TOP+(land?86:138),20,'#7b3fa0');
  const KN=KITTIES.length,cols=land?(KN>5?4:5):(KN>6?3:2),rows=Math.ceil(KN/cols),top=TOP+(land?108:160),bot=H-Math.max(BOT,8)-(land?82:84),gap=12;
  const cw=Math.min(land?170:180,(W-INL-INR-24-gap*(cols-1))/cols),ch=Math.min(land?300:220,(bot-top-gap*(rows-1))/rows);
  KITTIES.forEach((K,i)=>{const c=i%cols,r=(i/cols)|0,inRow=Math.min(cols,KN-r*cols),x=W/2-(inRow*cw+(inRow-1)*gap)/2+c*(cw+gap),y=top+r*(ch+gap),got=!!SAVE.kit[K.k];
    X.fillStyle=got?'#fff':'rgba(255,255,255,0.55)';rrect(x,y,cw,ch,20);X.fill();const ks=Math.min(1.7,ch/130,cw/80),fy=y+ch-44;
    if(got){blitKit(K.k,'sit',0,x+cw/2,fy-Math.abs(Math.sin(T*2+i))*3,i%2?-1:1,ks);txt(kitEmoji(K.k)+' '+kitName(K.k),x+cw/2,y+ch-22,Math.min(20,cw/7.5),'#7b3fa0');
      const rb=Math.max(44,PT(44));X.fillStyle='rgba(255,193,227,0.9)';rrect(x+cw-rb-4,y+4,rb,rb,14);X.fill();txt('✏️',x+cw-rb/2-4,y+4+rb/2+1,20,'#000');
      btn('kit'+i,x,y,cw,ch,()=>{AUD.SFX.purr(1.2);AUD.SFX.meow(i%3);sHearts(x+cw/2,fy-60,6);sayT(kitName(K.k)+'!',2)});
      btn('kitname'+i,x+cw-rb-8,y,rb+8,rb+8,()=>{kitPick={K,sel:Math.max(0,K.names.findIndex(q=>q[0]===kitName(K.k)))};sayT('Pick a name!',2)})}
    else{X.globalAlpha=0.22;blitKit(K.k,'sit',0,x+cw/2,fy,1,ks,{party:false});X.globalAlpha=1;txt('?',x+cw/2,fy-50*ks,40,'rgba(150,90,170,0.6)');placeIcon(K.p,x+cw/2-cw*0.25,y+ch-24,0.6);
      txt(PLACES.find(q=>q.k===K.p).n,x+cw/2+12,y+ch-22,Math.min(14,cw/10),'#ab47bc');btn('kit'+i,x,y,cw,ch,()=>{AUD.SFX.boing();sayT('Find this kitty at '+PLACES.find(q=>q.k===K.p).n.replace("Gail's","Gail's place")+'!',2)})}});
  const cb=Math.max(150,PT(120)),chh=Math.max(56,PT(46));pill(W/2-cb/2,H-Math.max(BOT,8)-chh-12,cb,chh,'🍰 Café','#f06292',20);btn('toCafe',W/2-cb/2,H-Math.max(BOT,8)-chh-12,cb,chh,()=>openScreen('cafe'));
  bigBack();
  if(kitPick)drawNamePicker(kitPick.K,kitPick.sel,nameSel,()=>{nameDone(kitPick.K,kitPick.sel);kitPick=null})}
SCR.kitties={open(){kitPick=null;sayT('Your kitty friends!',2)},back(){if(kitPick){nameDone(kitPick.K,kitPick.sel);kitPick=null;return true}return false}};
