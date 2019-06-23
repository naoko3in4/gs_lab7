<?php
$id = $_GET["id"];

include "../func_common_c.php";
// DB接続 function_common_c.phpで定義
$pdo = db_con();

// データ登録SQL作成
$stmt = $pdo->prepare("SELECT * FROM team_c_table WHERE id=:id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$status = $stmt->execute();
// 一行取り出す
$row = $stmt->fetch();
?>

<!-- team_index_c.php(チーム登録フォームの画面ソースコードを上書きする↓)-->
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>calender/チーム</title>
  <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../common_c.css">
</head>
<body>
  <div id="wrapper">
    <h1>チーム詳細編集</h1>
    <form method="post" action="./t_update.php">
      <!-- チーム登録 -->
      <fieldset>
        <legend class="user_log_title">チーム内容編集</legend>
          <label>チーム名:<br>
            <input type="text" name="name" value="<?=$row["name"]?>">
          </label>
          <label class="pw">チームPW:<br>
            <input type="text" name="lpw" value="<?=$row["lpw"]?>">
          </label>
          <div id="btn-wrapper">
            <input id="submit-btn" type="submit" value="登録する">
          </div>
      </fieldset>
    </form>
  </div>
</body>
</html>