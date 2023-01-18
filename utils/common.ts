export function formatNumberToUSD(input: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD"
  })
    .format(input)
}
