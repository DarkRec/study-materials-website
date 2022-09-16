#----------------------------------------------------------------
# Program lab_0c.s - Architektury Komputerów
#----------------------------------------------------------------
#
#  To compile: as -o lab_0c.o lab_0c.s
#  To link:    ld -o lab_0c lab_0c.o
#  To run:     ./lab_0c
#
#----------------------------------------------------------------

	.text
	.global _start		# entry point
	
_start:
	MOV	$1, %eax	# exit function
	INT	$0x80		# system interrupt
