var idFuenteSeleccionada, fuenteSeleccionada
var idFuenteCamposSeleccionado
var idConsumidorSeleccionado, consumidor



$(document).ready(function () {
  $('#btnFuenteConsumidor').attr('disabled', true)
  $('#btnConsumidorFuente').attr('disabled', true)
  $('#btnFuenteConsumidoresCampos').attr('disabled', true)

  loadFuentes();
  loadConsumidores();
  var mesActual = new Date().getMonth()
  var añoActual = new Date().getFullYear()
  var mesAnterior, añoAnterior
  añoAnterior = añoActual - 1
  if (mesActual == 0) {
    mesAnterior = 1
    mesActual = 12
    añoActual--
  } else {
    mesAnterior = mesActual + 1
  }

  $('.datepicker').MonthPicker({
    Button: false,
    MaxMonth: -1,
    MonthFormat: 'yy-mm', // Short month name, Full year.
    AltFormat: 'yy-dd-mm', // ODBC time stamp.
  })
  $('.fechaFinal').MonthPicker({
    SelectedMonth: añoActual + '-' + mesActual
  })
  $('.fechaInicial').MonthPicker({
    SelectedMonth: añoAnterior + '-' + mesAnterior
  })
})
function validacionTagFuentes() {
  fuenteSeleccionada = $('#tagFuentes').val()
  $.each(fuentes, function (index, value) {
    if (value['INSTITUCION FUENTE'] === fuenteSeleccionada) {
      idFuenteSeleccionada = value['INSTITUCION FUENTE ID']
      $('#btnFuenteConsumidor').attr('disabled', false)
      return false
    } else {
      idFuenteSeleccionada = 'error'
      $('#btnFuenteConsumidor').attr('disabled', true)
    }
  })
}
function validacionTagConsumidores() {
  consumidorSeleccionado = $('#tagConsumidores').val()
  $.each(consumidores, function (index, value) {
    if (value['INSTITUCION CONSUMIDORA'] === consumidorSeleccionado) {
      idConsumidorSeleccionado = value['INSTITUCION CONSUMIDORA ID']
      $('#btnConsumidorFuente').attr('disabled', false)
      return false
    } else {
      idConsumidorSeleccionado = 'error'
      $('#btnConsumidorFuente').attr('disabled', true)
    }
  })
}
function validacionTagFuenteConsumidoresCampos() {
   fuenteCampoSeleccionado = $('#tagFuenteCampos').val()
  var flagFuente = false
  var flagConsumidor = false
  $.each(fuentes, function (index, value) {
    if (value['INSTITUCION FUENTE'] === fuenteCampoSeleccionado) {
      idFuenteCamposSeleccionado = value['INSTITUCION FUENTE ID']
      // $('#btnFuenteConsumidoresCampos').attr('disabled', false)
      flagFuente = true
      return false
    } else {
      idFuenteCamposSeleccionado = 'error'
      flagFuente = false
      // $('#btnFuenteConsumidoresCampos').attr('disabled', true)
    }
  })
   consumidoresCampoSeleccionado = $('#tagConsumidoresCampos').val()
  $.each(consumidores, function (index, value) {
    if (value['INSTITUCION CONSUMIDORA'] === consumidoresCampoSeleccionado) {
      idConsumidorCamposSeleccionado = value['INSTITUCION CONSUMIDORA ID']
      // $('#btnFuenteConsumidoresCampos').attr('disabled', false)
      flagConsumidor = true
      return false
    } else {
      idConsumidorCamposSeleccionado = 'error'
      flagConsumidor = false
      // $('#btnFuenteConsumidoresCampos').attr('disabled', true)
    }
  })

  if (flagFuente && flagConsumidor)
    $('#btnFuenteConsumidoresCampos').attr('disabled', false)
  else
    $('#btnFuenteConsumidoresCampos').attr('disabled', true)

}

var fuentes
var consumidores
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
  })
  $('#tagFuentes').autocomplete({
    source: tagFuentes,
    open: function (event, ui) {
      validacionTagFuentes()
    },
    close: function (event, ui) {
      validacionTagFuentes()
    }
  })
  $('#tagFuenteCampos').autocomplete({
    source: tagFuentes,
    open: function (event, ui) {
      validacionTagFuenteConsumidoresCampos()
    },
    close: function (event, ui) {
      validacionTagFuenteConsumidoresCampos()
    }
  })
}
function loadConsumidores() {
  var tagConsumidores = []
  $.ajax({
    async: false,
    data: { oper: 'loadConsumidores' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      consumidores = JSON.parse(data)
    },
    type: 'POST'
  })
  $.each(consumidores, function (index, value) {
    tagConsumidores.push(value['INSTITUCION CONSUMIDORA'])
  });
  $('#tagConsumidores').autocomplete({
    source: tagConsumidores,
    open: function (event, ui) {
      validacionTagConsumidores()
    },
    close: function (event, ui) {
      validacionTagConsumidores()
    }
  })
  $('#tagConsumidoresCampos').autocomplete({
    source: tagConsumidores,
    open: function (event, ui) {
      validacionTagFuenteConsumidoresCampos()
    },
    close: function (event, ui) {
      validacionTagFuenteConsumidoresCampos()
    }
  })

}

