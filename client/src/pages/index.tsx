import Notificacions from "@/components/notifications";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import web3 from './web3.min.js'

export default function Home() {
  const { address, isConnected } = useAccount();
  const env = process.env.PUSH_ENV;
  let firma;
  useEffect(() => {
    console.log(address);
  }, [isConnected]);
  const sign = async () => {
    let tokenId = 1;
    let to = '0xe7911A3B3647B4723320502B25B21aEe78eAfeb0';
    let player = '001002003004005006007008009010011012';
    let hash = await ethers.utils.solidityKeccak256(
      ["uint256", "address", "string"],
      [tokenId, to, player]
    );
    console.log("hash= " + hash); // 0x8b939d18a1d2a152f82a5edb0af94e6b4bdb4b959f6f4863e73fa77931519371

    firma = await signMessage(hash, address)
    .then((signature) => {
      console.log("Firma:", signature);
      return signature;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
    
    console.log("firma= " + firma); // 
  };
  async function signMessage(hash, address) {
    // Conectar al proveedor de la billetera Injected Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    // Solicitar al usuario que apruebe la conexión y acceda a su cuenta
    await provider.send("eth_requestAccounts", []);
  
    // Obtener el objeto Signer de la dirección especificada
    const signer = provider.getSigner(address);
  
    // Firmar el mensaje
    const signature = await signer.signMessage(hash);
  
    return signature;
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative flex flex-col place-items-center gap-8 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[200px] after:w-[260px] after:translate-x-1/3 after:bg-gradient-conic   after:blur-2xl after:content-[''] before:from-transparent before:to-blue-700/10 after:from-sky-900 after:via-[#0141ff]/40 before:lg:h-[360px]">
        <p className="text-3xl font-bold tracking-wider">
          {"<Ready to code />"}
        </p>
        <ConnectButton />
        <Notificacions />

        <button onClick={sign}>Sign</button>
      </div>
    </main>
  );
}
