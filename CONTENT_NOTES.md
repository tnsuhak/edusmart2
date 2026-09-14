# Edusmart content notes

## 2026-09-08 operator meeting

Customer-facing pages were updated with durable qualitative guidance from the operator meeting:
- Coquitlam dormitory = higher-touch living/mobility management.
- Langley/Burnaby/North Vancouver = more academic-centre-oriented management with greater student independence in daily movement.
- Dormitory vs homestay fit should be explained by student temperament and self-management, not price alone.
- North Vancouver should be presented with both academic-infrastructure strengths and higher cost / school-seat constraints.

Do **not** change published dormitory eligibility to Grade 4 from the meeting transcript alone. The same meeting also contained conflicting wording around upper dormitory ages, while the current written cost/program materials use the existing published grade ranges. Obtain written/current-program confirmation before changing eligibility.

Do not publish volatile meeting numbers without current written confirmation, including estimated annual vacancies, guardian caseload counts, current total student counts, Korean-student counts in Chilliwack, exact AP counts, or percentage cost comparisons.

## 2026-09-14 parent-facing preview revision (PR #4)
- Reused meeting-insights-20260908; do not merge/publish without user approval.
- Desktop outer width 1280px; prose remains constrained; mobile program tables use labelled cards.
- Homepage keeps Finder and 13 choices; removes duplicate directory; moves YouTube videos into student-life-videos.html.
- Four consultation channels and grouped navigation are static HTML generated from templates/*.html by node build.mjs. Edit the templates for shared changes.
- Finder consultation uses explicit copy/paste; Kakao open-chat does not receive an invented prefilled-message parameter.
- Instagram covers use honest title/play cards, not unrelated stock thumbnails; no embeds load before selection. Visible `Instagram에서 보기` links are intentionally removed per user preference.
- Netlify build emits noindex HTML and X-Robots-Tag only for non-production contexts; clean dist on every build to avoid preview headers leaking into production.

## 2026-09-13 EduSmart revised fee sheet
- Source: Chris Kim <chris@edusmarts.ca>, email subject `Fwd: 26-27년 에듀스마트 프로그램 최신 비용표 수정본`.
- Compared the 2026-09-03 fee-sheet PDF with the revised 2026-09-13 PDF line by line.
- The only fee value changed between the two PDFs is **North Vancouver private academic managed programme (St. Thomas Aquinas Regional Secondary School, G9-G11, 10 months): CA$82,375 → CA$85,375**.
- The revised sheet still states that St. Thomas Aquinas medical insurance is separate.
- Other fee figures printed in the Sep 13 revised PDF match the Sep 3 PDF; do not infer additional increases from the email's general wording about local inflation/labour costs.
- `pricing-latest.json` records the current verified fee change. `build.mjs` applies it consistently to the homepage comparison, supervised overview, North Vancouver public/private comparison copy, and Finder data.
