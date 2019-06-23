<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>共有スケジュール</title>
  <link rel="stylesheet" href="../common_c.css">
  <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
</head>
<body>
  <nav>
    <ul>
      <a href="../user_c/logout_c.php" class="nav_title"><li>ログアウト</li></a>
    </ul>
  </nav>
  <div id="wrapper">
    <h1><span id="s_log_title">共有スケジュール</span><br>ログイン・新規登録</h1>
    <!-- ログイン -->
    <form method="post" action="t_login_act_c.php">
      <fieldset>
        <legend class="user_log_title">チームログイン</legend>
          <label>チーム名:<br>
            <input type="text" name="name">
          </label>
          <label class="pw">チームPW:<br>
            <input type="text" name="lpw">
          </label>
          <div id="btn-wrapper">
            <input id="submit-btn" type="submit" value="ログイン">
          </div>
      </fieldset>
    </form>

    <form method="post" action="t_insert_c.php">
      <!-- チーム登録 -->
      <fieldset>
        <legend class="user_log_title">チーム登録</legend>
          <label>チーム名:<br>
            <input type="text" name="name">
          </label>
          <label class="pw">チームPW:<br>
            <input type="text" name="lpw">
          </label>
          <div id="btn-wrapper">
            <input id="submit-btn" type="submit" value="登録する">
          </div>
      </fieldset>
    </form>
  </div>
</body>
</html>