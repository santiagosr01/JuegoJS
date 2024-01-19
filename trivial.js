const prompt = require('prompt-sync')();

const categorias = ['Geografía', 'Ciencia', 'Deportes'];

const preguntas = {
    Geografía: [ {
            pregunta: '¿Cuál es la capital de Francia?',
            opciones: ['Berlín', 'Londres', 'París', 'Madrid'],
            respuestaCorrecta: 2
        },{
            pregunta: '¿En qué país se encuentra la Gran Barrera de Coral?',
            opciones: ['Australia', 'Brasil', 'México', 'Sudáfrica'],
            respuestaCorrecta: 0
        },{
            pregunta: '¿Cuál es el punto más alto de la Tierra?',
            opciones: ['Monte Everest', 'Monte Kilimanjaro', 'Monte McKinley', 'Monte Aconcagua'],
            respuestaCorrecta: 0
        },
    {
            pregunta: '¿En que ciudad queda el Cerro Kgale?',
            opciones: ['Bangui', 'Gaborone', 'Yamusukro', 'Abuya'],
            respuestaCorrecta: 1
        },
    ],
    Ciencia: [
        {
            pregunta: '¿Cuántos planetas hay en nuestro sistema solar?',
            opciones: ['8', '9', '10', '11'],
            respuestaCorrecta: 0
    },
        {
            pregunta: '¿Cuál es el símbolo químico del oro?',
            opciones: ['O', 'G', 'Au', 'Ag'],
            respuestaCorrecta: 2
        },
        {
            pregunta: '¿Cuál es la distancia promedio de la Tierra al Sol?',
            opciones: ['93 millones de millas', '150 millones de kilómetros', '200 millones de millas', '120 millones de kilómetros'],
            respuestaCorrecta: 1
        },{
            pregunta: '¿Quién creo la jeringuilla?',
            opciones: ['Alexander Wood', 'Antoni Edwar', 'Galileo Galilei', 'Sócrates'],
            respuestaCorrecta: 0
        },
    ],
    Deportes: [
        {
            pregunta: '¿Cuál fue el primer equipo de Haaland?',
            opciones: ['Getafe', 'CD Botsuana', 'Bengaluru United', 'Bryne F.K'],
            respuestaCorrecta: 3
 },
        {
            pregunta: '¿Cuantos tour de Francia tiene Indurain?',
            opciones: ['12', '5', '2', '4'],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿En que año se retiro Pau Gasol?',
            opciones: ['2000', '2008', '2021', '2023'],
            respuestaCorrecta: 2
        },{
            pregunta: '¿En que año se retiro Pau Gasol?',
            opciones: ['2000', '2008', '2021', '2023'],
            respuestaCorrecta: 2
        },{
            pregunta: '¿Cuantos mundiales tiene Fernando Alonso?',
            opciones: ['1', '5', '2', '7'],
            respuestaCorrecta: 2
        },
    ],
};


const niveles = {
    Fácil: 60,
    Intermedio: 45,
    Difícil: 30,
};

function obtenerPreguntaAleatoria(categoria) {
    const preguntasCategoria = preguntas[categoria];
    if (preguntasCategoria.length === 0) {
        return null; // Retorna null si ya no hay más preguntas en la categoría
    }
    const indicePreguntaAleatoria = Math.floor(Math.random() * preguntasCategoria.length);
    const preguntaAleatoria = preguntasCategoria[indicePreguntaAleatoria];

    // Elimina la pregunta seleccionada para que no se repita
    preguntasCategoria.splice(indicePreguntaAleatoria, 1);

    return preguntaAleatoria;
}

function jugarTrivial() {
    console.log('¡Bienvenido al Trivial!\n');
    const numeroJugadores = parseInt(prompt('Ingresa el número de jugadores: '));
    if (isNaN(numeroJugadores) || numeroJugadores < 1) {
        console.log('Por favor, ingresa un número válido de jugadores.');
        return;
    }
    const jugadores = [];
    for (let i = 1; i <= numeroJugadores; i++) {
        const nombre = prompt(`Ingresa el nombre del Jugador ${i}: `);
        jugadores.push({ nombre, puntaje: 0 });
    }
    const dificultad = parseInt(prompt('Selecciona la dificultad (1. Fácil, 2. Intermedio, 3. Difícil): ')) - 1;
    if (isNaN(dificultad) || dificultad < 0 || dificultad >= Object.keys(niveles).length) {
        console.log('Por favor, selecciona una dificultad válida.');
        return;
    }
    console.log('\nCategorías disponibles:');
    categorias.forEach((categoria, index) => {
        console.log(`${index + 1}. ${categoria}`);
    });
    const categoriasElegidas = prompt('Selecciona las categorías (separadas por comas): ')
        .split(',')
        .map(choice => categorias[parseInt(choice) - 1]);

    const tiempoPorPregunta = niveles[Object.keys(niveles)[dificultad]];
    for (let i = 1; i <= 5; i++) {
        console.log(`\n---- Pregunta ${i} ----\n`);

        for (const jugador of jugadores) {
            const categoria = categoriasElegidas[Math.floor(Math.random() * categoriasElegidas.length)];
            const pregunta = obtenerPreguntaAleatoria(categoria);

            console.log(`${jugador.nombre}, es tu turno para responder:`);
            console.log(`Categoría: ${categoria}`);
            console.log(`Pregunta: ${pregunta.pregunta}`);

            for (let j = 0; j < pregunta.opciones.length; j++) {
                console.log(`${j + 1}. ${pregunta.opciones[j]}`);
            }

            const tiempoInicio = new Date().getTime();
            const respuestaUsuario = parseInt(prompt('Ingresa el número de tu respuesta: '));

            const tiempoTranscurrido = (new Date().getTime() - tiempoInicio) / 1000;

            if (tiempoTranscurrido > tiempoPorPregunta) {
                console.log(`¡Tiempo agotado! La respuesta correcta era: ${pregunta.opciones[pregunta.respuestaCorrecta]}\n`);
            } else if (respuestaUsuario === pregunta.respuestaCorrecta + 1) {
                const puntajeGanado = 5; // 
                console.log(`¡Correcto! ${jugador.nombre} ganó ${puntajeGanado} puntos.\n`);
                jugador.puntaje += puntajeGanado;
            } else {
                console.log(`Respuesta incorrecta. La respuesta correcta es: ${pregunta.opciones[pregunta.respuestaCorrecta]}\n`);
            }
        }
    }

    console.log('\nFin del juego. Puntajes finales:');
    jugadores.forEach(jugador => console.log(`${jugador.nombre}: ${jugador.puntaje} puntos`));
}

jugarTrivial();



