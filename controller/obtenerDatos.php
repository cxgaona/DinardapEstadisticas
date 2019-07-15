<?php
require_once '../model/Connection.php';
require_once '../model/Variables.php';

if (isset($_POST['oper'])) {
	switch ($_POST['oper']) {
		case "consultaConsumoInteroperabilidad":
			$sql = "SELECT mes,sum(consultas) as cantidad FROM consumo_interoperabilidad where anio=" . date("Y") . " group by mes";
			$connection = Connection::getInstance("10.0.0.164", "christian", "dINAR.2019", "consumos_plataformas");
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "consultaConsumoFichaSimplicada":
			$sql = "";
			// $connection = Connection::getInstance("10.0.0.164", "christian", "dINAR.2019", "consumos_plataformas");
			// $result = $connection->getQuery($sql);
			// $i = 0;
			// while ($row = mysqli_fetch_array($result)) {	
			// 	$rawdata[$i] = $row;
			// 	$i++;
			// }
			$rawdata = array();
			array_push(
				$rawdata,
				array("cantidad" => "163393", "mes" => "1"),
				array("cantidad" => "159063", "mes" => "2"),
				array("cantidad" => "137184", "mes" => "3"),
				array("cantidad" => "103915", "mes" => "4"),
				array("cantidad" => "135926", "mes" => "5"),
				array("cantidad" => "79195", "mes" => "6")
			);
			echo json_encode($rawdata);
			break;
		case "consultaConsumoInfoDigital":
			$sql = "";
			// $connection = Connection::getInstance("10.0.0.164", "christian", "dINAR.2019", "consumos_plataformas");
			// $result = $connection->getQuery($sql);
			// $i = 0;
			// while ($row = mysqli_fetch_array($result)) {
			// 	$rawdata[$i] = $row;
			// 	$i++;
			// }
			$rawdata = array();
			array_push(
				$rawdata,
				array("cantidad" => "225000", "mes" => "1"),
				array("cantidad" => "105000", "mes" => "2"),
				array("cantidad" => "310000", "mes" => "3"),
				array("cantidad" => "264000", "mes" => "4"),
				array("cantidad" => "481000", "mes" => "5"),
				array("cantidad" => "236000", "mes" => "6")
			);
			echo json_encode($rawdata);
			break;
		case "fuentes":
			$sql = "SELECT nombre, fecha_registra FROM institucion_fuente ORDER BY 2 ASC";
			$connection = Connection::getInstance(ServerInteroperabilidad, UserInteroperabilidad, PasswordInteroperabilidad, DatabaseInteroperabilidad);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$row["nombre"] = utf8_encode($row["nombre"]);
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "consumidores":
			$sql = "SELECT nombre, fecha_registra FROM institucion ORDER BY 2 ASC";
			$connection = Connection::getInstance(ServerInteroperabilidad, UserInteroperabilidad, PasswordInteroperabilidad, DatabaseInteroperabilidad);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$row["nombre"] = utf8_encode($row["nombre"]);
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "fuentesAño":
			$sql = "SELECT EXTRACT(YEAR FROM fecha_registra) AS anio, COUNT(EXTRACT(YEAR FROM fecha_registra)) AS contFuente FROM institucion_fuente  GROUP BY EXTRACT(YEAR FROM fecha_registra) ORDER BY 1 ASC";
			$connection = Connection::getInstance(ServerInteroperabilidad, UserInteroperabilidad, PasswordInteroperabilidad, DatabaseInteroperabilidad);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "consumidoresAño":
			$sql = "SELECT EXTRACT(YEAR FROM fecha_registra) AS anio, COUNT(EXTRACT(YEAR FROM fecha_registra)) AS contConsumidor FROM institucion  GROUP BY EXTRACT(YEAR FROM fecha_registra) ORDER BY 1 ASC";
			$connection = Connection::getInstance(ServerInteroperabilidad, UserInteroperabilidad, PasswordInteroperabilidad, DatabaseInteroperabilidad);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "camposIntegradosAño":
			$sql = "SELECT EXTRACT(YEAR FROM fecha_registra) AS anio, COUNT(id_campo) AS cantidad FROM campo_dato GROUP BY EXTRACT(YEAR FROM fecha_registra)";
			$connection = Connection::getInstance(ServerInteroperabilidad, UserInteroperabilidad, PasswordInteroperabilidad, DatabaseInteroperabilidad);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "accesoInteroperabilidad":
			$sql = "SELECT '2015' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
			FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2015 UNION
			SELECT '2016' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
			FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2016 UNION
			SELECT '2017' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
			FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2017 UNION
			SELECT '2018' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
			FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2018 UNION
			SELECT '2019' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
			FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2019";
			$connection = Connection::getInstance(ServerInteroperabilidad, UserInteroperabilidad, PasswordInteroperabilidad, DatabaseInteroperabilidad);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "accesoFichaSimplificada":
			$sql = "";
			// $connection = Connection::getInstance("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador");
			// $result = $connection->getQuery($sql);
			// $i = 0;
			// while ($row = mysqli_fetch_array($result)) {
			// 	$rawdata[$i] = $row;
			// 	$i++;
			// }
			//~2017||1700000~2018||1500000~2019||700000
			$rawdata = array();
			array_push(
				$rawdata,
				array("cantidadAccesos" => "1700000", "año" => "2017"),
				array("cantidadAccesos" => "1500000", "año" => "2018"),
				array("cantidadAccesos" => "700000", "año" => "2019")
			);
			echo json_encode($rawdata);
			break;
		case "accesoInfoDigital":
			$sql = "SELECT '2013' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
			FROM informacion WHERE EXTRACT(YEAR FROM fecha_creacion_informacionpriv)<=2013 UNION
			SELECT '2014' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
			FROM informacion WHERE EXTRACT(YEAR FROM fecha_creacion_informacionpriv)<=2014 UNION
			SELECT '2015' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
			FROM informacion WHERE EXTRACT(YEAR FROM fecha_creacion_informacionpriv)<=2015 UNION
			SELECT '2016' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
			FROM informacion WHERE EXTRACT(YEAR FROM fecha_creacion_informacionpriv)<=2016 UNION
			SELECT '2017' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
			FROM informacion WHERE EXTRACT(YEAR FROM fecha_creacion_informacionpriv)<=2017 UNION
			SELECT '2018' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
			FROM informacion WHERE EXTRACT(YEAR FROM fecha_creacion_informacionpriv)<=2018 UNION
			SELECT '2019' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
			FROM informacion WHERE EXTRACT(YEAR FROM fecha_creacion_informacionpriv)<=2019";
			$connection = Connection::getInstance(ServerSinardap, UserSinardap, PasswordSinardap, DatabaseSinardap);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "loadFuentes":
			$sql = "SELECT 
			INSF_ID AS 'INSTITUCION FUENTE ID', 
			INSF_NOMBRE AS 'INSTITUCION FUENTE'
			FROM INSTITUCION_FUENTE";			
			$connection = Connection::getInstance(ServerEstadisticas, UserEstadisticas, PasswordEstadisticas, DatabaseEstadisticas);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$row["INSTITUCION FUENTE"] = utf8_encode($row["INSTITUCION FUENTE"]);
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "loadConsumidores":
			$sql = "SELECT 
			INSC_ID AS 'INSTITUCION CONSUMIDORA ID', 
			INSC_RUC AS 'RUC', 
			INSC_NOMBRE AS 'INSTITUCION CONSUMIDORA'
			FROM INSTITUCION_CONSUMIDORA";
			$connection = Connection::getInstance(ServerEstadisticas, UserEstadisticas, PasswordEstadisticas, DatabaseEstadisticas);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$row["INSTITUCION CONSUMIDORA"] = utf8_encode($row["INSTITUCION CONSUMIDORA"]);
				$rawdata[$i] = $row;
				$i++;
			}
			echo json_encode($rawdata);
			break;
		case "cargaInfoFuenteConsumidor":
			$sql = "SELECT 			
			INSC_NOMBRE AS 'INSTITUCION CONSUMIDORA',
			YEAR(CONS_FECHA) AS 'AÑO',    
			sum(CASE WHEN MONTH(CONS_FECHA)=1 THEN CONS_CANTIDAD END) 'ENE',
			sum(CASE WHEN MONTH(CONS_FECHA)=2 THEN CONS_CANTIDAD END) 'FEB',
			sum(CASE WHEN MONTH(CONS_FECHA)=3 THEN CONS_CANTIDAD END) 'MAR',
			sum(CASE WHEN MONTH(CONS_FECHA)=4 THEN CONS_CANTIDAD END) 'ABR',
			sum(CASE WHEN MONTH(CONS_FECHA)=5 THEN CONS_CANTIDAD END) 'MAY',
			sum(CASE WHEN MONTH(CONS_FECHA)=6 THEN CONS_CANTIDAD END) 'JUN',
			sum(CASE WHEN MONTH(CONS_FECHA)=7 THEN CONS_CANTIDAD END) 'JUL',
			sum(CASE WHEN MONTH(CONS_FECHA)=8 THEN CONS_CANTIDAD END) 'AGO',
			sum(CASE WHEN MONTH(CONS_FECHA)=9 THEN CONS_CANTIDAD END) 'SEP',
			sum(CASE WHEN MONTH(CONS_FECHA)=10 THEN CONS_CANTIDAD END) 'OCT',
			sum(CASE WHEN MONTH(CONS_FECHA)=11 THEN CONS_CANTIDAD END) 'NOV',
			sum(CASE WHEN MONTH(CONS_FECHA)=12 THEN CONS_CANTIDAD END) 'DIC'
			FROM consumos CON
			LEFT JOIN institucion_consumidora C ON CON.INSC_ID=C.INSC_ID
			LEFT JOIN institucion_fuente F ON CON.INSF_ID=F.INSF_ID 
			WHERE F.INSF_ID =" . $_POST['fuente'] . "
		  AND CONS_FECHA BETWEEN '" . $_POST['fechaInicio'] . "' AND '" . $_POST['fechaFin'] . "'
			GROUP BY CON.INSC_ID , YEAR(CONS_FECHA);";
			$connection = Connection::getInstance(ServerEstadisticas, UserEstadisticas, PasswordEstadisticas, DatabaseEstadisticas);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$row["INSTITUCION CONSUMIDORA"] = utf8_encode($row["INSTITUCION CONSUMIDORA"]);
				$row["ENE"] = intval($row["ENE"]);
				$row["FEB"] = intval($row["FEB"]);
				$row["MAR"] = intval($row["MAR"]);
				$row["ABR"] = intval($row["ABR"]);
				$row["MAY"] = intval($row["MAY"]);
				$row["JUN"] = intval($row["JUN"]);
				$row["JUL"] = intval($row["JUL"]);
				$row["AGO"] = intval($row["AGO"]);
				$row["SEP"] = intval($row["SEP"]);
				$row["OCT"] = intval($row["OCT"]);
				$row["NOV"] = intval($row["NOV"]);
				$row["DIC"] = intval($row["DIC"]);
				$rawdata[$i] = $row;
				$i++;
			}
			if (!empty($rawdata)) {
				echo json_encode($rawdata);
			} else {
				echo "0";
			}
			break;
		case "cargaInfoFuenteConsumidoresCampos":
			$sql = "SELECT 
			CAM_NOMBRE AS 'CAMPO',
			YEAR(CAMC_FECHA) AS 'AÑO',   
			sum(CASE WHEN MONTH(CAMC_FECHA)=1 THEN CAMC_CANTIDAD END) 'ENE',
			sum(CASE WHEN MONTH(CAMC_FECHA)=2 THEN CAMC_CANTIDAD END) 'FEB',
			sum(CASE WHEN MONTH(CAMC_FECHA)=3 THEN CAMC_CANTIDAD END) 'MAR',
			sum(CASE WHEN MONTH(CAMC_FECHA)=4 THEN CAMC_CANTIDAD END) 'ABR',
			sum(CASE WHEN MONTH(CAMC_FECHA)=5 THEN CAMC_CANTIDAD END) 'MAY',
			sum(CASE WHEN MONTH(CAMC_FECHA)=6 THEN CAMC_CANTIDAD END) 'JUN',
			sum(CASE WHEN MONTH(CAMC_FECHA)=7 THEN CAMC_CANTIDAD END) 'JUL',
			sum(CASE WHEN MONTH(CAMC_FECHA)=8 THEN CAMC_CANTIDAD END) 'AGO',
			sum(CASE WHEN MONTH(CAMC_FECHA)=9 THEN CAMC_CANTIDAD END) 'SEP',
			sum(CASE WHEN MONTH(CAMC_FECHA)=10 THEN CAMC_CANTIDAD END) 'OCT',
			sum(CASE WHEN MONTH(CAMC_FECHA)=11 THEN CAMC_CANTIDAD END) 'NOV',
			sum(CASE WHEN MONTH(CAMC_FECHA)=12 THEN CAMC_CANTIDAD END) 'DIC' 
			FROM CAMPO_CONSUMO CC 
			LEFT JOIN institucion_consumidora C ON C.INSC_ID=CC.INSC_ID
			LEFT JOIN CAMPO K ON K.CAM_ID=CC.CAM_ID
			LEFT JOIN institucion_fuente F ON F.INSF_ID=K.INSF_ID
			WHERE K.INSF_ID = " . $_POST['fuente'] . "
			AND CC.INSC_ID=" . $_POST['consumidor'] . "
			AND CAMC_FECHA BETWEEN '" . $_POST['fechaInicio'] . "' AND '" . $_POST['fechaFin'] . "'
			GROUP BY CC.INSC_ID , YEAR(CAMC_FECHA), CC.CAM_ID
			ORDER BY CC.CAM_ID, YEAR(CAMC_FECHA )";
			$connection = Connection::getInstance(ServerEstadisticas, UserEstadisticas, PasswordEstadisticas, DatabaseEstadisticas);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$row["CAMPO"] = utf8_encode($row["CAMPO"]);
				$row["ENE"] = intval($row["ENE"]);
				$row["FEB"] = intval($row["FEB"]);
				$row["MAR"] = intval($row["MAR"]);
				$row["ABR"] = intval($row["ABR"]);
				$row["MAY"] = intval($row["MAY"]);
				$row["JUN"] = intval($row["JUN"]);
				$row["JUL"] = intval($row["JUL"]);
				$row["AGO"] = intval($row["AGO"]);
				$row["SEP"] = intval($row["SEP"]);
				$row["OCT"] = intval($row["OCT"]);
				$row["NOV"] = intval($row["NOV"]);
				$row["DIC"] = intval($row["DIC"]);
				$rawdata[$i] = $row;
				$i++;
			}
			if (!empty($rawdata)) {
				echo json_encode($rawdata);
			} else {
				echo "0";
			}
			break;
		case "cargaInfoConsumidoFuente":
			$sql = "SELECT 			
			INSF_NOMBRE AS ' INSTITUCION FUENTE',
			YEAR(CONS_FECHA) AS  'AÑ O',    
			sum(CASE WHEN MONTH(CONS_FECHA)=1 THEN CONS_CANTIDAD END)  'ENE',
			sum(CASE WHEN MONTH(CONS_FECHA)=2 THEN CONS_CANTIDAD END)  'FEB',
			sum(CASE WHEN MONTH(CONS_FECHA)=3 THEN CONS_CANTIDAD END)  'MAR',
			sum(CASE WHEN MONTH(CONS_FECHA)=4 THEN CONS_CANTIDAD END)  'ABR',
			sum(CASE WHEN MONTH(CONS_FECHA)=5 THEN CONS_CANTIDAD END)  'MAY',
			sum(CASE WHEN MONTH(CONS_FECHA)=6 THEN CONS_CANTIDAD END)  'JUN',
			sum(CASE WHEN MONTH(CONS_FECHA)=7 THEN CONS_CANTIDAD END)  'JUL',
			sum(CASE WHEN MONTH(CONS_FECHA)=8 THEN CONS_CANTIDAD END)  'AGO',
			sum(CASE WHEN MONTH(CONS_FECHA)=9 THEN CONS_CANTIDAD END)  'SEP',
			sum(CASE WHEN MONTH(CONS_FECHA)=10 THEN CONS_CANTIDAD END)  'OCT',
			sum(CASE WHEN MONTH(CONS_FECHA)=11 THEN CONS_CANTIDAD END)  'NOV',
			sum(CASE WHEN MONTH(CONS_FECHA)=12 THEN CONS_CANTIDAD END)  'DIC'
			FROM consumos CON
			LEFT JOIN institucion_consumidora C ON CON.INSC_ID=C.INSC_ID
			LEFT JOIN institucion_fuente F ON CON.INSF_ID=F.INSF_ID 
			WHERE C.INSC_ID = " . $_POST['consumidor'] . "
			AND CONS_FECHA BETWEEN  '" . $_POST['fechaInicio'] .  "' AND  '" . $_POST['fechaFin'] . "'
			GROUP BY CON.INSF_ID, YEAR(CONS_FECHA)";
			$connection = Connection::getInstance(ServerEstadisticas, UserEstadisticas, PasswordEstadisticas, DatabaseEstadisticas);
			$result = $connection->getQuery($sql);
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$row["INSTITUCION FUENTE"] = utf8_encode($row["INSTITUCION FUENTE"]);
				$row["ENE"] = intval($row["ENE"]);
				$row["FEB"] = intval($row["FEB"]);
				$row["MAR"] = intval($row["MAR"]);
				$row["ABR"] = intval($row["ABR"]);
				$row["MAY"] = intval($row["MAY"]);
				$row["JUN"] = intval($row["JUN"]);
				$row["JUL"] = intval($row["JUL"]);
				$row["AGO"] = intval($row["AGO"]);
				$row["SEP"] = intval($row["SEP"]);
				$row["OCT"] = intval($row["OCT"]);
				$row["NOV"] = intval($row["NOV"]);
				$row["DIC"] = intval($row["DIC"]);
				$rawdata[$i] = $row;
				$i++;
			}
			if (!empty($rawdata)) {
				echo json_encode($rawdata);
			} else {
				echo "0";
			}
			break;
	}
}
