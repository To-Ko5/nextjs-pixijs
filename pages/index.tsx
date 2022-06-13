import type { NextPage } from 'next'
import { useEffect } from 'react'
import * as PIXI from 'pixi.js'

const Home: NextPage = () => {
  useEffect(() => {
    window.addEventListener('load', init)
  }, [])

  function init() {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })
    const main = document.getElementById('main')!
    main.appendChild(app.view)

    let sprite = PIXI.Sprite.from('https://source.unsplash.com/random/')
    app.stage.addChild(sprite)

    let filter = new PIXI.filters.BlurFilter()
    sprite.filters = [filter]

    let elapsed = 0.0
    app.ticker.add((delta) => {
      elapsed += delta
    })
    window.addEventListener('resize', resize)

    function resize() {
      app.renderer.resize(window.innerWidth, window.innerHeight)
    }
  }
  return (
    <>
      <div id="main"></div>
    </>
  )
}

export default Home
