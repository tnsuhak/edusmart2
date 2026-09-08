(function(){
  var panel=document.querySelector('.gnav-panel');
  var isVideoPage=window.location.pathname.indexOf('student-life-videos.html')!==-1;

  if(isVideoPage){
    var menu=document.querySelector('.gnav-menu');
    var summary=menu ? menu.querySelector('summary') : null;
    if(summary){
      summary.innerHTML='실제 학생 생활 영상 모음 <span class="caret">▼</span>';
    }
  }

  if(panel){
    /* 영상 페이지는 오래된 정적 메뉴 마크업을 쓰지 않고 다른 서브페이지와 동일한 구조로 강제 통일 */
    if(isVideoPage){
      panel.innerHTML=
        '<div class="grp">전체</div>' +
        '<a href="index.html" class="wide">🗂️ 전체 프로그램 비교<small>관리형 8개 + 가디언형 5개 선택지</small></a>' +
        '<div class="grp grp-managed">관리형 유학</div>' +
        '<a href="supervised.html">관리형이란?<small>학업·생활관리 범위 안내</small></a>' +
        '<a href="dorm-young.html">코퀴틀람 기숙사<small>G5~7 · 생활관리 중심</small></a>' +
        '<a href="dorm-junior.html">코퀴틀람 기숙사<small>G7~11 · 내신·입시 중심</small></a>' +
        '<a href="homestay.html">코퀴틀람 홈스테이<small>G7~11 · 현지 가정 생활</small></a>' +
        '<a href="golf.html">주니어 골프<small>G6~11 · 골프+학업 병행</small></a>' +
        '<a href="langley.html">랭리 관리형<small>G8~11 · 대학 입시 전문</small></a>' +
        '<a href="burnaby.html">버나비 관리형<small>G8~11 · AP·IB 아카데믹</small></a>' +
        '<a href="north-vancouver-public.html">노스밴쿠버 공립 관리형<small>G9~11 · 공립 4개 학교</small></a>' +
        '<a href="north-vancouver-private.html">노스밴쿠버 사립 관리형<small>G9~11 · St. Thomas Aquinas</small></a>' +
        '<div class="grp grp-guardian">가디언형 유학</div>' +
        '<a href="guardian.html">가디언형이란?<small>관리형과 정면 비교</small></a>' +
        '<a href="guardian-metro.html">버나비·랭리·코퀴틀람<small>G8~11 · 3개 교육청</small></a>' +
        '<a href="guardian-chilliwack.html">칠리왁 공립교육청<small>G9~11 · 영어 중심 지역</small></a>' +
        '<a href="guardian-highroad.html">칠리왁 하이로드 아카데미<small>G8~11 · 소규모 기독교 사립</small></a>' +
        '<a href="student-life-videos.html" class="active wide student-video-link">🎬 실제 학생 생활 영상 모음<small>홈스테이 · 식사 · 학교 적응 · 주말 활동</small></a>';
    }else{
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
      link.classList.remove('active');
      link.innerHTML='🎬 실제 학생 생활 영상 모음<small>홈스테이 · 식사 · 학교 적응 · 주말 활동</small>';
      panel.appendChild(link);
    }

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
