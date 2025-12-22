// 코인 여러개 쓸 수 있음.
// 합이 특정한 값이 나오기 위해 필요한 가장 적은 코인의 수
// 보유하고 있는 코인으로 만들 수 없는 값이라면 -1 반환


        
/** 
// 풀이 본 이후
방1) DP
x원을 만드는 데에 필요한 최소 코인 수 = (x-c)원을 만드는데에 필요한 최소 코인 수 + 1
(c: 코인 하나의 값)
dp(x) = min(dp(x),dp(x-c) + 1) 
-> 큰 문제의 최적해가 작은 문제의 최적해로부터 만들어진다. 
=> DP 임


방2) DFS - 모든 경우의 수를 확인한다.
코인 값은 최소 1원이기 때문에, 코인 개수는 amount개수보다 커질 수 없음.
코인 개수가 amount+1 미만일 때를 기준으로 검토하면 된다. 

아래와 같은 방식으로 반복을 진행한다면 DFS에 해당 
   1

   1 1

   1 1 1
   1 1 2
   1 1 5

   1 2

   1 2 1
   1 2 2
   1 2 5

   1 5

   ... 


최악의 경우, depth가 amount 만큼 내려감.
각 단계별로 코인 중 하나 선택.

* 시간복잡도: O(c^a) (c: 코인수, a:amount)
* 공간복잡도: O(a) (호출스택 최대 a depth 만큼 쌓이므로)

=> Timeout 발생

방3) BFS - 경우의 수를 확인하되, BFS로 검토 한다면? 
코인개수 1개인 경우
1 
2
5
 
코인개수 2개인 경우 
1 1 
1 2
1 5
2 1
2 2
2 5 
.... 
탐색 과정 중 먼저 답이 나온다면 그게 최소이므로 더이상 진행할 필요 없음.

주의 - 1 2 / 2 1 은 같은 경우임. 중복줄여야 성능 올라감.

*시간복잡도: 중복 계산 시 O(c^a), 중복계산 제외 시 O(ca)
-- 중복계산 제외 시 O(ca)인 이유: 중복 제거하였으니 total 값 당 코인 개수만큼 반복함. 가질수 있는 total값 개수: a+1(0~amount) 따라서,O((a+1)*c) = O(ac) 임
 */

/* 방법1 */
function coinChange(coins: number[], amount: number): number {
    const INF = amount + 1
    const dp = Array(amount + 1).fill(INF);
    dp[0] = 0

    for (let i = 0; i < dp.length; i++) {
        for (const val of coins) {
            if (i - val >= 0) {
                dp[i] = Math.min(dp[i], dp[i - val] + 1);
            }
        }
    }

    return dp[amount] === INF ? -1 : dp[amount]
};

/* 방법2 - dfs */
function coinChange2(coins: number[], amount: number): number {

    let minCount = Infinity; // 초기화

    const dfs = (total: number, count) => {
        // 최종 금액 도달 했다면, count 갱신

        if (total === amount) {
            minCount = Math.min(minCount, count);
            return
        }


        // 최종 금액 도달 못했다면
        for (let val of coins) {
            if (total + val <= amount) {
                dfs(total + val, count + 1);
            }
        }
    }

    dfs(0, 0)

    return minCount === Infinity ? -1 : minCount;

};

/* 방법3 - bfs */
function coinChange3(coins: number[], amount: number): number {
    const queue: [number, number][] = [];
    const visited = new Set<number>();

    queue.push([0, 0]);

    while (queue.length > 0) {
        const [total, count] = queue.shift();

        if (total === amount)
            return count;


        if (visited.has(total))
            continue;


        visited.add(total)
        for (const val of coins) {
            if (total + val <= amount) {
                queue.push([total + val, count + 1]);
            }
        }

    }

    return -1;


};

// Just 고민의 흔적... 
// [알고리즘 구상]
// 가장 적게 써야한다.

// 제일 큰 값의 몫 + 나머지 그 다음 큰 값의 몫 + ... => 끝까지 갔을 때 나머지 없으면 된거
// coin들 -> 내림차순으로 정렬
// *시간복잡도: sort에 드는 비용
// 만약, 결과가 -1이라면, 마지막에서 두번째 것 개수 하나 줄여서 시도 -> ... -> 마지막에서 세번째 것 개수

// 가능한 모든 경우의 수 test
/**
[7, 3, 2]. =  23
 3  0  1.  =
 2  3  0   
 2. 2. 
 */

// 예외 case) 
// 11 : [7, 3, 2] => 내 알고리즘대로 하면 amount > 0 이므로 -1, but 정답은 3
/**
[7, 3, 2]. =  11
 1  1  0   x
 1  0  2   3
 0  3  1   4 

충족하면 그다음부터는 안돌아도 됨.
코드로 어떻게 구현하면 좋을까.
약간 트리같은 구조 아닌가? - dfs 탐색일거 같은데
[7] 3.     2.           1.                0
[3] 0   3,2,1,0    5,4,3,2,1,0    7,6,5,4,3,2,1,0
[2] 1.  0  

*/