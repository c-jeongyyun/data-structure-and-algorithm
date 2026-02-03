// 한 행씩 내려옴 -> 같은 열을 연속해서 밟을 수 없음.
// 마지막 행까지 모두 내려왔을 때, 얻을 수 있는 점수의 "최대값"

/**
* 1 -> 8 = 9 
* 2 -> 8 = 10
* 3 -> 8 = 11
* 5 -> 7 = 12 

=> 2행 : 12가 최댓값

* 9 -> 3  = 12
* 10 -> 4 = 14
* 11 -> 4 = 15
* 12 -> 4 = 16 // 이게 최대
*/

/**
[상태 정의]
dp[i][j] = i행에서 j열을 골랐을 때의 최댓값

[상태전이방정식]
dp[i][j] = Math.max(dp[i-1][k]+land[i][k]) (k = 0 ~ 3 && k!==j)

[초깃값]
d[0][0] ~ d[0][0] 

*/

function solution(land) {
    // 초기화
    const dp = Array.from({length: land.length}, (_,i) => i ===0? land[0] : [0,0,0,0]);
    
    // 상태 전이 방정식
    for(let i = 1; i<land.length; i++){
        for(let j = 0; j < 4 ; j++){
            const temp = [dp[i-1][0], dp[i-1][1],dp[i-1][2],dp[i-1][3]]
            temp[j] = -1;
            dp[i][j] = Math.max(...temp) + land[i][j];
        }
    }

    return Math.max(...dp.pop());
}