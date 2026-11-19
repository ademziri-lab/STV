export function sanityUrl(url: string, width: number, quality = 75) {
  return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

export function sanitySrcSet(url: string, widths: number[]) {
  return widths.map((width) => `${sanityUrl(url, width)} ${width}w`).join(', ')
}