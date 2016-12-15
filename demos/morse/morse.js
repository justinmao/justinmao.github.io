function Node(value) {
  this.value = value;
  this.dash = null;
  this.dot = null;
}

var morseTree = new Node(null);
  morseTree.dash = new Node("T");
    morseTree.dash.dash = new Node("M");
      morseTree.dash.dash.dash = new Node("O");
        morseTree.dash.dash.dash.dash = new Node("#");
          morseTree.dash.dash.dash.dash.dash = new Node("0");
          morseTree.dash.dash.dash.dash.dot = new Node("9");
        morseTree.dash.dash.dash.dot = new Node("#");
          morseTree.dash.dash.dash.dot.dot = new Node("8");
      morseTree.dash.dash.dot = new Node("G");
        morseTree.dash.dash.dot.dash = new Node("Q");
        morseTree.dash.dash.dot.dot = new Node("Z");
          morseTree.dash.dash.dot.dot.dash = new Node("#");
            morseTree.dash.dash.dot.dot.dash.dash = new Node(",");
          morseTree.dash.dash.dot.dot.dot = new Node("7");
    morseTree.dash.dot = new Node("N");
      morseTree.dash.dot.dash = new Node("K");
        morseTree.dash.dot.dash.dash = new Node("Y");
        morseTree.dash.dot.dash.dot = new Node("C");
      morseTree.dash.dot.dot = new Node("D");
        morseTree.dash.dot.dot.dash = new Node("X");
          morseTree.dash.dot.dot.dash.dot = new Node("/");
        morseTree.dash.dot.dot.dot = new Node("B");
          morseTree.dash.dot.dot.dot.dot = new Node("6");
  morseTree.dot = new Node("E");
    morseTree.dot.dash = new Node("A");
      morseTree.dot.dash.dash = new Node("W");
        morseTree.dot.dash.dash.dash = new Node("J");
          morseTree.dot.dash.dash.dash.dash = new Node("1");
        morseTree.dot.dash.dash.dot = new Node("P");
          morseTree.dot.dash.dash.dot.dash = new Node("");
            morseTree.dot.dash.dash.dot.dash.dot = new Node("@");
      morseTree.dot.dash.dot = new Node("R");
        morseTree.dot.dash.dot.dash = new Node("#");
          morseTree.dot.dash.dot.dash.dot = new Node("#");
            morseTree.dot.dash.dot.dash.dot.dash = new Node(".");
        morseTree.dot.dash.dot.dot = new Node("L");
    morseTree.dot.dot = new Node("I");
      morseTree.dot.dot.dash = new Node("U");
        morseTree.dot.dot.dash.dash = new Node("");
          morseTree.dot.dot.dash.dash.dash = new Node("2");
          morseTree.dot.dot.dash.dash.dot = new Node("#");
            morseTree.dot.dot.dash.dash.dot.dot = new Node("?");
        morseTree.dot.dot.dash.dot = new Node("F");
      morseTree.dot.dot.dot = new Node("S");
        morseTree.dot.dot.dot.dash = new Node("V");
          morseTree.dot.dot.dot.dash.dash = new Node("3");
        morseTree.dot.dot.dot.dot = new Node("H");
          morseTree.dot.dot.dot.dot.dash = new Node("4");
          morseTree.dot.dot.dot.dot.dot = new Node("5");

var currentNode = morseTree;
var text = "";
var char = "";
var shadow = "";
var morse = "";

var init = 0;

function update() {
  $("#text").html(text + "<span>" + shadow + "</span>");
  $("#morse").text(morse).css("font-family", "Morse");
}

// action functions
function next() {
  currentNode = morseTree;
  morse += "$"; // "/" in the font file
  text += shadow;
  shadow = "";
  update();
}
function dash() {
  if (!init) {
    $("#text").text("");
    init = 1;
  }
  morse += "T"; // "-" in the font file
  if (currentNode) {
    if (currentNode.dash) {
      currentNode = currentNode.dash;
      shadow = currentNode.value;
    } else {
      currentNode = null;
      shadow = "#";
    }
  }
  update();
}
function dot() {
  if (!init) {
    $("#text").text("");
    init = 1;
  }
  morse += "E"; // "." in the font file
  if (currentNode) {
    if (currentNode.dot) {
      currentNode = currentNode.dot;
      shadow = currentNode.value;
    } else {
      currentNode = null;
      shadow = "#";
    }
  }
  update();
}

$(document).ready(function() {
  $(document).keydown(function(e) {
    if (e.which == 32) { // space
      next();
    } else if (e.which == 65) { // a
      dot();
    } else if (e.which == 68) { // d
      dash();
    }
  });
  // mobile functionality
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("#text").text("swipe left: dot | swipe right: dash");
    $("#morse").text("tap: next character");
    $("#text").css("font-size", "56px");
    $("#title").css("font-size", "128px");
    $("#morse").css("font-size", "56px");

    var container = document.getElementById("container");

    Hammer(container).on("swipeleft", function() {
      next();
    });
    Hammer(container).on("swiperight", function() {
      dot();
    });
    Hammer(container).on("tap", function() {
      dash();
    });

  } else {
    // desktop mode message
  }
});
