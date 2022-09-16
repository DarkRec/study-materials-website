//---------------------------------------------------------------
// Program lab_10b.c - Architektury Komputerów
//
// To compile&link: gcc -no-pie -o lab_10b lab_10b.c x87.s sse.s eval_time.o -lm
// To run:          ./lab_10b
//
//--------------------------------------------------------------- 

#include <stdio.h>
#include <sys/time.h>
#include <math.h>

#include "eval_time.h" 

#define BASE			2.0
#define LOG_OF_ITERATIONS	16

long double fun_x87ld( long int iter );		// function in x87.s
long double fun_x87d( long int iter );		// function in x87.s
double fun_ssed( long int iter );			// function in sse.s

//--------------------------------------------------------------- 
double fun_cf( long int iter )
{
	float sum = 0.0;
	float denominator = 1.0;
	float numerator = 4.0;
	float temp;
	long int counter = 0;

	while (counter < iter ) {
		temp = numerator;
		temp /= denominator;
		sum += temp;
		denominator += 2;
		numerator = -numerator;
		
		counter++;
	}
	return sum;
}
//--------------------------------------------------------------- 
double fun_cd( long int iter )
{
	double sum = 0.0;
	double denominator = 1.0;
	double numerator = 4.0;
	double temp;
	long int counter = 0;

	while (counter < iter ) {
		temp = numerator;
		temp /= denominator;
		sum += temp;
		denominator += 2;
		numerator = -numerator;
		
		counter++;
	}
	return sum;
}
//--------------------------------------------------------------- 
int main()
{
	long int iterations;
	int i;
	double	elapsed, time_tabl[3];

	//------------------------------------------------------------------------------------
	init_time();
	for( i = 1; i <= LOG_OF_ITERATIONS; i++ )
	{
		iterations = pow( BASE, i );
		printf("[CF]    %12ld iterations - value = %19.17lf\n", iterations, fun_cf( iterations ) );
	
	}
	read_time( time_tabl );
	elapsed = time_tabl[1] * 1000.0;
	printf( "Time = %12.4lf ms\n", elapsed );
	//------------------------------------------------------------------------------------
	init_time();
	for( i = 1; i <= LOG_OF_ITERATIONS; i++ )
	{
		iterations = pow( BASE, i );
		printf("[CD]    %12ld iterations - value = %19.17lf\n", iterations, fun_cd( iterations ) );
	
	}
	read_time( time_tabl );
	elapsed = time_tabl[1] * 1000.0;
	printf( "Time = %12.4lf ms\n", elapsed );
	//------------------------------------------------------------------------------------
	init_time();
	for( i = 1; i <= LOG_OF_ITERATIONS; i++ )
	{
		iterations = pow( BASE, i );
		printf("[x87D]  %12ld iterations - value = %19.17Lf\n", iterations, fun_x87d( iterations ) );
	
	}
	read_time( time_tabl );
	elapsed = time_tabl[1] * 1000.0;
	printf( "Time = %12.4lf ms\n", elapsed );
	//------------------------------------------------------------------------------------
	init_time();
	for( i = 1; i <= LOG_OF_ITERATIONS; i++ )
	{
		iterations = pow( BASE, i );
		printf("[x87LD] %12ld iterations - value = %19.17Lf\n", iterations, fun_x87ld( iterations ) );
	
	}
	read_time( time_tabl );
	elapsed = time_tabl[1] * 1000.0;
	printf( "Time = %12.4lf ms\n", elapsed );
	//------------------------------------------------------------------------------------
	init_time();
	for( i = 1; i <= LOG_OF_ITERATIONS; i++ )
	{
		iterations = pow( BASE, i );
		printf("[SSED]  %12ld iterations - value = %19.17lf\n", iterations, fun_ssed( iterations ) );
	
	}
	read_time( time_tabl );
	elapsed = time_tabl[1] * 1000.0;
	printf( "Time = %12.4lf ms\n", elapsed );
	//------------------------------------------------------------------------------------

	return 0;
}
