// GLOBALS
var MAX_PAGE_INDEX = 3;
var currentPage = 0;
var didScroll = false;
var currentCity = 0;
var citySwapInit = 0;

// LOAD
window.onload = function() {
  // Initial animations
  initHome();

  // Scroll listeners
  document.getElementById('home').addEventListener('wheel', wheelScroll);
  document.getElementById('about').addEventListener('wheel', wheelScroll);
  document.getElementById('projects').addEventListener('wheel', wheelScroll);
  document.getElementById('resume').addEventListener('wheel', wheelScroll);

  // Click listeners
  document.getElementById('top-arrow').addEventListener('click', function() {
    scrollToPage(0);
  });
  document.getElementById('bottom-arrow').addEventListener('click', function() {
    scrollDown();
  });
  document.getElementById('nav-about').addEventListener('click', function() {
    scrollToPage(1);
  });
  document.getElementById('nav-projects').addEventListener('click', function() {
    scrollToPage(2);
  });
  document.getElementById('nav-resume').addEventListener('click', function() {
    scrollToPage(3);
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

function wheelScroll() {
  if (!didScroll) {
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
    }, 1200);
  }
}

function scrollToPage(pageNumber) {
  if (pageNumber == 0) {
    initHome();
  } else if (pageNumber > 0) {
    deinitHome();
    if (pageNumber == 1) {
      if (citySwapInit == 0) citySwap();
    }
    if (currentPage <= 1 && pageNumber >= 2) {
      document.getElementById('navbar').style.color = 'white';
    }
  }
  if (currentPage >= 2 && pageNumber <= 1) {
    document.getElementById('navbar').style.color = '#353135';
  }
  currentPage = pageNumber;
  smoothScroll.animateScroll(window.innerHeight * currentPage);
}

function scrollUp() {
  if (currentPage > 0) {
    if (currentPage == 1) {
      initHome();
    } else if (currentPage == 2) {
      if (citySwapInit == 0) citySwap();
      document.getElementById('navbar').style.color = '#353135';
    }
    smoothScroll.animateScroll(window.innerHeight * --currentPage);
  }
}

function scrollDown() {
  if (currentPage < MAX_PAGE_INDEX) {
    if (currentPage == 0) {
      deinitHome();
      if (citySwapInit == 0) citySwap();
    } else if (currentPage >= 1) {
      document.getElementById('navbar').style.color = 'white';
    }
    smoothScroll.animateScroll(window.innerHeight * ++currentPage);
  }
}

function citySwap() {
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
