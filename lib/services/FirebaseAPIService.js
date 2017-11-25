const DEFAULT_NAMESPACE = 'global/'

class FirebaseAPIService {
  initialize(firebaseReference) {
    this.database = firebaseReference.database()
    this.firebase = firebaseReference
  }

  subscribe(
    path,
    handler,
    namespace = DEFAULT_NAMESPACE
  ) {
    const ref = this.database.ref(namespace + path).orderByKey()
    ref.off()
    return ref.on('value', handler)
  }

  add(
    path,
    newItem,
    namespace = DEFAULT_NAMESPACE
  ) {
    let itemToAdd = JSON.parse(JSON.stringify(newItem))
    itemToAdd.createdAt = this.firebase.database.ServerValue.TIMESTAMP
    return this.database.ref(namespace + path).push(itemToAdd).path.o.pop()
  }

  remove(
    path,
    namespace = DEFAULT_NAMESPACE
  ) {
    return this.database.ref(namespace + path).remove()
  }

  subscribe(
    path,
    handler,
    namespace = DEFAULT_NAMESPACE
  ) {
    return this.database.ref(namespace + path).orderByKey().on('value', handler)
  }

  subscribeByValue(
    path,
    handler,
    field,
    value,
    namespace = DEFAULT_NAMESPACE
  ) {
    return this.database.ref(namespace + path).orderByChild(field).equalTo(value).on('value', handler)
  }

  update(
    path,
    newState,
    handler,
    namespace = DEFAULT_NAMESPACE
  ) {
    return this.database.ref(namespace + path).update(newState, handler)
  }
}

const firebaseAPIService = new FirebaseAPIService()

export default firebaseAPIService
