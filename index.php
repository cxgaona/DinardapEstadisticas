
<?php
require_once 'model/Conexion.php';
$db = Conexion::getInstance("10.0.0.164", "christian", "dINAR.2019", "consumos_plataformas");
var_dump($db);
//$result = $db->getData("SELECT mes,sum(consultas) as cantidad FROM consumo_interoperabilidad where anio=" . date("Y") . " group by mes");



?>	

