const save = document.getElementById('save');
const clear = document.getElementById('clear');
const articleContainer = document.getElementById('article__container');
let stage;
let count = 30;
let diary;
let letters;
let canWrite = false;
let honjitu;
let writeCount = 1;

// console.log((new Date('1985-10-12')).getMonth() + 1);

// 特定の日付における "月" が欲しいときは引数を与える
// 現時刻における "月" が欲しいときは、引数を与えず、デフォルト引数で現時刻を渡す
const getMonth = (value = Date.now()) => {
  const theDay = new Date(value);
  return theDay.getMonth() + 1;
}

const getDay = (value = Date.now()) => {
  const theDay = new Date(value);
  return theDay.getDate();
}

const init = () => {
  stage = document.getElementById('stage');
  writingDate();
  createStart();
}

// writingDate();
const writingDate = () => {
  // todayInnerを作る
  const todayInner = `<div class='today'>${getMonth()}月${getDay()}日</div>`;

  // todayを作る
  const today = document.createElement('div');
  today.innerHTML = todayInner;
  stage.appendChild(today);
}

// STARTボタンを作る
const createStart = () => {
  const start = document.createElement('button');
  start.textContent = 'START';
  start.className = 'start';
  stage.appendChild(start);

  // timerInnerを作る
  // const timerInner = '<div class="sec count">30.00</div>';
  const timerInner = `<div class="sec count">${count}</div>`;
  const timer = document.createElement('div');
  timer.id = 'timer';
  timer.className = 'count';
  timer.innerHTML = timerInner;
  stage.appendChild(timer);
  // diaryBox();

  // クリックしたらcountSecondsが起動する
  start.addEventListener('click', function() {
    diaryBox();
    countdown();
    onkeyup();
    start.style.display = 'none';
  })
}

// countdown()・・STARTボタンをクリックしたら３０秒カウント開始
const countdown = () => {
  document.getElementById('timer').textContent = count.toString();
  count--;
  const id = setTimeout(countdown, 1000);
  if (count < 0) {
    clearTimeout(id);
    diary.value = '';
    diary.style.backgroundColor = 'red';
    diary.placeholder = '時間切れです';
    diary.disabled = true;
  }
}

// diaryBoxを作る
const diaryBox = () => {
  diary = document.createElement('textarea');
  diary.placeholder = '今日の出来事';
  diary.className = 'diary';
  diary.id = 'diaryId';
  stage.appendChild(diary);

  // lettersInnerを作る
  letters = document.createElement('span');
  letters.className = 'count';
  stage.appendChild(letters);
  onkeyup();
  diary.addEventListener('keyup', onkeyup);
}

// テキストエリア→ diaryに入力したら、
// 入力中の文字数→ lettersの数が増える
const onkeyup = () => {
  const inputText = diary.value;
  letters.innerHTML = '<p>'+ inputText.length + ' '+'characters</p>';
}

save.addEventListener('click', () => {
  if (diary.value.length === 0) {
    return;
  }
  writeCount++;
  // key
  // honjitu = `${getMonth()}月${getDay()}日<br>(${getSecond()}秒)`;
  // value
  const diaryValue = document.getElementById('diaryId').value;
  localStorage.setItem(new Date(), diaryValue);

  // 表示用の日時を整形する
  const shortedHonjitu = `${getMonth()}月${getDay()}日`;
  // table 用のテキストにする
  const article = document.createElement('tr');
  const articleInner = '<th>'+shortedHonjitu+'</th><td>'+diaryValue+'</td></tr>';
  article.innerHTML = articleInner;
  articleContainer.prepend(article);
  diary.value = '';
  // 3回入力し保存したら次回入力不可にする
  if (writeCount > 3){
    diary.value = '';
    diary.style.backgroundColor = '#ff6347';
    diary.placeholder = '上限オーバーです';
    diary.disabled = true;
  }
})

// localStorage の中身を全部 配列diaryList に入れる
const diaryList = [];
for (let i = 0; i < localStorage.length; i++) {
  // 取得する key は日付情報 (Date 型の値)
  const key = localStorage.key(i);
  diaryList.push(key);
}

// 配列diaryList の中身を、日付順に並び替える
diaryList.sort(function(a, b) {
  return (a > b ? 1 : -1);
});

// 整形する
for (let i = 0; i < diaryList.length; i++) {
  // key を元に value を取得する
  const value = localStorage.getItem(diaryList[i]);
  // 表示用の日時を整形する
  const shortedHonjitu = `${getMonth(diaryList[i])}月${getDay(diaryList[i])}日`;
  // table 用のテキストにする
  const article = document.createElement('tr');
  const articleInner = '<th>'+shortedHonjitu+'</th><td>'+value+'</td></tr>';
  article.innerHTML = articleInner;
  articleContainer.prepend(article);
}

// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   const shortedHonjitu = `${getMonth()}月${getDay()}日`;
//   const value = localStorage.getItem(key);
//   const article = document.createElement('tr');
//   const articleInner = '<th>'+shortedHonjitu+'</th><td>'+value+'</td></tr>';
//   article.innerHTML = articleInner;
//   articleContainer.prepend(article);
//   // articleContainer.appendChild(article);
// }

clear.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
})

see.addEventListener('click', () => {
  location.reload();
})

