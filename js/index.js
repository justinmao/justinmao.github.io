// GLOBALS
const appendix = {
  home: 0,
  about: 1,
  skills: 2,
  projects: 3,
  resume: 4
}
const reverseAppendix = ['home', 'about', 'skills', 'projects', 'resume'];
const MAX_PAGE_INDEX = 4;
var currentPage = 0;
var didScroll = false;
var currentCity = 0;
var citySwapInit = 0;
var lethargy = new Lethargy(7, 10, 0.1);

// LOAD
window.onload = function() {
  // Initial setup
  initHome();
  checkWindowSize();

  // Scroll listeners
  window.addEventListener('wheel', wheelScroll);

  // Keydown listeners
  document.onkeydown = function(event) {
    if (event.keyCode == '38') {
      scrollUp();
    } else if (event.keyCode == '40') {
      scrollDown();
    }
  };

  // Click listeners
  document.getElementById('top-arrow').addEventListener('click', function() {
    scrollToPage(appendix.home);
  });
  document.getElementById('bottom-arrow').addEventListener('click', function() {
    scrollDown();
  });
  var nextArrows = document.getElementsByClassName("next-arrow");
  for (var i = 0; i < nextArrows.length; ++i) {
    nextArrows[i].addEventListener('click', function() {
      scrollDown();
    });
  }
  document.getElementById('nav-about').addEventListener('click', function() {
    scrollToPage(appendix.about);
  });
  document.getElementById('nav-projects').addEventListener('click', function() {
    scrollToPage(appendix.projects);
  });
  document.getElementById('nav-resume').addEventListener('click', function() {
    scrollToPage(appendix.resume);
  });
};

// UNLOAD
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
}

// SIZING
window.onresize = checkWindowSize;

function checkWindowSize() {
  if ((window.innerHeight < 750 || window.innerWidth < 675)) {
    document.getElementById('desktop-content').style.display = 'none';
    document.getElementById('mobile-content').style.display = 'flex';
    document.getElementById('current-resolution').innerHTML = 'CURRENT: ' + window.innerWidth + 'x' + window.innerHeight + ' PX';
  } else {
    document.getElementById('desktop-content').style.display = 'flex';
    document.getElementById('mobile-content').style.display = 'none';
  }
}

// FUNCTIONS
function initHome() {
  document.getElementById('sidebar').style.opacity = 0;
  document.getElementById('sidebar-dot-selector-bouncing-container-for-adam').style.opacity = 0;
  document.getElementById('top-arrow').style.pointerEvents = 'none';
  document.getElementById('top-arrow').style.opacity = 0;
  document.getElementById('bottom-arrow').style.pointerEvents = 'auto';
  document.getElementById('bottom-arrow').style.opacity = 0;
  setTimeout(function() {
    if (currentPage == appendix.home) {
      document.getElementById('title').style.opacity = 1;
    }
  }, 500);
  setTimeout(function() {
    if (currentPage == appendix.home) {
      document.getElementById('bottom-arrow').style.opacity = 1;
      document.getElementById('bottom-arrow').style.transform = 'translateY(24px)';
    }
  }, 1500);
}

function deinitHome() {
  document.getElementById('sidebar').style.opacity = 1;
  document.getElementById('sidebar-dot-selector-bouncing-container-for-adam').style.opacity = 1;
  document.getElementById('title').style.opacity = 0;
  document.getElementById('bottom-arrow').style.pointerEvents = 'none';
  document.getElementById('bottom-arrow').style.transform = 'translateY(-24px)'
  document.getElementById('bottom-arrow').style.opacity = 0;
  setTimeout(function() {
    if (currentPage != appendix.home) {
      document.getElementById('top-arrow').style.pointerEvents = 'auto';
      document.getElementById('top-arrow').style.opacity = 1;
    }
  }, 1000);
}

function initAbout() {
  if (citySwapInit == 0) startCitySwap();
  setTimeout(function() {
    if (currentPage == appendix.about) {
      document.getElementById('about-next-arrow').style.pointerEvents = 'auto';
      document.getElementById('about-next-arrow').style.opacity = 1;
      document.getElementById('about-next-arrow').style.transform = 'translateY(12px)';
    }
  }, 1000);
}

function deinitAbout() {
  document.getElementById('about-next-arrow').style.pointerEvents = 'none';
  document.getElementById('about-next-arrow').style.opacity = 0;
  document.getElementById('about-next-arrow').style.transform = 'translateY(-12px)';
}

