let handsCollection;

// FB: handsCollectionを作って onSnapshot で状態を監視
getHands = () => {
  handsCollection = db.collection('rooms').doc(`room${roomNum}`).collection(`hands`);
  handsCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // 手を出したタイミングで都度判定
        const data = change.doc.data();
        const cell = data.cell;
        // cells の clickedId 番目を turn に変更
        // クリックした箇所を cell 上で書き換える
        cells[cell] = turn;
        // clickedTd した箇所の textContent を hands[cells[cell]] に変更する
        resultDraw(cell);
        judge();
        // プレイヤーを切り替える
        turn *= -1;
        turnMessage.innerHTML = `${turn === myTurn ? 'あなた' : '相手'}のターンです`;
      }
    });
  })
}

// table クリックした場所のidを取得
// 出した手をFB: handsCollectionに追加
table.addEventListener('click', e => {
  // 自ターンかどうか確認
  if (turn !== myTurn) {
    return;
  }
  if (!gameIsReady || !canClick) {
    return;
  }

  // クリックした id を取得。これが cells の index になる。
  const clickedId = e.srcElement.id;
  // もし cells の clickedId 番目に数字があれば return
  if (typeof cells[clickedId] === 'number') {
    console.log('押せないよ');
    return;
  }
  // fb に置いた手の情報をおくる
  addHandCollection(clickedId);
})

const addHandCollection = (clickedId) => {
  handsCollection.add({
    user: uid,
    cell: clickedId,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    // console.log(`${doc.id}added!`);
  })
  .catch(e => {
    console.error(e);
  })
}
