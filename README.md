# Sainsburys Product Scraper using node

## 📕 Index
* [Notes](#notes)
* [Installing](#installing)
* [Launching](#launching)
* [Testing](#testing)

### 📚 <a name="notes">Notes</a>
* Entry point of the app: `start.js`
* Tests are located in `scripts/tests`
* Results are written in `data/data.json` after the process finishes
* Bluebird & request are handling data fetching and promises
* Mocha and chai are used for test running
* Tested on node 6.8.1 (stable) and 5.12.0
* Written data file: [click here](https://raw.githubusercontent.com/azz0r/sainsburys-node-scraper/master/data/data.json)

### 💪 <a name="installing">Installing</a>
```node
npm cache clean && npm install && npm run start
```

### 🚀 <a name="launching">Launching</a>
Run script `npm run start`

### 📚 <a name="testing">Testing</a>
Test  `npm run test`
