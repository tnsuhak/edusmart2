(function(){
  var panel=document.querySelector('.gnav-panel');
  if(panel && !panel.querySelector('a[href="student-life-videos.html"]')){
    var home=panel.querySelector('a[href="index.html"]');
    var link=document.createElement('a');
    link.href='student-life-videos.html';
    link.className='wide';
    link.innerHTML='실제 학생 생활 영상<small>홈스테이 · 식사 · 학교 적응 · 주말 활동</small>';
    if(home){
      home.insertAdjacentElement('afterend',link);
    }else{
      panel.insertBefore(link,panel.children[1]||null);
    }
  }
  var core=document.createElement('script');
  core.src='nav-core.js';
  core.async=false;
  document.head.appendChild(core);
})();
