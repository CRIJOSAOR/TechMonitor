

document.addEventListener("DOMContentLoaded", async function () {
    // Obtener los datos de temperatura del suelo de la base de datos
    const response = await fetch('/api/datos'); // Cambia la ruta según tu configuración
    const data = await response.json();

    // Procesar los datos para el gráfico de temperatura del suelo
    const fechas = data.map(item => item.fecha_hora);
    const temperaturaSuelo = data.map(item => item.humedad_suelo);

    // Crear el gráfico de temperatura del suelo
    var ctxHumedadAire = document.getElementById("chartTemperaturaSuelo").getContext("2d");
    var chartTemperaturaSuelo = new Chart(ctxHumedadAire, {
        type: "line",
        data: {
            labels: fechas,
            datasets: [{
                label: "Humedad del Aire",
                data: temperaturaSuelo,
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // Otras opciones de configuración
        }
    });
});