function descargarReporteFuenteConsumidor() {
  var fechaInicial = $('#fechaInicialFuenteConsumidor').val() + '-01'
  var fechaFinal = $('#fechaFinalFuenteConsumidor').val() + '-31'
  var datos;

  $.ajax({
    async: false,
    data: {
      oper: 'cargaInfoFuenteConsumidor',
      fechaInicio: fechaInicial,
      fechaFin: fechaFinal,
      fuente: idFuenteSeleccionada
    },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      if (data != "0") {
        datos = JSON.parse(data)
        var wb = XLSX.utils.book_new();
        wb.Props = {
          Title: "Reporte Fuente Consumidores",
          Subject: "",
          Author: "DINARDAP",
          CreatedDate: new Date()
        };
        wb.SheetNames.push("Reporte Fuente Consumidores");
        //carga de datos obtenidos de la base
        var ws = XLSX.utils.json_to_sheet(datos, { origin: "A6" });
        //agrega titulos de la plantilla  
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0! 
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        var today = yyyy + '/' + mm + '/' + dd;

        XLSX.utils.sheet_add_json(ws, [
          { A: 'LISTADO DE INSTITUCIONES CONSUMIDORAS' },
          { A: 'FUENTE: ' + fuenteSeleccionada },
          { A: 'FECHA: ' + today },
          { A: '**Matriz de Número de Consultas por Mes**' }
        ], { skipHeader: true });
        //combina las celdas de los titulos
        ws['!merges'] = [XLSX.utils.decode_range("A1:O1"),
        XLSX.utils.decode_range("A2:O2"),
        XLSX.utils.decode_range("A3:O3")];
        //obtiene el numero de filas y columnas
        var range = XLSX.utils.decode_range(ws['!ref']);
        var noRows = range.e.r; //No.of rows
        var noCols = range.e.c; //No. of cols
        var rowMax = noRows + 2;
        //agrega total columna final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL' }
        ], { skipHeader: true, origin: "O6" });
        for (var i = 7; i <= rowMax; i++) {
          XLSX.utils.sheet_set_array_formula(ws, 'O' + i + ':O' + i, 'SUM(C' + i + ':N' + i + ')');
        }
        //agrega total fila final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL' }
        ], { skipHeader: true, origin: "A" + rowMax });
        for (var i = 2; i <= noCols; i++) {
          var cell_address = { c: i, r: rowMax - 1 };
          var cell_ref = XLSX.utils.encode_cell(cell_address);
          celda = cell_ref.split(rowMax);
          XLSX.utils.sheet_set_array_formula(ws, cell_ref + ':' + cell_ref, 'SUM(' + celda[0] + '7:' + celda[0] + (rowMax - 1) + ')');
        }
        var wscols = [
          { wch: 45 },
          { wch: 4.5 },
          { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 },
          { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 },
          { wch: 8 },
        ];
        ws['!cols'] = wscols;
        //caracteristicas para la exportacion a excel       
        wb.Sheets["Reporte Fuente Consumidores"] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        XLSX.writeFile(wb, 'ReporteFuenteConsumidores ' + fechaInicial + ' a ' + fechaFinal + '.xlsx');
      } else {
        alert("No existen datos para la Fuente y Fechas Seleccionadas");
      }
    },
    type: 'POST'
  })
}
function descargarReporteFuenteConsumidoresCampos() {



  var fechaInicial = $('#fechaInicialFuenteConsumidoresCampos').val() + '-01'
  var fechaFinal = $('#fechaFinalFuenteConsumidoresCampos').val() + '-31'
  var datos;

  $.ajax({
    async: false,
    data: {
      oper: 'cargaInfoFuenteConsumidoresCampos',
      fechaInicio: fechaInicial,
      fechaFin: fechaFinal,
      fuente: idFuenteCamposSeleccionado,
      consumidor: idConsumidorCamposSeleccionado
    },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      if (data != "0") {
        datos = JSON.parse(data)
        var wb = XLSX.utils.book_new();
        wb.Props = {
          Title: "Reporte de Campos Consumidos",
          Subject: "",
          Author: "DINARDAP",
          CreatedDate: new Date()
        };
        wb.SheetNames.push("Reporte de Campos Consumidos");
        //carga de datos obtenidos de la base
        var ws = XLSX.utils.json_to_sheet(datos, { origin: "A7" });
        //agrega titulos de la plantilla  
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0! 
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        var today = yyyy + '/' + mm + '/' + dd;

        XLSX.utils.sheet_add_json(ws, [
          { A: 'LISTADO DE CAMPOS CONSUMIDOS' },
          { A: 'FUENTE: ' + fuenteCampoSeleccionado },
          { A: 'CONSUMIDOR: ' + consumidoresCampoSeleccionado },
          { A: 'FECHA: ' + today },
          { A: '**Matriz de Número de Consultas por Mes**' }
        ], { skipHeader: true });
        //combina las celdas de los titulos
        ws['!merges'] = [XLSX.utils.decode_range("A1:O1"),
        XLSX.utils.decode_range("A2:O2"),
        XLSX.utils.decode_range("A3:O3"),
        XLSX.utils.decode_range("A4:O4")]
        //obtiene el numero de filas y columnas
        var range = XLSX.utils.decode_range(ws['!ref']);
        var noRows = range.e.r; //No.of rows
        var noCols = range.e.c; //No. of cols
        var rowMax = noRows + 2;
        //agrega total columna final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL' }
        ], { skipHeader: true, origin: "O7" });
        for (var i = 8; i <= rowMax; i++) {
          XLSX.utils.sheet_set_array_formula(ws, 'O' + i + ':O' + i, 'SUM(C' + i + ':N' + i + ')');
        }
        //agrega total fila final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL' }
        ], { skipHeader: true, origin: "A" + rowMax });
        for (var i = 2; i <= noCols; i++) {
          var cell_address = { c: i, r: rowMax - 1 };
          var cell_ref = XLSX.utils.encode_cell(cell_address);
          celda = cell_ref.split(rowMax);
          XLSX.utils.sheet_set_array_formula(ws, cell_ref + ':' + cell_ref, 'SUM(' + celda[0] + '8:' + celda[0] + (rowMax - 1) + ')');
        }
        var wscols = [
          { wch: 45 },
          { wch: 4.5 },
          { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 },
          { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 },
          { wch: 8 },
        ];
        ws['!cols'] = wscols;
        //caracteristicas para la exportacion a excel       
        wb.Sheets["Reporte de Campos Consumidos"] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        XLSX.writeFile(wb, 'ReporteCamposConsumidos ' + fechaInicial + ' a ' + fechaFinal + '.xlsx');
      } else {
        alert("No existen datos para la Fuente, Consumidor y Fechas Seleccionadas");
      }
    },
    type: 'POST'
  })
}
function descargarReporteConsumidorFuente() {
  var fechaInicial = $('#fechaInicialConsumidorFuente').val() + '-01'
  var fechaFinal = $('#fechaFinalConsumidorFuente').val() + '-31'
  var datos;

  $.ajax({
    async: false,
    data: {
      oper: 'cargaInfoConsumidoFuente',
      fechaInicio: fechaInicial,
      fechaFin: fechaFinal,
      consumidor: idConsumidorSeleccionado
    },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      if (data != "0") {
        datos = JSON.parse(data)
        var wb = XLSX.utils.book_new();
        wb.Props = {
          Title: "Reporte Consumidor Fuentes",
          Subject: "",
          Author: "DINARDAP",
          CreatedDate: new Date()
        };
        wb.SheetNames.push("Reporte Fuente Consumidores");
        //carga de datos obtenidos de la base
        var ws = XLSX.utils.json_to_sheet(datos, { origin: "A6" });
        //agrega titulos de la plantilla  
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0! 
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        var today = yyyy + '/' + mm + '/' + dd;

        XLSX.utils.sheet_add_json(ws, [
          { A: 'LISTADO DE INSTITUCIONES FUENTE' },
          { A: 'CONSUMIDOR: ' + consumidorSeleccionado },
          { A: 'FECHA: ' + today },
          { A: '**Matriz de Número de Consultas por Mes**' }
        ], { skipHeader: true });
        //combina las celdas de los titulos
        ws['!merges'] = [XLSX.utils.decode_range("A1:O1"),
        XLSX.utils.decode_range("A2:O2"),
        XLSX.utils.decode_range("A3:O3")];
        //obtiene el numero de filas y columnas
        var range = XLSX.utils.decode_range(ws['!ref']);
        var noRows = range.e.r; //No.of rows
        var noCols = range.e.c; //No. of cols
        var rowMax = noRows + 2;
        //agrega total columna final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL' }
        ], { skipHeader: true, origin: "O6" });
        for (var i = 7; i <= rowMax; i++) {
          XLSX.utils.sheet_set_array_formula(ws, 'O' + i + ':O' + i, 'SUM(C' + i + ':N' + i + ')');
        }
        //agrega total fila final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL' }
        ], { skipHeader: true, origin: "A" + rowMax });
        for (var i = 2; i <= noCols; i++) {
          var cell_address = { c: i, r: rowMax - 1 };
          var cell_ref = XLSX.utils.encode_cell(cell_address);
          celda = cell_ref.split(rowMax);
          XLSX.utils.sheet_set_array_formula(ws, cell_ref + ':' + cell_ref, 'SUM(' + celda[0] + '7:' + celda[0] + (rowMax - 1) + ')');
        }
        var wscols = [
          { wch: 45 },
          { wch: 4.5 },
          { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 },
          { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 }, { wch: 7.75 },
          { wch: 8 },
        ];
        ws['!cols'] = wscols;
        //caracteristicas para la exportacion a excel       
        wb.Sheets["Reporte Fuente Consumidores"] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        XLSX.writeFile(wb, 'ReporteConsumido Fuentes ' + fechaInicial + ' a ' + fechaFinal + '.xlsx');
      } else {
        alert("No existen datos para el Consumidor y Fechas Seleccionadas");
      }
    },
    type: 'POST'
  })
}