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
  $sql = "INSERT INTO vuelo_instancia(fechaDespegue, cantidadMinimaAsientos, cantidadTotalPasajeros, fechaInstanciaVuelo, fechaInicioVentaPasajes, servicioMangaLlegada, servicioMangaSalida, inicioVentaPasajes, habilitadoPorTecnico, reservaPuertaSalida, cargaDeCombustible, cargaDePasajeros, despachado, autorizadoDespegue, enDespegue, despegado, abordajeCerrado, cancelado, matricula, codigoUnicoVuelo) VALUES";

  for ($i = 0; $i < $cantVuelos; $i++) {
    // matricula de la aeronave aleatoria y cantidad minima de asientos
    // como el 90% de la cantidad de pasajeros de la aeronave
    $cantDePasajeros = [];
    $matIndex = rand(0, count($aeronaves)-1);
    $matricula = $aeronaves[$matIndex];
    $sql2 = "SELECT cantidadDePasajeros FROM aeronave WHERE matricula=". $matricula;
    $result = $link->query($sql2);
    while($row = $result->fetch_assoc()) {
      $cantDePasajeros[] = $row['cantidadDePasajeros'];
    }
    $cantMinAsientos = $cantDePasajeros[0] * 0.9;
    $cantTotalPasajeros = rand($cantMinAsientos, $cantDePasajeros[0]);
    //

    $vueloGenIndex = rand(0, count($vuelosGenericos)-1);
    $codUnicoVuelo = $vuelosGenericos[$vueloGenIndex];

    $servicioMangaLlegada = rand(0, 1);
    $servicioMangaSalida = rand(0, 1);

    // fecha de despegue aleatoria en intervalo
    // fecha de instancia de vuelo 30 dias antes
    // fecha de venta de pasajes 5 dias despues de fecha de instancia de vuelo
    $min = strtotime($startDate);
    $max = strtotime($endDate);
    $time = rand($min, $max);
    $fechaDespegue = date('Y-m-d H:i:s', $time);
    $fechaInstanciaVuelo = date('Y-m-d H:i:s', $time - (30 * 24 * 60 * 60));
    $fechaVentaPasajes = date('Y-m-d H:i:s', $time - (25 * 24 * 60 * 60));
    //

    // estados aleatorios de instancia de vuelo
    $cancelado = rand(0, 1);
    $estadoActual = rand(0, count($estados)-1);
    if ($estadoActual >= 8) {
      $cancelado = 0;
    }

    $sql .= "('{$fechaDespegue}', {$cantMinAsientos}, {$cantTotalPasajeros}, '{$fechaInstanciaVuelo}', '{$fechaVentaPasajes}',
    {$servicioMangaLlegada}, {$servicioMangaSalida},";

    for ($j = 0; $j < count($estados); $j++) {
      if ($j <= $estadoActual) {
        $sql .= " 1,";
      } else {
        $sql .= " 0,";
      }
    }
    //

    $sql .= " {$cancelado}, '{$matricula}', {$codUnicoVuelo}),";
  }

  $sql = substr($sql, 0, strlen($sql)-1);
  $sql .= ";";
  echo $sql;
  // $link->query($sql);

  $link->close();
?>
