#----------------------------------------------------------------
# Program lab_0a.s - Architektury Komputerów
#----------------------------------------------------------------
#
#  To compile: as -o lab_0a.o lab_0a.s
#  To link:    ld -o lab_0a lab_0a.o
#  To run:     ./lab_0a
#
#----------------------------------------------------------------

	.text
	.global _start		# entry point
	
_start:
	MOV	$5, %rax
