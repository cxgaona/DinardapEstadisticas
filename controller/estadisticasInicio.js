function consultaConsumo() {
  var datosInteroperabilidad
  var datosFichaSimplificada
  var datosInfoDigital
  $.ajax({
    async: false,
    data: { oper: 'consultaConsumoInteroperabilidad' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datosInteroperabilidad = JSON.parse(data)
    },
    type: 'POST'
  })
  $.ajax({
    async: false,
    data: { oper: 'consultaConsumoFichaSimplicada' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datosFichaSimplificada = JSON.parse(data)
    },
    type: 'POST'
  })
  $.ajax({
    async: false,
    data: { oper: 'consultaConsumoInfoDigital' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datosInfoDigital = JSON.parse(data)
    },
    type: 'POST'
  })

  var ctx = document.getElementById('consumoActualPlataformas').getContext("2d");
  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, '#80b6f4');
  gradientStroke.addColorStop(1, chartColor);
  var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
  gradientFill.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

  var cantidadesInteroperabilidad = []
  var meses = []
  $.each(datosInteroperabilidad, function (index, value) {
    $.each(value, function (key, value) {
      if (key === "cantidad")
        cantidadesInteroperabilidad.push(value)
      if (key === "mes")
        meses.push(value)
    });
  });


  var cantidadesFichaSimplificada = []
  $.each(datosFichaSimplificada, function (index, value) {
    $.each(value, function (key, value) {
      if (key === "cantidad")
        cantidadesFichaSimplificada.push(value)
    });
  });

  var cantidadesInfoDigital = []
  $.each(datosInfoDigital, function (index, value) {
    $.each(value, function (key, value) {
      if (key === "cantidad")
        cantidadesInfoDigital.push(value)
    });
  });


  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: mesString(meses),
      datasets: [{
        label: "Interoperabilidad",
        borderColor: "#3366cc",
        pointBorderColor: "#3366cc",
        pointBackgroundColor: "#3366cc",
        pointHoverBackgroundColor: "blue",
        pointHoverBorderColor: chartColor,
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: false,
        backgroundColor: gradientFill,
        borderWidth: 2,
        data: cantidadesInteroperabilidad
      },
      {
        label: "FichaSimplificada",
        borderColor: "#dc3912",
        pointBorderColor: "#dc3912",
        pointBackgroundColor: "#dc3912",
        pointHoverBackgroundColor: "#fb8a0b",
        pointHoverBorderColor: chartColor,
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: false,
        backgroundColor: gradientFill,
        borderWidth: 2,
        data: cantidadesFichaSimplificada
      },
      {
        label: "InfoDigital",
        borderColor: "#909",
        pointBorderColor: "#909",
        pointBackgroundColor: "#909",
        pointHoverBackgroundColor: "#ea19d9",
        pointHoverBorderColor: chartColor,
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: false,
        backgroundColor: gradientFill,
        borderWidth: 2,
        data: cantidadesInfoDigital
      }
      ]
    },
    options: {
      responsive: true,
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "#686262",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "#d1cbcb",
            zeroLineColor: "transparent"
          }

        }],
        xAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            display: false,

          },
          ticks: {
            padding: 10,
            fontColor: "#686262",
            fontStyle: "bold"
          }
        }]
      }
    }
  });
}

function fuentes() {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'fuentes' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datos = JSON.parse(data)
    },
    type: 'POST'
  })
  $.each(datos, function (index, value) {
    $('#tablaFuentes').append(
      "<tr><td>" + value['nombre'] +
      "</td><td>" + value['fecha_registra'] + "</td></tr>")
  });
}
function consumidoresAño() {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'consumidoresAño' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datos = JSON.parse(data)
    },
    type: 'POST'
  })
  var años = []
  var contConsumidor = []

  $.each(datos, function (index, value) {
    años.push(value['anio'])
    contConsumidor.push(value['contConsumidor'])
  });

  var e = document.getElementById("barrasConsumidoresporAño").getContext("2d");
  var gradientFill = e.createLinearGradient(0, 200, 0, 50);

  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4));

  var a = {
    type: "bar",
    data: {
      labels: años,
      datasets: [{
        label: "Consumidores agregados por año",
        backgroundColor: gradientFill,
        borderColor: "#18ce0f",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#18ce0f",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: contConsumidor
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 }
      }
    }
  };
  var viewsChart = new Chart(e, a);

}
function fuentesAño() {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'fuentesAño' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datos = JSON.parse(data)
    },
    type: 'POST'
  })
  var años = []
  var contFuentes = []

  $.each(datos, function (index, value) {
    años.push(value['anio'])
    contFuentes.push(value['contFuente'])
  });

  var e = document.getElementById("barrasFuentesporAño").getContext("2d");
  var gradientFill = e.createLinearGradient(0, 200, 0, 50);
  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

  var a = {
    type: "bar",
    data: {
      labels: años,
      datasets: [{
        label: "Fuentes agregadas por año",
        backgroundColor: gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: contFuentes
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 }
      }
    }
  };
  var viewsChart = new Chart(e, a);

}

