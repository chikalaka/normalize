const isFunction = (v: any): v is Function => typeof v === "function"
const isString = (v: any): v is string => typeof v === "string"
const isNumberArray = (v: any[]): v is number[] => typeof v[0] === "number"
const isObject = (v: any): v is object =>
  v && typeof v === "object" && v.constructor === Object

const run = <T = any>(func: ((...args: any[]) => T) | T, ...args: any[]): T =>
  isFunction(func) ? func(...args) : func

type Keys = {
  byValue: string | ((o: object) => string)
  newKey: string
}

type Scales = {
  scale?: [number, number]
  forceMinMaxValues?: [number?, number?]
}

type NumberSet = (dataSet: number[], options: Scales) => number[]
type ObjectSet = (dataSet: object[], options: Scales & Keys) => object[]

interface Func1 {
  (dataSet: number[], options: Scales): number[]
  (dataSet: object[], options: Scales & Keys): object[]
}

type Func2 = NumberSet | ObjectSet

type Func3<T extends number[] | object[]> = T extends number[]
  ? NumberSet
  : ObjectSet

const dataNormalize: Func3<number[] | object[]> = (dataSet, options) => {
  // if (!isNumberArray(dataSet) && (!options.byValue || !options.newKey)) {
  //   console.error("Insufficient arguments have passed")
  //   return dataSet
  // }

  const { scale = [0, 1], forceMinMaxValues } = options || {}

  const getValue = (o: { [index: string]: any }) => {
    const { byValue } = options
    return isString(byValue) ? o[byValue] : byValue?.(o)
  }

  const values = isNumberArray(dataSet) ? dataSet : dataSet.map(getValue)

  const maxValue = forceMinMaxValues?.[1] ?? Math.max(...values)
  const minValue = forceMinMaxValues?.[0] ?? Math.min(...values)

  const diff = maxValue - minValue

  const normalizeDatum = (datum: number) => {
    if (diff === 0) return scale[1]
    return scale[0] + ((datum - minValue) * (scale[1] - scale[0])) / diff
  }

  if (isNumberArray(dataSet)) return dataSet.map(normalizeDatum)

  return dataSet.forEach((o: { [index: string]: any }) => {
    o[options.newKey] = normalizeDatum(getValue(o))
  })
}

export default dataNormalize
