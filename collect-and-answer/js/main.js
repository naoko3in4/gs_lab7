// document.getELemetnByIdを省略化する関数の作成
const $id = id => document.getElementById(id);

const start = $id('start');
const stop = $id('stop');
const stage = $id('stage');
const slotContainer = $id('slot__container');
const table = $id('table');
const quizTxt = $id('quiz__text');
const option1 = $id('option1');
const option2 = $id('option2');
const option3 = $id('option3');
const answer = $id('answer');
const quizContainer = $id('quiz__container');
const score = $id('score');
const completed = $id('completed');
const retry = $id('retry');
const seconds = $id('seconds');
const myAnswerOptions = $id('my-answer-options');

const resultList = [];
const tdLength = document.querySelectorAll('td').length;
const td = document.querySelectorAll('td');
const inputs = document.querySelectorAll('.input');

let selectedQuiz;
let selectedOption;
let cName;
let fruit;
let rand;
let currentFruit = 0;
let playSlideShow;
let canClick = false;
let count = 0;
let secondsCount = 0;
let started;
let stopped;
let sToString;

const fruitsList = {
  orange: 0,
  grape: 1,
  apple: 2,
}

// クイズを定義
const quiz = [
  {
    name: 'みかん',
    contents: [
      {
        questionTitle: '一番多い栄養素は？',
        questionOptions: [
          {title: 'ビタミンC', answer: true },
          {title: 'シネフリン', answer: false},
          {title: 'β−カロテン', answer: false},
        ]
      },
      {
        questionTitle: '一番出荷量が多い都道府県はどこ？',
        questionOptions: [
          {title: '愛媛県', answer: true },
          {title: '宮崎県', answer: false},
          {title: '神奈川県', answer: false},
        ]
      },
      {
        questionTitle: '消費量が多いのは次のうちどこ？',
        questionOptions: [
          {title: '北海道', answer: false },
          {title: '島根県', answer: false},
          {title: '佐賀県', answer: true},
        ]
      }
    ]
  },
  {
    name: 'ぶどう',
    contents: [
      {
        questionTitle: '日本のワインの固有品種は？',
        questionOptions: [
          {title: 'ソーヴィニヨン・ブラン', answer: false },
          {title: '甲州', answer: true},
          {title: 'メルロ', answer: false},
        ]
      },
      {
        questionTitle: 'ワインで有名なフランスの地域といえば？',
        questionOptions: [
          {title: 'ポルト', answer: false },
          {title: 'ブルゴーニュ', answer: true},
          {title: 'ミラノ', answer: false},
        ]
      },
      {
        questionTitle: '種なしぶどうの作り方は？',
        questionOptions: [
          {title: '植物ホルモンによる処理', answer: true },
          {title: '偶然', answer: false},
          {title: '実は種はある', answer: false},
        ]
      }
    ]
  },
  {
    name: 'りんご',
    contents: [
      {
        questionTitle: 'りんごの皮に含まれる栄養素は？',
        questionOptions: [
          {title: '無し', answer: false },
          {title: '炭水化物', answer: false},
          {title: 'β−カロテン', answer: true},
        ]
      },
      {
        questionTitle: 'アップルサイダー（シードル）で使われる種類は？',
        questionOptions: [
          {title: '産地によって異なる', answer: true },
          {title: 'ふじりんごのみ', answer: false},
          {title: '実はりんごは使っていない', answer: false},
        ]
      },
      {
        questionTitle: 'りんご飴を食べるのは？',
        questionOptions: [
          {title: '世界各地', answer: true },
          {title: '日本のみ', answer: false},
          {title: 'どこも食べない', answer: false},
        ]
      }
    ]
  }
]
// 初期化(
init = () => {
  canClick = true;
}

// スタート
// スライド
start.addEventListener('click', (e) => {
  if (!canClick) {
    return;
  }
  started = new Date();
  start.classList.add('hidden');
  answer.classList.add('hidden');
  stop.classList.remove('hidden');
  addCurrentFruit();
  playSlideShow = setInterval(() => {
    removeCurrentFruit();
    currentFruit++;
    if (currentFruit === tdLength) {
      currentFruit = 0;
    }
    addCurrentFruit();
  },100)
  for (let i=0; i < 100000000; i++) {
    // ストップウォッチ機能について
    // ここは何もしない
  }
})

// ストップ
stop.addEventListener('click', () => {
  stop.classList.add('hidden');
  clearInterval(playSlideShow);
  quizContainer.classList.remove('hidden');
  // stopをクリック後、スライドが止まった箇所のidナンバーを取得
  // クラス名をcNameへ入れる
  cName = td[currentFruit].className;
  // クラス名が複数あるためsplitして必要なクラス名を指定
  const split = cName.split(' ');
  const splitCName = split[0];
  fruit = fruitsList[splitCName];
  rand = Math.floor(Math.random() * quiz[fruit].contents.length);
  quizTxt.innerHTML = quiz[fruit].contents[rand].questionTitle;

  option1.innerHTML = quiz[fruit].contents[rand].questionOptions[0].title;
  option2.innerHTML = quiz[fruit].contents[rand].questionOptions[1].title;
  option3.innerHTML = quiz[fruit].contents[rand].questionOptions[2].title;
})

function removeCurrentFruit() {
  document.querySelectorAll('.fruits')[currentFruit].classList.remove('fruit--active');
}

function addCurrentFruit() {
  document.querySelectorAll('.fruits')[currentFruit].classList.add('fruit--active');
}

// 回答選択肢をクリックしたときの処理
myAnswerOptions.addEventListener('click', e => {
  const clickedId = e.srcElement.id;
  const index = (clickedId.slice(-1))-1;
  const selectedOption = quiz[fruit].contents[rand].questionOptions[index].answer;
  answer.classList.remove('hidden');
  if (selectedOption) {
    answer.innerHTML = '正解';
    count += 20;
    score.innerHTML = `Total Score:${count}点`;
    if (count === 100) {
      canClick = false;
      completed.innerHTML = `completed!!`;
      retry.classList.remove('hidden');
      getSeconds();
      showSeconds();
      quizContainer.classList.add('hidden');
      start.classList.add('hidden');
      return;
    }
  } else {
    answer.innerHTML = '間違い';
  }
  quizContainer.classList.add('hidden');
  getSeconds();
  start.classList.remove('hidden');
});

// もう一度する
retry.addEventListener('click', () => {
  location.reload();
})

// かかった時間を計測
function getSeconds() {
  stopped = new Date();
  let ms = stopped.getTime() - started.getTime();
  secondsCount += ms;
}

// かかった時間を表示
function showSeconds() {
  s = (secondsCount / 1000).toFixed(2);
  seconds.innerHTML = `回答時間は${s}秒`;

  // localStorage（HTMLへの描画なし）
  sToString = s + '';
  localStorage.setItem(new Date(), sToString);
  // localStorage の中身を配列 resultList に入れる
  for (let i=0; i < localStorage.length; i++) {
    // 取得するkey 日付情報
    const key = localStorage.key(i);
    resultList.push(key);
  }
}








