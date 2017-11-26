import * as deps from '../AppFactory'
import FirebaseAPIService from '../services/FirebaseAPIService'
import User from '../models/user'

const app = deps.app

app.get('users', (req, res) => {
  console.log('1')
  res.send({res: "tomato"})
})

app.get('api/users', (req, res) => {
  console.log('12')
  res.send({res: "onetime"})
})

app.post('/api/users', (req, res) => {
  const token = req.body.token
  const username = req.body.username
  if (token && username) {
    console.log(User)
  }
  res.send({res: "twotime"})
})
