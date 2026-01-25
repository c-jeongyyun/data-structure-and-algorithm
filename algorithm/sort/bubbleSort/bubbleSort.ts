// * 시간복잡도: O(n^2)

export const bubbleSort = (input:number)=>{
    
    const arr = [...input]
    // 나와 내 다음에 있는 애 비교.
    // k회차 때는 0부터 k-1까지 위의 알고리즘을 반복
    for(let i = 0; i< arr.length; i++){
        for(let j = 0; j< arr.length - i - 1;j++ ){
            if(arr[j] > arr[j+1] )
                [ arr[j+1] ,arr[j]] = [arr[j], arr[j+1]]
        }
    }

    return arr;
}