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
