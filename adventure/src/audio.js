const AUD=(()=>{
  let C=null,master,musicBus,musicDuck,sfxBus,voiceBus,noiseBuf,unlocked=false,silentEl=null,clips={},loading=false;
  let muted=localStorage.getItem('adba_muted')==='1';
  const R=Math.random,rr=(a,b)=>a+R()*(b-a);
  const now=()=>C?C.currentTime:0;const stats={voice:0,last:'',dropped:0,sfx:0,said:[]};
  try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
  function build(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;C=new AC();
    master=C.createGain();master.gain.value=muted?0:0.9;const comp=C.createDynamicsCompressor();comp.threshold.value=-12;comp.ratio.value=4;
    master.connect(comp);comp.connect(C.destination);
    const bus=v=>{const g=C.createGain();g.gain.value=v;g.connect(master);return g};
    musicBus=bus(0.3);musicDuck=C.createGain();musicDuck.connect(musicBus);sfxBus=bus(0.62);voiceBus=bus(1.2);
    const sr=C.sampleRate;noiseBuf=C.createBuffer(1,sr*2,sr);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=R()*2-1;
    setInterval(schedule,25);}
  function unlock(){try{if(!C)build();if(!C)return;try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
      if(C.state!=='running')C.resume().catch(()=>{});
      const s=C.createBufferSource();s.buffer=C.createBuffer(1,1,22050);s.connect(C.destination);s.start(0);
      // looping near-silent <audio> => 'playback' audio session so sound works even with the iPhone ringer/silent switch on
      if(!silentEl){silentEl=document.createElement('audio');silentEl.setAttribute('playsinline','');silentEl.setAttribute('webkit-playsinline','');silentEl.setAttribute('x-webkit-airplay','deny');silentEl.preload='auto';silentEl.loop=true;silentEl.src=SILENT_MP3;silentEl.volume=0.01}
      if(silentEl.paused&&!document.hidden){const p=silentEl.play();p&&p.catch&&p.catch(()=>{})}
      if(!unlocked){unlocked=true;loadClips()}}catch(e){console.warn('unlock',e)}}
  ['touchstart','touchend','pointerdown','mousedown','click','keydown'].forEach(ev=>window.addEventListener(ev,unlock,{capture:true,passive:true}));
  document.addEventListener('visibilitychange',()=>{if(!C)return;if(document.hidden){C.suspend&&C.suspend().catch(()=>{});silentEl&&silentEl.pause()}
    else if(unlocked){C.resume().catch(()=>{});if(silentEl){const p=silentEl.play();p&&p.catch&&p.catch(()=>{})}}});
  function loadClips(){if(loading)return;loading=true;for(const k in CLIPS){try{const b=atob(CLIPS[k]),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);
    const p=C.decodeAudioData(u.buffer,x=>{clips[k]=x},()=>{});p&&p.catch&&p.catch(()=>{})}catch(e){}}}
  const ok=()=>C&&!muted&&C.state==='running';
  const safe=fn=>function(){try{if(!sfxOK())return;if(!ok())return;stats.sfx++;return fn.apply(null,arguments)}catch(e){}};
  function g(v,out){const x=C.createGain();x.gain.value=v;x.connect(out);return x}
  function env(x,t,a,h,r,v){x.gain.setValueAtTime(0.0001,t);x.gain.linearRampToValueAtTime(v,t+a);x.gain.setValueAtTime(v,t+a+h);x.gain.exponentialRampToValueAtTime(0.0001,t+a+h+r)}
  function o(type,f,t,d,out){const x=C.createOscillator();x.type=type;x.frequency.setValueAtTime(f,t);x.connect(out);x.start(t);x.stop(t+d+0.05);return x}
  function f(type,fr,q,out){const x=C.createBiquadFilter();x.type=type;x.frequency.value=fr;x.Q.value=q||0.7;x.connect(out);return x}
  function n(t,d,out){const s=C.createBufferSource();s.buffer=noiseBuf;s.loop=true;s.connect(out);s.start(t,R());s.stop(t+d+0.05);return s}
  const mtof=m=>440*Math.pow(2,(m-69)/12);
  const blip=(type,f0,f1,t,d,v,out)=>{const G=g(0,out||sfxBus);env(G,t,0.004,d*0.3,d*0.7,v);const x=o(type,f0,t,d,f('lowpass',5000,0.7,G));x.frequency.exponentialRampToValueAtTime(f1,t+d);return x};
  // ---------- fart machine: 12 synthesized varieties, rate-limited so old iPhones never get audio spam ----------
  let fNext=0,fTimes=[];
  function blat(t,f0,f1,d,lfo,depth,lp,q,nz,v,type){const G=g(0,sfxBus);env(G,t,0.008,d*0.6,d*0.38,v);const F=f('lowpass',lp,q,G);
    const x=o(type||'sawtooth',f0,t,d,F);x.frequency.setValueAtTime(f0,t);x.frequency.linearRampToValueAtTime(f1,t+d);
    if(lfo){const L=C.createOscillator(),LG=C.createGain();L.frequency.value=lfo;LG.gain.value=f0*depth;L.connect(LG);LG.connect(x.frequency);L.start(t);L.stop(t+d+0.05)}
    if(nz){const N=g(0,sfxBus);env(N,t,0.008,d*0.5,d*0.4,v*nz);n(t,d,f('lowpass',lp*0.6,1,N))}}
  const FARTS=[
    t=>blat(t,95,70,0.32,24,0.35,650,2.5,0.35,0.26),                                   // 0 classic
    t=>{blat(t,170,210,0.45,9,0.12,1400,3,0.1,0.2);blat(t+0.42,210,120,0.6,11,0.18,1200,3,0.15,0.2)}, // 1 long trumpet
    t=>blat(t,250,300,0.09,40,0.2,1500,2,0.2,0.2),                                     // 2 tiny toot
    t=>blat(t,58,42,1.1,11,0.45,380,2,0.6,0.32),                                       // 3 big rumbly
    t=>blat(t,420,620,0.35,38,0.12,2600,6,0.05,0.12,'square'),                         // 4 squeaky
    t=>{blat(t,80,60,0.25,30,0.5,500,1.5,1.2,0.22);for(let i=0;i<4;i++)blip('sine',rr(300,700),rr(120,250),t+0.04+i*0.05,0.05,0.06)}, // 5 wet
    t=>{for(let i=0;i<8;i++)blat(t+i*0.065,rr(110,150),90,0.05,0,0,900,2,0.3,0.2)},    // 6 machine-gun
    t=>{const G=g(0,sfxBus);env(G,t,0.02,0.6,0.2,0.12);const x=o('triangle',200,t,0.85,G);x.frequency.linearRampToValueAtTime(700,t+0.35);x.frequency.linearRampToValueAtTime(150,t+0.8);blat(t+0.6,90,60,0.25,26,0.4,600,2,0.3,0.2)}, // 7 slide-whistle
    t=>{for(let i=0;i<5;i++){const s=t+i*0.09+rr(0,0.04);blat(s,rr(80,180),rr(60,120),rr(0.04,0.1),30,0.3,800,2,0.4,0.2)}}, // 8 sputter
    t=>blat(t,170,55,0.75,14,0.25,900,3,0.2,0.24),                                     // 9 sad trombone
    t=>{blat(t,140,160,0.08,30,0.2,1200,2,0.2,0.2);blat(t+0.13,120,100,0.14,30,0.25,1000,2,0.2,0.22)}, // 10 double toot
    t=>{blat(t,300,700,0.22,30,0.1,2400,5,0.05,0.1,'square');blat(t+0.2,75,55,0.4,22,0.45,550,2,0.5,0.28)} // 11 squeal-then-blat
  ];
  function fartPlay(k,force){const t=now();if(t<fNext)return;fTimes=fTimes.filter(x=>t-x<1);if(fTimes.length>=(force?5:3))return;fNext=t+0.12;fTimes.push(t);
    k=k==null?(R()*FARTS.length)|0:Array.isArray(k)?k[(R()*k.length)|0]:k;FARTS[k](t);stats.farts=(stats.farts||0)+1}
  // ---------- SFX (all original synth) ----------
  let lastShot=0;
  const SFX={
    shoot:safe(()=>{const t=now();if(t-lastShot<0.07)return;lastShot=t;blip('square',1400,700,t,0.06,0.025);blip('triangle',900,500,t,0.05,0.03)}),
    pop:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.001,0.01,0.08,0.22);n(t,0.1,f('highpass',1100,0.7,G));blip('sine',700,1500,t,0.09,0.12)}),
    zap:safe(()=>{const t=now();blip('square',300,120,t,0.08,0.06)}),
    honey:safe((big)=>{const t=now();(big?[84,88,91,96]:[88,93]).forEach((m,i)=>{const G=g(0,sfxBus);env(G,t+i*0.05,0.002,0.03,0.25,0.09);o('triangle',mtof(m),t+i*0.05,0.3,G);const G2=g(0,sfxBus);env(G2,t+i*0.05,0.002,0.01,0.12,0.03);o('sine',mtof(m+12),t+i*0.05,0.16,G2)})}),
    power:safe(()=>{const t=now();[60,64,67,72,67,72,76,79,84].forEach((m,i)=>{blip('square',mtof(m),mtof(m),t+i*0.05,0.06,0.05);blip('triangle',mtof(m-12),mtof(m-12),t+i*0.05,0.06,0.07)})}),
    shield:safe(()=>{const t=now();for(let i=0;i<5;i++){blip('sine',400+i*150,1000+i*200,t+i*0.06,0.1,0.1)}}),
    shieldPop:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.001,0.01,0.12,0.3);n(t,0.15,f('highpass',1500,0.7,G));blip('sine',1200,300,t,0.2,0.15)}),
    hurt:safe(()=>{const t=now();blip('square',600,180,t,0.28,0.08);blip('triangle',300,90,t,0.28,0.1)}),
    heart:safe(()=>{const t=now();[[76,0],[84,0.09]].forEach(([m,d])=>{const G=g(0,sfxBus);env(G,t+d,0.002,0.04,0.3,0.1);o('triangle',mtof(m),t+d,0.35,G)})}),
    check:safe(()=>{const t=now();[72,76,79,84].forEach((m,i)=>{const G=g(0,sfxBus);env(G,t+i*0.08,0.002,0.03,0.5,0.08);o('triangle',mtof(m),t+i*0.08,0.6,G);o('sine',mtof(m+12),t+i*0.08,0.4,g(0.3,G))})}),
    bossHit:safe(()=>{const t=now();blip('square',260,120,t,0.07,0.06)}),
    bossDown:safe(()=>{const t=now();for(let i=0;i<10;i++)blip('square',mtof(84-i*3),mtof(80-i*3),t+i*0.06,0.07,0.06);const G=g(0,sfxBus);env(G,t+0.6,0.002,0.05,0.6,0.3);n(t+0.6,0.8,f('lowpass',1500,0.7,G))}),
    warn:safe(()=>{const t=now();for(let i=0;i<2;i++)blip('square',1100,1100,t+i*0.14,0.07,0.05)}),
    whoosh:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.05,0.08,0.25,0.16);const F=f('bandpass',500,1.5,G);n(t,0.4,F);F.frequency.exponentialRampToValueAtTime(3000,t+0.35)}),
    squawk:safe(()=>{const t=now();for(let k=0;k<2;k++){const s=t+k*0.16,G=g(0,sfxBus);env(G,s,0.01,0.06,0.07,0.12);const F=f('bandpass',1500,3,G);const x=o('sawtooth',700,s,0.15,F);x.frequency.linearRampToValueAtTime(1100,s+0.04);x.frequency.linearRampToValueAtTime(600,s+0.14)}}),
    puff:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.02,0.05,0.25,0.18);const F=f('lowpass',600,1,G);n(t,0.35,F);F.frequency.exponentialRampToValueAtTime(200,t+0.3)}),
    beep:safe(()=>{const t=now();[0,0.1].forEach((d,i)=>blip('square',i?660:990,i?660:990,t+d,0.07,0.05))}),
    roar:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.05,0.4,0.3,0.22);const F=f('lowpass',700,2,G);const x=o('sawtooth',110,t,0.8,F);x.frequency.linearRampToValueAtTime(150,t+0.25);x.frequency.linearRampToValueAtTime(90,t+0.75);
      const L=C.createOscillator(),LG=C.createGain();L.frequency.value=22;LG.gain.value=25;L.connect(LG);LG.connect(x.frequency);L.start(t);L.stop(t+0.85)}),
    boing:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.005,0.15,0.3,0.14);const x=o('sine',180,t,0.45,G);const L=C.createOscillator(),LG=C.createGain();L.frequency.value=16;LG.gain.value=50;L.connect(LG);LG.connect(x.frequency);L.start(t);L.stop(t+0.5)}),
    firework:safe(()=>{const t=now();blip('sine',300,1400,t,0.35,0.05);const s=t+0.38,G=g(0,sfxBus);env(G,s,0.001,0.02,0.5,0.25);n(s,0.6,f('lowpass',2500,0.7,G));
      for(let i=0;i<12;i++){const c=s+0.1+rr(0,0.6),B=g(0,sfxBus);env(B,c,0.001,0.003,0.03,rr(0.04,0.1));n(c,0.04,f('highpass',3000,0.7,B))}}),
    cheer:safe(()=>{const t=now();for(let k=0;k<10;k++){const s=t+rr(0,0.5),G=g(0,sfxBus),d=rr(0.4,0.8);env(G,s,0.06,d*0.5,d*0.5,0.03);const F=f('bandpass',rr(900,1500),2,G);const x=o('sawtooth',rr(330,520),s,d,F);x.frequency.linearRampToValueAtTime(rr(450,700),s+d*0.6)}
      for(let i=0;i<24;i++){const s=t+rr(0.05,1.4),G=g(0,sfxBus);env(G,s,0.001,0.005,0.03,rr(0.05,0.12));n(s,0.05,f('bandpass',rr(1000,2400),1.2,G))}}),
    fanfare:safe(()=>{const t=now();[[67,0],[72,0.12],[76,0.24],[79,0.36],[76,0.54],[79,0.66],[84,0.8]].forEach(([m,d],i)=>{const G=g(0,sfxBus);env(G,t+d,0.01,i==6?0.5:0.08,0.3,0.09);o('square',mtof(m),t+d,0.9,f('lowpass',3000,0.7,G));o('triangle',mtof(m-12),t+d,0.9,g(0.5,G))})}),
    splat:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.002,0.03,0.18,0.32);const F=f('lowpass',1400,1.5,G);n(t,0.25,F);F.frequency.exponentialRampToValueAtTime(250,t+0.2);blip('sine',420,90,t,0.18,0.16)}),
    plop:safe(()=>{const t=now();blip('sine',900,300,t,0.09,0.09)}),
    munch:safe(()=>{const t=now();for(let i=0;i<3;i++){const G=g(0,sfxBus);env(G,t+i*0.09,0.002,0.02,0.05,0.22);n(t+i*0.09,0.08,f('bandpass',1800-i*300,1.2,G))}blip('triangle',mtof(84),mtof(91),t+0.28,0.1,0.06)}),
    whistle:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.01,0.35,0.12,0.09);const x=o('sine',2300,t,0.5,G);const L=C.createOscillator(),LG=C.createGain();L.frequency.value=28;LG.gain.value=120;L.connect(LG);LG.connect(x.frequency);L.start(t);L.stop(t+0.55)}),
    honk:safe(()=>{const t=now();[0,0.22].forEach((d,i)=>{const G=g(0,sfxBus);env(G,t+d,0.01,0.14,0.05,0.07);o('square',i?233:311,t+d,0.2,f('lowpass',1600,1,G));o('square',i?175:233,t+d,0.2,f('lowpass',1600,1,G))})}),
    fart:safe((k,force)=>fartPlay(k,force)),
    wet:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.001,0.04,0.2,0.34);const F=f('bandpass',900,1.4,G);n(t,0.28,F);F.frequency.exponentialRampToValueAtTime(220,t+0.25);
      for(let i=0;i<4;i++){const s=t+0.05+i*0.04+rr(0,0.03);blip('sine',rr(500,900),rr(150,300),s,0.06,0.07)}}),
    mega:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.002,0.25,0.9,0.5);n(t,1.2,f('lowpass',500,0.8,G));const B=g(0,sfxBus);env(B,t,0.002,0.1,0.5,0.4);const x=o('sine',140,t,0.7,B);x.frequency.exponentialRampToValueAtTime(30,t+0.6)}),
    charge:safe(()=>{const t=now();[60,64,67,72,76,79].forEach((m,i)=>blip('square',mtof(m),mtof(m),t+i*0.045,0.05,0.05))}),
    meow:safe((k)=>{const t=now();k=k==null?(R()*3)|0:k;const d=[0.42,0.3,0.55][k],f0=[620,760,540][k],G=g(0,sfxBus);env(G,t,0.03,d*0.55,d*0.4,0.13);
      const F=f('bandpass',1200,4,G);F.frequency.setValueAtTime(900,t);F.frequency.linearRampToValueAtTime(2000,t+d*0.35);F.frequency.linearRampToValueAtTime(1000,t+d);
      const x=o('sawtooth',f0,t,d,F);x.frequency.setValueAtTime(f0*0.85,t);x.frequency.linearRampToValueAtTime(f0*1.25,t+d*0.3);x.frequency.linearRampToValueAtTime(f0*0.8,t+d);
      const G2=g(0,sfxBus);env(G2,t,0.03,d*0.5,d*0.4,0.05);const y=o('triangle',f0*2,t,d,G2);y.frequency.linearRampToValueAtTime(f0*2.4,t+d*0.3);y.frequency.linearRampToValueAtTime(f0*1.6,t+d)}),
    purr:safe((d)=>{const t=now();d=d||1.2;const G=g(0,sfxBus);env(G,t,0.15,d,0.3,0.22);const A=C.createGain();A.gain.value=0.5;A.connect(G);const L=C.createOscillator(),LG=C.createGain();L.frequency.value=24;LG.gain.value=0.5;L.connect(LG);LG.connect(A.gain);L.start(t);L.stop(t+d+0.5);
      n(t,d+0.4,f('lowpass',260,1.5,A));o('sine',48,t,d+0.4,g(0.5,A))}),
    chime:safe(()=>{const t=now();[84,88,91,96,100].forEach((m,i)=>{const G=g(0,sfxBus);env(G,t+i*0.06,0.002,0.02,0.5,0.07);o('sine',mtof(m),t+i*0.06,0.6,G);o('triangle',mtof(m+12),t+i*0.06,0.3,g(0.3,G))})}),
    treat:safe(()=>{const t=now();blip('sine',900,1400,t,0.08,0.1);blip('triangle',1400,1800,t+0.07,0.08,0.06)}),
    hop:safe(()=>{const t=now();blip('sine',300,620,t,0.12,0.09)}),
    hop2:safe(()=>{const t=now();blip('sine',500,900,t,0.12,0.08)}),
    land:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.002,0.01,0.06,0.08);n(t,0.08,f('lowpass',500,1,G))}),
    knock:safe(()=>{const t=now();blip('triangle',1800,1700,t,0.05,0.08);blip('triangle',1500,1400,t+0.18,0.05,0.07);blip('triangle',1300,1250,t+0.3,0.04,0.05)}),
    quack:safe(()=>{const t=now();for(let k=0;k<2;k++){const s=t+k*0.17,G=g(0,sfxBus);env(G,s,0.01,0.05,0.06,0.1);const F=f('bandpass',1100,3,G);const x=o('sawtooth',420,s,0.13,F);x.frequency.linearRampToValueAtTime(330,s+0.12)}}),
    squeak:safe(()=>{const t=now();blip('sine',1800,2600,t,0.08,0.08);blip('sine',2600,1900,t+0.08,0.06,0.06)}),
    pat:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.002,0.01,0.05,0.06);n(t,0.06,f('lowpass',800,1,G))}),
    rustle:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.02,0.15,0.25,0.16);n(t,0.4,f('bandpass',2500,0.8,G))}),
    sticker:safe(()=>{const t=now();[72,76,79,84,79,84,88].forEach((m,i)=>{const G=g(0,sfxBus);env(G,t+i*0.1,0.005,0.06,0.4,0.08);o('triangle',mtof(m),t+i*0.1,0.5,G);o('sine',mtof(m+12),t+i*0.1,0.3,g(0.3,G))})}),
    click:safe(()=>{const t=now();blip('square',900,1300,t,0.05,0.07)}),
    note:safe((m)=>{const t=now(),G=g(0,sfxBus);env(G,t,0.003,0.05,0.45,0.13);o('triangle',mtof(m),t,0.55,G);const G2=g(0,sfxBus);env(G2,t,0.002,0.01,0.25,0.05);o('sine',mtof(m+12),t,0.3,G2)}),
    munch:safe(()=>{const t=now();for(let i=0;i<4;i++){const s=t+i*0.17,G=g(0,sfxBus);env(G,s,0.004,0.02,0.07,0.14);n(s,0.1,f('bandpass',rr(500,900),1.2,G));blip('sine',rr(220,300),150,s,0.06,0.05)}}),
    shutter:safe(()=>{const t=now();for(const d of [0,0.07]){const G=g(0,sfxBus);env(G,t+d,0.001,0.01,0.05,0.25);n(t+d,0.07,f('highpass',2500,0.7,G))}blip('sine',1500,2200,t+0.15,0.12,0.06)}),
    // v1.7 music maker voices (pentatonic notes are picked by the caller, so it always sounds nice)
    inst:safe((m,k)=>{const t=now(),G=g(0,sfxBus);if(k==='bell'){env(G,t,0.002,0.02,0.9,0.16);o('sine',mtof(m),t,1,G);const G2=g(0,sfxBus);env(G2,t,0.002,0.01,0.4,0.05);o('sine',mtof(m)*2.76,t,0.5,G2)}
      else if(k==='pluck'){env(G,t,0.002,0.01,0.45,0.15);o('triangle',mtof(m),t,0.5,f('lowpass',2600,0.7,G))}
      else if(k==='flute'){env(G,t,0.05,0.18,0.3,0.12);const x=o('sine',mtof(m),t,0.6,G);const L=C.createOscillator(),LG=C.createGain();L.frequency.value=5;LG.gain.value=mtof(m)*0.008;L.connect(LG);LG.connect(x.frequency);L.start(t);L.stop(t+0.6)}
      else if(k==='drum'){env(G,t,0.002,0.02,0.25,0.3);const x=o('sine',mtof(m-24),t,0.3,G);x.frequency.exponentialRampToValueAtTime(mtof(m-36),t+0.25)}
      else {env(G,t,0.003,0.05,0.5,0.13);o('triangle',mtof(m),t,0.6,G);const G2=g(0,sfxBus);env(G2,t,0.002,0.01,0.25,0.04);o('sine',mtof(m+12),t,0.3,G2)}}),
    hoot:safe(()=>{const t=now();[[0,0.35],[0.45,0.25],[0.75,0.5]].forEach(([d,l])=>{const G=g(0,sfxBus);env(G,t+d,0.04,l*0.5,l*0.5,0.14);const x=o('sine',420,t+d,l,f('lowpass',900,0.7,G));x.frequency.linearRampToValueAtTime(360,t+d+l)})}),
    splash:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.003,0.03,0.3,0.22);n(t,0.35,f('bandpass',1400,0.8,G));blip('sine',500,1200,t,0.12,0.08)}),
    crackle:safe(()=>{const t=now();for(let i=0;i<4;i++){const G=g(0,sfxBus),d=i*0.06+R()*0.04;env(G,t+d,0.001,0.005,0.03,0.12);n(t+d,0.05,f('highpass',2500,0.7,G))}}),
    plane:safe(()=>{const t=now(),G=g(0,sfxBus);env(G,t,0.4,1.6,1,0.1);n(t,3,f('lowpass',500,0.7,G));const G2=g(0,sfxBus);env(G2,t,0.4,1.6,1,0.03);o('triangle',110,t,3,G2)}),
  };
  // ---------- one voice at a time, with ducking ----------
  let curEnd=0,curPrio=0,queue=[],curSrc=null;
  // counting: each tap speaks its number NOW, cutting any voice line still playing (never overlaps, never skipped)
  function num(n){if(!ok())return false;const b=clips['n'+n];if(!b)return false;try{if(curSrc)curSrc.stop()}catch(e){}queue.length=0;curEnd=0;stats.num=(stats.num||0)+1;return say0('n'+n,3)}
  // counting rule (Brett, 2026-10-24): speak numbers only while counting a small set (<=20); never repeat a number already said this round;
  // taps <0.35 s apart are shown, not spoken, and the final total is said once after the burst; numbers cut each other (never stack)
  const CR={said:new Set(),lastT:-9,pend:0,tm:0,max:20};
  function count(n,reset){if(reset||n<=1)CR.said.clear();const t=performance.now()/1000,fast=t-CR.lastT<0.35;CR.lastT=t;clearTimeout(CR.tm);
    if(!(n>=1&&n<=CR.max))return false;
    if(fast){CR.pend=n;CR.tm=setTimeout(()=>{const p=CR.pend;CR.pend=0;if(p&&!CR.said.has(p)&&num(p))CR.said.add(p)},450);stats.countFast=(stats.countFast||0)+1;return true}
    if(CR.said.has(n))return true;const ok=num(n);if(ok)CR.said.add(n);return ok}
  count.reset=()=>{CR.said.clear();CR.pend=0;clearTimeout(CR.tm)};
  /*vguard*/let _vk='',_vt=0,_sx=[];function sfxOK(){const n=Date.now();_sx=_sx.filter(x=>n-x<350);if(_sx.length>=3)return false;_sx.push(n);return true}
  function say(k,prio,fromQ){const n=Date.now();if(k===_vk&&n-_vt<4000)return false;if((prio||1)<3&&C&&now()<curEnd-0.05)return false;const r=say0(k,prio);queue.length=0;if(r){_vk=k;_vt=n}return r}
  function say0(k,prio,fromQ){prio=prio||1;if(!ok())return false;const b=clips[k];if(!b)return false;const t=now();
    if(t<curEnd||queue.length&&!fromQ){if(prio>=2&&!queue.some(q=>q.k===k)){if(queue.length>=2){const lo=queue.reduce((a,q,i)=>q.prio<queue[a].prio?i:a,0);if(queue[lo].prio<=prio&&prio<3)queue.splice(lo,1);else if(prio>=3&&queue.length<3){}else{stats.dropped++;return false}}queue.push({k,prio});queue.sort((a,b)=>b.prio-a.prio);return true}stats.dropped++;return false}
    const s=C.createBufferSource();s.buffer=b;s.connect(voiceBus);s.start(t+0.02);curSrc=s;curEnd=t+0.02+b.duration+0.2;curPrio=prio;stats.voice++;stats.last=k;stats.said.push(k);
    musicDuck.gain.cancelScheduledValues(t);musicDuck.gain.setTargetAtTime(0.28,t,0.04);musicDuck.gain.setTargetAtTime(1,curEnd,0.2);
    sfxBus.gain.cancelScheduledValues(t);sfxBus.gain.setTargetAtTime(0.38,t,0.04);sfxBus.gain.setTargetAtTime(0.62,curEnd,0.2);return true}
  // ---------- free text: ElevenLabs pack for known lines; animal recs stay; no Piper v/ stitching ----------
  const vbuf={},tKeys=[];let tTimer=0,tN=0;
  function packSayText(text){
    if(!window.KVX)return false;
    const raw=String(text||'').trim();
    const tl=raw.toLowerCase().replace(/[^a-z0-9' !?]+/g,' ').replace(/\s+/g,' ').trim();
    if(/^(hi alex!?|hey alex!?|hello!?|hi!?)$/.test(tl)){KVX.say('a_hi');return true;}
    if(raw.length<48 && /\b(yay|yes|great job|you did it|awesome|nice job|woohoo|all right|good job|you win)\b/.test(tl)){KVX.praise();return true;}
    if(raw.length<40 && /\b(oops|try again|uh oh|uh-oh)\b/.test(tl)){KVX.praise('try');return true;}
    return false;
  }
  function vwords(s){s=String(s).replace(/\u2019/g,"'").toLowerCase().replace(/[^a-z0-9' ]+/g,' ').replace(/(^| )'|'( |$)/g,' ');return s.split(' ').filter(function(x){return x})}
  const ANS={meow:'m',meows:'m',mew:'m',mews:'m',purr:'purr',purrs:'purr',quack:'a_duck',quacks:'a_duck',woof:'a_dog',woofs:'a_dog',ribbit:'a_frog',ribbits:'a_frog',hoot:'a_owl',hoots:'a_owl',hoo:'a_owl'};
  function plan(text){const w0=vwords(text),w=[],sx=[];w0.forEach(function(x){const a=ANS[x];if(a){if(sx.indexOf(a)<0)sx.push(a)}else w.push(x)});const out=[];let i=0;const B=typeof PHR!=='undefined'?PHR:{};
    while(i<w.length){if(/^\d+$/.test(w[i])){if(clips['n'+w[i]]||+w[i]<=30)out.push('n'+w[i]);i++;continue}let j=Math.min(w.length,i+40),hit=null;
      for(;j>i;j--){const k=w.slice(i,j).join(' ');if(B[k]){hit=B[k];break}}
      if(hit){out.push('v:'+hit);i=j}else{stats.miss=stats.miss||[];if(stats.miss.length<50)stats.miss.push(w[i]);i++}}sx.forEach(function(a){out.push('s:'+(a==='m'?'meow'+(1+Math.floor(Math.random()*5)):a))});return out}
  function loadV(id){if(vbuf[id])return vbuf[id];vbuf[id]=fetch('v/'+id+'.mp3').then(function(r){if(!r.ok)throw 0;return r.arrayBuffer()}).then(function(ab){return new Promise(function(res,rej){const p=C.decodeAudioData(ab,res,rej);p&&p.catch&&p.catch(rej)})}).catch(function(){delete vbuf[id];return null});return vbuf[id]}
  function sayText(text,prio){prio=prio||1;if(!ok())return false;
    try{if(packSayText(text))return true}catch(e){}
    const p=plan(text).filter(function(k){return k.charAt(0)==='s'||k.charAt(0)==='n'});
    if(!p.length)return false;const key='t:'+p.join('+'),my=++tN;
    const fire=function(tries){if(C&&now()<curEnd-0.05&&prio<3){if(prio>=2&&tries<40&&my===tN){clearTimeout(tTimer);tTimer=setTimeout(function(){fire(tries+1)},100)}return}say(key,prio)};
    if(clips[key]){fire(0);return true}
    Promise.all(p.map(function(k){return k.charAt(0)==='n'?Promise.resolve(clips[k]||null):k.charAt(0)==='s'?Promise.resolve(clips[k.slice(2)]?{sfx:clips[k.slice(2)]}:null):loadV(k.slice(2))})).then(function(bs){bs=bs.filter(function(b){return b});
      /* real animal recordings go AFTER the words (0.15 s gap, capped 1.8 s, faded) - never overlapping speech */
      bs=bs.map(function(b){if(!b.sfx)return b;const r=b.sfx,sr=C.sampleRate,n=Math.min(r.length,Math.round(1.8*r.sampleRate)),lead=Math.round(0.1*sr),m=Math.round(n*sr/r.sampleRate),o=C.createBuffer(1,lead+m,sr),d=o.getChannelData(0),s=r.getChannelData(0),f=Math.round(0.25*sr);for(let q=0;q<m;q++){let v=s[Math.min(n-1,Math.floor(q*r.sampleRate/sr))]*0.9;if(q>m-f)v*=(m-q)/f;d[lead+q]=v}return o});if(!bs.length||!C)return;
      const sr=C.sampleRate,gap=Math.round(sr*0.05);let len=0;bs.forEach(function(b){len+=b.length+gap});const out=C.createBuffer(1,len,sr),d=out.getChannelData(0);let o=0;
      bs.forEach(function(b){d.set(b.getChannelData(0),o);o+=b.length+gap});clips[key]=out;tKeys.push(key);if(tKeys.length>80)delete clips[tKeys.shift()];
      stats.text=(stats.text||0)+1;if(my===tN||prio>=2)fire(0)}).catch(function(){});return true}
  function prefetch(text){/* piper phrase prefetch disabled */}
  setInterval(()=>{if(queue.length&&C&&now()>=curEnd){const q=queue.shift();say(q.k,q.prio,true)}},60);
  // ---------- music: ORIGINAL chiptune themes (8 bars of 8th notes each; written for this game) ----------
  const NN={c:0,'c#':1,d:2,'d#':3,e:4,f:5,'f#':6,g:7,'g#':8,a:9,'a#':10,b:11};
  const P=s=>s.trim().split(/\s+/).map(x=>x==='.'?0:x==='-'?-1:(NN[x.slice(0,-1)]+12*(+x.slice(-1)+1)));
  const CH={C:[48,52,55],F:[53,57,60],G:[55,59,62],Am:[57,60,64],Dm:[50,53,57],Bb:[46,50,53],A:[57,61,64],E:[52,56,59],Em:[52,55,59],D:[50,54,57],Eb:[51,55,58],Ab:[56,60,63],Bm:[59,62,66],Gm:[55,58,62],B:[47,51,54]};
  const TH={
    title:{bpm:104,prog:'F Dm Bb C F Dm Bb C',dr:'none',lead:'box',mel:P(`a5 . c6 . f6 . e6 .  d6 . a5 . f5 . a5 .  d6 . c6 . a#5 . a5 .  g5 - - . c6 . e6 .
      f6 . a6 . g6 . f6 .  e6 . d6 . a5 . d6 .  d6 . f6 . a#6 . a6 .  g6 - - . e6 . c6 .`)},
    home:{bpm:110,prog:'C Am F G C Am F G',dr:'soft',lead:'box',mel:P(`e5 . g5 . c6 . g5 .  a5 . c6 . e6 . c6 .  f5 . a5 . c6 . a5 .  b5 . d6 . g6 - . .
      e6 . d6 . c6 . g5 .  a5 . e5 . a5 . c6 .  f6 . e6 . d6 . c6 .  d6 - - . b5 . g5 .`)},
    park:{bpm:118,prog:'G C D G Em C D D',dr:'soft',lead:'box',mel:P(`d5 . g5 . b5 . d6 .  e6 . c6 . g5 . c6 .  f#5 . a5 . d6 . f#6 .  g6 - - . d6 . b5 .
      b5 . e6 . g6 . e6 .  e6 . c6 . g5 . e5 .  d6 . f#6 . a6 . f#6 .  d6 - - . a5 . f#5 .`)},
    lull:{bpm:62,prog:'C C C F C G G C',dr:'none',lead:'box',mel:P(`e5 . e5 . g5 - - .  e5 . e5 . g5 - - .  e5 . g5 . c6 - b5 .  a5 - - . g5 - - .
      d5 . e5 . f5 - d5 .  d5 . e5 . f5 - - .  d5 . f5 . b5 . a5 g5  b5 - - . c6 - - .`)},
    cozy:{bpm:98,prog:'D G A D Bm G A D',dr:'none',lead:'box',mel:P(`f#5 . a5 . d6 . a5 .  g5 . b5 . d6 - . .  e5 . a5 . c#6 . e6 .  d6 - - . a5 . f#5 .
      b5 . d6 . f#6 . d6 .  g6 . d6 . b5 . g5 .  a5 . c#6 . e6 . g6 .  f#6 - - . - . . .`)},
    win:{bpm:120,prog:'C F G C Am F G C',dr:'soft',lead:'box',mel:P(`c5 . e5 . g5 . c6 -  a5 - f5 . c6 . a5 .  b5 . g5 . d6 . b5 .  c6 - - . g5 . c6 .
      e6 - c6 . a5 . c6 .  f6 - c6 . a5 . f5 .  g5 . b5 . d6 . f6 .  e6 - - . c6 - - .`)}
  };
  for(const k in TH){TH[k].prog=TH[k].prog.split(' ');if(TH[k].mel.length!==64)console.error('theme length',k,TH[k].mel.length)}
  let theme='off',step=0,nextT=0;
  function setTheme(th){if(th===theme)return;theme=th;step=0;if(C)nextT=now()+0.12}
  function lead(m,t,d,v,kind){const G=g(0,musicDuck);env(G,t,0.005,d*0.55,d*0.4,v);
    if(kind==='box'){o('sine',mtof(m),t,d+0.6,G);const G2=g(0,musicDuck);env(G2,t,0.002,0.01,0.35,v*0.5);o('sine',mtof(m)*2,t,0.5,G2);const G3=g(0,musicDuck);env(G3,t,0.002,0.005,0.12,v*0.25);o('triangle',mtof(m)*3,t,0.2,G3);return}
    if(kind==='sq'){const F=f('lowpass',3400,0.8,G);const x=o('square',mtof(m),t,d+0.05,F);const L=C.createOscillator(),LG=C.createGain();L.frequency.value=5.5;LG.gain.value=mtof(m)*0.006;L.connect(LG);LG.connect(x.frequency);L.start(t);L.stop(t+d+0.06)}
    else{o('triangle',mtof(m),t,d+0.05,G);const G2=g(0,musicDuck);env(G2,t,0.002,0.01,0.25,v*0.35);o('sine',mtof(m)*2,t,0.3,G2)}}
  function bass(m,t,d,v){const G=g(0,musicDuck);env(G,t,0.004,d*0.5,d*0.4,v);o('triangle',mtof(m),t,d+0.05,G);const G2=g(0,musicDuck);env(G2,t,0.004,0.02,0.06,v*0.25);o('square',mtof(m),t,0.1,f('lowpass',700,0.7,G2))}
  function arp(m,t,v){const G=g(0,musicDuck);env(G,t,0.002,0.01,0.07,v);o('square',mtof(m),t,0.1,f('lowpass',2400,0.7,G))}
  function kick(t,v){const G=g(0,musicDuck);env(G,t,0.002,0.02,0.16,v);const x=o('sine',150,t,0.2,G);x.frequency.exponentialRampToValueAtTime(45,t+0.15)}
  function snare(t,v){const G=g(0,musicDuck);env(G,t,0.002,0.01,0.12,v);n(t,0.15,f('bandpass',1900,0.9,G));const G2=g(0,musicDuck);env(G2,t,0.002,0.01,0.06,v*0.5);o('triangle',220,t,0.08,G2)}
  function hat(t,v){const G=g(0,musicDuck);env(G,t,0.001,0.005,0.03,v);n(t,0.05,f('highpass',7000,0.7,G))}
  function tom(t,fr,v){const G=g(0,musicDuck);env(G,t,0.002,0.03,0.18,v);const x=o('sine',fr,t,0.22,G);x.frequency.exponentialRampToValueAtTime(fr*0.55,t+0.18)}
  function drums(kind,s16,bar,t){
    if(kind==='pop'){if(s16%8===0)kick(t,0.5);if(s16%8===4)snare(t,0.22);if(s16%2===0)hat(t,0.05)}
    else if(kind==='tom'){if(s16===0||s16===6||s16===8)kick(t,0.45);if(s16===4||s16===12)snare(t,0.18);if(s16===10)tom(t,200,0.3);if(s16===11)tom(t,170,0.28);if(s16===14)tom(t,140,0.3);hat(t,s16%2?0.02:0.04)}
    else if(kind==='soft'){if(s16===0||s16===10)kick(t,0.35);if(s16===4||s16===12)snare(t,0.1);if(s16%4===2)hat(t,0.04)}
    else if(kind==='drive'){if(s16%4===0)kick(t,0.45);if(s16===4||s16===12)snare(t,0.2);hat(t,s16%2?0.025:0.05)}
    else{if(s16===0||s16===3||s16===8||s16===11)kick(t,0.5);if(s16===4||s16===12)snare(t,0.24);if(s16%2===0)hat(t,0.05);
      if(bar%4===3&&s16>=12)tom(t,[220,190,160,130][s16-12],0.32);else if(s16===14)tom(t,150,0.22)}}
  function schedule(){if(window.BGM&&BGM.ready)return;if(!C||theme==='off')return;const th=TH[theme];if(!th)return;const sx=60/th.bpm/4;if(nextT<now())nextT=now()+0.05;
    while(nextT<now()+0.15){const t=nextT,i=step%128,bar=(i/16)|0,s16=i%16,ch=CH[th.prog[bar]];
      if(s16%2===0){const m=th.mel[i/2];if(m>0){let d=1;while(i/2+d<64&&th.mel[i/2+d]===-1)d++;lead(m,t,sx*2*d*0.92,th.lead==='sq'?0.07:th.lead==='box'?0.09:0.11,th.lead);
        if(theme==='boss'||theme==='king')lead(m-12,t,sx*2*d*0.9,0.03,'tri')}}
      if(s16%4===0)bass(ch[0]-12+(s16===8?7:0),t,sx*3.2,0.2);else if(s16%4===2&&th.dr!=='soft')bass(ch[0],t,sx*1.2,0.07);
      if(s16%2===0)arp(ch[(s16/2)%3]+12+(s16>=8?12:0),t,0.012);
      if(th.dr!=='none')drums(th.dr,s16,bar,t);step++;nextT+=sx}}
  function setMuted(m){muted=m;localStorage.setItem('adba_muted',m?'1':'0');if(C)master.gain.setTargetAtTime(m?0:0.9,now(),0.03)}
    /*real-rec*/const _rs={};function rec(k,d,v){const gk=/^meow/.test(k)?"meow":k;const b=clips[k];if(!b||!ok())return false;if(_rs[gk]){try{_rs[gk].stop()}catch(e){}}else if(!sfxOK())return true;const t=now(),G=g(0,sfxBus);const L=d?Math.min(d,b.duration):b.duration;G.gain.setValueAtTime(v||0.9,t);G.gain.setValueAtTime(v||0.9,t+Math.max(0,L-0.25));G.gain.linearRampToValueAtTime(0.0001,t+L);const s=C.createBufferSource();s.buffer=b;s.connect(G);s.start(t);s.stop(t+L+0.05);_rs[gk]=s;s.onended=()=>{if(_rs[gk]===s)_rs[gk]=null};return true}
  {const sm=SFX.meow,sp=SFX.purr,sq=SFX.quack,sh=SFX.hoot,MW=['meow1','meow2','meow3','meow4','meow5'];
   SFX.meow=k=>{try{if(!rec(MW[k==null?(R()*5)|0:k%5]))sm(k)}catch(e){}};SFX.purr=d=>{try{if(!rec('purr',(d||1.2)+0.6,0.8))sp(d)}catch(e){}};
   SFX.quack=()=>{try{if(!rec('a_duck',1.4))sq()}catch(e){}};SFX.hoot=()=>{try{if(!rec('a_owl'))sh()}catch(e){}}}
  function speakingNow(){return !!(C&&now()<curEnd)||!!(window.__kvxSpk);}
  try{const g=window;const prev=g.__vSpk;g.__vSpk=function(){return !!(speakingNow()||(typeof prev==='function'&&prev()))};}catch(e){}
  return{unlock,SFX,say,num,count,sayText,prefetch,plan,setTheme,setMuted,get muted(){return muted},get unlocked(){return unlocked&&!!C},get running(){return !!C&&C.state==='running'},get clipCount(){return Object.keys(clips).length},get theme(){return theme},get ctx(){return C},get musicGain(){return musicDuck},stats,get speaking(){return speakingNow()}};
})();
