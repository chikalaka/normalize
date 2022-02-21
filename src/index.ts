const isString = (v: any): v is string => typeof v === "string"
const isNumber = (v: any): v is number => typeof v === "number"
const isNumberArray = (v: any[]): v is number[] =>
  v.length > 0 && typeof v[0] === "number"

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

type objData = {
  objList: Array<T>
  keys: Keys
}

type SimpleData = {
  simpleList: Array<number>
}

type Args = objData | SimpleData

type Func = (args: Args) => Array<T>

interface Func1 {
  (dataSet: number[], options: Scales): number[]
  (dataSet: object[], options: Scales & Keys): object[]
}

type Func2 = NumberSet | ObjectSet

type Func3<T extends number[] | object[]> = T extends number[]
  ? NumberSet
  : ObjectSet

type DataNormalize = <T>(
  dataSet: T[],
  options: T extends number ? Scales : Scales & Keys
) => T[]

type Tes = <T>(a: T[]) => T[]
type TesNum = <T>(
  a: (number | object)[]
) => T extends number ? number[] : object[]

const test: Tes = a => {
  if (isNumberArray(a)) {
    return a.map((x: number) => x + 1)
  }
  return a
}

const dataNormalize: DataNormalize = (dataSet, options) => {
  // if (!isNumberArray(dataSet) && (!options.byValue || !options.newKey)) {
  //   console.error("Insufficient arguments have passed")
  //   return dataSet
  // }
  if (isNumberArray(dataSet)) {
    options
  }

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
  return dataSet

  // return dataSet.map((o: { [index: string]: any }) => {
  //   o[options.newKey] = normalizeDatum(getValue(o))
  // })
}

export default dataNormalize
