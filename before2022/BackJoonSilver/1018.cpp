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
	int i, j, k;
	int vecLen;

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
	int totalB = 0;
	int totalW;

	for (i = 0; i < n - 7; i++) {

		totalB = 0;
		totalW = 0;

		while (!eightQ.empty()) {
			eightQ.pop();
		}

		// 첫번째 판 계산 - 한 열씩 8번 계산
		for (j = 0; j < 8; j++) {
			int oneCol = 0;
			for (k = 0; k < 8; k++) {
				counter(&oneCol, k, j, chess[i + k][j]);
			}
			if (j % 2 == 0) {
				eightQ.push(8- oneCol);
			}
			else {
				eightQ.push(oneCol);
			}
			totalB += oneCol;
		}

		totalW = size - totalB;

		if (i != 0) {
			int minInTwo = min(totalB, totalW);
			if (minInTwo < mininum) {
				mininum = minInTwo;
			}
		}
		else {
			mininum = min(totalB, totalW);
			//if (mininum == 0) {
			//	cout << 0;
			//	return 0 ;
			//}
		}

		for (j = 1; j < m - 7; j++) {
			int newCol = 0;
			// 새로운 열 계산 
			for (k = 0; k < 8; k++) {
				counter(&newCol, k, 7, chess[i + k][j + 7]);
			}

			if (j % 2 == 1) {
				eightQ.push(8 - newCol);
			}
			else {
				eightQ.push(newCol);
			}

			///******** 여기서 계속 틀렸음 ㅜㅜ ********/
			totalB = totalW - eightQ.front() + newCol;
			//if (j % 2 != 0)
			//	totalB = totalW - (8 - eightQ.front()) + newCol;
			//else
			/****************************************/
			// queue의 첫번째 값이 항상 (8 - front)로 되는게 아니라
			// 홀수 번째 일때만 그렇게 된다는 것을 간과했음. 
			// queue에 있는 모든 값을 변환하는 방식이 아니라, 
			// 총 합만 64에서 뺐었으니, queue에 있는 값은 사용할 때 
			// 적절히 변환해 주어야 한다.

			totalW = size - totalB;

			 

			int minInTwo = min(totalB, totalW);
			cout << "totalB , totalW : " << totalB << " " << totalW<<endl;
			//cout << "minInTwo" << minInTwo << " ";
			if (minInTwo < mininum) {
				mininum = minInTwo;
				//if (mininum == 0) {
				//	cout << 0;
				//	return 0 ;
				//}
			}
		}
		cout << endl;
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