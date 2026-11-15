/* Full-screen video player for Doodle's Song and jukebox music videos.
   play() is called in the same tap handler. Poster + "loading…" stay up until
   the 'playing' event. iOS fallback: webkitEnterFullscreen().
   The service worker does not intercept mp4 (browser streams with Range). */
(function(){
  if(window.__LOAF)return;
  var DEFAULT_SRC='/doodle-and-zoe/hub/doodle-the-loaf-720p.mp4';
  var DEFAULT_POSTER=(/\/alex-games\//.test(location.pathname)?'/doodle-and-zoe/':'')+'hub/doodles-song-poster.jpg';
  var DEFAULT_TITLE="Doodle's Song";

  var DANCE_SRC='/doodle-and-zoe/hub/videos/doodle-dance-720p.mp4';
  var DANCE_POSTER='/doodle-and-zoe/hub/videos/doodle-dance-poster.jpg';
  var DANCE_TITLE='The Doodle Dance';
  var ALEX_SONG_SRC='/doodle-and-zoe/hub/videos/go-alex-go-720p.mp4';
  var ALEX_SONG_POSTER='/doodle-and-zoe/hub/videos/go-alex-go-poster.jpg';
  var ALEX_SONG_TITLE='Go, Alex, Go!';
  var curSrc=DEFAULT_SRC, curPoster=DEFAULT_POSTER, curTitle=DEFAULT_TITLE;
  var box, vid, tap, ended, loading;

  function fadeHub(){try{if(window.HT)HT.fade(280)}catch(e){}}
  function stopJukebox(){try{if(window.__JB&&__JB.stop)__JB.stop()}catch(e){}}

  function hideOverlays(){
    [tap,ended,loading].forEach(function(el){
      if(!el)return;
      el.hidden=true;el.classList.remove('show');el.style.display='none';
    });
  }
  function showEl(el){
    hideOverlays();
    if(!el)return;
    el.hidden=false;el.classList.add('show');el.style.display='flex';
  }
  function showTap(){ showEl(tap); }
  function showEnded(){ showEl(ended); }
  function showLoading(){ showEl(loading); }

  function setPosters(src){
    if(!box)return;
    var imgs=box.querySelectorAll('.loading img, .tap img, .ended img');
    for(var i=0;i<imgs.length;i++) imgs[i].src=src;
    var lbl=ended&&ended.querySelector('.lbl');
    if(lbl)lbl.textContent=curTitle;
    if(box)box.setAttribute('aria-label', curTitle);
  }

  function applyMedia(opts){
    if(opts&&(opts.src||opts.poster||opts.title)){
      curSrc=opts.src||curSrc;
      curPoster=opts.poster||curPoster;
      curTitle=opts.title||curTitle;
    }
    if(!vid)return;
    vid.setAttribute('poster', curPoster);
    vid.poster=curPoster;
    setPosters(curPoster);
    if(vid.getAttribute('src')!==curSrc){
      vid.setAttribute('src', curSrc);
      vid.src=curSrc;
    }
  }

  function armVideo(){
    if(!vid)return;
    vid.muted=false;
    vid.defaultMuted=false;
    vid.volume=1;
    vid.playsInline=true;
    vid.controls=false;
    vid.preload='metadata';
    vid.setAttribute('playsinline','');
    vid.setAttribute('webkit-playsinline','');
    vid.setAttribute('preload','metadata');
    vid.setAttribute('poster',curPoster);
    vid.removeAttribute('muted');
    vid.style.width='100vw';
    vid.style.height='100vh';
    vid.style.position='absolute';
    vid.style.left='0';
    vid.style.top='0';
    vid.style.objectFit='contain';
    vid.style.zIndex='0';
    vid.style.display='block';
    vid.style.webkitTransform='';
    vid.style.transform='';
  }

  function mount(){
    if(vid)return;
    box=document.createElement('div');
    box.id='loafPlayer';
    box.setAttribute('role','dialog');
    box.setAttribute('aria-modal','true');
    box.setAttribute('aria-label', curTitle);
    box.innerHTML='<video id="loafVid" playsinline webkit-playsinline preload="metadata" poster="'+curPoster+'" src="'+curSrc+'"></video>'+
      '<div class="loading" id="loafLoading" hidden><img alt="" src="'+curPoster+'"><div class="msg"><div class="lbl">loading…</div></div></div>'+
      '<div class="tap" id="loafTap" hidden><img alt="" src="'+curPoster+'"><div class="go"><div class="playico">▶</div><div class="lbl">Tap to play</div></div></div>'+
      '<div class="ended" id="loafEnded" hidden><img alt="" src="'+curPoster+'"><div class="msg"><div class="lbl"></div></div></div>'+
      '<div class="bar">'+
        '<button type="button" id="loafReplay">🔁 Replay</button>'+
        '<button type="button" id="loafBack">🏠 Back to games</button>'+
      '</div>';
    document.body.appendChild(box);
    vid=document.getElementById('loafVid');
    tap=document.getElementById('loafTap');
    ended=document.getElementById('loafEnded');
    loading=document.getElementById('loafLoading');
    ended.querySelector('.lbl').textContent=curTitle;
    armVideo();
    hideOverlays();
    function gesturePlay(e){ e.preventDefault(); e.stopPropagation(); playNow(); }
    tap.addEventListener('pointerdown', gesturePlay, {passive:false});
    ended.addEventListener('pointerdown', gesturePlay, {passive:false});
    document.getElementById('loafReplay').addEventListener('pointerdown', gesturePlay, {passive:false});
    document.getElementById('loafBack').addEventListener('click', function(e){ e.stopPropagation(); close(); });
    vid.addEventListener('playing', hideOverlays);
    vid.addEventListener('play', function(){ if(!vid.paused&&vid.currentTime>0.05) hideOverlays(); });
    vid.addEventListener('waiting', function(){ if(box&&box.classList.contains('on')&&!vid.ended) showLoading(); });
    vid.addEventListener('ended', function(){ showEnded(); });
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden'&&vid&&!vid.paused)try{vid.pause()}catch(e){} });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&box&&box.classList.contains('on')) close(); });
  }

  /* Must run directly inside a user-gesture handler (no setTimeout). */
  function playNow(opts){
    mount();
    if(opts&&(opts.src||opts.poster||opts.title)) applyMedia(opts);
    fadeHub();
    stopJukebox();
    box.classList.add('on');
    armVideo();
    showLoading();
    try{ if(vid.ended || vid.currentTime>0.2) vid.currentTime=0; }catch(e){}
    var p=vid.play();
    if(typeof vid.webkitEnterFullscreen==='function'){
      try{ vid.webkitEnterFullscreen(); }catch(e){}
    }
    if(p&&p.then)p.then(function(){}, function(){ showTap(); });
  }

  function close(){
    try{if(vid){vid.pause();if(vid.webkitExitFullscreen)vid.webkitExitFullscreen()}}catch(e){}
    hideOverlays();
    if(box)box.classList.remove('on');
  }

  function onTileGesture(e){
    e.preventDefault();
    e.stopPropagation();
    playNow({src:DEFAULT_SRC, poster:DEFAULT_POSTER, title:DEFAULT_TITLE});
  }

  function hookTile(el, opts){
    if(!el)return;
    function go(e){
      e.preventDefault();
      e.stopPropagation();
      playNow(opts);
    }
    el.addEventListener('pointerdown', go, {passive:false});
    el.addEventListener('click', function(e){
      if(box&&box.classList.contains('on')&&vid&&!vid.paused){ e.preventDefault(); e.stopPropagation(); return; }
      go(e);
    });
  }
  function hook(){
    mount();
    hookTile(document.getElementById('doodleSong'), {src:DEFAULT_SRC, poster:DEFAULT_POSTER, title:DEFAULT_TITLE});
    hookTile(document.getElementById('danceSong'), {src:DANCE_SRC, poster:DANCE_POSTER, title:DANCE_TITLE});
    hookTile(document.getElementById('alexSong'), {src:ALEX_SONG_SRC, poster:ALEX_SONG_POSTER, title:ALEX_SONG_TITLE});
  }

  window.__LOAF={open:playNow,close:close,replay:playNow,playNow:playNow};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded', hook);
  else hook();
})();
