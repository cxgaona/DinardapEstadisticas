<?php
require_once "db.php";
$db = db::getInstancia("localhost","root","","baseDeDatos");
$result = $db -> dameQuery("SELECT * FROM clientes");
while($cliente = mysql_fetch_array($result)){
  echo $cliente['nombre']." ".$cliente['apellidos']." ".$cliente['email'];
}
?>