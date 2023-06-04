import Image from 'next/image';

import heroImage from '/public/images/hero.jpg';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="h-[500px] relative flex justify-center items-center">
      <div className="text-center ">
        <h2 className="text-4xl font-bold mb-1">El nuevo juego FUT en la Web 3</h2>
        <p className="text-2xl">Aprende, juega y gana</p>
        <div style={{marginTop: 20}}>
         <button className="btn-primary bg-cyan-600 ml-auto mr-10">
            <Link href={"/player"}>Crear Jugador</Link>
          </button>
         <button className="btn-primary bg-green-600 ml-auto mr-10">
         <Link href={"/my-team"}>Jugar</Link>
         </button>
        </div>
      </div>
      <Image
        src={heroImage}
        alt="Hero image"
        fill
        className="object-cover object-bottom h-full w-full -z-10  brightness-75"
        priority
      />
    </section>
  );
}
