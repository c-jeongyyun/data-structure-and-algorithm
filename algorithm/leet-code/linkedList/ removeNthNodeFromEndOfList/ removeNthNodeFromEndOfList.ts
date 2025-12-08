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

import { ListNode } from "../class";

 /**
방법1)
 끝에서 n번째 노드를 지워야 한다.
 노드 개수 최대 30개 - 링크드리스트 크기가 l이라고 하였을 때, 공간복잡도 l이어도 성능에 무리 없다고 판단됨.
 1. stack에 모두 담기
 2. n번 pop -> 제거 대상
 3. 한번 더 pop -> 이 노드의 next를 제거 대상의 next로 변경하기
 * 공간복잡도: O(l)
 * 시간복잡도: O(l)
=> 개선: l와 n 값으로 인덱스 위치 바로 알 수 있음. 굳이 stack에서 pop 안해도 됨...

[풀이 본 후]
방법2) 
공간복잡도 낮추기
1. 첫번째 순회 => 링크드 리스트 크기 파악(l)
2. 두번째 순회 => 뒤에서 n번째 === 앞에서 l-n+1 번째 임. / 뒤에서 n-1 번째 노드의 next -> 뒤에서 n번째 노드로 변경해주기
 * 공간복잡도: O(1)
 * 시간복잡도: O(l)

방법3)
방법1에서 공간복잡도 더 낮추기
* 0 0 0 0 0
(dummy node 있다는 가정) 
모든 노드 저장할 필요 없이 n+1 개의 노드만 저장하면 된다.
=> 앞에서 부터 채워나가되, n+1 개 이상이면 먼저 들어간 것부터 빼주면 됨 -> FIFO -> Queue
1. n+1개 우선 채우기
2. n+1개 이후 부터는 앞에서 하나씩 빼가면서 뒤에 하나씩 추가 
3. queue의 맨 첫번째 데이터가 삭제할 대상 바로 앞에꺼
 * 공간복잡도: O(n)
 * 시간복잡도: O(l)

방법4)
한번의 순회로 해결하기
* 0 0 0 0 0

포인터를 두개 둔다.
첫번째 포인터가 n번 움직인 이후, n+1번째부터 두번째 포인터 이동 시작.
첫번째 포인터가 끝에 다다랐을 때, 두번째 포인터는 뒤에서 n-1번째를 가리키고 있음.
 * 공간복잡도: O(1)
 * 시간복잡도: O(l)


 > Lesson Learn
 - dummy node를 맨 앞에 추가함으로서, node가 1개인 경우의 예외 케이스를 일관되게 처리할 수 있다.
 - 공간복잡도 더 줄일 수 있는지 확인하기
 - 더 단순한 방법 우선 떠올리기 (ex. stack 보다 array를 먼저 떠올리기)
 */


/* 방법1 */
// 1-1 초기구현
function removeNthFromEnd1_1(head: ListNode | null, n: number): ListNode | null {
    const stack: ListNode[] = [];
    let node = head;

    while(node){
        stack.push(node);
        node = node.next;
    }

    for(let i = 0;i < n - 1;i++){
       stack.pop();
    }

    const target = stack.pop();
    const beforeTarget = stack.pop();

    if(beforeTarget){
        beforeTarget.next = target.next;
        return head;
    }else return target.next;
};


// 1-2 초기구현 최적화
function removeNthFromEnd1_2(head: ListNode | null, n: number): ListNode | null {
    const arr: ListNode[] = [];
    let node = head;

    while(node){
        arr.push(node);
        node = node.next;
    }

    const l = arr.length

    const target = arr[l-n];
    const beforeTarget = arr[l-n-1];

    if(beforeTarget){
        beforeTarget.next = target.next;
        return head;
    }else return target.next;
};

/* 방법2 */
function removeNthFromEnd2(head: ListNode | null, n: number): ListNode | null {
    let node = head;

    let length = 0;
    
    while(node){
        node = node.next;
        length++;
    }
 
    let dummy = new ListNode(0, head);
    node = dummy;

    for(let i = 0 ; i < length - n ; i++){
       node=node.next;
    }

    node.next = node.next?.next; 

    return dummy.next;
};

/* 방법3 */
function removeNthFromEnd3(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(undefined, head);
    let node = dummy;
    const queue:ListNode[] = [];

    for(let i=0;i<n+1;i++){
        queue.push(node);
        node = node.next;
    }

    while(node){
        queue.shift();
        queue.push(node);
        node = node.next;
    }

    queue[0].next = queue[0].next.next;

    return dummy.next;
};


/* 방법4 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(undefined, head);
    let p1 = dummy;
    let p2 = dummy;

    let count = 0;

    while(p1){
        count++;

        console.log(count);
        p1 = p1.next;

        if(count > n + 1){
            p2 = p2.next;
        }
    }

    p2.next = p2.next?.next;

    return dummy.next;
};


