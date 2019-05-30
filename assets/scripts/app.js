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

const MAILCHIMP_URL = '//y-e-s.us16.list-manage.com/subscribe/post?u=e682a40c6226c72eba8298735&amp;id=7758ee5d8d&c='

const DEFAULT_DISPLAY_MODE = 'list'

const DISPLAY_MODES = [
  'list',
  'cover',
]

const NAVIGATION_ITEMS = [
  'releases',
  'subscribe',
  'imprint',
]

const COLORS = [
  new Color(122, 188, 255),
  new Color(208, 255, 122),
  new Color(188, 122, 255),
]

const ACRONYMS = [
  'Yacht Etching Society',
  'Yacht Extreme Sailing',
  'Yah Ex Shoes',
  'Yahoo Email Subscription',
  'Yakuza Enemy Squasher',
  'Yale Exodus Service',
  'Yawn Ecstacy Shalom',
  'Yea Eat Serum',
  'Year End Sale',
  'Yearlong Ecstasy Subordination',
  'Yearly Exotic Shows',
  'Yearning Every Saturday',
  'Yeast Elicits Sugar',
  'Yellow Egg Sauce',
  'Yellow Entropic Sessions',
  'Yelp Eek Shit',
  'Yes Export Service',
  'Yesterday Ended Slow',
  'Yesterday\'s Eaten Sausage',
  'Yesteryear Exists Sucker',
  'Yiddish Excavation Solemnity',
  'Yo Eager Stiff',
  'Yo Em Sa',
  'Yobbiest Ever Song',
  'Yoda Entertainment Service',
  'Yoda\'s Easter Salutation',
  'Yodelers Electric Sentimentalism',
  'Yodeling Experts Speeddating',
  'Yoemanry Elevation Science',
  'Yoga Eat Shit',
  'Yoghurt Expeditionary Saponification',
  'Yoni Edge Stroke',
  'York East Scotland',
  'You Eat Shit',
  'You Expecting Something?',
  'Young Educated Socialists',
  'Young Energetic Scores',
  'Your Ear Sucks',
  'Your Ears Suck',
  'Your Easy Sex',
  'Your Edition Solitude',
  'Your Entertainment Service',
  'Your Eskalations Stufe',
  'Your Eyes Stink',
  'Youth Extinction Strobotomy',
  'Yummy Endless Sausage',
  'Yummy Endless Sex',
  'Yummy Endless Sodomy',
  'Yuppies Extravagance Shop',
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
const releaseListElement = document.getElementById('release-list')
const viewElements = document.getElementsByClassName('view')

const detailsElements = document.getElementsByClassName('release-preview__details')
const releaseElements = document.getElementsByClassName('release')
const toggleElements = document.querySelectorAll('[data-toggle]')

let currentDisplayMode
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

  for (let i = 0; i < detailsElements.length; i += 1) {
    const element = detailsElements[i]
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
        generateGradient()
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

function initializeDisplayModes() {
  currentDisplayMode = DEFAULT_DISPLAY_MODE
  releaseListElement.classList.add(`release-list--${currentDisplayMode}`)

  DISPLAY_MODES.forEach(item => {
    const element = document.getElementById(`display-mode-${item}`)

    element.addEventListener('click', event => {
      event.preventDefault()

      if (currentDisplayMode !== item) {
        releaseListElement.classList.remove(`release-list--${currentDisplayMode}`)
        releaseListElement.classList.add(`release-list--${item}`)

        currentDisplayMode = item
      }
    })
  })
}

function initializeReleases() {
  const releaseIdElems = {};

  for (let i = 0; i < releaseElements.length; i += 1) {
    releaseIdElems[releaseElements[i].id] = releaseElements[i];
  }

  for (let i = 0; i < toggleElements.length; i += 1) {
    const toggleElem = toggleElements[i]

    toggleElem.addEventListener('click', event => {
      event.preventDefault()

      const id = toggleElem.dataset.toggleId
      const displayMode = toggleElem.dataset.toggle

      if (displayMode !== currentDisplayMode) {
        return
      }

      if (id in releaseIdElems) {
        if (currentReleaseItem === id) {
          currentReleaseItem = undefined
        } else {
          currentReleaseItem = id
          generateColors()
          generateGradient()
        }

        for (let i = 0; i < releaseElements.length; i += 1) {
          releaseElements[i].classList.remove('release--visible')

          if (releaseElements[i].id === currentReleaseItem) {
            releaseElements[i].classList.add('release--visible')
          }
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

  request(MAILCHIMP_URL, email)
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
  initializeDisplayModes()

  generateAcronym()
  generateColors()
  generateGradient()
})
