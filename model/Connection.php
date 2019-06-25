<?php
class Connection
{
  static private $instance = NULL;
  private $server;
  private $user;
  private $password;
  private $dataBase;
  private $conecction;

  public function __construct($server, $user, $password, $dataBase)
  {
    $this->server = $server;
    $this->user = $user;
    $this->password = $password;
    $this->dataBase = $dataBase;
  }

  private function connect()
  {
    $this->conecction = @new mysqli($this->server, $this->user, $this->password);    
    if ($this->conecction->connect_errno) {
      die('Error de conexión: ' . $this->conecction->connect_error);     
      $this->disconnect(); 
    } else {      
      $this->conecction->select_db($this->dataBase);
    }    
  }

  public function disconnect()
  {
    $this->conecction->close();
  }

  public function getQuery($query)
  {
    $this->connect();
    $response = $this->conecction->query($query);
    if (!$response) {
      echo ("Error en la consulta: " . $this->conecction->error());
      $this->disconnect();
    }
    $this->disconnect();
    return $response;
  }

  static public function getInstance($server, $user, $password, $dataBase)
  {
    if (self::$instance == NULL) {
      self::$instance = new Connection($server, $user, $password, $dataBase);
    }
    return self::$instance;
  }
}
