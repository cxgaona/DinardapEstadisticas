<?php

//Author: Fernando Rodríguez-Izquierdo Serrano

class db{
  static private $instancia = NULL;
  private $servidor;
  private $usuario;
  private $password;
  private $basedatos;
  private $conexion;
	
  public function __construct($servidor,$usuario,$password,$basedatos){
    $this->servidor = $servidor;
    $this->usuario = $usuario;
    $this->password = $password;
    $this->basedatos = $basedatos;
  }

	//Función de conexión
  private function conectar(){
    $this->conexion = mysqli_connect($this->servidor,$this->usuario,$this->password) or DIE(mysql_error());
    mysql_select_db($this->basedatos, $this->conexion);
  }
	
  public function desconectar(){
    mysql_close($this->conexion);
  }
	
  public function dameQuery($query){
      var_dump("Aqui");
    $this->conectar();
    var_dump("Aqui ya no");
    $res = mysql_query($query) or die (mysql_error());
    $this->desconectar();
    return $res;	
  }
	
  public function dameQuerySinCerrar($query){
    $this->conectar();
    $res = mysql_query($query) or die (mysql_error());
    return $res;	
  }
	
  public function dameQuerySinAbrir($query){
  		
    $res = mysql_query($query) or die (mysql_error());
    $this->desconectar();
    return $res;	
  }
	
  public function dameQuerySinAbrirCerrar($query){		
    $res = mysql_query($query) or die (mysql_error());		
    return $res;	
  }
	
  static public function getInstancia($servidor,$usuario,$password,$basedatos) {
    if (self::$instancia == NULL) {
      self::$instancia = new db($servidor,$usuario,$password,$basedatos);
    }
    return self::$instancia;
  }
    
  public function mysql_escape_string($var){
    $this -> conectar();
    $result = mysql_escape_string($var);
    $this -> desconectar();
    return $result;
  }
		
}
?>