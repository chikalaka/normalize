export const normalizeBy = normalizeByNumber => normalizeNumber =>
  (normalizeNumber / normalizeByNumber)

test("normalizeBy", () => {
  expect(normalizeBy(100)(10)).toBe(10)
  expect(normalizeBy(12)(6)).toBe(50)
  expect(normalizeBy(100)(0)).toBe(0)

  const arr = [1,2,3,4]
  expect(arr.map(normalizeBy(10))).toEqual([1/10,2/10,3/10,4/10])
})

const normalizeArray = ({
                          arr = [],
                          valueKey = "value",
                          keyName = "percentage"
                        }) => {
  if (arr.length === 0) return arr

  const maxValue = _.maxBy(arr, item => item[valueKey])[valueKey]
  const normalizer = normalizeBy(maxValue)
  return arr.map(item => ({ ...item, [keyName]: normalizer(item[valueKey]) }))
}

export const sortAndNormalizeArray = ({
                                        arr = [],
                                        valueKey = "value",
                                        keyName = "percentage"
                                      }) => {
  const sorted = _.sortBy(arr, [valueKey]).reverse()
  return normalizeArray({ arr: sorted, valueKey, keyName })
}

describe("sortAndNormalizeArray", () => {
  it("Should normalize array according to the biggest value", () => {
    const arr = [{ value: 5 }, { value: 12 }]
    expect(sortAndNormalizeArray({ arr })).toEqual([
      { value: 12, percentage: 100 },
      { value: 5, percentage: 41.66666666666667 }
    ])
  })
  it("Empty array", () => {
    const arr = []
    expect(sortAndNormalizeArray({ arr })).toEqual([])
  })
})

export const normalizeToSize = ({ from, to, number = 1 }) => {
  const divider = from.max === from.min ? 1 : from.max - from.min
  const normalized = (number - from.min) / divider
  return normalized * (to.max - to.min) + to.min
}

test("normalizeToSize", () => {
  const sizes = {
    from: {
      max: 70,
      min: 10
    },
    to: {
      max: 6,
      min: 3
    }
  }

  const size1 = normalizeToSize({ ...sizes, number: 40 })
  expect(size1).toEqual(4.5)

  const size2 = normalizeToSize({ ...sizes, number: 20 })
  expect(size2).toEqual(3.5)

  const sizeMinimum = normalizeToSize({ ...sizes, number: 70 })
  expect(sizeMinimum).toEqual(6)

  const sizeMaximum = normalizeToSize({ ...sizes, number: 10 })
  expect(sizeMaximum).toEqual(3)
})

export const normalizeToSize = ({
                                  from,
                                  to,
                                  number = 1
                                }: {
  from: { min: number; max: number }
  to: { min: number; max: number }
  number: number
}) => {
  const divider = from.max === from.min ? 1 : from.max - from.min
  const normalized: number = (number - from.min) / divider
  return normalized * (to.max - to.min) + to.min
}

test("normalizeToSize", () => {
  const sizes = {
    from: {
      max: 70,
      min: 10
    },
    to: {
      max: 6,
      min: 3
    }
  }

  const size1 = normalizeToSize({ ...sizes, number: 40 })
  expect(size1).toEqual(4.5)

  const size2 = normalizeToSize({ ...sizes, number: 20 })
  expect(size2).toEqual(3.5)

  const sizeMinimum = normalizeToSize({ ...sizes, number: 70 })
  expect(sizeMinimum).toEqual(6)

  const sizeMaximum = normalizeToSize({ ...sizes, number: 10 })
  expect(sizeMaximum).toEqual(3)
})