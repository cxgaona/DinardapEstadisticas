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
        //carga de datos obtenidos de la base
        var ws = XLSX.utils.json_to_sheet(datos,{origin: "A6"});
        //agrega titulos de la plantilla  
        var today = new Date(); 
        var dd = today.getDate(); 
        var mm = today.getMonth()+1; //January is 0! 
        var yyyy = today.getFullYear(); 
        if(dd<10){
          dd='0'+dd
        } 
        if(mm<10){
          mm='0'+mm
        } 
        var today = yyyy+'/'+mm+'/'+dd; 
              
        XLSX.utils.sheet_add_json(ws, [
          { A: 'LISTADO DE INSTITUCIONES CONSUMIDORAS'}, 
          { A: 'FUENTE: '+fuenteSeleccionada}, 
          { A: 'FECHA: '+today},
          { A: '**Matriz de Número de Consultas por Mes**'}
        ],{skipHeader: true});
        //combina las celdas de los titulos
        ws['!merges'] = [ XLSX.utils.decode_range("A1:O1") ,
        XLSX.utils.decode_range("A2:O2"),
        XLSX.utils.decode_range("A3:O3") ];
        //obtiene el numero de filas y columnas
        var range = XLSX.utils.decode_range(ws['!ref']);
        var noRows = range.e.r; //No.of rows
        var noCols = range.e.c; //No. of cols
        var rowMax=noRows+2;
        //agrega total columna final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL'}         
        ],{skipHeader: true, origin: "O6"});
        for(var i=7;i<=rowMax;i++){
          XLSX.utils.sheet_set_array_formula(ws, 'O'+i+':O'+i, 'SUM(C'+i+':N'+i+')');
        }        
        //agrega total fila final
        XLSX.utils.sheet_add_json(ws, [
          { A: 'TOTAL'}          
        ],{skipHeader: true, origin: "A"+rowMax});        
        for(var i=2;i<=noCols;i++){
          var cell_address = {c:i, r:rowMax-1};    
          var cell_ref = XLSX.utils.encode_cell(cell_address);
          celda=cell_ref.split(rowMax);                    
          XLSX.utils.sheet_set_array_formula(ws, cell_ref+':'+cell_ref, 'SUM('+celda[0]+'7:'+celda[0]+(rowMax-1)+')');
        }
        var wscols = [          
          {wch: 45},
          {wch: 4.5},
          {wch: 7.75},{wch: 7.75},{wch: 7.75},{wch: 7.75},{wch: 7.75},{wch: 7.75},
          {wch: 7.75},{wch: 7.75},{wch: 7.75},{wch: 7.75},{wch: 7.75},{wch: 7.75},
          {wch: 8},          
        ];
        ws['!cols'] = wscols;
        //caracteristicas para la exportacion a excel       
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