// ================= v1.7 navigation: a simple home with 4 big picture hubs + one-tap favorites =================
// Before v1.7 the map showed 9 place buttons + 6 menu buttons + a gift at once (16 targets). Now: 4 hubs (Town, Trips, Play & Make,
// My Stuff) and a row of favorites. Every tile is a big picture, every tap is spoken, Back from anything opened in a hub returns to that hub.
let HUBRET=null;
const HUBS={
 town:{n:'Town',ic:'🏡',c:'#ffd6ec',say:'Town! Where do you want to go?',tiles:()=>PLACES.slice(0,8).map((P,i)=>({pi:P.k,n:P.n,say:P.n+'!',c:['#ffe0f0','#efe0ff','#fff3c4','#dff7e6','#ffe4ec','#ffe0b2','#e3f2fd','#b2ebf2'][i],fn:()=>enterPlace(i),done:pdata(P.k).sticker}))
   .concat([{dt:1,n:'Downtown Rochester',say:'Downtown Rochester!',c:'#ffd6ec',fn:()=>openScreen('downtown')},{e:'🍪',n:'Bakery Cookies',say:'Give Thanks Bakery! Cookie decorating!',c:'#ffe0b2',fn:()=>openScreen('cookies')}])},
 trips:{n:'Trips',ic:'✈️',c:'#b3e5fc',say:'Trips! Where should we go?',tiles:()=>TRIPS.map(tr=>({pi:tr.k,n:tr.n,sub:tr.sub,say:tr.sub==='Florida'?tr.n+' in Florida!':tr.k==='camp'?'Campout at the state park!':'The Colorado mountains!',c:{fl1:'#b2ebf2',fl2:'#ffe0e8',colo:'#dcedc8',camp:'#d1c4e9'}[tr.k],fn:()=>tripGo(tr),done:tr.k==='camp'?SAVE.x.souv.camp:pdata(tr.k).sticker}))},
 make:{n:'Play & Make',ic:'🎨',c:'#fff59d',say:'Play and make! What do you want to do?',tiles:()=>[
   {e:'🎵',n:'Music',say:'Music maker!',c:'#e1bee7',fn:()=>openScreen('music')},{e:'🍪',n:'Cookies',say:'Cookie decorating!',c:'#ffe0b2',fn:()=>openScreen('cookies')},{e:'🖍️',n:'Color',say:'Color and draw!',c:'#fff59d',fn:()=>openScreen('art')},
   {e:'🌦️',n:'Weather',say:'Weather play!',c:'#b3e5fc',fn:()=>openScreen('weather')},{e:'🪩',n:'Dance',say:'Kitty dance party!',c:'#f8bbd0',fn:()=>openScreen('dance')},{e:'📷',n:'Photo',say:'Photo booth!',c:'#d1c4e9',fn:()=>openScreen('photo')},
   {e:'🍰',n:'Café',say:'Kitty café!',c:'#ffccbc',fn:()=>openScreen('cafe')},{e:'🛁',n:'Pet Care',say:'Pet care!',c:'#b2ebf2',fn:()=>openScreen('care')},{e:'🌙',n:'Sleepover',say:'Kitty sleepover!',c:'#c5cae9',fn:()=>openScreen('sleep')},{e:'🏠',n:'My House',say:'Build a house!',c:'#ffd6ec',fn:()=>openScreen('house')}]},
 stuff:{n:'My Stuff',ic:'🎒',c:'#c8e6c9',say:'My stuff!',tiles:()=>[
   {e:giftReady()?'🎁':'✨',n:'Surprise',say:"Doodle's surprise!",c:'#ffe0b2',fn:()=>openScreen('gift'),glow:giftReady()},{e:'👗',n:'Closet',say:'Dress up!',c:'#f8bbd0',fn:()=>openScreen('closet')},{e:'📖',n:'Stickers',say:'My sticker book!',c:'#e1bee7',fn:openBook},
   {e:'🐱',n:'Kitties',say:'My kitty friends!',c:'#ffe4ec',fn:()=>openScreen('kitties')},{e:'🐰',n:'Visitors',say:'Visitor friends!',c:'#dcedc8',fn:()=>openScreen('visitors')},{e:'📔',n:'Scrapbook',say:'My scrapbook!',c:'#fff8e1',fn:()=>openScreen('scrap')},{e:'🧲',n:'Fridge',say:'The fridge gallery!',c:'#c8e6c9',fn:()=>openScreen('fridge')}]}};
