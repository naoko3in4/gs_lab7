<?php
session_start();

// DB検索
include "../func_common_c.php";

chkSsid();
$pdo = db_con();

// データ抽出SQL作成
$stmt = $pdo->prepare("SELECT * FROM team_c_table");
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
    $autoTeamId = $result["id"];
    $teamName = $result["name"];
    $teamLpw = $result["lpw"];

    $view .= "<p>";
    // 編集リンク
    // 表示のid が session id と同じ時に編集できるように（マイチームのみ編集可能）
    if($autoTeamId == $_SESSION["id"]) {
      $view .= "<p>";
      $view .= '<a href="t_detail_c.php?id=' . $autoTeamId .'">';
      $view .= "[マイチーム編集]";
      $view .= "</a>";
      $view .= " ";
    }

    // ユーザー情報 id, 名前, フラグ
    $view .= "<span>${autoTeamId}</span><span>チーム名: ${teamName}</span></p>";
    // $view .= " ";
  }
}

// 共有スケジュールへのリンクで👇使用
$team_id = $_SESSION["id"];

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
  <title>マイチーム</title>
</head>
<body>
  <nav>
    <ul>
      <a href="../schedule_c/event.php?id=<?=$team_id?>" class="nav_title"><li>スケジュール作成</li></a>
      <a href="../user_c/logout_c.php" class="nav_title"><li>ログアウト</li></a>
    </ul>
  </nav>

  <div class="select_container">
    <h2>チームリスト・マイチーム情報</h2>
    <div class="select_lists">
      <div class="spot"><?=$view?></div>
    </div>
  </div>
</body>
</html>