// ================= v1.8: Boyish Worlds + Play Modes (Alex always the hero, Doodle the sidekick) =================
// New explorable worlds, bosses, a treasure race, Doodle fetch, creature badges, and Alex gear/vehicles.
// Fun first, never scary, never a fail state. Progress is saved in the existing adba_ save.
if(!SAVE.x||typeof SAVE.x!=='object')SAVE.x={};
if(!SAVE.x.boy||typeof SAVE.x.boy!=='object')SAVE.x.boy={};
(function(){const B=SAVE.x.boy;if(!B.creat||typeof B.creat!=='object')B.creat={};if(!B.mode||typeof B.mode!=='object')B.mode={};if(!B.mode.boss||typeof B.mode.boss!=='object')B.mode.boss={};if(!B.eggs||typeof B.eggs!=='object')B.eggs={};if(typeof B.race!=='number')B.race=0;if(typeof B.fetch!=='number')B.fetch=0})();
const boySay=(s,p)=>sayT(s,p||2);
const WORLD_KS=['dino','volc','space','pirate','castle','robot'];
function boy(){return SAVE.x.boy}
function worldOpen(k){if(k==='dino'||k==='volc')return true;
  const stickers=PLACES.filter(P=>pdata(P.k).sticker).length;
  const stars=PLACES.reduce((n,P)=>n+(pdata(P.k).stars||[]).length,0);
  if(k==='pirate')return stickers>=1||stars>=5;
  if(k==='space')return stickers>=2||stars>=8;
  if(k==='castle')return stickers>=3||stars>=12;
  if(k==='robot')return stickers>=4||stars>=16;
  return true}
function worldCount(){return WORLD_KS.filter(k=>pdata(k).sticker).length}
function creatCount(){return Object.keys(boy().creat).length}

// ---------- world places (stars, help-quest, sticker and chest all work like home places) ----------
const BOYLIKE={stars:[[280,-180],[820,-250],[1400,-120],[1980,-280],[2520,-60]],fish:[[90,-30],[340,-90],[620,-40],[980,-110],[1280,-70],[1600,-130],[1880,-40],[2140,-100],[2380,-50],[2550,-30]]};
PLACES.push(
 {k:'dino',n:'Dino Jungle',th:'park',w:2800,col:'#8bc34a',secs:[{x0:0,x1:2800,out:'dino'}],vac:{hi:'Dino Jungle! Giant friendly dinosaurs and a lost taco!'},
  deco:[{t:'flowers',x:160,n:4},{t:'flowers',x:2000,n:3}],
  furn:[{t:'tree',x:280,c:'#43a047'},{t:'rock',x:700},{t:'tree',x:1180,c:'#2e7d32'},{t:'picnic',x:1600},{t:'rock',x:2100},{t:'tree',x:2680,c:'#66bb6a'}],
  stars:BOYLIKE.stars,fish:BOYLIKE.fish,extras:[{t:'leaves',x:540},{t:'leaves',x:1500},{t:'fly',x:1900},{t:'nap',x:1610,y:-40,w:110}],
  task:{who:'trex',x:520,item:'taco',ix:2300,iy:0,hi:'v7:Roar! I am T-Rex Tim! I dropped my taco in the ferns! Can you find it, Alex?',ty:'v7:My taco! You are a dino hero, Alex!',say:'Roar! Can you find my taco?',thanks:'My taco! Thank you, Alex!'}},
 {k:'volc',n:'Volcano Valley',th:'park',w:2800,col:'#ff7043',secs:[{x0:0,x1:2800,out:'volc'}],vac:{hi:'Volcano Valley! The lava is really hot cheese! Toot-toot!'},
  deco:[],
  furn:[{t:'rock',x:360},{t:'rock',x:980},{t:'picnic',x:1400},{t:'rock',x:1880},{t:'rock',x:2460}],
  stars:BOYLIKE.stars,fish:BOYLIKE.fish,extras:[{t:'cup',x:800,y:0},{t:'cup',x:1700,y:0},{t:'leaves',x:1200}],
  task:{who:'explorer',x:480,item:'cork',ix:2200,iy:0,hi:'v7:Hi Alex! Mount Toot keeps burping cheese lava! Can you find the giant cork?',ty:'v7:The cork! That should plug the burps! Thank you, Alex!',say:'Can you find the giant cork?',thanks:'The cork! Thank you, Alex!'}},
 {k:'space',n:'Space Station',th:'cozy',w:3000,col:'#5c6bc0',secs:[{x0:0,x1:3000,out:'space'}],vac:{hi:'Space Station Zoom! Rockets, lasers and moon cheese!'},
  deco:[],
  furn:[{t:'bench',x:600},{t:'rock',x:1100},{t:'picnic',x:1680},{t:'bench',x:2300},{t:'rock',x:2760}],
  stars:BOYLIKE.stars,fish:BOYLIKE.fish,extras:[{t:'fly',x:800},{t:'fly',x:2000},{t:'nap',x:1690,y:-40,w:110}],
  task:{who:'astro',x:500,item:'cheese',ix:2400,iy:0,hi:'v7:Hi Alex! I am Captain Zoom! The moon cheese floated away! Can you grab it?',ty:'v7:Moon cheese! You did it, Alex! One small step!',say:'Can you grab the moon cheese?',thanks:'Moon cheese! Thank you, Alex!'}},
 {k:'pirate',n:'Pirate Cove',th:'park',w:2800,col:'#26a69a',secs:[{x0:0,x1:2800,out:'pirate'}],vac:{hi:'Pirate Cove! Treasure, a goofy parrot and a golden pizza!'},
  deco:[{t:'flowers',x:200,n:3}],
  furn:[{t:'tree',x:300,c:'#43a047'},{t:'bench',x:800},{t:'rock',x:1300},{t:'picnic',x:1700},{t:'tree',x:2300,c:'#2e7d32'},{t:'rock',x:2660}],
  stars:BOYLIKE.stars,fish:BOYLIKE.fish,extras:[{t:'leaves',x:600},{t:'ducks',x:2100},{t:'nap',x:1710,y:-40,w:110}],
  task:{who:'capn',x:540,item:'pizza',ix:2150,iy:0,hi:'v7:Ahoy Alex! Captain Tootbeard here! I lost my golden Detroit pizza! Help a pirate out!',ty:'v7:My pizza! Square slices, the Detroit way! Thank you, Alex!',say:'Ahoy! Can you find my golden pizza?',thanks:'My pizza! Thank you, Alex!'}},
 {k:'castle',n:'Spooky Castle',th:'cozy',w:2800,col:'#7e57c2',secs:[{x0:0,x1:2800,out:'castle'}],vac:{hi:'Spooky Castle! Friendly ghosts and a missing rubber chicken! Nothing scary!'},
  deco:[{t:'picture',x:400,k:'heart',y:-240}],
  furn:[{t:'bench',x:620},{t:'rock',x:1100},{t:'picnic',x:1600},{t:'bench',x:2140},{t:'rock',x:2580}],
  stars:BOYLIKE.stars,fish:BOYLIKE.fish,extras:[{t:'cup',x:900,y:0},{t:'yarn',x:1800,vx:40},{t:'nap',x:1610,y:-40,w:110}],
  task:{who:'ghost',x:500,item:'chicken',ix:2350,iy:0,hi:'v7:Boo! Just kidding, I am Boo-Boo the ghost! I lost my rubber chicken! It honks!',ty:'v7:My rubber chicken! Honk honk! You are the bravest, Alex!',say:'Boo! Can you find my rubber chicken?',thanks:'My rubber chicken! Thank you, Alex!'}},
 {k:'robot',n:'Robot Factory',th:'home',w:2800,col:'#90a4ae',secs:[{x0:0,x1:2800,out:'robot'}],vac:{hi:'Robot Factory! Beep boop! A loose sprocket is on the loose!'},
  deco:[],
  furn:[{t:'bench',x:500},{t:'rock',x:1000},{t:'picnic',x:1500},{t:'bench',x:2040},{t:'rock',x:2500}],
  stars:BOYLIKE.stars,fish:BOYLIKE.fish,extras:[{t:'cup',x:800,y:0},{t:'yarn',x:1700,vx:-30},{t:'nap',x:1510,y:-40,w:110}],
  task:{who:'bot',x:480,item:'sprocket',ix:2280,iy:0,hi:'v7:Beep boop! I am Bolts! My sprocket rolled away! Please help, Alex!',ty:'v7:Sprocket found! Beep! You are a factory hero, Alex!',say:'Beep! Can you find my sprocket?',thanks:'My sprocket! Thank you, Alex!'}}
);
const BOYI={};WORLD_KS.forEach(k=>BOYI[k]=PLACES.findIndex(p=>p.k===k));
Object.assign(UNLOCK,{dino:'truck',volc:'goggs',space:'astro',pirate:'pirate',castle:'helm',robot:'visor'});
ITEMS.push({k:'truck',n:'Monster Truck',world:1},{k:'goggs',n:'Volcano Goggles',world:1},{k:'astro',n:'Astronaut Helmet',world:1},{k:'rocket',n:'Rocket Pack',world:1},{k:'pirate',n:'Pirate Hat',world:1},{k:'helm',n:'Knight Helmet',world:1},{k:'visor',n:'Robot Visor',world:1},{k:'laser',n:'Sparkle Blaster',world:1},{k:'mech',n:'Mini Mech',world:1},{k:'detroit',n:'Detroit Cap',world:1});
Object.assign(UNLOCK_HINT,{truck:'Finish Dino Jungle!',goggs:'Finish Volcano Valley!',astro:'Finish the Space Station!',rocket:'Beat the space boss!',pirate:'Finish Pirate Cove!',helm:'Finish Spooky Castle!',visor:'Finish the Robot Factory!',laser:'Win a treasure race!',mech:'Beat the factory boss!',detroit:'Find the secret sports treasures!'});
for(const k of ['truck','goggs','astro','rocket','pirate','helm','visor','laser','mech','detroit'])UNLOCK2[k]=()=>false;
// extra unlocks earned from modes (not place stickers)
const _checkDoneB=checkDone;checkDone=function(){_checkDoneB();const d=pl&&pdata(pl.k);if(pl&&pl.k==='space'&&d&&d.sticker&&!SAVE.un.rocket){/* rocket comes from the boss */}};
Object.assign(MGSPOT,{dino:{k:'stomp',x:1100},volc:{k:'corks',x:1100},space:{k:'laser',x:1200},pirate:{k:'cannon',x:1100},castle:{k:'honk',x:1100},robot:{k:'belts',x:1100}});
Object.assign(MGINFO,{stomp:{n:'Dino Stomp',say:'Dino Stomp! Tap the fruit before the dinos gobble it!',bg:'#c5e1a5'},corks:{n:'Cork Pop',say:'Cork Pop! Plug the burps! Tap the steam!',bg:'#ffccbc'},cannon:{n:'Confetti Cannons',say:'Confetti cannons! Tap to blast party cannons!',bg:'#b2dfdb'},honk:{n:'Honk Chase',say:'Honk chase! Tap the rubber chickens!',bg:'#d1c4e9'},belts:{n:'Belt Dash',say:'Belt dash! Tap the bouncing sprockets!',bg:'#cfd8dc'}});
// laser already exists as a mini (Laser Chase). Use spark as the space mini key.
MGSPOT.space={k:'spark',x:1200};
Object.assign(MGINFO,{spark:{n:'Star Blaster',say:'Star Blaster! Tap the glowing stars!',bg:'#c5cae9'}});
Object.assign(QUEST_SPEC,{
  dino:{kind:'crate',x:2400,y:0,crate:2000,hint:'Push the crate onto the glowing stone!'},
  volc:{kind:'order',x:2400,y:0,stones:[900,1200,1500],order:[2,0,1],hint:'Step on the stones in the order they flash!'},
  space:{kind:'key',x:2600,y:0,key:[1500,-20],hint:'A gold key is floating by the rocks!'},
  pirate:{kind:'crate',x:2400,y:0,crate:1950,hint:'Push the crate onto the glowing stone!'},
  castle:{kind:'order',x:2400,y:0,stones:[800,1100,1400],order:[0,2,1],hint:'Step on the stones in the order they flash!'},
  robot:{kind:'count',x:2300,y:0,n:5,hint:'How many gears are on the sign? Tap the right number!'}
});

