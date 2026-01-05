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

 */

function isAnagram(s: string, t: string): boolean {
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