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

const COLORS_TEXT = [
  new Color(60, 188, 100),
  new Color(108, 100, 122),
  new Color(188, 122, 100),
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

const gradientElement = document.getElementById('gradient')
const homeElement = document.getElementById('navigation-releases')
const previewDetailsElements = document.getElementsByClassName('preview__details')
const previewElements = document.getElementsByClassName('preview__catalog')
const releaseElements = document.getElementsByClassName('release')
const viewElements = document.getElementsByClassName('view')

let currentNavigationItem = undefined
let currentReleaseItem = undefined

function getRandomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
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

function generateColors() {
  const colorA = getRandomArrayItem(COLORS)
  let colorB = getRandomArrayItem(COLORS)

  while (colorB === colorA) {
    colorB = getRandomArrayItem(COLORS)
  }

  gradientElement.style.cssText = gradientString(
    getRandomArbitrary(0, 360),
    colorA,
    colorB,
    getRandomArbitrary(35, 65)
  )

  for (let i = 0; i < previewDetailsElements.length; i += 1) {
    const element = previewDetailsElements[i]

    element.style.color = COLORS_TEXT[i % COLORS_TEXT.length].toString()
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

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation()
  initializeReleases()

  generateAcronym()
  generateColors()
})
