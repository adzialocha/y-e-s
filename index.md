---
layout: default
---

<div id="release-list" class="release-list">
  {% for release in site.releases %}
    <article class="release" id="{{ release.catalog }}">
      <section class="release-preview{% if release.is_fest %} release-preview--fest{% endif %}">
        <button class="release-preview__catalog" data-toggle="list" data-toggle-id="{{ release.catalog }}">
          {{ release.catalog }}
        </button>
        <span class="release-preview__details">
          {{ release.artists | array_to_sentence_string }}
          <span class="release-preview__title">{{ release.title | upcase }}</span>
          {% if release.subtitle != nil %}{{ release.subtitle }}{% endif %}
          {% if release.duration != nil %}D {{ release.duration }}{% endif %}
          {% if release.date != nil %}R {{ release.date | date: '%d.%m.%y' }}{% endif %}
          {% if release.date_end != nil %} - {{ release.date_end | date: '%d.%m.%y' }}{% endif %}
        </span>
      </section>
      <section class="release-detail">
        <div class="release-detail__cover-container">
          <img class="release-detail__cover" src="/files/{{ release.cover_image }}" data-toggle="cover" data-toggle-id="{{ release.catalog }}">
        </div>
        <div class="release-detail__content">
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
            <a href="{{ release.download }}" class="release-detail__download blue">
              {{ site.locales.download }}
            </a>
          {% endif %}
        </div>
      </section>
    </article>
  {% endfor %}
</div>
