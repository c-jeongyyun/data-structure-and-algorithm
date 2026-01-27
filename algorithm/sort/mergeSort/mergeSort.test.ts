import { describe, test, expect } from "bun:test";
import { mergeSort } from "./mergeSort";

describe("mergeSort", () => {
  test("should sort an unsorted array in ascending order", () => {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const expected = [11, 12, 22, 25, 34, 64, 90];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle an already sorted array", () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle a reverse sorted array", () => {
    const input = [5, 4, 3, 2, 1];
    const expected = [1, 2, 3, 4, 5];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle an array with duplicate values", () => {
    const input = [3, 5, 3, 1, 5, 2, 1];
    const expected = [1, 1, 2, 3, 3, 5, 5];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle an array with a single element", () => {
    const input = [42];
    const expected = [42];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle an empty array", () => {
    const input: number[] = [];
    const expected: number[] = [];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle an array with two elements", () => {
    const input = [2, 1];
    const expected = [1, 2];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle an array with negative numbers", () => {
    const input = [3, -1, -5, 0, 2, -3];
    const expected = [-5, -3, -1, 0, 2, 3];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should handle an array with all same elements", () => {
    const input = [7, 7, 7, 7, 7];
    const expected = [7, 7, 7, 7, 7];
    expect(mergeSort(input)).toEqual(expected);
  });

  test("should not modify the original array", () => {
    const input = [3, 1, 2];
    const inputCopy = [...input];
    mergeSort(input);
    expect(input).toEqual(inputCopy);
  });

  test("should handle a large array", () => {
    const input = [38, 27, 43, 3, 9, 82, 10];
    const expected = [3, 9, 10, 27, 38, 43, 82];
    expect(mergeSort(input)).toEqual(expected);
  });
});
