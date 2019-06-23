<?php

$id = $_GET["id"];

include "../func_common_c.php";
// DB接続 function_common_c.phpで定義
$pdo = db_con();

// データ登録SQL作成
$stmt = $pdo->prepare("SELECT * FROM schedule_table WHERE id=:id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$status = $stmt->execute();
// 一行取り出す
$row = $stmt->fetch();

$months = array(
  "1"=>"January",
  "2"=>"February",
  "3"=>"March",
  "4"=>"April",
  "5"=>"May",
  "6"=>"June",
  "7"=>"July",
  "8"=>"August",
  "9"=>"September",
  "10"=>"October",
  "11"=>"November",
  "12"=>"December",
);
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
  <title>Calender/編集</title>
</head>
<body>
  <nav>
    <ul>
      <!-- <a href="./s_select.php?id=<?=$team_id?>" class="nav_title"><li>スケジュール一覧</li></a> -->
      <a href="../user_c/logout_c.php" class="nav_title"><li>ログアウト</li></a>
    </ul>
  </nav>

  <div class="page_container">
    <form action="./s_update.php?id=<?=$id?>" method="post" id="month_wrapper">
      <h2 class="event_heading">年を再選択する</h2>
      <div class="select_wrapper select-mark">
        <select name="chosen_year" id="">
          <?php
            for($i = 2019; $i <= 2020; $i++) {
              echo "<option class='year' type='submit' value={$i}>$i 年";
            }
          ?>
        </select>
      </div>

      <h2 class="event_heading">月を再選択する</h2>
      <div class="select_wrapper select-mark">
        <select name="chosen_month" id="" class='month-box'>
          <?php
            foreach($months as $key => $value) {
              echo "<option class='month' type='submit' value={$key}>$key 月";
            }
          ?>
        </select>
      </div>

      <h2 class="event_heading">日を再選択する</h2>
      <div class="select_wrapper select-mark">
        <select name="chosen_date" id="" class='date-box'>
          <?php
            for($i = 1; $i <= 31; $i++) {
              echo "<option class='date' type='submit' value={$i}>$i 日";
            }
        ?>
        </select>
      </div>

      <h2 class="event_heading">スタート時間(24h表記)再選択</h2>
      <div class="select_wrapper select-mark">
        <select name="start_hour" id="" >
          <?php
            for($j = 0; $j <= 23; $j++) {
              echo "<option class='start_time' type='submit' value={$j}>$j 時台";
            }
        ?>
        </select>
      </div>

      <label>タイトル:<br>
        <input class="event_ipt" type="text" name="title" value="<?=$row["title"]?>">
      </label>
      <label>URL:<br>
        <input class="event_ipt" type="text" name="url" value="<?=$row["url"]?>">
      </label>
      <label>メモ:<br>
        <input class="event_ipt" type="text" name="memo" value="<?=$row["memo"]?>">
      </label>
      <label class="event_int_last">参加者名:<br>
        <input class="event_ipt" type="text" name="participant" value="<?=$row["participant"]?>">
      </label>

      <div id="btn-wrapper">
        <input id="submit-btn" type="submit" value="登録する">
      </div>

    </form>
  </div>
</body>
</html>