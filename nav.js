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
 document.querySelectorAll('.load-video').forEach(button=>button.addEventListener('click',()=>{
  const iframe=document.createElement('iframe');iframe.src=button.dataset.src;
  iframe.title=button.textContent.trim();iframe.allow='fullscreen; picture-in-picture';iframe.allowFullscreen=true;
  button.replaceWith(iframe);
 }));
 const core=document.createElement('script');core.src='nav-core.js';document.head.appendChild(core);
})();
