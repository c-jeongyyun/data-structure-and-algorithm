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

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

/**
현재 보고 있는 첫번째 리스트의 노드 값과
현재 보고 있는 두번째 리스트의 노드 값을 비교하여, 
새로운 리스트에 하나씩 추가한다.

지금 전략은 맞는데, 링크드리스트를 제대로 활용하지 못하고 있음.

[링크드리스트에 값 추가하는 법]
*초기 
1. 헤드노드 만든다. 
2. 노드 생성한다.
3. 헤드 노드에 노드 추가한다. (head의 next에 새로 생성한 노드를 넣음)
4. 현재 보고 있는 노드의 값을 갱신한다. 

*그다음 부터
1. 노드를 생성한다.
2. 현재 보고 있는 노드의 next에, 새로 생성한 노드를 넣는다.
---


case1) 첫번째 리스트의 노드 값과 두번째 리스트의 노드 값이 모두 존재하는 경우
case2) 첫번째 리스트의 노드 값과 두번째 리스트의 노드 값 중 하나가 null인 경우

// Q1.헤드노드 어떻게 제낄까?
// - 헤드노드인지 어떻게 구별해??? 
// Q2.깊은 복사 얕은 복사 헷갈림


 */

// Lesson Learn 
/**
* - list1, 2는 한번 순회하면 다시 볼일 없음. - 새로 변수 선언하는 대신 list1, 2를 현재 조회하는 노드로 활용하면 된다.
* - null은 어떤 숫자보다도 작다.
* - 비교대상이 없는 상황이어도 과연 계속 비교를 해야할지? 생각해보기 
*/
// 리뷰 보고 개선 (방법1) - 재귀 - 아~~~ 모르겠어 이해할 때까지 봐 ~~~~~
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if(!list1 || !list2){
        return list1 || list2; 
    }

    if(list1 < list2){
        list1.next = list2;

         mergeTwoLists(list1, list2.next);

        return list1;
    }else {
        list2.next = list1;
        list1  = list1.next;

        return list2;
    }
   
   return mergeTwoLists(list1, list2)

};

// 리뷰 보고 개선 (방법2)
// function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {

//     let newList: ListNode = new ListNode(); // 헤드노드 
//     let newListNode: ListNode | null = newList;

//     while (list1 && list2) {
//         const isList1Bigger = list1.val < list2.val;
//         const newNode = new ListNode(isList1Bigger ? list1.val : list2.val );
//         newListNode.next = newNode;
//         newListNode = newNode;

//         // 갱신
//         if (isList1Bigger) {
//             list1 = list1.next;
//         } else {
//             list2 = list2.next;
//         }
//     }

//     // 둘중 하나가 순회가 끝났다면, 더이상 비교할 필요 없이 남은 것을 이어붙여주면 된다.
//     if(!list1){
//         newListNode.next = list2;
//     }else{
//         newListNode.next = list1;
//     }

//     return newList.next;
// };


// 내 답 (1차)
// function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
//     let firstListNode: ListNode | null = list1;
//     let secondListNode: ListNode | null = list2;

//     let newList: ListNode = new ListNode(); // 헤드노드 
//     let newListNode: ListNode | null = newList;

//     while (firstListNode !== null || secondListNode !== null) {
//         let targetVal: number;

//         if (firstListNode !== null && secondListNode !== null) {
//             targetVal = firstListNode.val < secondListNode.val ? firstListNode.val : secondListNode.val;

//             // 갱신
//             if (firstListNode.val < secondListNode.val) {
//                 firstListNode = firstListNode.next;
//             } else {
//                 secondListNode = secondListNode.next;
//             }

//         } else {
//             if (firstListNode !== null) {
//                 targetVal = firstListNode.val;
//                 firstListNode = firstListNode.next;
//             } else {
//                 targetVal = secondListNode.val;
//                 secondListNode = secondListNode.next;
//             }
//         }

//         const newNode = new ListNode(targetVal);
//         newListNode.next = newNode;

//         // 갱신
//         newListNode = newNode;

//     }

//     return newList.next;
// };