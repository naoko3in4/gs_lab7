// メッセージcollectionをつくる
const collection = db.collection('code-messages');

const message = $id('message');
const formCodeMessage = $id('form_code_message');
const showCode = $id('showCode');
const showMessage = $id('showMessage');
// グローバル変数
let id;

// コードエリアフォーム送信して中身取得
const codeSubmit = async() => {
  const s = editor.getValue();

  // メッセージcollectionに code/ message 追加
  await collection.add({
    code: s,
    message: message.value,
  })
  .then(doc => {
    id = doc.id;
    console.log(`${doc.id} added!`);
    // コード・メッセージ保存成功のアラートを出す
    alert('コード・メッセージ保存しました');
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
// code-messagesコレクションの中身表示→DOM表示
const showList = () => {
  const codeMsgCollectionRef = db.collection('code-messages').doc(id);
  codeMsgCollectionRef.get()
  .then((val) => {
    console.log(val.data());
    const code = val.data().code;
    const message = val.data().message;
    showCode.textContent = code;
    showMessage.textContent = message;
  })
  .catch(e => {
    console.error(e);
  });

}