// ---------- worlds map + modes buttons on the family title ----------
function enterWorld(k){if(!worldOpen(k)){AUD.SFX.boing();boySay('Play a little more, then this world opens!',2);return}boy().fromW=1;save();enterPlace(BOYI[k])}
const _goMapB=goMap;goMap=function(){if(boy().fromW&&pl&&WORLD_KS.indexOf(pl.k)>=0){boy().fromW=0;save();state='worlds';stT=0;overlay=null;resetInput();AUD.setTheme('title');return}_goMapB()};
const _drawTitleB=drawTitle;drawTitle=function(){_drawTitleB();
  // Portrait: two big pills under the title (room to spare). Landscape: skip — they would cover the name, and Worlds/Modes already live in Play & Make.
  const land=W>H*1.15;if(land)return;
  const bw=Math.min(168,Math.max(130,PT(110))),bh=Math.max(48,PT(40)),gap=12,tw=bw*2+gap,xW=W/2-tw/2,xM=xW+bw+gap,yy=TOP+118;
  pill(xW,yy,bw,bh,'🦕 Worlds','#43a047',18);btn('worlds',xW,yy,bw,bh,()=>openScreen('worlds'));
  pill(xM,yy,bw,bh,'⚡ Modes','#ff8f00',18);btn('modes',xM,yy,bw,bh,()=>openScreen('modes'));
  if(!LS.get('boyNew')||T<3){X.globalAlpha=0.7+0.3*Math.sin(T*6);txt('NEW!',xW+bw-18,yy-6,12,'#fff',{st:'#e53935',sw:4});X.globalAlpha=1}
};
if(typeof HUBS==='object'&&HUBS.make&&HUBS.trips){
  const _makeT=HUBS.make.tiles,_tripT=HUBS.trips.tiles;
  HUBS.make.tiles=()=>_makeT().concat([
    {e:'🦕',n:'Worlds',say:"Alex's worlds! Dinos, space, pirates and more!",c:'#c5e1a5',fn:()=>openScreen('worlds')},
    {e:'⚡',n:'Modes',say:'Play modes! Race, fetch and bosses!',c:'#ffe0b2',fn:()=>openScreen('modes')},
    {e:'🏃',n:'Treasure Run',say:'Treasure run! Grab the stars!',c:'#ffcc80',fn:()=>openScreen('race')},
    {e:'🎾',n:'Doodle Fetch',say:'Doodle fetch! Throw the ball!',c:'#a5d6a7',fn:()=>openScreen('fetch')},
    {e:'🥊',n:'Bosses',say:'Silly bosses! You cannot lose!',c:'#ef9a9a',fn:()=>openScreen('bosses')},
    {e:'🦋',n:'Badges',say:'Creature badges!',c:'#90caf9',fn:()=>openScreen('codex')}
  ]);
  HUBS.trips.tiles=()=>_tripT().concat([
    {e:'🦕',n:'Dino Jungle',say:'Dino Jungle!',c:'#c5e1a5',fn:()=>enterWorld('dino'),done:()=>false,pi:null},
    {e:'🚀',n:'Space Station',say:'Space Station!',c:'#c5cae9',fn:()=>enterWorld('space')}
  ]);
  // mark trip tiles' done correctly (the extra ones have no sticker flag to read here; enterWorld handles locks)
}
if(typeof FAVS!=='undefined'&&FAVS&&!FAVS.some(f=>f.k==='worlds'))FAVS.splice(1,0,{k:'worlds',e:'🦕',n:'Worlds',c:'#aed581',say:"Alex's worlds! Dinos, rockets and pirates!",fn:()=>openScreen('worlds')});


