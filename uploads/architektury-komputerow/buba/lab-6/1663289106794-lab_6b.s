#----------------------------------------------------------------
# Program lab_6b.s - Architektury Komputerów
#----------------------------------------------------------------
#
#  To compile&link: gcc -no-pie -o lab_6b lab_6b.s
#  To run:     ./lab_6b
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

jump_tab:
	.quad oper_err, oper_err, oper_err, oper_3,   oper_err, oper_5,   oper_6,   oper_err
	.quad oper_err, oper_err, oper_10,  oper_err, oper_err, oper_err, oper_err, oper_15

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

	cmp $0, %rax		# check for number of operation
	jl oper_err		# < 0, so error
	cmp $15, %eax		# check for number of operation
	jg oper_err		# > 15, so error

	jmp *jump_tab(,%rax,8)	# jump to code of operation			

oper_3:
	and %rcx, %rdx		# result in %rdx
	mov $oper_and, %rcx	# name in %rcx
	jmp display		# jump to display code
oper_5:
	or %rcx, %rdx		# result in %rdx
	mov $oper_or, %rcx	# name in %rcx
	jmp display		# jump to display code
oper_6:
	xor %rcx, %rdx		# result in %rdx
	mov $oper_xor, %rcx	# name in %rcx
	jmp display		# jump to display code
oper_10:
	add %rcx, %rdx		# result in %rdx
	mov $oper_add, %rcx	# name in %rcx
	jmp display		# jump to display code
oper_15:
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

