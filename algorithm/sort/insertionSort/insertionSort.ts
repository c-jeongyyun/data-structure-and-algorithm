// * 시간복잡도: O(n^2), but 거의 정렬된 배열들어오면 최대 O(n)

// 이미 정렬된 구간 내에 내가 삽입될 위치를 찾는 것
// 이미 정렬된 구간에서 큰것부터 비교하며, 나보다 크면 한칸씩 밀다가, 나보다 작은 것 발견하면 그보다 오른쪽에 배치
export const insertionSort = (input:number[])=>{
    const arr =[...input]

    // 첫번째 요소는 이미 정렬되었다고 가정
    for(let i =1; i<input.length;i++){
        const current = arr[i];
        let j = i - 1;
        while(j>=0 && current <arr[j]){
            arr[j+1] = arr[j];
            j--;
        }

        arr[j+1] = current;
    }

    return arr;
}