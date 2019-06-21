<?php
$tipoConsulta = $_GET['tipo'];
$valorConsulta = $_GET['valor'];
require 'conexion.php';
switch ($tipoConsulta) {
	case "consumoActualPlataformas":
		$sql="SELECT mes,sum(consultas) as cantidad FROM consumo_interoperabilidad where anio=".date("Y")." group by mes";  
		$datosBDD=obtenerConsulta("10.0.0.164", "christian", "dINAR.2019", "consumos_plataformas",$sql);			
		if (count($datosBDD)>0){
			$instituciones="¬~ENE||163393~FEB||159063~MAR||137184~ABR||103915~MAY||135926~JUN||79195¬";
			$mes="";
			foreach($datosBDD as $datosConsumidor){
				switch($datosConsumidor["mes"]){
					case "1":
						$mes="ENE";
						break;
					case "2":
						$mes="FEB";
						break;
					case "3":
						$mes="MAR";
						break;
					case "4":
						$mes="ABR";
						break;
					case "5":
						$mes="MAY";
						break;
					case "6":
						$mes="JUN";
						break;
					case "7":
						$mes="JUL";
						break;
					case "8":
						$mes="AGO";
						break;
					case "9":
						$mes="SEP";
						break;
					case "10":
						$mes="OCT";
						break;
					case "11":
						$mes="NOV";
						break;
					case "12":
						$mes="DIC";
						break;
				}
				$instituciones.="~".$mes."||".$datosConsumidor["cantidad"];
			}
		
		}else{
			$instituciones="";
		}
		$instituciones.="¬~ENE||225000~FEB||105000~MAR||310000~ABR||264000~MAY||481000~JUN||236000";
		print	$instituciones;
		break;
    case "consumidores":
		$sql="SELECT nombre, fecha_registra FROM institucion ORDER BY 2 ASC";  
		$datosBDD=obtenerConsulta("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador",$sql);		
		if (count($datosBDD)>0){
			$instituciones="";
			foreach($datosBDD as $datosConsumidor){
				$instituciones.="~".utf8_encode($datosConsumidor["nombre"])."||".$datosConsumidor["fecha_registra"];
			}
		
		}else{
			$instituciones="";
		}
		print	$instituciones;
		break;
	case "fuentes":
		$sql="SELECT nombre, fecha_registra FROM institucion_fuente ORDER BY 2 ASC";  
		$datosBDD=obtenerConsulta("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador",$sql);		
		if (count($datosBDD)>0){
			$instituciones="";
			foreach($datosBDD as $datosFuente){
				$instituciones.="~".utf8_encode($datosFuente["nombre"])."||".$datosFuente["fecha_registra"];
			}
		
		}else{
			$instituciones="";
		}
		print	$instituciones;
		break;
	case "fuentesAño":
		$sql="SELECT EXTRACT(YEAR FROM fecha_registra) AS anio, COUNT(EXTRACT(YEAR FROM fecha_registra)) AS contFuente FROM institucion_fuente  GROUP BY EXTRACT(YEAR FROM fecha_registra) ORDER BY 1 ASC";  
		$datosBDD=obtenerConsulta("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador",$sql);		
		if (count($datosBDD)>0){
			$instituciones="";
			foreach($datosBDD as $datosFuente){
				$instituciones.="~".$datosFuente["anio"]."||".$datosFuente["contFuente"];
			}
		
		}else{
			$instituciones="";
		}
		print	$instituciones;
		break;
	case "consumidoresAño":
		$sql="SELECT EXTRACT(YEAR FROM fecha_registra) AS anio, COUNT(EXTRACT(YEAR FROM fecha_registra)) AS contConsumidor FROM institucion  GROUP BY EXTRACT(YEAR FROM fecha_registra) ORDER BY 1 ASC";  
		$datosBDD=obtenerConsulta("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador",$sql);	
		if (count($datosBDD)>0){
			$instituciones="";
			foreach($datosBDD as $datosConsumidor){
				$instituciones.="~".$datosConsumidor["anio"]."||".$datosConsumidor["contConsumidor"];
			}
		
		}else{
			$instituciones="";
		}
		print	$instituciones;
		break;
	case "camposIntegradosAño":
		$sql="SELECT EXTRACT(YEAR FROM fecha_registra) AS anio, COUNT(id_campo) AS cantidad FROM campo_dato GROUP BY EXTRACT(YEAR FROM fecha_registra)";  
		$datosBDD=obtenerConsulta("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador",$sql);	
		if (count($datosBDD)>0){
			$instituciones="";
			foreach($datosBDD as $datosCampos){
				$instituciones.="~".$datosCampos["anio"]."||".$datosCampos["cantidad"];
			}
		
		}else{
			$instituciones="";
		}
		print	$instituciones;
		break;
	case "accesoFichaSimplificada":
		$sql="";  
		/*$datosBDD=obtenerConsulta($sql);		
		if (count($datosBDD)>0){
			$instituciones="";
			foreach($datosBDD as $datosConsumidor){
				$instituciones.="~".$datosConsumidor["anio"]."||".$datosConsumidor["contConsumidor"];
			}
		
		}else{
			$instituciones="";
		}*/
		$instituciones="~2017||1700000~2018||1500000~2019||700000";
		print	$instituciones;
		break;
	case "accesoInteroperabilidad":
		$sql="SELECT '2015' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
		FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2015 UNION
		SELECT '2016' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
		FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2016 UNION
		SELECT '2017' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
		FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2017 UNION
		SELECT '2018' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
		FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2018 UNION
		SELECT '2019' AS anio, COUNT(DISTINCT(id_institucion)) AS cantidad
		FROM paquete_informacion WHERE EXTRACT(YEAR FROM fecha_registra)<=2019";  
		$datosBDD=obtenerConsulta("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador",$sql);		
		if (count($datosBDD)>0){
			$instituciones="";
			foreach($datosBDD as $datosConsumidor){
				$instituciones.="~".$datosConsumidor["anio"]."||".$datosConsumidor["cantidad"];
			}
		
		}else{
			$instituciones="";
		}	
		print	$instituciones;
		break;
		case "accesoInfoDigital":
			//$sql="SELECT DISTINCT(EXTRACT(YEAR FROM fecha_creacion_informacionpriv)) AS anio FROM informacion";  
			$sql="SELECT '2013' as anio, COUNT(DISTINCT(id_institucion_privada)) AS cantidad
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
			$datosBDD=obtenerConsulta("192.168.149.3", "bckdba_dinar", "sERVIDOR.20", "sinardap",$sql);		
			if (count($datosBDD)>0){
				$instituciones="";
				foreach($datosBDD as $datosConsumidor){
					$instituciones.="~".$datosConsumidor["anio"]."||".$datosConsumidor["cantidad"];
				}
			
			}else{
				$instituciones="";
			}			
			print	$instituciones;
			break;
}




?>	