SCR.worlds={open(){LS.set('boyNew','1');boySay('Worlds! Pick a place to explore with Doodle!',2)}};
SCR.modes={open(){boySay('Play modes! Race, fetch, bosses and badges!',2)}};

const WORLD_META={
  dino:{ic:'🦕',c:'#8bc34a',sub:'Tacos and thunder lizards',boss:'T-Rex Tim'},
  volc:{ic:'🌋',c:'#ff7043',sub:'Hot cheese and burps',boss:'Mount Toot'},
  space:{ic:'🚀',c:'#5c6bc0',sub:'Rockets and moon cheese',boss:'King Blorp'},
  pirate:{ic:'🏴‍☠️',c:'#26a69a',sub:'Treasure and pizza',boss:'Captain Tootbeard'},
  castle:{ic:'🏰',c:'#7e57c2',sub:'Friendly ghosts',boss:'Sir Farts-a-Lot'},
  robot:{ic:'🤖',c:'#90a4ae',sub:'Beep boop factory',boss:'Mega Toaster 9000'}
};
function boyHead(title,col){const bb=Math.max(64,PT(46));txt(title,W/2,TOP+bb+(W>H*1.15?28:44),W>H*1.15?32:26,col||'#1565c0');return bb}

XS.worlds={draw(){UI=[];softBg('#e8f5e9','#fff8e1');const land=W>H*1.15,bb=boyHead('Alex\'s Worlds','#2e7d32');
  txt('Stars, badges and goofy bosses live here!',W/2,TOP+bb+(land?58:72),16,'#558b2f');
  const keys=WORLD_KS,cols=land?3:2,rows=Math.ceil(keys.length/cols),top=TOP+bb+(land?80:100),bot=H-Math.max(BOT,8)-24,gap=12;
  const tw=Math.min((W-INL-INR-24-gap*(cols-1))/cols,(bot-top-gap*(rows-1))/rows,land?210:200);
  keys.forEach((k,i)=>{const c=i%cols,r=(i/cols)|0,x=W/2-(cols*tw+(cols-1)*gap)/2+c*(tw+gap),y=top+r*(tw+gap),open=worldOpen(k),d=pdata(k),M=WORLD_META[k];
    X.fillStyle='rgba(0,0,0,0.08)';rrect(x+3,y+5,tw,tw,22);X.fill();X.fillStyle=open?M.c:'#bdbdbd';rrect(x,y,tw,tw,22);X.fill();
    txt(M.ic,x+tw/2,y+tw*0.36,tw*0.32,'#000');txt(open?PLACES[BOYI[k]].n:'???',x+tw/2,y+tw*0.68,Math.min(18,tw/9),'#fff',{st:'#000',sw:3});
    if(open)txt('★ '+(d.stars||[]).length+'/5'+(d.task?'  ♥':'')+(d.sticker?'  ✓':''),x+tw/2,y+tw*0.84,13,'#fff');
    else txt('🔒 Keep playing!',x+tw/2,y+tw*0.84,12,'#fff');
    btn('w_'+k,x,y,tw,tw,()=>enterWorld(k))});
  bigBack()}};

const MODE_TILES=[
  ['🏃','Treasure Run',()=>openScreen('race'),'#ffcc80','Race the clock and grab the stars!'],
  ['🎾','Doodle Fetch',()=>openScreen('fetch'),'#a5d6a7','Throw it! Doodle will bring it back!'],
  ['🥊','Boss Battles',()=>openScreen('bosses'),'#ef9a9a','Silly bosses! You cannot lose!'],
  ['🦋','Creature Badges',()=>openScreen('codex'),'#90caf9','Collect the goofy creatures!']
];
XS.modes={draw(){UI=[];softBg('#fff3e0','#e3f2fd');const land=W>H*1.15,bb=boyHead('Play Modes','#e65100');
  const B=boy();txt('Best race: '+(B.race||'—')+'   Fetch: '+(B.fetch||0)+'   Badges: '+creatCount()+'/6',W/2,TOP+bb+(land?58:74),16,'#ef6c00');
  const cols=land?4:2,rows=land?1:2,top=TOP+bb+(land?90:110),bot=H-Math.max(BOT,8)-24,gap=14;
  const tw=Math.min((W-INL-INR-24-gap*(cols-1))/cols,(bot-top-gap*(rows-1))/rows,200);
  MODE_TILES.forEach(([ic,lab,fn,c],i)=>{const cc=i%cols,r=(i/cols)|0,x=W/2-(cols*tw+(cols-1)*gap)/2+cc*(tw+gap),y=top+r*(tw+gap);
    X.fillStyle=c;rrect(x,y,tw,tw,24);X.fill();txt(ic,x+tw/2,y+tw*0.4,tw*0.32,'#000');txt(lab,x+tw/2,y+tw*0.78,Math.min(20,tw/8),'#4e342e');btn('md'+i,x,y,tw,tw,fn)});
  bigBack()}};

// ---------- custom world backdrops ----------
const _wallBgB=wallBg;wallBg=function(sec,top,bot){const o=sec.out;if(WORLD_KS.indexOf(o)<0)return _wallBgB(sec,top,bot);
  const x0=sec.x0,x1=sec.x1,w=x1-x0,gy=0;
  if(o==='dino'){const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#c5e1a5');g.addColorStop(1,'#81d4fa');X.fillStyle=g;X.fillRect(x0,top,w,-top);
    for(let x=x0+40;x<x1;x+=220){X.fillStyle='#2e7d32';X.beginPath();X.ellipse(x,-180-((x/80)%40),80,140,0,0,TAU);X.fill();X.fillStyle='#1b5e20';X.fillRect(x-8,-40,16,40)}
    X.fillStyle='#7cb342';X.fillRect(x0,0,w,bot);X.fillStyle='#558b2f';X.fillRect(x0,0,w,8);
    for(let x=x0+30;x<x1;x+=70){X.fillStyle='#33691e';X.fillRect(x,8,6,22);ell(x+3,6,10,8,'#8bc34a')}
    // hidden Lions helmet easter egg
    if(x0<900&&x1>900){X.save();X.translate(900,-40);X.fillStyle='#0069b1';rrect(-12,-8,24,14,4);X.fill();X.fillStyle='#c4ced4';X.fillRect(-14,-2,8,6);txt('D',0,-1,8,'#fff');X.restore()}
  }else if(o==='volc'){const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#ffcc80');g.addColorStop(1,'#ef9a9a');X.fillStyle=g;X.fillRect(x0,top,w,-top);
    for(let i=0;i<6;i++){const cx=x0+200+i*420,h=140+((i*50)%80);X.fillStyle='#5d4037';poly([cx-180,0,cx,top+h,cx+180,0],'#5d4037');X.fillStyle='#ff7043';poly([cx-40,top+h+20,cx,top+h-20,cx+40,top+h+20],'#ff7043')}
    X.fillStyle='#6d4c41';X.fillRect(x0,0,w,bot);X.fillStyle='#ffab40';for(let x=x0+20;x<x1;x+=50)ell(x,8+Math.sin(x)*3,16,7,'#ffab40');
  }else if(o==='space'){X.fillStyle='#1a237e';X.fillRect(x0,top,w,-top+bot);for(let i=0;i<40;i++){const sx=x0+((i*97)%w),sy=top+20+((i*53)%(-top-20));circ(sx,sy,1.5+(i%3),'#fff')}
    circ(x0+400,top+80,34,'#fff59d');circ(x0+1100,top+140,22,'#90caf9');circ(x0+1900,top+70,18,'#ef9a9a');
    X.fillStyle='#455a64';X.fillRect(x0,0,w,bot);X.fillStyle='#90a4ae';for(let x=x0;x<x1;x+=80)X.fillRect(x,0,40,6);
    if(x0<1600&&x1>1600){txt('GO WINGS!',1600,-120,22,'#e31837',{st:'#fff',sw:4})}
  }else if(o==='pirate'){const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#4dd0e1');g.addColorStop(1,'#81d4fa');X.fillStyle=g;X.fillRect(x0,top,w,-top);
    X.fillStyle='#ffe082';X.fillRect(x0,-20,w,20);X.fillStyle='#26a69a';X.fillRect(x0,0,w,bot);X.fillStyle='#00838f';X.fillRect(x0,0,w,8);
    for(let x=x0+80;x<x1;x+=260){X.fillStyle='#6d4c41';X.fillRect(x-6,-160,12,160);for(let i=0;i<5;i++){X.save();X.translate(x,-160);X.rotate(-1.2+i*0.5);ell(36,0,34,9,i%2?'#43a047':'#66bb6a');X.restore()}}
    if(x0<700&&x1>700){X.fillStyle='#bf360c';rrect(640,-90,90,50,6);X.fill();txt('PIZZA',685,-65,12,'#ffe082')}
  }else if(o==='castle'){const g=X.createLinearGradient(0,top,0,0);g.addColorStop(0,'#7e57c2');g.addColorStop(1,'#b39ddb');X.fillStyle=g;X.fillRect(x0,top,w,-top);
    X.fillStyle='#5e35b1';for(let x=x0;x<x1;x+=70){X.fillRect(x,top,50,-top);X.fillStyle='#7e57c2';X.fillRect(x+8,top+40,16,24);X.fillStyle='#5e35b1'}
    for(let x=x0+40;x<x1;x+=320){X.fillStyle='#4527a0';X.fillRect(x,-200,70,200);poly([x-8,-200,x+35,-250,x+78,-200],'#311b92');circ(x+35,-170,10,'#fff59d')}
    X.fillStyle='#7e57c2';X.fillRect(x0,0,w,bot);X.fillStyle='#d1c4e9';X.fillRect(x0,0,w,8);
    if(x0<1400&&x1>1400){circ(1400,-30,12,'#e65100');circ(1400,-30,8,'#1a237e');txt('P',1400,-28,8,'#fff')} // Pistons ball
  }else if(o==='robot'){X.fillStyle='#37474f';X.fillRect(x0,top,w,-top);X.fillStyle='#546e7a';for(let x=x0;x<x1;x+=120){rrect(x+10,top+40,80,80,8);X.fill();circ(x+50,top+80,18,'#90caf9')}
    X.fillStyle='#78909c';X.fillRect(x0,0,w,bot);X.fillStyle='#ffb300';for(let x=x0;x<x1;x+=60)X.fillRect(x, -6, 30, 6);
    if(x0<2000&&x1>2000){circ(2000,-24,10,'#e31837');circ(2000,-24,6,'#fff');txt('W',2000,-22,8,'#e31837')} // Wings puck
  }
};

