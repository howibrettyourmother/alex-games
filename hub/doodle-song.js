/* Doodle's Song — full-screen VIDEO. play() is called in the same tap handler.
   Overlay/poster + "loading…" stay up until the 'playing' event so older iPads
   never sit on a black frame. iOS fallback: webkitEnterFullscreen().
   The service worker does not intercept this mp4 (browser streams with Range). */
(function(){
  if(window.__LOAF)return;
  var SRC='/doodle-and-zoe/hub/doodle-the-loaf-720p.mp4';
  var POSTER=(/\/alex-games\//.test(location.pathname)?'/doodle-and-zoe/':'')+'hub/doodles-song-poster.jpg';
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
    vid.setAttribute('poster',POSTER);
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
    box.setAttribute('aria-label',"Doodle's Song");
    box.innerHTML='<video id="loafVid" playsinline webkit-playsinline preload="metadata" poster="'+POSTER+'" src="'+SRC+'"></video>'+
      '<div class="loading" id="loafLoading" hidden><img alt="" src="'+POSTER+'"><div class="msg"><div class="lbl">loading…</div></div></div>'+
      '<div class="tap" id="loafTap" hidden><img alt="" src="'+POSTER+'"><div class="go"><div class="playico">▶</div><div class="lbl">Tap to play</div></div></div>'+
      '<div class="ended" id="loafEnded" hidden><img alt="" src="'+POSTER+'"><div class="msg"><div class="lbl">Doodle\'s Song</div></div></div>'+
      '<div class="bar">'+
        '<button type="button" id="loafReplay">🔁 Replay</button>'+
        '<button type="button" id="loafBack">🏠 Back to games</button>'+
      '</div>';
    document.body.appendChild(box);
    vid=document.getElementById('loafVid');
    tap=document.getElementById('loafTap');
    ended=document.getElementById('loafEnded');
    loading=document.getElementById('loafLoading');
    armVideo();
    hideOverlays();
    function gesturePlay(e){ e.preventDefault(); e.stopPropagation(); playNow(); }
    tap.addEventListener('pointerdown', gesturePlay, {passive:false});
    ended.addEventListener('pointerdown', gesturePlay, {passive:false});
    document.getElementById('loafReplay').addEventListener('pointerdown', gesturePlay, {passive:false});
    document.getElementById('loafBack').addEventListener('click', function(e){ e.stopPropagation(); close(); });
    vid.addEventListener('playing', hideOverlays);
    vid.addEventListener('play', function(){ /* keep poster+loading until frames actually paint */ if(!vid.paused&&vid.currentTime>0.05) hideOverlays(); });
    vid.addEventListener('waiting', function(){ if(box&&box.classList.contains('on')&&!vid.ended) showLoading(); });
    vid.addEventListener('ended', function(){ showEnded(); });
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden'&&vid&&!vid.paused)try{vid.pause()}catch(e){} });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&box&&box.classList.contains('on')) close(); });
  }

  /* Must run directly inside a user-gesture handler (no setTimeout). */
  function playNow(){
    mount();
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
    playNow();
  }

  function hook(){
    mount();
    var t=document.getElementById('doodleSong');
    if(!t)return;
    t.addEventListener('pointerdown', onTileGesture, {passive:false});
    t.addEventListener('click', function(e){
      if(box&&box.classList.contains('on')&&vid&&!vid.paused){ e.preventDefault(); e.stopPropagation(); return; }
      onTileGesture(e);
    });
  }

  window.__LOAF={open:playNow,close:close,replay:playNow,playNow:playNow};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded', hook);
  else hook();
})();
