/* Alex's Jukebox: one song at a time, pauses hub theme, reuses live github.io files. */
(function(){
  if(window.__JB)return;
  var songs=[
    {title:"Zoe's Games", art:"/doodle-and-zoe/hub/host.png", src:"/doodle-and-zoe/hub/videos/zoe-games-720p.mp4", poster:"/doodle-and-zoe/hub/videos/zoe-games-poster.jpg", kind:"video"},
    {title:"Doodle's Song", art:"/doodle-and-zoe/hub/doodles-song.jpg", src:"/doodle-and-zoe/hub/doodle-the-loaf-720p.mp4", kind:"video"},
    {title:"The Doodle Dance", art:"hub/doodle-dance.jpg", src:"/doodle-and-zoe/hub/videos/doodle-dance-720p.mp4", poster:"/doodle-and-zoe/hub/videos/doodle-dance-poster.jpg", kind:"video"},
    {title:"Silly Face Zoe", art:"hub/silly-face-zoe.jpg", src:"/doodle-and-zoe/hub/videos/silly-face-zoe-720p_v3.mp4", poster:"/doodle-and-zoe/hub/videos/silly-face-zoe-poster_v3.jpg", kind:"video"},
    {title:"Go, Alex, Go!", art:"hub/go-alex-go.jpg", src:"/doodle-and-zoe/hub/videos/go-alex-go-720p.mp4", poster:"/doodle-and-zoe/hub/videos/go-alex-go-poster.jpg", kind:"video"},
    {title:"Dance With Dad", art:"hub/dance-with-dad.jpg", src:"/doodle-and-zoe/hub/videos/dance-with-dad-720p.mp4", poster:"/doodle-and-zoe/hub/videos/dance-with-dad-poster.jpg", kind:"video"},
    {title:"Alex's Games", art:"icon-192.png", src:"/doodle-and-zoe/hub/videos/alex-games-720p.mp4", poster:"/doodle-and-zoe/hub/videos/alex-games-poster.jpg", kind:"video"},
    {title:"Excavator Blowout", art:"hub/alex-excavator-blowout.jpg", src:"/doodle-and-zoe/hub/videos/excavator-blowout-720p.mp4", poster:"/doodle-and-zoe/hub/videos/excavator-blowout-poster.jpg", kind:"video"},
    {title:"Doodle & Zoe", art:"/doodle-and-zoe/hub/doodle-and-zoe.jpg", src:"/doodle-and-zoe/hub/videos/doodle-and-zoe-720p.mp4", poster:"/doodle-and-zoe/hub/videos/doodle-and-zoe-poster.jpg", kind:"video"},
    {title:"Princess Castle", art:"/doodle-and-zoe/hub/zoes-princess-castle.jpg", src:"/doodle-and-zoe/hub/videos/princess-castle-720p.mp4", poster:"/doodle-and-zoe/hub/videos/princess-castle-poster.jpg", kind:"video"},
    {title:"Unicorn Adventure", art:"/doodle-and-zoe/hub/zoes-unicorn-adventure.jpg", src:"/doodle-and-zoe/hub/videos/unicorn-adventure-720p.mp4", poster:"/doodle-and-zoe/hub/videos/unicorn-adventure-poster.jpg", kind:"video"},
    {title:"The Bee Game", art:"/doodle-and-zoe/hub/the-bee-game.jpg", src:"/doodle-and-zoe/hub/videos/the-bee-game-720p.mp4", poster:"/doodle-and-zoe/hub/videos/the-bee-game-poster.jpg", kind:"video"},
    {title:"Water Pirates", art:"/doodle-and-zoe/hub/wilson-water-pirates.jpg", src:"/doodle-and-zoe/hub/videos/water-pirates-720p.mp4", poster:"/doodle-and-zoe/hub/videos/water-pirates-poster.jpg", kind:"video"},
    {title:"Mermaid Lagoon", art:"/doodle-and-zoe/hub/zoes-mermaid-lagoon.jpg", src:"/doodle-and-zoe/hub/videos/mermaid-lagoon-720p.mp4", poster:"/doodle-and-zoe/hub/videos/mermaid-lagoon-poster.jpg", kind:"video"},
    {title:"Silly Beat Band", art:"hub/silly-beat-band.jpg", src:"/doodle-and-zoe/hub/videos/silly-beat-band-720p.mp4", poster:"/doodle-and-zoe/hub/videos/silly-beat-band-poster.jpg", kind:"video"},
    {title:"Dino Smash", art:"/doodle-and-zoe/hub/dino-stampede-smash-zoe.jpg", src:"/doodle-and-zoe/hub/videos/dino-smash-720p.mp4", poster:"/doodle-and-zoe/hub/videos/dino-smash-poster.jpg", kind:"video"},
    {title:"Cave Rescue", art:"hub/alex-cave-rescue.jpg", src:"/doodle-and-zoe/hub/videos/cave-rescue-720p.mp4", poster:"/doodle-and-zoe/hub/videos/cave-rescue-poster.jpg", kind:"video"},
    {title:"Galaxy Math", art:"hub/alex-galaxy-math.jpg", src:"/doodle-and-zoe/hub/videos/galaxy-math-720p.mp4", poster:"/doodle-and-zoe/hub/videos/galaxy-math-poster.jpg", kind:"video"},
    {title:"River Run", art:"hub/alex-river-run.jpg", src:"/doodle-and-zoe/hub/videos/river-run-720p.mp4", poster:"/doodle-and-zoe/hub/videos/river-run-poster.jpg", kind:"video"},
    {title:"Floor Is Lava", art:"hub/alex-floor-is-lava.jpg", src:"/doodle-and-zoe/hub/videos/floor-is-lava-720p.mp4", poster:"/doodle-and-zoe/hub/videos/floor-is-lava-poster.jpg", kind:"video"},
    {title:"Poopy Seagull", art:"hub/fry-thief-seagull.jpg", src:"/doodle-and-zoe/hub/videos/poopy-seagull-720p.mp4", poster:"/doodle-and-zoe/hub/videos/poopy-seagull-poster.jpg", kind:"video"}
  ];
  var loops=[
    {title:"Doodle & Zoe", art:"/doodle-and-zoe/hub/doodle-and-zoe.jpg", src:"/doodle-and-zoe/music/title.m4a", kind:"loop"},
    {title:"Princess Castle", art:"/doodle-and-zoe/hub/zoes-princess-castle.jpg", src:"/zoes-princess-castle/music/home.m4a", kind:"loop"},
    {title:"Unicorn Adventure", art:"/doodle-and-zoe/hub/zoes-unicorn-adventure.jpg", src:"/zoes-unicorn-adventure/music/title.m4a", kind:"loop"},
    {title:"The Bee Game", art:"/doodle-and-zoe/hub/the-bee-game.jpg", src:"/the-bee-game/music/title.m4a", kind:"loop"},
    {title:"Water Pirates", art:"/doodle-and-zoe/hub/wilson-water-pirates.jpg", src:"/wilson-water-pirates/music/title.m4a", kind:"loop"},
    {title:"Mermaid Lagoon", art:"/doodle-and-zoe/hub/zoes-mermaid-lagoon.jpg", src:"/zoes-mermaid-lagoon/clips/bg_lagoon.mp3", kind:"loop"},
    {title:"Dino Smash", art:"/doodle-and-zoe/hub/dino-stampede-smash-zoe.jpg", src:"/dino-stampede-smash/music/bg.mp3", kind:"loop"},
    {title:"Excavator Blowout", art:"hub/alex-excavator-blowout.jpg", src:"/alex-excavator-blowout/music/theme_loop.mp3", kind:"loop"},
    {title:"Cave Rescue", art:"hub/alex-cave-rescue.jpg", src:"/alex-cave-rescue/music/title.m4a", kind:"loop"},
    {title:"Galaxy Math", art:"hub/alex-galaxy-math.jpg", src:"/alex-galaxy-math/music/title.m4a", kind:"loop"},
    {title:"River Run", art:"hub/alex-river-run.jpg", src:"/alex-river-run/music/title.m4a", kind:"loop"},
    {title:"Floor Is Lava", art:"hub/alex-floor-is-lava.jpg", src:"/alex-floor-is-lava/music/title.m4a", kind:"loop"},
    {title:"Poopy Seagull", art:"hub/fry-thief-seagull.jpg", src:"/fry-thief-seagull/music/title.m4a", kind:"loop"}
  ];
  var all=songs.concat(loops);
  var i=0, a=null, on=false, box, playBtn, titleEl, subEl;

  function fadeHub(){try{if(window.HT)HT.fade(280)}catch(e){}}
  function stop(){
    if(a){try{a.pause();a.src='';a.removeAttribute('src');a.load()}catch(e){}a=null}
    on=false; paint();
  }
  function isVideo(idx){return !!(all[idx]&&all[idx].kind==='video')}
  function openVideo(){var it=all[i];if(window.__LOAF&&__LOAF.playNow)__LOAF.playNow({src:it.src,poster:it.poster||it.art,title:it.title});else if(window.__LOAF)__LOAF.open()}
  function playItem(idx, auto){
    if(isVideo(idx)){i=idx;stop();paint();openVideo();return}
    load(idx, auto);
  }
  function load(idx, auto){
    if(isVideo(idx)){playItem(idx,auto);return}

    if(idx<0||idx>=all.length)return;
    i=idx; stop();
    fadeHub();
    a=new Audio(all[i].src);
    a.preload='auto';
    a.addEventListener('ended', function(){ next(true); });
    a.addEventListener('play', function(){ on=true; paint(); });
    a.addEventListener('pause', function(){ if(a&&a.ended)return; on=false; paint(); });
    if(auto!==false){
      var p=a.play(); if(p&&p.then)p.catch(function(){ on=false; paint(); });
    }
    paint();
  }
  function toggle(){
    if(isVideo(i)){playItem(i,true);return}
    if(!a){ load(i, true); return; }
    if(a.paused){ fadeHub(); var p=a.play(); if(p&&p.then)p.catch(function(){}); }
    else a.pause();
  }
  function next(auto){
    var n=(i+1)%all.length, hops=0;
    if(auto){while(isVideo(n)&&hops<all.length){n=(n+1)%all.length;hops++} load(n,true); return}
    playItem(n,true);
  }
  function prev(){ playItem((i-1+all.length)%all.length, true); }

  function paint(){
    if(!box)return;
    box.classList.toggle('playing', !!(a&&!a.paused));
    if(playBtn)playBtn.textContent=(a&&!a.paused)?'❚❚':'▶';
    if(titleEl)titleEl.textContent=all[i].title;
    if(subEl)subEl.textContent=all[i].kind==='loop'?'Game Music':'Song';
    var cards=box.querySelectorAll('.card');
    for(var c=0;c<cards.length;c++) cards[c].classList.toggle('on', +cards[c].getAttribute('data-i')===i);
  }

  function card(item, idx){
    return '<button type="button" class="card '+(item.kind==='loop'?'loop':'')+'" data-i="'+idx+'" aria-label="'+item.title+'" style="background-image:url(\''+item.art+'\')"><b>'+item.title+'</b></button>';
  }

  function mount(){
    if(document.getElementById('jukebox'))return;
    var btn=document.createElement('div');
    btn.id='jbBtn'; btn.setAttribute('role','button'); btn.tabIndex=0;
    btn.setAttribute('aria-label',"Alex's Jukebox");
    btn.innerHTML='<span class="j">🎵</span><span class="l">Jukebox</span>';
    btn.addEventListener('click', function(e){ e.stopPropagation(); open(); });
    btn.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();open()} });
    document.body.appendChild(btn);

    box=document.createElement('div');
    box.id='jukebox'; box.setAttribute('aria-modal','true'); box.setAttribute('role','dialog'); box.setAttribute('aria-label',"Alex's Jukebox");
    var sH='', lH='', n=0;
    songs.forEach(function(it){ sH+=card(it,n++); });
    loops.forEach(function(it){ lH+=card(it,n++); });
    box.innerHTML='<button type="button" class="back" id="jbBack" aria-label="Back">🏠 Back</button>'+
      '<div class="side">'+
        '<div class="stage"><span class="spark">⭐</span><span class="spark">🏆</span><span class="spark">✨</span><div class="doodle" aria-hidden="true"></div></div>'+
        '<div class="now"><b id="jbTitle">Pick a song!</b><s id="jbSub">Alex\'s Jukebox</s></div>'+
        '<div class="ctrls">'+
          '<button type="button" id="jbPrev" aria-label="Previous">⏮</button>'+
          '<button type="button" id="jbPlay" aria-label="Play">▶</button>'+
          '<button type="button" id="jbNext" aria-label="Next">⏭</button>'+
        '</div>'+
      '</div>'+
      '<div class="list">'+
        '<section class="sec"><h2><i>🎤</i> Songs</h2><div class="cards">'+sH+'</div></section>'+
        '<section class="sec"><h2><i>🎮</i> Game Music</h2><div class="cards">'+lH+'</div></section>'+
      '</div>';
    document.body.appendChild(box);
    playBtn=document.getElementById('jbPlay');
    titleEl=document.getElementById('jbTitle');
    subEl=document.getElementById('jbSub');
    document.getElementById('jbBack').addEventListener('click', close);
    playBtn.addEventListener('click', function(e){ e.stopPropagation(); toggle(); });
    document.getElementById('jbNext').addEventListener('click', function(e){ e.stopPropagation(); next(); });
    document.getElementById('jbPrev').addEventListener('click', function(e){ e.stopPropagation(); prev(); });
    box.addEventListener('click', function(e){
      var c=e.target.closest('.card'); if(!c||!box.contains(c))return;
      e.stopPropagation(); playItem(+c.getAttribute('data-i'), true);
    });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&box.classList.contains('on')) close(); });
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') try{if(a)a.pause()}catch(e){} });
  }

  function open(){
    mount();
    fadeHub();
    box.classList.add('on');
    paint();
  }
  function close(){
    stop();
    if(box)box.classList.remove('on');
  }

  window.__JB={open:open,close:close,stop:stop,play:function(n){mount();open();if(n!=null)playItem(n,true)}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
