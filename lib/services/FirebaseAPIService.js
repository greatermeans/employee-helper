class FirebaseAPIService {
  initialize(firebaseReference) {
    this.database = firebaseReference.database()
    this.firebase = firebaseReference
  }

  subscribe(
    path,
    handler
  ) {
    const ref = this.database.ref(path).orderByKey()
    ref.off()
    return ref.on('value', handler)
  }

  add(
    path,
    newItem
  ) {
    let itemToAdd = JSON.parse(JSON.stringify(newItem))
    itemToAdd.createdAt = this.firebase.database.ServerValue.TIMESTAMP
    return this.database.ref(path).push(itemToAdd).path.o.pop()
  }

  remove(
    path
  ) {
    return this.database.ref(path).remove()
  }

  subscribe(
    path,
    handler
  ) {
    console.log(this.database.ref(path).orderByKey().on('value', console.log))
    return this.database.ref(path).orderByKey().on('value', handler)
  }

  subscribeByValue(
    path,
    handler,
    field,
    value
  ) {
    return this.database.ref(path).orderByChild(field).equalTo(value).on('value', handler)
  }

  update(
    path,
    newState,
    handler
  ) {
    return this.database.ref(path).update(newState, handler)
  }
}

const firebaseAPIService = new FirebaseAPIService()

export default firebaseAPIService
