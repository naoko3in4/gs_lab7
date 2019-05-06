// 入・退室
const entryContainer = document.getElementById('entry__container');
const enterRoom = document.getElementById('enterRoom');
// ユーザー情報
const appContainer = document.getElementById('app__container');
const currentRoomNum = document.getElementById('currentRoomNum');
const currentUserId = document.getElementById('currentUserId');
// じゃんけん
const jankenField = document.getElementById('jankenField');
const handsResultContainer = document.getElementById('handsResult__container');
const janken = document.getElementById('janken');
const handsList = ['グー', 'チョキ', 'パー'];
const handImages = document.querySelectorAll('.hand');

const handsResults = document.getElementById('handsResults');
const myHandResult = document.getElementById('myHandResult');
const enemyHandResult = document.getElementById('enemyHandResult');
const result = document.getElementById('result');
const errorMessage = document.getElementById('errorMessage');
// モーダル
const mask = document.getElementById('mask');
const modalClose = document.getElementById('modal__close');
const modal = document.getElementById('modal');

// グローバル変数
let hand0Rock;
let hand1Scissors;
let hand2Paper;
let myHand;
let enemyHand;
let roomNum;
let handImgId;
let canClick = false;
let hostIsReady = false;
let guestIsReady = false;
let gameIsReady = false;

// 初期化
init = () => {
  authLogin();
  canClick = true;
}

// ログインしている時
// appContainer（ジャンケン）を非表示
// entryContainer（入室画面）を非表示
showContent = () => {
  currentRoomNum.textContent = `部屋番号：${roomNum}`;
  currentUserId.textContent = `ユーザーID: ${shortedId}`;
  appContainer.classList.remove('hidden');
  entryContainer.classList.add('hidden');
  janken.classList.remove('hidden');
}

// ログアウトしてる時
// ジャンケン非表示
// 入室画面（entryContainer）表示
hideContent = () => {
  appContainer.classList.add('hidden');
  entryContainer.classList.remove('hidden');
  janken.classList.add('hidden');
}

showError = () => {
  errorMessage.textContent = error.message;
}

judge = () => {
  if (myHand === handsList[0]) {
    const judgeList = {
      'グー': 'ドロー',
      'チョキ': 'あなたの勝ち',
      'パー': 'あなたの負け',
    }
    result.textContent = judgeList[enemyHand];
    enemyHandResult.textContent = `相手: ${enemyHand}`;
    canClick = false;
  }
  if (myHand === handsList[1]) {
    const judgeList = {
      'グー': 'あなたの負け',
      'チョキ': 'ドロー',
      'パー': 'あなたの勝ち',
    }
    result.textContent = judgeList[enemyHand];
    enemyHandResult.textContent = `相手: ${enemyHand}`;
    canClick = false;
  }
  if (myHand === handsList[2]) {
    const judgeList = {
      'グー': 'あなたの勝ち',
      'チョキ': 'あなたの負け',
      'パー': 'ドロー',
    }
    result.textContent = judgeList[enemyHand];
    enemyHandResult.textContent = `相手: ${enemyHand}`;
    canClick = false;
  }
  // あいこの場合
  if (myHand === enemyHand) {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
  }
  changeRoleIsReady(myRole, false);
}

modalClose.addEventListener('click', () => {
  mask.classList.add('hidden');
  modal.classList.add('hidden');
  canClick = true;
  myHand = null;
  enemyHand = null;
  myHandResult.textContent = '';
  enemyHandResult.textContent = '';
  result.textContent = ''
  // DB の isReady = true
  changeRoleIsReady(myRole, true);
})

// 「もう１回」ボタンを作る
tryAgain = () => {
  myHand = null;
  enemyHand = null;
  myHandResult.textContent = '';
  enemyHandResult.textContent = '';
  result.textContent = ''
  canClick = true;
  changeRoleIsReady(myRole, true);
}

