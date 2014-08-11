---
layout: default
hidden: true
ogtype: profile
---
{% for page in site.posts %}
  {{ separator }}
  {% capture separator %}
  ---
  {% endcapture %}
  {% include post.html %}
{% endfor %}