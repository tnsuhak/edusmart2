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

  var gradeSelect = form.elements.grade;
  var budgetSelect = form.elements.budget;
  var careSelect = form.elements.independence;

  var programs = [
    {name:'코퀴틀람 기숙사 G5~7', minGrade:5, maxGrade:7, minCost:71000, cost:'CA$71,000~78,000', care:3, href:'dorm-young.html', reason:'기숙사 생활과 매일 생활·학습 관리가 필요한 저학년에게 적합'},
    {name:'코퀴틀람 기숙사 G7~11', minGrade:7, maxGrade:11, minCost:69700, cost:'CA$69,700~80,700', care:3, href:'dorm-junior.html', reason:'저녁 학습과 내신·입시 관리를 함께 원하는 학생에게 적합'},
    {name:'코퀴틀람 홈스테이 관리형', minGrade:7, maxGrade:11, minCost:65700, cost:'CA$65,700~76,700', care:2, href:'homestay.html', reason:'현지 가정 생활과 방과후 학습 지원을 함께 원하는 학생에게 적합'},
    {name:'코퀴틀람 주니어 골프', minGrade:6, maxGrade:11, minCost:101700, cost:'CA$101,700~108,400', care:2, href:'golf.html', reason:'골프 훈련과 캐나다 학교생활을 함께 계획하는 학생을 위한 특화 과정', special:'golf'},
    {name:'랭리 대학 입시 관리형', minGrade:8, maxGrade:11, minCost:58500, cost:'CA$58,500', care:2, href:'langley.html', reason:'홈스테이 생활과 대학 입시 지원을 균형 있게 원하는 학생에게 적합'},
    {name:'버나비 아카데믹 관리형', minGrade:8, maxGrade:11, minCost:58500, cost:'CA$58,500', care:2, href:'burnaby.html', reason:'도심 접근성과 아카데믹 프로그램 상담을 함께 원하는 학생에게 적합'},
    {name:'랭리 교육청 가디언형', minGrade:8, maxGrade:11, minCost:38250, cost:'CA$38,250', care:1, href:'guardian-metro.html', reason:'자기주도 학습이 가능하고 비용 효율을 중시하는 학생에게 적합'},
    {name:'칠리왁 공립교육청 가디언형', minGrade:8, maxGrade:11, minCost:37450, cost:'CA$37,450', care:1, href:'guardian-chilliwack.html', reason:'영어 중심 생활환경과 비교적 낮은 비용을 우선하는 학생에게 적합'},
    {name:'버나비 교육청 가디언형', minGrade:8, maxGrade:11, minCost:42425, cost:'CA$42,425', care:1, href:'guardian-metro.html', reason:'자기관리 능력이 있고 도심 접근성을 중시하는 학생에게 적합'},
    {name:'코퀴틀람 교육청 가디언형', minGrade:8, maxGrade:11, minCost:44500, cost:'CA$44,500', care:1, href:'guardian-metro.html', reason:'자기주도 학습이 가능하고 아침 등교 지원이 필요한 학생에게 적합'},
    {name:'하이로드 아카데미 가디언형', minGrade:8, maxGrade:11, minCost:48775, cost:'CA$48,775', care:1, href:'guardian-highroad.html', reason:'소규모 기독교 사립학교 환경을 선호하는 학생에게 적합'}
  ];

  // 안드로이드 기본 select 팝업은 disabled 옵션 색상을 브라우저가 강제로 그립니다.
  // 예산/자기관리 선택창은 페이지 안에서 직접 그려 선택 불가 상태를 확실히 표시합니다.
  var style = document.createElement('style');
  style.textContent =
    '.finder-native-hidden{position:absolute!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;}' +
    '.finder-custom-select{position:relative;width:100%;min-width:0;}' +
    '.finder-custom-trigger{width:100%;min-height:44px;border:1px solid var(--line);border-radius:10px;padding:9px 38px 9px 10px;background:#FBF8F2;color:var(--ink);font:inherit;font-size:11.5px;text-align:left;cursor:pointer;position:relative;}' +
    '.finder-custom-trigger:after{content:"⌄";position:absolute;right:12px;top:50%;transform:translateY(-55%);font-size:16px;color:var(--muted);}' +
    '.finder-custom-trigger[aria-expanded="true"]{outline:2px solid var(--gold);outline-offset:1px;}' +
    '.finder-custom-trigger:disabled{background:#F1F1EF;color:#A5A5A2;cursor:not-allowed;}' +
    '.finder-custom-menu{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:80;background:#fff;border:1px solid #D8D5CE;border-radius:12px;box-shadow:0 12px 30px rgba(17,36,63,.18);overflow:hidden;}' +
    '.finder-custom-menu[hidden]{display:none!important;}' +
    '.finder-custom-option{display:flex;width:100%;min-height:48px;align-items:center;justify-content:space-between;gap:10px;border:0;border-bottom:1px solid #ECE9E3;background:#fff;padding:11px 13px;color:var(--ink);font:inherit;font-size:12px;text-align:left;cursor:pointer;}' +
    '.finder-custom-option:last-child{border-bottom:0;}' +
    '.finder-custom-option.is-selected{font-weight:700;background:#fff;}' +
    '.finder-selected-check{display:none;flex:0 0 auto;font-size:16px;font-weight:800;color:var(--navy-2);line-height:1;}' +
    '.finder-custom-option.is-selected .finder-selected-check{display:inline-flex;}' +
    '.finder-custom-option:disabled{opacity:1;background:#EFEFED;color:#A7A7A4;cursor:not-allowed;}' +
    '.finder-custom-option:disabled .finder-unavailable{display:inline-flex;}' +
    '.finder-custom-option:disabled .finder-selected-check{display:none;}' +
    '.finder-unavailable{display:none;flex:0 0 auto;border-radius:999px;background:#D9D9D6;color:#777;font-size:9.5px;font-weight:700;padding:4px 7px;}' +
    '@media (max-width:600px){.finder-field>.finder-custom-select{grid-column:1 / -1;width:100%;}.finder-custom-trigger{font-size:11.5px}.finder-custom-option{font-size:12px;min-height:52px}.finder-unavailable{font-size:9px}.finder-selected-check{font-size:15px;}}';
  document.head.appendChild(style);

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"']/g, function (char) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[char];
    });
  }

  function optionItems(select) {
    return Array.prototype.slice.call(select.options).filter(function (option) {
      return option.value !== '';
    });
  }

  function hideResult() {
    result.hidden = true;
    result.innerHTML = '';
  }

  function makeCustomSelect(select) {
    var originalId = select.id;
    var label = select.closest ? select.closest('label') : null;
    var wrapper = document.createElement('div');
    var trigger = document.createElement('button');
    var menu = document.createElement('div');

    wrapper.className = 'finder-custom-select';
    trigger.type = 'button';
    trigger.className = 'finder-custom-trigger';
    trigger.id = originalId;
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    menu.className = 'finder-custom-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;

    select.id = originalId + '-native';
    select.classList.add('finder-native-hidden');
    select.required = false;
    if (label) label.setAttribute('for', originalId);
    select.insertAdjacentElement('afterend', wrapper);
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);

    function close() {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }

    function render() {
      var current = select.options[select.selectedIndex];
      var placeholder = select.options[0] ? select.options[0].textContent : '선택';
      trigger.textContent = current && current.value ? current.textContent : placeholder;
      trigger.disabled = select.disabled;
      menu.innerHTML = '';

      optionItems(select).forEach(function (option) {
        var item = document.createElement('button');
        var text = document.createElement('span');
        var unavailable = document.createElement('span');
        var selectedCheck = document.createElement('span');

        item.type = 'button';
        item.className = 'finder-custom-option' + (select.value === option.value ? ' is-selected' : '');
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', select.value === option.value ? 'true' : 'false');
        item.disabled = option.disabled;
        text.textContent = option.textContent;
        unavailable.className = 'finder-unavailable';
        unavailable.textContent = '선택 불가';
        selectedCheck.className = 'finder-selected-check';
        selectedCheck.textContent = '✓';
        selectedCheck.setAttribute('aria-hidden', 'true');
        item.appendChild(text);
        item.appendChild(unavailable);
        item.appendChild(selectedCheck);

        item.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (option.disabled) return;
          select.value = option.value;
          select.dispatchEvent(new Event('change', {bubbles:true}));
          close();
          render();
        });
        menu.appendChild(item);
      });
    }

    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (trigger.disabled) return;
      var willOpen = menu.hidden;
      document.querySelectorAll('.finder-custom-menu').forEach(function (otherMenu) {
        if (otherMenu !== menu) otherMenu.hidden = true;
      });
      document.querySelectorAll('.finder-custom-trigger').forEach(function (otherTrigger) {
        if (otherTrigger !== trigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });
      menu.hidden = !willOpen;
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (event) {
      if (!wrapper.contains(event.target)) close();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });

    return {render:render, trigger:trigger, close:close};
  }

  var budgetUi = makeCustomSelect(budgetSelect);
  var careUi = makeCustomSelect(careSelect);

  function renderCustomSelects() {
    budgetUi.render();
    careUi.render();
  }

  function selectIfOnlyOneEnabled(select) {
    var enabled = optionItems(select).filter(function (option) {
      return !option.disabled;
    });
    var current = select.options[select.selectedIndex];

    if (current && current.value && current.disabled) select.value = '';
    if (enabled.length === 1) select.value = enabled[0].value;
  }

  function generalProgramsForGrade(grade) {
    return programs.filter(function (program) {
      return !program.special && grade >= program.minGrade && grade <= program.maxGrade;
    });
  }

  function golfProgramsForGrade(grade) {
    return programs.filter(function (program) {
      return program.special === 'golf' && grade >= program.minGrade && grade <= program.maxGrade;
    });
  }

  function syncCareOptions() {
    var grade = Number(gradeSelect.value);
    var budget = Number(budgetSelect.value);
    var careOptions = optionItems(careSelect);

    careSelect.disabled = !grade || !budget;

    if (!grade || !budget) {
      careSelect.value = '';
      careOptions.forEach(function (option) { option.disabled = true; });
      renderCustomSelects();
      return;
    }

    var candidates = generalProgramsForGrade(grade).filter(function (program) {
      return program.minCost <= budget;
    });

    careOptions.forEach(function (option) {
      var care = Number(option.value);
      option.disabled = !candidates.some(function (program) {
        return program.care === care;
      });
    });

    selectIfOnlyOneEnabled(careSelect);
    renderCustomSelects();
  }

  function syncBudgetOptions() {
    var grade = Number(gradeSelect.value);
    var budgetOptions = optionItems(budgetSelect);

    budgetSelect.disabled = !grade;

    if (!grade) {
      budgetSelect.value = '';
      budgetOptions.forEach(function (option) { option.disabled = true; });
      syncCareOptions();
      renderCustomSelects();
      return;
    }

    // 예산 선택 가능 여부는 특화 골프가 아니라 일반 관리형/가디언형 과정 기준으로 판단합니다.
    var candidates = generalProgramsForGrade(grade);

    budgetOptions.forEach(function (option) {
      var budget = Number(option.value);
      option.disabled = !candidates.some(function (program) {
        return program.minCost <= budget;
      });
    });

    selectIfOnlyOneEnabled(budgetSelect);
    syncCareOptions();
    renderCustomSelects();
  }

  gradeSelect.addEventListener('change', function () {
    hideResult();
    syncBudgetOptions();
  });

  budgetSelect.addEventListener('change', function () {
    hideResult();
    syncCareOptions();
  });

  careSelect.addEventListener('change', function () {
    hideResult();
    renderCustomSelects();
  });

  // 처음에는 앞 단계가 선택되기 전까지 뒤 선택창을 비활성화합니다.
  syncBudgetOptions();
  renderCustomSelects();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var grade = Number(gradeSelect.value);
    var budget = Number(budgetSelect.value);
    var care = Number(careSelect.value);

    if (!grade) {
      gradeSelect.focus();
      return;
    }
    if (!budget) {
      budgetUi.trigger.focus();
      return;
    }
    if (!care) {
      careUi.trigger.focus();
      return;
    }

    var eligible = generalProgramsForGrade(grade).filter(function (program) {
      return program.minCost <= budget && program.care === care;
    });

    result.hidden = false;
    if (!eligible.length) {
      result.innerHTML = '<h3>조건을 다시 확인해 주세요</h3>' +
        '<div class="finder-empty">현재 학년·예산·자기관리 수준에 정확히 맞는 일반 과정이 없습니다. 앞 단계 선택을 바꾸면 가능한 항목만 자동으로 활성화됩니다.</div>';
      result.scrollIntoView({behavior:'smooth', block:'nearest'});
      return;
    }

    eligible.sort(function (a, b) {
      return a.minCost - b.minCost;
    });

    var selected = eligible.slice(0, 3);
    var budgetLabel = budget === 45000 ? 'CA$45,000 이하' : (budget === 60000 ? 'CA$45,001~60,000' : 'CA$60,001 이상');
    var careLabel = care === 3 ? '매일 생활·학습 관리 필요' : (care === 2 ? '일부 도움 필요' : '스스로 학습 가능');
    var cards = selected.map(function (program, index) {
      return '<article class="finder-card">' +
        '<div class="rank">추천 후보 ' + (index + 1) + '</div>' +
        '<h4>' + escapeHtml(program.name) + '</h4>' +
        '<div class="price">' + escapeHtml(program.cost) + ' / 연</div>' +
        '<div class="reason">' + escapeHtml(program.reason) + '</div>' +
        '<a href="' + escapeHtml(program.href) + '">상세 정보 보기 →</a>' +
      '</article>';
    }).join('');

    var golfOption = golfProgramsForGrade(grade).filter(function (program) {
      return program.minCost <= budget;
    })[0];
    var golfHtml = golfOption ?
      '<div class="finder-warning"><b>⛳ 골프를 병행하고 싶다면?</b> 일반 관리 수준 추천과는 별도로 <b>' + escapeHtml(golfOption.name) + '</b>도 가능합니다. 골프 훈련비가 포함되어 연간 비용은 ' + escapeHtml(golfOption.cost) + '입니다. <a href="' + escapeHtml(golfOption.href) + '"><b>골프 프로그램 보기 →</b></a></div>' : '';

    result.innerHTML = '<h3>우선 검토할 프로그램 ' + selected.length + '개</h3>' +
      '<p>Grade ' + escapeHtml(grade) + ' · ' + escapeHtml(budgetLabel) + ' · ' + escapeHtml(careLabel) + ' 조건에 맞는 일반 과정입니다.</p>' +
      '<div class="finder-cards">' + cards + '</div>' +
      golfHtml +
      '<div class="finder-warning">이 결과는 1차 비교용입니다. 학교 자리, 입학 시기, 영어 수준, 비용 포함·불포함 항목을 확인한 뒤 최종 결정해야 합니다.</div>';
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();