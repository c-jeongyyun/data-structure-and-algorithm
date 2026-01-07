/**
s의 모든 문자열이 t에 딱 한번씩 들어가있어야 anagram임

방법1)
- 문자열 길이 다르면:false
- 문자열 길이 같다면:
    가장 단순한 방법)
    s의 문자들 => 모두 배열에 넣기
    배열순회하며 t에 해당 문자 있으면 제거 

    개선 방안)
    - t => Map :문자를 key로 하고, 각 문자당 개수를 value로 넣기
    - s 배열 순회하며, map에 key 있는지, 있다면 문자 당 개수 - 1 / 만약 문자당 개수 0 되면 key 제거.
        => 순회 완료했을 때 map 비어있으면 아나그램.
    *공간복잡도: O(n)
    *시간복잡도: O(n)

방법2)
- 문자열을 정렬하였을 때의 결과가 같으면 된다.

*시간복잡도: O(nlogn)
*공간복잡도: O(n)


방법3) 👍
counter 만들어서 문자열 순회.
s일 때는 해당 알파벳이 가진 unicode -> idx 로 변환 & 그 위치의 값 +1
s일 때는 해당 알파벳이 가진 unicode -> idx 로 변환 & 그 위치의 값 -1

counter 배열이 모두 0으로 채워지면 true

*공간복잡도: O(n)
*시간복잡도: O(n)
 */

function isAnagram1(s: string, t: string): boolean {
    if(s.length !== t.length )return false;

    const tMap = new Map<string, number>();
    for(let ch of t){
        if(tMap.has(ch)){
            tMap.set(ch, tMap.get(ch) + 1);
        }else{
            tMap.set(ch, 1);
        }
    }

    for(let ch of s){
        if(!tMap.has(ch)) return false;

        if(tMap.get(ch) === 1) tMap.delete(ch);
        else tMap.set(ch, tMap.get(ch)-1); 
    }

    return tMap.size ===0 

};


function isAnagram2(s: string, t: string): boolean {
    const sortedS = s.split("").sort().join("");
    const sortedT = t.split("").sort().join("");
    return sortedS === sortedT
};


// 문자 - 유니코드를 UTF-16 코드유닛값으로 변환 -> 값 조정을 통해 인덱스로 사용가능
// 배열 - 타입이 명확하다면, 더 구체적인 자료형을 써서 메모리 공간을 더 효율적으로 사용할 수 있음.
function isAnagram(s: string, t: string): boolean {
    if(s.length !== t.length )return false;

    const counter = new Int32Array(26).fill(0); // 알파벳 개수

    for(let i =0 ;i < s.length ; i++){
        counter[s.charCodeAt(i)-97]++;
        counter[t.charCodeAt(i)-97]--;
    }

    return counter.every(val => val ===0);

};
