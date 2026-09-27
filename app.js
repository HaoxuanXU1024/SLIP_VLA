'use strict';
const realDemos = [
 {title:'Corn to plate',category:'IN-DISTRIBUTION',rate:86,ids:[4,3,1,2],instruction:'Place the corn on the plate.'},
 {title:'An unseen background',category:'VISUAL GENERALIZATION',rate:70,ids:[9,10,11,12],instruction:'The same objective, with an unseen table background.'},
 {title:'A different appearance',category:'VISUAL GENERALIZATION',rate:70,ids:[5,8,6,7],instruction:'Place the corn on the plate with a changed object appearance.'},
 {title:'A new orientation',category:'VISUAL GENERALIZATION',rate:66,ids:[13,16,14,15],instruction:'Place the corn on the plate from an unseen object orientation.'},
 {title:'Open. Pick. Place.',category:'LONG-HORIZON · 2-STEP',rate:82,ids:[20,19,18,17],instruction:'Open the pot lid, then place the corn into the pot.'},
 {title:'And close the lid.',category:'LONG-HORIZON · 3-STEP',rate:74,ids:[24,23,22,21],instruction:'Open the pot lid, place the corn into the pot, and close the lid.'}
];
const views=['Observation camera','Scene camera','Left wrist','Right wrist'];
const benchmarks=[
 {id:'libero',name:'LIBERO',tasks:[{title:'Turn on the stove & place the moka pot',ids:[28,27]},{title:'Place the cream cheese in the basket',ids:[26,25]}]},
 {id:'plus',name:'LIBERO-Plus',tasks:[{title:'Moka pot under visual shifts',ids:[32,31]},{title:'Put the soup & tomato sauce in the basket',ids:[30,29]}]},
 {id:'robotwin',name:'RoboTwin 2.0',tasks:[{title:'Grasp the hammer & hit the block',ids:[34,36]},{title:'Arrange the red, green & blue blocks',ids:[33,35]}]}
];
const video=(id,label,extra='')=>`<video data-src="assets/videos/media${id}.mp4" poster="assets/posters/media${id}.jpg" muted loop playsinline preload="none" aria-label="${label}" ${extra}></video>`;
const heroes=[{id:9,title:'Generalize to visual shifts',category:'REAL-WORLD ROBUSTNESS',demo:1},{id:24,title:'See ahead. Act with purpose.',category:'LONG-HORIZON MANIPULATION',demo:5},{id:33,title:'Coordinate both arms',category:'BIMANUAL CONTROL',bench:'robotwin',task:1}];
document.querySelector('#hero-reel').innerHTML=heroes.map((h,i)=>`<button class="hero-clip" data-hero="${i}" aria-label="Watch ${h.title}">${video(h.id,h.title)}<span class="clip-play" aria-hidden="true">▶</span><span class="clip-overlay"><small>${h.category}</small><strong>${h.title}</strong></span></button>`).join('');
document.querySelector('#real-grid').innerHTML=realDemos.map((d,i)=>`<article class="demo-card"><div class="demo-card-head"><div><p class="eyebrow">${d.category}</p><h3>${d.title}</h3></div><div class="success-rate">${d.rate}%<small>success rate</small></div></div><div class="main-view">${video(d.ids[0],d.title+' — observation camera')}<span class="view-label">Observation camera</span><span class="speed-label">4×</span><button data-real="${i}" aria-label="Expand ${d.title} in all four camera views"></button></div><div class="camera-grid">${d.ids.slice(1).map((id,j)=>`<button data-real="${i}" aria-label="Inspect ${d.title}, ${views[j+1]}">${video(id,d.title+' — '+views[j+1])}<span class="view-label">${views[j+1]}</span></button>`).join('')}</div><div class="demo-card-footer"><p>${d.instruction}</p><button class="expand-btn" data-real="${i}" aria-label="Expand ${d.title}">↗</button></div></article>`).join('');
document.querySelector('#benchmark-panels').innerHTML=benchmarks.map((b,bi)=>`<div role="tabpanel" id="panel-${b.id}" aria-labelledby="tab-${b.id}" ${bi?'hidden':''}><div class="comparison-grid">${b.tasks.map((t,ti)=>`<article class="comparison"><h3>${t.title}</h3><p>${b.name} · 10× speed</p><div class="comparison-videos">${t.ids.map((id,j)=>`<div class="compare-cell">${video(id,(j?'StarVLA':'SLIP-VLA')+': '+t.title)}<div class="compare-label"><strong class="${j?'baseline':''}">${j?'StarVLA':'SLIP-VLA'}</strong><small>${j?'Failure':'Success'}</small></div></div>`).join('')}</div><div class="comparison-actions"><button data-replay="${b.id}-${ti}">↻ Replay pair</button><button data-compare="${b.id}-${ti}">Expand comparison ↗</button></div></article>`).join('')}</div></div>`).join('');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let autoplay=!reduced.matches;
const motionButton=document.querySelector('#motion-toggle');
const dialog=document.querySelector('#video-dialog');
const visibleVideos=new Set();
function loadVideo(v){if(!v.getAttribute('src'))v.src=v.dataset.src;}
function playVideo(v){loadVideo(v);v.play().catch(()=>{});}
function updateMotionButton(){motionButton.setAttribute('aria-pressed',String(!autoplay));motionButton.innerHTML=autoplay?'Pause autoplay <span aria-hidden="true">Ⅱ</span>':'Enable autoplay <span aria-hidden="true">▶</span>';}
function syncPlayback(){document.querySelectorAll('main video').forEach(v=>{if(autoplay&&visibleVideos.has(v)&&!v.closest('[hidden]')&&!document.hidden&&!dialog.open)playVideo(v);else v.pause();});}
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)visibleVideos.add(e.target);else visibleVideos.delete(e.target);});syncPlayback();},{threshold:.12});
document.querySelectorAll('main video').forEach(v=>observer.observe(v));
motionButton.addEventListener('click',()=>{autoplay=!autoplay;updateMotionButton();syncPlayback();});updateMotionButton();
reduced.addEventListener('change',e=>{if(e.matches){autoplay=false;updateMotionButton();syncPlayback();}});
document.addEventListener('visibilitychange',syncPlayback);
function openViewer(title,category,ids,labels){document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-category').textContent=category;document.querySelector('#dialog-content').innerHTML=`<div class="dialog-views">${ids.map((id,j)=>`<div class="dialog-view"><p>${labels[j]}</p>${video(id,title+' — '+labels[j],'controls')}</div>`).join('')}</div>`;dialog.showModal();syncPlayback();dialog.querySelectorAll('video').forEach(v=>{loadVideo(v);if(autoplay)playVideo(v);});}
function openReal(i){const d=realDemos[i];openViewer(d.title,d.category+' · 4× SPEED',d.ids,views);}
function openComparison(key){const [id,t]=key.split('-');const b=benchmarks.find(b=>b.id===id);const task=b.tasks[Number(t)];openViewer(task.title,b.name+' · 10× SPEED',task.ids,['SLIP-VLA · Success','StarVLA · Failure']);}
document.querySelectorAll('[data-real]').forEach(b=>b.addEventListener('click',()=>openReal(Number(b.dataset.real))));
document.querySelectorAll('[data-hero]').forEach(b=>b.addEventListener('click',()=>{const h=heroes[Number(b.dataset.hero)];if(h.demo!==undefined)openReal(h.demo);else openComparison(h.bench+'-'+h.task);}));
document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>openComparison(b.dataset.compare)));
document.querySelectorAll('[data-replay]').forEach(b=>b.addEventListener('click',()=>{b.closest('.comparison').querySelectorAll('video').forEach(v=>{loadVideo(v);v.currentTime=0;playVideo(v);});}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(v=>v.pause());document.querySelector('#dialog-content').replaceChildren();syncPlayback();});
const tabs=[...document.querySelectorAll('[role=tab]')];
function selectTab(b,focus=false){tabs.forEach(t=>{const active=t===b;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.querySelector('#panel-'+t.dataset.tab).hidden=!active;});if(focus)b.focus();syncPlayback();}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectTab(b));b.addEventListener('keydown',e=>{let index;if(e.key==='ArrowRight')index=(i+1)%tabs.length;if(e.key==='ArrowLeft')index=(i+tabs.length-1)%tabs.length;if(e.key==='Home')index=0;if(e.key==='End')index=tabs.length-1;if(index!==undefined){e.preventDefault();selectTab(tabs[index],true);}});});
document.querySelector('#copy-citation').addEventListener('click',async()=>{const text=document.querySelector('#bibtex').textContent;const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(text);status.textContent='BibTeX copied.';}catch{const range=document.createRange();range.selectNodeContents(document.querySelector('#bibtex'));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);status.textContent='Citation selected. Press Ctrl+C or ⌘C to copy.';}});
