import { useState } from 'react';

import PageLayout from '@/layouts/PageLayout';
import JoinTeam from '@/components/pages/my-team/JoinTeam';
import LeagueDetails from '@/components/pages/my-team/LeagueDetails';

export default function JoinPage() {
  const [hasTeam, setHasTeam] = useState(false);

  return (
    <PageLayout title="Unirme" className="flex flex-col gap-16 py-6 px-8" bgGradient>
      <h2 className="font-bold text-3xl text-center">LIGA PLATZI</h2>
      {hasTeam && <LeagueDetails />}
      <JoinTeam updateHasTeam={setHasTeam} />
    </PageLayout>
  );
}
