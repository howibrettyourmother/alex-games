// ================= sprites: Doodle the cat, Alex the hero, friendly grown-ups, items =================
const OR='#f5a142',ORD='#dc7f2a',WH='#fffaf3',PN='#ff9fb8';
function sl(w,c){X.lineWidth=w;X.strokeStyle=c;X.lineCap='round';X.lineJoin='round';X.stroke()}
function bow(x,y,s,c){X.save();X.translate(x,y);X.scale(s,s);poly([0,0,-12,-8,-12,8],c);poly([0,0,12,-8,12,8],c);circ(0,0,4,'#fff');X.restore()}
function crown(x,y,s){X.save();X.translate(x,y);X.scale(s,s);poly([-12,4,-12,-8,-6,-2,0,-12,6,-2,12,-8,12,4],'#ffd54f');circ(0,-12,2.4,'#ff6f00');circ(-12,-8,2,'#43a047');circ(12,-8,2,'#1565c0');X.restore()}
// Doodle: chunky orange-and-white tabby (real markings): white muzzle+chest+blaze, orange ears/head patch, pink nose, white paws, striped orange tail. Faces right; (x,y)=feet.
function drawCat(x,y,o){const f=o.face||1,st=o.st||'idle',t=o.t||0,A=o.acc||{};X.save();X.translate(x,y);X.scale(f*(o.s||1),o.s||1);
  ell(0,1,30,5,'rgba(80,40,90,0.15)');
  if(A.wings&&st!=='sleep'&&st!=='flop'){const fl=Math.sin(t*7)*0.15;X.globalAlpha=0.8;ell(-8,-56,12,22,'#ffc1e3',-0.5+fl);ell(-20,-44,9,15,'#e1bee7',-1.1+fl);X.globalAlpha=1;circ(-10,-60,2,'#fff');circ(-20,-46,1.6,'#fff')}
  if(A.cape&&st!=='sleep'&&st!=='flop'){X.fillStyle='#b388ff';X.beginPath();X.moveTo(18,-40);X.quadraticCurveTo(-20,-46-Math.sin(t*6)*4,-40,-14+Math.sin(t*8)*3);X.lineTo(-10,-12);X.closePath();X.fill();star5(-18,-26,4,'#fff59d')}
  if(st==='sleep'){ell(0,-16,30,17,OR);ell(6,-10,18,8,WH);for(let i=0;i<3;i++){X.beginPath();X.arc(-6+i*9,-24,6,Math.PI*1.15,Math.PI*1.85);sl(3,ORD)}
    X.beginPath();X.moveTo(-26,-8);X.quadraticCurveTo(-30,8,8,4);sl(9,OR);circ(9,4,4.6,WH);circ(20,-22,15,OR);ell(24,-18,8,6,WH);poly([10,-32,12,-44,20,-35],OR);poly([24,-36,32,-44,32,-31],OR);
    X.beginPath();X.arc(17,-23,3,0.2,Math.PI-0.2);sl(2,'#4a3a3a');X.beginPath();X.arc(27,-23,3,0.2,Math.PI-0.2);sl(2,'#4a3a3a');poly([22,-18,26,-18,24,-15.5],PN);
    accHead(A,20,-22,1,t);X.restore();return}
  if(st==='flop'){const w=Math.sin(t*10)*4;ell(0,-18,32,16,OR);ell(2,-22,24,10,WH);for(const [lx,ph] of [[-16,0],[-4,1],[10,2],[20,3]]){X.beginPath();X.moveTo(lx,-26);X.lineTo(lx+Math.sin(t*9+ph)*4,-40+w*(ph%2?1:-1));sl(7,OR);circ(lx+Math.sin(t*9+ph)*4,-40+w*(ph%2?1:-1),4.5,WH)}
    X.beginPath();X.moveTo(-30,-14);X.quadraticCurveTo(-46,-20,-44,-36+Math.sin(t*5)*5);sl(8,OR);circ(30,-16,16,OR);ell(34,-12,9,7,WH);poly([40,-4,48,2,38,6],OR);poly([40,-28,48,-30,42,-20],OR);
    circ(28,-14,2.6,'#3a2b2b');circ(36,-18,2.6,'#3a2b2b');poly([36,-9,38,-6,34,-7],PN);X.restore();return}

  // signature real-life poses (loaf, big loaf, paw-over-face, judgy just-woke-up, tree-skirt snooze, limp sack-of-potatoes, sticker on the head)
  if(st==='loaf'||st==='bigloaf'){const b=st==='bigloaf'?1.2:1;
    ell(0,1,34*b,5,'rgba(80,40,90,0.15)');
    ell(2,-15*b,34*b,18*b,OR);ell(7,-11*b,22*b,12*b,WH);
    for(let i=0;i<3;i++){X.beginPath();X.arc(-8+i*10,-26*b,6,Math.PI*1.15,Math.PI*1.85);sl(3,ORD)}
    ell(-16,-6*b,7,5,WH);ell(-3,-5*b,7,5,WH);ell(16,-6*b,7,5,WH);
    X.beginPath();X.moveTo(-28,-12*b);X.quadraticCurveTo(-42,-6*b,-34,3);sl(9,OR);X.beginPath();X.moveTo(-34,-4);X.lineTo(-35,1);sl(9,ORD);circ(-34,3,4.2,OR);
    const hx=18,hy=-28*b;
    poly([hx-12,hy-4,hx-10,hy-20,hx-2,hy-10],OR);poly([hx-9,hy-7,hx-8,hy-16,hx-4,hy-10],PN);
    poly([hx+2,hy-10,hx+12,hy-20,hx+14,hy-4],OR);poly([hx+5,hy-10,hx+11,hy-16,hx+12,hy-6],PN);
    circ(hx,hy,16,OR);ell(hx+1,hy-2,5,11,WH);ell(hx+2,hy+6,11,7,WH);
    if(st==='bigloaf'){X.beginPath();X.arc(hx-6,hy-1,3.4,0.25,Math.PI-0.25);sl(2,'#3a2b2b');X.beginPath();X.arc(hx+8,hy-1,3.4,0.25,Math.PI-0.25);sl(2,'#3a2b2b')}
    else{ell(hx-6,hy-1,3.6,4.2,'#3a2b2b');ell(hx+8,hy-1,3.6,4.2,'#3a2b2b');circ(hx-4.8,hy-2.6,1.3,'#fff');circ(hx+9.2,hy-2.6,1.3,'#fff')}
    ell(hx-10,hy+5,3.6,2,'rgba(255,140,170,0.5)');ell(hx+13,hy+5,3.6,2,'rgba(255,140,170,0.5)');
    poly([hx+1,hy+3,hx+5,hy+3,hx+3,hy+5.5],PN);X.beginPath();X.moveTo(hx,hy+8);X.quadraticCurveTo(hx+3,hy+9.5,hx+6,hy+8);sl(1.4,'#7a4a4a');
    accHead(A,hx,hy,1,t);X.restore();return}
  if(st==='judgy'){ell(0,1,28,5,'rgba(80,40,90,0.15)');
    ell(0,-22,28,20,OR);ell(4,-14,20,14,WH);
    for(let i=0;i<3;i++){X.beginPath();X.arc(-10+i*9,-36,6,Math.PI*1.2,Math.PI*1.8);sl(3,ORD)}
    ell(-12,-4,7,5,WH);ell(10,-4,7,5,WH);
    X.beginPath();X.moveTo(-22,-18);X.quadraticCurveTo(-36,-8,-28,4);sl(9,OR);X.beginPath();X.moveTo(-28,-6);X.lineTo(-28,1);sl(9,ORD);
    const hx=6,hy=-44;
    poly([hx-14,hy-2,hx-16,hy-18,hx-4,hy-8],OR);poly([hx-12,hy-4,hx-13,hy-14,hx-7,hy-8],PN);
    poly([hx+2,hy-8,hx+14,hy-20,hx+16,hy-2],OR);poly([hx+5,hy-8,hx+12,hy-16,hx+13,hy-4],PN);
    circ(hx,hy,17,OR);ell(hx,hy-1,5,12,WH);ell(hx+1,hy+7,12,8,WH);
    // half-lidded just-woke-up stare
    X.beginPath();X.moveTo(hx-10,hy-1);X.lineTo(hx-3,hy-1);sl(2.4,'#3a2b2b');X.beginPath();X.moveTo(hx+4,hy-1);X.lineTo(hx+11,hy-1);sl(2.4,'#3a2b2b');
    ell(hx-7,hy+1,3.2,2.4,'#3a2b2b');ell(hx+7,hy+1,3.2,2.4,'#3a2b2b');
    ell(hx-11,hy+6,3.8,2,'rgba(255,140,170,0.45)');ell(hx+12,hy+6,3.8,2,'rgba(255,140,170,0.45)');
    poly([hx-1,hy+4,hx+3,hy+4,hx+1,hy+6.5],PN);X.beginPath();X.moveTo(hx-2,hy+9);X.lineTo(hx+4,hy+9);sl(1.8,'#7a4a4a');
    accHead(A,hx,hy,1,t);X.restore();return}
  if(st==='pawface'){ell(0,1,32,5,'rgba(80,40,90,0.15)');
    ell(0,-16,32,16,OR);ell(6,-10,20,9,WH);
    for(let i=0;i<3;i++){X.beginPath();X.arc(-8+i*10,-26,6,Math.PI*1.15,Math.PI*1.85);sl(3,ORD)}
    X.beginPath();X.moveTo(-26,-10);X.quadraticCurveTo(-40,-2,-32,6);sl(9,OR);circ(-32,6,4,OR);
    circ(18,-20,15,OR);ell(22,-16,8,7,WH);poly([10,-30,12,-42,20,-33],OR);poly([24,-34,32,-42,32,-29],OR);
    poly([20,-16,24,-16,22,-13.5],PN);
    // white paw covering the face
    ell(22,-22,9,7,WH,-0.4);ell(16,-26,3.6,3.2,WH);ell(22,-28,3.6,3.2,WH);ell(27,-26,3.6,3.2,WH);
    ell(-12,-6,7,5,WH);ell(4,-5,7,5,WH);
    accHead(A,20,-22,1,t);X.restore();return}
  if(st==='treesnooze'){ell(0,4,40,8,'#1b5e3a');ell(0,6,36,7,'#c62828');
    for(let i=0;i<5;i++){circ(-24+i*12,8,3,'#fff')}
    ell(0,-14,28,15,OR);ell(6,-9,16,8,WH);
    for(let i=0;i<3;i++){X.beginPath();X.arc(-6+i*9,-22,6,Math.PI*1.15,Math.PI*1.85);sl(3,ORD)}
    X.beginPath();X.moveTo(-24,-8);X.quadraticCurveTo(-32,4,4,4);sl(8,OR);circ(6,4,4,WH);
    circ(16,-20,14,OR);ell(20,-16,7,6,WH);poly([8,-30,10,-40,18,-32],OR);poly([22,-32,30,-40,30,-28],OR);
    X.beginPath();X.arc(13,-21,3,0.2,Math.PI-0.2);sl(2,'#4a3a3a');X.beginPath();X.arc(23,-21,3,0.2,Math.PI-0.2);sl(2,'#4a3a3a');
    poly([20,-16,24,-16,22,-13.5],PN);
    accHead(A,16,-20,1,t);X.restore();return}
  if(st==='limp'){ell(0,1,26,4,'rgba(80,40,90,0.18)');
    // floppy sack-of-potatoes: body horizontal, legs and tail dangling
    ell(0,-28,36,16,OR);ell(6,-24,22,10,WH);
    for(let i=0;i<3;i++){X.beginPath();X.arc(-10+i*10,-36,6,Math.PI*1.1,Math.PI*1.85);sl(3,ORD)}
    for(const [lx,ph] of [[-16,0],[-4,1],[10,2],[20,3]]){const w=Math.sin(t*3+ph)*2;X.beginPath();X.moveTo(lx,-22);X.lineTo(lx+w,-4);sl(8,OR);circ(lx+w,-3,5,WH)}
    X.beginPath();X.moveTo(-32,-28);X.quadraticCurveTo(-50,-20,-48,-4+Math.sin(t*2)*3);sl(9,OR);X.beginPath();X.moveTo(-42,-16);X.lineTo(-44,-10);sl(9,ORD);
    const hx=28,hy=-30;
    poly([hx-8,hy-8,hx-4,hy-22,hx+4,hy-12],OR);poly([hx+2,hy-12,hx+14,hy-22,hx+16,hy-6],OR);
    circ(hx+2,hy,15,OR);ell(hx+3,hy+2,6,10,WH);ell(hx+4,hy+8,10,7,WH);
    X.beginPath();X.arc(hx-4,hy,3,0.3,Math.PI-0.2);sl(2,'#3a2b2b');X.beginPath();X.arc(hx+8,hy-1,3,0.3,Math.PI-0.2);sl(2,'#3a2b2b');
    poly([hx+3,hy+5,hx+7,hy+5,hx+5,hy+7.5],PN);
    accHead(A,hx+2,hy,1,t);X.restore();return}
  if(st==='sticker'){ell(0,1,28,5,'rgba(80,40,90,0.15)');
    ell(0,-22,30,20,OR);ell(5,-14,20,13,WH);
    for(let i=0;i<3;i++){X.beginPath();X.arc(-10+i*9,-36,6,Math.PI*1.2,Math.PI*1.8);sl(3,ORD)}
    ell(-12,-4,7,5,WH);ell(12,-4,7,5,WH);
    X.beginPath();X.moveTo(-22,-16);X.quadraticCurveTo(-36,-10,-30,2);sl(9,OR);
    const hx=8,hy=-44;
    poly([hx-14,hy-2,hx-14,hy-20,hx-4,hy-8],OR);poly([hx-11,hy-5,hx-11,hy-16,hx-6,hy-8],PN);
    poly([hx+4,hy-8,hx+14,hy-20,hx+16,hy-2],OR);poly([hx+7,hy-8,hx+13,hy-16,hx+13,hy-5],PN);
    circ(hx,hy,17,OR);ell(hx+1,hy-2,5,12,WH);ell(hx+2,hy+6,12,8,WH);
    ell(hx-6,hy-1,4,5,'#3a2b2b');ell(hx+8,hy-1,4,5,'#3a2b2b');circ(hx-4.6,hy-2.6,1.5,'#fff');circ(hx+9.4,hy-2.6,1.5,'#fff');
    poly([hx+1,hy+3,hx+5,hy+3,hx+3,hy+6],PN);X.beginPath();X.moveTo(hx,hy+8);X.quadraticCurveTo(hx+3,hy+10,hx+6,hy+8);sl(1.4,'#7a4a4a');
    // colorful star sticker on the forehead
    star5(hx+2,hy-12,7,'#ffd54f');star5(hx+2,hy-12,4,'#fff59d');circ(hx+6,hy-16,2.2,'#ff5c9e');
    accHead(A,hx,hy,1,t);X.restore();return}
  const walk=st==='walk',air=st==='air',bisc=st==='bisc',ph=t*12;
  // tail
  const tw=Math.sin(t*(walk?7:2.4))*6;X.beginPath();X.moveTo(-26,-24);X.quadraticCurveTo(-48,-32,-46+tw*0.4,-58+tw);sl(11,OR);X.beginPath();X.moveTo(-38,-38);X.lineTo(-41,-42);sl(11,ORD);X.beginPath();X.moveTo(-44,-50);X.lineTo(-46,-54);sl(11,ORD);circ(-46+tw*0.4,-58+tw,5,OR);
  // legs
  const legs=[[-18,0],[-8,Math.PI],[12,Math.PI*0.5],[20,Math.PI*1.5]];
  for(let i=0;i<4;i++){const [lx,p]=legs[i];let lift=walk?Math.max(0,Math.sin(ph+p))*6:air?3:0,dx=walk?Math.cos(ph+p)*4:0;if(bisc&&i>=2)lift=Math.max(0,Math.sin(t*9+i*Math.PI))*8;
    X.beginPath();X.moveTo(lx,-18);X.lineTo(lx+dx,-4-lift);sl(10,i%2?ORD:OR);if(A.boots){const bx=lx+dx+1,by=-3-lift;X.fillStyle='#8d6e63';rrect(bx-5.5,by-9,10,10,3);X.fill();ell(bx+1.5,by,7,4,'#6d4c41');X.fillStyle='#ffcc80';X.fillRect(bx-5.5,by-10,10,3)}else ell(lx+dx+1,-3-lift,6.5,5,WH)}
  // body (chunky loaf-able torso, big white bib)
  ell(0,-22,36,22,OR);ell(8,-14,24,13,WH);for(let i=0;i<4;i++){X.beginPath();X.arc(-18+i*10,-36,8,Math.PI*1.2,Math.PI*1.8);sl(3.4,ORD)}
  if(A.sweater){ell(0,-25,29,17,'#f8a5c8');for(let i=0;i<3;i++){X.beginPath();X.moveTo(-22+i*4,-12-i*2);X.lineTo(22-i*4,-12-i*2);sl(1.6,'rgba(255,255,255,0.6)')}star5(4,-24,7,'#fff59d');star5(4,-24,4.5,'#ffd54f')}
  if(A.tutu){for(let i=0;i<7;i++)ell(-20+i*7,-18,8,6,i%2?'#ffc1e3':'#e1bee7');}
  if(A.collar){X.beginPath();X.arc(22,-36,13,0.6,2.4);sl(4,'#1565c0');circ(22,-23,3.2,'#ffd54f')}
  if(A.bowtie)bow(22,-26,0.75,'#1565c0');
  if(!A.collar&&!A.bow){X.beginPath();X.arc(22,-36,13,0.6,2.4);sl(3.6,'#0d47a1');circ(22,-23,2.6,'#ffd54f')}
  // head
  const hb=walk?Math.sin(ph*2)*1.2:0,hx=24,hy=-42+hb;
  poly([hx-14,hy-6,hx-12,hy-24,hx-2,hy-14],OR);poly([hx-11,hy-9,hx-10,hy-19,hx-5,hy-13],PN);poly([hx+4,hy-14,hx+14,hy-24,hx+16,hy-6],OR);poly([hx+7,hy-13,hx+13,hy-19,hx+13,hy-9],PN);
  circ(hx,hy,19,OR);ell(hx+2,hy-3,6,13,WH);ell(hx+3,hy+7,13,9,WH);
  const blink=((t*0.8)%4)>3.85||st==='purr';
  if(blink){X.beginPath();X.arc(hx-6,hy-2,3.5,0.2,Math.PI-0.2);sl(2.2,'#3a2b2b');X.beginPath();X.arc(hx+10,hy-2,3.5,0.2,Math.PI-0.2);sl(2.2,'#3a2b2b')}
  else{ell(hx-6,hy-2,4,5,'#3a2b2b');ell(hx+10,hy-2,4,5,'#3a2b2b');circ(hx-4.6,hy-3.8,1.6,'#fff');circ(hx+11.4,hy-3.8,1.6,'#fff')}
  ell(hx-11,hy+5,4,2.4,'rgba(255,140,170,0.55)');ell(hx+15,hy+5,4,2.4,'rgba(255,140,170,0.55)');
  poly([hx+1,hy+3,hx+5,hy+3,hx+3,hy+6],PN);
  if(st==='meow'){ell(hx+3,hy+10,3.4,3.6,'#c2185b')}else{X.beginPath();X.moveTo(hx-1,hy+8);X.quadraticCurveTo(hx+1,hy+10,hx+3,hy+7.5);X.quadraticCurveTo(hx+5,hy+10,hx+7,hy+8);sl(1.4,'#7a4a4a')}
  X.beginPath();X.moveTo(hx+12,hy+5);X.lineTo(hx+24,hy+3);X.moveTo(hx+12,hy+7);X.lineTo(hx+24,hy+8);X.moveTo(hx-6,hy+5);X.lineTo(hx-16,hy+3);sl(0.9,'rgba(90,60,60,0.6)');
  if(st==='bat'){X.beginPath();X.moveTo(18,-26);X.lineTo(36,-34+Math.sin(t*20)*4);sl(8,OR);circ(36,-34+Math.sin(t*20)*4,5,WH)}
  if(A.glasses){X.fillStyle='#212121';rrect(hx-13,hy-5,11,8,3);X.fill();rrect(hx+4,hy-5,11,8,3);X.fill();X.beginPath();X.moveTo(hx-2,hy-2);X.lineTo(hx+4,hy-2);sl(1.8,'#212121')}
  if(A.shades){X.fillStyle='#263238';rrect(hx-13,hy-5,11,8,3);X.fill();rrect(hx+4,hy-5,11,8,3);X.fill();X.beginPath();X.moveTo(hx-2,hy-2);X.lineTo(hx+4,hy-2);sl(1.8,'#263238');X.fillStyle='rgba(255,255,255,0.6)';X.fillRect(hx-11,hy-4,3,2);X.fillRect(hx+6,hy-4,3,2)}
  accHead(A,hx,hy,1,t);X.restore()}
