#----------------------------------------------------------------
# Function for lab_8 - Architektury Komputerów
# computes gcd( a, b )
#----------------------------------------------------------------
	.data
params:
	.string "Called GCD_A(%d,%d)\n"

	.text
	.type gcd_a, @function
	.globl gcd_a	

gcd_a:	
	push %rdi
	push %rsi
	call print_call_rsp
	pop %rsi
	pop %rdi

#	push %rdi
#	push %rsi
#	mov %rsi, %rdx
#	mov %rdi, %rsi
#	mov $params, %rdi
#	xor %rax, %rax
#	call printf
#	pop %rsi
#	pop %rdi

	mov %edi, %eax		# %eax = a parametr	
	cmp $0, %esi		# b parameter == 0 ?
	jz the_end		# yes, so return a
	cmp %edi, %esi		# a == b ?
	jz the_end		# yes, so return a
	xor %edx, %edx		# clear upper part of dividend
	div %esi		# %edx:%eax / %esi ie. ( a / b )
	mov %esi, %edi		# a = b
	mov %edx, %esi		# b = a % b
	call gcd_a		# gcd( b, a % b )
the_end:
	push %rax
	call print_ret_rsp
	pop %rax
	ret			# return gcd
