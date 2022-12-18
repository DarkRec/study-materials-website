#----------------------------------------------------------------
# Program lab_9b.s - Architektury Komputerów
#----------------------------------------------------------------
#
#  To compile&link: gcc -no-pie -o lab_9b lab_9b.s
#  To run:     ./lab_9b
#
#----------------------------------------------------------------

	.data
	
control_reg:
	.word	0			# Control Register
x:
	.tfloat	0.0			# x
fmt_str:
	.string "Value = %1.25Lf\n"	# Format string

	.equ PRECISION,		0xFCFF
	.equ PREC_SINGLE,	0x0000
	.equ PREC_DOUBLE,	0x0200
	.equ PREC_D_EXT,	0x0300

	.equ ROUNDING,		0xF3FF
	.equ ROUND_TE,		0x0000
	.equ ROUND_DN,		0x0400
	.equ ROUND_UP,		0x0800
	.equ ROUND_TZ,		0x0C00
#----------------------------------------------------------------

	.text
	.global main

#----------------------------------------------------------------
	
main:
	push %rbp

	finit					# x87 initialzation
	
	fstcw control_reg		# CR -> variable

	mov control_reg, %ax	# CR to %ax

	and $PRECISION, %ax		# set precision
#	or $PREC_SINGLE, %ax
#	or $PREC_DOUBLE, %ax
	or $PREC_D_EXT, %ax

	and $ROUNDING, %ax		# set rounding
	or $ROUND_TE, %ax
#	or $ROUND_DN, %ax
#	or $ROUND_UP, %ax
#	or $ROUND_TZ, %ax

	mov %ax, control_reg	# %ax to variable

	fldcw control_reg		# variable to CR

	fld1					# 1 -> ST(0)			: 1
	fld1					# 1 -> ST(0)			: 1, 1
	faddp					# 2 in ST(0)			: 2
	fstpt x					# store in x

	fldt x					# x -> ST(0)			: x
	fsqrt					# sqrt(x) -> ST(0)		: sqrt(x)
	fldt x					# x -> ST(0)			: x, sqrt(x)
	fsqrt					# sqrt(x) -> ST(0)		: sqrt(x), sqrt(x)
	fmulp					# sqrt(x)^2 -> ST(0)	: sqrt(x)*sqrt(x)
	fldt x					# x -> ST(0)			: x, sqrt(x)*sqrt(x)
	fsubrp					# sqrt(x)^2 - x			

	sub $16, %rsp			# make place for number
	fstpt (%rsp)			# ST(0) -> stack
	mov $fmt_str, %rdi		# address of format string
	xor %al, %al			# no vector registers
	call printf	
	add $16, %rsp			# restore stack

theend:
	pop %rbp

	ret