const HUBK=Object.keys(HUBS);
function hubTile(t,x,y,w,h,id,fn){const s=1+(t.glow?Math.sin(T*5)*0.04:0);X.save();X.translate(x+w/2,y+h/2);X.scale(s,s);X.translate(-x-w/2,-y-h/2);
  X.fillStyle='rgba(120,60,140,0.15)';rrect(x+2,y+5,w,h,24);X.fill();X.fillStyle=t.c||'#fff';rrect(x,y,w,h,24);X.fill();X.strokeStyle='#fff';X.lineWidth=5;rrect(x+3,y+3,w-6,h-6,22);X.stroke();
  const m=Math.min(w,h),cy=y+h*0.44;if(t.pi){circ(x+w/2,cy,m*0.32,'#fff');placeIcon(t.pi,x+w/2,cy-2,m/95)}else if(t.dt){circ(x+w/2,cy,m*0.32,'#fff');downtownIcon(x+w/2,cy,m/95)}else txt(t.e,x+w/2,cy,m*0.42,'#000');
  if(t.done){circ(x+w-18,y+18,13,'#81c784');txt('✓',x+w-18,y+19,16,'#fff')}
  txt(t.n,x+w/2,y+h*0.86,Math.min(17,w/8.5),'#6a1b9a');X.restore();btn(id,x,y,w,h,fn)}
for(const hk of HUBK){const HB=HUBS[hk];
  SCR['hub_'+hk]={open(){HUBRET=hk;AUD.setTheme('title');v7say(HB.say,2)}};
  XS['hub_'+hk]={draw(){UI=[];softBg('#fff0f8',HB.c);const L=XL();xHead(HB.ic+' '+HB.n,'#7b3fa0');const ts0=HB.tiles(),n=ts0.length,cols=L.land?(n<=4?4:5):(n<=4?2:3),rows=Math.ceil(n/cols),gap=14,top=TOP+L.bb+26,bot=H-Math.max(BOT,8)-14;
    const tw=Math.min((W-INL-INR-30-gap*(cols-1))/cols,L.land?(n<=4?190:150):170),th=Math.min(tw*1.05,(bot-top-gap*(rows-1))/rows);
    ts0.forEach((t,i)=>{const r=(i/cols)|0,inRow=Math.min(cols,n-r*cols),c=i%cols,x=W/2-(inRow*tw+(inRow-1)*gap)/2+c*(tw+gap),y=top+r*(th+gap)+Math.max(0,(bot-top-rows*th-(rows-1)*gap)/2);
      hubTile(t,x,y,tw,th,hk+'_'+i,()=>{AUD.SFX.boing();sSpark(x+tw/2,y+th/2,10);if(t.say)v7say(t.say,2);t.fn()})});
    bigBack('🏠  Home')}}}
const _backToGame7=backToGame;backToGame=function(){if(state==='cookies'||state==='flight'){const S=SCR[state];if(S.back&&S.back())return}if(state.startsWith('hub_')){HUBRET=null;const S=SCR[state];goMap();return}
  if(retTo==='title'&&HUBRET&&state!=='play'){openScreen('hub_'+HUBRET);return}_backToGame7()};
const _bigBack7=bigBack;bigBack=function(label){if(!label&&HUBRET&&retTo==='title'&&!state.startsWith('hub_'))label='⬅  Back';return _bigBack7(label)};
const _goMap7=goMap;goMap=function(){HUBRET=null;_goMap7()};
// favorites on the home screen: the things Alex plays most, one tap away
const FAVS=[{k:'play',e:null,n:'Play',c:'#ff8fc8',say:"Let's play!",fn:()=>{let i=PLACES.slice(0,8).findIndex(q=>!pdata(q.k).sticker);enterPlace(i<0?PI||0:i)}},
  {k:'surprise',e:'🎁',n:'Surprise',c:'#ffcc80',say:"Doodle's surprise!",fn:()=>openScreen('gift')},{k:'cafe',e:'🍰',n:'Café',c:'#ffab91',say:'Kitty café!',fn:()=>openScreen('cafe')},
  {k:'closet',e:'👗',n:'Dress Up',c:'#f48fb1',say:'Dress up!',fn:()=>openScreen('closet')},{k:'music',e:'🎵',n:'Music',c:'#ce93d8',say:'Music maker!',fn:()=>openScreen('music')}];
function homeLayout(){const L=XL(),land=L.land,ty=TOP+(land?40:52);const fr=Math.max(V7R(),land?46:40),fy=H-Math.max(BOT,8)-fr-22;
  const htop=ty+(land?70:66),hbot=fy-fr-24,cols=land?4:2,rows=land?1:2,gap=land?18:16,tw=Math.min((W-INL-INR-40-gap*(cols-1))/cols,land?200:210),th=Math.min(tw*(land?1.15:0.95),(hbot-htop-gap*(rows-1))/rows);
  return{land,ty,fr,fy,htop,hbot,cols,rows,gap,tw,th}}
