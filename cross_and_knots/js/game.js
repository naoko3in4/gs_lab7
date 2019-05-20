let gameCollection;

// FB: gameCollectionを作って roleごとに isReadyを入れる
setRoleIsReady = (role) => {
  gameCollection = db.collection('rooms').doc(`room${roomNum}`).collection('game');
  // console.log('setRoleIsReadyが呼ばれたよ');

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

changeRoleIsReady = (role, bool) => {
  gameCollection.doc(`${role}IsReady`).update({
    isReady: bool
  })
}

// FB の host と guest の isReady を監視する(2人ともログインしているかどうか監視)
getGameIsReady = () => {
  gameCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // 2人とも揃ったら勝負
        // hostIsReady guestIsReady を roleIsReady に入れる
        const roleIsReady = change.doc.id;
        console.log(roleIsReady);

        gameCollection.doc(roleIsReady).get().then(doc => {
          if (roleIsReady === 'hostisReady') {
            hostIsReady = doc.data().isReady;
          }
          if (roleIsReady === 'guestisReady') {
            guestIsReady = doc.data().isReady;
          }
          // FBの hostIsReady と guestIsReady のいずれもtrueのとき
          // isReady が trueになる
          // どちらか片方 false ならfalse になる
          if (hostIsReady && guestIsReady) {
            gameIsReady = true;
            turnMessage.innerHTML = `${turn === myTurn ? 'あなた' : '相手'}のターンです`;
          } else {
            gameIsReady = false;
          }
        });
      }
    });
  })
}
