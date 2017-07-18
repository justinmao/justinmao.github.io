// GLOBALS
const appendix = {
  home: 0,
  about: 1,
  skills: 2,
  projects: 3,
  resume: 4
}
const MAX_PAGE_INDEX = 4;
var currentPage = 0;
var didScroll = false;
var currentCity = 0;
var citySwapInit = 0;
var deinitAboutComplete = 1;
var deinitSkillsComplete = 1;
var lethargy = new Lethargy(7, 10, 0.1);

// LOAD
window.onload = function() {
  // Initial animations
  initHome();

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
  document.getElementById('about-next-arrow').addEventListener('click', function() {
    scrollDown();
  });
  var nextArrows = document.getElementsByClassName("example");
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
window.onbeforeunload = function (){
  window.scrollTo(0, 0);
}

// FUNCTIONS
function initHome() {
  document.getElementById('top-arrow').style.pointerEvents = 'none';
  document.getElementById('top-arrow').style.opacity = 0;
  document.getElementById('bottom-arrow').style.pointerEvents = 'auto';
  document.getElementById('bottom-arrow').style.opacity = 0;
  setTimeout(function() {
    document.getElementById('title').style.opacity = 1;
  }, 500);
  setTimeout(function() {
    document.getElementById('bottom-arrow').style.opacity = 1;
    document.getElementById('bottom-arrow').style.transform = 'translateY(24px)';
  }, 1500);
}

function deinitHome() {
  document.getElementById('title').style.opacity = 0;
  document.getElementById('bottom-arrow').style.pointerEvents = 'none';
  document.getElementById('bottom-arrow').style.transform = 'translateY(-24px)'
  document.getElementById('bottom-arrow').style.opacity = 0;
  setTimeout(function() {
    document.getElementById('top-arrow').style.pointerEvents = 'auto';
    document.getElementById('top-arrow').style.opacity = 1;
  }, 1000);
}

function initAbout() {
  if (citySwapInit == 0) startCitySwap();
  setTimeout(function() {
    if (deinitAboutComplete == 1) {
      document.getElementById('about-next-arrow').style.pointerEvents = 'auto';
      document.getElementById('about-next-arrow').style.opacity = 1;
      document.getElementById('about-next-arrow').style.transform = 'translateY(12px)';
    }
  }, 1000);
}

function deinitAbout() {
  --deinitAboutComplete;
  document.getElementById('about-next-arrow').style.pointerEvents = 'none';
  document.getElementById('about-next-arrow').style.opacity = 0;
  document.getElementById('about-next-arrow').style.transform = 'translateY(-12px)';
  // Make sure deinitializing is complete before allowing initialization.
  setTimeout(function() {
    ++deinitAboutComplete;
  }, 1000);
}

function initSkills() {
  setTimeout(function() {
    if (deinitSkillsComplete == 1) {
      document.getElementById('skills-next-arrow').style.pointerEvents = 'auto';
      document.getElementById('skills-next-arrow').style.opacity = 1;
      document.getElementById('skills-next-arrow').style.transform = 'translateY(12px)';
    }
  }, 1000);
}

function deinitSkills() {
  --deinitSkillsComplete;
  document.getElementById('skills-next-arrow').style.pointerEvents = 'none';
  document.getElementById('skills-next-arrow').style.opacity = 0;
  document.getElementById('skills-next-arrow').style.transform = 'translateY(-12px)';
  setTimeout(function() {
    ++deinitSkillsComplete;
  }, 1000);
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
    } else if (currentPage <= appendix.skills && pageNumber >= appendix.projects) {
      document.getElementById('navbar').style.color = 'white';
    }
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
