// See
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions
export default function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, '');
}
