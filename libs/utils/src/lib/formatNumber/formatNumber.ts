export function formatNumber(
  value: number,
  locale?: string,
  options: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 4 }
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}
