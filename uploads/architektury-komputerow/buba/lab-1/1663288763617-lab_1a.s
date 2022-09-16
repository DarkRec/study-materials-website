#----------------------------------------------------------------
# Program lab_1a.s - Architektury Komputerów
#----------------------------------------------------------------
#
#  To compile: as -o lab_1a.o lab_1a.s
#  To link:    ld -o lab_1a lab_1a.o
#  To run:     ./lab_1a
#
#----------------------------------------------------------------

	.equ	kernel,0x80	#Linux system functions entry
	.equ	write_32,0x04	#write data to file function
	.equ	exit_32,0x01	#exit program function

	.equ	write_64,0x01	#write data to file function
	.equ	exit_64,0x3C	#exit program function

	.equ	stdout, 0x01	#handle to stdout
	.data
	
txt_A:
	.ascii	"A\n"		#first message
txt_B:
	.ascii	"B\n"		#second message
txt_C:
	.ascii	"C\n"		#third message

	.text
	.global _start
	
	.macro disp_str_32 file_id, address, length
	mov $write_32, %eax
	mov \file_id, %ebx
	mov \address, %ecx
	mov \length, %edx
	int $kernel
	.endm

	.macro exit_prog_32 exit_code
	mov $exit_32, %eax
	mov \exit_code, %ebx
	int $kernel
	.endm

	.macro disp_str_64 file_id, address, length
	mov $write_64, %rax
	mov \file_id, %rdi
	mov \address, %rsi
	mov \length, %rdx
	syscall
	.endm

	.macro exit_prog_64 exit_code
	mov $exit_64, %rax
	mov \exit_code, %rdi
	syscall
	.endm

_start:
	disp_str_32 $stdout, $txt_A, $2

	disp_str_32 $stdout, $txt_B, $2

	disp_str_32 $stdout, $txt_C, $2


theend:
	exit_prog_32 $5		#exit program

