/** 
가능한 모든 permutation을 반환하라
[a,b,c]
[a,c,b]
[b,a,c]
[b,c,a]
[c,a,b]
[c,b,a]

방법1) 재귀 
자기자신 & 나머지 permute한 것 => 재귀
- base: 배열에 1개 있음 => 자기자신 반환
- 반복로직:
    input 배열 => 맨 마지막꺼 pop하고 , permute 결과 받기 
    permute 순회하면서, [맨 마지막꺼, permute 결과 element] 조합한 다음 return
*시간복잡도: O(n*n!) // 재귀호출 한번당 함수 복사 => O(n) & tree 깊어질 때마다 노드 개수:n, n-1, n-2 ... -> O(n!)
*공간복잡도: O(n*n!) // 결과 배열을 모두 메모리 상에 올려놓는 형태 => 결과는 이중배열: 총 n!개의 요소를 가지고 있으며, 한 배열당 길이는 n 

=> 시간복잡도, 공간복잡도 모두 많이 차지함


방법2) 재귀 - 백트래킹방식(공간복잡도 개선)
순열 결과 하나를 만드는 재귀함수를 만듦.
이 재귀함수의 최종 결괏값들을 배열에 모아서 반환. 
- 재귀함수 내부
    : 새로운 배열을 만들지 않고, swap을 통해 변형. -> 재귀함수 빠져나오면 복구

*/ 

// 방법1 
function permute1(nums: number[]): number[][] {
    if(nums.length === 1){
        return [nums]
    }

    return nums.flatMap(n =>  {
        const partialResult = permute(nums.filter((num,idx) => n!==num));  
        return partialResult.map(r => [n,...r])
    })
};


// 방법 2 
function permute(nums: number[]): number[][] {
    const results:number[][] = []


    const dfs = (start:number)=>{
        if(start === nums.length){
            results.push([...nums]);
        }

        for(let i=start; i< nums.length ;i++){
            swap(i, start, nums)
            dfs(start+1);
            swap(i, start, nums)
        }
    }

    dfs(0);

    return results
}

const swap = (i:number, j:number, arr:number[])=>{
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}