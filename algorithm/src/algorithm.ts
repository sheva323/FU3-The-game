import { IEquipo, IJugador, IPortero, IStatsPortero } from './types';
import { restarStat, simularVariosPartidos } from './utils';

// Función para simular un partido
function simularPartido(
  equipo1: IEquipo,
  equipo2: IEquipo
): { ganador: string; resultado: string } {
  // Se establece el marcador
  let marcador = {
    [equipo1.nombre]: 0,
    [equipo2.nombre]: 0,
  };

  // Esto va a ir cambiando por ronda pero empieza con el primer equipo
  let turnoEquipo: IEquipo = equipo1;

  // Funcion para cambiar el turno del equipo
  const cambiarTurno = () => {
    turnoEquipo = turnoEquipo.nombre === equipo1.nombre ? equipo2 : equipo1;
  };

  // Iteramos 90 minutos de juego
  for (let i = 0; i < 90; i++) {
    // Elegimos un jugador aleatorio de cada equipo
    const jugadoresAleatorios = {
      [equipo1.nombre]: equipo1.jugadores[Math.floor(Math.random() * 4) + 1] as IJugador,
      [equipo2.nombre]: equipo2.jugadores[Math.floor(Math.random() * 4) + 1] as IJugador,
    };

    // Calculamos la probabilidad de éxito del pase basado en las estadísticas de los jugadores
    const probabilidadJugador = {
      [equipo1.nombre]:
        jugadoresAleatorios[equipo1.nombre].stats.pase +
        jugadoresAleatorios[equipo2.nombre].stats.defensa,
      [equipo2.nombre]:
        jugadoresAleatorios[equipo2.nombre].stats.pase +
        jugadoresAleatorios[equipo1.nombre].stats.defensa,
    };

    // Elegimos al receptor del pase basado en la probabilidad calculada
    let receptor: undefined | IJugador = undefined;

    // Definimos al jugador que recibe el pase y va a realizar la jugada segun probabilidades
    // Si no tiene probabilidades entonces cambia de turno
    if (Math.random() * 100 < probabilidadJugador[turnoEquipo.nombre]) {
      receptor = jugadoresAleatorios[turnoEquipo.nombre];
    } else {
      cambiarTurno();
      continue;
    }

    const equipoContrario = turnoEquipo.nombre === equipo1.nombre ? equipo2 : equipo1;

    if (receptor.posicion === 'MD' || receptor.posicion === 'MI') {
      const mediocampistaContrario = equipoContrario.jugadores.find(
        (jugador) => jugador.posicion === receptor.posicion
      ) as IJugador;
      // Calculamos la probabilidad de centro y la comparamos con un número aleatorio
      const probabilidadCentro =
        receptor.stats.pase + receptor.stats.regate - mediocampistaContrario.stats.defensa * 2;
      const numAleatorio = Math.random() * 100;

      receptor.stats.pase = restarStat(receptor.stats.pase, 1.5);
      receptor.stats.regate = restarStat(receptor.stats.regate, 2);
      mediocampistaContrario.stats.defensa = restarStat(mediocampistaContrario.stats.defensa, 1.5);

      // Si la probabilidad de centro es mayor que el número aleatorio, buscamos un delantero centro en el equipo contrario
      if (probabilidadCentro > numAleatorio) {
        receptor = turnoEquipo.jugadores.find((jugador) => jugador.posicion === 'DC') as IJugador;
      }
    }

    // Si la posesion no es de un delantero entonces cambia de turno
    if (receptor.posicion !== 'DC') {
      cambiarTurno();
      continue;
    }

    const defensorContrario = equipoContrario.jugadores.find(
      (jugador) => jugador.posicion === 'DFC'
    ) as IJugador;

    // Calculamos la probabilidad de éxito del regate basado en las estadísticas de los jugadores
    const probabilidadRegate = receptor.stats.regate + (100 - defensorContrario.stats.defensa);

    // Restamos regate  y defensa
    receptor.stats.regate = restarStat(receptor.stats.regate, 1.5);
    defensorContrario.stats.defensa = restarStat(defensorContrario.stats.defensa, 1.5);

    // Si el regate no es exitoso entonces pasa al siguiente turno
    if (Math.random() * 100 > probabilidadRegate) {
      cambiarTurno();
      continue;
    }

    // Calculamos la probabilidad de tiro y la comparamos con un número aleatorio
    const probabilidadTiro =
      receptor.stats.tiro +
      (100 - defensorContrario.stats.defensa) +
      Math.floor(Math.random() * 20) -
      10;
    const numAleatorioTiro = Math.random() * 100;

    receptor.stats.tiro = restarStat(receptor.stats.tiro, 1.5);

    // Si la probabilidad de tiro es menor que el número aleatorio, cambia de turno
    if (probabilidadTiro < numAleatorioTiro) {
      cambiarTurno();
      continue;
    }

    const porteroContrario = equipoContrario.jugadores[0] as IPortero;

    const probabilidadAtajar =
      porteroContrario.stats.estiradas * 0.2 +
      porteroContrario.stats.paradas * 0.2 +
      porteroContrario.stats.reflejos * 0.2 +
      porteroContrario.stats.velocidad * 0.1 +
      porteroContrario.stats.saque * 0.1 +
      porteroContrario.stats.posicionamiento * 0.2 +
      Math.floor(Math.random() * 20) -
      10;

    // Restamos stats al portero
    for (let propiedad in porteroContrario.stats) {
      porteroContrario.stats[propiedad] *= 0.99;
    }

    // Probabiliadad random
    const probabilidadRandom = Math.random() * 100;

    if (probabilidadRandom < probabilidadAtajar) {
      marcador[receptor.equipo]++;
    }

    cambiarTurno();
    continue;
  }

  let ganador: string;

  if (marcador[equipo1.nombre] > marcador[equipo2.nombre]) {
    ganador = equipo1.nombre;
  } else if (marcador[equipo1.nombre] < marcador[equipo2.nombre]) {
    ganador = equipo2.nombre;
  } else {
    ganador = 'draw';
  }

  // Devolvemos el marcador del partido
  return {
    ganador,
    resultado: `${equipo1.nombre} ${marcador[equipo1.nombre]} - ${marcador[equipo2.nombre]} ${
      equipo2.nombre
    }`,
  };
}

simularVariosPartidos(simularPartido, 20);
