//---------------------------------------------------------------
// Program lab_12.c - Architektury Komputerów
//
// To compile&link: gcc -O3 -o lab_12 lab_12.c eval_time.o
// To run:          ./lab_12
//
//---------------------------------------------------------------

#include <stdio.h>
#include <math.h>
#include <immintrin.h>

typedef __m128d m128d;

#include "eval_time.h"

#define SIZE 2048			//rozmiar glownych macierzy

static double a[SIZE*SIZE];
static double at[SIZE*SIZE];

static double b[SIZE*SIZE];

static double c[SIZE*SIZE];
static double d[SIZE*SIZE];

static double e[SIZE*SIZE];

void dgemm_naive(int,double*,double*,double*);
void dgemm_naive_trans(int,double*,double*,double*);
void dgemm_blocked(int,double*,double*,double*);
void dgemm_blocked_trans(int,double*,double*,double*);
void dgemm_unroll4(int,double*,double*,double*);
void dgemm_unroll4_trans(int,double*,double*,double*);
void dgemm_unroll16(int,double*,double*,double*);
void dgemm_unroll16_trans(int,double*,double*,double*);

void block(int,int,int,int,double*,double*,double*);
void block_trans(int,int,int,int,double*,double*,double*);

void transpose(int,double*,double*);

void dgemm_unroll4_sse(int,double*,double*,double*);

unsigned int nb;

