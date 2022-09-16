//----------------------------------------------------------------
// Program test_6.c - Architektury Komputerów
//----------------------------------------------------------------
//
//  To compile&link: gcc [-no-pie] -o test_6 test_6.c
//  To run:     ./test_6
//
//  To compile to assembler code: gcc -S test_6.c
//---------------------------------------------------------------- 

#include <stdio.h>

int func( int x )
{
 switch( x )
 {
	case  0: return 0; break;
	case  1: return 1; break;
	case  2: return 2; break;
	case  3: return 3; break;
	case  4: return 4; break;
	default: return -1;
 }
 return 0;
}

int main( void )
{
 int x, res;

 printf("Number: ");
 res = scanf("%d", &x );

 printf("\nTest function:\n");

 res = func( x );
 printf("Function returned %d\n", res );

 return 0;
}
