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