// ---------- NPCs + quest items ----------
function boyNPC(k,t,wave){
  if(k==='trex'){X.save();ell(0,-36,48,22,'#8bc34a');[-30,-12,10,28].forEach(l=>X.fillRect(l-5,-24,8,24));ell(40,-70,22,16,'#7cb342');circ(48,-76,3,'#222');X.beginPath();X.arc(52,-66,10,0.2,Math.PI-0.4);sl(2,'#33691e');poly([30,-86,24,-110,36,-90],'#8bc34a');poly([44,-88,50,-112,56,-88],'#8bc34a');ell(54,-70,3,2,'rgba(255,130,160,0.5)');txt('🌮',20,-50,14,'#000');X.restore();return}
  if(k==='explorer'){v7person({tall:148,top:'#ff7043',leg:'#5d4037',shoe:'#3e2723',sk:'#f2c9a8',h:'#6d4c41',cap:'#ff8a65'},t,wave);return}
  if(k==='astro'){X.save();circ(0,-86,20,'#eceff1');circ(0,-86,14,'#81d4fa');circ(-4,-88,3,'#222');circ(6,-88,3,'#222');X.fillStyle='#eceff1';rrect(-18,-70,36,50,8);X.fill();X.fillStyle='#90caf9';X.fillRect(-8,-60,16,10);X.fillStyle='#b0bec5';X.fillRect(-10,-22,8,22);X.fillRect(4,-22,8,22);X.restore();return}
  if(k==='capn'){v7person({tall:150,top:'#00695c',leg:'#4e342e',shoe:'#3e2723',sk:'#f2c9a8',h:'#212121',cap:'#b71c1c',mus:1},t,wave);return}
  if(k==='ghost'){X.save();ell(0,-50,24,36,'#f3e5f5');circ(-8,-62,4,'#222');circ(8,-62,4,'#222');X.beginPath();X.arc(0,-48,10,0.2,Math.PI-0.2);sl(1.6,'#7e57c2');for(let i=0;i<4;i++)ell(-18+i*12,-16,8,10,'#f3e5f5');txt('👻',0,-100,16,'#000');X.restore();return}
  if(k==='bot'){X.save();X.fillStyle='#90a4ae';rrect(-18,-70,36,50,6);X.fill();X.fillStyle='#80deea';X.fillRect(-10,-60,8,8);X.fillRect(2,-60,8,8);X.fillStyle='#ffb300';X.fillRect(-8,-44,16,8);X.fillStyle='#78909c';X.fillRect(-22,-66,8,16);X.fillRect(14,-66,8,16);X.fillRect(-10,-20,6,20);X.fillRect(4,-20,6,20);txt('BEEP',0,-84,9,'#ffb300');X.restore();return}
}
const _drawNPCB=drawNPC;drawNPC=function(k,x,o){if(['trex','explorer','astro','capn','ghost','bot'].indexOf(k)<0)return _drawNPCB(k,x,o);
  const t=o.t||0;X.save();X.translate(x,0);ell(0,2,30,5,'rgba(80,40,90,0.15)');boyNPC(k,t,o.wave);X.restore()};
const _drawItemB=drawItem;drawItem=function(k,x,y,t){
  if(k==='taco'){X.save();X.translate(x,y);ell(0,-6,16,8,'#ffe082');X.fillStyle='#8d6e63';X.beginPath();X.arc(0,-6,16,Math.PI,TAU);X.fill();X.fillStyle='#66bb6a';X.fillRect(-10,-10,20,4);X.fillStyle='#e53935';X.fillRect(-8,-14,16,4);X.restore();return}
  if(k==='cork'){X.save();X.translate(x,y);X.fillStyle='#d7a86e';rrect(-10,-22,20,28,6);X.fill();X.fillStyle='#8d6e63';X.fillRect(-12,-6,24,8);X.restore();return}
  if(k==='cheese'){X.save();X.translate(x,y);X.fillStyle='#ffd54f';rrect(-14,-12,28,20,5);X.fill();circ(-4,-6,3,'#ffb300');circ(6,-2,2.4,'#ffb300');X.restore();return}
  if(k==='pizza'){X.save();X.translate(x,y);X.fillStyle='#ffe082';rrect(-16,-8,32,16,3);X.fill();X.fillStyle='#e53935';rrect(-14,-6,28,8,2);X.fill();circ(-6,-2,2.2,'#fff59d');circ(4,-1,2.2,'#fff59d');X.restore();return}
  if(k==='chicken'){X.save();X.translate(x,y);ell(0,-8,12,8,'#ffcc80');circ(10,-16,7,'#ffcc80');poly([14,-16,22,-14,14,-12],'#ff8a65');circ(12,-18,1.4,'#333');X.restore();return}
  if(k==='sprocket'){X.save();X.translate(x,y);circ(0,-8,12,'#9e9e9e');circ(0,-8,5,'#eceff1');for(let i=0;i<8;i++){const a=i*TAU/8;X.fillStyle='#9e9e9e';X.fillRect(Math.cos(a)*12-3,-8+Math.sin(a)*12-3,6,6)}X.restore();return}
  return _drawItemB(k,x,y,t)};

