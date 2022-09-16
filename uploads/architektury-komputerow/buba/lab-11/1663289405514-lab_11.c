//---------------------------------------------------------------
// Program lab_11 - Architektury Komputerów
//
// To compile&link: gcc -O3 -o lab_11 lab_11.c eval_time.o
// To run:          ./lab_11
//
//---------------------------------------------------------------

#include <stdio.h>
#include <math.h>

#include "eval_time.h"

#define SIZE 2048			//rozmiar glownych macierzy

//#define nb 32				//rozmiar bloku alg. blokowego

static double a[SIZE*SIZE];
static double b[SIZE*SIZE];
static double c[SIZE*SIZE];
static double d[SIZE*SIZE];

static double e[SIZE*SIZE];

void dgemm_naive(int,double*,double*,double*);
void dgemm_unroll4(int,double*,double*,double*);
void dgemm_blocked(int,double*,double*,double*);

void block(int,int,int,int,double*,double*,double*);

unsigned int nb;

int main(void)
{
	unsigned int i,j,n,f, block, size;
	double time_tabl[3][3];

	//n=SIZE;

	for( size = 128; size <= 1024; size <<= 1 ) {
	// rozmiar tablicy
		n = size;
	//liczba operacji zmiennoprzecinkowych
		f = 2*(unsigned long)n*(unsigned long)n*(unsigned long)n; 

		for(i=0;i<n;++i)	//wypelnij a i b jakimis wartosciami poczatkowymi
		    for (j=0;j<n;++j)
		    {
			a[j+i*n]=(double)(i+j*n);
			b[j+i*n]=(double)(j+i*n);
		    }

		//c i d zostaw wyzerowane

		init_time();
		dgemm_naive(n,a,b,c);
		read_time(time_tabl[0]);

		printf("N=%-4d  naive   = %7.3lf s  GFLOPS = %.3lf\n", n, time_tabl[0][1], (double)f/time_tabl[0][1]/1.0e9 );

		init_time();
		dgemm_unroll4(n,a,b,d);
		read_time(time_tabl[1]);

		printf("N=%-4d  unroll4 = %7.3lf s  GFLOPS = %.3lf\n", n, time_tabl[1][1], (double)f/time_tabl[1][1]/1.0e9 );

		// sprawdzenie czy oba algorytmy daly ten sam wynik

		for (i=0;i<n*n;++i) 
		    if (fabs(c[i]-d[i])>1.0e-9) {printf("Error!\n"); return -1;}


		for( block = 4; block <= 1024; block <<= 1 )
			if( block < n ) {
				nb = block;

				init_time();
				dgemm_blocked(n,a,b,e);
				read_time(time_tabl[2]);

				printf("N=%-4d  b_%-4d  = %7.3lf s  GFLOPS = %.3lf\n", n, nb, time_tabl[2][1], (double)f/time_tabl[2][1]/1.0e9 );
		
				// sprawdzenie czy oba algorytmy daly ten sam wynik
				for (i=0;i<n*n;++i) 
					if (fabs(c[i]-e[i])>1.0e-9) {printf("Error at %d = %lf!\n", i, fabs(c[i]-e[i]) ); return -1;}
					else e[i] = 0.0;

		}
		for (i=0;i<n*n;++i) { c[i] = 0.0; d[i] = 0.0; } 

	}
	return(0);
}

void dgemm_naive(int n, double* A, double* B, double* C)
{
register int i,j,k;
register double cij;

for(i=0;i<n;++i)
    for(j=0;j<n;++j)
    {
	cij=C[i+j*n]; 			// cij = C[i][j]
	for(k=0;k<n;++k)
	    cij+=A[i+k*n]*B[k+j*n]; 	// cij += A[i][k]*B[k][j]
	C[i+j*n]=cij; 			// C[i][j] = cij
    }
}

void dgemm_unroll4(int n, double* A, double* B, double* C)
{
register int i,j,k;
register double reg0,reg1,reg2,reg3;

for(i=0;i<n;i+=2)
    for(j=0;j<n;j+=2)
    {
	reg0=reg1=reg2=reg3=0.0;
	
	for(k=0;k<n;++k)
	{
	    reg0+=A[i+k*n]*B[k+j*n];
	    reg1+=A[i+1+k*n]*B[k+j*n];
	    reg2+=A[i+k*n]*B[k+(j+1)*n];
	    reg3+=A[i+1+k*n]*B[k+(j+1)*n];
	}
	
	C[i+j*n]+=reg0;
	C[i+1+j*n]+=reg1;
	C[i+(j+1)*n]+=reg2;
	C[i+1+(j+1)*n]+=reg3;
    }
}

void dgemm_blocked(int n, double* A, double* B, double* C)
{
register int bi,bj,bk;

for(bi=0;bi<n;bi+=nb)
    for(bj=0;bj<n;bj+=nb)
	for(bk=0;bk<n;bk+=nb)
	    block(n,bi,bj,bk,A,B,C);
}

void block(int n, int bi, int bj, int bk, double *A, double *B, double *C)
{

register int i,j,k;
register double cij;

for(i=bi;i<bi+nb;++i)
    for(j=bj;j<bj+nb;++j)
    {
	cij=C[i+j*n];
	for(k=bk;k<bk+nb;++k)
	    cij+=A[i+k*n]*B[k+j*n];
	C[i+j*n]=cij;
    }
}
