// ================= places: cozy scenes with furniture platforms, drawn once into cached chunks =================
const WOOD='#d7a77a',WOODD='#b07f55',PINK='#f8a5c8',PINKD='#e07fab',PURP='#c3a6f0',PURPD='#9f7fd8',CREAM='#fff6ea',MINT='#b9efd9';
function sky(x0,x1,top,bot){const gr=X.createLinearGradient(0,top,0,0);gr.addColorStop(0,'#ffd6ec');gr.addColorStop(1,'#d6ecff');X.fillStyle=gr;X.fillRect(x0,top,x1-x0,-top)}
function cloud(x,y,s){X.globalAlpha=0.9;ell(x,y,40*s,14*s,'#fff');circ(x-16*s,y-8*s,14*s,'#fff');circ(x+8*s,y-14*s,18*s,'#fff');X.globalAlpha=1}
function heart(x,y,s,c){heartP(x,y,s,c)}
function wallBg(sec,top,bot){const x0=sec.x0,x1=sec.x1,w=x1-x0;
  if(sec.out){sky(x0,x1,top,0);for(let x=x0+60;x<x1;x+=260)cloud(x,top+90+((x*7)%50),1+((x/260)%2)*0.3);
    X.fillStyle='#f7c6e0';X.beginPath();X.moveTo(x0,-40);for(let x=x0;x<=x1;x+=40)X.lineTo(x,-60-24*Math.sin(x*0.006));X.lineTo(x1,0);X.lineTo(x0,0);X.fill();
    X.fillStyle='#d9b8f5';X.beginPath();X.moveTo(x0,-20);for(let x=x0;x<=x1;x+=40)X.lineTo(x,-34-14*Math.sin(x*0.011+1));X.lineTo(x1,0);X.lineTo(x0,0);X.fill();
    X.fillStyle='#a8e6b4';X.fillRect(x0,0,w,bot);X.fillStyle='#8fd6a0';X.fillRect(x0,0,w,6);
    for(let x=x0+12;x<x1;x+=46){const c=['#ff8fc8','#fff59d','#c5a3ff'][((x/46)|0)%3];circ(x,16+(x%3)*8,4,c);circ(x,16+(x%3)*8,1.6,'#fff')}return}
  X.fillStyle=sec.wall;X.fillRect(x0,top,w,-top);X.fillStyle=sec.wall2;
  if(sec.pat==='dots')for(let y=top+20;y<-60;y+=40)for(let x=x0+((y/40)%2)*20;x<x1;x+=40)circ(x,y,3.5,sec.wall2);
  else if(sec.pat==='stripes')for(let x=x0;x<x1;x+=36)X.fillRect(x,top,14,-top);
  else if(sec.pat==='hearts')for(let y=top+30;y<-60;y+=56)for(let x=x0+((y/56)%2)*28;x<x1;x+=56)heartP(x,y,7,sec.wall2);
  else if(sec.pat==='flowers')for(let y=top+30;y<-60;y+=60)for(let x=x0+((y/60)%2)*30;x<x1;x+=60){for(let i=0;i<5;i++){const a=i*TAU/5;circ(x+Math.cos(a)*5,y+Math.sin(a)*5,3.5,sec.wall2)}circ(x,y,2.5,'#fff')}
  else if(sec.pat==='tiles'){X.fillRect(x0,-200,w,140);X.strokeStyle='rgba(255,255,255,0.7)';X.lineWidth=2;for(let x=x0;x<x1;x+=28){X.beginPath();X.moveTo(x,-200);X.lineTo(x,-60);X.stroke()}for(let y=-200;y<-60;y+=28){X.beginPath();X.moveTo(x0,y);X.lineTo(x1,y);X.stroke()}}
  else if(sec.pat==='rainbow'){const C=['#ffb3c7','#ffd6a5','#fdffb6','#caffbf','#bde0fe','#d7c6ff'];C.forEach((c,i)=>{X.fillStyle=c;X.fillRect(x0,top+60+i*8,w,8)})}
  X.fillStyle='#fff';X.fillRect(x0,-14,w,14);X.fillStyle='rgba(0,0,0,0.06)';X.fillRect(x0,-3,w,3);
  X.fillStyle=sec.floor;X.fillRect(x0,0,w,bot);X.fillStyle='rgba(0,0,0,0.07)';for(let x=x0;x<x1;x+=90)X.fillRect(x+((x/90)%2)*30,0,2,bot);X.fillRect(x0,24,w,2)}