drawTitle=function(){UI=[];softBg('#c8f0d8','#d6ecff');const H0=homeLayout(),land=H0.land,bob=Math.sin(T*2)*3;drawSeasonMap(land);
  txt("Alex & Doodle's",W/2,H0.ty+bob,land?34:30,'#1b5e20');txt(SEASON.bday?'Happy Birthday, Alex!':'Big Adventure',W/2,H0.ty+(land?34:32)+bob,land?26:23,SEASON.bday?'#ff5c9e':'#1565c0',SEASON.bday?{st:'#fff',sw:5}:{});
  const blockH=H0.rows*H0.th+(H0.rows-1)*H0.gap,y0=H0.htop+Math.max(0,(H0.hbot-H0.htop-blockH)/2);
  HUBK.forEach((hk,i)=>{const HB=HUBS[hk],c=i%H0.cols,r=(i/H0.cols)|0,x=W/2-(H0.cols*H0.tw+(H0.cols-1)*H0.gap)/2+c*(H0.tw+H0.gap),y=y0+r*(H0.th+H0.gap),w=H0.tw,h=H0.th,s=1+Math.sin(T*2+i)*0.02;
    X.save();X.translate(x+w/2,y+h/2);X.scale(s,s);X.translate(-x-w/2,-y-h/2);X.fillStyle='rgba(120,60,140,0.18)';rrect(x+3,y+7,w,h,30);X.fill();X.fillStyle=HB.c;rrect(x,y,w,h,30);X.fill();X.strokeStyle='#fff';X.lineWidth=6;rrect(x+4,y+4,w-8,h-8,26);X.stroke();
    const m=Math.min(w,h),cy=y+h*0.42;
    if(hk==='town'){circ(x+w/2,cy,m*0.3,'#fff');placeIcon('dad',x+w/2-m*0.12,cy+4,m/150);placeIcon('park',x+w/2+m*0.14,cy+2,m/170)}
    else if(hk==='trips'){circ(x+w/2,cy,m*0.3,'#fff');txt('✈️',x+w/2,cy-m*0.06+Math.sin(T*2)*4,m*0.3,'#000');placeIcon('fl1',x+w/2-m*0.15,cy+m*0.12,m/230);placeIcon('colo',x+w/2+m*0.15,cy+m*0.12,m/230)}
    else txt(HB.ic,x+w/2,cy,m*0.42,'#000');
    if(hk==='stuff'&&giftReady()){const gb=Math.abs(Math.sin(T*3))*5;txt('🎁',x+w-26,y+28-gb,30,'#000')}
    txt(HB.n,x+w/2,y+h*0.85,Math.min(22,w/7.5),'#6a1b9a');X.restore();
    btn('hub_'+hk,x,y,w,h,()=>{AUD.SFX.boing();sSpark(x+w/2,y+h/2,14);openScreen('hub_'+hk)})});
  // favorites row
  const n=FAVS.length,sp=Math.min(H0.fr*2+(land?40:16),(W-INL-INR-20)/n);
  FAVS.forEach((f,i)=>{const x=W/2+(i-(n-1)/2)*sp,y=H0.fy,glow=f.k==='surprise'&&giftReady();
    v7btn('fav_'+f.k,x,y,H0.fr,f.c,f.k==='play'?(bx,by,r)=>{X.save();X.translate(bx,by+r*0.55);X.scale(r/52,r/52);drawCat(0,0,{t:T,st:'idle',acc:catAcc()});X.restore()}:(f.k==='surprise'&&!giftReady()?'✨':f.e),()=>{if(f.say)v7say(f.say,2);f.fn()},glow||(f.k==='play'&&Math.sin(T*1.5)>0.9));
    txt(f.n,x,y+H0.fr+12,13,'#6a1b9a')});
  /* version label hidden (kid UI) */const s=tB();muteBtn(UI,W-INR-s-10,TOP+10);voiceBtn(UI,W-INR-s-10,TOP+18+s);
  if(giftReady()&&stT>1.2&&stT<1.26&&!XS._giftSaid){XS._giftSaid=1;v7say('Doodle left you a surprise! Tap the present!',1)}
  if(stT>0.4&&stT<0.45&&AUD.unlocked)v7say('Where do you want to go? Pick a picture!',1)};
IDLE_HINT.title='Pick a big picture! Town, Trips, Play, or My Stuff!';IDLE_HINT.map=IDLE_HINT.title;
for(const hk of HUBK)IDLE_HINT['hub_'+hk]='Tap a picture!';
// the in-play 🐾 menu and Fun Corner keep working; Fun Corner also lists the new activities
FUN.push(['🎵','Music',()=>openScreen('music'),'#e1bee7','Music maker!'],['🍪','Cookies',()=>openScreen('cookies'),'#ffe0b2','Cookie decorating!'],['🌦️','Weather',()=>openScreen('weather'),'#b3e5fc','Weather play!'],['✈️','Trips',()=>openScreen('hub_trips'),'#b2ebf2','Trips!']);
if(window.__X){Object.assign(window.__X,{tripGo,TRIPS,VV:()=>VV,SV:()=>SV,todaysVisitors,visitorPlace,HUBS,MU:()=>MU,CK:()=>CK,WX:()=>WX,CP:()=>CP,SB:()=>SB,FL:()=>FL})}
