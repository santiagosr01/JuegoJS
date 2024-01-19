const prompt = require('prompt-sync')();

const preguntas = [
    ['¿Cuál es la capital de Francia?', 'Berlín', 'Londres', 'París', 'Madrid', 'París'],
    ['¿En qué país se encuentra la Gran Barrera de Coral?', 'Australia', 'Brasil', 'México', 'Sudáfrica', 'Australia'],
    ['¿Cuál es el punto más alto de la Tierra?', 'Monte Everest', 'Monte Kilimanjaro', 'Monte McKinley', 'Monte Aconcagua', 'Monte Everest'],
    ['¿En qué ciudad queda el Cerro Kgale?', 'Bangui', 'Gaborone', 'Yamusukro', 'Abuya', 'Gaborone'],
    ['¿Cuántos planetas hay en nuestro sistema solar?', '8', '9', '10', '11', '8'],
    ['¿Cuál es el símbolo químico del oro?', 'O', 'G', 'Au', 'Ag', 'Au'],
    ['¿Cuál es la distancia promedio de la Tierra al Sol?', '93 millones de millas', '150 millones de kilómetros', '200 millones de millas', '120 millones de kilómetros', '150 millones de kilómetros'],
    ['¿Quién creó la jeringuilla?', 'Alexander Wood', 'Antoni Edwar', 'Galileo Galilei', 'Sócrates', 'Alexander Wood'],
    ['¿Cuál fue el primer equipo de Haaland?', 'Getafe', 'CD Botsuana', 'Bengaluru United', 'Bryne F.K', 'Bryne F.K'],
    ['¿Cuantos Tour de Francia tiene Indurain?', '12', '5', '2', '4', '5'],
    ['¿En qué año se retiró Pau Gasol?', '2000', '2008', '2021', '2023', '2021'],
    ['¿Cuántos mundiales tiene Fernando Alonso?', '1', '5', '2', '7', '2'],
];

function obtenerPreguntaAleatoria() {
    const indicePreguntaAleatoria = Math.floor(Math.random() * preguntas.length);
    return preguntas.splice(indicePreguntaAleatoria, 1)[0];
}

function jugarTrivial() {
    console.log('¡Bienvenido al Trivial!\n');

    const numeroJugadores = parseInt(prompt('Ingresa el número de jugadores: '));
    if (isNaN(numeroJugadores) || numeroJugadores < 1) {
        console.log('Por favor, ingresa un número válido de jugadores.');
        return;
    }

    const jugadores = Array.from({ length: numeroJugadores }, (_, i) => ({
        nombre: prompt(`Ingresa el nombre del Jugador ${i + 1}: `),
        puntaje: 0,
    }));

    for (let i = 0; i < 5; i++) {
        console.log(`\n---- Pregunta ${i + 1} ----\n`);

        for (const jugador of jugadores) {
            const pregunta = obtenerPreguntaAleatoria();

            console.log(`${jugador.nombre}, es tu turno para responder:`);
            console.log(`Pregunta: ${pregunta[0]}`);

            for (let j = 1; j < pregunta.length - 1; j++) {
                console.log(`${j}. ${pregunta[j]}`);
            }

            const respuestaUsuario = prompt('Ingresa tu respuesta: ');

            if (respuestaUsuario.toLowerCase() === pregunta[pregunta.length - 1].toLowerCase()) {
                console.log(`¡Correcto, ${jugador.nombre}! Ganaste 10 puntos.\n`);
                jugador.puntaje += 20;
            } else {
                console.log(`Respuesta incorrecta. La respuesta correcta es: ${pregunta[pregunta.length - 1]}\n`);
            }
        }
    }
    console.log('\nFin del juego. Puntajes finales:');
    jugadores.forEach(jugador => console.log(`${jugador.nombre}: ${jugador.puntaje} puntos`));
}

jugarTrivial();
