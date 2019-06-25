<?php
require_once "model/Connection.php";
$connection = Connection::getInstance("10.0.0.164", "christian", "dINAR.2019", "consumos_plataformas");
$result = $connection->getQuery("SELECT mes,sum(consultas) as cantidad FROM consumo_interoperabilidad where anio=" . date("Y") . " group by mes");
// var_dump($result);
while ($cliente = mysqli_fetch_array($result)) {
	echo $cliente['mes'] . " " . $cliente['cantidad'];
}
