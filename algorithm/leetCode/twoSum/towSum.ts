// 두 값의 합이 target이 나오는 조합을 찾기
/**
방법1) 다 더해본다. - 이중 for 문
*시간복잡도: O(n^2) => 시간초과남

방법2) 관점 바꾸기
arr[i] + arr[j] = target
인 쌍을 찾아야 하는데, i의 관점으로 보면
target - arr[i] 인 값이 배열에 존재하는지 확인하고, 
배열에 존재한다면 몇 번째 인덱스인지 알아내면 된다.
i: 0 ~ arr.length -1 => O(n)
target - arr[i] 값 찾기: Hash map 일 경우 O(1)으로 줄일 수 있음. 

*시간복잡도: O(n)

- 주의: [3,3] target:6 과 같이 같은 값이 두번 나온다면 Map 으로 저장할 때 후자의 인덱스만 남는 것 아닌가?
        => 맞다. 그치만 문제의 제약사항 상, 정답쌍은 1개 밖에 없으므로, 같은 숫자가 3개 이상 나올 수 없고, 같은 배열인자를 두번이상 사용할 수 없기 때문에, 즉 같은 인덱스를 두번이상 조회할 필요가 없기 때문에, Map 으로 저장 시 후자의 인덱스만 남아도 문제 해결에 영향을 미치지 않는다.



 */


function twoSum1(nums: number[], target: number): number[] {
    for(let i = 0 ; i < nums.length ; i++ ){
        for(let j=i+1; j<nums.length; j++){
            if((nums[i] + nums[j]) === target) return [i, j]
        }
    }
};


function twoSum(nums: number[], target: number): number[] {
    
    const map = new Map<number, number>();

    for(let i = 0 ; i < nums.length ; i++ ){
        map.set(nums[i], i);
    }

    for(let i = 0 ; i < nums.length ; i++ ){
        const complement = target - nums[i];
        if(map.has(complement)){
            const j = map.get(complement);
            if(i!== j) return [i, map.get(complement)]
        }
    }
       
};