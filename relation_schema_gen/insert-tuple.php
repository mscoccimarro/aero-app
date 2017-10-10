<?php
  require 'connection.php';

  $data = json_decode($_GET['data'], true);
  $relation = $_GET['relation'];
  $cantidadTuplas = $_GET['cantidadTuplas'];

  for($i = 0; $i < $cantidadTuplas; $i++) {
    $sql = "INSERT INTO " . $relation . " VALUES(";

    // use data type for query
    foreach ($data as $item) {
      $type = $item['type'];
      $isAutoIncremento = $item['autoIncremento'];

      if (!preg_match('/int/i', $type)) {
          $sql .= "'" . $item["value"];
          if($isAutoIncremento){
               $sql .= "_" . $i . "'";
          } else {
              $sql .= "'";
          }
      } else {
          if($isAutoIncremento){
              $sql .= $item["value"] + $i;
          }else {
              $sql .= $item["value"];
          }

      }

      $sql .= ', ';
    }

    $sql = substr($sql, 0, strlen($sql)-2);
    $sql .= ");";

    echo $sql;
    $result = $link->query($sql);
  }

  $link->close();
?>
