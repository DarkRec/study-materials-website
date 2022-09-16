#----------------------------------------------------------
# Funkcja do programu lab_10bc - Architektury Komputerów
#
# Compute Pi (Leibniz's formula) using SSE instructions
#----------------------------------------------------------

	.data
	.align 16

denom:	
	.double	1.0, 3.0	# first & second denominators
numer:	
	.double	4.0, -4.0	# first & second numerators
add4:	
	.double	4.0, 4.0	# difference between denominators
zero:	
	.double	0.0, 0.0	# sums starting values
#----------------------------------------------------------

	.text
	.type fun_ssed, @function
	.global fun_ssed

fun_ssed:
	shr $1, %rdi		# two terms are computed in parallel
	inc %rdi		# half of iterations is enough
	
	movdqa	denom, %xmm5	# denominators to xmm5
	movdqa	numer, %xmm2	# numerators to xmm2
	movdqa	add4, %xmm3	# differences to xmm3
	movdqa	%xmm2, %xmm4	# numerators to xmm4
	movdqa	zero, %xmm1	# zeros to xmm1

next:
	divpd	%xmm5, %xmm2	# xmm2 /= xmm5
	addpd	%xmm2, %xmm1	# xmm1 += xmm2
	movdqa	%xmm4, %xmm2	# xmm2 = xmm4
	addpd	%xmm3, %xmm5	# xmm5 += xmm3

	dec %rdi
	jnz next

	haddpd	%xmm1, %xmm1	# horizontal sums of low & high parts
	movsd	%xmm1, %xmm0	# low part to xmm0

	ret			# that's all

