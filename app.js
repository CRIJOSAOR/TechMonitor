const express = require('express');

const path = require('path');
const mysql = require('mysql');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techmonitor'
});

app.use(express.static(path.join(__dirname, 'public'), { 'extensions': ['ejs'] }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});


// Ruta para la pantalla de monitoreo
app.get('/pantalla2', (req, res) => {
    db.query('SELECT temperatura_ambiente, humedad_ambiente, humedad_suelo FROM mediciones ORDER BY fecha_hora DESC LIMIT 1', (err, results) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        const datos = results[0];
        res.render('pantalla2', { datos }); // Renderizar la vista con los datos
    });
});

// Ruta para la pantalla de gráficos
app.get('/pantalla3', (req, res) => {
    res.render('pantalla3');
});

// Ruta para la pantalla de gráficos
app.get('/pantalla4', (req, res) => {
    res.render('pantalla4');
});

app.get('/api/datos', (req, res) => {
    const query = 'SELECT * FROM mediciones ORDER BY fecha_hora DESC LIMIT 10'; // Cambia la consulta según tus necesidades

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los datos' });
        } else {
            res.json(result);
        }
    });
});

app.get('/api/datos2', (req, res) => {
    const query = 'SELECT * FROM mediciones ORDER BY fecha_hora DESC LIMIT 10'; // Cambia la consulta según tus necesidades

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los datos' });
        } else {
            res.json(result);
        }
    });
});

// Rutas y controladores para las otras pantallas irán aquí...

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${3000}`)
});


// Token de tu bot de Telegram
const botToken = '6320458668:AAE5pMnjs0R_rxGMom2r292YlYsZzF1s9xk';

// ID del chat donde quieres enviar los mensajes (puedes obtenerlo como mencionamos anteriormente)
const chatId = '1234425658';



// Función para enviar un mensaje al bot de Telegram
async function enviarMensaje(texto) {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: texto
        });

        console.log('Mensaje enviado:', response.data);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}

// Función para consultar la base de datos y enviar las últimas mediciones
function consultarYEnviarMediciones() {
    db.query('SELECT * FROM mediciones ORDER BY fecha_hora DESC LIMIT 1', (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            return;
        }

        if (results.length > 0) {
            const ultimaMedicion = results[0];
            const mensaje = `Últimas mediciones:\nTemperatura ambiente: ${ultimaMedicion.temperatura_ambiente}°C
             \nHumedad ambiente: ${ultimaMedicion.humedad_ambiente} %
             \nHumedad del suelo: ${ultimaMedicion.humedad_suelo} %`
             ;

            enviarMensaje(mensaje);
        } else {
            console.log('No se encontraron mediciones en la base de datos.');
        }
    });
}

// Programar la ejecución de consultarYEnviarMediciones cada minuto (60000 milisegundos)
setInterval(consultarYEnviarMediciones, 8000);

// Mantener la aplicación en ejecución
console.log('Bot de Telegram en funcionamiento. Presiona Ctrl+C para detener.');
