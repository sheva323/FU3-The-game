import type {
  IPortero,
  IEquipo,
  IJugador,
  ISimularPartidoFunction,
  IStatsPortero,
  IStatsJugador,
  IPosicionJugador,
} from '../types';

// Función para generar estadísticas aleatorias para un jugador
function generarStats(): IStatsJugador {
  let stats: IStatsJugador | undefined = undefined;

  stats = {
    ritmo: Math.floor(Math.random() * 100) + 1,
    tiro: Math.floor(Math.random() * 100) + 1,
    pase: Math.floor(Math.random() * 100) + 1,
    regate: Math.floor(Math.random() * 100) + 1,
    defensa: Math.floor(Math.random() * 100) + 1,
    fisico: Math.floor(Math.random() * 100) + 1,
  };
  return stats;
}

// Funcion para generar estadisticas aleaotrias para el arquero
function generarStatsPortero(): IStatsPortero {
  let stats: IStatsPortero | undefined = undefined;

  stats = {
    estiradas: Math.floor(Math.random() * 100) + 1,
    paradas: Math.floor(Math.random() * 100) + 1,
    reflejos: Math.floor(Math.random() * 100) + 1,
    velocidad: Math.floor(Math.random() * 100) + 1,
    saque: Math.floor(Math.random() * 100) + 1,
    posicionamiento: Math.floor(Math.random() * 100) + 1,
  };
  return stats;
}

// Función para generar un jugador aleatorio
function generarJugador(
  equipo: string,
  nombre: string,
  posicion: IPosicionJugador | 'POR',
  isArquero?: boolean
): IJugador | IPortero {
  const stats = isArquero ? generarStatsPortero() : generarStats();
  const jugador = {
    equipo,
    nombre,
    posicion,
    stats,
  };
  return isArquero ? (jugador as IPortero) : (jugador as IJugador);
}

// Función para generar un equipo aleatorio
function generarEquipo(nombre: string): IEquipo {
  const jugadores: (IJugador | IPortero)[] = [];

  // Generar jugador Portero
  jugadores.push(generarJugador(nombre, nombre + ' - POR', 'POR', true));

  // Generar jugadores Defensa
  jugadores.push(generarJugador(nombre, nombre + ' - DFC', 'DFC'));

  // Generar jugadores Laterales
  jugadores.push(generarJugador(nombre, nombre + ' - MI', 'MI'));
  jugadores.push(generarJugador(nombre, nombre + ' - MD', 'MD'));

  // Generar jugador DC
  jugadores.push(generarJugador(nombre, nombre + ' - DC', 'DC'));

  return { nombre, jugadores };
}

export function simularVariosPartidos(simularPartido: ISimularPartidoFunction, cantidad: number) {
  let data: string[] = [];

  for (let index = 0; index < cantidad; index++) {
    // Generamos dos equipos aleatorios
    const equipo1 = generarEquipo('FC Ethereum');
    const equipo2 = generarEquipo('FC Bitcoin');

    // Simulamos un partido entre los dos equipos
    const { ganador, resultado } = simularPartido(equipo1, equipo2);

    data.push(ganador);

    // Mostramos el resultado del partido
    console.log(resultado);
  }

  let globalResults = data.reduce((acumulador, equipo) => {
    if (acumulador[equipo]) {
      acumulador[equipo]++;
    } else {
      acumulador[equipo] = 1;
    }
    return acumulador;
  }, {});

  console.log({ 'Resultados globales': globalResults });
}

export function restarStat(stat: number, porcentaje: number) {
  return stat - 100 * porcentaje;
}
