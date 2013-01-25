---
layout: base
home: true
---
### Hello!

Just started this blog, have a lot to learn about Jekyll, this will probably keep a
running log of my thoughts and what not.

### Posts

{% for post in paginator %}
  {{ post.title }}
{% endfor %}
