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

// test("meanNormalization", () => {
//   expect(meanNormalization([1, 2, 3, 4, 5])).toStrictEqual([
//     -0.5, -0.25, 0, 0.25, 0.5
//   ])
//   expect(meanNormalization([0, ...Array(50).fill(1), 50])).toStrictEqual([
//     -0.038461538461538464,
//     ...Array(50).fill(-0.018461538461538463),
//     0.9615384615384616
//   ])
//   expect(meanNormalization([1, 1, 1, 1, 1])).toStrictEqual([0, 0, 0, 0, 0])
// })
//
// test("standardization", () => {
//   expect(standardization([1, 2, 3, 4, 5])).toStrictEqual([
//     -1.414213562373095, -0.7071067811865475, 0, 0.7071067811865475,
//     1.414213562373095
//   ])
//   expect(standardization([0, ...Array(50).fill(1), 50])).toStrictEqual([
//     -0.28559773898876994,
//     ...Array(50).fill(-0.13708691471460957),
//     7.1399434747192485
//   ])
// })
