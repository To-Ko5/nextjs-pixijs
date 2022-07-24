import type { NextPage } from 'next'
import { useEffect } from 'react'
import * as PIXI from 'pixi.js'
import { GlitchFilter } from 'pixi-filters'

const Filter = () => {
  let app: PIXI.Application,
    container: PIXI.Container,
    sprite: PIXI.Sprite,
    sprite2: PIXI.Sprite,
    noiseFilter: PIXI.Filter,
    glitchFilter: PIXI.Filter,
    scroll: number
  const sizes = {
    width: 0,
    height: 0
  }

  useEffect(() => {
    if (document.readyState === 'complete') {
      init()
    } else {
      window.addEventListener('load', init)
    }
    window.addEventListener('resize', resize)
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
  }, [])

  const init = () => {
    if (app) return
    app = new PIXI.Application({
      width: sizes.width,
      height: sizes.height,
      resizeTo: window,
      antialias: true
    })
    const main = document.getElementById('main')!
    main.appendChild(app.view)

    // コンテナの作成
    container = new PIXI.Container()
    app.stage.addChild(container)
    app.loader.add('/photo.png').load(spriteSetUp)
  }

  // 画像を表示
  const spriteSetUp = () => {
    sprite = PIXI.Sprite.from('/photo.png')
    sprite.width = 400
    sprite.height = 200
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.position.x = sizes.width / 2
    sprite.position.y = sizes.height

    sprite2 = PIXI.Sprite.from('/photo.png')
    sprite2.width = 400
    sprite2.height = 200
    sprite2.anchor.x = 0.5
    sprite2.anchor.y = 0.5
    sprite2.position.x = sizes.width / 2 + 100
    sprite2.position.y = sizes.height + 500
    container.addChild(sprite, sprite2)
    addFilter()

    scroll = 0
    window.addEventListener('scroll', () => {
      scroll = window.pageYOffset
      tick()
    })
  }

  // フィルター
  const addFilter = () => {
    noiseFilter = new PIXI.filters.NoiseFilter()
    noiseFilter.noise = 0.7
    noiseFilter.seed = 0.8
    glitchFilter = new GlitchFilter()

    sprite.filters = [noiseFilter, glitchFilter]
    sprite2.filters = [noiseFilter, glitchFilter]

    app.ticker.add(() => {
      noiseFilter.seed = Math.random()
      glitchFilter.fillMode = 0
      glitchFilter.slices = Math.floor(Math.random() * (10 + 1 - 4)) + 4
      glitchFilter.red = [3, 2]
      glitchFilter.offset = Math.random() * 100
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

  const tick = () => {
    // console.log(scroll)
    sprite.position.y = sizes.height - scroll
    sprite2.position.y = sizes.height + 500 - scroll
    // console.log(sprite.position.y, sizes.height / 2)
    if (sprite.position.y < sizes.height / 2) {
      // console.log('check')
      sprite.filters = []
    } else {
      sprite.filters = [noiseFilter, glitchFilter]
    }
  }
  return (
    <>
      <div
        id="main"
        style={{
          height: '100%',
          width: '100%',
          maxHeight: '1200px',
          position: 'fixed',
          top: 0,
          left: 0
        }}
      ></div>
    </>
  )
}

export default Filter
