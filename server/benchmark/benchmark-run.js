'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3030/products/37311',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)

function startBench () {
  const instance = autocannon({
    url: 'http://localhost:' + server.address().port
  }, finishedBench)

  autocannon.track(instance)

  // this is used to kill the instance on CTRL-C
  process.once('SIGINT', () => {
    instance.stop()
  })

  function finishedBench (err, res) {
    console.log('finished bench', err, res)
  }
}

// Render results
autocannon.track(instance, {renderProgressBar: false})

// To kill the instance on CTRL-C
process.once('SIGINT', () => {
  instance.stop()
})