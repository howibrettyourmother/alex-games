// offline support: precache everything, serve cache-first, refresh in the background (stale-while-revalidate).
// Navigations are cached under their own URL (hub at ./, game at play/), so one page never overwrites the other.
const P='alex-games-',V='2.4.3-20261023d',C=P+V,A=["index.html","manifest.json","apple-touch-icon.png","favicon-32.png","icon-192.png","icon-512.png","hub/a_bg.mp3","hub/a_cr.mp3","hub/a_fl.mp3","hub/a_gm.mp3","hub/a_hi.mp3","hub/a_pc.mp3","hub/a_ps.mp3","hub/a_rr.mp3","hub/a_wp.mp3","hub/alex-cave-rescue.png","hub/alex-floor-is-lava.png","hub/alex-galaxy-math.png","hub/alex-river-run.png","hub/bg.jpg","hub/fry-thief-seagull.png","hub/intro1.mp3","hub/intro2.mp3","hub/intro3.mp3","hub/the-bee-game.png","hub/wilson-water-pirates.png","hub/zoes-princess-castle.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(new Request(u,{cache:'reload'})).then(res=>{if(res.ok)return c.put(u,res)}).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(P)&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll()).then(cs=>cs.forEach(c=>c.postMessage('offline-ready'))))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;const nav=r.mode==='navigate';
  let key=r;if(nav){let p=u.pathname;if(p.endsWith('/'))p+='index.html';key=new Request(p)}
  e.respondWith(caches.open(C).then(async c=>{const hit=(await c.match(key,{ignoreSearch:true}))||(nav?await c.match('index.html'):null);
    const net=fetch(r).then(res=>{if(res&&res.ok&&res.type==='basic'&&!res.redirected)c.put(key,res.clone());return res});
    if(hit){e.waitUntil(net.catch(()=>{}));return hit}return net.catch(()=>Response.error())}))});
