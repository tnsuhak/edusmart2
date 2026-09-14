// Shared navigation and footer are rendered into HTML by build.mjs.
(function(){
 const menu=document.querySelector('.gnav-menu');
 if(menu){
  const groups=menu.querySelectorAll('.nav-group');
  const desktop=window.matchMedia('(min-width: 900px)');
  function sync(){groups.forEach(group=>group.open=desktop.matches);}
  sync();desktop.addEventListener('change',sync);
  groups.forEach(group=>group.addEventListener('toggle',()=>{if(group.open&&!desktop.matches)groups.forEach(other=>{if(other!==group)other.open=false;});}));
  menu.addEventListener('click',event=>{if(event.target.closest('a'))menu.open=false;});
 }

 // Student-life videos should look like the real Instagram/YouTube embeds on first view.
 // Insert the iframes automatically and let native lazy-loading defer off-screen media.
 document.querySelectorAll('.load-video').forEach(button=>{
  const iframe=document.createElement('iframe');
  iframe.src=button.dataset.src;
  iframe.title=button.textContent.trim();
  iframe.loading='lazy';
  iframe.allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen';
  iframe.allowFullscreen=true;
  iframe.referrerPolicy='strict-origin-when-cross-origin';
  button.replaceWith(iframe);
 });

 const core=document.createElement('script');core.src='nav-core.js';document.head.appendChild(core);
})();
