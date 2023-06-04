import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const links = [
  {
    href: '/',
    label: 'Inicio',
  },
  {
    href: '/player',
    label: 'Mi Jugador',
  },
  {
    href: '/my-team',
    label: 'Mi equipo',
  },
  {
    href: '/play',
    label: 'Jugar',
  },
  {
    href: '/',
    label: 'Ranking',
  },
];

export default function Header() {
  return (
    <header className="bg-slate-900 z-10 h-16 fixed top-0 left-0 w-full max-w-screen- px-8 flex justify-between items-center">
      <div className="flex-1">
        <Link href="/" className="block w-fit">
          <h1 className="font-bold text-2xl">FU3 The Game</h1>
        </Link>
      </div>
      <nav>
        <ul className="flex gap-10">
          {links.map((link) => (
            <li
              key={link.href + link.label}
              className="cursor-pointer relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:bg-white after:h-[2px] hover:after:w-full after:transition-all after:duration-300"
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1 flex justify-end">
        <ConnectButton label="Conectar Wallet" />
      </div>
    </header>
  );
}