function partyHat(x,y,s,rot){X.save();X.translate(x,y);X.rotate(rot||0);X.scale(s,s);poly([-9,0,9,0,0,-24],'#ff6f00');X.beginPath();X.moveTo(-6,-6);X.lineTo(6,-8);X.moveTo(-3,-14);X.lineTo(4,-15);sl(2.4,'#fff59d');circ(0,-25,3.6,'#1565c0');X.restore()}
function accHead(A,hx,hy,s,t){if(A.party){partyHat(hx+2,hy-14,1,0.15);return}
  if(A.horn){X.save();X.translate(hx+3,hy-15);X.rotate(0.25);poly([-5,0,5,0,0,-22],'#fff3b0');X.beginPath();X.moveTo(-4,-4);X.lineTo(4,-7);X.moveTo(-3,-10);X.lineTo(3,-13);X.moveTo(-2,-16);X.lineTo(2,-18);sl(1.6,'#ff6f00');X.restore();circ(hx-6,hy-15,3,'#43a047');circ(hx+12,hy-15,3,'#1565c0')}
  if(A.witch){X.save();X.translate(hx+1,hy-15);X.rotate(-0.12);ell(0,0,18,4.5,'#263238');poly([-10,-1,10,-1,4,-26],'#37474f');poly([4,-26,8,-24,14,-30],'#37474f');X.fillStyle='#ffd54f';X.fillRect(-10,-6,20,4);star5(-2,-14,3.4,'#fff59d');X.restore()}
  if(A.santa){X.save();X.translate(hx+1,hy-15);X.rotate(0.1);poly([-12,0,12,0,10,-14,-6,-20],'#e53935');poly([-6,-20,10,-14,18,-6],'#c62828');circ(19,-5,4,'#fff');X.fillStyle='#fff';rrect(-14,-4,28,7,3.5);X.fill();X.restore()}
  if(A.sunhat){X.save();X.translate(hx+2,hy-14);ell(0,0,24,6,'#ffe082');ell(0,-6,13,10,'#ffd54f');X.fillStyle='#ff6f00';X.fillRect(-13,-5,26,4);circ(10,-5,3.5,'#1565c0');X.restore()}
  if(A.knit){X.save();X.translate(hx+2,hy-14);X.fillStyle='#4fc3f7';X.beginPath();X.arc(0,0,15,Math.PI,0);X.fill();X.fillStyle='#fff';rrect(-16,-3,32,7,3);X.fill();X.strokeStyle='#29b6f6';X.lineWidth=1.5;for(let i=-9;i<=9;i+=6){X.beginPath();X.moveTo(i,-4);X.lineTo(i,-13+Math.abs(i)*0.3);X.stroke()}circ(0,-17,6,'#fff');X.restore()}
  if(A.crown)crown(hx-2,hy-20,0.9);if(A.bow){X.fillStyle='#c62828';X.beginPath();X.moveTo(hx-16,hy+8);X.lineTo(hx+2,hy-6);X.lineTo(hx+16,hy+8);X.lineTo(hx+10,hy+14);X.lineTo(hx-2,hy+4);X.lineTo(hx-12,hy+14);X.closePath();X.fill();X.fillStyle='#ffd54f';X.fillRect(hx-4,hy+2,6,5)};if(A.flower){for(let i=0;i<5;i++){const a=i*TAU/5;circ(hx-10+Math.cos(a)*4,hy-16+Math.sin(a)*4,3.2,'#c5a3ff')}circ(hx-10,hy-16,2.4,'#fff59d')}}
