#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int i, j, num, cnt;
    int len, n;
    int result = 0;
    bool front;

    cin >> len >> n;

    vector<int> vec;

    // read file - 인덱스 기준으로 
    // 개행 제거 
    cin.get();

    for (i = 0; i < n; i++) {
        cin >> num;
        vec.push_back(num - 1);
    }

    for (i = 0; i < n; i++) {
        int cnt;

        if (vec[i] < len - vec[i]) {
            front = true;
            cnt = vec[i];
        }
        else {
            front = false;
            cnt = len - vec[i];
        }

        result += cnt;
        // renew index
        for (j = i + 1; j < n; j++) {
            vec[j] = front ? (((vec[j] - cnt + len) % len - 1) + len - 1) % (len - 1) : (((vec[j] + cnt + len) % len - 1) + len - 1) % (len - 1);
        }

        len--;
    }

    cout << result;

    return 0;
}
