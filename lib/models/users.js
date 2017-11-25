import FirebaseAPIService from '../services/FirebaseAPIService'

export default class Stats {
  constructor(path) {
    FirebaseAPIService.subscribe(path, (result) => {
      this.all = result.val() || {}
    })
  }

  destroy(id) {
    return FirebaseAPIService.remove(`users/${id}`)
  }

  create(newUser) {
    FirebaseAPIService.add('users/', newUser)
  }

  update(id, newUser) {
    FirebaseAPIService.update(`users/${id}`, newUser)
  }
}
