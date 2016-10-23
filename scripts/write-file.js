import chalk from 'chalk'
import jsonfile from 'jsonfile'
jsonfile.spaces = 2

const log = console.log

function writeFile(filename, data) {
  jsonfile.writeFile(filename, data, function (err) {
    if (err) {
      return log(chalk.red.inverse(`Failed to write data file: ${err}`))
    }
    log(chalk.bgGreen.white.bold(`Data file written successfull: ${filename}`))
  })
}

export default writeFile
