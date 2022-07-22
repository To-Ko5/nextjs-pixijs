import { useEffect } from 'react'
import * as PIXI from 'pixi.js'

const index = () => {
  useEffect(() => {
    window.addEventListener('load', init)
  }, [])

  function init() {
    console.log('dd')
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })
    console.log('called methods')
  }
  return <></>
}

export default index
