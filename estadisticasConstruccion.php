<?php

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>DINARDAP</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no'
        name='viewport' />
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <!-- CSS Files -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/now-ui-dashboard.css?v=1.0.1" rel="stylesheet" />
    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link href="assets/demo/demo.css" rel="stylesheet" />
    <script src="https://unpkg.com/xlsx/dist/xlsx.full.min.js"></script>





</head>

<body class="">
    <div class="wrapper ">
        <div class="sidebar" data-color="orange">
            <!--
                    Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
                -->
            <div class="logo">
                <a href="http://www.datospublicos.gob.ec/" class="simple-text logo-normal">
                    <img src='assets/img/logo-dinardap.png'>
                </a>
            </div>
            <div class="sidebar-wrapper">
                <ul class="nav">
                    <li>
                        <a href="index.html">
                            <i class="now-ui-icons tech_laptop"></i>
                            <p>Inicio</p>
                        </a>
                    </li>
                    <li class="active">
                        <a href="estadisticasConstruccion.html">
                            <i class="now-ui-icons business_chart-bar-32"></i>
                            <p>Estad&iacute;sticas</p>
                        </a>
                    </li>
                    <li>
                        <a href="normativas.html">
                            <i class="now-ui-icons files_paper"></i>
                            <p>Normativa</p>
                        </a>
                    </li>
                    <li>
                        <a href="procedimientos.html">
                            <i class="now-ui-icons design_vector"></i>
                            <p>Procedimientos</p>
                        </a>
                    </li>
                    <li>
                        <a href="formularios.html">
                            <i class="now-ui-icons education_paper"></i>
                            <p>Formularios</p>
                        </a>
                    </li>
                    <li>
                        <a href="sla.html">
                            <i class="now-ui-icons media-2_sound-wave"></i>
                            <p>SLA</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent  navbar-absolute bg-primary fixed-top">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <div class="navbar-toggle">
                            <button type="button" class="navbar-toggler">
                                <span class="navbar-toggler-bar bar1"></span>
                                <span class="navbar-toggler-bar bar2"></span>
                                <span class="navbar-toggler-bar bar3"></span>
                            </button>
                        </div>
                        <a class="navbar-brand">Estadísticas</a>
                    </div>
                </div>
            </nav>
            <!-- End Navbar -->
            <div class="panel-header panel-header-sm">
            </div>

            <!-- <div class="content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">

                            <div class="card-body">
                                <button onclick="cargaExcelFuenteConsumidores()">Test</button>
                                <button onclick="doit('biff8', 'test.xls');">TestDown</button>

                                <div class='col-sm-6'>
                                    <div class="form-group">
                                        <div class='input-group date' id='datetimepicker1'>
                                            <input type='text' class="form-control" />
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> -->

            <div class="content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="title">Reporte Fuente Consumidores</h5>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="row">
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label>Fuente</label>
                                                <input type="text" class="form-control" id="tagFuentes"
                                                    placeholder="Dirección Nacional de Registro de Datos Públicos">
                                            </div>
                                        </div>
                                        <div class="col-md-3 pl-1">
                                            <div class="form-group">
                                                <label>Fecha Inicial</label>
                                                <input id="fechaInicialFuenteConsumidor" class="datepicker form-control" type="text"
                                                    placeholder="2007-01-26" />
                                            </div>
                                        </div>
                                        <div class="col-md-3 pl-1">
                                            <div class="form-group">
                                                <label>Fecha Final</label>
                                                <input id="fechaFinalFuenteConsumidor" class="datepicker form-control" type="text"
                                                    placeholder="2017-12-23" />
                                            </div>
                                        </div>
                                        <div class="col-md-2 pl-1">
                                            <label>Reporte en Excel</label>
                                            <button id="btnFuenteConsumidor" onclick="descargarReporteExcel(); return false;"
                                                class="btn btn-primary btn-round">
                                                <i class="now-ui-icons arrows-1_cloud-download-93 "></i> Descargar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="footer">
                <div class="container-fluid">
                </div>
            </footer>
        </div>
    </div>
</body>
<!--   Core JS Files   -->
<script src="assets/js/core/jquery.min.js"></script>
<script src="assets/js/core/popper.min.js"></script>
<script src="assets/js/core/bootstrap.min.js"></script>
<script src="assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
<!-- Chart JS -->
<script src="assets/js/plugins/chartjs.min.js"></script>
<!--  Notifications Plugin    -->
<script src="assets/js/plugins/bootstrap-notify.js"></script>
<!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
<script src="assets/js/now-ui-dashboard.js?v=1.0.1"></script>
<!-- Now Ui Dashboard DEMO methods, don't include it in your project! -->

<script src="controller/estadisticas.js"></script>
<link href="assets/datepicker/css/bootstrap-datepicker.css" rel="stylesheet" />
<script src="assets/datepicker/js/jquery-1.10.2.js" type="text/javascript"></script>
<script src="assets/datepicker/js/bootstrap.js" type="text/javascript"></script>
<script src="assets/datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">





</html>