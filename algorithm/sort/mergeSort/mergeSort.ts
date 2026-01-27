// * 시간복잡도: O(nlogn)
//  - 쪼개는 횟수 k회: 2^k = n -> k = log_2 n
//  - 한번 쪼개진 것 합칠 때마다 n개의 원소 비교
//  => 따라서, nlogn

// * 공간복잡도: O(n)
//  - 쪼개진 배열 비교하며 합칠 때, 새로운 배열에다 할당함.

// 배열을 최대한 쪼갬 -> 합치는 과정에서 정렬(두 배열을 비교해가며 크기순으로 배열에 집어넣기)
export const mergeSort = (input:number[]):number[] =>{
    if(input.length <= 1) return input;

    const mid = Math.floor(input.length/2);
    const left = input.slice(0,mid);
    const right = input.slice(mid);

    const mergedLeft = mergeSort(left);
    const mergedRight = mergeSort(right);


    return merge(mergedLeft, mergedRight);
}

const merge =(left:number[], right:number[])=>{
    const arr = [];
    
    let i = 0;
    let j =0;

    while(i < left.length && j <right.length){
        if(left[i]< right[j]){
            arr.push(left[i++])
        }else{
            arr.push(right[j++])
        }

    }
    return [...arr, ...left.slice(i), ...right.slice(j)];
}