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

const COLORS = [
  new Color(122, 188, 255),
  new Color(208, 255, 122),
  new Color(188, 122, 255),
]

const ACRONYMS = [
  'Y Earring Slit',
  'Yabbering Entelodont Society',
  'Yacht Etching Society',
  'Yah Ex Shoes',
  'Yahoo Email Subscription',
  'Yakuza Enemy Squasher',
  'Yale Exodus Service',
  'Yam Eating Session',
  'Yangtze Entering Shanghai',
  'Yankee Easter Sundown',
  'Yanking Excepting Sabbath',
  'Yard Egg Salad',
  'Yawn Ecstacy Shalom',
  'Yea Eat Serum',
  'Year End Sale',
  'Yearbook Extra Salty',
  'Yearlong Ecstasy Subordination',
  'Yearly Exotic Shows',
  'Yearning Every Saturday',
  'Yeast Elicits Sugar',
  'Yeasty Erratic Soliloquy',
  'Yeh Extremists Sing',
  'Yelling Episodic Synopsis',
  'Yellow Egg Sauce',
  'Yellow Entropic Sessions',
  'Yellowstone Excavation Syndicate',
  'Yelp Eek Shit',
  'Yes Export Service',
  'Yesterday Ended Slow',
  'Yesterday\'s Eaten Sausage',
  'Yesteryear Exists Sucker',
  'Yesteryear Eye Strobo',
  'Yeti Election Services',
  'Yiddish Excavation Solemnity',
  'Yo Eager Stiff',
  'Yo Em Sa',
  'Yobbiest Ever Song',
  'Yoda Entertainment Service',
  'Yoda\'s Easter Salutation',
  'Yodeler\'s Electroacoustic Sentimentalism',
  'Yodeling Experts Speeddating',
  'Yoemanry Elevation Science',
  'Yoga Eat Shit',
  'Yoghurt Expeditionary Saponification',
  'Yoghurt Expired Sadly',
  'Yogic Entropic Shivering',
  'Yoke Error Shitstorm',
  'Yoni Edge Stroke',
  'York East Scotland',
  'You Eat Shit',
  'You Expecting Something?',
  'You\'d Easily Safari',
  'Young Educated Socialists',
  'Young Energetic Scores',
  'Youngster Exacerbates Sabotage',
  'Your Ears Suck',
  'Your Easy Sex',
  'Your Edition Solitude',
  'Your Eminence Surprises',
  'Your Entertainment Service',
  'Your Eskalations Stufe',
  'Your Eyes Stink',
  'Youth Eats Seniors',
  'Youth Extinction Strobotomy',
  'Yuletide Extreme Sailing',
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

const acronymElements = document.getElementsByClassName('acronym')
const gradientElement = document.getElementById('gradient')
const newsletterElement = document.getElementById('newsletter')
const releaseListElement = document.getElementById('release-list')
const viewElements = document.getElementsByClassName('view')

const detailsElements = document.getElementsByClassName('release-preview__details')
const releaseElements = document.getElementsByClassName('release')
const toggleElements = document.querySelectorAll('[data-toggle]')

let currentDisplayMode
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

function initializeAcronymGeneration() {
  for (let i = 0; i < acronymElements.length; i += 1) {
    acronymElements[i].innerText = getRandomArrayItem(ACRONYMS)
  }
}

function initializeDisplayModes() {
  if (!releaseListElement) {
    document.body.classList.add('display-mode-hidden')
    return
  }

  currentDisplayMode = DEFAULT_DISPLAY_MODE
  releaseListElement.classList.add(`release-list--${currentDisplayMode}`)
  document.body.classList.add(`display-mode-${currentDisplayMode}`)

  DISPLAY_MODES.forEach(item => {
    const element = document.getElementById(`display-mode-${item}`)

    element.addEventListener('click', event => {
      event.preventDefault()

      if (currentDisplayMode !== item) {
        releaseListElement.classList.remove(`release-list--${currentDisplayMode}`)
        document.body.classList.remove(`display-mode-${currentDisplayMode}`)
        releaseListElement.classList.add(`release-list--${item}`)
        document.body.classList.add(`display-mode-${item}`)

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

        if (currentReleaseItem && ('scrollIntoView' in releaseIdElems[id])) {
          releaseIdElems[id].scrollIntoView({
            alignToTop: true,
            behavior: 'smooth',
          })
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
  if (!newsletterElement) {
    return
  }

  newsletterElement.addEventListener('submit', event => {
    event.preventDefault()
    submitSubscribeForm()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initializeReleases()
  initializeGradientControl()
  initializeNewsletter()
  initializeDisplayModes()
  initializeAcronymGeneration()
  // initializeSpaceship()

  generateColors()
  generateGradient()
})
