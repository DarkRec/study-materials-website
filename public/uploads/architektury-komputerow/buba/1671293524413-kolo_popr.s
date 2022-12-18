#################################################################
# Program ma wyliczyc wartosc formuly i wydrukowac wynik w oknie terminala (funkcja printf)
# pojedynczy wynik/kilka wynikow dla wartosci podanych przez prowadzacego zajecia
#################################################################

		.data

# Zdefiniuj odpowiednie napis do wyswietlenia wynikow
txt_fmt:	.string "r = %6.1f -> obwod = %6.1f\n"

# Wartosc poczatkowa zmiennych i niezbedne stale.

xx:		.double	0.0
yy:		.double	0.0

cw:		.word	0


		.text
		.global main
		
main:
		push %rbp

		finit

# Ustaw podwojna precyzje obliczen, wylacz wyjatki

		fstcw cw
		# ...
		fldcw cw

# Policz wartosc wg formuly podanej przez prowadzacego zajecia


# Wydrukuj wynik konwersji (jako double)

		call printf 

# Koniec funkcji main

		pop %rbp
		xor %eax, %eax
		ret
#################################################################