// Alex is ALWAYS the playable hero. Any leftover drawZoe() call is redirected so Zoe can never appear as the player.
function drawZoe(x,o){o=o||{};drawAlex(x,0,Object.assign({t:o.t||0,face:o.face||1,walk:!!o.walk,st:o.walk?'walk':'idle',acc:heroAcc(),s:o.s},o,{acc:heroAcc()}))}
// ---------- kitty friends// ---------- kitty friends: small side-view cats, drawn once per pose into the sprite cache ----------
function drawKit(K,pose,fr,o){o=o||{};X.save();X.scale(K.s,K.s);const B=K.c,D=K.d,Wb=K.w,sit=pose==='sit',ph=fr?1:0;
  ell(0,1,24,4.5,'rgba(80,40,90,0.15)');
  if(sit){X.beginPath();X.moveTo(-14,-6);X.quadraticCurveTo(-34,-2,-30,-24);sl(K.fluff?13:8,B)}else{const tw=fr?5:-3;X.beginPath();X.moveTo(-20,-24);X.quadraticCurveTo(-38,-30,-36,-50+tw);sl(K.fluff?13:8,B)}
  if(K.tip){circ(sit?-30:-36,sit?-24:-50+(fr?5:-3),K.fluff?6:4.5,K.tip)}
  let bx,by,hx,hy;
  if(sit){bx=-2;by=-20;if(K.fluff){for(let i=0;i<7;i++){const a=Math.PI*0.6+i*0.42;circ(bx+Math.cos(a)*19,by+Math.sin(a)*19,8,B)}}ell(bx,by,19,19,B);hx=8;hy=-46}
  else{const L=[[-16,0],[-8,Math.PI],[10,Math.PI*0.5],[17,Math.PI*1.5]];for(let i=0;i<4;i++){const [lx,p]=L[i],lift=Math.max(0,Math.sin(ph*Math.PI+p))*5,dx=Math.cos(ph*Math.PI+p)*3;X.beginPath();X.moveTo(lx,-16);X.lineTo(lx+dx,-4-lift);sl(7,i%2?D:B);ell(lx+dx+1,-3-lift,4.5,3.4,Wb)}
    bx=0;by=-22;if(K.fluff){for(let i=0;i<8;i++){const a=Math.PI*1.05+i*0.27;circ(bx+Math.cos(a)*24,by+Math.sin(a)*13,7,B)}}ell(bx,by,25,15,B);hx=20;hy=-38}
  if(K.pat)for(const q of K.pat)ell(bx+q[0],by+q[1],q[2],q[3],q[4]);
  if(sit){ell(bx+9,by+3,9,13,Wb);for(const lx of [3,12]){X.beginPath();X.moveTo(bx+lx,by+4);X.lineTo(bx+lx,by+17);sl(6.5,B);ell(bx+lx+1,-2.5,4.8,3.4,Wb)}}else ell(bx+6,by+7,15,6,Wb);
  if(K.stars)for(let i=0;i<6;i++)star5(bx-14+((i*13)%28),by-8+((i*7)%14),i%2?2:2.8,i%3?'#fff':'#fff59d');
  // head
  poly([hx-13,hy-5,hx-11,hy-23,hx-2,hy-13],B);poly([hx-10,hy-8,hx-9.5,hy-18,hx-4.5,hy-12],K.ear||PN);poly([hx+3,hy-13,hx+13,hy-23,hx+15,hy-5],B);poly([hx+6,hy-12,hx+12,hy-18,hx+12,hy-8],K.ear||PN);
  if(K.fluff){for(let i=0;i<6;i++){const a=Math.PI*0.25+i*0.5;circ(hx+Math.cos(a)*14,hy+Math.sin(a)*13,6,B)}}
  circ(hx,hy,15,B);if(K.hp)ell(hx+K.hp[0],hy+K.hp[1],K.hp[2],K.hp[3],K.hp[4]);ell(hx+3,hy+6,10,6.5,Wb);
  if(o.closed){X.beginPath();X.arc(hx-5,hy-1,3.2,0.2,Math.PI-0.2);sl(2,'#3a2b2b');X.beginPath();X.arc(hx+9,hy-1,3.2,0.2,Math.PI-0.2);sl(2,'#3a2b2b')}
  else{ell(hx-5,hy-1,4,5,K.eye||'#3a2b2b');ell(hx+9,hy-1,4,5,K.eye||'#3a2b2b');circ(hx-5,hy,2,'#2a1f2a');circ(hx+9,hy,2,'#2a1f2a');circ(hx-3.8,hy-2.8,1.5,'#fff');circ(hx+10.2,hy-2.8,1.5,'#fff');
    if(K.lash){X.beginPath();X.moveTo(hx-9,hy-4);X.lineTo(hx-11,hy-7);X.moveTo(hx+13,hy-4);X.lineTo(hx+15,hy-7);sl(1.4,'#3a2b2b')}}
  ell(hx-10,hy+5,3.6,2.2,'rgba(255,140,170,0.55)');ell(hx+14,hy+5,3.6,2.2,'rgba(255,140,170,0.55)');poly([hx+1,hy+3,hx+5,hy+3,hx+3,hy+5.5],PN);
  X.beginPath();X.moveTo(hx,hy+7.5);X.quadraticCurveTo(hx+1.5,hy+9.5,hx+3,hy+7);X.quadraticCurveTo(hx+4.5,hy+9.5,hx+6,hy+7.5);sl(1.3,'#7a4a4a');
  if(K.bow)bow(hx+8,hy-16,0.95,K.bow);if(K.star)star5(hx-4,hy-9,3.2,'#fff59d');
  if(o.party)partyHat(hx+1,hy-13,0.9,0.15);
  X.restore()}
