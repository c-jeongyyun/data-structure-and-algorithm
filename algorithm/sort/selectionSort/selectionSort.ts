// * 시간복잡도: O(n^2)

export const selectionSort = (input:number[])=>{
    const arr = [...input]
    
    // 주어진 범위 스캔 때려서 최솟값 찾고 그 범위의 첫번째 값과 바꿈.
    // 그걸 n번 반복
    for(let i = 0 ;i < arr.length ;i++){
        let minIdx = i;
        for(let j=i; j< arr.length ; j++){
            if(arr[j] < arr[minIdx]){
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i] ]
    }
    return arr;

}