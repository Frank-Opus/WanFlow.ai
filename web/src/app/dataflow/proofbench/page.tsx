import { redirect } from 'next/navigation';
import { WanFlowBenchmarkOpsApp } from '@dataflow/proofbench';
import { getCurrentSession } from '@/lib/auth/guards';

export default async function DataFlowProofbenchPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect('/dataflow/proofbench/login?next=%2Fdataflow%2Fproofbench');
  }

  return (
    <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <WanFlowBenchmarkOpsApp />
      </div>
    </main>
  );
}