// ---------- place icons + closet icons for new gear ----------
const _placeIconB=placeIcon;placeIcon=function(k,x,y,s){if(WORLD_KS.indexOf(k)<0)return _placeIconB(k,x,y,s);
  X.save();X.translate(x,y);X.scale(s,s);
  if(k==='dino'){ell(0,4,18,8,'#8bc34a');circ(12,-8,9,'#7cb342');poly([8,-16,6,-26,14,-16],'#8bc34a');circ(15,-10,1.6,'#222')}
  else if(k==='volc'){poly([-20,16,0,-22,20,16],'#5d4037');poly([-8,-4,0,-20,8,-4],'#ff7043');circ(0,-8,3,'#fff59d')}
  else if(k==='space'){circ(0,-4,16,'#5c6bc0');circ(6,-10,4,'#fff59d');X.strokeStyle='#90caf9';X.lineWidth=2;X.beginPath();X.ellipse(0,-4,20,7,0.3,0,TAU);X.stroke()}
  else if(k==='pirate'){X.fillStyle='#6d4c41';X.fillRect(-14,4,28,10);poly([-16,4,0,-16,16,4],'#b71c1c');circ(8,-2,3,'#fff')}
  else if(k==='castle'){X.fillStyle='#5e35b1';X.fillRect(-16,0,10,18);X.fillRect(-4,0,8,18);X.fillRect(8,0,10,18);poly([-18,0,-11,-12,-4,0],'#311b92');poly([4,0,12,-14,20,0],'#311b92')}
  else if(k==='robot'){X.fillStyle='#90a4ae';rrect(-14,-12,28,24,4);X.fill();X.fillStyle='#80deea';X.fillRect(-8,-6,6,6);X.fillRect(2,-6,6,6)}
  X.restore()};
const _itemIconB=itemIcon;itemIcon=function(k){
  if(k==='truck'){X.fillStyle='#e53935';rrect(-20,-14,40,16,4);X.fill();X.fillStyle='#1565c0';rrect(-8,-22,20,10,3);X.fill();circ(-12,4,6,'#212121');circ(12,4,6,'#212121');return}
  if(k==='goggs'){X.fillStyle='#ff7043';rrect(-16,-8,14,10,3);X.fill();rrect(2,-8,14,10,3);X.fill();X.fillRect(-4,-4,8,3);return}
  if(k==='astro'){circ(0,-6,16,'#eceff1');circ(0,-6,10,'#81d4fa');return}
  if(k==='rocket'){poly([0,-24,10,8,-10,8],'#ef5350');ell(0,-8,6,10,'#90caf9');poly([-6,8,0,18,6,8],'#ffd54f');return}
  if(k==='pirate'){X.fillStyle='#212121';X.beginPath();X.arc(0,0,14,Math.PI,0);X.fill();X.fillRect(-16,-2,20,4);circ(8,2,3,'#fff');return}
  if(k==='helm'){X.fillStyle='#90a4ae';X.beginPath();X.arc(0,0,15,Math.PI,0);X.fill();X.fillStyle='#ffe082';X.fillRect(-2,-16,4,18);return}
  if(k==='visor'){X.fillStyle='#37474f';rrect(-16,-8,32,14,4);X.fill();X.fillStyle='#00e5ff';rrect(-12,-5,24,8,3);X.fill();return}
  if(k==='laser'){X.fillStyle='#7e57c2';rrect(-16,-6,28,10,3);X.fill();X.fillStyle='#00e5ff';X.fillRect(10,-3,12,4);return}
  if(k==='mech'){X.fillStyle='#90a4ae';rrect(-14,-16,28,22,4);X.fill();X.fillRect(-18,-8,8,10);X.fillRect(10,-8,8,10);X.fillRect(-8,6,6,10);X.fillRect(2,6,6,10);return}
  if(k==='detroit'){X.fillStyle='#0069b1';X.beginPath();X.arc(0,0,14,Math.PI,0);X.fill();X.fillRect(-16,-2,32,5);txt('D',0,-6,12,'#fff');return}
  return _itemIconB(k)};

// ---------- Alex gear / vehicles (drawn on top of the established cartoon look) ----------
const _heroAccB=heroAcc;heroAcc=function(){const a=_heroAccB();return a};
const _drawAlexB=drawAlex;drawAlex=function(x,y,o){o=o||{};const A=o.acc||heroAcc();
  let lift=0;
  if(A.truck){lift=18;X.save();X.translate(x,y);X.scale((o.s||1)*(o.face||1),o.s||1);X.fillStyle='#e53935';rrect(-28,-20,56,20,5);X.fill();X.fillStyle='#1565c0';rrect(-4,-32,26,14,3);X.fill();circ(-16,2,8,'#212121');circ(16,2,8,'#212121');circ(-16,2,3,'#bdbdbd');circ(16,2,3,'#bdbdbd');txt('GO BLUE',0,-10,6,'#fff');X.restore()}
  if(A.mech){lift=16;X.save();X.translate(x,y);X.scale((o.s||1)*(o.face||1),o.s||1);X.fillStyle='#90a4ae';rrect(-22,-18,44,18,4);X.fill();X.fillRect(-28,-12,8,12);X.fillRect(20,-12,8,12);circ(-12,4,7,'#546e7a');circ(12,4,7,'#546e7a');X.restore()}
  if(A.rocket){X.save();X.translate(x-18*(o.face||1),y-30);poly([0,-10,8,16,-8,16],'#ef5350');ell(0,0,5,8,'#90caf9');const f=4+Math.sin((o.t||0)*16)*3;poly([-5,16,0,28+f,5,16],'#ffd54f');X.restore()}
  _drawAlexB(x,y-lift,o);
  // hats that drawAlex itself does not know about
  const hy=y-lift-58,hx=x,f=o.face||1;
  if(A.astro&&!A.dino&&!A.explorer){circ(hx,hy,16,'#eceff1');X.globalAlpha=0.5;circ(hx+f*2,hy,11,'#81d4fa');X.globalAlpha=1}
  if(A.pirate&&!A.dino&&!A.explorer&&!A.astro){X.fillStyle='#212121';X.beginPath();X.arc(hx,hy-2,15,Math.PI,0);X.fill();X.fillRect(hx-16,hy-4,22,4);circ(hx+f*8,hy,3,'#fff')}
  if(A.helm&&!A.dino&&!A.explorer&&!A.astro&&!A.pirate){X.fillStyle='#90a4ae';X.beginPath();X.arc(hx,hy-2,15,Math.PI,0);X.fill();X.fillStyle='#ffe082';X.fillRect(hx-2,hy-20,4,16)}
  if(A.visor&&!A.dino&&!A.astro){X.fillStyle='#37474f';rrect(hx-14,hy-6,28,10,3);X.fill();X.fillStyle='#00e5ff';rrect(hx-11,hy-4,22,6,2);X.fill()}
  if(A.goggs&&!A.visor&&!A.astro){X.fillStyle='#ff7043';rrect(hx-14,hy-5,12,8,3);X.fill();rrect(hx+2,hy-5,12,8,3);X.fill()}
  if(A.detroit&&!A.astro&&!A.dino&&!A.pirate&&!A.helm){X.fillStyle='#0069b1';X.beginPath();X.arc(hx,hy-4,14,Math.PI,0);X.fill();X.fillRect(hx-15,hy-5,30,4);txt('D',hx,hy-8,8,'#fff')}
  if(A.laser){X.save();X.translate(hx+f*18,y-lift-28);X.rotate(f>0?0:Math.PI);X.fillStyle='#7e57c2';rrect(0,-4,20,8,2);X.fill();X.fillStyle='#00e5ff';X.fillRect(18,-2,10,4);X.restore()}
};

// slightly faster when riding a truck / mech / rocket, in the play update
const _updateB=update;update=function(dt){_updateB(dt);if(state!=='play'||!cat||overlay)return;const A=heroAcc();
  if(A.truck||A.mech){if(Math.abs(cat.vx)>40)cat.vx=clamp(cat.vx,-380,380)}
  if(A.rocket&&!cat.ground&&jumpHeld){cat.vy=Math.max(cat.vy,-240);if(R()<0.4)sparkles(cat.x,cat.y+4,1)}
  updCreat(dt);updEggs();
};

