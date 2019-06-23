<?php
session_start();

// DB検索
include "../func_common_c.php";

chkSsid();
$pdo = db_con();

// データ抽出SQL作成
$stmt = $pdo->prepare("SELECT * FROM user_c_table");
$status = $stmt->execute();

// データ表示
$view="";

if($status == false) {
  //execute (SQL実行時にエラーがある場合)
  $error = $stmt->errorInfo();
  exit("SQLError:".$error[2]);
} else {
  //Selectデータの数だけループしてくれる
  while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
    //変数に入れる
    $autoId = $result["id"];
    $userName = $result["name"];
    $lid = $result["lid"];
    $lpw = $result["lpw"];
    $kanri_flg = $result["kanri_flg"];
    $life_flg = $result["life_flg"];

    // 管理者フラグが1(管理者)もしくは2(オーナー)だったら編集できる
    // if($_SESSION["kanri_flg"]=="1" or $_SESSION["kanri_flg"]=="2") {
    if($autoId == $_SESSION["id"]) {
      $view .= "<p>";
      // 編集リンク
      $view .= '<a href="detail_user_c.php?id=' . $autoId .'">';
      $view .= "[マイ情報編集]";
      $view .= "</a>";
      $view .= " ";
    }
    // ユーザー情報 id, 名前, フラグ
    $view .= "<span>${autoId}</span> 名前: ${userName}さん </span>";
    $view .= " ";
    // $view .= "<span>管理フラグ： ${kanri_flg}</span>";
    // $view .= " ";
    // $view .= "<span>ライフフラグ： ${life_flg}</span>";
    $view .= "<p>";
  }
}
?>

<!-- HTML -->
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../common_c.css">
  <title>ユーザー一覧</title>
</head>
<body>
  <nav>
    <ul>
      <a href="../team_c/team_index_c.php" class="nav_title"><li>スケジュール</li></a>
      <a href="resign_c.php" class="nav_title"><li class="resign">退会する</li></a>
      <a href="logout_c.php" class="nav_title"><li>ログアウト</li></a>
    </ul>
  </nav>

  <div class="select_container">
    <h2>ユーザーリスト & マイ情報</h2>
    <div class="select_lists">
      <!-- <p class="flags">管理者フラグ→ 0:一般ユーザー, 1:管理者  2:オーナー </p>
      <p class="flags">ライフフラグ→ 0:利用中, 1:退会済</p> -->
      <div class="spot"><?=$view?></div>
    </div>
  </div>
</body>
</html>