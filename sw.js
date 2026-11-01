// CRC PLAY – offline gyorsítótár (stale-while-revalidate). A cache neve megegyezik az index.html frissítő gombjáéval.
const C='crc-play-v4',F=['./','index.html','manifest.webmanifest','ikon-192.png','ikon-512.png','ikon-maszkolhato.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x.startsWith('crc-play')).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith((async()=>{
    const hit=await caches.match(r,{ignoreSearch:true});
    const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    const res=await net;
    if(res)return res;
    if(r.mode==='navigate'){const idx=await caches.match('index.html');if(idx)return idx}
    return new Response('Offline',{status:503,statusText:'Offline'});
  })());
});
