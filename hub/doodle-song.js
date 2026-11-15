/* Doodle's Song — full-screen landscape player. Video is hosted on the Zoe hub. */
(function(){
  if(window.__LOAF)return;
  var SRC='/doodle-and-zoe/hub/doodle-the-loaf-720p.mp4';
  var POSTER=(/\/alex-games\//.test(location.pathname)?'/doodle-and-zoe/':'')+'hub/doodles-song-poster.jpg';
  var box, vid, tap, ended, started=false;

  function fadeHub(){try{if(window.HT)HT.fade(280)}catch(e){}}

  function mount(){
    if(document.getElementById('loafPlayer'))return;
    box=document.createElement('div');
    box.id='loafPlayer';
    box.setAttribute('role','dialog');
    box.setAttribute('aria-modal','true');
    box.setAttribute('aria-label',"Doodle's Song");
    box.innerHTML='<video id="loafVid" playsinline webkit-playsinline preload="metadata" poster="'+POSTER+'" src="'+SRC+'"></video>'+
      '<div class="tap" id="loafTap"><img alt="" src="'+POSTER+'"><div class="go"><div class="playico">▶</div><div class="lbl">Tap to play</div></div></div>'+
      '<div class="ended" id="loafEnded" hidden><img alt="" src="'+POSTER+'"><div class="msg"><div class="lbl">Doodle\'s Song</div></div></div>'+
      '<div class="bar">'+
        '<button type="button" id="loafReplay">🔁 Replay</button>'+
        '<button type="button" id="loafBack">🏠 Back to games</button>'+
      '</div>';
    document.body.appendChild(box);
    vid=document.getElementById('loafVid');
    tap=document.getElementById('loafTap');
    ended=document.getElementById('loafEnded');
    vid.setAttribute('playsinline','');
    vid.setAttribute('webkit-playsinline','');
    vid.controls=false;
    tap.addEventListener('click', function(e){ e.stopPropagation(); play(); });
    ended.addEventListener('click', function(e){ e.stopPropagation(); replay(); });
    document.getElementById('loafReplay').addEventListener('click', function(e){ e.stopPropagation(); replay(); });
    document.getElementById('loafBack').addEventListener('click', function(e){ e.stopPropagation(); close(); });
    vid.addEventListener('ended', function(){ ended.hidden=false; tap.hidden=true; });
    vid.addEventListener('play', function(){ tap.hidden=true; ended.hidden=true; });
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden'&&vid&&!vid.paused)try{vid.pause()}catch(e){} });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&box.classList.contains('on')) close(); });
  }

  function play(){
    fadeHub();
    tap.hidden=true; ended.hidden=true;
    var p=vid.play();
    if(p&&p.then)p.catch(function(){ tap.hidden=false; });
    started=true;
  }
  function replay(){
    fadeHub();
    try{vid.currentTime=0}catch(e){}
    play();
  }
  function open(){
    mount();
    fadeHub();
    try{vid.pause();vid.currentTime=0}catch(e){}
    tap.hidden=false; ended.hidden=true;
    box.classList.add('on');
  }
  function close(){
    try{if(vid){vid.pause();}}catch(e){}
    if(box)box.classList.remove('on');
  }

  function hook(){
    var t=document.getElementById('doodleSong');
    if(!t)return;
    t.addEventListener('click', function(e){ e.stopPropagation(); open(); });
    t.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(); } });
  }
  window.__LOAF={open:open,close:close,replay:replay};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded', hook);
  else hook();
})();
