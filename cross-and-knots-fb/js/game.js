let gameCollection;

const setRoleIsReady = (role) => {
  gameCollection = db.collection('rooms').doc(`room${roomNum}`).collection('game');
  console.log(`${setRoleIsReady}が呼ばれたよ`);

  gameCollection.get()
  .then(() => {
    gameCollection.doc(`${role}isReady`).set({
      isReady:true
    })
  })
  .catch(e => {
    console.error(e);
  })
}
