// メッセージcollectionをつくる
const collection = db.collection('code-messages');

const message = $id('message');
const formCodeMessage = $id('form_code_message');
const showTitle = $id('showTitle');
const showCode = $id('showCode');
const showMessage = $id('showMessage');
const articleTitle = $id('article_title');
const listContainer = $id('list__container');
// post.html用
const detailTitle = $id('detail-title');
const detailVideo = $id('detail-video');
const detailCode = $id('detail-code');
const detailMessage = $id('detail-message');

const buff = [];

// グローバル変数
let id;

// コードエリアフォーム送信して中身取得
const codeSubmit = async() => {
  const s = editor.getValue();

  // メッセージcollectionに code/ message 追加
  await collection.add({
    title: articleTitle.value,
    video: videoUrl,
    code: s,
    message: message.value,
  })
  .then(doc => {
    id = doc.id;
    console.log(`${doc.id} added!`);
    // コード・メッセージ保存成功のアラートを出す
    alert('すべて保存しました（タイトル・動画・コード・メッセージ）');
    // message (input)を空にする
    message.value = '';
    editor.focus();
  })
  .catch(error => {
    console.log(error);
  })
  showList();
}

// code-messagesコレクションへの参照を取得
// code-messagesコレクションの中身表示→new.htmlへ表示
const showList = () => {
  const codeMsgCollectionRef = db.collection('code-messages').doc(id);
  codeMsgCollectionRef.get()
  .then((val) => {
    console.log(val.data());
    const title = val.data().title;
    const code = val.data().code;
    const message = val.data().message;
    // new.htmlへ表示
    showTitle.textContent = title;
    showVideo.src = videoUrl;
    showCode.textContent = code;
    showMessage.textContent = message;
  })
  .catch(e => {
    console.error(e);
  });
}

// code-messagesコレクション一覧
const getCollection = () => {
  collection.get().then((query) => {
    // const buff = [];
    query.forEach((doc) => {
      const data = doc.data();
      buff.push([data.title, data.video, data.code, data.message]);
    })
    console.log(buff);
    // index.htmlへタイトル表示
    makeList();
    // post.htmlへ詳細表示
    // showListDetail();
  })
  .catch((error) => {
    console.log(`データ取得に失敗しました${error}`);
  });
}

//記事タイトルを表示（index.html）
const makeList = () => {
  for (let i=0; i < buff.length; i++) {
    const title = document.createElement('li');
    title.classList.add('list');
    title.textContent = buff[i][0];
    listContainer.appendChild(title);
    title.addEventListener('click', (e) => {
      showListDetail(e);
    })
  }
}

//記事詳細表示（post.html）
const showListDetail = (e) => {
  const title = e.srcElement.innerText;
  // クリックしたタイトルが一致するものをbuffの中から探す
  const found = buff.find((element) => {
    return element[0] === title;
  })

  detailTitle.innerHTML = found[0];
  detailVideo.src = found[1];
  detailCode.textContent = found[2];
  detailMessage.textContent = found[3];
}




