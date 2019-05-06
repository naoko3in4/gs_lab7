let handsCollection;

// rooms.room{roomNum}.hands に変更があれば通知する
getHands = () => {
  handsCollection = db.collection('rooms').doc(`room${roomNum}`).collection('hands');
  handsCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // 2人とも揃ったら勝負
        const data = change.doc.data();
        if (data.user !== uid) {
          enemyHand = data.hand;
        } else {
          mayHand = data.hand;
        }
        if (myHand && enemyHand) {
          judge();
          return;
        }
      }
    });
  });
}

// ジャンケン画像に数字のidを振る
handImages.forEach((hand, key) => {
  hand.id = key;
  // hand.onclick = click;
  handImgId = hand.id;
  // ジャンケンを定数で定義
  hand0Rock = document.getElementById('0');
  hand1Scissors = document.getElementById('1');
  hand2Paper = document.getElementById('2');
});

// クリックした画像のidを取得
// 出した手をDBに追加
// 画像 と handsListを紐付けて出した手と一致させる
jankenField.addEventListener('click', e => {
  const handId = e.srcElement.parentElement.id;
  // console.log(gameIsReady);
  if (!gameIsReady || !canClick) {
    return;
  }
  myHand = handsList[handId];
  myHandResult.textContent = `あなた: ${myHand}`;
  addHandCollection();
  canClick = false;
});

// firebaseにジャンケン何を出したか反映させる
addHandCollection = () => {
  handsCollection.add({
      user: uid,
      hand: myHand,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => {
      // console.log(`${doc.id} added!`);
    })
    .catch(e => {
      console.error(e);
    });
}

















