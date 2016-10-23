import request from "request"
import cheerio from "cheerio"
import chalk from "chalk"
import writeFile from "./scripts/write-file"
import setProductPageInformation from "./scripts/set-product-page-information"
import totalUnitPrices from "./scripts/total-unit-prices"
import getPriceFromString from "./scripts/get-price-from-string"
import collection from './scripts/tests/stub.json'
import config from './config.json'

const log = console.log

request(config.scrapeUrl, (error, response, body) => {
  const $ = cheerio.load(body)
  let collection = []

  if (!error) {
    log(chalk.bgWhite.black("No error receieved, processing body"))
    let
      titles = $(config.cssPaths.titles).text().split("\n"),
      urls = $(config.cssPaths.urls).map((i, el) => {
        return $(el).attr("href").trim()
      }).toArray(),
      unitPrices = $(config.cssPaths.unitPrices).map((i, el) => {
        return $(el).text().trim()
      }).toArray()

      // we use titles as our anchor
      titles
        .filter((title) => title.trim() > "")
        .forEach((title, key) => {
          title = title.trim()
          let url =  urls[key]
          if (title > "" && url > "") {
            log(chalk.bgGreen.black(`Adding ${title} to the collection`))
            collection[key] = {
              title: title,
              url: url,
              unit_price: getPriceFromString(unitPrices[key] ? unitPrices[key] : 0)
            }
          }
        })
      setProductPageInformation(collection)
        .then(() => {
          let writtenResult = {
            results: collection,
            total: totalUnitPrices(collection)
          }
          writeFile(config.storagePath, writtenResult)
        })
      log(chalk.bgYellow.black.bold('Collection: '),
        chalk.bgWhite.black(collection))
  } else {
    log(chalk.red.inverse(`Failed to write data file ${err}`))
  }
})
