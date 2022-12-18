#----------------------------------------------------------------
# Function for lab_7 - Architektury Komputerów
# computes gcd_a( a, b )
#	Arguments:	%edi - first number
#			%esi - second number
#	Returns:	%eax - gcd value
#----------------------------------------------------------------
	.text
	.type gcd_a, @function
	.globl gcd_a	
gcd_a:	
#	push %rdi
#	push %rsi
#	call print_call_rsp
#	pop %rsi
#	pop %rdi
gcd:
	cmp %edi, %esi		# (a==b)?
	jz computed		# yes
	jb b_below_a		# if(b < a) goto b_below_a
	sub %edi, %esi		# else b=b-a
	jmp gcd
b_below_a:
	sub %esi, %edi		# a=a-b
	jmp gcd		
computed:
	mov %edi, %eax		# result (a==b) 
#	push %rax
#	call print_ret_rsp
#	pop %rax
	ret			# return gcd
