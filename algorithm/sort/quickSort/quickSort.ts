// * 시간복잡도: O(nlogn)
//  - 중간 값을 pivot으로 설정하였을 경우, 쪼개는 횟수 k : n = 2^k => k=log_2 n
//  - 쪼갠거 비교하여 합칠 때마다 배열 모두 순회해야 함
//  => 따라서, 최적일 때 O(nlogn)
//
//  - 만약 최댓값 또는 최솟값을 계속 pivot으로 설정하였다면:
//      - 최대 n번 쪼개게 됨
//      - 쪼갠거 비교하여 합칠 때마다 배열 모두 순회해야 함(n)
//      => 따라서, 최악일 때 O(n^2) 

// * 공간복잡도 : O(n)

// pivot 을 잡고, pivot 보다 작은것(left), 같은것(equal), 큰것(right) 을 분류해 합친다.
export const quickSort = (input:number[])=>{
    if(input.length <=1) return input;

    const pivot = input[Math.floor(input.length/2)];
    const left:number[] = []
    const equal:number[] = []
    const right:number[] = []

    input.forEach(val =>{
        if(pivot > val){
            left.push(val);
        }else if(pivot === val){    
            equal.push(val);
        }else{
            right.push(val);
        }
    })

    const sortedLeft = quickSort(left);
    const sortedRight = quickSort(right);
    
    return [...sortedLeft, ...equal, ...sortedRight]

}