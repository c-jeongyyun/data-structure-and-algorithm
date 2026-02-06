
/**
인접한 두집 털면 x 
훔칠 수 있는 돈의 최댓값

순환 -> 어디서 시작하는지는 관계없음

3번 털었을 때의 최댓값
=> 0, 1 털었을 때의 최댓값 + 3번 돈

5번 털었을 때
=> 0 ~ 3번 모두 봐야하나? 
- 한칸 건너뛰거나 두칸 건너뛰거나일거같다... (직감)

[상태 정의]
dp[i] = i번째 집까지 고려하였을 때 훔친 최댓값 (!== i번째 집을 털었을 때의 최댓값 아님)
- i번째 집을 털지 않았을 때: i-1번째 집을 털었을 때의 최댓값을 그대로 가져감
- i번째 집을 털었을 때: i-2번째 집까지의 최댓값 + i번째 집의 돈 을 얻게됨. 

[상태 전이 방정식]
dp[i] = Math.max(dp[i-1],dp[i-2] + money[i])  

// 마지막 집과 첫번째 집을 모두 방문할 수 없음. => 범위 조절
// - 0번째부터 방문: 마지막 집 x
// - 1번째부터 방문: 마지막 집 O


[기저값]
case1)
dp[0] = money[0]

case2)
dp[1] = money[1]
*/

function solution(money) {
    // 0번째 ~ n-2번째
    const dp1 = new Array(money.length).fill(0);
    dp1[0] = money[0];
    dp1[1] = money[0];
    
    
    for(let i = 2 ; i < money.length-1; i++){
        dp1[i] = Math.max(dp1[i-1], dp1[i-2] + money[i] ) 
    }
    // 1번째 ~ n-1번째
    const dp2 = new Array(money.length).fill(0);
    dp2[0] = 0;
    dp2[1] = money[1];
    
    for(let i = 2 ; i < money.length; i++){
        dp2[i] = Math.max(dp2[i-1], dp2[i-2] + money[i] ) 
    }
    
    return Math.max(dp1[money.length-2], dp2[money.length-1]);    
}
