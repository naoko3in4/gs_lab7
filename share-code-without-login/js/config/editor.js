// editor(API使用の際の宣言) と editorArea 仕事が別（getElemntById は同じidから取得するが）
const editor = ace.edit("editorArea");

const editorArea = $id('editorArea');
// const codeSubmit = $id('codeSubmit');

//editor(API)詳細設定
editor.$blockScrolling = Infinity;
editor.setOptions({
  enableEmmet: true,// Emmet有効に
  // 基本的な自動補完、スニペット、ライブ補完を有効
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});
editor.setTheme("ace/theme/monokai");// 黒めのテーマ
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setTabSize(2); // タブ幅2

