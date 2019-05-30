---
layout: default
---

<p>Here you can sign up to our monthly newsletter, where we announce new releases and current space and <a href="https://www.youtube.com/watch?v=tJevBNQsKtU" target="_blank">astronomy trivia</a>.</p>

<form class="newsletter" id="newsletter">
  <input class="newsletter__input blue blue--left" type="email" name="email" placeholder="{{ site.locales.email }}" />
  <button class="blue" type="submit">{{ site.locales.subscribe }}</button>
  <div class="newsletter__thanks">
    {{ site.locales.thanks }}
  </div>
</form>
