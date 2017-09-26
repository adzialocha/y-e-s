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
        {{ release.subtitle }}
        D {{ release.duration }}
        R {{ release.date | date: '%d.%m.%y' }}
      </span>
    </section>
    <section class="release" id="{{ release.catalog }}">
      <div class="release__cover-container">
        <img class="release__cover" src="/files/{{ release.cover_image }}">
      </div>
      <div class="release__details">
        <strong>{{ site.locales.about | upcase }}</strong>
        {{ release.content | strip_newlines }}
        <strong>{{ site.locales.setup | upcase }}</strong>
        {{ release.setup | strip_newlines }}
        <strong>{{ site.locales.details | upcase }}</strong>
        {% for detail in release.details %}
          <a target="_blank" href="/files/{{ detail }}">{{ detail }}</a>
        {% endfor %}
        <a href="/files/{{ release.download }}" class="release__download blue">
          {{ site.locales.download }}
        </a>
      </div>
    </section>
  </article>
{% endfor %}
