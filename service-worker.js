"use strict";var precacheConfig=[["/index.html","dd9e09fce5601c13707d0c73e28ad5b1"],["/main.82bc1e82.css","82bc1e826a67559d350004918fea51f4"],["/static/css/main.1129dd83.css","1129dd8387fe18b2f51f33b95eff8efc"],["/static/js/0.9e13647f.chunk.js","81ff9d9136cfd7985b4eb6880acde098"],["/static/js/1.40644cbe.chunk.js","881652bfb2e58adafb68fb83dd4e2485"],["/static/js/10.b2b0bd8c.chunk.js","8c8c75bab221053e602f5b2b157095fa"],["/static/js/11.eac67d9c.chunk.js","c82b296baa00fe6c012b10be8405ca44"],["/static/js/12.5aba6f62.chunk.js","0abd6abafa57d5a6a4e61a922ea3a403"],["/static/js/13.8fb32008.chunk.js","0cc02a559d5ce63172e2435d4f2ac1b8"],["/static/js/2.35cd5b6e.chunk.js","e2d34aaaf251f408ec9a88c2af3c4e40"],["/static/js/3.a5b4d33b.chunk.js","1568780a59ca194f5464a91560c01e9d"],["/static/js/4.8bed962b.chunk.js","1331a69a13bf384e0e496e9fcc43df67"],["/static/js/5.72fc42f3.chunk.js","bb032d227e9fc53be809b426cee09755"],["/static/js/6.05501b8a.chunk.js","117f386239cd3b80df20a5761bab066d"],["/static/js/7.ff07e026.chunk.js","0f35255578c59bb2b7480add2b9a73a7"],["/static/js/8.46dc0f54.chunk.js","6a43d1eee6329464fea3346cc381afe4"],["/static/js/9.31167dad.chunk.js","9889c888e642859679c616deb055d604"],["/static/js/ReactChart2-Doughnut.8102d17f.chunk.js","9bf62d45c4b1da1ab9352a945143497c"],["/static/js/ReactChart2-bar.52448ea5.chunk.js","0afbb0a4d2e09a4b2382b312d06525a0"],["/static/js/ReactChart2-box.2790fe13.chunk.js","764f1bb0924bc1eb0f60f16cbb2a5e76"],["/static/js/ReactChart2-bubble.8d529493.chunk.js","d10fa4cee2df5a174758fbe459666389"],["/static/js/ReactChart2-contentHolder.fb62672d.chunk.js","0d9c19b614ff548daab52a0908b86bd3"],["/static/js/ReactChart2-dynamic-doughnut.4bf59831.chunk.js","02a14f73b47f1076fffd009cfd1e766e"],["/static/js/ReactChart2-horizontalBar.365b1a53.chunk.js","4bedb8ba31eb239e6b9051a3b7a5e133"],["/static/js/ReactChart2-layoutWrapper.57697763.chunk.js","e2eb860e48d3f93900bdc369b46caca8"],["/static/js/ReactChart2-line.4df35d96.chunk.js","46861e31e36dc3cc8e5eb14bcdecd997"],["/static/js/ReactChart2-mix.005afff3.chunk.js","5a27b976d44583be136e81e08451d3ea"],["/static/js/ReactChart2-pageHeader.5c462cf9.chunk.js","c50765b837b6aeb13fc630e728eeb194"],["/static/js/ReactChart2-pie.89c9d595.chunk.js","7bf524d73346b1cd1f58231613b3d82d"],["/static/js/ReactChart2-polar.c28ce8ff.chunk.js","b2f04a9298fdb28ea06dfd166af96cdf"],["/static/js/ReactChart2-radar.c10018e2.chunk.js","ab45b2dcdada19e624bbdd964cbb23c9"],["/static/js/ReactChart2-randomizedLine.35556733.chunk.js","9444990db7f8bf52451a54e15523329f"],["/static/js/googleChart.197d62b4.chunk.js","851494fcbd733a17c9e8f4c258448225"],["/static/js/main.2b1923e2.js","875b92d82a19f9ac49761acac4d26835"],["/static/media/bucket.545fd26b.svg","545fd26b9adf577d566434eaf2ab0d70"],["/static/media/image3.d032955c.jpg","d032955c4314cf635a801dc49f74b96a"],["/static/media/image5.603427e6.jpg","603427e6eaa565bed5f98f003c67bf23"],["/static/media/italy.604345b4.svg","604345b476aa52a0245ee2ffd3cd50db"],["/static/media/rob.b34fc52c.png","b34fc52c382add7ec9fa87c03adfe907"],["/static/media/sign.adf5846b.jpg","adf5846b1711fa8000cfd4c6c65a411d"],["/static/media/uk.bc48afcc.svg","bc48afcc15d5d9d51255de0b2ee708be"],["/static/media/work.56bf9122.jpg","56bf912220fcc0ea7d0f6595a28f9a4d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),c="index.html";(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),a=urlsToCacheKeys.has(t));var s="/index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(s,self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});