/* 개선 ver */
// *개선사항: string 순회 간소화, 공간 복잡도 개선
// 짝이 있고, 나오는 순서가 있다.
// 짝이 있다 - stack
// 나오는 순서가 있다 - 음수가 되는 순간 바로 out
// *시간복잡도: O(n) 
// *공간복잡도: O(1)
function solution(s){
    let ssum = 0;
    for(let c of s){
        c==="(" ? ssum++ : ssum--;
        
        if(ssum<0)break;
    }
    return ssum ===0;
}

/* 초기 ver */
// *시간복잡도: O(n) 
// *공간복잡도: O(n)
// function solution(s){
//     let answer = true;
    
//     const stack=[];
//     for(let i=0; i < s.length; i++){
//         if(s[i]==="("){
//             stack.push("(");
//         }else{
//             const result = stack.pop();
            
//             if(!result){
//                 answer = false;
//                 break;
//             }
//         }
//     }
    
//     if(stack.length > 0) answer= false;

//     return answer;
// }

