document.addEventListener("DOMContentLoaded", async function () {
    // Obtener los datos de temperatura y humedad del aire de la base de datos
    const response = await fetch('/api/datos'); // Cambia la ruta según tu configuración
    const data = await response.json();

    // Procesar los datos para los gráficos
    const fechas = data.map(item => item.fecha_hora);
    const temperaturaAmbiente = data.map(item => item.temperatura_ambiente);
    const humedadAmbiente = data.map(item => item.humedad_ambiente);

    // Crear el gráfico de humedad del aire
    var ctxHumedadAire = document.getElementById("chartHumedadAire").getContext("2d");
    var chartHumedadAire = new Chart(ctxHumedadAire, {
        type: "line",
        data: {
            labels: fechas,
            datasets: [{
                label: "Humedad del Aire",
                data: humedadAmbiente,
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

    // Crear el gráfico de temperatura
    var ctxTemperatura = document.getElementById("chartTemperatura").getContext("2d");
    var chartTemperatura = new Chart(ctxTemperatura, {
        type: "line",
        data: {
            labels: fechas,
            datasets: [{
                label: "Temperatura Ambiente",
                data: temperaturaAmbiente,
                borderColor: "rgba(255, 99, 132, 1)",
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
