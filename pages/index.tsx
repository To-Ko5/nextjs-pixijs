import type { NextPage } from 'next'
import { useEffect } from 'react'
import * as PIXI from 'pixi.js'
import { GlitchFilter } from 'pixi-filters'

const Home: NextPage = () => {
  let app: PIXI.Application, container: PIXI.Container, sprite: PIXI.Sprite
  const sizes = {
    width: 0,
    height: 0
  }

  useEffect(() => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    init()
    window.addEventListener('resize', resize)
  }, [])

  const init = () => {
    if (app) return
    app = new PIXI.Application({
      width: sizes.width,
      height: sizes.height,
      resizeTo: window
    })
    const main = document.getElementById('main')!
    main.appendChild(app.view)

    // コンテナの作成
    container = new PIXI.Container()
    app.stage.addChild(container)
    app.loader.add('https://source.unsplash.com/random/').load(spriteSetUp)
  }

  // 画像を表示
  const spriteSetUp = () => {
    sprite = PIXI.Sprite.from('https://source.unsplash.com/random/')
    sprite.width = sizes.width - 20
    sprite.height = 300
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.position.x = sizes.width / 2
    sprite.position.y = sizes.height / 2
    container.addChild(sprite)
    noiseFilter()
  }

  const noiseFilter = () => {
    const noiseFilter = new PIXI.filters.NoiseFilter()
    const glitchFilter = new GlitchFilter()
    sprite.filters = [glitchFilter]
    noiseFilter.noise = 0.7
    noiseFilter.seed = 0.8
    sprite.filters = [noiseFilter, glitchFilter]

    app.ticker.add(() => {
      noiseFilter.seed = Math.random()
      glitchFilter.fillMode = 0
      glitchFilter.slices = 10
      glitchFilter.offset = Math.random() * 10
    })
  }

  // リサイズ処理
  const resize = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sprite.position.x = sizes.width / 2
    sprite.position.y = sizes.height / 2
    app.renderer.resize(sizes.width, sizes.height)
  }
  return (
    <>
      <div
        id="main"
        style={{
          height: '100%',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0
        }}
      ></div>
    </>
  )
}

export default Home
