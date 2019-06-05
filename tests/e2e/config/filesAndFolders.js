/*
  When testing locally and not wanting to actually do an `npm install`,
  there won't be a `package-lock.json` file. Passing the `noInstall`
  argument to the test runner will help us filter it out for tests.
*/
const noInstall = process.argv.includes('noInstall')

const cna = {
  './': [
    '.env',
    '.gitignore',
    'after-compile-plugin.js',
    'package.json',
    !noInstall && 'package-lock.json', // Only available when `npm install` is run.
    'postcss.config.js',
    'README.md',
    'webpack.config.js'
  ].filter(Boolean),
  './.git': null,
  './dist': ['favicon.ico', 'robots.txt'],
  './node_modules': null,
  './src': ['entry.js', 'index.ejs'],
  './src/assets': [],
  './src/components': ['App.jsx'],
  './src/styles': ['_global.scss', 'styles.scss']
}

const cnaRedux = {
  ...cna,
  './src': ['entry.js', 'index.ejs', 'store.js'],
  './src/utils': [],
  './src/utils/actions': ['index.js'],
  './src/utils/helpers': ['index.js'],
  './src/utils/middleware': [],
  './src/utils/reducers': ['appReducer.js'],
}

const cnaRouter = {
  ...cna,
  './src/components': ['Home.jsx', 'NotFound.jsx'],
}

const cnaRouterRedux = {
  ...cnaRedux,
  ...cnaRouter,
  './src': ['entry.js', 'index.ejs', 'store.js'],
  './src/utils/reducers': ['homeReducer.js']
}

const cnaExpress = {
  ...cna,
  './': [...cna['./'], 'server.js'],
  './api': ['home.js'],
  './api/utilities': ['catchy.js', 'errorUtil.js']
}

const cnaExpressRedux = {
  ...cnaRedux,
  ...cnaExpress,
  './src': ['entry.js', 'index.ejs', 'store.js']
}

const cnaExpressRouter = {
  ...cnaExpress,
  ...cnaRouter,
  './': cnaExpress['./']
}

const cnaExpressRouterRedux = {
  ...cnaExpress,
  ...cnaRouterRedux,
  './': cnaExpress['./']
}

const cnaMongo = {
  ...cnaExpress,
  './api/utilities': ['catchy.js', 'errorUtil.js', 'handleErrors.js', 'logMongoAuthWarning.js', 'mongo.js']
}

const cnaMongoRedux = {
  ...cnaExpressRedux,
  ...cnaMongo,
  './src': ['entry.js', 'index.ejs', 'store.js']
}

const cnaMongoRouter = {
  ...cnaExpressRouter,
  ...cnaMongo,
  './src/components': cnaRouter['./src/components']
}

const cnaMongoRouterRedux = {
  ...cnaExpressRouterRedux,
  ...cnaMongo,
  './src': cnaRedux['./src'],
  './src/components': cnaRouter['./src/components']
}


module.exports = {
  cna,
  cnaRedux,
  cnaRouter,
  cnaRouterRedux,

  cnaExpress,
  cnaExpressRedux,
  cnaExpressRouter,
  cnaExpressRouterRedux,

  cnaMongo,
  cnaMongoRedux,
  cnaMongoRouter,
  cnaMongoRouterRedux
}