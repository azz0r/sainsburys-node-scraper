import request from "request"
import cheerio from "cheerio"
import chalk from "chalk"
import writeFile from "./scripts/write-file"
import setProductPageInformation from "./scripts/set-product-page-information"
import totalUnitPrices from "./scripts/total-unit-prices"
import getPriceFromString from "./scripts/get-price-from-string"
import collection from './scripts/tests/stub.json'

const url = "http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html"
const log = console.log
const filePath = "data/data.json"

request(url, (error, response, body) => {
  const $ = cheerio.load(body)
  let collection = []

  if (!error) {
    log(chalk.bgWhite.black("No error receieved, processing body"))
    let
      titles = $(".productInfo a").text().split("\n"),
      urls = $(".productInfo a").map((i, el) => {
        return $(el).attr("href").trim()
      }).toArray(),
      unitPrices = $(".pricePerUnit").map((i, el) => {
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
          writeFile(filePath, writtenResult)
        })
      log(chalk.bgYellow.black(`Collection:`),
        chalk.bgWhite.black(collection))
  } else {
    log(chalk.red.inverse(`Failed to write data file ${err}`))
  }
})
