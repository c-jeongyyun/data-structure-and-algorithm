// * 시간 복잡도: O(n log n)
//  - 1단계) O(n) - 높이가 h면 h만큼만 내려감.(낮으면 적게 내려감) 높이 낮을수록 노드개수 많음. => 수학적 연산 하면 O(n)으로 수렴
//  - 2단계) O(n log n) 
//         - 맨 아래 위치한 노드를 루트로 올려서 다시 힙정렬 함. 
//         - 맨 아래 노드는 배열 중 작은 값에 속할 확률이 높음. 
//           그러므로, heapify 시 루트부터 leaf까지 이동하게 될 것임. 
//           => 노드 n개 일 때 완전 이진트리 높이는 log_2 n 이므로, 한번 heapify 시 O(log n) 
//           => 총 n번 수행 => O(n log n)

export const heapSort = (input:number[])=>{
    const arr = [...input];
    // 1단계. 힙 만들기
    // 가장 아래에 있는 부모부터 순회
    for(let i =  Math.floor(input.length/2)-1 ; i>=0;i--){
        heapify(arr, i, arr.length);
    }

    // 2단계. 정렬
    for(let i = arr.length -1 ; i>=0; i--){
        // 맨 위의 것은 항상 최댓값
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // 나머지 요소 가지고 다시 힙 만들기
        heapify(arr, 0, i);
    }
    return arr
}

export const heapify = (arr:number[], idx:number, n:number)=>{
    // 나/왼쪽자식/오른쪽 자식 중 가장 큰게 부모자리에 와야한다.
    // 자식이 더 커서 부모와 자리 바꾼 경우 - 그 부모 다시 heapify
    if(idx >= arr.length) return arr;
    
    let largestIdx = idx;
    const leftIdx = idx*2+1;
    const rightIdx = idx*2+2;
    
    if(leftIdx <n && arr[largestIdx] < arr[leftIdx] ){
        largestIdx = leftIdx;
    }

    if(rightIdx <n && arr[largestIdx] < arr[rightIdx] ){
        largestIdx = rightIdx;
    }

    if(largestIdx!== idx){
        [arr[largestIdx], arr[idx]] = [arr[idx], arr[largestIdx] ];
        heapify(arr,largestIdx, n);
    }

    return arr;
}