import dataNormalize from "./index"

describe("dataNormalize", () => {
  // it("plain array of numbers", function () {
  //   expect(
  //     dataNormalize([10], { scale: [3, 6], forceMinMaxValues: [10, 70] })
  //   ).toStrictEqual([3])
  //   expect(
  //     dataNormalize([20], { scale: [3, 6], forceMinMaxValues: [10, 70] })
  //   ).toStrictEqual([3.5])
  //   expect(
  //     dataNormalize([70], { scale: [3, 6], forceMinMaxValues: [10, 70] })
  //   ).toStrictEqual([6])
  //
  //   expect(dataNormalize([1, 2, 3, 4, 5])).toStrictEqual([
  //     0, 0.25, 0.5, 0.75, 1
  //   ])
  //   expect(
  //     dataNormalize([6, 12], { scale: [0, 1], forceMinMaxValues: [0] })
  //   ).toStrictEqual([0.5, 1])
  //   expect(dataNormalize([1, 1, 1, 1, 1])).toStrictEqual([1, 1, 1, 1, 1])
  //   expect(dataNormalize([0, ...Array(50).fill(1), 50])).toStrictEqual([
  //     0,
  //     ...Array(50).fill(0.02),
  //     1
  //   ])
  // })

  it("array of objects", function () {
    const dataSet1 = [
      { value: 1, name: "a" },
      { value: 2, name: "b" },
      { value: 3, name: "c" },
      { value: 4, name: "d" },
      { value: 5, name: "e" }
    ]
    expect(
      dataNormalize(dataSet1, { byValue: "value", newKey: "newKey" })
    ).toStrictEqual([0, 0.25, 0.5, 0.75, 1])
    const dataSet2 = [
      { a: { value: 1, name: "a" } },
      { b: { value: 2, name: "b" } },
      { c: { value: 3, name: "c" } },
      { d: { value: 4, name: "d" } },
      { e: { value: 5, name: "e" } }
    ]
    // expect(dataNormalize(dataSet2)).toStrictEqual([0, 0.25, 0.5, 0.75, 1])
  })
})