// ---------- creature badges (one goofy friend per world) ----------
const CREATS=[
  {k:'tri',n:'Tri the Triceratops',w:'dino',x:1750,ic:'🦕',say:'A baby triceratops! He likes tacos too!'},
  {k:'pug',n:'Chili the Lava Pug',w:'volc',x:2000,ic:'🐶',say:'A lava pug! His toots are spicy!'},
  {k:'blorp',n:'Blorp from Space',w:'space',x:1850,ic:'👽',say:'Blorp blorp! A wiggly space pal!'},
  {k:'crab',n:'Captain Crab',w:'pirate',x:1900,ic:'🦀',say:'A pirate crab! He pinch-high-fives!'},
  {k:'boo',n:'Boo-Boo Junior',w:'castle',x:1900,ic:'👻',say:'A shy ghost! He honks, not boos!'},
  {k:'beep',n:'Beep the Bot',w:'robot',x:1900,ic:'🤖',say:'A little beep-bot! He already tooted.'}
];
let CRE=null;
function creatEnter(){const c=CREATS.find(q=>q.w===(pl&&pl.k));CRE=c&&!boy().creat[c.k]?{...c,near:0,hop:0}:null}
const _enterPlaceB=enterPlace;enterPlace=function(i){_enterPlaceB(i);creatEnter()};
function updCreat(dt){if(!CRE||!cat)return;CRE.hop+=dt;CRE.near=Math.hypot(cat.x-CRE.x,cat.y)<70;if(CRE.near&&(pawQ||0)){}}
const _pawB=paw;paw=function(){if(CRE&&CRE.near){boy().creat[CRE.k]=1;save();AUD.SFX.sticker();sConf(30);hearts(CRE.x,-80,8);boySay(CRE.say,3);float('Badge!',CRE.x,-90,'#fff59d');CRE=null;if(creatCount()>=4&&!SAVE.un.detroit){/* sports cap is from easter eggs */}return}return _pawB()};
const _drawWorldB=drawWorld;drawWorld=function(){_drawWorldB();if(!CRE)return;const gy=GY();X.save();X.translate(-camX,gy);
  const y=-10-Math.abs(Math.sin(CRE.hop*4))*8;txt(CRE.ic,CRE.x,y-20,32,'#000');if(CRE.near){circ(CRE.x,y-60,16,'#fff');txt('🐾',CRE.x,y-58,16,'#000')}X.restore()};

function updEggs(){if(!pl||!cat)return;const E=boy().eggs,k=pl.k;
  const spots={dino:[900,'lions'],space:[1600,'wings'],pirate:[700,'pizza'],castle:[1400,'pistons'],robot:[2000,'puck']};
  const sp=spots[k];if(!sp||E[sp[1]])return;if(Math.abs(cat.x-sp[0])<40&&cat.y>-40){E[sp[1]]=1;save();AUD.SFX.chime();float('Secret!',cat.x,cat.y-80,'#fff59d');boySay('A secret Detroit treasure!',2);
    if(Object.keys(E).length>=4&&!SAVE.un.detroit){SAVE.un.detroit=1;SAVE.wear.detroit=1;save();setTimeout(()=>boySay('You unlocked the Detroit cap!',3),800)}}}

XS.codex={draw(){UI=[];softBg('#e3f2fd','#fce4ec');boyHead('Creature Badges','#1565c0');
  const land=W>H*1.15,cols=land?3:2,tw=Math.min(180,(W-INL-INR-40)/cols),gap=12,top=TOP+110;
  CREATS.forEach((c,i)=>{const col=i%cols,r=(i/cols)|0,x=W/2-(Math.min(cols,CREATS.length)*tw+(Math.min(cols,CREATS.length)-1)*gap)/2+col*(tw+gap),y=top+r*(tw*0.85+gap),got=!!boy().creat[c.k];
    X.fillStyle=got?'#fff':'rgba(255,255,255,0.5)';rrect(x,y,tw,tw*0.8,18);X.fill();txt(got?c.ic:'❓',x+tw/2,y+tw*0.3,36,'#000');txt(got?c.n:'???',x+tw/2,y+tw*0.62,13,got?'#1565c0':'#90a4ae')});
  txt(creatCount()+'/6 badges',W/2,H-Math.max(BOT,8)-80,18,'#6a1b9a');bigBack()}};

// ---------- Treasure Run (timed star grab, can't lose) ----------
let RC=null;
SCR.race={open(){RC={t:45,score:0,stars:[],over:0,fin:0};for(let i=0;i<8;i++)RC.stars.push({x:rr(INL+50,W-INR-50),y:rr(TOP+120,H*0.62),got:0,ph:R()*6});boySay('Treasure Run! Grab the stars before time is up!',3);AUD.setTheme('park')},close(){RC=null;AUD.setTheme('title')},
  down(p){if(!RC||RC.over)return;for(const s of RC.stars)if(!s.got&&Math.hypot(p.x-s.x,p.y-s.y)<44){s.got=1;RC.score++;AUD.SFX.chime();sSpark(s.x,s.y,12);if(RC.score>=8)raceEnd()}}};
function raceEnd(){if(!RC||RC.over)return;RC.over=1;RC.fin=0;const left=Math.max(0,RC.t|0),best=Math.max(boy().race||0,RC.score*10+left);boy().race=best;if(RC.score>=6&&!SAVE.un.laser){SAVE.un.laser=1;SAVE.wear.laser=1}save();AUD.SFX.sticker();sConf(40);boySay(RC.score>=8?'You got them all, Alex!':'Great run, Alex!',3)}
XS.race={upd(dt){if(!RC||RC.over){if(RC)RC.fin+=dt;return}RC.t-=dt;if(RC.t<=0)raceEnd()},
  draw(){UI=[];if(!RC){bigBack();return}const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#ffecb3');g.addColorStop(1,'#ffe0b2');X.fillStyle=g;X.fillRect(0,0,W,H);
    for(const s of RC.stars)if(!s.got){const bob=Math.sin(T*4+s.ph)*8;drawItem('star',s.x,s.y+bob,T)}
    X.save();X.translate(W*0.18,H*0.78);drawAlex(0,0,{t:T,face:1,walk:1,st:'walk',acc:heroAcc()});drawCat(70,0,{t:T,st:'walk',acc:catAcc(),s:0.9});X.restore();
    const G=H*0.78;X.fillStyle='#ffe082';X.fillRect(0,G,W,H-G);
    if(!RC.over)txt('Tap the stars!',W/2,TOP+86,18,'#e65100');
    const ph=Math.max(48,PT(40));pill(W-INR-292,TOP+12,130,ph,'⏱ '+Math.max(0,RC.t|0),'#ff8f00',22);
    pill(W-INR-150,TOP+12,130,ph,'★ '+RC.score+'/8','#ffd54f',22);
    if(RC.over){const s=back(RC.fin*2),w=Math.min(W-40,400),h=220;X.save();X.translate(W/2,H*0.42);X.scale(s,s);X.fillStyle='#fff';rrect(-w/2,-h/2,w,h,24);X.fill();txt('Treasure Run!',0,-50,30,'#e65100');txt(RC.score+'/8 stars   Best '+boy().race,0,0,20,'#6a1b9a');X.restore();
      const bh=Math.max(56,PT(46));pill(W/2-110,H*0.62,220,bh,'↻ Again','#ff8f00',22);btn('rca',W/2-110,H*0.62,220,bh,()=>openScreen('race'))}
    bigBack()}};

// ---------- Doodle Fetch ----------
let FT=null;
SCR.fetch={open(){FT={ball:{x:W*0.5,y:H*0.4,vx:0,vy:0,air:0},doodle:{x:W*0.3,y:0},score:0,combo:0,cd:0,msg:0};boySay('Doodle Fetch! Tap to throw the ball!',3);AUD.setTheme('home')},close(){FT=null;AUD.setTheme('title')},
  down(p){if(!FT||FT.ball.air)return;const b=FT.ball;b.air=1;b.vx=(p.x-b.x)*1.6;b.vy=(p.y-b.y)*1.6-80;AUD.SFX.hop();FT.cd=0}};
