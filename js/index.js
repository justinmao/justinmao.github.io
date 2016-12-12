$.preload = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
}
$.preload("/resources/img2.jpg");

$(document).ready(function() {
  $("#link-about").click(function() {
    $("#spacer").css("height", "0px");
    $("#banner").css("height", "100px").fadeOut(1000);
    $("#banner-about").delay(1000).fadeIn(1000);

    $("#about").fadeIn(1000);
  });
});
