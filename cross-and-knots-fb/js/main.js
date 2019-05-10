// 入退室
const enterRoom = document.getElementById('enter-room');

// グローバル
let roomNum;

// jsのみ時定義
const stage = document.getElementById('stage');
const table = document.createElement('table');
const start = document.getElementById('start');
const result = document.getElementById('result');
const winnerMaru = `<p class="result__sentence"><span class=result-who__maru>◯</span>が揃って勝ち!</p>`;
const winnerBatsu = `<p class="result__sentence"><span class=result-who__batsu>✗</span>が揃って勝ち!</p>`;
const cells = [
  '', '', '',
  '', '', '',
  '', '', ''
];

const hands = {
  '-1': '◯',
  '1': `✗`
}

let turn = -1; // ターン
let canClick = false;

const init = () => {
  console.log('init');
  authLogin();
  // canClick = true;
}
// ルームを作って入る
// const createRoom
// スタートボタン




start.addEventListener('click', () => {
  setRoleIsReady();
  draw();
  start.style.display = 'none';
  canClick = true;
  createRoom();
})

// テーブルの描画
const draw = () => {
  for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
      const td = document.createElement('td');
      td.id = i * 3 + j;
      td.classList = 'td';
      td.onclick = clickedTd;
      // td.textContent = hands[cells[i * 3 + j]];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  stage.append(table);
}

const clickedTd = (e) => {
  if (!canClick) {
    return;
  }

  // クリックした id を取得。これが cells の index になる。
  const clickedId = e.srcElement.id;

  // もし cells の clickedId 番目に数字があれば return
  if (typeof cells[clickedId] === 'number') {
    console.log('押せないよ');
    return;
  }
  // cells の clickedId 番目を turn に変更
  // クリックした箇所を cell 上で書き換える
  cells[clickedId] = turn;

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
  if (cells[0]===-1 && cells[1]===-1 && cells[2]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    // 勝ったら終了
    canClick = false;
  }
  if (cells[3]===-1 && cells[4]===-1 && cells[5]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    canClick = false;
  }
  if (cells[6]===-1 && cells[7]===-1 && cells[8]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    canClick = false;
  }
  if (cells[0]===-1 && cells[3]===-1 && cells[6]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    canClick = false;
  }
  if (cells[1]===-1 && cells[4]===-1 && cells[7]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    canClick = false;
  }
  if (cells[2]===-1 && cells[5]===-1 && cells[8]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    canClick = false;
  }
  if (cells[0]===-1 && cells[4]===-1 && cells[8]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    canClick = false;
  }
  if (cells[2]===-1 && cells[4]===-1 && cells[6]===-1) {
    console.log('-1: ◯が揃って勝ち');
    result.innerHTML = winnerMaru;
    canClick = false;
  }

  // 1が揃って勝つ場合
  if (cells[0]===1 && cells[1]===1 && cells[2]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }
  if (cells[3]===1 && cells[4]===1 && cells[5]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }
  if (cells[6]===1 && cells[7]===1 && cells[8]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }
  if (cells[0]===1 && cells[3]===1 && cells[6]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }
  if (cells[1]===1 && cells[4]===1 && cells[7]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }
  if (cells[2]===1 && cells[5]===1 && cells[8]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }
  if (cells[0]===1 && cells[4]===1 && cells[8]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }
  if (cells[2]===1 && cells[4]===1 && cells[6]===1) {
    console.log('1: ✗が揃って勝ち');
    result.innerHTML = winnerBatsu;
    canClick = false;
  }

  // プレイヤーを切り替える
  if (turn == -1) {
    cells[clickedId] = turn;
    turn = 1;
  } else {
    turn = -1;
  }

  // clickedTd した箇所の textContent を hands[cells[clickedId]] に変更する
  resultDraw(clickedId);
}

// 結果を描画
const resultDraw = (clickedId) => {
  const resultTd = document.getElementById(clickedId);
  resultTd.innerHTML = hands[cells[clickedId]];
}


