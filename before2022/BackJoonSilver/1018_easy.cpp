/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, PHP, Ruby,
C#, VB, Perl, Swift, Prolog, Javascript, Pascal, HTML, CSS, JS
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
#include <iostream>
#include <queue>
#include <vector> 

using namespace std;

void counter(int* cnt, int rowIdx, int colIdx, char ch);

int main()
{
	int n, m;
	int i, j, k,l ;

	cin >> n >> m;
	// del \n
	cin.get();

	// memorizing할 내용 
	queue<int> eightQ;

	// 기본 판 
	vector<vector<char>> chess(n);


	// 배열에 전체 판 담기 
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			char ch = cin.get();
			chess[i].push_back(ch);
		}
		cin.get();
	}

	// 8칸씩 보기 - 첫번째 줄 
	int mininum = 0;
	int size = 8 * 8;
	int total = 0;
	int minOfTwo = 0;

	// 행 시작점 변경 
	for (i = 0; i < n - 7; i++) {
		// 열 시작점 변경 
		for (j = 0; j < m - 7; j++) {
			total = 0;
			for (k = 0; k < 8; k++) {
				int oneRow= 0;
				for (l = 0; l < 8; l++) {
					counter(&oneRow, k, l, chess[i + k][j + l]);
				}
				total += oneRow; // 짝수 번째는 검은색 먼저(Standard) 
			}
			//cout << "total : " << total <<endl;
			
			if (i == 0 && j == 0) {
				mininum = min(total, size - total);
			}
			else {
				minOfTwo = min(total, size - total);
				if (minOfTwo < mininum)
					mininum = minOfTwo;
			}
		
		
		}
		
	
	}

	cout << mininum;

	return 0;
}

void counter(int* cnt, int rowIdx, int colIdx, char ch) {
	if (rowIdx % 2 == 0) {
		if (colIdx % 2 == 0 && ch == 'W') (*cnt)++;
		if (colIdx % 2 == 1 && ch == 'B') (*cnt)++;
	}
	else {
		if (colIdx % 2 == 0 && ch == 'B') (*cnt)++;
		if (colIdx % 2 == 1 && ch == 'W') (*cnt)++;
	}

}