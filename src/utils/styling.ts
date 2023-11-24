export function mergeStyles(...styles: (string | undefined | false)[]): string {
  return styles.filter((s) => s).join(" ")
}
