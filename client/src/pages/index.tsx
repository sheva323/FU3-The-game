import Hero from '@/components/Hero';
import PageLayout from '@/layouts/PageLayout';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Web3 from "web3";
export default function Home() {
  const { address, isConnected } = useAccount();
  const env = process.env.PUSH_ENV;
  let firma;
  useEffect(() => {
    console.log(address);
  }, [isConnected]);
  const sign = async () => {
    let tokenId = 1;
    let to = "0x9A3B083855429BB3Fd8a0d3649b0ce39cC27d7F7";
    let player = "001002003004005006007008009010011012";
    let hash = await ethers.utils.solidityKeccak256(
      ["uint256", "address", "string"],
      [tokenId, to, player]
    );
    console.log("hash= " + hash); // 0x8b939d18a1d2a152f82a5edb0af94e6b4bdb4b959f6f4863e73fa77931519371
    // firma = await signMessage(hash.toString(), address?.toString())
    // .then((signature) => {
    //   console.log("Firma:", signature);
    //   return signature;
    // })
    // .catch((error) => {
    //   console.log("Error:", error);
    // });
    // let signer;
    // const web3 = new Web3(window.ethereum);
    // await ethereum.request({ method: "eth_requestAccounts" });
    // const address = await web3.eth.getAccounts().then((res) => (signer = res));
    // firma = await web3.eth.personal.sign(hash.toString(), signer.toString());

    // console.log("firma= " + firma); //
  };
  async function signMessage(hash: any, address: any) {
    // Conectar al proveedor de la billetera Injected Web3
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    // // Solicitar al usuario que apruebe la conexión y acceda a su cuenta
    // await provider.send("eth_requestAccounts", []);

    // // Obtener el objeto Signer de la dirección especificada
    // const signer = provider.getSigner(address);

    // // Firmar el mensaje
    // const signature = await signer.signMessage(hash);

    // return signature;
  }
  return (
    <PageLayout title="Inicio" bgGradient>
      <Hero />
      
    </PageLayout>
  );
}
