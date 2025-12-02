/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>
#include <queue>
#include <vector>
#include <queue>

using namespace std;
//16918 봄버맨

int main()
{
    int R,C,N;
    int i,j;
    int sec=1;
    char bomb;
    pair<int,int> coord;
    
    vector<pair<int,int>> around ={pair<int,int>(-1,0),pair<int,int>(0,-1),pair<int,int>(1,0),pair<int,int>(0,1)};
    
    vector< queue<pair<int,int>>>bombsPlaceQ(2);
    vector< queue<pair<int,int>>>waitPlaceQ(2);
    vector<int> MARKER={0,1,2,3}; // 0 : no bomb ,1 : bombs for first group, 2: bombs for second group , 3: surrounding place(child)
    
    cin >> R >> C >>N;
    
    vector<vector<int>> marking (R,vector<int>(C,0));
    
    
    while(sec <=N){
        
        // 1,2초 
        if(sec==1 || sec==2){
            for(i=0;i<R;i++){
                for(j=0;j<C;j++){
                    
                    // 1초 - 배열 초기화 + firstBombs queue에 넣기 (first group)
                    if(sec==1){
                        cin >> bomb;
                        
                        if(bomb=='O'){
                        marking[i][j] = MARKER[1];
                        bombsPlaceQ[0].push(pair<int,int>(i,j));
                        }
                        
                    // 2초 - secondBombs queue에 넣기 (second group)
                    }else{
                        
                        if(marking[i][j]==0){
                            marking[i][j] = MARKER[2];
                            bombsPlaceQ[1].push(pair<int,int>(i,j));
                        }
                    }
                        
                }
                
            }
        
        // 3초 이후     
        }else{
            // 변수 선언 
            int r,c,marker,queIdx;
            
            // 변수 초기화
            if((sec)%4==3 || (sec)%4==0){ // first group
                     marker = MARKER[1];
                     queIdx=0;
                     
             }else{ // second group
                 marker = MARKER[2];
                 queIdx=1;
             }
            
            // exploding timing
            if(sec%2==1){
                 while(!bombsPlaceQ[queIdx].empty()){
                    coord=bombsPlaceQ[queIdx].front();
                    int r= coord.first;
                    int c=coord.second;
                    
                    // 폭탄이 있으면 터트림 - marking 변경 + waiting queue에 넣기 
                    if(marking[r][c]==marker){
                        // 본인 및 주변 폭탄 제거 - marking 0으로 변경 + waiting queue에 넣어주기 
                        marking[r][c]=MARKER[0];
                        waitPlaceQ[queIdx].push(coord);
                        
                        // 주변 지역 가져오기 
                        for(int k = 0;k<4;k++){
                            int tempR=r+around[k].first;
                            int tempC=c+around[k].second;
                            
                            // 유효한 인덱스인 경우 
                            if(tempR>=0 && tempR < R && tempC>=0 && tempC<C){
                                if(marking[tempR][tempC]!=marker && marking[tempR][tempC] != MARKER[3]){
                                    marking[tempR][tempC] = MARKER[3];
                                    waitPlaceQ[queIdx].push(pair<int,int>(tempR,tempC));
                                }
                                bombsPlaceQ[queIdx].push(pair<int,int>(tempR,tempC));
                            }
                        }
                    }else if(marking[r][c]==MARKER[3]){
                         marking[r][c]=MARKER[0];
                    }
                    // queue에서 제거 
                    bombsPlaceQ[queIdx].pop();
                 }
             
             
            // 폭탄 배치 timing 
            }else{
                while(!waitPlaceQ[queIdx].empty()){
                    coord=waitPlaceQ[queIdx].front();
                    waitPlaceQ[queIdx].pop();
                    r= coord.first;
                    c=coord.second;
                    marking[r][c] = MARKER[marker];
                    bombsPlaceQ[queIdx].push(pair<int,int>(r,c));
                        
                }
            }
        }
        sec++;

    }
    
    // result
    for(i=0;i<R;i++){
        for(j=0;j<C;j++){
            marking[i][j]>0 ? cout << "O" : cout << ".";
        }
        cout<<endl;
    }
    

    return 0;
}

