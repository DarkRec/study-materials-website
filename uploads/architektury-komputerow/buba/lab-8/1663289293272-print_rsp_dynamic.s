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
	lea	counter(%rip),%rdx
	incl	(%rdx)
	mov	(%rdx),%edx
	lea	outstr1(%rip),%rdi
	mov	%rsp,%rsi
	add	$8,%rsi
	xor	%eax,%eax
	call printf@plt
	
#	lea	counter(%rip), %rsi
#	lea	cntr_str1(%rip), %rdi
#	xor	%rax, %rax
#	call printf@plt 

	ret

print_ret_rsp:
	lea	counter(%rip),%rdx
	decl	(%rdx)
	mov	(%rdx),%edx
	inc	%edx
	lea	outstr2(%rip),%rdi
	mov	%rsp,%rsi
	add	$8,%rsi
	xor	%eax,%eax
	call	printf@plt
	
#	lea	counter(%rip), %rsi
#	lea	cntr_str2(%rip), %rdi
#	xor	%rax, %rax
#	call	printf@plt 
	
	ret

