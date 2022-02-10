import minMaxNormalization from "./index"

test("minMaxNormalization", () => {
  expect(minMaxNormalization([10], [3, 6], [10, 70])).toStrictEqual([3])
  expect(minMaxNormalization([20], [3, 6], [10, 70])).toStrictEqual([3.5])
  expect(minMaxNormalization([70], [3, 6], [10, 70])).toStrictEqual([6])

  expect(minMaxNormalization([1, 2, 3, 4, 5])).toStrictEqual([
    0, 0.25, 0.5, 0.75, 1
  ])
  expect(minMaxNormalization([6, 12], [0, 1], [0])).toStrictEqual([0.5, 1])
  expect(minMaxNormalization([1, 1, 1, 1, 1])).toStrictEqual([1, 1, 1, 1, 1])
  expect(minMaxNormalization([0, ...Array(50).fill(1), 50])).toStrictEqual([
    0,
    ...Array(50).fill(0.02),
    1
  ])
})
