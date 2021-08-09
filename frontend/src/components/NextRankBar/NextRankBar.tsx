const getNextRankBar = (
  title: string,
  percentage: number,
  color: string,
): string => {
  const maxWidth = 80;

  return `
    <style>
    @keyframes ${title}RankAnimation {
      from {
        width: 0px;
      }
      to {
        width: ${maxWidth * percentage}px;
      }
    }
    #${title}-rank-progress{
      animation: ${title}RankAnimation 1s forwards ease-in-out;
    }
    </style>
    <rect
      x="15"
      y="101"
      rx="1"
      width="${maxWidth}"
      height="3.2"
      opacity="0.3"
      fill="${color}"
    />
    <rect
      id="${title}-rank-progress"
      x="15"
      y="101"
      rx="1"
      height="3.2"
      fill="${color}"
    />
  `;
};

export default getNextRankBar;
