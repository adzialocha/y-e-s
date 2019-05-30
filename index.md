---
layout: default
---

{% for release in site.releases %}
  <article>
    <section class="preview">
      <button class="preview__catalog" id="preview-{{ release.catalog }}">
        {{ release.catalog }}
      </button>
      <span class="preview__details">
        {{ release.artists | array_to_sentence_string }}
        {{ release.title | upcase }}
        {% if release.subtitle != nil %}{{ release.subtitle }}{% endif %}
        {% if release.duration != nil %}D {{ release.duration }}{% endif %}
        {% if release.date != nil %}R {{ release.date | date: '%d.%m.%y' }}{% endif %}
      </span>
    </section>
    <section class="release" id="{{ release.catalog }}">
      <div class="release__cover-container">
        <img class="release__cover" src="/files/{{ release.cover_image }}">
      </div>
      <div class="release__details">
        <strong>{{ site.locales.about | upcase }}</strong>
        {{ release.content | strip_newlines }}
        {% if release.setup != nil %}
          <strong>{{ site.locales.setup | upcase }}</strong>
          {{ release.setup | strip_newlines }}
        {% endif %}
        {% if release.details != nil %}
          <strong>{{ site.locales.details | upcase }}</strong>
          {% for detail in release.details %}
            {% if detail contains '://' %}
              <a target="_blank" href="{{ detail }}">{{ detail }}</a>
            {% else %}
              <a target="_blank" href="/files/{{ detail }}">{{ detail }}</a>
            {% endif %}
          {% endfor %}
        {% endif %}
        {% if release.download != nil %}
          <a href="{{ release.download }}" class="release__download blue">
            {{ site.locales.download }}
          </a>
        {% endif %}
      </div>
    </section>
  </article>
{% endfor %}
