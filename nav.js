// 드롭다운 메뉴: 바깥 클릭 / ESC 키로 닫기
(function () {
  var menu = document.querySelector('.gnav-menu');
  if (!menu) return;
  document.addEventListener('click', function (e) {
    if (menu.open && !menu.contains(e.target)) menu.open = false;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.open) menu.open = false;
  });
})();

// 학년·예산·자기관리 수준에 따른 1차 프로그램 후보 안내
(function () {
  var form = document.getElementById('finder-form');
  var result = document.getElementById('finder-result');
  if (!form || !result) return;

  var programs = [
    {name:'코퀴틀람 기숙사 G5~7', minGrade:5, maxGrade:7, minCost:71000, cost:'CA$71,000~78,000', care:3, href:'dorm-young.html', reason:'기숙사 생활과 매일 생활·학습 관리가 필요한 저학년에게 적합'},
    {name:'코퀴틀람 기숙사 G7~11', minGrade:7, maxGrade:11, minCost:69700, cost:'CA$69,700~80,700', care:3, href:'dorm-junior.html', reason:'저녁 학습과 내신·입시 관리를 함께 원하는 학생에게 적합'},
    {name:'코퀴틀람 홈스테이 관리형', minGrade:7, maxGrade:11, minCost:65700, cost:'CA$65,700~76,700', care:2, href:'homestay.html', reason:'현지 가정 생활과 방과후 학습 지원을 함께 원하는 학생에게 적합'},
    {name:'코퀴틀람 주니어 골프', minGrade:6, maxGrade:11, minCost:101700, cost:'CA$101,700~108,400', care:2, href:'golf.html', reason:'골프 훈련과 캐나다 학교생활을 함께 계획하는 학생을 위한 특화 과정'},
    {name:'랭리 대학 입시 관리형', minGrade:8, maxGrade:11, minCost:58500, cost:'CA$58,500', care:2, href:'langley.html', reason:'홈스테이 생활과 대학 입시 지원을 균형 있게 원하는 학생에게 적합'},
    {name:'버나비 아카데믹 관리형', minGrade:8, maxGrade:11, minCost:58500, cost:'CA$58,500', care:2, href:'burnaby.html', reason:'도심 접근성과 아카데믹 프로그램 상담을 함께 원하는 학생에게 적합'},
    {name:'랭리 교육청 가디언형', minGrade:8, maxGrade:11, minCost:38250, cost:'CA$38,250', care:1, href:'guardian-metro.html', reason:'자기주도 학습이 가능하고 비용 효율을 중시하는 학생에게 적합'},
    {name:'칠리왁 공립교육청 가디언형', minGrade:8, maxGrade:11, minCost:37450, cost:'CA$37,450', care:1, href:'guardian-chilliwack.html', reason:'영어 중심 생활환경과 비교적 낮은 비용을 우선하는 학생에게 적합'},
    {name:'버나비 교육청 가디언형', minGrade:8, maxGrade:11, minCost:42425, cost:'CA$42,425', care:1, href:'guardian-metro.html', reason:'자기관리 능력이 있고 도심 접근성을 중시하는 학생에게 적합'},
    {name:'코퀴틀람 교육청 가디언형', minGrade:8, maxGrade:11, minCost:44500, cost:'CA$44,500', care:1, href:'guardian-metro.html', reason:'자기주도 학습이 가능하고 아침 등교 지원이 필요한 학생에게 적합'},
    {name:'하이로드 아카데미 가디언형', minGrade:8, maxGrade:11, minCost:48775, cost:'CA$48,775', care:1, href:'guardian-highroad.html', reason:'소규모 기독교 사립학교 환경을 선호하는 학생에게 적합'}
  ];

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"']/g, function (char) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[char];
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var grade = Number(form.elements.grade.value);
    var budget = Number(form.elements.budget.value);
    var care = Number(form.elements.independence.value);
    var eligibleByGrade = programs.filter(function (program) {
      return grade >= program.minGrade && grade <= program.maxGrade;
    });
    var eligible = eligibleByGrade.filter(function (program) {
      return program.minCost <= budget;
    });

    result.hidden = false;
    if (!eligible.length) {
      result.innerHTML = '<h3>현재 조건에 맞는 프로그램이 없습니다</h3>' +
        '<div class="finder-empty">Grade ' + escapeHtml(grade) + '에서 선택한 예산 범위로 가능한 과정이 확인되지 않습니다. 예산 범위를 조정하거나 상담을 통해 학기·숙소·포함 항목별 비용을 다시 확인해 주세요.</div>';
      result.scrollIntoView({behavior:'smooth', block:'nearest'});
      return;
    }

    eligible.sort(function (a, b) {
      var careScoreA = Math.abs(a.care - care);
      var careScoreB = Math.abs(b.care - care);
      if (careScoreA !== careScoreB) return careScoreA - careScoreB;
      return a.minCost - b.minCost;
    });

    var selected = eligible.slice(0, 3);
    var budgetLabel = budget === 45000 ? 'CA$45,000 이하' : (budget === 60000 ? 'CA$45,001~60,000' : 'CA$60,001 이상');
    var careMismatch = selected.every(function (program) { return program.care !== care; });
    var cards = selected.map(function (program, index) {
      return '<article class="finder-card">' +
        '<div class="rank">추천 후보 ' + (index + 1) + '</div>' +
        '<h4>' + escapeHtml(program.name) + '</h4>' +
        '<div class="price">' + escapeHtml(program.cost) + ' / 연</div>' +
        '<div class="reason">' + escapeHtml(program.reason) + '</div>' +
        '<a href="' + escapeHtml(program.href) + '">상세 정보 보기 →</a>' +
      '</article>';
    }).join('');

    result.innerHTML = '<h3>우선 검토할 프로그램 ' + selected.length + '개</h3>' +
      '<p>Grade ' + escapeHtml(grade) + ' · ' + escapeHtml(budgetLabel) + ' · 선택한 관리 수준을 기준으로 정렬했습니다.</p>' +
      '<div class="finder-cards">' + cards + '</div>' +
      (careMismatch ? '<div class="finder-warning"><b>참고:</b> 선택한 예산 안에서는 요청한 관리 강도와 정확히 일치하는 과정이 없습니다. 아래 결과는 학년과 예산에 맞는 가장 가까운 후보입니다.</div>' : '') +
      '<div class="finder-warning">이 결과는 1차 비교용입니다. 학교 자리, 입학 시기, 영어 수준, 비용 포함·불포함 항목을 확인한 뒤 최종 결정해야 합니다.</div>';
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();
