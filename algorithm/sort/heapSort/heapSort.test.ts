import { describe, test, expect } from "bun:test";
import { heapSort, heapify } from "./heapSort";

describe("heapSort", () => {
  test("should sort an unsorted array in ascending order", () => {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const expected = [11, 12, 22, 25, 34, 64, 90];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle an already sorted array", () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle a reverse sorted array", () => {
    const input = [5, 4, 3, 2, 1];
    const expected = [1, 2, 3, 4, 5];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle an array with duplicate values", () => {
    const input = [3, 5, 3, 1, 5, 2, 1];
    const expected = [1, 1, 2, 3, 3, 5, 5];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle an array with a single element", () => {
    const input = [42];
    const expected = [42];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle an empty array", () => {
    const input: number[] = [];
    const expected: number[] = [];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle an array with two elements", () => {
    const input = [2, 1];
    const expected = [1, 2];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle an array with negative numbers", () => {
    const input = [3, -1, -5, 0, 2, -3];
    const expected = [-5, -3, -1, 0, 2, 3];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle an array with all same elements", () => {
    const input = [7, 7, 7, 7, 7];
    const expected = [7, 7, 7, 7, 7];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should not modify the original array", () => {
    const input = [3, 1, 2];
    const inputCopy = [...input];
    heapSort(input);
    expect(input).toEqual(inputCopy);
  });

  test("should handle an array that forms a valid heap", () => {
    const input = [9, 5, 6, 2, 3];
    const expected = [2, 3, 5, 6, 9];
    expect(heapSort(input)).toEqual(expected);
  });

  test("should handle a large array", () => {
    const input = [12, 11, 13, 5, 6, 7, 3, 1, 9, 2, 8, 4, 10];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    expect(heapSort(input)).toEqual(expected);
  });
});

describe("heapify", () => {
  test("should swap parent with left child when left child is larger", () => {
    const arr = [1, 5, 3];
    heapify(arr, 0);
    expect(arr[0]).toBe(5);
  });

  test("should swap parent with right child when right child is larger", () => {
    const arr = [1, 3, 5];
    heapify(arr, 0);
    expect(arr[0]).toBe(5);
  });

  test("should not swap when parent is already the largest", () => {
    const arr = [9, 5, 6];
    heapify(arr, 0);
    expect(arr).toEqual([9, 5, 6]);
  });

  test("should handle index out of bounds", () => {
    const arr = [1, 2, 3];
    const result = heapify(arr, 10);
    expect(result).toEqual([1, 2, 3]);
  });

  test("should handle leaf node (no children)", () => {
    const arr = [5, 3, 8];
    heapify(arr, 2);
    expect(arr).toEqual([5, 3, 8]);
  });

  test("should recursively heapify after swap", () => {
    const arr = [1, 5, 3, 4, 6];
    heapify(arr, 0);
    expect(arr).toEqual([5, 6, 3, 4, 1]);
  });

  test("should handle array with single element", () => {
    const arr = [42];
    heapify(arr, 0);
    expect(arr).toEqual([42]);
  });

  test("should handle empty array", () => {
    const arr: number[] = [];
    const result = heapify(arr, 0);
    expect(result).toEqual([]);
  });
});
