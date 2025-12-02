#include <iostream>
using namespace std;

void calcNum(int* num);

int main(void) {
    int n, a, b;
    cin >> n >> a >> b;

    int r = 1; // round 

    while (n != 1) {
        calcNum(&a);
        calcNum(&b);
        if (a == b)
            break;
        else
            r++;

        calcNum(&n);
    }

    cout << (n == 1 ? -1 : r);

    return 0;
}

void calcNum(int* num) {
    if (*num % 2 == 1)
        *num = *num / 2 + 1;
    else
        *num = *num / 2;
}