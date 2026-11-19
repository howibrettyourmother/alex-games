// ================= adventure quests: treasure chests + gentle light puzzles (never fail) =================
// Each familiar place hides one chest. Open it with a crate-switch, stepping-stone order, a hidden key, or a counting puzzle at school.
const QUEST_SPEC={
  dad:{kind:'crate',x:1960,y:0,crate:1680,hint:'Push the crate onto the glowing stone!'},
  mom:{kind:'order',x:1550,y:-4,stones:[980,1180,1380],order:[1,0,2],hint:'Step on the stones in the order they flash!'},
  klub:{kind:'count',x:1480,y:0,n:4,hint:'How many apples are in the bowl? Tap the right number!'},
  park:{kind:'key',x:2680,y:0,key:[1480,-86],hint:'A gold key is hiding by the rock!'},
  gma:{kind:'order',x:2260,y:0,stones:[700,900,1100],order:[2,0,1],hint:'Step on the stones in the order they flash!'},
  pumpkin:{kind:'crate',x:2200,y:0,crate:1800,hint:'Push the crate onto the glowing stone!'},
  snow:{kind:'key',x:2300,y:0,key:[900,-40],hint:'Find the gold key in the park!'},
  beach:{kind:'order',x:2400,y:0,stones:[700,950,1200],order:[0,2,1],hint:'Step on the stones in the order they flash!'},
  fl1:{kind:'crate',x:2400,y:0,crate:2000,hint:'Push the crate onto the glowing stone!'},
  fl2:{kind:'key',x:2400,y:0,key:[1600,-20],hint:'A gold key is hiding near the sand!'},
  colo:{kind:'order',x:2600,y:0,stones:[800,1100,1400],order:[2,1,0],hint:'Step on the stones in the order they flash!'}
};
let QST=null;
function questData(){if(!SAVE.quest||typeof SAVE.quest!=='object')SAVE.quest={};return SAVE.quest}
function gemCount(){return Object.keys(questData()).filter(k=>questData()[k]).length}
function questEnter(){const spec=QUEST_SPEC[pl.k];if(!spec){QST=null;return}
  const got=!!questData()[pl.k];
  QST={k:pl.k,kind:spec.kind,x:spec.x,y:spec.y||0,got,open:got,hint:spec.hint,said:-99,flash:-1,flashT:0,step:0,crateX:spec.crate||(spec.x-200),plate:spec.x,key:spec.key?{x:spec.key[0],y:spec.key[1],got:got,held:0}:null,stones:(spec.stones||[]).map((x,i)=>({x,i})),order:spec.order||[0,1,2],n:spec.n||3,pick:-1,show:0};
  if(!got&&QST.kind==='order'){QST.flash=0;QST.flashT=0.2;QST.show=3}
}
function questOpen(){if(!QST||QST.got)return;QST.got=1;QST.open=1;questData()[pl.k]=1;pdata(pl.k).gem=1;save();
  AUD.SFX.sticker();sparkles(QST.x,QST.y-40,22);hearts(QST.x,QST.y-50,8);confetti(24);
  float('Treasure gem! '+gemCount(),QST.x,QST.y-80,'#ffe082');
  sayT(pick(['You found a treasure gem!','The chest is open!','Awesome, Alex!']),3);
  if(!SAVE.un.dino&&gemCount()>=3){SAVE.un.dino=1;save();float('Dino Hood unlocked!',cat.x,cat.y-90,'#fff59d')}
  if(gemCount()>=8&&!SAVE.un.explorer){SAVE.un.explorer=1;SAVE.wear.explorer=1;save();float('Explorer Hat unlocked!',cat.x,cat.y-90,'#fff59d')}
}
function updQuest(dt){if(!QST||state!=='play'||overlay)return;const q=QST,c=cat;
  if(!q.got&&Math.abs(c.x-q.x)<280&&T-q.said>16){q.said=T;bubble(q.x,-90,q.hint,'chest');sayT(q.hint,2)}
  if(q.got)return;
  if(q.kind==='crate'){const push=c.ground&&Math.abs(c.x-q.crateX)<28&&Math.abs(c.y)<20&&Math.abs(c.vx)>20;
    if(push)q.crateX=clamp(q.crateX+c.vx*dt*0.85,80,pl.w-80);
    if(Math.abs(q.crateX-q.plate)<28)questOpen()}
  else if(q.kind==='order'){
    if(q.show>0){q.flashT-=dt;if(q.flashT<=0){q.flash++;if(q.flash>=q.order.length){q.show--;q.flash=-1;q.flashT=q.show>0?0.7:0}else q.flashT=0.55}}
    if(c.ground&&c.y>-8){for(const s of q.stones){if(Math.abs(c.x-s.x)<28){if(q._on!==s.i){q._on=s.i;const need=q.order[q.step];
      if(s.i===need){q.step++;AUD.SFX.chime();sparkles(s.x,-20,8);if(q.step>=q.order.length)questOpen()}
      else if(q.step>0||s.i!==need){q.step=0;AUD.SFX.squeak();float('Almost! Try again.',s.x,-70,'#fff59d');q.show=2;q.flash=0;q.flashT=0.3}}
    }}if(!q.stones.some(s=>Math.abs(c.x-s.x)<28))q._on=-1}
  }
  else if(q.kind==='key'){const k=q.key;if(k&&!k.got&&Math.hypot(k.x-c.x,k.y-(c.y-20))<36){k.got=1;k.held=1;AUD.SFX.chime();sparkles(k.x,k.y,10);float('You found the key!',k.x,k.y-30,'#ffe082');sayT('You found the key!',2)}
    if(k&&k.held){k.x=c.x+c.face*20;k.y=c.y-46;if(Math.abs(c.x-q.x)<50&&c.y>-80)questOpen()}}
  else if(q.kind==='count'){/* opened by tapping a number button in drawQuest */}
}
function drawChest(x,y,open){const bob=open?0:Math.sin(T*3)*3;X.save();X.translate(x,y+bob);
  if(open){const g=X.createRadialGradient(0,-36,4,0,-36,70);g.addColorStop(0,'rgba(255,230,90,.7)');g.addColorStop(1,'rgba(255,200,0,0)');X.fillStyle=g;X.fillRect(-80,-110,160,130)
    star5(0,-58,10+Math.sin(T*5)*2,'#ffe082')}
  X.fillStyle='#8d4e16';rrect(-28,-36,56,36,6);X.fill();X.fillStyle='#c9842e';X.fillRect(-28,-26,56,7);X.fillStyle='#ffd54f';X.fillRect(-3.5,-30,7,12);
  X.save();X.translate(0,-36);if(open)X.rotate(-0.95);X.fillStyle='#a45a1c';rrect(-28,-18,56,20,8);X.fill();X.fillStyle='#ffd54f';X.fillRect(-28,-5,56,4);X.restore();
  if(!open){circ(0,-52+Math.sin(T*5)*2,11,'#fff');txt('?',0,-51+Math.sin(T*5)*2,16,'#c62828')}
  X.restore()}
