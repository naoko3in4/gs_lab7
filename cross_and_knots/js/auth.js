const auth = firebase.auth();
let uid;
let shortedId;
let myRole;
let myTurn;
const  error = {
  code: null,
  message: null
}

// ログイン・ログアウト
const authLogin = () => {
  auth.signInAnonymously().catch(e => {
    error.code = e.code;
    error.message = e.message;
  });
};

const authLogout = () => {
  auth.signOut();
  location.reload();
  // ログアウトと同時に新しい匿名ログインIDを取得
  authLogin();
}

// ページを訪れた時に自動で匿名ログインする
auth.onAuthStateChanged(user => {
  if(user) {
    uid = user.uid;
    shortedId = user.uid.substr(0,5);
    console.log(`${shortedId}としてログインしています`);
    return;
  }
  console.log(`ログアウトしています`);
  uid = null;
  shortedId = null;
  hideContent();
})

// ホストがルームを作って入る
const createRoom = () => {
  const user = auth.currentUser;
  // 部屋番号作る
  const num = Math.round(Math.random() * 10000);
  roomNum = num;
  myRole = 'host';
  myTurn = -1;

  // FBに userCollectionをつくる＆部屋番号もったdocument作成
  const roomUsersCollection =  db.collection('rooms').doc(`room${roomNum}`).collection('users');
  roomUsersCollection.get()
  .then(doc => {
    if(doc.host) {
      return;
    }
    roomUsersCollection.doc('host').set({
      uid: user.uid
    })
    getHands(); // handsCollection に接続
    showContent();
    setRoleIsReady(myRole);
    getGameIsReady();
  })
  .catch(e => {
    console.error(e);
  })
}

// ゲストがルームを入力して入る
enterRoom.addEventListener('submit', e => {
  // defaultで再読込になるのを防ぐ
  e.preventDefault();
  // ログイン情報
  const user = auth.currentUser;
  uid = user.uid;
  // 入力した部屋番号
  const inputRoomNum = $id('inputRoomNumber').value;
  roomNum = inputRoomNum;
  myRole = 'guest';
  myTurn = 1;
  // FBに登録
  // const roomUsersCollection = db.collection('rooms').doc(`room${inputRoomNum}`).collection('users');
  const roomUsersCollection = db.collection('rooms').doc(`room${roomNum}`).collection('users');
  roomUsersCollection.get()
  .then(doc => {
    if (doc.docs.length >= 2) {
      error.message = `${inputRoomNum}は満員です`;
      showError();
      return;
    }
    authLogin();
    roomUsersCollection.doc('guest').set({
      uid: uid
    });
    getHands(); // handsCollection に接続
    showContent();
    setRoleIsReady(myRole);
    getGameIsReady();
  })
  .catch(e => {
    console.error(e);
  })
})
