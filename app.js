(() => {
  'use strict';
  const i18n=window.KK_I18N;
  const root=document.getElementById('kkana-clean');
  const tabs=[...root.querySelectorAll('[data-page]')];
  const dialog=document.getElementById('work-dialog');
  const loaded=new Set();
  const ytButtons=new Map();
  let active='rig';
  function youtubeButton(item,box){
    const button=document.createElement('button');button.type='button';button.textContent='▶ 播放影片';const thumb=document.createElement('img');thumb.src='https://i.ytimg.com/vi/'+encodeURIComponent(item.id)+'/hqdefault.jpg';thumb.alt='';thumb.loading='lazy';button.prepend(thumb);button.setAttribute('aria-label','播放 '+item.title);
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
        button.addEventListener('click',()=>{document.getElementById('dialog-image').src=item.src;delete document.getElementById('dialog-image').dataset.originalalt;document.getElementById('dialog-image').alt=item.title;document.getElementById('dialog-caption').textContent=item.title;dialog.showModal();i18n.apply();});
        img.addEventListener('error',()=>{button.textContent=i18n.t('開啟原始作品');});
      }else if(item.type==='video'){
        box.classList.add('video-frame');const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.src=item.src;if(item.poster)video.poster=item.poster;video.setAttribute('aria-label',item.title);box.append(video);
        const link=document.createElement('a');link.href=item.src;link.target='_blank';link.rel='noopener noreferrer';link.textContent='另開影片 ↗';link.className='kk-video-link';caption.append(link);
      }else if(item.type==='youtube'){
        box.classList.add('video-frame');youtubeButton(item,box);const link=document.createElement('a');link.href='https://www.youtube.com/watch?v='+encodeURIComponent(item.id);link.target='_blank';link.rel='noopener noreferrer';link.textContent='YouTube ↗';link.className='kk-video-link';caption.append(link);
      }
      figure.append(box,caption);gallery.append(figure);
    }
  }
  function show(category){
    if(!['home','rig','model','art'].includes(category))category='home';
    active=category;
    const home=category==='home';
    document.getElementById('kk-homepage').hidden=!home;
    document.getElementById('kk-services').hidden=home;
    tabs.forEach(link=>{if(link.dataset.page===category)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    root.querySelectorAll('[data-work-panel]').forEach(panel=>{
      panel.hidden=panel.id!=='kk-'+category;
      if(panel.hidden){panel.querySelectorAll('video').forEach(v=>v.pause());panel.querySelectorAll('iframe').forEach(frame=>{const box=frame.parentElement;ytButtons.get(box)?.();});}
    });
    const titles={rig:'Live2D Rig <span>建模</span>',model:'Live2D Art <span>繪圖・立繪拆圖</span>',art:'Illustration <span>插畫繪圖</span>'};
    if(!home){document.getElementById('kk-page-title').innerHTML=titles[category];loadGallery(category);}
    i18n.apply();
    document.title=home?'kkana work':({rig:'Live2D Rig',model:'Live2D Art',art:'Illustration'}[category]+' | kkana work');
  }
  function route(){
    const hash=location.hash.slice(1);
    show(['rig','model','art'].includes(hash)?hash:'home');
    if(['kk-contact','kk-terms','kk-services','main-content'].includes(hash))document.getElementById(hash)?.scrollIntoView();
    else window.scrollTo(0,0);
  }
  const currency=root.querySelector('#kk-currency');
  function prices(){root.querySelectorAll('[data-prices]').forEach(el=>{el.textContent=['MYR','TWD','USD'][Number(currency.value)]+' '+Number(el.dataset.prices.split(',')[Number(currency.value)]).toLocaleString('en-US')+(i18n.lang==='en'?' +':' 起');});}
  currency.addEventListener('change',prices);
  document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  window.addEventListener('hashchange',route);
  window.addEventListener('kk-language-change',()=>{prices();i18n.apply();document.title=i18n.lang==='en'?'Kana | Live2D & Illustration':'kkana work | Live2D・繪畫委託';});
  route();prices();i18n.apply();
})();

