function solution(triangle) {
    return Math.max(...triangle.reduce((cost, line, i) =>
        line.map((item, i) => item + Math.max(cost[i - 1] ?? 0, cost[i] ?? 0)), [0]))
}

// 거쳐간 숫자의 합이 가장 큰 경우
// 대각선방향 한칸 왼/오 로만 이동 가능

/**
7-8-1
7-8-0-4
7-3-8

[상태 정의]
dp[i][j] : i번째 행의 j번째 열을 선택했을 때 얻을 수 있는 최댓값


[상태 전이 방정식]
dp[i][j] = Math.max(dp[i-1][j] , dp[i-1][j-1]) + triangle[i][j] 

[초깃값 설정]
dp[0][0] = triangle[0][0]

*/