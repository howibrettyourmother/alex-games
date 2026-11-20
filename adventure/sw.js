// offline support for Alex & Doodle's Big Adventure
const P='adba-',V='1.9.1-20261120el',C=P+V;
const A=["index.html","manifest.json","favicon-32.png","apple-touch-icon.png","icon-192.png","icon-512.png","og.png","audio/pack.js","music/bgm.js","music/intro.m4a","music/title.m4a","music/home.m4a","audio/sfx/ui_click.mp3","audio/sfx/win.mp3","audio/sfx/pop.mp3","audio/voice/alex/a_hi.mp3"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(new Request(u,{cache:'reload'})).then(res=>{if(res.ok)return c.put(u,res)}).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(P)&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll()).then(cs=>cs.forEach(c=>c.postMessage('offline-ready'))))});
self.addEventListener('message',e=>{if(e.data==='skipWaiting')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
  if(r.headers.has('Range'))return;
  const nav=r.mode==='navigate';
  let key=r;if(nav){let p=u.pathname;if(p.endsWith('/'))p+='index.html';key=new Request(p)}
  const isVoice=/\/v\/.+\.mp3$/i.test(u.pathname);
  const fresh=nav||/\.(html?|js|json)$/.test(u.pathname);
  e.respondWith(caches.open(C).then(async c=>{
    const cached=async()=>(await c.match(key,{ignoreSearch:true}))||(nav?await c.match('index.html'):null);
    if(fresh){
      try{const res=await Promise.race([fetch(new Request(u.href,{cache:'no-cache',credentials:'same-origin'})),new Promise((_,j)=>setTimeout(()=>j(new Error('timeout')),5000))]);
        if(res&&res.ok){if(res.type==='basic'&&!res.redirected)c.put(key,res.clone());if(nav&&res.redirected)return Response.redirect(res.url,302);return res}
        const h=await cached();return h||res}catch(err){const h=await cached();return h||Response.error()}}
    const hit=await cached();
    const net=fetch(r).then(res=>{if(res&&res.ok&&res.type==='basic'&&!res.redirected)c.put(key,res.clone());return res});
    if(hit){e.waitUntil(net.catch(()=>{}));return hit}
    return net.catch(()=>Response.error())
  }))});
