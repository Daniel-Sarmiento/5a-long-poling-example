const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let responses = [];
const notificaciones = [
    {id: 1, cuerpo: "tienes un nuevo mensaje"},
    {id: 2, cuerpo: "te han asignado una tarea"}
];

app.get('/notificaciones', (req, res) => {

    res.json({
        success: true,
        notificaciones
    });
});

app.get('/notificacion-nueva', (req, res) => {
    responses.push(res);
});

app.post('/notificaciones', (req, res) => {
    const idNotificacion = notificaciones.length > 0 ? notificaciones[notificaciones.length - 1].id + 1 : 1;

    const notificacion = {
        id: idNotificacion,
        cuerpo: req.body.cuerpo
    }

    notificaciones.push(notificacion);

    // responder las peticiones pendientes
    responderClientes(notificacion);

    res.json({
        success: true,
        notificacion
    });
});

function responderClientes(notificacion) {
    for (let res of responses) {
        res.json({
            success: true,
            notificacion
        });
    }

    responses = [];
};

app.listen(3000, () => console.log("servidor corriendo"));