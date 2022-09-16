#----------------------------------------------------------------
# Program lab_9a.s - Architektury Komputerow
#----------------------------------------------------------------
#
#  To compile&link: gcc -Wa,--defsym=CASE_1=1 -no-pie -o lab_9a lab_9a.s
#  To run:     ./lab_9a
#
#----------------------------------------------------------------

	.data
	
control_reg:
	.word	0			# Control Register
x:
	.double				# variable
cwr_str:
	.string "x87 Control Register = %04X\n"	# Format string
str_str:
	.string "x87 Status Register  = %04X\n"	# Format string
end_str:
	.string "The end\n"		# Format string
	
	.equ EXCEPTIONS,		0xFFC0
	.equ EXC_IM,			0x0001
	.equ EXC_ZM,			0x0004
	
#----------------------------------------------------------------

	.text
	.global main

#----------------------------------------------------------------
	
main:
	push %rbp

	finit					# x87 initialzation
	
	fstcw control_reg		# CR -> variable

	mov control_reg, %ax	# CR to %ax

	movzx %ax, %rsi			# display value of CR
	mov $cwr_str, %rdi
	xor %al, %al
	call printf
	
	mov control_reg, %ax	# CR to %ax
	
#	and $EXCEPTIONS, %ax	# clear exceptions masks
#	or $EXC_IM, %ax			# set Invalid Operation mask
#	or $EXC_ZM, %ax			# set Zero Divide mask

	mov %ax, control_reg	# %ax to variable

	movzx %ax, %rsi			# display value of CR
	mov $cwr_str, %rdi
	xor %al, %al
	call printf

	fldcw control_reg		# variable to CR

	.ifdef CASE_1			# Case 1

	fstl x					# ST(0) -> x

	.endif

	.ifdef CASE_2			# Case 2
	
	fldz					# 0 -> ST(0)
	fldz					# 0 -> ST(0)
	fdivp					# 0/0

	.endif
	
	.ifdef CASE_3			# Case 3
	
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)
	fld1					# 1 -> ST(0)

	.endif
	
	.ifdef CASE_4			# Case 4

	fldz					# 0 -> ST(0)
	fld1					# 1 -> ST(0)
	fdivp					# 1/0

	.endif

	fstsw %ax				# Status Register to %ax
	movzx %ax, %rsi			# display value of SR
	mov $str_str, %rdi	
	xor %al, %al
	call printf
	
	mov $end_str, %rdi		# address of format string
	xor %al, %al			# no vector registers
	call printf				# display end message

theend:
	pop %rbp

	ret