XS.fetch={upd(dt){if(!FT)return;const b=FT.ball,d=FT.doodle,G=H*0.78;FT.cd+=dt;
  if(b.air){b.vy+=700*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.y>=G){b.y=G;b.vy=0;b.vx*=0.4;if(Math.abs(b.vx)<20){b.air=0;b.vx=0}}}
  const tx=b.air||Math.abs(b.x-d.x)>20?b.x:d.x,spd=b.air?320:220;d.x+=(tx-d.x)*Math.min(1,dt*spd/100);d.face=tx>d.x?1:-1;d.walk=Math.abs(tx-d.x)>8;
  if(!b.air&&Math.abs(d.x-b.x)<30&&FT.cd>0.35){FT.score++;FT.combo++;boy().fetch=Math.max(boy().fetch||0,FT.score);save();b.x=W*0.5;b.y=H*0.42;AUD.SFX.treat();sHearts(d.x,G-80,6);boySay(pick(['Good boy, Doodle!','He got it!','Fetch!','What a catch!']),1);FT.cd=0}
},
  draw(){UI=[];if(!FT){bigBack();return}softBg('#c8e6c9','#fff8e1');const G=H*0.78;X.fillStyle='#81c784';X.fillRect(0,G,W,H-G);
    const b=FT.ball,d=FT.doodle;X.save();X.translate(0,G);drawAlex(W*0.18,0,{t:T,face:1,st:FT.ball.air?'cheer':'idle',acc:heroAcc()});drawCat(d.x,0,{t:T,face:d.face||1,st:d.walk?'walk':'idle',acc:catAcc(),s:1});X.restore();
    circ(b.x,b.y,16,'#ff8a65');circ(b.x-4,b.y-4,4,'#fff');
    txt('Fetch!  '+FT.score+'   Best '+ (boy().fetch||0),W/2,TOP+80,24,'#2e7d32');
    if(!b.air)txt('Tap anywhere to throw!',W/2,TOP+112,16,'#558b2f');
    btn('fstg',0,0,W,H,()=>{}); // stage so uiTap sparkles; real throw is SCR.fetch.down
    bigBack()}};
// fetch stage button would steal the throw — don't register a full-screen btn; down already handles it
XS.fetch.draw=function(){UI=[];if(!FT){bigBack();return}softBg('#c8e6c9','#fff8e1');const G=H*0.78;X.fillStyle='#81c784';X.fillRect(0,G,W,H-G);
  const b=FT.ball,d=FT.doodle;X.save();X.translate(0,G);drawAlex(W*0.18,0,{t:T,face:1,st:FT.ball.air?'cheer':'idle',acc:heroAcc()});drawCat(d.x,0,{t:T,face:d.face||1,st:d.walk?'walk':'idle',acc:catAcc(),s:1});X.restore();
  circ(b.x,b.y,16,'#ff8a65');circ(b.x-4,b.y-4,4,'#fff');
  txt('Fetch!  '+FT.score+'   Best '+(boy().fetch||0),W/2,TOP+80,24,'#2e7d32');
  if(!b.air)txt('Tap anywhere to throw!',W/2,TOP+112,16,'#558b2f');
  bigBack()};

// ---------- Boss battles (goofy, can't lose) ----------
const BOSSES=[
  {k:'dino',n:'T-Rex Tim',ic:'🦕',line:'Roar! Feed me tacos!',hit:'Yum! Another taco!',win:'Tim is full! You win, Alex!',need:5,item:'🌮'},
  {k:'volc',n:'Mount Toot',ic:'🌋',line:'TOOT! Plug my burps!',hit:'Pffft! Corked!',win:'The mountain is quiet! Nice work, Alex!',need:5,item:'cork'},
  {k:'space',n:'King Blorp',ic:'👽',line:'Blorp! Tickle my moon belly!',hit:'Hee hee blorp!',win:'Blorp is giggling too hard to fight! You win!',need:5,item:'✨'},
  {k:'pirate',n:'Captain Tootbeard',ic:'🏴‍☠️',line:'Fire the confetti cannons, ye landlubber!',hit:'Boom! Party!',win:'The captain throws a pizza party! You win, Alex!',need:5,item:'🎉'},
  {k:'castle',n:'Sir Farts-a-Lot',ic:'🛡️',line:'A pillow fight, good sir!',hit:'Pffft! Honk!',win:'The knight yields! Also he tooted. You win!',need:5,item:'pillow'},
  {k:'robot',n:'Mega Toaster 9000',ic:'🍞',line:'Insert bread! I mean, butter me!',hit:'Pop! Toast!',win:'The toaster pops a mountain of toast! You win, Alex!',need:5,item:'🧈'}
];
let BS=null;
function bossOpen(k){if(!worldOpen(k)&&!pdata(k).sticker){boySay('Explore that world first!',2);return}const spec=BOSSES.find(b=>b.k===k);BS={...spec,hp:0,t:0,pop:0,over:0,fin:0,shake:0};openScreen('boss');boySay(spec.line,3);AUD.setTheme('win')}
SCR.bosses={open(){boySay('Pick a silly boss! You cannot lose!',2)}};
SCR.boss={open(){if(!BS)BS={...BOSSES[0],hp:0,t:0,pop:0,over:0,fin:0,shake:0}},close(){BS=null;AUD.setTheme('title')},
  down(p){if(!BS||BS.over)return;BS.hp++;BS.pop=1;BS.shake=0.25;AUD.SFX.hop();sSpark(W/2,H*0.42,14);boySay(BS.hit,1);if(BS.hp>=BS.need)bossWin()}};
function bossWin(){BS.over=1;BS.fin=0;boy().mode.boss[BS.k]=1;if(BS.k==='space'&&!SAVE.un.rocket){SAVE.un.rocket=1;SAVE.wear.rocket=1}if(BS.k==='robot'&&!SAVE.un.mech){SAVE.un.mech=1;SAVE.wear.mech=1}save();AUD.SFX.sticker();sConf(50);boySay(BS.win,3)}
XS.bosses={draw(){UI=[];softBg('#ffebee','#fff3e0');boyHead('Boss Battles','#c62828');
  txt('Tap the boss! Feed, tickle, cork or pillow-fight. You cannot lose.',W/2,TOP+110,15,'#6d4c41');
  const land=W>H*1.15,cols=land?3:2,tw=Math.min(170,(W-INL-INR-36)/cols),gap=12,top=TOP+140;
  BOSSES.forEach((b,i)=>{const c=i%cols,r=(i/cols)|0,x=W/2-(cols*tw+(cols-1)*gap)/2+c*(tw+gap),y=top+r*(tw*0.8+gap),won=!!boy().mode.boss[b.k],open=worldOpen(b.k)||pdata(b.k).sticker;
    X.fillStyle=open?(won?'#c8e6c9':'#ffcdd2'):'#e0e0e0';rrect(x,y,tw,tw*0.72,18);X.fill();
    txt(open?b.ic:'🔒',x+tw/2,y+tw*0.26,34,'#000');txt(open?b.n:'???',x+tw/2,y+tw*0.52,14,open?'#4e342e':'#9e9e9e');
    if(won)txt('✓ Won!',x+tw/2,y+tw*0.64,12,'#2e7d32');
    btn('bs'+b.k,x,y,tw,tw*0.72,()=>open?bossOpen(b.k):boySay('Explore that world first!',2))});
  bigBack()}};
