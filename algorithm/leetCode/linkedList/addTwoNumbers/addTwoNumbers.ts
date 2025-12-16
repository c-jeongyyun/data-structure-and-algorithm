/**
 방법1) 리스트 하나씩 순회하면서 숫자로 만들기 (리스트 각각 길이 m, n)
 n번째 숫자 => 누적값 += 10**(n-1)*숫자
 두개 모두 숫자로 만들어서 더함 => 다시 10의 (n-1)승씩 나누면서 리스트로 변환

 *시간복잡도: O(max(n,m))
 *공간복잡도: O(1)


 방법2) 리스트 특성 활용하는 법 없나. (리스트 각각 길이 m, n)
 둘다 한번에 순회 
 두개 더함 / 없으면 안더하고
 관건 - 올림처리 어떻게 할래? 10으로 나누었을 때 몫=> 다음노드에 더해줌/ 다음노드 없으면 새로 추가해줌.
 - l1 기준으로 더하다가 끝나면, l2 남은 꽁다리 부분 l1뒤에 붙여주기
 *시간복잡도: O(n)
 *공간복잡도: O(1)
  */


/* 방법2 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const sumHead = l1;
    let tail:ListNode|null

    while(l1!==null){
        const sum = l1.val + (l2?.val ?? 0);
        const share = Math.floor(sum / 10);
        const remainder = sum % 10;
       
        l1.val = remainder;

        if(l1.next){
            l1.next.val+=share;
        }else if(share > 0){
            l1.next = new ListNode(share);
        }

        if(!l1.next){
            tail = l1;
        }

        l1=l1.next;
        l2=l2?.next ?? null;
    }

    // l2 꼬리 남으면, 남은거에 잘라붙여주기
    if(l2){
        tail.next = l2;
    }

    return sumHead
};


