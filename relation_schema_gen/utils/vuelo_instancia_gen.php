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

  $cant_vuelos = 1000;
  $sql = "INSERT INTO vuelo_instancia(fechaDespegue, cantidadMinimaAsientos, fechaInstanciaVuelo, fechaInicioVentaPasajes
  servicioMangaLlegada, servicioMangaSalida, inicioVentaPasajes, habilitadoPorTecnico, reservaPuertaSalida, cargaDeCombustible, cargaDePasajeros, despachado, autorizadoDespegue, enDespegue, despegado, abordajeCerrado, matricula, codigoUnicoVuelo) VALUES";

  echo $sql;

  $link->close();
?>