XS.boss={upd(dt){if(!BS)return;BS.t+=dt;BS.pop=Math.max(0,BS.pop-dt*4);BS.shake=Math.max(0,BS.shake-dt);if(BS.over)BS.fin+=dt},
  draw(){UI=[];if(!BS){bigBack();return}softBg('#fff3e0','#fce4ec');const sh=(BS.shake?rr(-6,6):0);
    txt(BS.n,W/2,TOP+80,30,'#c62828');txt(BS.line,W/2,TOP+112,16,'#6d4c41');
    const cx=W/2+sh,cy=H*0.46,sc=1.6+BS.pop*0.3;X.save();X.translate(cx,cy);X.scale(sc,sc);txt(BS.ic,0,0,72,'#000');X.restore();
    for(let i=0;i<BS.need;i++){const x=W/2-(BS.need*28)/2+i*28+14,y=H*0.68;circ(x,y,12,i<BS.hp?'#81c784':'#eee');if(i<BS.hp)txt('✓',x,y+1,12,'#fff')}
    txt('Tap '+BS.n+'!',W/2,H*0.76,20,'#ef6c00');
    if(BS.over){const s=back(BS.fin*2),w=Math.min(W-40,400),h=200;X.save();X.translate(W/2,H*0.4);X.scale(s,s);X.fillStyle='#fff';rrect(-w/2,-h/2,w,h,24);X.fill();txt('You win!',0,-36,32,'#2e7d32');txt(BS.win,0,16,16,'#6a1b9a');X.restore()}
    // Alex + Doodle cheering in the corner
    X.save();X.translate(INL+70,H-Math.max(BOT,8)-20);drawAlex(0,0,{t:T,face:1,st:'cheer',acc:heroAcc()});drawCat(70,0,{t:T,st:'idle',acc:catAcc(),s:0.9});X.restore();
    bigBack()}};

// ---------- world minigames (simple tap games, can't lose) ----------
function boyMgInit(o,kind){o.bits=[];o.sp=0.2;o.kind=kind}
function boyMgBits(o,icon,vy){if(o.bits.length<8&&(o.sp-=0.016)<=0){o.sp=rr(0.4,0.7);o.bits.push({x:rr(INL+50,W-INR-50),y:H+20,r:rr(28,40),vy:vy||rr(70,110),ic:icon,pop:0})}}
MGS.stomp={init(o){boyMgInit(o,'stomp')},update(dt,o){boyMgBits(o,pick(['🍎','🍌','🍇']),90);for(const b of o.bits){if(b.pop){b.pop+=dt;continue}b.y-=b.vy*dt}o.bits=o.bits.filter(b=>b.pop?b.pop<0.3:b.y>mgTop()-20)},
  down(p,o){for(const b of o.bits)if(!b.pop&&Math.hypot(p.x-b.x,p.y-b.y)<b.r+10){b.pop=0.01;mgScore(1,b.x,b.y);AUD.SFX.hop();return}},
  draw(o){X.fillStyle='#c5e1a5';X.fillRect(0,0,W,H);for(let x=0;x<W;x+=80)ell(x,H*0.7,50,20,'#81c784');X.save();X.translate(0,mGround());drawAlex(80,0,{t:T,face:1,st:'cheer',acc:heroAcc()});X.restore();for(const b of o.bits){X.globalAlpha=b.pop?1-b.pop/0.3:1;txt(b.ic,b.x,b.y,b.r,'#000');X.globalAlpha=1}}};
MGS.corks={init(o){boyMgInit(o,'corks')},update(dt,o){boyMgBits(o,'💨',80);for(const b of o.bits){if(b.pop){b.pop+=dt;continue}b.y-=b.vy*dt}o.bits=o.bits.filter(b=>b.pop?b.pop<0.3:b.y>mgTop()-20)},
  down(p,o){for(const b of o.bits)if(!b.pop&&Math.hypot(p.x-b.x,p.y-b.y)<b.r+10){b.pop=0.01;mgScore(1,b.x,b.y);AUD.SFX.squeak();return}},
  draw(o){X.fillStyle='#ffccbc';X.fillRect(0,0,W,H);X.save();X.translate(0,mGround());drawAlex(80,0,{t:T,acc:heroAcc()});X.restore();for(const b of o.bits){X.globalAlpha=b.pop?1-b.pop/0.3:1;txt(b.ic,b.x,b.y,b.r,'#000');X.globalAlpha=1}}};
MGS.spark={init(o){boyMgInit(o,'spark')},update(dt,o){boyMgBits(o,'⭐',100);for(const b of o.bits){if(b.pop){b.pop+=dt;continue}b.y-=b.vy*dt}o.bits=o.bits.filter(b=>b.pop?b.pop<0.3:b.y>mgTop()-20)},
  down(p,o){for(const b of o.bits)if(!b.pop&&Math.hypot(p.x-b.x,p.y-b.y)<b.r+12){b.pop=0.01;mgScore(1,b.x,b.y);AUD.SFX.chime();return}},
  draw(o){X.fillStyle='#1a237e';X.fillRect(0,0,W,H);X.save();X.translate(0,mGround());drawAlex(80,0,{t:T,acc:heroAcc()});X.restore();for(const b of o.bits){X.globalAlpha=b.pop?1-b.pop/0.3:1;txt(b.ic,b.x,b.y,b.r,'#000');X.globalAlpha=1}}};
MGS.cannon={init(o){boyMgInit(o,'cannon')},update(dt,o){boyMgBits(o,pick(['🎉','💥','🍕']),85);for(const b of o.bits){if(b.pop){b.pop+=dt;continue}b.y-=b.vy*dt}o.bits=o.bits.filter(b=>b.pop?b.pop<0.3:b.y>mgTop()-20)},
  down(p,o){for(const b of o.bits)if(!b.pop&&Math.hypot(p.x-b.x,p.y-b.y)<b.r+10){b.pop=0.01;mgScore(1,b.x,b.y);sConf(8);AUD.SFX.hop();return}},
  draw(o){X.fillStyle='#b2dfdb';X.fillRect(0,0,W,H);X.save();X.translate(0,mGround());drawAlex(80,0,{t:T,st:'cheer',acc:heroAcc()});X.restore();for(const b of o.bits){X.globalAlpha=b.pop?1-b.pop/0.3:1;txt(b.ic,b.x,b.y,b.r,'#000');X.globalAlpha=1}}};
MGS.honk={init(o){boyMgInit(o,'honk')},update(dt,o){boyMgBits(o,'🐔',90);for(const b of o.bits){if(b.pop){b.pop+=dt;continue}b.y-=b.vy*dt}o.bits=o.bits.filter(b=>b.pop?b.pop<0.3:b.y>mgTop()-20)},
  down(p,o){for(const b of o.bits)if(!b.pop&&Math.hypot(p.x-b.x,p.y-b.y)<b.r+10){b.pop=0.01;mgScore(1,b.x,b.y);AUD.SFX.squeak();return}},
  draw(o){X.fillStyle='#d1c4e9';X.fillRect(0,0,W,H);X.save();X.translate(0,mGround());drawAlex(80,0,{t:T,acc:heroAcc()});X.restore();for(const b of o.bits){X.globalAlpha=b.pop?1-b.pop/0.3:1;txt(b.ic,b.x,b.y,b.r,'#000');X.globalAlpha=1}}};
MGS.belts={init(o){boyMgInit(o,'belts')},update(dt,o){boyMgBits(o,'⚙️',95);for(const b of o.bits){if(b.pop){b.pop+=dt;continue}b.y-=b.vy*dt}o.bits=o.bits.filter(b=>b.pop?b.pop<0.3:b.y>mgTop()-20)},
  down(p,o){for(const b of o.bits)if(!b.pop&&Math.hypot(p.x-b.x,p.y-b.y)<b.r+10){b.pop=0.01;mgScore(1,b.x,b.y);AUD.SFX.pat();return}},
  draw(o){X.fillStyle='#cfd8dc';X.fillRect(0,0,W,H);X.save();X.translate(0,mGround());drawAlex(80,0,{t:T,acc:heroAcc()});X.restore();for(const b of o.bits){X.globalAlpha=b.pop?1-b.pop/0.3:1;txt(b.ic,b.x,b.y,b.r,'#000');X.globalAlpha=1}}};

// Fun Corner also links here
FUN.push(['🦕','Worlds',()=>openScreen('worlds'),'#c5e1a5','Alex\'s new worlds!'],['⚡','Modes',()=>openScreen('modes'),'#ffe0b2','Races, fetch and bosses!']);

// Keep the family sticker book from growing past the familiar + seasonal + trip pages
const _drawBookB=drawBook;drawBook=function(){const hide=[];for(let i=PLACES.length-1;i>=0;i--)if(WORLD_KS.indexOf(PLACES[i].k)>=0)hide.unshift(PLACES.splice(i,1)[0]);try{_drawBookB()}finally{PLACES.push(...hide)}};
