<?php
require_once '../model/Connection.php';

if (isset($_POST['oper']) && $_POST['oper'] == 'consultaConsumo') {
	var_dump($_POST['oper']);
	$sql = "SELECT mes,sum(consultas) as cantidad FROM consumo_interoperabilidad where anio=" . date("Y") . " group by mes";
	$connection = Connection::getInstance("10.0.0.164", "christian", "dINAR.2019", "consumos_plataformas");
	$result = $connection->getQuery($sql);
	var_dump($result);
	echo json_encode($result);
}
