#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int M,N,H;
int i,j,k;
int day=0;
int cnt=0;
int cur=0;

vector<vector<vector<int>>> tomatoes;

struct T{
    int x;
    int y;
    int z;
};

vector<int> dx = {0,0,-1,1,0,0};// 상하좌우위아래
vector<int> dy = {1,-1,0,0,0,0};// 상하좌우위아래
vector<int> dz = {0,0,0,0,1,-1};// 상하좌우위아래

queue<T> bfsQ;

void bfs(){
    int p,q;
    while(cur <cnt && !bfsQ.empty()){
        int size = bfsQ.size();
        
        for(p=0;p<size;p++){
            T t=bfsQ.front();
            bfsQ.pop();
            if(tomatoes[t.z][t.y][t.x]==1)
                continue;
                
            tomatoes[t.z][t.y][t.x]=1;
            cur++;
            
            for(q=0;q<6;q++){
                if(t.x+dx[q]<0 ||t.x+dx[q]>=M ||t.y+dy[q]<0 ||t.y+dy[q]>=N||t.z+dz[q]<0 ||t.z+dz[q]>=H)
                    continue;
                    
                int curX = t.x+dx[q];
                int curY = t.y+dy[q];
                int curZ = t.z+dz[q];
                
                if (tomatoes[curZ][curY][curX]==0){
                    T child={curX,curY,curZ};
                    bfsQ.push(child);
                }
            }
        }
        day++;
        
    }
    
}

int main()
{
    cin>> M>>N>>H;
   
    for(i=0;i<H;i++){
        tomatoes.push_back(vector<vector<int>>(N,vector<int>(M,0)));
    }
    
    for(i=0;i<H;i++){
        for(j=0;j<N;j++){
            for(k=0;k<M;k++){
                int state;
                cin >> state;
                
                if(state==1){
                    T tomato ={k,j,i};
                    bfsQ.push(tomato);
                    cnt++;
                }else if(state==0)
                    cnt++;
                else
                    tomatoes[i][j][k]=state;
            }
        }
    }
    
    bfs();
    
    if(cur<cnt)
        cout<< -1;
    else
        cout <<day -1;
    return 0;
}