// ---------- decor (no collision) ----------
const DECO={
  window(o){const w=o.w||110,h=o.h||90,y=o.y||-230;X.fillStyle='#fff';rrect(o.x-6,y-6,w+12,h+12,10);X.fill();const gr=X.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#ffd6ec');gr.addColorStop(1,'#cfe8ff');X.fillStyle=gr;rrect(o.x,y,w,h,6);X.fill();
    cloud(o.x+w*0.4,y+h*0.4,0.5);X.fillStyle='#fff';X.fillRect(o.x+w/2-2,y,4,h);X.fillRect(o.x,y+h/2-2,w,4);X.fillStyle=o.c||'#f8a5c8';X.fillRect(o.x-14,y-14,16,h+30);X.fillRect(o.x+w-2,y-14,16,h+30)},
  picture(o){const y=o.y||-220;X.fillStyle=o.c||WOOD;rrect(o.x-4,y-4,58,48,6);X.fill();X.fillStyle='#fff7fb';X.fillRect(o.x,y,50,40);
    if(o.k==='heart')heartP(o.x+25,y+22,12,'#ff8fc8');else if(o.k==='cat'){circ(o.x+25,y+24,10,'#f4a03c');poly([o.x+16,y+18,o.x+18,y+8,o.x+23,y+15],'#f4a03c');poly([o.x+34,y+18,o.x+32,y+8,o.x+27,y+15],'#f4a03c')}else{circ(o.x+18,y+16,7,'#ffe066');X.fillStyle='#a8e6b4';X.fillRect(o.x,y+28,50,12)}},
  plant(o){X.fillStyle=o.c||'#ffb3c7';rrect(o.x-14,-30,28,30,6);X.fill();for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*0.45;ell(o.x+Math.cos(a)*18,-34+Math.sin(a)*18,7,14,'#7fcf9a',a+Math.PI/2)}},
  lamp(o){X.fillStyle='#bfa5e8';X.fillRect(o.x-2,-130,4,130);ell(o.x,0,16,4,'#9f7fd8');poly([o.x-22,-130,o.x+22,-130,o.x+14,-162,o.x-14,-162],'#ffe0f0')},
  rug(o){ell(o.x+o.w/2,4,o.w/2,8,o.c||'#e7d4ff');X.beginPath();X.ellipse(o.x+o.w/2,4,o.w/2-8,5,0,0,TAU);X.lineWidth=2;X.strokeStyle='#fff';X.stroke()},
  fence(o){X.fillStyle='#fff';for(let x=o.x;x<o.x+o.w;x+=26){rrect(x,-70,16,70,5);X.fill()}X.fillRect(o.x,-52,o.w,6);X.fillRect(o.x,-24,o.w,6)},
  flowers(o){for(let i=0;i<o.n;i++){const x=o.x+i*22;X.fillStyle='#7fcf9a';X.fillRect(x-1,-26,2,26);const c=['#ff8fc8','#c5a3ff','#fff176'][i%3];for(let k=0;k<5;k++){const a=k*TAU/5;circ(x+Math.cos(a)*5,-28+Math.sin(a)*5,4,c)}circ(x,-28,3,'#fff')}},
  skyline(o){X.fillStyle='rgba(180,160,230,0.55)';for(let i=0;i<o.n;i++){const x=o.x+i*70,h=60+((i*37)%70);rrect(x,-90-h,56,h+40,6);X.fill()}},
  pond(o){X.fillStyle='#bfe3ff';X.beginPath();X.ellipse(o.x+o.w/2,-8,o.w/2,22,0,0,TAU);X.fill();X.strokeStyle='#fff';X.lineWidth=2;for(let i=0;i<6;i++){X.beginPath();X.arc(o.x+40+i*(o.w-80)/5,-8,10,0.2,Math.PI-0.2);X.stroke()}
    for(let i=0;i<3;i++){X.fillStyle='#7fcf9a';X.fillRect(o.x+10+i*14,-40,3,40)}},
  abc(o){const L='ABCDEF';const C=['#ff8fc8','#ffb74d','#fff176','#81c784','#64b5f6','#b39ddb'];for(let i=0;i<6;i++){rrect(o.x+i*44,-300,38,38,8);X.fillStyle=C[i];X.fill();txt(L[i],o.x+i*44+19,-280,24,'#fff',{st:'rgba(0,0,0,0.2)',sw:3})}},
  hooks(o){X.fillStyle=WOODD;X.fillRect(o.x,-170,o.w,10);for(let i=0;i<4;i++){const c=['#ff8fc8','#64b5f6','#ffd54f','#b39ddb'][i];rrect(o.x+12+i*44,-160,30,40,10);X.fillStyle=c;X.fill()}},
  easel(o){X.strokeStyle=WOODD;X.lineWidth=5;X.beginPath();X.moveTo(o.x,0);X.lineTo(o.x+30,-120);X.lineTo(o.x+60,0);X.stroke();X.fillStyle='#fff';X.fillRect(o.x+4,-120,52,60);heartP(o.x+30,-88,12,'#c5a3ff');circ(o.x+18,-104,6,'#ffd54f')},
  basket(o){X.fillStyle='#d7a77a';rrect(o.x-26,-30,52,30,8);X.fill();X.fillStyle='rgba(0,0,0,0.08)';for(let i=0;i<4;i++)X.fillRect(o.x-24,-26+i*7,48,2);circ(o.x-10,-32,10,'#b39ddb');circ(o.x+8,-34,10,'#80deea')},
  tvwall(o){X.fillStyle='#4a3f6b';rrect(o.x,-180,140,84,8);X.fill();X.fillStyle='#8fb8ff';rrect(o.x+6,-174,128,72,5);X.fill();heartP(o.x+70,-136,14,'#ffc1e3')},
  slideD(o){}
};
// ---------- furniture: draw + platforms (world y: floor 0, up negative) ----------
const P=(x1,x2,y,o)=>Object.assign({x1,x2,y1:y,y2:y},o||{});
const FURN={
  couch:{w:220,pl:o=>[P(o.x+14,o.x+206,-62),P(o.x+22,o.x+198,-120),P(o.x,o.x+22,-88),P(o.x+198,o.x+220,-88)],
    draw(o){const x=o.x,c=o.c||PINK,d=o.d||PINKD;X.fillStyle=d;rrect(x+14,-122,192,70,20);X.fill();X.fillStyle=c;rrect(x+16,-120,188,66,18);X.fill();
      X.fillStyle=d;rrect(x+8,-66,204,52,14);X.fill();X.fillStyle=c;rrect(x+14,-64,94,30,12);X.fill();rrect(x+112,-64,94,30,12);X.fill();
      X.fillStyle=d;rrect(x,-90,26,80,12);X.fill();rrect(x+194,-90,26,80,12);X.fill();X.fillStyle=WOODD;X.fillRect(x+16,-12,8,12);X.fillRect(x+196,-12,8,12);
      circ(x+60,-95,10,'#fff3c4');heartP(x+160,-92,10,'#fff')}},
  table:{pl:o=>[P(o.x,o.x+o.w,-o.h)],draw(o){const x=o.x,w=o.w,h=o.h;X.fillStyle=o.c||WOOD;rrect(x-4,-h-8,w+8,12,5);X.fill();X.fillStyle=o.d||WOODD;X.fillRect(x+6,-h+4,8,h-4);X.fillRect(x+w-14,-h+4,8,h-4);
      if(o.cloth){X.fillStyle='#ffd6ec';X.fillRect(x-4,-h-6,w+8,26);X.fillStyle='#fff';for(let i=0;i<w;i+=16)circ(x+i+6,-h+20,4,'#fff')}}},
  tvstand:{pl:o=>[P(o.x,o.x+160,-64)],draw(o){const x=o.x;X.fillStyle=PURP;rrect(x,-64,160,64,8);X.fill();X.fillStyle=PURPD;rrect(x+10,-52,66,40,6);X.fill();rrect(x+84,-52,66,40,6);X.fill();
      X.fillStyle='#4a3f6b';rrect(x+20,-170,120,96,8);X.fill();X.fillStyle='#9ec5ff';rrect(x+26,-164,108,80,5);X.fill();cloud(x+80,-130,0.45);X.fillStyle='#4a3f6b';X.fillRect(x+74,-76,12,12)}},
  shelf:{pl:o=>{const a=[];for(let y=70;y<=o.h;y+=70)a.push(P(o.x,o.x+(o.w||90),-y));if(o.h%70)a.push(P(o.x,o.x+(o.w||90),-o.h));return a},
    draw(o){const x=o.x,w=o.w||90,h=o.h;X.fillStyle=o.c||WOODD;rrect(x,-h-6,w,h+6,6);X.fill();X.fillStyle=o.c2||'#f3dcc4';X.fillRect(x+6,-h,w-12,h-6);
      for(let y=70;y<=h;y+=70){X.fillStyle=o.c||WOODD;X.fillRect(x,-y-4,w,6)}const C=['#ff8fc8','#90caf9','#ffe082','#ce93d8','#a5d6a7'];
      for(let y=0;y<h-30;y+=70)for(let i=0;i<4;i++){X.fillStyle=C[(i+y/70)%5];X.fillRect(x+10+i*18,-y-56+(i%2)*6,14,50-(i%2)*6)}}},
  counter:{pl:o=>[P(o.x,o.x+o.w,-96)],draw(o){const x=o.x,w=o.w;X.fillStyle='#fff';X.fillRect(x,-90,w,90);X.fillStyle='#e9d5ff';for(let i=0;i<w-20;i+=70){rrect(x+10+i,-80,60,70,6);X.fill();circ(x+60+i,-46,3,'#9f7fd8')}
      X.fillStyle='#f8bbd0';rrect(x-6,-100,w+12,12,4);X.fill();if(o.sink){X.fillStyle='#cfd8dc';X.fillRect(x+w*0.5,-104,50,6);X.strokeStyle='#b0bec5';X.lineWidth=5;X.beginPath();X.moveTo(x+w*0.5+40,-104);X.lineTo(x+w*0.5+40,-128);X.lineTo(x+w*0.5+24,-128);X.stroke()}}},
  fridge:{pl:o=>[P(o.x,o.x+84,-212)],draw(o){const x=o.x;X.fillStyle='#e3f2fd';rrect(x,-212,84,212,12);X.fill();X.fillStyle='#bbdefb';X.fillRect(x,-140,84,4);X.fillStyle='#90a4ae';X.fillRect(x+70,-196,5,40);X.fillRect(x+70,-120,5,50);heartP(x+30,-170,8,'#ff8fc8');circ(x+50,-100,6,'#ffd54f')}},
  bed:{pl:o=>[P(o.x+20,o.x+240,-58),P(o.x,o.x+22,-128)],draw(o){const x=o.x;X.fillStyle=PURPD;rrect(x,-130,22,130,8);X.fill();X.fillStyle='#fff';rrect(x+20,-70,220,44,10);X.fill();
      X.fillStyle=o.c||'#f8a5c8';rrect(x+80,-66,162,40,10);X.fill();X.fillStyle='rgba(255,255,255,0.6)';for(let i=0;i<5;i++)heartP(x+100+i*30,-46,6,'#fff');X.fillStyle='#fff';rrect(x+26,-82,50,22,10);X.fill();X.fillStyle=WOODD;X.fillRect(x+230,-26,10,26);X.fillRect(x+22,-26,10,26)}},
  windowseat:{pl:o=>[P(o.x,o.x+170,-66)],draw(o){const x=o.x;DECO.window({x:x+30,y:-240,w:110,h:120,c:o.c});X.fillStyle=WOOD;X.fillRect(x,-56,170,56);X.fillStyle=PURP;rrect(x-2,-70,174,18,8);X.fill();circ(x+30,-78,12,'#ffd6ec');circ(x+142,-78,12,'#d7c6ff')}},
  cattree:{pl:o=>[P(o.x-10,o.x+60,-80),P(o.x+40,o.x+110,-160),P(o.x-10,o.x+64,-240)],draw(o){const x=o.x;X.fillStyle='#e8d1b5';X.fillRect(x+44,-240,16,240);X.fillStyle='rgba(0,0,0,0.08)';for(let y=-230;y<0;y+=10)X.fillRect(x+44,y,16,3);
      X.fillStyle=PURP;rrect(x-12,-86,74,14,7);X.fill();rrect(x+38,-166,74,14,7);X.fill();rrect(x-12,-248,78,16,8);X.fill();X.fillStyle=PURPD;rrect(x-8,-262,70,18,9);X.fill();circ(x+20,-40,8,'#ff8fc8');X.strokeStyle='#ff8fc8';X.lineWidth=2;X.beginPath();X.moveTo(x+20,-86);X.lineTo(x+20,-48);X.stroke()}},
  armchair:{pl:o=>[P(o.x+14,o.x+106,-54),P(o.x,o.x+20,-84),P(o.x+100,o.x+120,-84),P(o.x+16,o.x+104,-128)],draw(o){const x=o.x,c=o.c||'#c3a6f0',d=o.d||'#9f7fd8';X.fillStyle=d;rrect(x+12,-130,96,80,18);X.fill();X.fillStyle=c;rrect(x+12,-60,96,40,12);X.fill();X.fillStyle=d;rrect(x,-86,22,74,10);X.fill();rrect(x+98,-86,22,74,10);X.fill();X.fillStyle=WOODD;X.fillRect(x+14,-12,8,12);X.fillRect(x+98,-12,8,12);X.fillStyle='#fff';for(let i=0;i<3;i++)circ(x+36+i*24,-100,5,'#fff')}},
  rocker:{pl:o=>[P(o.x+10,o.x+90,-50),P(o.x+70,o.x+96,-140)],draw(o){const x=o.x;X.strokeStyle=WOODD;X.lineWidth=6;X.beginPath();X.ellipse(x+50,-6,60,10,0,0.1,Math.PI-0.1);X.stroke();X.fillStyle=WOOD;X.fillRect(x+16,-50,6,44);X.fillRect(x+80,-140,8,134);X.fillRect(x+6,-54,90,8);X.fillStyle='#ffd6ec';rrect(x+12,-62,78,10,5);X.fill();rrect(x+70,-130,16,70,6);X.fill()}},
  cubbies:{pl:o=>[P(o.x,o.x+200,-50),P(o.x,o.x+200,-100),P(o.x,o.x+200,-152)],draw(o){const x=o.x;X.fillStyle='#ffe0b2';rrect(x,-156,200,156,8);X.fill();const C=['#ff8fc8','#90caf9','#ffe082','#ce93d8','#a5d6a7'];
      for(let r=0;r<3;r++)for(let i=0;i<4;i++){X.fillStyle='#fff8ee';X.fillRect(x+8+i*48,-146+r*50,40,40);X.fillStyle=C[(i+r)%5];rrect(x+14+i*48,-130+r*50,28,24,6);X.fill()}}},
  kidtable:{pl:o=>[P(o.x,o.x+o.w,-44)],draw(o){const x=o.x,w=o.w;X.fillStyle=o.c||'#90caf9';rrect(x-4,-50,w+8,10,5);X.fill();X.fillStyle='#64b5f6';X.fillRect(x+6,-42,7,42);X.fillRect(x+w-13,-42,7,42);
      for(const cx of [x-26,x+w+8]){X.fillStyle='#ffb74d';rrect(cx,-26,20,6,3);X.fill();X.fillRect(cx+2,-20,4,20);X.fillRect(cx+14,-20,4,20)}}},
  desk:{pl:o=>[P(o.x,o.x+150,-80)],draw(o){const x=o.x;X.fillStyle=WOOD;rrect(x-4,-86,158,12,5);X.fill();X.fillStyle=WOODD;X.fillRect(x,-74,50,74);X.fillRect(x+136,-74,10,74);X.fillStyle='#ff5252';circ(x+120,-96,10,'#ff5252');X.fillStyle='#7cb342';X.fillRect(x+119,-110,3,6);X.fillStyle='#ffd54f';X.fillRect(x+70,-94,30,8)}},
  slide:{pl:o=>[P(o.x,o.x+32,-60),P(o.x,o.x+32,-120),P(o.x,o.x+54,-182),P(o.x+54,o.x+230,-182,{y2:-8,slide:1})],
    draw(o){const x=o.x;X.strokeStyle='#ff8fc8';X.lineWidth=6;X.beginPath();X.moveTo(x+2,0);X.lineTo(x+2,-182);X.moveTo(x+30,0);X.lineTo(x+30,-182);X.stroke();X.lineWidth=4;for(let y=-60;y>-182;y-=60){X.beginPath();X.moveTo(x+2,y);X.lineTo(x+30,y);X.stroke()}
      X.fillStyle='#c3a6f0';rrect(x-4,-190,62,12,5);X.fill();poly([x-4,-190,x+27,-226,x+58,-190],'#ff8fc8');X.strokeStyle='#ffd54f';X.lineWidth=14;X.lineCap='round';X.beginPath();X.moveTo(x+54,-186);X.quadraticCurveTo(x+150,-150,x+232,-10);X.stroke();X.lineWidth=4;X.strokeStyle='#ffb300';X.stroke()}},
  swings:{pl:o=>[P(o.x+30,o.x+70,-46),P(o.x+130,o.x+170,-46),P(o.x,o.x+200,-204)],draw(o){const x=o.x;X.strokeStyle='#b39ddb';X.lineWidth=8;X.beginPath();X.moveTo(x-20,0);X.lineTo(x+10,-204);X.lineTo(x+190,-204);X.lineTo(x+220,0);X.stroke();
      X.lineWidth=2;X.strokeStyle='#9e9e9e';for(const sx of [50,150]){X.beginPath();X.moveTo(x+sx-16,-204);X.lineTo(x+sx-16,-46);X.moveTo(x+sx+16,-204);X.lineTo(x+sx+16,-46);X.stroke();X.fillStyle='#ff8fc8';rrect(x+sx-22,-50,44,8,4);X.fill()}}},
  sandbox:{pl:o=>[P(o.x,o.x+170,-18)],draw(o){const x=o.x;X.fillStyle=WOOD;X.fillRect(x,-20,170,20);X.fillStyle='#ffe9a8';X.fillRect(x+8,-16,154,10);circ(x+40,-20,8,'#ffe9a8');X.fillStyle='#ff8fc8';rrect(x+110,-34,18,16,4);X.fill()}},
  tree:{pl:o=>[P(o.x-80,o.x+4,-150),P(o.x+4,o.x+90,-232),P(o.x-40,o.x+40,-300)],draw(o){const x=o.x;X.fillStyle='#b98563';X.beginPath();X.moveTo(x-16,0);X.lineTo(x-10,-300);X.lineTo(x+10,-300);X.lineTo(x+16,0);X.fill();
      X.fillStyle='#b98563';rrect(x-84,-156,90,10,5);X.fill();rrect(x,-238,94,10,5);X.fill();for(const [cx,cy,r] of [[x,-330,70],[x-60,-300,50],[x+60,-300,54],[x-30,-360,44],[x+34,-366,40]])circ(cx,cy,r,o.c||'#9be3b0');
      for(let i=0;i<7;i++)circ(x-60+i*20,-316+((i*13)%40),4,'#ffb3d9')}},
  bench:{pl:o=>[P(o.x,o.x+130,-40),P(o.x+4,o.x+126,-76)],draw(o){const x=o.x;X.fillStyle=WOOD;rrect(x,-46,130,10,4);X.fill();rrect(x+4,-80,122,10,4);X.fill();rrect(x+4,-64,122,8,4);X.fill();X.fillStyle='#7e57c2';X.fillRect(x+8,-36,6,36);X.fillRect(x+116,-36,6,36)}},
  picnic:{pl:o=>[P(o.x,o.x+160,-62),P(o.x-20,o.x+180,-30)],draw(o){const x=o.x;X.fillStyle=WOODD;X.fillRect(x-20,-32,200,8);X.fillStyle='#ffd6ec';X.fillRect(x-4,-68,168,10);X.fillStyle='#fff';for(let i=0;i<168;i+=21)X.fillRect(x-4+i,-68,10,10);X.fillStyle=WOODD;X.fillRect(x+20,-58,8,58);X.fillRect(x+132,-58,8,58)}},
  rail:{pl:o=>[P(o.x,o.x+o.w,-92)],draw(o){X.fillStyle='#fff';X.fillRect(o.x,-96,o.w,8);for(let x=o.x;x<o.x+o.w;x+=22)X.fillRect(x,-90,5,90)}},
  stand:{pl:o=>[P(o.x,o.x+60,-o.h)],draw(o){const x=o.x;X.fillStyle='#fff';X.fillRect(x+26,-o.h,8,o.h);ell(x+30,0,24,5,'#e0e0e0');X.fillStyle=PURP;rrect(x-2,-o.h-6,64,10,5);X.fill();if(o.pot!==0){X.save();X.translate(0,-o.h-4);DECO.plant({x:x+30,c:'#ffd6ec'});X.restore()}}},
  wallshelf:{pl:o=>[P(o.x,o.x+o.w,o.y)],draw(o){X.fillStyle=WOOD;rrect(o.x,o.y-2,o.w,10,4);X.fill();X.fillStyle=WOODD;poly([o.x+10,o.y+8,o.x+24,o.y+8,o.x+10,o.y+24],WOODD);poly([o.x+o.w-10,o.y+8,o.x+o.w-24,o.y+8,o.x+o.w-10,o.y+24],WOODD);
      if(o.cab){X.fillStyle='#fff';X.fillRect(o.x+4,o.y+8,o.w-8,60);X.fillStyle='#e9d5ff';for(let i=0;i<o.w-20;i+=60){rrect(o.x+10+i,o.y+14,50,48,6);X.fill()}}}},
  dresser:{pl:o=>[P(o.x,o.x+110,-100)],draw(o){const x=o.x;X.fillStyle='#fff';rrect(x,-100,110,100,8);X.fill();X.fillStyle='#f8bbd0';for(let i=0;i<3;i++){rrect(x+8,-92+i*30,94,24,6);X.fill();circ(x+55,-80+i*30,3,'#e07fab')}X.fillStyle=WOOD;X.fillRect(x+10,-6,8,6);X.fillRect(x+92,-6,8,6)}},
  rock:{pl:o=>[P(o.x+6,o.x+74,-38)],draw(o){ell(o.x+40,-14,42,26,'#d1c4e9');ell(o.x+30,-24,14,6,'rgba(255,255,255,0.5)')}},
  doghouse:{pl:o=>[P(o.x-6,o.x+50,-128,{y2:-96}),P(o.x+50,o.x+106,-96,{y1:-128})],draw(o){const x=o.x;X.fillStyle='#ffd6ec';X.fillRect(x,-96,100,96);poly([x-10,-92,x+50,-132,x+110,-92],'#c3a6f0');X.fillStyle='#7e57c2';X.beginPath();X.arc(x+50,0,22,Math.PI,TAU);X.fill();txt('PLAY',x+50,-74,13,'#9f7fd8')}}
};
// interactable/visual extras that live in the dynamic layer: cup, blanket, nap, yarn, leaves, cookie, butterflies, ducks
const PLACES=[
 {k:'dad',n:"Dad's House",th:'home',w:2600,col:'#ff8fc8',
  secs:[{x0:0,x1:1000,wall:'#efe1ff',wall2:'#e2ccff',pat:'dots',floor:'#e5c09a'},{x0:1000,x1:1800,wall:'#ffe3ef',wall2:'#ffd0e4',pat:'tiles',floor:'#f3e5f5'},{x0:1800,x1:2600,out:1}],
  deco:[{t:'window',x:60},{t:'picture',x:420,k:'heart'},{t:'rug',x:200,w:340},{t:'lamp',x:30},{t:'plant',x:840},{t:'window',x:1560,y:-250},{t:'picture',x:1110,k:'cat',y:-260},{t:'fence',x:1800,w:800},{t:'flowers',x:2280,n:6}],
  furn:[{t:'couch',x:180},{t:'table',x:450,w:110,h:48},{t:'tvstand',x:640},{t:'shelf',x:860,h:230},{t:'counter',x:1040,w:300,sink:1},{t:'fridge',x:1350},{t:'table',x:1500,w:170,h:76,cloth:1},{t:'tree',x:2000},{t:'doghouse',x:2200},{t:'bench',x:2400}],
  stars:[[300,-152],[905,-268],[1392,-250],[2010,-336],[2560,-40]],fish:[[120,-30],[300,-90],[500,-80],[720,-100],[905,-110],[1100,-130],[1250,-130],[1580,-110],[1950,-180],[2250,-160],[2460,-110],[2500,-30]],
  extras:[{t:'nap',x:200,y:-62,w:180},{t:'blanket',x:560,y:0,w:70},{t:'cup',x:520,y:-48},{t:'yarn',x:2350,y:0},{t:'fly',x:2100},{t:'fly',x:2450}],
  task:{who:'dad',x:780,item:'remote',ix:1395,iy:-212,hi:'dadhi',ty:'dadty',say:'Have you seen my TV remote?',thanks:'My remote! Thank you!'}},
 {k:'mom',n:"Mom's Apartment",th:'cozy',w:2400,col:'#c3a6f0',
  secs:[{x0:0,x1:900,wall:'#f6ecff',wall2:'#ead9ff',pat:'stripes',floor:'#e8c7a5'},{x0:900,x1:1650,wall:'#ffe9f3',wall2:'#ffd3e6',pat:'hearts',floor:'#ecd8f5'},{x0:1650,x1:2400,out:1}],
  deco:[{t:'picture',x:500,k:'sun',y:-240},{t:'lamp',x:860},{t:'rug',x:480,w:260,c:'#ffd6ec'},{t:'picture',x:1120,k:'heart',y:-250},{t:'window',x:1440,y:-260},{t:'skyline',x:1700,n:10},{t:'flowers',x:2150,n:5}],
  furn:[{t:'windowseat',x:100},{t:'shelf',x:340,h:160},{t:'couch',x:500,c:'#c3a6f0',d:'#9f7fd8'},{t:'table',x:760,w:60,h:60},{t:'bed',x:1000},{t:'dresser',x:1290},{t:'wallshelf',x:1280,y:-210,w:140},{t:'cattree',x:1480},{t:'table',x:1820,w:110,h:62},{t:'stand',x:2060,h:110},{t:'rail',x:1700,w:700}],
  stars:[[185,-170],[385,-205],[1100,-160],[1525,-290],[2320,-140]],fish:[[60,-30],[190,-110],[600,-100],[780,-100],[960,-30],[1150,-100],[1350,-140],[1350,-250],[1560,-200],[1880,-100],[2000,-130],[2250,-130]],
  extras:[{t:'nap',x:110,y:-66,w:150},{t:'blanket',x:1100,y:-58,w:120},{t:'cup',x:788,y:-60},{t:'nap',x:1470,y:-240,w:60},{t:'fly',x:2200}],
  task:{who:'mom',x:680,item:'earring',ix:2090,iy:-110,hi:'momhi',ty:'momty',say:'I lost my sparkly earring!',thanks:'My earring! Thank you!'}},
 {k:'klub',n:'Meadow Brook',th:'home',w:2600,col:'#ffd54f',
  secs:[{x0:0,x1:800,wall:'#e3f2ff',wall2:'#cfe6ff',pat:'rainbow',floor:'#ffe0b2'},{x0:800,x1:1600,wall:'#fff0f6',wall2:'#ffd6e8',pat:'dots',floor:'#d7ecff'},{x0:1600,x1:2600,out:1}],
  deco:[{t:'hooks',x:400,w:190},{t:'window',x:640,y:-250},{t:'abc',x:880},{t:'easel',x:1460},{t:'rug',x:880,w:420,c:'#ffe082'},{t:'fence',x:2500,w:100},{t:'flowers',x:1620,n:3}],
  furn:[{t:'cubbies',x:100},{t:'bench',x:360},{t:'shelf',x:560,h:140,w:110},{t:'kidtable',x:900,w:140,c:'#ffb3c7'},{t:'kidtable',x:1130,w:140},{t:'desk',x:1310},{t:'slide',x:1700},{t:'swings',x:2040},{t:'sandbox',x:2340}],
  stars:[[200,-200],[615,-190],[970,-110],[1727,-240],[2140,-252]],fish:[[60,-30],[150,-80],[250,-130],[420,-60],[620,-80],[960,-70],[1200,-70],[1380,-120],[1712,-90],[1850,-110],[2100,-80],[2420,-60]],
  extras:[{t:'nap',x:370,y:-40,w:110},{t:'blanket',x:1000,y:0,w:90},{t:'cup',x:1340,y:-80},{t:'fly',x:2200},{t:'fly',x:1900}],
  task:{who:'teacher',x:1250,item:'dino',ix:2420,iy:-18,hi:'teachhi',ty:'teachty',say:'Our class dinosaur is hiding!',thanks:'Our dino is back! Thank you, Alex!'}},
 {k:'park',n:'The Park',th:'park',w:2800,col:'#81c784',
  secs:[{x0:0,x1:2800,out:1}],
  deco:[{t:'flowers',x:120,n:6},{t:'pond',x:2050,w:600},{t:'flowers',x:1540,n:4},{t:'fence',x:2700,w:100}],
  furn:[{t:'tree',x:320},{t:'bench',x:760},{t:'tree',x:1100,c:'#c8f0c9'},{t:'rock',x:1400},{t:'picnic',x:1640},{t:'tree',x:2760,c:'#ffd6ec'}],
  stars:[[320,-336],[825,-110],[1150,-268],[1720,-100],[2560,-60]],fish:[[100,-30],[250,-180],[400,-260],[600,-30],[820,-70],[1000,-30],[1090,-180],[1440,-70],[1700,-90],[1900,-30],[2200,-60],[2450,-30]],
  extras:[{t:'leaves',x:560},{t:'leaves',x:1250},{t:'leaves',x:1900},{t:'fly',x:200},{t:'fly',x:700},{t:'fly',x:1500},{t:'ducks',x:2150},{t:'nap',x:770,y:-40,w:110}],
  task:{who:'duck',x:2500,item:'duckling',ix:1250,iy:0,hi:'duckhi',ty:'duckty',say:'Quack! Where is my baby?',thanks:'Quack quack! Thank you!',hide:1}},
 {k:'gma',n:"Grandma Gail's",th:'cozy',w:2400,col:'#ce93d8',
  secs:[{x0:0,x1:1000,wall:'#f9e8ff',wall2:'#efd2ff',pat:'flowers',floor:'#d9b38c'},{x0:1000,x1:1700,wall:'#ffeef0',wall2:'#ffd9df',pat:'tiles',floor:'#f6e7d8'},{x0:1700,x1:2400,wall:'#eafaf2',wall2:'#d2f3e3',pat:'stripes',floor:'#e5c8a8'}],
  deco:[{t:'picture',x:200,k:'cat',y:-250},{t:'basket',x:330},{t:'rug',x:60,w:500,c:'#e1bee7'},{t:'lamp',x:950},{t:'window',x:1200,y:-260},{t:'window',x:2220,y:-250},{t:'plant',x:1720},{t:'picture',x:880,k:'heart',y:-250}],
  furn:[{t:'armchair',x:110},{t:'rocker',x:420},{t:'shelf',x:640,h:210,w:100,c:'#a1887f',c2:'#ffe9f2'},{t:'table',x:1060,w:150,h:72,cloth:1},{t:'counter',x:1300,w:230},{t:'wallshelf',x:1300,y:-210,w:230,cab:1},{t:'cattree',x:1780},{t:'windowseat',x:1960,c:'#b9efd9'},{t:'stand',x:2250,h:100}],
  stars:[[170,-160],[690,-245],[1430,-250],[1820,-300],[2280,-140]],fish:[[50,-30],[160,-90],[300,-30],[470,-90],[690,-110],[880,-30],[1130,-110],[1400,-130],[1600,-30],[1800,-120],[2050,-110],[2350,-30]],
  extras:[{t:'nap',x:126,y:-54,w:80},{t:'blanket',x:430,y:-50,w:70},{t:'cup',x:1180,y:-72},{t:'cookie',x:1100,y:-72},{t:'yarn',x:780,y:0,c:'#80deea'},{t:'nap',x:1990,y:-66,w:120}],
  task:{who:'gma',x:560,item:'yarn',ix:1480,iy:-210,hi:'gmahi',ty:'gmaty',say:'Have you seen my yarn ball?',thanks:'My yarn! Have a cookie!'}}
];
// build platforms for a place
function buildPlace(pl){const plats=[];for(const f of pl.furn){const F=FURN[f.t];if(F.pl)plats.push(...F.pl(f))}for(const p of plats){if(p.y2==null)p.y2=p.y1}return plats}
function surfY(p,x){return p.y1+(p.y2-p.y1)*clamp((x-p.x1)/(p.x2-p.x1),0,1)}
// ---------- chunk cache (only the visible chunks are kept: memory-friendly on the iPad's A10) ----------
const CW=400;let CH={};
function chunk(pl,i){const key=pl.k+':'+i;let c=CH[key];if(c&&c.g===genCache&&c.H===H)return c;
  const gy=GY(),cv2=document.createElement('canvas');cv2.width=Math.ceil(CW*RS)+1;cv2.height=Math.ceil(H*RS);const x=cv2.getContext('2d');x.scale(RS,RS);x.translate(-i*CW,gy);
  const keep=X;X=x;try{const x0=i*CW,x1=x0+CW;X.beginPath();X.rect(x0,-gy,CW,H);X.clip();
    for(const s of pl.secs)if(s.x1>x0&&s.x0<x1)wallBg(s,-gy,H-gy);
    for(const d of pl.deco)if((d.x||0)<x1+300&&(d.x||0)+(d.w||200)>x0-300)DECO[d.t](d);
    for(const f of pl.furn)if(f.x<x1+260&&f.x+(f.w||240)>x0-260)FURN[f.t].draw(f)}finally{X=keep}
  c=CH[key]={c:cv2,g:genCache,H,used:T};const ks=Object.keys(CH);if(ks.length>5){ks.sort((a,b)=>CH[a].used-CH[b].used);delete CH[ks[0]]}return c}
function drawScene(pl){const i0=Math.floor(camX/CW),i1=Math.floor((camX+W)/CW);for(let i=i0;i<=i1;i++){if(i<0||i*CW>=pl.w)continue;const c=chunk(pl,i);c.used=T;X.drawImage(c.c,i*CW-camX,0,CW+1/RS,H)}
  if(camX+W>pl.w){X.fillStyle='#f3e5ff';X.fillRect(pl.w-camX,0,W,H)}}
