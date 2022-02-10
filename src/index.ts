const minMaxNormalization = (
  dataSet: Array<number>,
  scale: [number, number] = [0, 1],
  forceMinMaxValues?: [number?, number?]
) => {
  const maxValue = forceMinMaxValues?.[1] ?? Math.max(...dataSet)
  const minValue = forceMinMaxValues?.[0] ?? Math.min(...dataSet)

  const diff = maxValue - minValue
  if (diff === 0) return dataSet.map(_ => scale[1])

  const normalizeDatum = (datum: number) =>
    scale[0] + ((datum - minValue) * (scale[1] - scale[0])) / diff

  return dataSet.map(normalizeDatum)
}

export default minMaxNormalization
