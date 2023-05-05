import Notificacions from '@/components/notifications';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
  const {address, isConnected} = useAccount();
  const env = process.env.PUSH_ENV;

  useEffect(() => {
    console.log(address);
    
  }, [isConnected])
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative flex flex-col place-items-center gap-8 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[200px] after:w-[260px] after:translate-x-1/3 after:bg-gradient-conic   after:blur-2xl after:content-[''] before:from-transparent before:to-blue-700/10 after:from-sky-900 after:via-[#0141ff]/40 before:lg:h-[360px]">
        <p className="text-3xl font-bold tracking-wider">{'<Ready to code />'}</p>
        <ConnectButton />
        <Notificacions/>
      </div>
    </main>
  );
}
