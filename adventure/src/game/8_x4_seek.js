// ================= v1.4: Kitty hide-and-seek in every place: ears peek over the furniture, tap for a giggle + peekaboo =================
let SEEK=[];
function seekEnter(){SEEK=[];const own=KITTIES.find(q=>q.p===pl.k),pool=KITTIES.filter(K=>K!==own||SAVE.kit[K.k]);const spots=[];
  for(const f of pl.furn){const F=FURN[f.t];if(!F||!F.pl)continue;const ps=F.pl(f);if(!ps.length)continue;const top=Math.min(...ps.map(p=>Math.min(p.y1,p.y2==null?p.y1:p.y2)));if(top<-280||top>-40)continue;
    const p=ps.find(q=>Math.min(q.y1,q.y2==null?q.y1:q.y2)===top);spots.push({x:(p.x1+p.x2)/2+((p.x2-p.x1)*0.25*(R()-0.5)),top})}
  for(let i=spots.length-1;i>0;i--){const j=(R()*(i+1))|0;[spots[i],spots[j]]=[spots[j],spots[i]]}
  const pk=pool.slice().sort(()=>R()-0.5);spots.slice(0,3).forEach((s,i)=>{if(pk[i])SEEK.push({K:pk[i],x:s.x,top:s.top,found:0,ft:0,ph:R()*6})});SEEK.t=0}
const _enterPlace=enterPlace;enterPlace=function(i){_enterPlace(i);seekEnter()};
const _drawWorld=drawWorld;drawWorld=function(){_drawWorld();if(!SEEK.length)return;const gy=GY();X.save();X.translate(-camX,gy);
  for(const s of SEEK){if(Math.abs(s.x-camX-W/2)>W)continue;const sc=0.9;
    if(!s.found){const peek=16+Math.max(0,Math.sin(T*1.3+s.ph))*16;X.save();X.beginPath();X.rect(s.x-90,s.top-260,180,260);X.clip();blitKit(s.K.k,"sit",0,s.x,s.top+34-peek,Math.sin(s.ph)>0?1:-1,sc);X.restore();
      if(SEEK.t>18&&!SEEK.some(q=>!q.found&&q!==s&&q.ph>s.ph)){const g=0.5+0.5*Math.sin(T*5);star5(s.x+20,s.top-28-g*6,5+g*3,'#fff59d')}}
    else if(s.ft<2){const k=back(Math.min(1,s.ft*3)),a=Math.min(1,(2-s.ft)*2);X.globalAlpha=a;blitKit(s.K.k,'sit',0,s.x,s.top-k*12,1,sc*(0.8+0.3*k),{closed:s.ft<0.6});X.globalAlpha=1;if(s.ft<0.8)txt('Peekaboo!',s.x,s.top-95*sc-k*10,18,'#ff5c9e',{st:'#fff',sw:5})}}
  X.restore()};
const _tapWorld=tapWorld;tapWorld=function(p){const wx=p.x+camX,wy=p.y-GY();for(const s of SEEK){if(!s.found&&Math.abs(wx-s.x)<Math.max(54,PT(36))&&wy>s.top-90&&wy<s.top+20){seekFound(s);return true}}return _tapWorld(p)};
function seekFound(s){s.found=1;s.ft=0;AUD.SFX.squeak();setTimeout(()=>AUD.SFX.meow(2),180);hearts(s.x,s.top-40,6);sparkles(s.x,s.top-30,10);SAVE.x.seek[pl.k]=(SAVE.x.seek[pl.k]||0)+1;save();
  const nm=SAVE.kit[s.K.k]?kitName(s.K.k):'a kitty';const left=SEEK.filter(q=>!q.found).length;
  sayT('Hee hee! Peekaboo! You found '+nm+'!'+(left?'':' You found all the hiding kitties!'),3);if(!left)confetti(50)}
const _update=update;update=function(dt){_update(dt);if(state==='play'&&SEEK.length){SEEK.t=(SEEK.t||0)+dt;for(const s of SEEK)if(s.found)s.ft+=dt}};
if(DEBUG)window.__X={SCR,artFill,artMake,PAGES,CRAY,ART_N,SCg:()=>SC,uiHit:p=>UI.filter(b=>inR(p,b)).map(b=>b.id),AR:()=>AR,artRect,SEEK:()=>SEEK,PC:()=>PC,SL:()=>SL,GF:()=>GF};
