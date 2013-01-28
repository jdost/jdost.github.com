window.addEventListener("load", function () {
  var nav = document.getElementsByTagName("nav")[0];
  var links = nav.getElementsByTagName("a");

  for (var i = 0, l = links.length; i < l; i++) {
    var link = links[i];
    if (link.getAttribute("href") === window.location.pathname) {
      link.className = 'selected';
      break;
    }
  }
});

window.addEventListener("load", function () {
  var post = document.getElementById("body");
  if (post.className.indexOf("post") === -1) { return; }

  var vis = false,
    tldr = post.getElementsByClassName("tldr")[0];
  tldr.addEventListener("click", function () {
    if (vis) { tldr.nextSibling.className = ""; }
    else { tldr.nextSibling.className = "visible"; }
    vis = !vis;
  });
});

