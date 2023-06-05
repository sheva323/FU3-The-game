import { useEffect, useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import PageLayout from '@/layouts/PageLayout';
import JoinTeam from '@/components/pages/my-team/JoinTeam';
import LeagueDetails from '@/components/pages/my-team/LeagueDetails';
import leagueABI from '../../artifacts/LeagueABI.json';
import { fetchSigner } from '@wagmi/core';
import { useAccount } from 'wagmi'
import { leagueAddress } from '@/helpers/Constants';
export default function JoinPage() {
  const [hasTeam, setHasTeam] = useState(false);
  const [teams, setTeams] = useState([]);
  const [leagueDetails, setLeagueDetails] = useState(null);
  const { address } = useAccount();

  useEffect(() => {
    fetchLeagueInfo();
    console.log(address);
  }, []);
  interface Item {
    id: string;
    name: string;
    points: string;
    players: string[];
  }

  const fetchLeagueInfo = async () => {
    try {
      //const contractAddress = "0xd5838859744F6d8BDaa627A4c5Cb300E9FBEFE04";
      const signer = await fetchSigner();
      const contract = new ethers.Contract(leagueAddress, leagueABI, signer ? signer : undefined);
      let transaction = await contract.getTeams();
      console.log(transaction);
      let teams : Item[] = [];
      for (let i = 0; i < transaction.length; i++) {
        const item = {
          id: BigNumber.from(transaction[i].points._hex).toString(),
          name: transaction[i].name,
          points: BigNumber.from(transaction[i].points._hex).toString(),
          players: transaction[i].players,
        }
        teams.push(item);
      }
      
      organizeTeams(teams);
      if(address) checkIfIsplayer(contract);
      const leagueDetails = await contract.getLeagueInfo() ;
      console.log(leagueDetails);
      const league = {
        name: leagueDetails[0],
        maxTeams:  BigNumber.from(leagueDetails[1]).toString(),
        minTeams:  BigNumber.from(leagueDetails[2]).toString(),
        prize:  BigNumber.from(leagueDetails[3]).toString(),
      }
      console.log(league);
      setLeagueDetails(league);
    } catch (error) {
      console.log('error reading teams');
    }
  }
  const checkIfIsplayer = async (contract: ethers.Contract) => {
    const isPlayer = await contract.isAddressInTeam(address) ;
    console.log(isPlayer);
    setHasTeam(isPlayer);
  }
  const organizeTeams = (teams : any) => {
    teams.sort((a : any, b : any) => Number(b.points) - Number(a.points));
    setTeams(teams);
  }
  return (
    <PageLayout title="Unirme" className="flex flex-col gap-16 py-6 px-8" bgGradient>
      <h2 className="font-bold text-3xl text-center">LIGA PLATZI</h2>
      {address ? 
      <>
        {hasTeam && <LeagueDetails />}
        <JoinTeam 
          updateHasTeam={setHasTeam} 
          leagueDetails={leagueDetails}
          teams={teams}
          hasTeam={hasTeam}
        />
      </>:<h2 className="font-bold text-3xl text-center">Por favor conecta tu Wallet</h2>}
    </PageLayout>
  );
}
