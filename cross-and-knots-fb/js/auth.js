const auth = firebase.auth();
let uid;
let shortedId;
let myRole;
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
  auth.signout();
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
})

// ホストがルームを作って入る
const createRoom = () => {
  const user = auth.currentUser;
  // 部屋番号作る
  const num = Math.round(Math.random * 10000);
  roomNum = num;
  myRole = 'host';

// FBに userCollectionをつくる＆部屋番号もったdocument作成
  const roomuserCollection =  db.collection('rooms').doc(`room${roomNum}`).collection('users');
  roomuserCollection.get()
  .then(doc => {
    if(doc.host) {
      return;
    }
    roomuserCollection.doc('host').set({
      uid: user.id
    })
  })
}
// ゲストがルームを入力して入る
enterRoom.addEventListener('submit', e => {
  console.log(enterRoom);
  const inputRoomNum = document.getElementById('input-room-number').value;
  console.log(inputRoomNum);
  roomNUm = inputRoomNum;
  console.log(roomNUm);
})
