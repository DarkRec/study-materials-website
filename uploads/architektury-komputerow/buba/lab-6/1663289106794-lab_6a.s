#----------------------------------------------------------------
# Program lab_6a.s - Architektury Komputerów
#----------------------------------------------------------------
#
#  To compile&link: gcc -no-pie -o lab_6a lab_6a.s
#  To run:     ./lab_6a
#
#----------------------------------------------------------------

	.data
	
oper_and:
	.string "AND"			# AND operation
oper_or:
	.string "OR"			# OR operation
oper_xor:
	.string "XOR"			# XOR operation
oper_add:
	.string "ADD"			# ADD operation
oper_sub:
	.string "SUB"			# SUB operation

var_a:
	.long	3084			# first number
var_b:
	.long	1424			# second number
var_res:
	.long	0			# result
var_oper:
	.long	0			# number of operation

fmt_oper:
	.string	"%d (0x%08x) %s %d (0x%08x) = "	# operation format string
fmt_res:
	.string "%d (0x%08x)\n"		# result format string

fmt_bad:
	.string "No or bad numbers!\n"	# format for bad arguments
fmt_err:
	.string "Bad operation!\n"	# format for bad operations

#----------------------------------------------------------------

	.text
	.global main

#----------------------------------------------------------------
	
main:
	push %rbp

	cmp $4, %edi		# argc is here
	jnz badnum

	mov %rsi, %rbp		# %rbp = %rsi = argv

	mov 8(%rbp), %rdi	# atoi( argv[1] ) - 1st argument to %rdi;
	call atoi
	cmp $0, %rax		# result of conversion
	jle badnum		# bad number
	mov %eax, var_a		# store numer in var_a

	mov 16(%rbp), %rdi	# atoi( argv[2] ) - 1st argument to %rdi;
	call atoi
	cmp $0, %rax		# result of conversion
	jle badnum		# bad number
	mov %eax, var_b		# store numer in var_b

	mov 24(%rbp), %rdi	# atoi( argv[3] ) - 1st argument to %rdi;
	call atoi
	cmp $0, %rax		# result of conversion
	jle badnum		# bad number
	mov %eax, var_oper	# store numer in var_oper

	mov var_a, %rdx		# %rdx contains var_a
	mov var_b, %rcx		# %rcx contains var_b

	cmp $3, %eax		# check for number of first operation
	jnz check_5		# != 3, so check others
	and %rcx, %rdx		# result in %rdx
	mov $oper_and, %rcx	# name in %rcx
	jmp display		# jump to display code
check_5:
	cmp $5, %eax		# check for number of second operation
	jnz check_6		# != 5, so check others
	or %rcx, %rdx		# result in %rdx
	mov $oper_or, %rcx	# name in %rcx
	jmp display		# jump to display code
check_6:
	cmp $6, %eax		# check for number of third operation
	jnz check_10		# != 6, so check others
	xor %rcx, %rdx		# result in %rdx
	mov $oper_xor, %rcx	# name in %rcx
	jmp display		# jump to display code
check_10:
	cmp $10, %eax		# check for number of fourth operation
	jnz check_15		# != 10, so check others
	add %rcx, %rdx		# result in %rdx
	mov $oper_add, %rcx	# name in %rcx
	jmp display		# jump to display code
check_15:
	cmp $15, %eax		# check for number of fifth operation
	jnz oper_err		# != 15, so error
	sub %rcx, %rdx		# result in %rdx
	mov $oper_sub, %rcx	# name in %rcx
	jmp display		# jump to display code

oper_err:
	mov $fmt_err, %rdi	# printf( fmt ) - first argument to %rdi
	mov $0, %al		# printf - number of vector registers to %al
	call printf
	jmp theend

display:
	mov %rdx, var_res	# store result in var_res

	mov var_b, %r9		# printf( fmt, n1, n1, name, n2, n2 ) - 6th argument to %r9
	mov var_b, %r8		# printf( fmt, n1, n1, name, n2, n2 ) - 5th argument to %r8
	mov var_a, %rdx		# printf( fmt, n1, n1, name, n2, n2 ) - 3rd argument to %rdx
	mov var_a, %rsi		# printf( fmt, n1, n1, name, n2, n2 ) - 2nd argument to %rsi
	mov $fmt_oper, %rdi	# printf( fmt, n1, n1, name, n2, n2 ) - 1st argument to %rdi
	mov $0, %al		# printf - number of vector registers to %al
	call printf

	mov var_res, %rdx	# printf( fmt, res, res ) - 3rd argument to %rdx
	mov var_res, %rsi	# printf( fmt, res, res ) - 2nd argument to %rsi
	mov $fmt_res, %rdi	# printf( fmt, res, res ) - 1st argument to %rdi
	mov $0, %al		# printf - number of vector registers to %al
	call printf

	jmp theend

badnum:
	mov $fmt_bad, %rdi	# printf( fmt ) - first argument to %rdi
	mov $0, %al		# printf - number of vector registers to %al
	call printf
	
theend:
	pop %rbp

	ret

