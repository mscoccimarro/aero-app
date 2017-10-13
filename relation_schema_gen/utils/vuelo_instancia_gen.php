<?php
  require '../connection.php';

  $sql = "SELECT codigoUnicoVuelo FROM vuelo_generico";
  $result = $link->query($sql);
  while ($row = $result->fetch_assoc()) {
    $vuelosGenericos[] = $row['codigoUnicoVuelo'];
  }
  // var_dump($vuelosGenericos);

  $sql = "SELECT matricula FROM aeronave";
  $result = $link->query($sql);
  while ($row = $result->fetch_assoc()) {
    $aeronaves[] = $row['matricula'];
  }
  // var_dump($aeronaves);

  $servicios = [
    'servicioMangaLlegada',
    'servicioMangaSalida',
  ];

  $estados = [
    'inicioVentaPasajes',
    'habilitadoPorTecnico',
    'reservaPuertaSalida',
    'cargaDeCombustible',
    'cargaDePasajeros',
    'despachado',
    'autorizadoDespegue',
    'enDespegue',
    'despegado',
    'abordajeCerrado'
  ];

  $cantVuelos = 1000;
  $startDate = "07/01/2017";
  $endDate = "12/31/2017";
  $sql = "INSERT INTO vuelo_instancia(fechaDespegue, cantidadMinimaAsientos, fechaInstanciaVuelo, fechaInicioVentaPasajes
  servicioMangaLlegada, servicioMangaSalida, inicioVentaPasajes, habilitadoPorTecnico, reservaPuertaSalida, cargaDeCombustible, cargaDePasajeros, despachado, autorizadoDespegue, enDespegue, despegado, abordajeCerrado, matricula, codigoUnicoVuelo) VALUES";

  for ($i = 0; $i < $cantVuelos; $i++) {
    $cantDePasajeros = [];
    $matIndex = rand(0, count($aeronaves)-1);
    $matricula = $aeronaves[$matIndex];
    $sql2 = "SELECT cantidadDePasajeros FROM aeronave WHERE matricula=". $matricula;
    $result = $link->query($sql2);
    while($row = $result->fetch_assoc()) {
      $cantDePasajeros[] = $row['cantidadDePasajeros'];
    }
    echo $cantDePasajeros[0]."\n";

    $vueloGenIndex = rand(0, count($vuelosGenericos)-1);
    $codUnicoVuelo = $vuelosGenericos[$vueloGenIndex];

    $min = strtotime($startDate);
    $max = strtotime($endDate);
    $time = rand($min, $max);
    $fechaDespegue = date('Y-m-d H:i:s', $time);
    $fechaInstanciaVuelo = date('Y-m-d H:i:s', $time - (30 * 24 * 60 * 60));
    $sql .= "('{$fechaDespegue}', ,'{$fechaInstanciaVuelo}', {$codUnicoVuelo}),";
  }

  $sql = substr($sql, 0, strlen($sql)-1);
  $sql .= ";";
  echo $sql;
  // $link->query($sql);

  $link->close();
?>
