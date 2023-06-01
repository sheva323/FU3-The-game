import React from 'react';

type Props = {};

export default function LeagueDetails({}: Props) {
  return (
    <div className="flex gap-8">
      <div id="myTeam" className="w-full max-w-sm px-8 border-r-2 border-cyan-600">
        <h4 className="text-center font-bold text-xl mb-6">Mi equipo</h4>
        <ul className="w-3/4 mx-auto flex flex-col gap-8">
          {myTeam.map((player) => (
            <li key={player.wallet} className="flex justify-between">
              <span>{player.wallet}</span>
              <span>{player.position}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 pb-8">
        <span className="block mb-4 text-center text-xl font-bold">Tabla de posiciones</span>
        <table className="w-full table-fixed text-center border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-500 w-10">N°</th>
              <th className="border border-slate-500 w-36">Equipo</th>
              <th className="border border-slate-500">Pts</th>
              <th className="border border-slate-500">PJ</th>
              <th className="border border-slate-500">PG</th>
              <th className="border border-slate-500">PE</th>
              <th className="border border-slate-500">PP</th>
              <th className="border border-slate-500">GF</th>
              <th className="border border-slate-500">GC</th>
              <th className="border border-slate-500">Dif</th>
            </tr>
          </thead>
          <tbody>
            {equiposLiga.map((equipo, idx) => (
              <tr key={equipo.nombre}>
                <td className="border border-slate-500 py-2">{idx + 1}</td>
                <td className="border border-slate-500 tracking-wide">{equipo.nombre}</td>
                <td className="border border-slate-500">{equipo.puntos}</td>
                <td className="border border-slate-500">{equipo.partidosJugados}</td>
                <td className="border border-slate-500">{equipo.partidosGanados}</td>
                <td className="border border-slate-500">{equipo.partidosEmpatados}</td>
                <td className="border border-slate-500">{equipo.partidosPerdidos}</td>
                <td className="border border-slate-500">{equipo.golesFavor}</td>
                <td className="border border-slate-500">{equipo.golesContra}</td>
                <td className="border border-slate-500">
                  {equipo.golesFavor - equipo.golesContra}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const myTeam = [
  { id: 1, position: 'Delantero', wallet: '0x53...f8' },
  { id: 2, position: 'Medio', wallet: '0xa3...8d' },
  { id: 3, position: 'Defensa', wallet: '0x45...84' },
  { id: 4, position: 'Defensa', wallet: '0x5d...54' },
  { id: 5, position: 'Portero', wallet: '0x48...d4' },
];

const equiposLiga = [
  {
    nombre: 'Equipo F',
    partidosJugados: 10,
    partidosGanados: 7,
    partidosEmpatados: 2,
    partidosPerdidos: 1,
    golesFavor: 25,
    golesContra: 10,
    puntos: 23,
  },
  {
    nombre: 'Equipo C',
    partidosJugados: 10,
    partidosGanados: 6,
    partidosEmpatados: 2,
    partidosPerdidos: 2,
    golesFavor: 20,
    golesContra: 12,
    puntos: 20,
  },
  {
    nombre: 'Equipo H',
    partidosJugados: 10,
    partidosGanados: 5,
    partidosEmpatados: 3,
    partidosPerdidos: 2,
    golesFavor: 18,
    golesContra: 15,
    puntos: 18,
  },
  {
    nombre: 'Equipo E',
    partidosJugados: 10,
    partidosGanados: 4,
    partidosEmpatados: 4,
    partidosPerdidos: 2,
    golesFavor: 16,
    golesContra: 13,
    puntos: 16,
  },
  {
    nombre: 'Equipo G',
    partidosJugados: 10,
    partidosGanados: 4,
    partidosEmpatados: 3,
    partidosPerdidos: 3,
    golesFavor: 15,
    golesContra: 14,
    puntos: 15,
  },
  {
    nombre: 'Equipo B',
    partidosJugados: 10,
    partidosGanados: 3,
    partidosEmpatados: 4,
    partidosPerdidos: 3,
    golesFavor: 12,
    golesContra: 11,
    puntos: 13,
  },
  {
    nombre: 'Equipo I',
    partidosJugados: 10,
    partidosGanados: 3,
    partidosEmpatados: 3,
    partidosPerdidos: 4,
    golesFavor: 11,
    golesContra: 13,
    puntos: 12,
  },
  {
    nombre: 'Equipo D',
    partidosJugados: 10,
    partidosGanados: 2,
    partidosEmpatados: 5,
    partidosPerdidos: 3,
    golesFavor: 10,
    golesContra: 12,
    puntos: 11,
  },
  {
    nombre: 'Equipo M',
    partidosJugados: 10,
    partidosGanados: 2,
    partidosEmpatados: 4,
    partidosPerdidos: 4,
    golesFavor: 9,
    golesContra: 10,
    puntos: 10,
  },
  {
    nombre: 'Equipo A',
    partidosJugados: 10,
    partidosGanados: 1,
    partidosEmpatados: 6,
    partidosPerdidos: 3,
    golesFavor: 8,
    golesContra: 10,
    puntos: 9,
  },
];
