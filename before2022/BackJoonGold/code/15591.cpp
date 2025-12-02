/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>
#include <queue>
#include <list>
using namespace std;



int main()
{
    int N,Q,r;
    int i;
    
    // graph init
    cin >> N >> Q;
    vector<list<pair<int,int>>> videoG(N+1);
    
    int v1,v2, u;
    for(i=0;i<N-1;i++){
        cin >> v1 >> v2 >> u ;
        videoG[v1].push_back(pair<int,int>(v2,u));
        videoG[v2].push_back(pair<int,int>(v1,u));
    }
    
    
    list<pair<int,int>>:: iterator it;
    pair<int,int> parent;
    
    
    // find related videos 
    for(i=0;i<Q;i++){
        cin >> r >> v1;
        
        int cnt=0;
        vector<int> usados(N+1,0);
        queue<pair<int,int>> q;
        q.push(pair<int,int>(v1,-1));
        
        while(!q.empty()){
            
            parent = q.front();
            
            for(it =videoG[parent.first].begin(); it != videoG[parent.first].end();it++){
                if(usados[(*it).first]!=0)
                    continue;
                    
                if(parent.second!=-1 && usados[parent.first]<(*it).second){
                    usados[(*it).first] = usados[parent.first];
                    

                }else if(parent.second==-1){
                    usados[(*it).first] = (*it).second;
                    //cout << usados[(*it).first];
                }
                if(usados[(*it).first] >= r) cnt++;
                    
                q.push(*it);
            }
            q.pop();
            
        }
        cout<<cnt<<endl;
        
    }
    

    return 0;
}
 