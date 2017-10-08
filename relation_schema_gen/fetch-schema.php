<?php
  require 'connection.php';
  header('content-type: application/json');

  $sql = "SHOW TABLES FROM aa2000";

  $result = $link->query($sql);

  while ($row = $result->fetch_assoc()) {
    $response[] = $row;
  }

  $link->close();

  echo json_encode($response);
?>
