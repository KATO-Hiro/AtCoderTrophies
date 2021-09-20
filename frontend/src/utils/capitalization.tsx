export default function capitalizeString(str: string): string {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}