function consumidores() {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'consumidores' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datos = JSON.parse(data)
    },
    type: 'POST'
  })
  $.each(datos, function (index, value) {
    $('#tablaConsumidores').append(
      "<tr><td>" + value['nombre'] +
      "</td><td>" + value['fecha_registra'] + "</td></tr>")
  });

}

function camposIntegradosAño() {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'camposIntegradosAño' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datos = JSON.parse(data)
    },
    type: 'POST'
  })
  var años = []
  var cantidades = []

  $.each(datos, function (index, value) {
    años.push(value['anio'])
    cantidades.push(value['cantidad'])
  });

  var e = document.getElementById("camposIntegradosAño").getContext("2d");
  var gradientFill = e.createLinearGradient(0, 200, 0, 50);
  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

  var a = {
    type: "bar",
    data: {
      labels: años,
      datasets: [{
        label: "Campos integrados por año",
        backgroundColor: gradientFill,
        borderColor: "#f96332",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: cantidades
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 }
      }
    }
  };
  var viewsChart = new Chart(e, a);
}

function accesoInteroperabilidad(respuesta) {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'accesoInteroperabilidad' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datos = JSON.parse(data)
    },
    type: 'POST'
  })
  var años = []
  var cantidades = []

  $.each(datos, function (index, value) {
    años.push(value['anio'])
    cantidades.push(value['cantidad'])
  });


  var e = document.getElementById("accesoInteroperabilidad").getContext("2d");
  var gradientFill = e.createLinearGradient(0, 200, 0, 50);

  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

  var a = {
    type: "line",
    data: {
      labels: años,
      datasets: [{
        label: "Acceso Interoperabilidad",
        backgroundColor: gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: cantidades
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: { left: 0, right: 5, top: 15, bottom: 15 }
      }
    }
  };
  var viewsChart = new Chart(e, a);
}

function accesoInfoDigital(respuesta) {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'accesoInfoDigital' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      console.log(data);
      datos = JSON.parse(data)
    },
    type: 'POST'
  })
  var años = []
  var cantidades = []

  $.each(datos, function (index, value) {
    años.push(value['anio'])
    cantidades.push(value['cantidad'])
  });



  var e = document.getElementById("accesoInfoDigital").getContext("2d");
  var gradientFill = e.createLinearGradient(0, 200, 0, 50);

  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

  var a = {
    type: "line",
    data: {
      labels: años,
      datasets: [{
        label: "Acceso InfoDigital",
        backgroundColor: gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: cantidades
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: { left: 0, right: 5, top: 15, bottom: 15 }
      }
    }
  };
  var viewsChart = new Chart(e, a);
}

function accesoFichaSimplificada(respuesta) {
  var datos
  $.ajax({
    async: false,
    data: { oper: 'accesoFichaSimplificada' },
    url: "controller/obtenerDatos.php",
    success: function (data) {
      datos = JSON.parse(data)
      console.log(datos);
    },
    type: 'POST'
  })
  var años = []
  var cantidades = []

  $.each(datos, function (index, value) {
    años.push(value['año'])
    cantidades.push(value['cantidadAccesos'])
  });
  var e = document.getElementById("accesoFichaSimplificada").getContext("2d");
  var gradientFill = e.createLinearGradient(0, 200, 0, 50);

  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

  var a = {
    type: "line",
    data: {
      labels: años,
      datasets: [{
        label: "Acceso Ficha Simplificada",
        backgroundColor: gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: cantidades
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: { left: 0, right: 5, top: 15, bottom: 15 }
      }
    }
  };
  var viewsChart = new Chart(e, a);
}








// Utils

function mesString(mesesNumeros) {
  var meses = []
  $.each(mesesNumeros, function (index, value) {
    switch (value) {
      case "1":
        meses.push("ENE")
        break;
      case "2":
        meses.push("FEB")
        break;
      case "3":
        meses.push("MAR")
        break;
      case "4":
        meses.push("ABR")
        break;
      case "5":
        meses.push("MAY")
        break;
      case "6":
        meses.push("JUN")
        break;
      case "7":
        meses.push("JUL")
        break;
      case "8":
        meses.push("AGO")
        break;
      case "9":
        meses.push("SEP")
        break;
      case "10":
        meses.push("OCT")
        break;
      case "11":
        meses.push("NOV")
        break;
      case "12":
        meses.push("DIC")
        break;
    }
  })
  return meses;
}