function drawQuest(){if(!QST)return;const q=QST;
  // hint chest target
  if(!q.got&&Math.abs(cat.x-q.x)>W*0.6){/* arrow is handled by task; skip */}
  if(q.kind==='crate'){X.fillStyle=q.got?'#81c784':'#80deea';rrect(q.plate-22,-8,44,10,4);X.fill();if(!q.got&&Math.sin(T*4)>0)X.globalAlpha=0.5,circ(q.plate,-10,16,'#fff59d'),X.globalAlpha=1;
    X.fillStyle='#a1887f';rrect(q.crateX-18,-36,36,36,5);X.fill();X.fillStyle='#8d6e63';X.fillRect(q.crateX-14,-30,28,6);X.fillRect(q.crateX-14,-18,28,6)}
  if(q.kind==='order'){q.stones.forEach((s,i)=>{const on=q.flash===i||(q.step>0&&q.order[q.step-1]===s.i&&q.step>=i);const lit=q.flash===q.order.indexOf(s.i)&&q.show>0?q.order[q.flash]===s.i:false;const glow=q.show>0&&q.flash>=0&&q.order[q.flash]===s.i;
    circ(s.x,-8,16,glow?'#fff59d':'#90caf9');circ(s.x,-8,10,glow?'#ffd54f':'#42a5f5');txt(String(i+1),s.x,-8,12,'#0d47a1')})}
  if(q.kind==='key'&&q.key&&!q.got){const k=q.key;X.save();X.translate(k.x,k.y+Math.sin(T*4)*3);circ(0,-10,8,'#ffd54f');X.fillStyle='#ffd54f';X.fillRect(-2,-2,4,14);X.fillRect(-2,10,8,4);X.fillRect(-2,6,6,3);X.strokeStyle='#f9a825';X.lineWidth=2;X.beginPath();X.arc(0,-10,4,0,TAU);X.stroke();X.restore()}
  if(q.kind==='count'&&!q.got){// bowl of apples + 3 number pads (always includes the right count)
    const bx=q.x-160,by=-8;X.fillStyle='#efebe9';rrect(bx-36,-22,72,22,8);X.fill();
    for(let i=0;i<q.n;i++){const a=i*0.5-0.7;circ(bx+Math.cos(a)*16,by-18+Math.sin(a)*6,8,'#e53935');circ(bx+Math.cos(a)*16-2,by-20+Math.sin(a)*6,2,'#fff')}
    const opts=[q.n-1,q.n,q.n+1];
    opts.forEach((n,i)=>{const x=q.x-40+i*70,y=-70;X.fillStyle='#fff';rrect(x-22,y-22,44,44,10);X.fill();txt(String(n),x,y,22,'#1565c0')})
  }
  drawChest(q.x,q.y,q.open||q.got);
}
// map gem tally on the sticker book line is already shown per-place via pdata.gem

function questTap(wx,wy){if(!QST||QST.got||QST.kind!=='count')return false;const q=QST,opts=[q.n-1,q.n,q.n+1];
  for(let i=0;i<opts.length;i++){const n=opts[i],x=q.x-40+i*70,y=-70;if(Math.abs(wx-x)<30&&Math.abs(wy-y)<30){if(n===q.n)questOpen();else{AUD.SFX.squeak();float('Try again!',x,y-40,'#fff59d')}return true}}return false}
