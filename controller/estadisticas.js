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
      console.log("data"+data)
      datos = JSON.parse(data)
      // console.log("datos"+datos)

      var rows = []
      var columns = []
      $.each(datos, function (index, value) {        
        columns = Object.keys(value)        
      });
      rows.push(columns)      
      columns = []
      $.each(datos, function (index, value) {        
        columns.push(value['INSTITUCION CONSUMIDORA'])
        columns.push(value['AÑO'])
        columns.push(value['ENE'])
        columns.push(value['FEB'])
        columns.push(value['MAR'])
        columns.push(value['ABR'])
        columns.push(value['MAY'])
        columns.push(value['JUN'])
        columns.push(value['JUL'])
        columns.push(value['AGO'])
        columns.push(value['SEP'])
        columns.push(value['OCT'])
        columns.push(value['NOV'])
        columns.push(value['DIC'])
        rows.push(columns)
        columns = []
      })
      


      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017, 12, 19)
      };
      wb.SheetNames.push("Test Sheet");
      var ws_data = rows;
      var ws = XLSX.utils.json_to_sheet(datos);
      wb.Sheets["Test Sheet"] = ws;
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      // XLSX.writeFile(wb, 'ReporteFuenteConsumidores ' + fechaInicial + ' a ' + fechaFinal + '.xlsx');
    },
    type: 'POST'
  })
}