/*
두 팀
같은 곳을 다른 순서로 방문 
먼저 순회마친 팀 승리

각 장소는 이진트리의 노드

[노드 특징]
서로 다른 x값, 같은 레벨이면 같은 y값 
자식y < 부모y
왼쪽 서브트리 - x값 더 작음
오쪽 서브트리 - x값 더 큼.

이진트리 -> 전위순회 , 후위순회


---
노드 번호: idx+1

---
[todo]
1. 노드 좌표 보고 이진 트리 만들기
2. 순회

[이진트리 만들기]
y값 제일 큰게 루트
루트의 x보다 x가 큰게 right tree 
루트의 x보다 x가 작은게 left tree 

각 tree 별로 가장큰게 그 다음 자식
...

---
[놓친점]
문제 조건을 무시하고 이진트리를 무조건 배열로만 구현하려고 함.
현재 문제 조건 상, 노드가 한쪽 가지로만 쏠리는 skewed tree 형태가 가능함.
이 경우, 트리의 최대 높이는 n이 되고, 높이가 n인 이진트리를 배열로 표현하기 위해서는 
배열의 길이가 2^n-1 이 됨. n의 최댓값이 10,000이므로, 2^100000 - 1 크기의 배열이 생성됨. 
skewed tree이 경우, 낭비되는 공간이 많을 뿐만 아니라 매우 긴 배열이 필요하므로 메모리가 부족해짐.
따라서, 이진트리를 배열 형태가 아닌 연결 리스트 형태로 구현해야 메모리를 효율적으로 사용할 수 있음.


*/


function solution(nodeinfo) {
    const nodes = nodeinfo.map((node,idx) => ({
        x:node[0], 
        y:node[1],
        val: idx+1,
        left: null, 
        right: null 
    })).sort(({x:x1,y:y1}, {x:x2, y:y2}) => y2-y1 || x1 - x2)
    
    
    /* 트리 만들기 단계 */
    const root = nodes[0];
    

    for(let idx=1; idx< nodes.length; idx++){
        let node = nodes[idx];
        let curNode= root;
        
        while(true){
            if(curNode.x < node.x){
                if(curNode.right){
                    curNode = curNode.right;
                    continue;
                }else{
                    curNode.right = node;
                    break;
                }
            }else{
                 if(curNode.left){
                    curNode = curNode.left;
                    continue;
                }else{
                    curNode.left = node;
                    break;
                }
            }
        }
        
       
    }
    
    
    /* 순회 단계 */
    // 전위
    const preorder = [];
    const iteratePreorder = (node)=>{
        if(node===null) return ;
        preorder.push(node.val);
        iteratePreorder(node.left)
        iteratePreorder(node.right)   
    }
    iteratePreorder(root)
    
    const postorder = [];
    const iteratePostorder = (node)=>{
         if(node===null) return ;
        iteratePostorder(node.left)
        iteratePostorder(node.right)   
        postorder.push(node.val);
    }
    iteratePostorder(root)

    return [preorder, postorder];
}