#include <iostream>
#include <queue>
using namespace std;

int n;
int w;
int L;
int main()
{
    int i;
    
    // init
    cin >> n >> w >> L;
    
    queue<int> trucks;
    queue<int> bridge;
    
    for(i =0 ;i<n;i++){
        int weight;
        cin >> weight;
        trucks.push(weight);
    }
    
    for(i=0;i<w;i++){
        bridge.push(0);
    }
    
    int sum=0;
    int sec =0;
    int cnt=0; // 다리 건넌 트럭 수 
    
    while(!bridge.empty()){
        
        sum-=bridge.front();
        bridge.pop();
        sec++;
        
        if(trucks.empty()) continue; // 트럭 큐 비었을 때는 bridge 큐에서 pop만 
        
        if(sum + trucks.front() > L){
            bridge.push(0);
        }else{
            sum+=trucks.front();
            bridge.push(trucks.front());
            trucks.pop();
        }
    }

   cout << sec;
    return 0;
}
