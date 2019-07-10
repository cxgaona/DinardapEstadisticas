$(document).ready(function () {
  loadFuentes();
  $('.datepicker').datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $('.datepicker').on('changeDate', function (ev) {
    $(this).datepicker('hide');
  });
});

var fuentes

function loadFuentes() {
  var tagFuentes = []
  $.ajax({
    async: false,
    data: { oper: 'loadFuentes' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      fuentes = JSON.parse(data)
      
    },
    type: 'POST'
  })
  $.each(fuentes, function (index, value) {
    tagFuentes.push(value['INSTITUCION FUENTE'])
  });
  $('#tagFuentes').autocomplete({ source: tagFuentes });
}

function descargarReporteExcel() {
  var fuenteSeleccionada = $('#tagFuentes').val()
  var idFuenteSeleccionada
  $.each(fuentes, function (index, value) {
    if (value['INSTITUCION FUENTE'] === fuenteSeleccionada) {
      idFuenteSeleccionada = value['INSTITUCION FUENTE ID']
      return false
    } else {
      idFuenteSeleccionada = 'error'
    }
  })
  var fechaInicial = $('#fechaInicialFuenteConsumidor').val()
  var fechaFinal = $('#fechaFinalFuenteConsumidor').val()
  var datos;

  $.ajax({
    async: false,
    data: {
      oper: 'cargaExcel',
      fechaInicio: fechaInicial,
      fechaFin: fechaFinal,
      fuente: idFuenteSeleccionada
    },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      if(data!="0"){
        datos = JSON.parse(data)         
        var wb = XLSX.utils.book_new();
        wb.Props = {
          Title: "Reporte Fuente Consumidores",
          Subject: "",
          Author: "DINARDAP",
          CreatedDate: new Date()
        };
        wb.SheetNames.push("Reporte Fuente Consumidores");
        var ws = XLSX.utils.json_to_sheet(datos);
        wb.Sheets["Reporte Fuente Consumidores"] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        XLSX.writeFile(wb, 'ReporteFuenteConsumidores ' + fechaInicial + ' a ' + fechaFinal + '.xlsx');
      }else{
        alert("No existen datos para la Fuente y Fechas Seleccionadas");
      }
    },
    type: 'POST'
  })



}