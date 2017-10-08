<?php
  require 'connection.php';
  header('content-type: application/json');

  $relation = $_GET['relation'];

  $sql = "DESC " . $relation;

  $result = $link->query($sql);

  while ($row = $result->fetch_assoc()) {
    $response[] = $row;
  }

  $link->close();

  echo json_encode($response);
?>
