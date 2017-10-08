<?php
  require 'connection.php';
  header("content-type: application/json");

  $relation = $_GET['relation'];

  $sql = "SELECT * FROM " . $relation;

  if (isset($_GET['limit']))
    $sql .= " LIMIT " . $_GET['limit'];

  $result = $link->query($sql);

  $response = [];

  if ($result->num_rows <= 0) {
    echo json_encode($response);
    return;
  }

  while ($row = $result->fetch_assoc()) {
    $response[] = $row;
  }

  $link->close();

  echo json_encode($response);
?>
