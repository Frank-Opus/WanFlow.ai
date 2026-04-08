import { WanFlowBenchmarkOpsApp } from '@dataflow/proofbench';

export default function DataFlowProofbenchPage() {
  return (
    <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <WanFlowBenchmarkOpsApp />
      </div>
    </main>
  );
}
