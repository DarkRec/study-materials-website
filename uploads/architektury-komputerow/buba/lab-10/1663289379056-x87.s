#----------------------------------------------------------------
# Funkcje x87 do programu lab_10b.c - Architektury Komputerów
#
# Compute Pi (Leibniz's formula) using x87 instructions
#----------------------------------------------------------------

	.data
	
control_reg:
	.word	0		# Control Register

	.equ PRECISION,	0xFCFF
	.equ PREC_DOUBLE,	0x0200
	.equ PREC_D_EXT,	0x0300

#----------------------------------------------------------------

	.text
	.type fun_x87ld, @function
	.global fun_x87ld

fun_x87ld:
	finit			# x87 initialization
	fstcw control_reg	# CR -> variable
	mov control_reg, %ax	# CR to %ax
	and $PRECISION, %ax	# set precision
	or $PREC_D_EXT, %ax	# to long double (80 bits)
	mov %ax, control_reg	# %ax to variable
	fldcw control_reg	# variable to CR

	fld1			# 1
	fld1			# 1, 1
	fadd %st(1), %st(0)	# 2, 1
	fld %st(0)		# 2, 2, 1
	fadd %st(1), %st(0)	# 4, 2, 1
	fchs			# -4, 2, 1
	fldz			# 0, -4, 2, 1	
next1:
	fld %st(1)		# -4, 0, -4, 2, 1
	fchs			# 4, 0, -4, 2, 1
	fst %st(2)		# 4, 0, 4, 2, 1
	fdiv %st(4)		# 4/1, 0, 4, 2, 1
	faddp			# 4/1, 4, 2, 1
	fld %st(3)		# 1, 4/1, 4, 2, 1
	fadd %st(3), %st(0)	# 3, 4/1, 4, 2, 1
	fstp %st(4)		# 4/1, 4, 2, 3

	dec %rdi
	jnz next1

	ret

#----------------------------------------------------------------

	.text
	.type fun_x87d, @function
	.global fun_x87d

fun_x87d:
	finit			# x87 initialization
	fstcw control_reg	# CR -> variable
	mov control_reg, %ax	# CR to %ax
	and $PRECISION, %ax	# set precision
	or $PREC_DOUBLE, %ax	# to double (64 bits)
	mov %ax, control_reg	# %ax to variable
	fldcw control_reg	# variable to CR

	fld1			# 1
	fld1			# 1, 1
	fadd %st(1), %st(0)	# 2, 1
	fld %st(0)		# 2, 2, 1
	fadd %st(1), %st(0)	# 4, 2, 1
	fchs			# -4, 2, 1
	fldz			# 0, -4, 2, 1	
next2:
	fld %st(1)		# -4, 0, -4, 2, 1
	fchs			# 4, 0, -4, 2, 1
	fst %st(2)		# 4, 0, 4, 2, 1
	fdiv %st(4)		# 4/1, 0, 4, 2, 1
	faddp			# 4/1, 4, 2, 1
	fld %st(3)		# 1, 4/1, 4, 2, 1
	fadd %st(3), %st(0)	# 3, 4/1, 4, 2, 1
	fstp %st(4)		# 4/1, 4, 2, 3

	dec %rdi
	jnz next2

	ret