// friendly grown-ups (generic, cozy)
function drawNPC(k,x,o){const t=o.t||0,wave=o.wave>0;X.save();X.translate(x,0);ell(0,2,28,5,'rgba(80,40,90,0.15)');
  if(k==='duck'){X.translate(0,Math.sin(t*2)*1.5);ell(0,-16,24,15,'#fff');circ(16,-34,11,'#fff');poly([26,-35,36,-32,26,-29],'#ffb74d');circ(19,-37,2,'#333');ell(-6,-18,12,7,'#eee');poly([-24,-20,-32,-26,-22,-12],'#fff');X.fillStyle='#ffb74d';X.fillRect(-6,-2,3,4);X.fillRect(4,-2,3,4);if(o.bow)bow(10,-44,0.6,'#ff8fc8');X.restore();return}
  const C={dad:{h:'#5d4037',top:'#7aa7e8',leg:'#5c6b8a',sk:'#f2c9a8',tall:150},mom:{h:'#8d5a3b',top:'#c39bef',leg:'#6f7fb5',sk:'#f5d0b5',tall:140},teacher:{h:'#e0794f',top:'#7fd1a8',leg:'#8d7bd1',sk:'#e9b994',tall:138},gma:{h:'#d6d6de',top:'#e7b6f2',leg:'#8f87b3',sk:'#f4d6c4',tall:128}}[k];
  const T0=C.tall;X.beginPath();X.moveTo(-7,-T0*0.42);X.lineTo(-8,-4);X.moveTo(7,-T0*0.42);X.lineTo(8,-4);sl(9,C.leg);ell(-9,-3,8,4,'#6d4c41');ell(10,-3,8,4,'#6d4c41');
  if(k==='mom'||k==='gma'){X.fillStyle=k==='gma'?'#b39ddb':'#9fa8da';X.beginPath();X.moveTo(-18,-T0*0.36);X.lineTo(18,-T0*0.36);X.lineTo(22,-T0*0.12);X.lineTo(-22,-T0*0.12);X.fill()}
  X.fillStyle=C.top;rrect(-18,-T0*0.78,36,T0*0.44,12);X.fill();if(k==='teacher'){X.fillStyle='#fff8e1';rrect(-12,-T0*0.62,24,T0*0.3,6);X.fill();txt('ABC',0,-T0*0.5,9,'#e57373')}if(k==='gma'){for(let i=0;i<3;i++)circ(0,-T0*0.7+i*12,2,'#fff')}
  X.beginPath();X.moveTo(-16,-T0*0.72);X.lineTo(-22,-T0*0.46);sl(8,C.top);const ar=wave?-2.4+Math.sin(t*10)*0.3:0.2;X.save();X.translate(16,-T0*0.72);X.rotate(ar);X.beginPath();X.moveTo(0,0);X.lineTo(4,26);sl(8,C.top);circ(4,30,5,C.sk);X.restore();
  const hy=-T0*0.86;if(k==='mom'){X.fillStyle=C.h;rrect(-18,hy-14,36,48,14);X.fill()}
  circ(0,hy,15,C.sk);X.fillStyle=C.h;X.beginPath();X.arc(0,hy-2,16,Math.PI*1.05,TAU*0.98);X.fill();
  if(k==='gma'){circ(0,hy-18,8,C.h);X.beginPath();X.arc(-5,hy,4.5,0,TAU);X.arc(7,hy,4.5,0,TAU);sl(1.6,'#9575cd')}
  if(k==='teacher'){for(let i=0;i<6;i++)circ(-14+i*5.6,hy-12+Math.sin(i)*2,5,C.h)}
  if(k==='dad'){X.fillStyle=C.h;X.beginPath();X.arc(0,hy+5,13,0.15,Math.PI-0.15);X.fill()}
  circ(-5,hy,2,'#3a2b2b');circ(6,hy,2,'#3a2b2b');X.beginPath();X.arc(0.5,hy+5,4,0.3,Math.PI-0.3);sl(1.6,k==='dad'?'#fff':'#c2185b');ell(-9,hy+5,3,1.8,'rgba(255,130,160,0.45)');ell(10,hy+5,3,1.8,'rgba(255,130,160,0.45)');
  X.restore()}

