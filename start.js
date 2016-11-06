import phantom from 'x-ray-phantom'
import Xray from 'x-ray'
import config from './config.json'

const x = Xray().driver(phantom({webSecurity:false}))


x(
  config.scrapeUrl,
  config.cssPath,
  config.cssPaths)
    .write('results.json')
