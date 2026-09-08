from pathlib import Path
import re


def load(name):
    p = Path(name)
    return p, p.read_text(encoding="utf-8")


def save(p, text):
    p.write_text(text, encoding="utf-8")


def update_date(text):
    text = re.sub(r"정보 업데이트\s+2026\.09\.(?:03|07)", "정보 업데이트 2026.09.08", text)
    text = re.sub(r'"dateModified"\s*:\s*"2026-09-(?:03|07)"', '"dateModified":"2026-09-08"', text)
    return text


p, s = load("supervised.html")
marker = '    <span class="section-label">SUPERVISED VS GUARDIAN</span>'
insert = '''    <span class="section-label">DORM VS HOMESTAY</span>
    <h2>기숙사와 홈스테이, 어떤 학생에게 더 맞을까요?</h2>
    <table class="dtable">
      <tr><th class="h-item">선택 기준</th><th class="h-a">기숙사형</th><th class="h-b">홈스테이형</th></tr>
      <tr><td class="item">생활 방식</td><td>학생들과 함께 생활하며 정해진 일정과 규칙 안에서 생활</td><td>1인 1실 중심으로 현지 가정생활과 개인시간을 함께 경험</td></tr>
      <tr><td class="item">잘 맞는 학생</td><td>단체생활을 잘하고, 한식·기기 사용·생활 루틴 관리가 필요한 학생</td><td>개인 공간이 중요하고, 현지 음식과 가족 소통에 적극적인 학생</td></tr>
      <tr><td class="item">학습 습관</td><td>옆에서 함께 공부하면 더 잘하고 누군가 일정 관리를 해주는 편이 좋은 학생</td><td>혼자 공부하는 편이 편하고 기본적인 자기관리가 가능한 학생</td></tr>
      <tr><td class="item">방과 후</td><td>저녁 학습과 생활 루틴까지 숙소에서 이어지는 구조</td><td>학교·학업센터 일정을 마친 뒤 홈스테이에서 자율시간 비중이 더 큰 구조</td></tr>
    </table>
    <div class="tip-box">💡 <b>어린 학생일수록 숙소 선택이 중요합니다.</b> 처음 유학을 시작하고 자기관리가 아직 익숙하지 않다면 기숙사형을 먼저 검토할 수 있습니다. 다만 최종 선택은 학년보다도 단체생활 적응력과 학생 성향을 함께 보는 것이 좋습니다.</div>
  </section>

  <section>
    <span class="section-label">MANAGEMENT STYLE BY REGION</span>
    <h2>관리형이라고 모두 같은 방식은 아닙니다<small>지역에 따라 이동관리와 학업관리의 비중이 다릅니다</small></h2>
    <div class="trio">
      <div class="card"><div class="icon">🚐</div><div class="title">코퀴틀람 · 밀착형</div><div class="desc">학교·학업센터·숙소 동선을 프로그램 범위에 따라 차량으로 연결하고, 특히 기숙사형은 생활 모습을 자주 확인할 수 있어 생활관리 강도가 높습니다.</div></div>
      <div class="card"><div class="icon">📚</div><div class="title">랭리·버나비 · 학업센터형</div><div class="desc">학생이 학교와 학업센터를 비교적 스스로 이동하면서 방과후 수업과 내신·입시 관리를 중심으로 지원받는 도심형 관리 구조입니다.</div></div>
      <div class="card"><div class="icon">🎯</div><div class="title">노스밴쿠버 · 아카데믹 집중형</div><div class="desc">현지 학업센터의 소그룹 수업과 SAT·AP 등 추가 학업 옵션을 활용하기 좋고, 생활비·교육비와 학교 자리까지 함께 고려해야 합니다.</div></div>
    </div>
    <div class="tip-box">※ 등하교·학업센터 이동 지원 범위는 프로그램과 학교에 따라 달라질 수 있으므로 각 상세 페이지와 상담에서 최종 확인합니다.</div>
  </section>

  <section>
'''
if "MANAGEMENT STYLE BY REGION" not in s:
    if marker not in s:
        raise SystemExit("supervised marker not found")
    s = s.replace(marker, insert + marker, 1)
