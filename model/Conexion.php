<?php
class Conexion
{
  static private $instance = null;
  private $server;
  private $user;
  private $password;
  private $dataBase;
  private $connection;


  public function __construct($server, $user, $password, $dataBase)
  {
    $this->server = $server;
    $this->user = $user;
    $this->password = $password;
    $this->dataBase = $dataBase;
  }

  private function connection()
  {
    var_dump("aqui");
    this->connection = mysql_connect($this->server, $this->user, $this->password) or die(mysql_error());
    mysql_select_db($this->dataBase, $this->connection);
  }

  public function disconnect()
  {
    mysql_close($this->connection());
  }

  public function getData($sql)
  {
    $this->connection();
    $response = mysql_query($sql) or die(mysql_error());
    $this->disconnect();
    return $response;
  }

  public static function getInstance($server, $user, $password, $dataBase)
  {
    var_dump("Hoka");
    if (self::$instance == null) {
      self::$instance = new Conexion($server, $user, $password, $dataBase);
    }
    return self::$instance;
  }

  // public function getData($instance, $sql)
  // {
  //   $response = $this->$instance->query($sql);
  //   if ($response) {
  //     $dataBDD = array();
  //     while ($row = $response->fetch_array()) {
  //       array_push($dataBDD, $row);
  //     }
  //     $response->close();
  //   }
  //   $response->close();
  //   var_dump($dataBDD);
  //   return $dataBDD;
  // }
}
