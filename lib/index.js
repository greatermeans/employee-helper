"use strict";

import * as deps from './AppFactory'
import bunyan from 'bunyan'
import firebase from 'firebase'
import firebaseService from './services/FirebaseAPIService'
import restify from 'restify'
import util from 'util'

const log = bunyan.createLogger({name: 'showtime'})

const server = restify.createServer( {
    log: log
})

const firebaseConfig = {
  apiKey: deps.config.API_KEY,
  authDomain: `https://${deps.config.PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${deps.config.PROJECT_ID}.firebaseio.com`,
  storageBucket: `${deps.config.PROJECT_ID}.appspot.com`,
}

firebase.initializeApp(firebaseConfig)
firebaseService.initialize(firebase)

deps.bootRestify(server);
///load our routes or exposed services
require('./routes/users')

const PORT = deps.config.NODEPORT || 5000
server.listen(PORT, function () {
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT)
})
