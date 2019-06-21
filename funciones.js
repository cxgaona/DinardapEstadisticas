function obtenerDatos(tipo, valor, id) {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			respuesta = this.responseText;
			//console.log(respuesta);
			switch (tipo) {
				case "consumoActualPlataformas":
					obtenerConsumoActualPlataformas(respuesta);
					break;
				case "fuentesAño":
					obtenerFuentesAño(respuesta);
					break;
				case "consumidoresAño":
					obtenerConsumidoresAño(respuesta);
					break;
				case "camposIntegradosAño":
					obtenerCamposIntegradosAño(respuesta);
					break;
				case "accesoFichaSimplificada":
					obtenerAccesoFichaSimplificada(respuesta);
					break;
				case "accesoInteroperabilidad":
					obtenerAccesoInteroperabilidad(respuesta);
					break;
				case "accesoInfoDigital":
					obtenerAccesoInfoDigital(respuesta);
					break;
				case "consumidores":
					obtenerConsumidores(respuesta);
					break;
				case "fuentes":
					obtenerFuentes(respuesta);
					break;
			}
		}
	}
	xmlhttp.open("GET", "obtenerDatos.php?tipo=" + tipo + "&valor=" + valor, true);
	xmlhttp.send();
}

function obtenerConsumoActualPlataformas(respuesta) {
	var plataformasA = respuesta.split("¬");

	var datosFicha = plataformasA[1].split("~");
	var mesesFicha = [];
	var cantidadFicha = [];
	for (var i = 1; i < datosFicha.length; i++) {
		var registros = datosFicha[i].split("||");
		mesesFicha.push(registros[0]);
		cantidadFicha.push(registros[1]);
	}
	var datosInteroperabilidad = plataformasA[2].split("~");
	var mesesInteroperabilidad = [];
	var cantidadInteroperabilidad = [];
	for (var i = 1; i < datosInteroperabilidad.length; i++) {
		var registros = datosInteroperabilidad[i].split("||");
		mesesInteroperabilidad.push(registros[0]);
		cantidadInteroperabilidad.push(registros[1]);
	}
	var datosInfoDigital = plataformasA[3].split("~");
	var mesesInfoDigital = [];
	var cantidadInfoDigital = [];
	for (var i = 1; i < datosInfoDigital.length; i++) {
		var registros = datosInfoDigital[i].split("||");
		mesesInfoDigital.push(registros[0]);
		cantidadInfoDigital.push(registros[1]);
	}
	var ctx = document.getElementById('consumoActualPlataformas').getContext("2d");

	var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
	gradientStroke.addColorStop(0, '#80b6f4');
	gradientStroke.addColorStop(1, chartColor);

	var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
	gradientFill.addColorStop(0, "rgba(255, 255, 255, 0)");
	gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: mesesInteroperabilidad,
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
				data: cantidadInteroperabilidad
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
				data: cantidadFicha
			},
			{
				label: "Info Digital",
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
				data: cantidadInfoDigital
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

function obtenerConsumidoresAño(respuesta) {
	var datos = respuesta.split("~");
	var anios = [];
	var cantidad = [];
	for (i = 1; i < datos.length; i++) {
		registros = datos[i].split("||");
		anios.push(registros[0]);
		cantidad.push(registros[1]);
	}
	var e = document.getElementById("barrasConsumidoresporAño").getContext("2d");
	var gradientFill = e.createLinearGradient(0, 200, 0, 50);

	gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
	gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4));

	var a = {
		type: "bar",
		data: {
			labels: anios,
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
				data: cantidad
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

function obtenerFuentesAño(respuesta) {
	var datos = respuesta.split("~");
	var anios = [];
	var cantidad = [];
	for (i = 1; i < datos.length; i++) {
		registros = datos[i].split("||");
		anios.push(registros[0]);
		cantidad.push(registros[1]);
	}
	var e = document.getElementById("barrasFuentesporAño").getContext("2d");
	var gradientFill = e.createLinearGradient(0, 200, 0, 50);

	gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
	gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

	var a = {
		type: "bar",
		data: {
			labels: anios,
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
				data: cantidad
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

function obtenerCamposIntegradosAño(respuesta) {
	var datos = respuesta.split("~");
	var anios = [];
	var cantidad = [];
	for (i = 1; i < datos.length; i++) {
		registros = datos[i].split("||");
		anios.push(registros[0]);
		cantidad.push(registros[1]);
	}
	var e = document.getElementById("camposIntegradosAño").getContext("2d");
	var gradientFill = e.createLinearGradient(0, 200, 0, 50);
	gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
	gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

	var a = {
		type: "bar",
		data: {
			labels: anios,
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
				data: cantidad
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

function obtenerAccesoFichaSimplificada(respuesta) {
	var datos = respuesta.split("~");
	var anios = [];
	var cantidad = [];
	for (i = 1; i < datos.length; i++) {
		registros = datos[i].split("||");
		anios.push(registros[0]);
		cantidad.push(registros[1]);
	}
	var e = document.getElementById("accesoFichaSimplificada").getContext("2d");
	var gradientFill = e.createLinearGradient(0, 200, 0, 50);

	gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
	gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

	var a = {
		type: "line",
		data: {
			labels: anios,
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
				data: cantidad
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

function obtenerAccesoInteroperabilidad(respuesta) {
	var datos = respuesta.split("~");
	var anios = [];
	var cantidad = [];
	for (i = 1; i < datos.length; i++) {
		registros = datos[i].split("||");
		anios.push(registros[0]);
		cantidad.push(registros[1]);
	}
	var e = document.getElementById("accesoInteroperabilidad").getContext("2d");
	var gradientFill = e.createLinearGradient(0, 200, 0, 50);

	gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
	gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

	var a = {
		type: "line",
		data: {
			labels: anios,
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
				data: cantidad
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

function obtenerAccesoInfoDigital(respuesta) {
	var datos = respuesta.split("~");
	var anios = [];
	var cantidad = [];
	for (i = 1; i < datos.length; i++) {
		registros = datos[i].split("||");
		anios.push(registros[0]);
		cantidad.push(registros[1]);
	}
	var e = document.getElementById("accesoInfoDigital").getContext("2d");
	var gradientFill = e.createLinearGradient(0, 200, 0, 50);

	gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
	gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

	var a = {
		type: "line",
		data: {
			labels: anios,
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
				data: cantidad
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

function obtenerConsumidores(respuesta) {
	instituciones = respuesta.split("~");
	var n = instituciones.length;
	for (i = 1; i < n; i++) {
		dato = instituciones[i].split("||");
		$("<tr><td>" + dato[0] + "</td><td>" + dato[1] + "</td></tr>").appendTo("#tablaConsumidores");
	}
	$("<span> (" + (n - 1) + ")<span>").appendTo("#tituloConsumidores");
}

function obtenerFuentes(respuesta) {
	instituciones = respuesta.split("~");
	var n = instituciones.length;
	for (i = 1; i < n; i++) {
		dato = instituciones[i].split("||");
		$("<tr><td>" + dato[0] + "</td><td>" + dato[1] + "</td></tr>").appendTo("#tablaFuentes");
	}
	$("<span> (" + (n - 1) + ")<span>").appendTo("#tituloFuentes");
}