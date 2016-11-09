import phantom from 'x-ray-phantom'
import Xray from 'x-ray'
import config from './config.json'

const x = Xray().driver(phantom({webSecurity:false}))


x(
  config.scrapeUrl,
  {
    shows: x('#all-shows', {title: ['option'], 'value': ['option@value']}),
    showsItems: x(config.cssPath, config.cssPaths)
  }
)
.limit(3)
.write('results.json')
