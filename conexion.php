<?php
$conexBDD = mysqli_connect("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador");

if (mysqli_connect_errno()) {
    printf("No se pudo conectar a la base de datos: %s\n", mysqli_connect_error());
    exit();
}
//funcion para obtener datos de la bdd
function obtenerConsulta($ip,$user,$pass,$bdd,$consulta){
	$conexBDD = mysqli_connect($ip,$user,$pass,$bdd);
	if ($resultado = $conexBDD->query($consulta)) {
		$datosBDD=array();    
		while ($fila = $resultado->fetch_assoc()) {
			array_push($datosBDD,$fila);
		}    
		$resultado->close();
	}
	$conexBDD->close();	
	return $datosBDD;
}
//funcion para ejecutar inserts y updates
function ejecutarConsulta($consulta){
	$conexBDD = mysqli_connect("192.168.149.15", "bckdba_dinar", "sERVIDOR.20", "interoperador");
	$resultado=false;
	if (mysqli_query($conexBDD,$consulta)===TRUE) {
		$resultado=true;
	}
	$conexBDD->close();
	return $resultado;	
}



?>	
