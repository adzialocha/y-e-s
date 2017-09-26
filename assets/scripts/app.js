class Color {
  constructor(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  toString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }
}

const MAILCHIMP_URL = '//andreasdzialocha.us7.list-manage.com/subscribe/post?u=79c1658d0ccddf704a07d8f95&amp;id=1fd08b7b47&c=?'

const NAVIGATION_ITEMS = [
  'imprint',
  'releases',
  'subscribe',
]

const COLORS = [
  new Color(122, 188, 255),
  new Color(208, 255, 122),
  new Color(188, 122, 255),
]

const ACRONYMS = [
  'Yacht Etching Society',
  'Yahoo Email Subscription',
  'Yale Exodus Service',
  'Year End Sale',
  'Yearlong Ecstasy Subordination',
  'Yearly Exotic Shows',
  'Yellow Entropic Sessions',
  'Yesterday Ended Slow',
  'Yoda Entertainment Service',
  'Yodelers Electric Sentimentalism',
  'You Eat Shit',
  'Young Educated Socialists',
  'Young Energetic Scores',
  'Your Ear Sucks',
  'Your Easy Sex',
  'Your Edition Solitude',
  'Your Entertainment Service',
  'Your Eskalations Stufe',
  'Yummy Endless Sausage',
  'Yummy Endless Sex',
  'Yummy Endless Sodomy',
  'Yuppy Erectology Syndrome',
]

function generateComplementaryColor(color) {
  return new Color(
    255 - color.red,
    255 - color.green,
    255 - color.blue
  )
}

function isValidEMail(str) {
  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  return regex.test(str)
}

const gradientElement = document.getElementById('gradient')
const homeElement = document.getElementById('navigation-releases')
const newsletterElement = document.getElementById('newsletter')
const previewDetailsElements = document.getElementsByClassName('preview__details')
const previewElements = document.getElementsByClassName('preview__catalog')
const releaseElements = document.getElementsByClassName('release')
const viewElements = document.getElementsByClassName('view')

let currentNavigationItem
let currentReleaseItem
let requestId = 0

const currentGradient = {
  colorA: undefined,
  colorB: undefined,
  position: 50,
}

function getRandomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function request(url, email, callback) {
  const name = `_jsonp_${requestId += 1}`

  const scriptElement = document.createElement('script')
  scriptElement.type = 'text/javascript'

  if (url.match(/\?/)) {
    scriptElement.src = `${url}&format=jsonp&EMAIL=${email}&callback=${name}`
  } else {
    scriptElement.src = `${url}?format=jsonp&EMAIL=${email}&callback=${name}`
  }

  window[name] = data => {
    callback.call(window, data)
    document.getElementsByTagName('head')[0].removeChild(scriptElement)
    scriptElement = null
    delete window[name]
  }

  document.getElementsByTagName('head')[0].appendChild(scriptElement)
}

function gradientString(rotation, colorA, colorB, position) {
  return [
    `rgb(${colorA})`,
    `-moz-linear-gradient(${rotation}deg, ${colorA} 0%, ${colorB} ${position}%, ${colorA} 100%)`,
    `-webkit-linear-gradient(${rotation}deg, ${colorA} 0%, ${colorB} ${position}%, ${colorA} 100%)`,
    `linear-gradient(${rotation}deg, ${colorA} 0%, ${colorB} ${position}%, ${colorA} 100%)`,
  ].reduce((acc, next) => {
    return `${acc} background: ${next};`
  }, '')
}

function generateGradient(deg = 0) {
  const { colorA, colorB, position } = currentGradient
  if (!colorA || !colorB) {
    return
  }

  gradientElement.style.cssText = gradientString(
    deg,
    colorA,
    colorB,
    position
  )
}

function generateColors() {
  currentGradient.colorA = getRandomArrayItem(COLORS)
  currentGradient.colorB = getRandomArrayItem(COLORS)
  currentGradient.position = getRandomArbitrary(35, 65)

  while (currentGradient.colorB === currentGradient.colorA) {
    currentGradient.colorB = getRandomArrayItem(COLORS)
  }

  const complementary = generateComplementaryColor(currentGradient.colorB)

  for (let i = 0; i < previewDetailsElements.length; i += 1) {
    const element = previewDetailsElements[i]
    element.style.color = complementary.toString()
  }
}

function generateAcronym() {
  homeElement.innerText = getRandomArrayItem(ACRONYMS)
}

function initializeNavigation() {
  NAVIGATION_ITEMS.forEach(item => {
    const element = document.getElementById(`navigation-${item}`)

    element.addEventListener('click', event => {
      event.preventDefault()

      if (currentNavigationItem === item) {
        currentNavigationItem = undefined
      } else {
        currentNavigationItem = item
        generateColors()
      }

      for (let i = 0; i < viewElements.length; i += 1) {
        viewElements[i].classList.remove('view--visible')

        if (viewElements[i].id === `view-${currentNavigationItem}`) {
          viewElements[i].classList.add('view--visible')
        }
      }
    })
  })
}

function initializeReleases() {
  for (let i = 0; i < previewElements.length; i += 1) {
    const preview = previewElements[i]
    const catalogItem = preview.id.split('-')[1]

    preview.addEventListener('click', event => {
      event.preventDefault()

      if (currentReleaseItem === catalogItem) {
        currentReleaseItem = undefined
      } else {
        currentReleaseItem = catalogItem
        generateColors()
      }

      for (let i = 0; i < releaseElements.length; i += 1) {
        releaseElements[i].classList.remove('release--visible')

        if (releaseElements[i].id === currentReleaseItem) {
          releaseElements[i].classList.add('release--visible')
        }
      }
    })
  }
}

function initializeGradientControl() {
  function onMove(event) {
    const pointerX = event.pageX
    const pointerY = event.pageY

    if (pointerX === undefined || pointerY === undefined) {
      return
    }

    const centerX = window.screen.width / 2
    const centerY = window.screen.height / 2

    const deg = Math.atan2(
      pointerY - centerY,
      pointerX - centerX
    ) * 180 / Math.PI

    generateGradient(deg)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('touchmove', onMove)
}

function submitSubscribeForm() {
  const email = newsletterElement.email.value

  if (!isValidEMail(email)) {
    return
  }

  newsletterElement.classList.add('newsletter--success')

  // request(MAILCHIMP_URL, email)
}

function initializeNewsletter() {
  newsletterElement.addEventListener('submit', event => {
    event.preventDefault()
    submitSubscribeForm()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation()
  initializeReleases()
  initializeGradientControl()
  initializeNewsletter()

  generateAcronym()
  generateColors()
  generateGradient()
})