const reverseAppendix = ['home', 'about', 'skills', 'projects', 'resume'];

var menuIsOpen = false;

function toggleMenu() {
  var newHeight = menuIsOpen ? '48px' : '100%';
  var newColor = menuIsOpen ? 'transparent' : 'rgba(255, 255, 255, 0.95)';
  var menu = document.getElementById('mobile')
  menu.style.height = newHeight;
  menu.style.backgroundColor = newColor;
  menuIsOpen = !menuIsOpen;

}

function mScrollToPageNumber(pageNumber) {
  toggleMenu();
  pss.scrollToPageNumber(pageNumber);
}

pss.setOnScroll(function () {
  // Shift sidebar selector
  document.getElementById('sidebar-dot-selector').style.transform = 'translateY(' + ((pss.getCurrentPageNumber() - 2) * 12) + 'px)';
  // Bounce
  document.getElementById('sidebar-dot-selector-bouncing-container-for-adam').style.transform = 'translateX(-6px)';
  setTimeout(function() {
    document.getElementById('sidebar-dot-selector-bouncing-container-for-adam').style.transform = 'translateX(0px)';
  }, 0300);
  // Momentum
  var targetDot = document.getElementById('sidebar-dot-' + reverseAppendix[pss.getCurrentPageNumber()]);
  setTimeout(function() {
    targetDot.style.transform = 'translateX(3px)';
    setTimeout(function() {
      targetDot.style.transform = 'translateX(0px)';
    }, 0350);
  }, 0400);
});
