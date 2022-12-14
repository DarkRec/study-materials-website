	.globl print_call_rsp
	.globl print_ret_rsp

	.data
	
counter:	.long		0
outstr1:	.string	"rsp=%lx call,  counter = %d\n"
outstr2:	.string	"rsp=%lx ret,   counter = %d\n"
cntr_str1:	.string "&counter=%lx call\n"
cntr_str2:	.string	"&counter=%lx ret\n"

	.text

	.type	print_call_rsp,@function
	.type	print_ret_rsp,@function

print_call_rsp:
	mov	counter,%edx
	inc	%edx
	mov	%edx,counter
	mov	$outstr1,%rdi
	mov	%rsp,%rsi
	add	$8,%rsi
	xor	%eax,%eax
	call printf

#	mov	$counter, %rsi
#	mov	$cntr_str1, %rdi
#	xor	%rax, %rax
#	call printf

	ret

print_ret_rsp:
	mov	counter,%edx
	decl counter
	mov	$outstr2,%rdi
	mov	%rsp,%rsi
	add	$8,%rsi
	xor	%eax,%eax
	call printf
	
#	mov	$counter, %rsi
#	mov	$cntr_str2, %rdi
#	xor	%rax, %rax
#	call printf
	
	ret

