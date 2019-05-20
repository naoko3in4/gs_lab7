// $id で document.getElementByIdを定義
const $id = id => document.getElementById(id);
// 入退室
const entryContainer = $id('entry-container');
const enterRoom = $id('enter-room');
// ユーザー情報
const appContainer = $id('app__container');
const currentRoomNum = $id('currentRoomNum');
const currentUserId = $id('currentUserId');
// グローバル
let roomNum;
let canClick = false;
let hostIsReady = false;
let guestIsReady = false;
let gameIsReady = false;
let turnMessage = $id('turnMessage');

// マルバツゲーム
const stage = $id('stage');
const start = $id('start');
const result = $id('result');
const table = $id('table');
const winnerMaru = `<p class="result__sentence"><span class=result-who__maru>◯</span>が揃って勝ち!</p>`;
const winnerBatsu = `<p class="result__sentence"><span class=result-who__batsu>✗</span>が揃って勝ち!</p>`;
const cells = [
  '', '', '',
  '', '', '',
  '', '', ''
];
// 手
const hands = {
  '-1': '◯',
  '1': `✗`
}
// ターン
let turn = -1;

const handsList = [-1, 1];

// 初期化
init = () => {
  authLogin();
  draw();
  canClick = true;
}

// ログインしている時
// appContainer(ゲーム)表示
// entryContainer(入室画面)非表示
showContent = () => {
  currentRoomNum.textContent = `部屋番号：${roomNum}`;
  currentUserId.textContent = `ユーザーID：${shortedId}`;
  appContainer.classList.remove('hidden');
  entryContainer.classList.add('hidden');
}

// ログアウトしている時
// appContainer(ゲーム)非表示
// entryContainer(入室画面)表示
hideContent = () => {
  appContainer.classList.add('hidden');
  entryContainer.classList.remove('hidden');
}

// テーブルの描画
draw = () => {
  for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
      const td = document.createElement('td');
      td.id = i * 3 + j;
      td.classList = 'td';
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

//const clickedTd の代わりにjudge() をここで定義
judge = () => {
  if (!canClick) {
    return;
  }

  // 勝敗が決まったかを確認する
  // cells の index の勝ちパターン
  // 0,1,2
  // 3,4,5
  // 6,7,8

  // 0,3,6
  // 1,4,7
  // 2,5,8

  // 0,4,8
  // 2,4,6

  // -1が揃って勝つ場合
  const WinnerIsMaru = () => {
    canClick = false;
    result.innerHTML = winnerMaru;
    turnMessage.classList.add('hidden');
  }

  if (cells[0]===-1 && cells[1]===-1 && cells[2]===-1) {
    WinnerIsMaru();
  }
  if (cells[3]===-1 && cells[4]===-1 && cells[5]===-1) {
    WinnerIsMaru();
  }
  if (cells[6]===-1 && cells[7]===-1 && cells[8]===-1) {
    WinnerIsMaru();
  }
  if (cells[0]===-1 && cells[3]===-1 && cells[6]===-1) {
    WinnerIsMaru();
  }
  if (cells[1]===-1 && cells[4]===-1 && cells[7]===-1) {
    WinnerIsMaru();
  }
  if (cells[2]===-1 && cells[5]===-1 && cells[8]===-1) {
    WinnerIsMaru();
  }
  if (cells[0]===-1 && cells[4]===-1 && cells[8]===-1) {
    WinnerIsMaru();
  }
  if (cells[2]===-1 && cells[4]===-1 && cells[6]===-1) {
    WinnerIsMaru();
  }

  // 1が揃って勝つ場合
  const WinnerIsBatsu = () => {
    canClick = false;
    result.innerHTML = winnerBatsu;
    turnMessage.classList.add('hidden');
  }

  if (cells[0]===1 && cells[1]===1 && cells[2]===1) {
    WinnerIsBatsu();
  }
  if (cells[3]===1 && cells[4]===1 && cells[5]===1) {
    WinnerIsBatsu();
  }
  if (cells[6]===1 && cells[7]===1 && cells[8]===1) {
    WinnerIsBatsu();
  }
  if (cells[0]===1 && cells[3]===1 && cells[6]===1) {
    WinnerIsBatsu();
  }
  if (cells[1]===1 && cells[4]===1 && cells[7]===1) {
    WinnerIsBatsu();
  }
  if (cells[2]===1 && cells[5]===1 && cells[8]===1) {
    WinnerIsBatsu();
  }
  if (cells[0]===1 && cells[4]===1 && cells[8]===1) {
    WinnerIsBatsu();
  }
  if (cells[2]===1 && cells[4]===1 && cells[6]===1) {
    WinnerIsBatsu();
  }
}

// クリックできるかを判定し、置ける場合にここでを ◯ か ✗ かを描画
resultDraw = (clickedId) => {
  const resultTd = document.getElementById(clickedId);
  resultTd.innerHTML = hands[cells[clickedId]];
}


