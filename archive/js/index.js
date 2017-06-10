// if (screen.width <= 800) {
//   window.location = "http://m.jmao.co";
// }

var currentPage;

function switchPage(newPage) {
  // prevent actions during transition (to prevent image stacking)
  $("#links").addClass("freeze");
  setTimeout(function() {
    $("#links").removeClass("freeze");
  }, 2000);

  if (currentPage == "home") {
    $("#spacer").css("height", "12px");
    $("#banner-container").css("height", "100px");
    $("#banner").css("height", "100px").fadeOut(1000);
  } else if (newPage != currentPage) {
    // fade out the current page (banner + content) and change link color
    $("#link-" + currentPage).css("color", "#333333");
    $("#banner-" + currentPage).fadeOut(1000);
    $("#" + currentPage).fadeOut(1000);
  }
  // fade in the new page (banner + content) and change link color
  $("#link-" + newPage).css("color", "#ff9999");
  $("#banner-" + newPage).delay(1000).fadeIn(1000);
  $("#" + newPage).delay(1000).fadeIn(1000);

  currentPage = newPage;
}

function reset() {
  if (currentPage != "home") {
    $("#main").fadeOut(1000);
    setTimeout(function() {
      window.location = "/archive";
    }, 1000);
  }
}

$(document).ready(function() {
  $("#main").fadeIn(1000);
  currentPage = "home";
  $("#title").click(function() {
    reset();
  });
  $("#link-about").click(function() {
    switchPage("about");
  });
  $("#link-projects").click(function() {
    switchPage("projects");
  });
  $("#link-resume").click(function() {
    switchPage("resume");
  });
  $("#link-contact").click(function() {
    switchPage("contact");
  });
});
