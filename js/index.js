$(document).ready(function() {
  $("#link-about").click(function() {
    $("#main").css("margin-top", "12px");
    $("#banner").css("height", "100px").fadeOut(1200);
    $("#banner-about").delay(1200).fadeIn(1200);

    $("#about").fadeIn(1000);
  });
});
