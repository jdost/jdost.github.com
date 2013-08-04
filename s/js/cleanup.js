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

window.addEventListener("load", function () {
  var article = document.getElementById("body");
  //if (article.className.indexOf("post") === -1) { return; }

  var links = article.getElementsByTagName("a");
  for (var i = 0, l = links.length; i < l; i++) {
    var link = links[i];
    if (!link.getAttribute("href") || link.getAttribute("href")[0] !== "#") {
      continue;
    }

    (function (l) {
      var href = l.getAttribute("href").substr(1);

      var id = href.substr(0, href.indexOf('-'));
      var ranges = href.substr(href.indexOf('-') + 1) + ",",
        range = [];
      while (ranges.indexOf(",") !== -1) {
        var current = ranges.substr(0, ranges.indexOf(","));
        ranges = ranges.substr(ranges.indexOf(",") + 1);

        if (current.indexOf(':') === -1) {
          range.push(parseInt(current, 10));
        } else {
          var start = parseInt(current.substr(0, current.indexOf(':')), 10),
            end = parseInt(current.substr(current.indexOf(':') + 1), 10);

          for (start; start <= end; start++) {
            range.push(start);
          }
        }
      }

      var lines = [];

      l.addEventListener("mouseover", function () {
        for (var i = 0, l = range.length; i < l; i++) {
          var line = document.getElementById(id + '-' + range[i]);
          line.className = "emphasize";
          lines.push(line);
        }
      });

      l.addEventListener("mouseout", function () {
        while (lines.length) {
          var line = lines.pop();
          line.className = "";
        }
      });
    }(link));
  }
});
