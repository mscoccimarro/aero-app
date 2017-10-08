<?php
  $server = "127.0.0.1";
  $user = "root";
  $pwd = "";
  $db = "aa2000";

  $link = new mysqli($server, $user, $pwd, $db);
  if ($link->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    return;
  }
?>
