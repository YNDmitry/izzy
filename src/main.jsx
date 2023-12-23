import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { SplitText } from 'https://cdn.jsdelivr.net/gh/ayhanexe/gsap-class-based-splitText-plugin/src/splitText.js'
if (import.meta.env.PROD) {
  const text = new SplitText("[data-split-text]", { type: "words" })
  const textTimeline = gsap.timeline({
    stagger: 0.1,
    duration: 0.5,
    repeat: -1,
    repeatDelay: 0.5,
    scrollTrigger: {
      start: "-=50% top",
      end: "bottom +=100",
      trigger: "#cta",
    }
  })

  gsap.set(text.words, {
    y: 100
  })

  textTimeline.to(text.words, {
    y: 0,
    stagger: 0.1,
  })

  textTimeline.to(text.words, {
    y: 100,
    stagger: 0.1,
    delay: 1,
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
