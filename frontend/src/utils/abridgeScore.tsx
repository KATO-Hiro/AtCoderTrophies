export default function abridgeScore(score: number): string {
  if (Math.abs(score) < 1) {
    return '0pt';
  }

  if (Math.abs(score) > 999) {
    return `${(Math.sign(score) * (Math.abs(score) / 1000)).toFixed(1)}kpt`;
  }

  return `${(Math.sign(score) * Math.abs(score)).toString()}pt`;
}
