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
- Instagram covers use honest title/play cards, not unrelated stock thumbnails; no embeds load before selection. Original links are retained as playback fallback.
- Netlify build emits noindex HTML and X-Robots-Tag only for non-production contexts; clean dist on every build to avoid preview headers leaking into production.
- This is a UX revision, not a new fee/eligibility audit. Existing cost figures and internal source records remain the basis.
