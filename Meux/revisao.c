#include <stdlib.h>
#include <stdio.h>

int troca(int *x, int *y, int *z);

int main(){

    int a=1, b=2, c=3;

    int *x = &a;
    int *y = &b;
    int *z = &c;

    x = (int *)malloc(sizeof(int));
    y = (int *)malloc(sizeof(int));
    z = (int *)malloc(sizeof(int));

    if(x == NULL || y == NULL || z == NULL){
        printf("Não foi possível alocar memória.\n");
        return 1;
    }

    printf("Antes da troca: a = %d, b = %d, c = %d.\n", *x, *y, *z);
    troca(*x, *y, *z);

    printf("Depois da troca: a = %d, b = %d, c = %d.\n", *x, *y, *z);

    free(x);
    free(y);
    free(z);

    return 0;
}

int troca(int *x, int *y, int *z){
    int temp = *x;
    *x = *y;
    *y = *z;
    *z = temp;
}