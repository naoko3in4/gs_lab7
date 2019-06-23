<?php
session_start();

// DB検索
include "../func_common_c.php";

chkSsid();
// 共有スケジュールへのリンクで👇使用
$team_id = $_SESSION["id"];

$pdo = db_con();

// データ抽出SQL作成
// teamのidが同じもので昇降順に抽出
$stmt = $pdo->prepare("SELECT * FROM schedule_table WHERE team_id = $team_id ORDER BY start_at ASC");
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
    $participant = $result["participant"];
    $start_at = $result["start_at"];
    $title = $result["title"];
    $url = $result["url"];
    $memo = $result["memo"];

    // 開催日時 start_atの表示用
    $show_start_at = date('Y年m月d日 H:i 時台', strtotime($start_at));

    $view .= "<div class='event_list'>";
    // 編集リンク
    $view .= '<a href="s_detail.php?id=' . $autoId .'">';
    $view .= "[編集]";
    $view .= "</a>";
    $view .= " ";
    // 削除リンク
    $view .= '<a style="text-decoration:none; color:white; background-color: gray; border-radius: 3px; padding:0.2rem; font-size:0.8rem;" href="s_delete.php?id=' . $result["id"] .'">';
    $view .= "☓";
    $view .= "</a>";
    $view .= " ";

    // 参加者名, 開催日時, タイトル, URL, メモ
    $view .= "<p>参加者名: <span class='event_participant'>  ${participant}</span></p>";
    $view .= "<p>開催日： ${show_start_at}</p>";
    $view .= "<p>タイトル： ${title}</p>";
    $view .= "<p>URL： <a href='${url}' target='_blank'>${url}</a></p>";
    $view .= "<p>メモ： ${memo}</p>";
    $view .= "</div>";
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
  <title>スケジュール一覧</title>
</head>
<body>
  <nav>
    <ul>
      <a href="../schedule_c/event.php?id=<?=$team_id?>" class="nav_title"><li>予定を立てる</li></a>
      <a href="../team_c/t_dissolve.php" class="nav_title"><li class="resign">チーム解散</li></a>
      <a href="../user_c/logout_c.php" class="nav_title"><li>ログアウト</li></a>
    </ul>
  </nav>

  <div class="select_container">
    <h2 id="s_lists_heading">スケジュール 一覧</h2>
      <div class="select_lists"><?=$view?></div>
  </div>
</body>
</html>