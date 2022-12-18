//---------------------------------------------------------------
// Program lab_8 - Architektury Komputerów
//---------------------------------------------------------------

#include <stdio.h>
#include <stdlib.h>

unsigned int gcd_c( unsigned int a, unsigned int b )
{
	if( b != 0 && a != b )
		return gcd_c( b, a  % b );
	else
		return a;
}

unsigned int gcd_a( unsigned int a, unsigned int b );

void print_call_rsp( void );
void print_ret_rsp( void );

void main( int argc, char *argv[], char *env[] )
{
	unsigned int a, b;

	print_call_rsp();
	if( argc != 3 )
		return;
	a = atoi( argv[1] );
	b = atoi( argv[2] );
	if( a < 1 || b < 1 )
		return;
	printf( "GCD_c(%d, %d) = %d\n", a, b, gcd_c( a, b ) );
	printf( "GCD_a(%d, %d) = %d\n", a, b, gcd_a( a, b ) );
	print_ret_rsp();
}

