import FirebaseAPIService from '../services/FirebaseAPIService'

class User {
  constructor(path) {
    console.log(FirebaseAPIService.subscribe)
    FirebaseAPIService.subscribe('users/', (result) => {
      console.log('before')
      this.all = result.val() || {}
      console.log('here')
      console.log(this.all)
    })
  }

  destroy(id) {
    return FirebaseAPIService.remove(`users/${id}`)
  }

  create(newUser) {
    FirebaseAPIService.add('users/', newUser)
  }

  findOrCreate(newUser) {

  }

  update(id, newUser) {
    FirebaseAPIService.update(`users/${id}`, newUser)
  }
}


const user = new User()

export default user
