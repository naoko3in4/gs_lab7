<?php
session_start();

// 現在のsession id を取得
$old_sessionid = session_id();

// 新しいsession id を発行 (前のsession id を無効にする)
// true にして現在のファイルのIDを変える
session_regenerate_id (true);

// 新しいsession id を取得
$new_sessionid = session_id();

?>