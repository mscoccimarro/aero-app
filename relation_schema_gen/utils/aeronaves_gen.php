<?php
  require '../connection.php';

  // insert layouts
  $layout_count = 3;
  $sql = "INSERT INTO layout VALUES";
  for ($i = 0; $i < $layout_count; $i++) {
    $sql .= "({$i}),";
  }

  $sql = substr($sql, 0, strlen($sql)-1);
  $sql .= ";";
  echo $sql;
  // $link->query($sql);

  // insert asientos
  $asiento_count = 50;
  $sql = "INSERT INTO asiento(columna, fila, clase, seccion, esSalidaEmergencia, codigoLayout) VALUES";
  for ($i = 0; $i < $layout_count; $i++) {
    $col = 1;
    $fil = 1;
    $clase = "Primera Clase";
    $seccion = "PC";
    $salidaEm = 0;
    for ($j = 0; $j < $asiento_count; $j++) {
      if ($j === 10 || $j === 20 || $j === 35) {
        $col++;
        $fil = 1;
      }

      if ($j === 10) {
        $clase = "Business";
        $seccion = "BS";
      }

      if ($j === 25) {
        $clase = "Turista";
        $seccion = "TA";
      }

      if ($j === 25 && $i === 0) {
        $salidaEm = 1;
      }

      if ($j === 32 && $i === 1) {
        $salidaEm = 1;
      }

      if ($j === 5 && $i === 2) {
        $salidaEm = 1;
      }

      $sql .= "('{$col}', '{$fil}', '{$clase}', '{$seccion}', {$salidaEm}, {$i}),";
      $fil++;
      $salidaEm = 0;
    }
  }

  $sql = substr($sql, 0, strlen($sql)-1);
  $sql .= ";";
  echo $sql;
  // $link->query($sql);

  // insert aeronaves
  $sql = "SELECT idAerolinea FROM aerolinea";
  $result = $link->query($sql);
  while ($row = $result->fetch_assoc()) {
    $aerolineas[] = $row['idAerolinea'];
  }

  // var_dump($aerolineas);

  $sql = "INSERT INTO aeronave(matricula, modeloAeronave, cantidadDePasajeros, autonomiaDeVuelo, autonomiaDeCombustible, codigoLayout, idAerolinea) VALUES";

  $mat = 0;

  for ($i = 0; $i < count($aerolineas); $i++) {
    for ($j = 0; $j < 10; $j++) {
      $mat++;
      $mod = rand(13, 130);
      $cant = rand(0, 2);
      $pas = [60, 80, 100];
      $aut = [120, 160, 150];
      $sql .= "('{$mat}', {$mod}, {$pas[$cant]}, {$aut[$cant]}, {$aut[$cant]}, {$cant}, {$aerolineas[$i]}),";
    }
  }

  $sql = substr($sql, 0, strlen($sql)-1);
  $sql .= ";";
  echo $sql;
  // $link->query($sql);

  $link->close();
?>
