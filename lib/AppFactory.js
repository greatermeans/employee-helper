import bunyan from 'bunyan'
import bunyanDebugStream from 'bunyan-debug-stream'
import Config from './config'
import path from 'path' //makes path.join available for joining directories
import restify from 'restify'
import util from 'util'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}

export const config =  Object.assign({}, Config)
export let gcloud = null
export let app = null

const localStream = {
  level: 'info',
  type: 'raw',
  stream: bunyanDebugStream({
    basepath: __dirname, // this should be the root folder of your project.
    forceColor: true
  })
}

export let logger = bunyan.createLogger({
  name: 'some app',
  src: false,
  streams: [localStream],
  serializers: bunyanDebugStream.serializers
})

if (config.NODE_ENV === 'production') {
  logger = bunyan.createLogger({
    name: 'some app',
    serializers: {
      req: bunyan.stdSerializers.req
    }
  })
}

export function bootRestify (_app) {
  _app.use(restify.requestLogger());
  _app.use(restify.queryParser());
  _app.use(restify.bodyParser());
  _app.use(restify.gzipResponse());
  restify.CORS.ALLOW_HEADERS.push('accept')
  restify.CORS.ALLOW_HEADERS.push('sid')
  restify.CORS.ALLOW_HEADERS.push('lang')
  restify.CORS.ALLOW_HEADERS.push('origin')
  restify.CORS.ALLOW_HEADERS.push('x-auth')
  restify.CORS.ALLOW_HEADERS.push('authorization')
  _app.use(restify.CORS());
  app = _app
}