// Alex: locked look — tousled dark hair, teal zip hoodie, navy cargos, brown boots, red cape. (x,y)=feet. Faces right.
const AX={hood:'#1a8a96',hoodD:'#14707c',lining:'#d9a441',tee:'#5d6f80',cargo:'#2a3a52',boot:'#8b5a2b',bootD:'#6d4420',hair:'#3d2416',skin:'#e8b07a',eye:'#5d3316'};
function heroAcc(){const a=Object.assign({},SAVE.wear||{});if(typeof SEASON!=='undefined'&&SEASON.bday)a.party=1;if(a.cape==null)a.cape=1;return a}
function drawAlex(x,y,o){o=o||{};const f=o.face||1,t=o.t||0,A=o.acc||heroAcc(),walk=!!o.walk||o.st==='walk',air=o.st==='air';
  const w=Math.sin(t*9)*(walk?1:0)*(air?0.3:1),pop=o.pop||0;X.save();X.translate(x,y);X.scale(f*(o.s||1)*(1+pop*0.15),(o.s||1)*(1-pop*0.2));
  ell(0,1,16,4.5,'rgba(80,40,90,0.18)');
  // cape (default on in hero games)
  if(A.cape!==0&&A.cape!==undefined?A.cape:1){const sway=Math.sin(t*6)*5+(walk?w*6:0);X.fillStyle='#e53935';X.beginPath();X.moveTo(-6,-46);X.quadraticCurveTo(-28-sway,-28,-24+sway*0.3,-4);X.lineTo(-2,-12);X.closePath();X.fill();X.fillStyle='#c62828';X.beginPath();X.moveTo(-6,-46);X.quadraticCurveTo(-18-sway*0.6,-30,-16,-8);X.lineTo(-2,-12);X.closePath();X.fill()}
  // navy cargo pants + pocket flaps
  X.fillStyle=AX.cargo;X.fillRect(-9,-18,7,16+w*3);X.fillRect(2,-18,7,16-w*3);
  X.fillStyle='#1e2a3d';rrect(-10,-12+w,8,6,1);X.fill();rrect(3,-12-w,8,6,1);X.fill();
  // brown lace-up boots
  X.fillStyle=AX.boot;rrect(-11,-4+w*3,11,8,2);X.fill();rrect(1,-4-w*3,11,8,2);X.fill();
  X.fillStyle=AX.bootD;X.fillRect(-11,-1+w*3,11,2);X.fillRect(1,-1-w*3,11,2);
  X.strokeStyle='#c9a227';X.lineWidth=0.8;X.beginPath();X.moveTo(-8,-1+w*3);X.lineTo(-4,-1+w*3);X.moveTo(4,-1-w*3);X.lineTo(8,-1-w*3);X.stroke();
  // teal zip hoodie
  X.fillStyle=AX.hood;rrect(-13,-46,26,30,7);X.fill();
  X.fillStyle=AX.hoodD;rrect(-8,-28,16,9,3);X.fill(); // kangaroo pocket
  X.fillStyle=AX.tee;X.fillRect(-5,-46,10,5); // slate tee at the collar
  X.fillStyle=AX.lining;X.fillRect(-1.2,-46,2.4,28);for(let i=0;i<5;i++)circ(0,-44+i*5.5,1.1,'#c9a227');
  // hood down behind the shoulders (mustard lining)
  X.fillStyle=AX.hood;X.beginPath();X.arc(-10,-48,7,0.6,Math.PI+0.4);X.fill();X.beginPath();X.arc(10,-48,7,-0.4,Math.PI-0.6);X.fill();
  X.fillStyle=AX.lining;X.beginPath();X.arc(-9,-48,4.5,0.8,Math.PI+0.2);X.fill();X.beginPath();X.arc(9,-48,4.5,-0.2,Math.PI-0.8);X.fill();
  // backpack
  if(A.pack){X.fillStyle='#6d4c41';rrect(10,-44,9,22,3);X.fill();X.fillStyle='#ffd54f';X.fillRect(12,-36,5,3)}
  // arms in hoodie sleeves
  const pose=o.st||'';
  if(pose==='cheer'||pose==='cape'){X.fillStyle=AX.hood;X.fillRect(-18,-62,6,24);X.fillRect(12,-62,6,24);X.fillStyle=AX.skin;X.fillRect(-18,-68,6,8);X.fillRect(12,-68,6,8)}
  else if(pose==='wave'){const up=Math.sin(t*14)*7;X.fillStyle=AX.skin;X.fillRect(-16,-40,6,16);X.fillStyle=AX.hood;X.fillRect(-16,-40,6,7);X.fillRect(12,-58+up,6,22);X.fillStyle=AX.skin;X.fillRect(12,-64+up,6,8)}
  else{X.fillStyle=AX.skin;X.fillRect(-16,-40,6,16+w*2);X.fillRect(10,-40,6,16-w*2);X.fillStyle=AX.hood;X.fillRect(-16,-40,6,8);X.fillRect(10,-40,6,8)}
  // head — front-facing (or 3/4), TWO big friendly cartoon eyes in every pose. Flip-facing keeps both eyes visible.
  const hy=-58;circ(0,hy,14,AX.skin);
  ell(-13.4,hy+1.6,3.4,4.2,AX.skin);ell(13.4,hy+1.6,3.4,4.2,AX.skin);
  // messy, spiky dark hair sits on top of the head; forehead and face stay open
  X.fillStyle=AX.hair;X.beginPath();X.arc(0,hy-5,14.4,Math.PI*1.08,-0.08);X.fill();
  [[-14,hy-8,-18,hy-22,-6,hy-12],[-8,hy-16,-10,hy-28,0,hy-16],[-1,hy-17,3,hy-30,9,hy-16],[6,hy-14,16,hy-26,14,hy-8],[11,hy-7,18,hy-18,15,hy-1],[-15,hy-2,-20,hy-14,-11,hy-7],[2,hy-19,8,hy-32,11,hy-17],[-5,hy-17,-3,hy-26,3,hy-17]].forEach(s=>poly(s,AX.hair));
  // thick friendly eyebrows
  X.strokeStyle=AX.hair;X.lineWidth=2.4;X.lineCap='round';
  X.beginPath();X.moveTo(-10.4,hy-7.4);X.quadraticCurveTo(-5.8,hy-10.8,-1.5,hy-7.6);X.stroke();
  X.beginPath();X.moveTo(1.5,hy-7.6);X.quadraticCurveTo(5.8,hy-10.8,10.4,hy-7.4);X.stroke();
  // two large warm brown eyes with white highlights (never a single side-profile eye)
  const axEye=(ex,ey)=>{ell(ex,ey,5.2,6.0,'#fff');circ(ex,ey+0.55,3.2,AX.eye);circ(ex,ey+0.8,1.55,'#2a1810');circ(ex-1.55,ey-1.55,1.6,'#fff');circ(ex+1.35,ey+1.85,0.7,'rgba(255,255,255,0.8)')};
  axEye(-5.9,hy-0.8);axEye(5.9,hy-0.8);
  // small nose, rosy cheeks, light freckles on both sides
  ell(0,hy+4.8,2.2,1.7,'#d4956a');
  ell(-10.2,hy+6.0,3.6,2.2,'rgba(232,120,100,0.42)');ell(10.2,hy+6.0,3.6,2.2,'rgba(232,120,100,0.42)');
  [[-8.2,hy+4.8],[-5.6,hy+6.0],[-7.4,hy+7.0],[8.2,hy+4.8],[5.6,hy+6.0],[7.4,hy+7.0]].forEach(p=>circ(p[0],p[1],0.62,'rgba(140,80,40,0.5)'));
  // joyful grin; bigger open smile when jumping or cheering
  if(air||pose==='cheer'||pose==='cape'){ell(0,hy+8.4,5.6,3.9,'#8d3b3b');X.fillStyle='#fff';rrect(-4.0,hy+5.8,8.0,2.3,1);X.fill()}
  else{X.fillStyle='#8d3b3b';X.beginPath();X.moveTo(-6.0,hy+6.2);X.quadraticCurveTo(0,hy+12.2,6.0,hy+6.2);X.quadraticCurveTo(0,hy+8.6,-6.0,hy+6.2);X.fill();X.fillStyle='#fff';rrect(-3.8,hy+6.4,7.6,1.9,0.8);X.fill()}
  // hats / hoods (theme costumes sit on the locked face + hair)
  if(A.dino){X.fillStyle='#66bb6a';X.beginPath();X.arc(0,hy-4,15,Math.PI,TAU);X.fill();poly([-8,hy-16,-12,hy-28,-2,hy-18],'#66bb6a');poly([8,hy-16,12,hy-28,2,hy-18],'#66bb6a');circ(-12,hy-28,2.4,'#ef5350');circ(12,hy-28,2.4,'#ef5350');ell(-6,hy-8,3,2,'#81c784');ell(6,hy-8,3,2,'#81c784')}
  else if(A.explorer){X.fillStyle='#c9a227';rrect(-15,hy-16,30,7,2);X.fill();ell(0,hy-18,8,4,'#e0c056');X.fillStyle='#8d6e63';X.fillRect(-16,hy-11,32,3)}
  else if(A.santa){X.fillStyle='#e53935';poly([-13,hy-10,0,hy-28,13,hy-10],'#e53935');circ(0,hy-28,3.2,'#fff');X.fillStyle='#fff';X.fillRect(-13,hy-12,26,4)}
  else if(A.party||A.witch){if(A.witch){poly([-12,hy-8,0,hy-30,12,hy-8],'#37474f');circ(0,hy-30,2.4,'#ffd54f')}else{poly([-10,hy-8,0,hy-26,10,hy-8],'#ffd54f');circ(0,hy-26,2.2,'#43a047')}}
  X.restore()}
