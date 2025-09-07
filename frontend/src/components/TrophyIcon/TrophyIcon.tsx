import { RANK } from '../../constants/rank';
import type { Theme } from '../../interfaces/Theme';
import leafIcon from '../LeafIcon/LeafIcon';

const getSmallTrophyIcon = (icon: string, color: string, count: number): string => {
  const leftXPosition = 7;
  const rightXPosition = 68;
  const getIcon = (x: number) => `
    <svg
      x="${x}"
      y="35"
      width="65"
      height="65"
      viewBox="0 0 30 30"
      fill="${color}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${icon}
    </svg>`;

  if (count === 1) {
    // Double Rank
    return getIcon(rightXPosition);
  }

  if (count === 2) {
    // Triple Rank
    return `${getIcon(leftXPosition)}${getIcon(rightXPosition)}`;
  }

  // Single Rank
  return '';
};

const getTrophyIcon = (theme: Theme, rank = RANK.UNKNOWN): string => {
  let color = theme.DEFAULT_RANK_BASE;
  let rankColor = theme.DEFAULT_RANK_TEXT;
  let backgroundIcon = '';
  let gradationColor = `
    <stop offset="0%" stop-color="${theme.DEFAULT_RANK_BASE}"/>
    <stop offset="50%" stop-color="${theme.DEFAULT_RANK_BASE}"/>
    <stop offset="100%" stop-color="${theme.DEFAULT_RANK_SHADOW}"/>
  `;
  const { ICON_CIRCLE } = theme;

  if (rank === RANK.SECRET) {
    rankColor = theme.SECRET_RANK_TEXT;
    gradationColor = `
      <stop offset="0%" stop-color="${theme.SECRET_RANK_1}"/>
      <stop offset="50%" stop-color="${theme.SECRET_RANK_2}"/>
      <stop offset="100%" stop-color="${theme.SECRET_RANK_3}"/>
    `;
  } else if (rank.slice(0, 1) === RANK.S.toString()) {
    color = theme.S_RANK_BASE;
    rankColor = theme.S_RANK_TEXT;
    backgroundIcon = leafIcon(theme.LAUREL);
    gradationColor = `
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="70%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${theme.S_RANK_SHADOW}"/>
    `;
  } else if (rank.slice(0, 1) === RANK.A.toString()) {
    color = theme.A_RANK_BASE;
    rankColor = theme.A_RANK_TEXT;
    backgroundIcon = leafIcon(theme.LAUREL);
    gradationColor = `
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="70%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${theme.A_RANK_SHADOW}"/>
    `;
  } else if (rank === RANK.B) {
    color = theme.B_RANK_BASE;
    rankColor = theme.B_RANK_TEXT;
    gradationColor = `
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="70%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${theme.B_RANK_SHADOW}"/>
    `;
  }
  const icon = `
    <path d="M7 10h2v4H7v-4z"/>
    <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z"/>
    <path fill-rule="evenodd" d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/>
    <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z"/>
    <circle
      cx="8"
      cy="6"
      r="4"
      fill="${ICON_CIRCLE}"
    />
    <text
      x="6"
      y="8"
      font-family="Courier, Monospace"
      font-size="7"
      fill="${rankColor}"
    >
      ${rank.slice(0, 1)}
    </text>
  `;
  const optionRankIcon = getSmallTrophyIcon(icon, color, rank.length - 1);

  return `
    ${backgroundIcon}
    ${optionRankIcon}
    <defs>
      <linearGradient id="${rank}" gradientTransform="rotate(45)">
      ${gradationColor}
      </linearGradient>
    </defs>
    <svg
      x="28"
      y="20"
      width="100"
      height="100"
      viewBox="0 0 30 30"
      fill="url(#${rank})"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${icon}
    </svg>
  `;
};

export default getTrophyIcon;
