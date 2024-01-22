const prompt = require('prompt-sync')();

const preguntas = [
    ['¿Cuál es la capital de Francia?', 'París'],
    ['¿En qué país se encuentra la Gran Barrera de Coral?', 'Australia'],
    ['¿Cuál es el punto más alto de la Tierra?', 'Monte Everest'],
    ['¿En qué ciudad queda el Cerro Kgale?', 'Gaborone'],
    ['¿Cuántos planetas hay en nuestro sistema solar?', '8'],
    ['¿Cuál es el símbolo químico del oro?', 'Au'],
    ['¿Cuál es la distancia promedio de la Tierra al Sol?', '150 millones de kilómetros'],
    ['¿Quién creó la jeringuilla?', 'Alexander Wood'],
    ['¿¿Cuál fue el primer equipo de Haaland?', 'Bryne F.K'],
    ['¿Cuantos Tour de Francia tiene Indurain?', '5'],
    ['¿En qué año se retiró Pau Gasol?', '2021'],
    ['¿Cuántos mundiales tiene Fernando Alonso?', '2'],
];

const numeroJugadores = parseInt(prompt('Ingresa el número de jugadores: ')) || 1;
const jugadores = [];
const puntajes = [];

for (let i = 0; i < numeroJugadores; i++) {
    jugadores.push(prompt('Ingresa el nombre del Jugador ' + (i + 1) + ': '));
    puntajes.push(0);
}

function obtenerPreguntasAleatorias(maxPreguntas) {
    const preguntasAleatorias = [];
    const copiaPreguntas = [...preguntas];

    while (preguntasAleatorias.length < maxPreguntas && copiaPreguntas.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * copiaPreguntas.length);
        preguntasAleatorias.push(copiaPreguntas.splice(indiceAleatorio, 1)[0]);
    }

    return preguntasAleatorias;
}

function Trivial() {
    console.log('¡Bienvenido al Okey lets gooooo!\n');

    const preguntasAleatorias = obtenerPreguntasAleatorias(5); 

    for (const pregunta of preguntasAleatorias) {
        console.log('\n---- Pregunta ----\n');
        
        for (let i = 0; i < jugadores.length; i++) {
            console.log(jugadores[i] + ', es tu turno para responder:');
            console.log('Pregunta: ' + pregunta[0]);

            const respuestaUsuario = prompt('Ingresa tu respuesta: ');

            if (respuestaUsuario === pregunta[1]) {
                console.log('¡Correcto, ' + jugadores[i] + '! Ganaste 20 puntos.\n');
                puntajes[i] += 20;
            } else {
                console.log('Respuesta incorrecta. La respuesta correcta es: ' + pregunta[1] + '\n');
            }
        }
    }

    console.log('\nFin del juego. Puntajes finales:');
    jugadores.forEach((jugador, i) => console.log(jugador + ': ' + puntajes[i] + ' puntos'));
}

Trivial();


