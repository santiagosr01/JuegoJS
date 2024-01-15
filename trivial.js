const prompt = require('prompt-sync')();

const categorias = ['Geografía', 'Ciencia', 'Animales'];

const preguntas = {
    Geografía: [
        {
            pregunta: '¿Cuál es la capital de Francia?',
            opciones: ['Berlín', 'Londres', 'París', 'Madrid'],
            respuestaCorrecta: 2
        },
        {
            pregunta: '¿En qué país se encuentra la Gran Barrera de Coral?',
            opciones: ['Australia', 'Brasil', 'México', 'Sudáfrica'],
            respuestaCorrecta: 0
        },
        {
            pregunta: '¿Cuál es el punto más alto de la Tierra?',
            opciones: ['Monte Everest', 'Monte Kilimanjaro', 'Monte McKinley', 'Monte Aconcagua'],
            respuestaCorrecta: 0
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
        },
    ],
    Animales: [
        {
            pregunta: '¿Cuántas patas tiene una araña?',
            opciones: ['6', '8', '10', '12'],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Cuál es el animal más grande del mundo?',
            opciones: ['Elefante', 'Ballena Azul', 'Jirafa', 'Tiburón'],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Cuántas especies de pingüinos existen?',
            opciones: ['12', '18', '24', '30'],
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

function mostrarPodium(jugadores) {
    console.log('\n¡Podium Final!\n');
    const podium = jugadores
        .sort((a, b) => b.puntaje - a.puntaje)
        .slice(0, 3); // Mostrar solo los tres primeros jugadores en el podium

    podium.forEach((jugador, index) => {
        console.log(`[${index + 1}] ${jugador.nombre}: ${jugador.puntaje} puntos`);
    });
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
                const puntajeGanado = 10; // Puedes ajustar el puntaje según tus preferencias
                console.log(`¡Correcto! ${jugador.nombre} ganó ${puntajeGanado} puntos.\n`);
                jugador.puntaje += puntajeGanado;
            } else {
                console.log(`Respuesta incorrecta. La respuesta correcta es: ${pregunta.opciones[pregunta.respuestaCorrecta]}\n`);
            }
        }
    }

    console.log('\nFin del juego. Puntajes finales:');
    jugadores.forEach(jugador => console.log(`${jugador.nombre}: ${jugador.puntaje} puntos`));

    // Mostrar podium si hay más de un jugador
    if (jugadores.length > 1) {
        mostrarPodium(jugadores);
    }
}

jugarTrivial();