int main(void)
{
	unsigned int i, j, n, block, size;
	double time_tabl[3], f;
	char method[20];

	//n=SIZE;

	printf(" N    Method      Time [ms]   MFLOPS\n");

	for( size = 128; size <= 1024; size <<= 1 ) {
		n = size;
		f = 2.0*(unsigned long)n*(unsigned long)n*(unsigned long)n;		//liczba operacji zmiennoprzecinkowych

		for(i=0;i<n;++i)	//wypelnij a i b jakimis wartosciami poczatkowymi
		    for (j=0;j<n;++j)
		    {
			a[j+i*n]=(double)(i+j*n);
			b[j+i*n]=(double)(j+i*n);
		    }
		//c i d zostaw wyzerowane

		init_time();
		dgemm_naive(n,a,b,c);
		read_time(time_tabl);
		printf("%-4d %-12s %9.3lf %8.1lf\n", n, "naive", time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );

		init_time();
		transpose(n,a,at); 		
		dgemm_naive_trans(n,at,b,d);
		read_time(time_tabl);
		printf("%-4d %-12s %9.3lf %8.1lf\n", n, "naivetr", time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );

		// sprawdzenie czy oba algorytmy daly ten sam wynik

		for (i=0;i<n*n;++i) 
		    if (fabs(c[i]-d[i])>1.0e-9) {printf("Error!\n"); return -1;}


		init_time();
		dgemm_unroll4(n,a,b,e);
		read_time(time_tabl);
		printf("%-4d %-12s %9.3lf %8.1lf\n", n, "unroll4", time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );

		// sprawdzenie czy algorytm dal poprawny wynik

		for (i=0;i<n*n;++i) 
		    if (fabs(c[i]-e[i])>1.0e-9) {printf("Error!\n"); return -1;}
		    else e[i] = 0.0;

		init_time();
		transpose(n,a,at); 		
		dgemm_unroll4_trans(n,at,b,e);
		read_time(time_tabl);
		printf("%-4d %-12s %9.3lf %8.1lf\n", n, "unroll4tr", time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );

		// sprawdzenie czy algorytm dal poprawny wynik

		for (i=0;i<n*n;++i) 
		    if (fabs(c[i]-e[i])>1.0e-9) {printf("Error!\n"); return -1;}
		    else e[i] = 0.0;

		init_time();
		dgemm_unroll16(n,a,b,e);
		read_time(time_tabl);
		printf("%-4d %-12s %9.3lf %8.1lf\n", n, "unroll16", time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );

		// sprawdzenie czy algorytm dal poprawny wynik

		for (i=0;i<n*n;++i) 
		    if (fabs(c[i]-e[i])>1.0e-9) {printf("Error!\n"); return -1;}
		    else e[i] = 0.0;

		init_time();
		transpose(n,a,at); 		
		dgemm_unroll16_trans(n,at,b,e);
		read_time(time_tabl);
		printf("%-4d %-12s %9.3lf %8.1lf\n", n, "unroll16tr", time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );

		// sprawdzenie czy algorytm dal poprawny wynik

		for (i=0;i<n*n;++i) 
		    if (fabs(c[i]-e[i])>1.0e-9) {printf("Error!\n"); return -1;}
		    else e[i] = 0.0;

		init_time();
		dgemm_unroll4_sse(n,a,b,e);
		read_time(time_tabl);
		printf("%-4d %-12s %9.3lf %8.1lf\n", n, "unroll4_sse", time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );

		// sprawdzenie czy algorytm dal poprawny wynik

		for (i=0;i<n*n;++i) 
		    if (fabs(c[i]-e[i])>1.0e-9) {printf("Error!\n"); return -1;}
		    else e[i] = 0.0;

		for( block = 4; block <= 1024; block <<= 1 )
			if( block < n ) {
				nb = block;

				init_time();
				dgemm_blocked(n,a,b,e);
				read_time(time_tabl);
				sprintf( method, "b_%d", nb);
				printf("%-4d %-12s %9.3lf %8.1lf\n", n, method, time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );
		
				// sprawdzenie czy algorytm dal poprawny wynik
				for (i=0;i<n*n;++i) 
					if (fabs(c[i]-e[i])>1.0e-9) {printf("Error!\n"); return -1;}
					else e[i] = 0.0;

				init_time();
				transpose(n,a,at); 		
				dgemm_blocked_trans(n,at,b,e);
				read_time(time_tabl);
				sprintf( method, "b_%dtr", nb);
				printf("%-4d %-12s %9.3lf %8.1lf\n", n, method, time_tabl[1]*1.0e3, f/time_tabl[1]/1.0e6 );
		
				// sprawdzenie czy algorytm dal poprawny wynik
				for (i=0;i<n*n;++i) 
					if (fabs(c[i]-e[i])>1.0e-9) {printf("Error at %d = %lf!\n", i, fabs(c[i]-e[i]) ); return -1;}
					else e[i] = 0.0;

		}
		for (i=0;i<n*n;++i) { c[i] = 0.0; d[i] = 0.0; } 

	}
	return(0);
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

void dgemm_unroll4_trans(int n, double* A, double* B, double* C)
{
register int i,j,k;
register double reg0,reg1,reg2,reg3;

for(i=0;i<n;i+=2)
    for(j=0;j<n;j+=2)
    {
	reg0=reg1=reg2=reg3=0.0;
	
	for(k=0;k<n;++k)
	{
	    reg0+=A[k+i*n]*B[k+j*n];
	    reg1+=A[k+(i+1)*n]*B[k+j*n];
	    reg2+=A[k+i*n]*B[k+(j+1)*n];
	    reg3+=A[k+(i+1)*n]*B[k+(j+1)*n];
	}
	
	C[i+j*n]+=reg0;
	C[i+1+j*n]+=reg1;
	C[i+(j+1)*n]+=reg2;
	C[i+1+(j+1)*n]+=reg3;
    }
}

void dgemm_unroll16(int n, double* A, double* B, double* C)
{
register int i,j,k;
register double reg0, reg1, reg2,  reg3,  reg4,  reg5,  reg6,  reg7;
register double reg8, reg9, reg10, reg11, reg12, reg13, reg14, reg15;

for(i=0;i<n;i+=4)
    for(j=0;j<n;j+=4)
    {
	reg0=reg1=reg2=reg3=reg4=reg5=reg6=reg7=reg8=reg9=reg10=reg11=reg12=reg13=reg14=reg15=0.0;
	
	for(k=0;k<n;++k)
	{
	    reg0 +=A[i  +k*n]*B[k+j*n];
	    reg1 +=A[i+1+k*n]*B[k+j*n];

	    reg2 +=A[i+2+k*n]*B[k+j*n];
	    reg3 +=A[i+3+k*n]*B[k+j*n];
		
	    reg4 +=A[i  +k*n]*B[k+(j+1)*n];
	    reg5 +=A[i+1+k*n]*B[k+(j+1)*n];

	    reg6 +=A[i+2+k*n]*B[k+(j+1)*n];
	    reg7 +=A[i+3+k*n]*B[k+(j+1)*n];

	    reg8 +=A[i  +k*n]*B[k+(j+2)*n];
	    reg9 +=A[i+1+k*n]*B[k+(j+2)*n];
	    reg10+=A[i+2+k*n]*B[k+(j+2)*n];
	    reg11+=A[i+3+k*n]*B[k+(j+2)*n];

	    reg12+=A[i  +k*n]*B[k+(j+3)*n];
	    reg13+=A[i+1+k*n]*B[k+(j+3)*n];
	    reg14+=A[i+2+k*n]*B[k+(j+3)*n];
	    reg15+=A[i+3+k*n]*B[k+(j+3)*n];

	}
	
	C[(i+0)+(j+0)*n] +=reg0;
	C[(i+1)+(j+0)*n] +=reg1;
	C[(i+2)+(j+0)*n] +=reg2;
	C[(i+3)+(j+0)*n] +=reg3;

	C[(i+0)+(j+1)*n] +=reg4;
	C[(i+1)+(j+1)*n] +=reg5;
	C[(i+2)+(j+1)*n] +=reg6;
	C[(i+3)+(j+1)*n] +=reg7;

	C[(i+0)+(j+2)*n] +=reg8;
	C[(i+1)+(j+2)*n] +=reg9;
	C[(i+2)+(j+2)*n] +=reg10;
	C[(i+3)+(j+2)*n] +=reg11;

	C[(i+0)+(j+3)*n] +=reg12;
	C[(i+1)+(j+3)*n] +=reg13;
	C[(i+2)+(j+3)*n] +=reg14;
	C[(i+3)+(j+3)*n] +=reg15;
	
    }
}


void dgemm_unroll16_trans(int n, double* A, double* B, double* C)
{
register int i,j,k;
register double reg0, reg1, reg2,  reg3,  reg4,  reg5,  reg6,  reg7;
register double reg8, reg9, reg10, reg11, reg12, reg13, reg14, reg15;

for(i=0;i<n;i+=4)
    for(j=0;j<n;j+=4)
    {
	reg0=reg1=reg2=reg3=reg4=reg5=reg6=reg7=reg8=reg9=reg10=reg11=reg12=reg13=reg14=reg15=0.0;
	
	for(k=0;k<n;++k)
	{
	    reg0 +=A[k+    i*n]*B[k+j*n];
	    reg1 +=A[k+(1+i)*n]*B[k+j*n];

	    reg2 +=A[k+(2+i)*n]*B[k+j*n];
	    reg3 +=A[k+(3+i)*n]*B[k+j*n];
		
	    reg4 +=A[k+    i*n]*B[k+(j+1)*n];
	    reg5 +=A[k+(1+i)*n]*B[k+(j+1)*n];

	    reg6 +=A[k+(2+i)*n]*B[k+(j+1)*n];
	    reg7 +=A[k+(3+i)*n]*B[k+(j+1)*n];

	    reg8 +=A[k+    i*n]*B[k+(j+2)*n];
	    reg9 +=A[k+(1+i)*n]*B[k+(j+2)*n];
	    reg10+=A[k+(2+i)*n]*B[k+(j+2)*n];
	    reg11+=A[k+(3+i)*n]*B[k+(j+2)*n];

	    reg12+=A[k+    i*n]*B[k+(j+3)*n];
	    reg13+=A[k+(1+i)*n]*B[k+(j+3)*n];
	    reg14+=A[k+(2+i)*n]*B[k+(j+3)*n];
	    reg15+=A[k+(3+i)*n]*B[k+(j+3)*n];

	}
	
	C[(i+0)+(j+0)*n] +=reg0;
	C[(i+1)+(j+0)*n] +=reg1;
	C[(i+2)+(j+0)*n] +=reg2;
	C[(i+3)+(j+0)*n] +=reg3;

	C[(i+0)+(j+1)*n] +=reg4;
	C[(i+1)+(j+1)*n] +=reg5;
	C[(i+2)+(j+1)*n] +=reg6;
	C[(i+3)+(j+1)*n] +=reg7;

	C[(i+0)+(j+2)*n] +=reg8;
	C[(i+1)+(j+2)*n] +=reg9;
	C[(i+2)+(j+2)*n] +=reg10;
	C[(i+3)+(j+2)*n] +=reg11;

	C[(i+0)+(j+3)*n] +=reg12;
	C[(i+1)+(j+3)*n] +=reg13;
	C[(i+2)+(j+3)*n] +=reg14;
	C[(i+3)+(j+3)*n] +=reg15;
	
    }
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

void dgemm_naive_trans(int n, double* A, double* B, double* C)
{
register int i,j,k;
register double cij;

for(i=0;i<n;++i)
    for(j=0;j<n;++j)
    {
	cij=C[i+j*n]; 			// cij = C[i][j]
	for(k=0;k<n;++k)
	    cij+=A[k+i*n]*B[k+j*n]; 	// 
	C[i+j*n]=cij; 			// C[i][j] = cij
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


void dgemm_blocked_trans(int n, double* A, double* B, double* C)
{
register int bi,bj,bk;

for(bi=0;bi<n;bi+=nb)
    for(bj=0;bj<n;bj+=nb)
	for(bk=0;bk<n;bk+=nb)
	    block_trans(n,bi,bj,bk,A,B,C);
}

void block_trans(int n, int bi, int bj, int bk, double *A, double *B, double *C)
{

register int i,j,k;
register double cij;

for(i=bi;i<bi+nb;++i)
    for(j=bj;j<bj+nb;++j)
    {
	cij=C[i+j*n];
	for(k=bk;k<bk+nb;++k)
	    cij+=A[k+i*n]*B[k+j*n];
	C[i+j*n]=cij;
    }
}

void transpose(int n, double*X, double*Y )
{
 register int i, j;
 register double val;

 for(i=0;i<n;i++)
   for(j=0;j<n;j++)
     Y[i*n+j] = X[i+j*n];
}

static inline m128d _mm_fill_pd(double val)
{
    return _mm_set_pd(val, val);
}

void dgemm_unroll4_sse(int n, double* A, double* B, double* C)
{

    int i, j, k;
    m128d reg0, reg1;

    for(i = 0; i < n; i += 2)
 		for(j = 0; j < n; j += 2)
		{
			reg0 = reg1 = _mm_fill_pd(0.0); 	// 2 wartości 0.0 do zmiennych 
			for(k = 0; k < n; ++k)
			{
				m128d a, b;
				a = _mm_load_pd(A+i+k*n);	// 2 kolejne double z tablicy A do a
				b = _mm_fill_pd(B[k+j*n]);	// 2 takie same wartości z tablicy B do b
				reg0 =  _mm_add_pd(reg0, _mm_mul_pd(a, b));
				b = _mm_fill_pd(B[k+(j+1)*n]);	//do kolejnych działań zmieniamy b
				reg1 =  _mm_add_pd(reg1, _mm_mul_pd(a, b));
				b = _mm_fill_pd(B[k+(j+2)*n]);
			}
			_mm_store_pd(C+i+(j+0)*n,  _mm_add_pd(reg0, _mm_load_pd(C+i+(j+0)*n)));
			_mm_store_pd(C+i+(j+1)*n,  _mm_add_pd(reg1, _mm_load_pd(C+i+(j+1)*n)));
	}
}


