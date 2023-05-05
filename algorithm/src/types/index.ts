// Creamos una interfaz para definir las estadísticas de un jugador
export interface IStatsJugador {
  ritmo: number;
  tiro: number;
  pase: number;
  regate: number;
  defensa: number;
  fisico: number;
}

// Creamos una interfaz para definir las estadísticas de un portero
export interface IStatsPortero {
  estiradas: number;
  paradas: number;
  reflejos: number;
  velocidad: number;
  saque: number;
  posicionamiento: number;
}

// Creamos una interfaz para definir un portero
export interface IPortero {
  equipo: string;
  nombre: string;
  posicion: 'POR';
  stats: IStatsPortero;
}

export type IPosicionJugador = 'DC' | 'MI' | 'MD' | 'DFC';

// Creamos una interfaz para definir un jugador
export interface IJugador {
  equipo: string;
  nombre: string;
  posicion: IPosicionJugador;
  stats: IStatsJugador;
}

// Creamos una interfaz para definir un equipo
export interface IEquipo {
  nombre: string;
  jugadores: (IJugador | IPortero)[];
}

// Creamos una interfaz para definir el resultado de un partido
export interface IResultadoPartido {
  ganador: string;
  resultado: string;
}

// Creamos una interfaz para definir la funcion simularPartido
export interface ISimularPartidoFunction {
  (equipo1: IEquipo, equipo2: IEquipo): IResultadoPartido;
}