function drawItem(k,x,y,t){X.save();X.translate(x,y);
  if(k==='star'){const s=1+Math.sin(t*5)*0.08;X.rotate(Math.sin(t*2)*0.2);X.scale(s,s);circ(0,0,17,'rgba(255,240,150,0.35)');star5(0,0,13,'#ffd54f');star5(0,0,8,'#fff59d');circ(-3,-3,2,'#fff')}
  else if(k==='fish'){X.rotate(Math.sin(t*3)*0.12);circ(0,0,11,'#ffc107');circ(0,0,8,'#ff8f00');circ(0,0,4,'#ffe082');circ(-3,-3,1.6,'#fff8e1')}
  else if(k==='remote'){X.rotate(-0.3);X.fillStyle='#5e5a7a';rrect(-6,-16,12,32,4);X.fill();circ(0,-9,3,'#ff5252');for(let i=0;i<3;i++){circ(-2.5,-1+i*5,1.5,'#cfd8dc');circ(2.5,-1+i*5,1.5,'#cfd8dc')}}
  else if(k==='earring'){X.beginPath();X.arc(0,-8,5,0,TAU);sl(2,'#ffd54f');poly([0,-3,7,6,0,15,-7,6],'#e1bee7');poly([0,0,4,6,0,11,-4,6],'#fff');circ(-2,5,1.2,'#fff')}
  else if(k==='bunny'){ell(0,-10,12,10,'#fff');circ(10,-18,8,'#fff');ell(8,-30,3,9,'#fff',-0.2);ell(14,-29,3,9,'#fff',0.3);ell(8,-30,1.4,6,'#ffc1d6',-0.2);circ(12,-19,1.4,'#333');circ(17,-17,1.3,'#ff8fb3');circ(-11,-8,4,'#fff')}
  else if(k==='duckling'){const b=Math.abs(Math.sin(t*8))*2;X.translate(0,-b);ell(0,-8,9,7,'#fff176');circ(7,-16,6,'#fff176');poly([12,-16,17,-15,12,-13],'#ffb74d');circ(8,-17,1.3,'#333')}
  else if(k==='dino'){const b=Math.abs(Math.sin(t*6))*2;X.translate(0,-b);ell(0,-10,14,9,'#66bb6a');circ(-10,-16,8,'#66bb6a');poly([-16,-16,-24,-14,-16,-11],'#ff8a65');circ(-12,-18,1.6,'#333');poly([6,-16,14,-26,10,-14],'#66bb6a');poly([2,-18,6,-28,8,-16],'#66bb6a');ell(8,-8,5,4,'#81c784')}else if(k==='yarn'){X.rotate(t*0);circ(0,-12,12,'#f48fb1');X.strokeStyle='#ec407a';X.lineWidth=1.5;for(let i=-1;i<=1;i++){X.beginPath();X.ellipse(0,-12,11,5,i*0.9,0,TAU);X.stroke()}}
  X.restore()}