s = update_date(s)
save(p, s)


p, s = load("dorm-young.html")
marker = '    <span class="section-label">VIDEO</span>'
insert = '''    <span class="section-label">WHY DORMITORY</span>
    <h2>왜 어린 학생에게 기숙사형을 운영하나요?</h2>
    <p class="prose">어린 학생은 홈스테이에서 방과 후 시간을 혼자 보내거나 식사, 휴대폰·게임, 학습 루틴이 흐트러지면 초기 적응이 더 힘들 수 있습니다. 코퀴틀람 기숙사형은 이런 시간을 학생 혼자에게 맡기지 않고 <b>식사·학습·휴식·기기 사용을 하나의 생활 루틴으로 연결</b>하기 위해 만든 구조입니다. 현지 운영팀이 7년째 이어오고 있는 관리 방식입니다.</p>
    <div class="facts">
      <div class="fact"><div class="icon">🍚</div><div class="label">식사</div><div class="value">한식 중심 식사와 일정한 식사시간</div></div>
      <div class="fact"><div class="icon">📵</div><div class="label">생활 규칙</div><div class="value">휴대폰·게임 등 기기 사용과 생활 루틴 관리</div></div>
      <div class="fact"><div class="icon">📚</div><div class="label">함께 공부</div><div class="value">친구들과 정해진 시간에 공부하는 환경</div></div>
      <div class="fact"><div class="icon">📷</div><div class="label">학부모 소통</div><div class="value">학생 생활 모습을 사진·영상과 함께 수시 공유</div></div>
    </div>
    <div class="tip-box">💡 <b>기숙사가 특히 잘 맞는 학생</b> — 단체생활 규칙을 잘 지키고, 혼자 있을 때보다 친구들과 함께 공부할 때 동기부여가 되는 학생, 한식 식사가 중요하거나 자기관리·기기 관리에 도움이 필요한 학생입니다.</div>
  </section>

  <section>
'''
if "WHY DORMITORY" not in s:
    if marker not in s:
        raise SystemExit("dorm-young marker not found")
    s = s.replace(marker, insert + marker, 1)
s = update_date(s)
save(p, s)


p, s = load("homestay.html")
marker = '    <span class="section-label">1:1 ACADEMIC CONSULTING</span>'
insert = '''    <span class="section-label">WHO FITS HOMESTAY</span>
    <h2>홈스테이가 더 잘 맞는 학생은?</h2>
    <div class="trio">
      <div class="card"><div class="icon">🛏️</div><div class="title">나만의 공간이 필요한 학생</div><div class="desc">단체생활보다 1인 1실과 개인시간이 중요하고 혼자 쉬거나 공부하는 것이 더 편한 학생</div></div>
      <div class="card"><div class="icon">💬</div><div class="title">현지 가정과 잘 어울리는 학생</div><div class="desc">성격이 비교적 적극적이고 현지 음식과 가족생활에 자연스럽게 적응할 수 있는 학생</div></div>
      <div class="card"><div class="icon">✅</div><div class="title">기본 자기관리가 되는 학생</div><div class="desc">학교·학업센터 일정을 스스로 챙기고 휴대폰·개인시간을 어느 정도 조절할 수 있는 학생</div></div>
    </div>
    <div class="tip-box">💡 반대로 처음 유학을 시작하는 어린 학생이거나 생활 규칙·식사·기기 사용까지 밀착 관리가 필요하다면 <a href="dorm-young.html"><b>코퀴틀람 기숙사형</b></a>을 함께 비교해보세요.</div>
  </section>

  <section>
'''
if "WHO FITS HOMESTAY" not in s:
    if marker not in s:
        raise SystemExit("homestay marker not found")
    s = s.replace(marker, insert + marker, 1)
s = update_date(s)
save(p, s)