function initSkills() {
  setTimeout(function() {
    if (currentPage == appendix.skills) {
      document.getElementById('skills-next-arrow').style.pointerEvents = 'auto';
      document.getElementById('skills-next-arrow').style.opacity = 1;
      document.getElementById('skills-next-arrow').style.transform = 'translateY(12px)';
    }
  }, 1000);
}

function deinitSkills() {
  document.getElementById('skills-next-arrow').style.pointerEvents = 'none';
  document.getElementById('skills-next-arrow').style.opacity = 0;
  document.getElementById('skills-next-arrow').style.transform = 'translateY(-12px)';
}

function wheelScroll() {
  if (lethargy.check(event) != false && !didScroll) {
    var delta;
    if (event.wheelDelta){
      delta = event.wheelDelta;
    } else {
      delta = -1 * event.deltaY;
    }
    if (delta < 0) {
      scrollDown();
    } else if (delta > 0) {
      scrollUp();
    }
    didScroll = true;
    setTimeout(function() {
      didScroll = false;
    }, 300);
  }
}

function scrollToPage(pageNumber) {
  if (pageNumber >= appendix.home && pageNumber <= MAX_PAGE_INDEX) {
    if (pageNumber == appendix.home) initHome();
    else deinitHome();
    if (pageNumber == appendix.about) initAbout();
    else deinitAbout();
    if (pageNumber == appendix.skills) initSkills();
    else deinitSkills();
    if (currentPage >= appendix.projects && pageNumber <= appendix.skills) {
      document.getElementById('navbar').style.color = '#353135';
      document.getElementById('top-arrow').style.color = '#353135';
      var dots = document.getElementsByClassName('sidebar-dot');
      for (var i = 0; i < dots.length; ++i) {
        dots[i].style.backgroundColor = '#353135';
      }
      document.getElementById('sidebar-dot-selector').style.backgroundColor = '#353135';
    } else if (currentPage <= appendix.skills && pageNumber >= appendix.projects) {
      document.getElementById('navbar').style.color = 'white';
      document.getElementById('top-arrow').style.color = 'white';
      var dots = document.getElementsByClassName('sidebar-dot');
      for (var i = 0; i < dots.length; ++i) {
        dots[i].style.backgroundColor = 'white';
      }
      document.getElementById('sidebar-dot-selector').style.backgroundColor = 'white';
    }
    // Shift sidebar selector
    document.getElementById('sidebar-dot-selector').style.transform = 'translateY(' + ((pageNumber - 2) * 12) + 'px)';
    // Bounce
    document.getElementById('sidebar-dot-selector-bouncing-container-for-adam').style.transform = 'translateX(-6px)';
    setTimeout(function() {
      document.getElementById('sidebar-dot-selector-bouncing-container-for-adam').style.transform = 'translateX(0px)';
    }, 0300);
    // Momentum
    var targetDot = document.getElementById('sidebar-dot-' + reverseAppendix[pageNumber]);
    setTimeout(function() {
      targetDot.style.transform = 'translateX(3px)';
      setTimeout(function() {
        targetDot.style.transform = 'translateX(0px)';
      }, 0350);
    }, 0400);
    currentPage = pageNumber;
    smoothScroll.animateScroll(window.innerHeight * currentPage);

  }
}

function scrollUp() {
  scrollToPage(currentPage - 1);
}

function scrollDown() {
  scrollToPage(currentPage + 1);
}

function startCitySwap() {
  city = document.getElementById('city');
  if (citySwapInit == 0) {
    city.style.color = '#57A076';
    city.innerHTML = 'Michigan.';
    currentCity = 0;
    citySwapInit = 1;
    setTimeout(function() {
      city.style.opacity = '0';
    }, 4000);
  }
  setInterval(function() {
    city.style.opacity = '1';
    if (currentCity == 0) {
      city.style.color = '#BD5551';
      city.innerHTML = 'Shanghai.';
      currentCity = 1;
    } else if (currentCity == 1) {
      city.style.color = '#6B9FAA';
      city.innerHTML = 'Toronto.';
      currentCity = 2;
    } else if (currentCity == 2) {
      city.style.color = '#57A076';
      city.innerHTML = 'Michigan.';
      currentCity = 0;
    }
    setTimeout(function() {
      city.style.opacity = '0';
    }, 4000);
  }, 4500);
}
