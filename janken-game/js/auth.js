const auth = firebase.auth();
let uid;
let shortedId;
let myRole;
const error = {
  code: null,
  message: null
}

// ログインとログアウト
authLogin = () => {
  auth.signInAnonymously().catch(e => {
    error.code = e.code;
    error.message = e.message;
  });
};

authLogout = () => {
  auth.signOut();
  location.reload();
  // ログアウトと同時に新しい匿名ログインIDを取得
  authLogin();
};

// ページを訪れた時に自動で匿名ログインする
auth.onAuthStateChanged(user => {
  if (user) {
    uid = user.uid;
    shortedId = user.uid.substr(0, 5);
    console.log(`${shortedId}としてログインしているよ`);
    return;
  }
  console.log('ログアウトしているよ');
  uid = null;
  shortedId = null;
  hideContent();
});

// 新しいルームを作って入る（ホストの挙動）
createRoom = () => {
  const user = auth.currentUser;
  // 部屋番号の生成
  const num = Math.round(Math.random() * 10000);
  roomNum = num;

  myRole = 'host';

  // firebase に room collection と部屋番号を持ったdocumentを作る
  const roomUsersCollection = db.collection('rooms').doc(`room${num}`).collection('users');

  roomUsersCollection.get()
  .then(doc => {
    if (doc.host) { // hostがいたらreturn
      return;
    }
    roomUsersCollection.doc('host').set({
      uid: user.uid
    })
    getHands();
    showContent();
    setRoleIsReady(myRole);
    getGameIsReady();
  })
  .catch(e => {
    console.error(e);
  });
}

// 既存の部屋番号を指定して入室する（ゲストの挙動）
enterRoom.addEventListener('submit', e => {
  e.preventDefault(); // defaultで再読込するのを防ぐ
  // ログイン情報取得
  const user = auth.currentUser;
  uid = user.uid;
  // 入力した部屋番号
  const inputRoomNum = document.getElementById('inputRoomNum').value;
  // roomNum をグローバルに持つ
  roomNum = inputRoomNum;

  myRole = 'guest';

  const roomUsersCollection = db.collection('rooms').doc(`room${inputRoomNum}`).collection('users');
  roomUsersCollection.get()
  .then(doc => {
    if (doc.docs.length >=2) {
      error.message = `${inputRoomNum}は満員です`;
      showError();
      return;
    }
    authLogin();
    roomUsersCollection.doc('guest').set({
      uid: uid
    });
    getHands();
    showContent();
    setRoleIsReady(myRole);
    getGameIsReady();
  })
  .catch(e => {
    console.error(e);
  });
})