p, s = load("north-vancouver-public.html")
marker = '    <span class="section-label">ACADEMIC MANAGEMENT</span>'
insert = '''    <span class="section-label">NORTH VANCOUVER CHECK</span>
    <h2>노스밴쿠버를 선택할 때 같이 봐야 할 점</h2>
    <div class="trio">
      <div class="card"><div class="icon">🎓</div><div class="title">학업·입시 인프라</div><div class="desc">대학 진학과 SAT·AP 등 추가 학업 지원을 활용하기 좋은 교육 환경을 갖춘 지역입니다.</div></div>
      <div class="card"><div class="icon">💰</div><div class="title">비용은 높은 편</div><div class="desc">홈스테이와 교육비가 코퀴틀람·랭리·버나비보다 높은 편이어서 예산을 함께 비교하는 것이 좋습니다.</div></div>
      <div class="card"><div class="icon">📅</div><div class="title">학교 자리는 일찍 확인</div><div class="desc">선호도가 높은 학교는 자리가 빨리 줄 수 있어 원하는 학교가 있다면 가능한 한 일찍 준비하는 편이 좋습니다.</div></div>
    </div>
    <div class="tip-box">💡 <b>2월 입학도 가능하지만</b> 학교별 여석에 따라 원하는 학교 배정이 어려울 수 있습니다. 학교 이름을 먼저 정하기보다 지원 시점의 실제 가능 학교를 함께 확인하는 방식이 안전합니다.</div>
  </section>

  <section>
'''
if "NORTH VANCOUVER CHECK" not in s:
    if marker not in s:
        raise SystemExit("north-vancouver-public marker not found")
    s = s.replace(marker, insert + marker, 1)
s = update_date(s)
save(p, s)


p, s = load("north-vancouver-private.html")
marker = '    <span class="section-label">ACADEMIC MANAGEMENT</span>'
insert = '''    <span class="section-label">NORTH VANCOUVER CHECK</span>
    <h2>노스밴쿠버 사립 관리형을 선택할 때</h2>
    <div class="trio">
      <div class="card"><div class="icon">🎓</div><div class="title">아카데믹 환경</div><div class="desc">정규 사립학교 수업에 노스밴쿠버 현지 학업센터의 소그룹 관리와 추가 SAT·AP 옵션을 결합할 수 있습니다.</div></div>
      <div class="card"><div class="icon">💰</div><div class="title">지역 비용은 높은 편</div><div class="desc">홈스테이와 교육비가 다른 광역 밴쿠버 관리형 지역보다 높은 편이라 비용 차이까지 비교하고 선택하는 것이 좋습니다.</div></div>
      <div class="card"><div class="icon">🧾</div><div class="title">사립학교 비용 변동 가능</div><div class="desc">학교 학비와 부대비용 변동에 따라 프로그램 총액이 달라질 수 있어 등록 전 최종 견적을 다시 확인합니다.</div></div>
    </div>
  </section>

  <section>
'''
if "NORTH VANCOUVER CHECK" not in s:
    if marker not in s:
        raise SystemExit("north-vancouver-private marker not found")
    s = s.replace(marker, insert + marker, 1)
s = update_date(s)
save(p, s)


Path("CONTENT_NOTES.md").write_text('''# Edusmart content notes

## 2026-09-08 operator meeting

Customer-facing pages were updated with durable qualitative guidance from the operator meeting:
- Coquitlam dormitory = higher-touch living/mobility management.
- Langley/Burnaby/North Vancouver = more academic-centre-oriented management with greater student independence in daily movement.
- Dormitory vs homestay fit should be explained by student temperament and self-management, not price alone.
- North Vancouver should be presented with both academic-infrastructure strengths and higher cost / school-seat constraints.

Do **not** change published dormitory eligibility to Grade 4 from the meeting transcript alone. The same meeting also contained conflicting wording around upper dormitory ages, while the current written cost/program materials use the existing published grade ranges. Obtain written/current-program confirmation before changing eligibility.

Do not publish volatile meeting numbers without current written confirmation, including estimated annual vacancies, guardian caseload counts, current total student counts, Korean-student counts in Chilliwack, exact AP counts, or percentage cost comparisons.
''', encoding="utf-8")

print("Updated meeting insight pages and internal content note")
