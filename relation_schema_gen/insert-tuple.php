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

            //Carga random de un valor de las claves primarias de la lista.
            $isRandom = $item['random'];
            if($isRandom) {
                $listaPK = $item["value"];
                $numRandom = rand(0, count($listaPK));    
                $valorRandom = $listaPK[$numRandom];   
                if (!preg_match('/int/i', $type)) {
                    $sql .= "'".$valorRandom."'";
                }else {
                    $sql .= $valorRandom;
                }
            }else {
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
            }
            $sql .= ', ';
        }
         
        $sql = substr($sql, 0, strlen($sql)-2);
        $sql .= ");";
        echo $sql;

        $path = "files/";
        // create log file for inserts
        if (file_put_contents($path . $relation . "_data.sql", $sql . "\n", FILE_APPEND) === false) {
            echo "Error on file write";
        }

        $result = $link->query($sql);
    }

    $link->close();
?>
