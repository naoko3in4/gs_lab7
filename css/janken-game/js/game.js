let gameCollection;
// createRoom をしたプレイヤー(host) が DBの rooms.room{roomNum}.game.hostIsReady: true であることを追加
setRoleIsReady = (role) => {
  gameCollection = db.collection('rooms').doc(`room${roomNum}`).collection('game');

  gameCollection.get()
  .then(() => {
    // doc().set と add() はほとんど同義
    gameCollection.doc(`${role}IsReady`).set({
      isReady: true
    })
  })
  .catch(e => {
    console.error(e);
  });
}

changeRoleIsReady = (role, bool) => {
  gameCollection.doc(`${role}IsReady`).update({
    isReady: bool
  })
}

// DB の host と guest の isReady を監視する
getGameIsReady = () => {
  gameCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added' || change.type === 'modified') {
        // 2人とも揃ったら勝負
        const roleIsReady = change.doc.id; // hostIsReady or guestIsReady が入る

        gameCollection.doc(roleIsReady).get().then(doc => {
          // DBのhostIsReady の状態をフロントの hostIsReady に代入する
          if (roleIsReady === 'hostIsReady') {
            hostIsReady = doc.data().isReady;
          }
          // DBのguestIsReady の状態をフロントの guestIsReady に代入する
          if (roleIsReady === 'guestIsReady') {
            guestIsReady = doc.data().isReady;
          }
          // DB の hostIsReady と guestIsReady のいずれも true のとき、 front の変数 isReady が true になる
          // DB の hostIsReady か guestIsReady のいずれか、もしくはどちらも false のとき、 front の変数 isReady が false になる
          if (hostIsReady && guestIsReady) {
            gameIsReady = true;
          } else {
            gameIsReady = false;
          }
        });
      }
    })
  })
}