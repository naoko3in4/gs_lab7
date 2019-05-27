// fb storageを使えるよう宣言する
const storage = firebase.storage();

const setVideo = $id('setVideo');
const formFiles = $id('form-files');
const showVideo = $id('showVideo');

// グローバル変数
let file_name;
let blob;

let v_file_name;
let vBlob;

let videoPath;
let videoUrl;

// ビデオイベント
// setVideo の変更で処理開始（変更があった要素がeで返される）
setVideo.addEventListener('change', e => {
  console.log(e);
  const file = e.target.files;
  // file名を取得
  v_file_name = file[0].name;
  // blob形式に変換
  Bblob = new Blob(file, {
    type: 'video/quicktime'
  });
  console.warn(Bblob);
});

// ビデオアップロードsubmit で処理開始
formFiles.addEventListener('submit', async(e) => {
  e.preventDefault();
  console.log(setVideo);
  console.log(v_file_name);
  // storage の area_images への参照を定義
  let uploadRef = storage.ref('videos/').child(v_file_name);
  // アップロードしたファイルのurlを取得
  await uploadRef.put(Bblob).then(snapshot => {
    console.log(snapshot.state);
    // アップロードしたファイルのurlを取得
    uploadRef.getDownloadURL().then(url => {
      console.log(url);
      videoUrl = url;
      // html に表示する
      // videoSample.style.backgroundImage = "url("+url+")";
      showVideo.src = url;
      // アラート出す
      alert('アップロードで保存しました')
      // console.log(videoSample.style.backgroundImage = "url("+url+")");
    }).catch(error => {
      console.log(error);
    });
  });
  // makeVideoList();
});

//*****************************************************
//  ダウンロード
//*****************************************************
// ビデオダウンロード
// const makeVideoList = () => {
//   videoPath = storage.ref('videos/');
//   console.log(videoPath);
//   videoPath.getDownloadURL().then((videoUrl) => {
//     showVideo.src = videoUrl;
//   })
// }


