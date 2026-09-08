(function(){
  var panel=document.querySelector('.gnav-panel');
  var isVideoPage=window.location.pathname.indexOf('student-life-videos.html')!==-1;

  /* 영상 페이지도 다른 서브페이지처럼 현재 페이지명이 상단 메뉴 버튼에 표시되게 통일 */
  if(isVideoPage){
    var menu=document.querySelector('.gnav-menu');
    var summary=menu ? menu.querySelector('summary') : null;
    if(summary){
      summary.innerHTML='실제 학생 생활 영상 모음 <span class="caret">▼</span>';
    }
  }

  if(panel){
    var home=panel.querySelector('a[href="index.html"]');
    if(home && home.innerHTML.indexOf('🗂️')===-1){
      home.innerHTML='🗂️ '+home.innerHTML;
    }

    var link=panel.querySelector('a[href="student-life-videos.html"]');
    if(!link){
      link=document.createElement('a');
      link.href='student-life-videos.html';
    }

    link.classList.add('wide','student-video-link');
    if(isVideoPage){
      link.classList.add('active');
    }else{
      link.classList.remove('active');
    }
    link.innerHTML='🎬 실제 학생 생활 영상 모음<small>홈스테이 · 식사 · 학교 적응 · 주말 활동</small>';

    /* 영상 모음은 프로그램 분류와 별도의 콘텐츠이므로 모든 페이지에서 메뉴 맨 아래에 배치 */
    panel.appendChild(link);

    var style=document.createElement('style');
    style.textContent=
      '.gnav-panel a.student-video-link{grid-column:1 / -1;margin-top:9px;padding:12px 13px;border:1px solid #D5AE52;background:linear-gradient(135deg,#F7E7B7 0%,#E9C96F 100%);color:#11243F;font-weight:800;box-shadow:0 4px 12px rgba(17,36,63,.10);}' +
      '.gnav-panel a.student-video-link small{color:#66501A;font-weight:600;margin-top:3px;}' +
      '.gnav-panel a.student-video-link:hover{background:linear-gradient(135deg,#F9EDC9 0%,#EED27D 100%);border-color:#C9A24B;transform:translateY(-1px);}' +
      '.gnav-panel a.student-video-link.active{background:linear-gradient(135deg,#E8C96F 0%,#DDB654 100%);color:#11243F;}' +
      '.gnav-panel a.student-video-link.active small{color:#5C4715;}';
    document.head.appendChild(style);
  }

  /* 모든 페이지 하단 연락처를 동일한 2줄 형식으로 통일 */
  var footerContact=document.querySelector('footer .ft-contact');
  if(footerContact){
    footerContact.innerHTML=
      '<div class="ft-contact-row"><b>서울 본사:</b> 서울시 강남구 테헤란로5길 7 KG타워 B1 (06134) · ☎ <a href="tel:0232881733">02-3288-1733~1735</a></div>' +
      '<div class="ft-contact-row"><b>부산 지사:</b> 부산 부산진구 중앙대로 694 쥬디스태화 9층 37호 (47295) · ☎ <a href="tel:01050241733">010-5024-1733</a></div>';

    var footerStyle=document.createElement('style');
    footerStyle.textContent=
      'footer .ft-contact .ft-contact-row{display:block;margin:0;line-height:1.9;}' +
      'footer .ft-contact .ft-contact-row+ .ft-contact-row{margin-top:4px;}' +
      '@media(min-width:900px){footer .ft-contact .ft-contact-row{white-space:nowrap;}}' +
      '@media(max-width:899px){footer .ft-contact .ft-contact-row{white-space:normal;}}';
    document.head.appendChild(footerStyle);
  }

  var core=document.createElement('script');
  core.src='nav-core.js';
  core.async=false;
  document.head.appendChild(core);
})();
