//---------------------------------------------------------------
// Program lab_10a - Architektury Komputerów
//
// To compile&link: gcc -O0 -o lab_10a lab_10a.c eval_time.o
// To run:          ./lab_10a
//
//---------------------------------------------------------------

#include <stdio.h>

#include "eval_time.h"

#define REPETITIONS_1 100000000		// liczba powtórzeñ dla I/O
#define REPETITIONS_2 1000000000		// liczba powtórzeñ dla obliczeñ

void main(void)
{
	unsigned long int i;
	int number;
	double x, time_tabl[3];
	FILE *fp;


	init_time();
	printf( "Input: " ); scanf("%d", &number );
 	read_time( time_tabl );
	printf("\n\n");
	printf("Blocking I/O:     T0 = %lf  T1= %lf  T2 = %lf\n", time_tabl[0], time_tabl[1], time_tabl[2] );

	fp = fopen( "/dev/null", "wt" );
	if( fp != NULL )
	{
		init_time();
		for( i = 0; i < REPETITIONS_1; i++ )
			fprintf( fp, "Test string\n" );
	 	read_time( time_tabl );
		fclose( fp );
		printf("Non-blocking I/O: T0 = %lf  T1= %lf  T2 = %lf\n", time_tabl[0], time_tabl[1], time_tabl[2] );
	}

	init_time();
	for( i = 0; i < REPETITIONS_2; i++ )
		x = i / ( i + 1 );
	read_time( time_tabl );
	printf("Arithmetic:       T0 = %lf  T1= %lf  T2 = %lf\n", time_tabl[0], time_tabl[1], time_tabl[2] );

	return;
}
