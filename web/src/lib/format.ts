export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatLatency(value: number): string {
  return `${value.toFixed(value >= 10 ? 1 : 2)}s`;
}

export function verdictTone(status: 'correct' | 'incorrect' | 'timeout' | 'error'): string {
  if (status === 'correct') return 'text-glow';
  if (status === 'incorrect') return 'text-ember';
  if (status === 'timeout') return 'text-rose';
  return 'text-rose';
}

export function truncateMiddle(value: string, max = 64): string {
  if (value.length <= max) return value;
  const head = Math.floor((max - 3) / 2);
  const tail = max - 3 - head;
  return `${value.slice(0, head)}...${value.slice(-tail)}`;
}
