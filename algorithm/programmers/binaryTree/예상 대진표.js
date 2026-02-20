// 부전승 x
/*
만나게 되려면?
k번째 라운드에서
각각 2m-1 2m 번이 되었을 때.
=> k+1번째 라운드에서 두 수의 번호가 같아졌을 때.

[k번째 라운드에서의 번호 구하는법]
1 2 3 4 5 6 7 8 
 1   2   3   4
 
짝수: 나누기 2 
홀수: 나누기 2 + 1
=> 개선) Math.ceil(num/2); (둘다 올림 처리하는 것과 결과 같음)

[알고리즘]
1. 가장 단순
k회 직접 실행해서 각 번호가 2m-1, 2m 이 되는지 확인 (둘중 작았던 수가 2m-1 이 되어야 함)
=> 개선: k+1 실행해서 번호 같아지는지 확인
O(n)

*/
function solution(n,a,b)
{
    const getNextNum = (num) => Math.ceil(num/2);
    
    let count = 0;
    
    while(a!==b){
        a = getNextNum(a);
        b = getNextNum(b);
        count++
    }
    
    return count;
}