(() => {
  'use strict';
  const root=document.getElementById('kkana-clean');
  const tabs=[...root.querySelectorAll('[data-tab]')];
  const dialog=document.getElementById('work-dialog');
  const loaded=new Set();
  const ytButtons=new Map();
  let active='rig';
  function youtubeButton(item,box){
    const button=document.createElement('button');button.type='button';button.textContent='▶ 播放影片';button.setAttribute('aria-label','播放 '+item.title);
    button.addEventListener('click',()=>{
      const iframe=document.createElement('iframe');iframe.src='https://www.youtube.com/embed/'+encodeURIComponent(item.id)+'?autoplay=1&playsinline=1';iframe.title=item.title;iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';
      box.replaceChildren(iframe);ytButtons.set(box,()=>youtubeButton(item,box));
    });box.replaceChildren(button);
  }
  function loadGallery(category){
    if(loaded.has(category))return;loaded.add(category);
    const gallery=root.querySelector('[data-gallery="'+category+'"]');
    for(const item of window.KKANA_CONTENT[category]||[]){
      const figure=document.createElement('figure'),box=document.createElement('div'),caption=document.createElement('figcaption');box.className='kk-media';caption.textContent=item.title;
      if(item.type==='image'){
        const button=document.createElement('button'),img=document.createElement('img');button.type='button';button.setAttribute('aria-label','放大 '+item.title);img.src=item.src;img.alt=item.title;img.loading='lazy';img.decoding='async';button.append(img);box.append(button);
        button.addEventListener('click',()=>{document.getElementById('dialog-image').src=item.src;document.getElementById('dialog-image').alt=item.title;document.getElementById('dialog-caption').textContent=item.title;dialog.showModal();});
        img.addEventListener('error',()=>{button.textContent='開啟原始作品';button.onclick=()=>window.open(item.src,'_blank','noopener');});
      }else if(item.type==='video'){
        box.classList.add('video-frame');const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.src=item.src;if(item.poster)video.poster=item.poster;video.setAttribute('aria-label',item.title);box.append(video);
        const link=document.createElement('a');link.href=item.src;link.target='_blank';link.rel='noopener noreferrer';link.textContent='另開影片 ↗';link.className='kk-video-link';caption.append(link);
      }else if(item.type==='youtube'){
        box.classList.add('video-frame');youtubeButton(item,box);const link=document.createElement('a');link.href='https://www.youtube.com/watch?v='+encodeURIComponent(item.id);link.target='_blank';link.rel='noopener noreferrer';link.textContent='YouTube ↗';link.className='kk-video-link';caption.append(link);
      }
      figure.append(box,caption);gallery.append(figure);
    }
  }
  function show(category,writeHash=false){
    if(!['rig','model','art'].includes(category))category='rig';
    active=category;
    tabs.forEach(button=>{const selected=button.dataset.tab===category;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;});
    root.querySelectorAll('[role=tabpanel]').forEach(panel=>{panel.hidden=panel.id!=='kk-'+category;if(panel.hidden){panel.querySelectorAll('video').forEach(v=>v.pause());panel.querySelectorAll('iframe').forEach(frame=>{const box=frame.parentElement;ytButtons.get(box)?.();});}});
    loadGallery(category);
    if(writeHash)history.replaceState(null,'','#'+category);
  }
  tabs.forEach((button,index)=>{
    button.addEventListener('click',()=>show(button.dataset.tab,true));
    button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();tabs[next].focus();show(tabs[next].dataset.tab,true);}});
  });
  const currency=root.querySelector('#kk-currency');
  function prices(){root.querySelectorAll('[data-prices]').forEach(el=>{el.textContent=['MYR','TWD','USD'][Number(currency.value)]+' '+Number(el.dataset.prices.split(',')[Number(currency.value)]).toLocaleString('en-US')+' 起';});}
  currency.addEventListener('change',prices);
  document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  window.addEventListener('hashchange',()=>{const category=location.hash.slice(1);if(['rig','model','art'].includes(category))show(category);});
  show(location.hash.slice(1));prices();
})();
