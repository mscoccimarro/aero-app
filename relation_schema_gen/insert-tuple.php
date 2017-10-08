<?php
  require 'connection.php';

  $data = json_decode($_GET['data'], true);
  $relation = $_GET['relation'];

  $sql = "INSERT INTO " . $relation . " VALUES(";

  // use data type for query
  foreach ($data as $item) {
    $type = $item['type'];
    if (!preg_match('/int/i', $type)) {
      $sql .= "'" . $item["value"] . "'";
    } else {
      $sql .= $item["value"];
    }
    $sql .= ', ';
  }


  $sql = substr($sql, 0, strlen($sql)-2);
  $sql .= ");";

  echo $sql;

  $result = $link->query($sql);

  $link->close();
?>
