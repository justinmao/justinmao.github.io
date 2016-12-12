$(document).ready(function() {
  $("#link-about").click(function() {
    $("#main").css("margin-top", "12px");
    $("#banner").css("height", "100px").fadeOut(1000);
    $("#banner-about").delay(1000).fadeIn(1000);

    $("#about").fadeIn(950);
  });
});
