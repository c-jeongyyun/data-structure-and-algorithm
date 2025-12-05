/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
 /**

 방1) stack 사용하기
 맨 처음에 만난 것을 맨 마지막에 사용해야하므로 LIFO에 해당하는 stack이 적합한 구조.
 1. 순회하며 stack에 하나씩 쌓기
 2. 마지막에 도달하면 stack에서 하나씩 꺼내어 다시 리스트 만들기
 * 시간복잡도: 스택 넣기 n, 스택 빼기 n -> O(2n) => O(n)
 * 공간복잡도: n개면 n칸 차지 => O(n)
 
 > Lesson Learn)
   링크드 리스트의 노드는, 노드이자 그 노드를 헤드로 가지고 있는 리스트와 마찬가지이다. 
   새로운 리스트를 만들 때, 기존의 next 정보를 포함하고 있던 노드를 그대로 추가한다면 순환 리스트가 될 가능성이 있으므로 주의할 것.

 방2) 재귀
 - 재료: 나
 - 반복 행위: 나를, 이미 reversed된 내 뒤 리스트의 꽁무니에 붙인다.
 - 종료조건: 내가 마지막 노드인 경우 or 최초부터 빈 리스트인 경우

 > Lesson Learn)
   재귀적 사고에 익숙해지기. 원하는 결과물이 함수를 통해 나온다고 가정하고 재귀가 가능한지 생각해보기.
   종료조건 잘 생각해보고 정하기.
   재귀과정 중 성능 최적화할 수 있는 방법 고민 - ex. 함수에 넣은 인자가 함수의 작동으로 인해 값이 변경되었을 경우까지 고려해보기 

.
.
.

[풀이 확인 후 추가]
방3) 처음부터 순회하며 리스트의 연결관계만 바꿔주기
prev 저장
next 끊고 next 따로 저장
prev를 현재의 next로 연결

1--->2--->3--->4
1<---2    3--->4
1<---2<---3    4

이전, 현재, 다음 노드만 알고 있으면 된다. 
*시간복잡도: 크기가 n인 리스트 순회 -> O(n)
*공간복잡도: 고정된 갯수의 변수만 사용하므로 O(1)
 
> Lesson Learn)
  주요로직과 갱신로직 명확하게 구분하여 생각하기. 안그러면 헷갈림.
  주요로직 머릿속에 명확히 하고 구현들어가기
  가지고 있는 변수중에서 리스트의 head로 사용할 수 있는게 있는지 확인해기. 너무 어렵게 생각했음.
*/

/*방법 1 - stack 활용하기*/
// function reverseList(head: ListNode | null): ListNode | null {
//     const stack:ListNode[] = [];

//     // stack에 넣기
//     while(head){
//         // push
//             stack.push(head);

//         // head 갱신
//             head = head.next;
//     }

//     const newListHead = new ListNode();
//     let currentNode = newListHead;

//     // 다시 리스트 만들기
//     while(stack.length){
//         currentNode.next = new ListNode(stack.pop()?.val);
//         currentNode = currentNode.next;
//     }

//     console.log(newListHead);
//     return newListHead.next;
// };


/* 방법 2 - 재귀 */
// function reverseList(head: ListNode | null): ListNode | null {
//     if(!head || !head.next){
//         return head;
//     }

//     /* 내 코드 */
//     // const reversedList = reverseList(head.next);

//     // let tailNode = reversedList;
    
//     // while(tailNode.next){
//     //     tailNode = tailNode.next;
//     // }

//     // tailNode.next = new ListNode(head.val, null);
//     // return reversedList


//     /* 최적화 코드 */
//     const newTailNode = head.next;
//     const reversedList = reverseList(newTailNode);
//     head.next = null;
//     newTailNode.next = head;

//     return reversedList;
// };

/* 방법3 */
// 1    2--->3--->4
// n<---1    2--->3--->4
// 1<---2<---3    4
// 1<---2<---3    4

function reverseList(head: ListNode | null): ListNode | null {

    let prev:ListNode | null = null;
    
    while(head){
        const tempNext = head.next;
        head.next = prev;

        // 갱신
        prev = head;
        head = tempNext;
    }
    
    return prev;
};