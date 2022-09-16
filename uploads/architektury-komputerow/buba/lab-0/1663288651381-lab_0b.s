#----------------------------------------------------------------
# Program lab_0b.s - Architektury Komputerów
#----------------------------------------------------------------
#
#  To compile: as -o lab_0b.o lab_0b.s
#  To link:    ld -o lab_0b lab_0b.o
#  To run:     ./lab_0b
#
#----------------------------------------------------------------

	.text
	.global _start		# entry point
	
_start:
	JMP	_start
