class Operator() :
	pass

class Add(Operator) :
	def __repr__(self):
		return "'+'"

	def __call__(self, x, y):
		return x+y

	@property
	def first(self):
		return set(range(1,999))

	def second_for(self, x):
		return set(range(1, 1000-x))

class Sub(Operator) :
	def __repr__(self):
		return "'-'"

	def __call__(self, x, y):
		return x-y

	@property
	def first(self):
		return set(range(2,1000))

	def second_for(self, x):
		return set(range(1, x))


class Mul(Operator) :
	def __repr__(self):
		return "'*'"

	def __call__(self, x, y):
		return x*y

	@property
	def first(self):
		return set(range(2,500))

	def second_for(self, x):
		return set(range(2,(999/x)+1))


class Div(Operator) :
	def __repr__(self):
		return "'/'"

	def __call__(self, x, y):
		return float(x)/y

	@property
	def first(self):
		return set(range(2,1000))

	def second_for(self, x):
		yset = set(divisors(x))
		yset.discard(1)
		yset.discard(x)
		return yset


def prime_factors(n):
	i = 2
	factors = []
	while i * i <= n:
		if n % i:
			i += 1
		else:
			n //= i
			factors.append(i)
	if n > 1:
		factors.append(n)
	return set(factors)

def divisors(n):
	import math
	large_divisors = []
	for i in xrange(1, int(math.sqrt(n) + 1)):
		if n % i == 0:
			yield i
			if i*i != n:
				large_divisors.append(n / i)
	for divisor in reversed(large_divisors):
		yield divisor


def valid_puzzle(ops, nums):
	x = ops[0](nums[0], nums[1])
	y = ops[1](nums[2], nums[3])
	u = ops[3](nums[0], nums[2])
	v = ops[4](nums[1], nums[3])
	z = ops[2](u, v)
	return z == ops[5](x, y) and all(0<i<1000 for i in nums+(u,v,x,y,z))

def all_unique(ops, nums):
	x = ops[0](nums[0], nums[1])
	y = ops[1](nums[2], nums[3])
	u = ops[3](nums[0], nums[2])
	v = ops[4](nums[1], nums[3])
	z = ops[2](u, v)	
	return len(set(nums+(x,y,u,v,z))) == 9

def operator_assignments():
	ops = [Div(), Mul(), Sub(), Add()]
	for op1 in ops :
		for op2 in ops :
			for op3 in ops :
				for op4 in ops :
					for op5 in ops :
						for op6 in ops :
							yield op1, op2, op3, op4, op5, op6


import sys

# n0 o0 n1 == xx
# o3	o4	o5
# n2 o1 n3 == yy
# ==	==	==
# uu o2 vv == zz


operators = list(operator_assignments())
#import random
#random.shuffle(operators)

for op in operators :
	if len(set(op[:3])) == 1 or len(set(op[:3])) == 1: continue
	if not 0 < len([o for o in op if isinstance(o, (Mul, Div))]) <= 3 : continue
	for n0 in op[0].first & op[3].first:
		if not op[0].second_for(n0) or not op[3].second_for(n0): continue
		for n1 in op[0].second_for(n0) & op[4].first:
			if not op[4].second_for(n1): continue
			for n2 in op[1].first & op[3].second_for(n0):
				for n3 in op[1].second_for(n2) & op[4].second_for(n1):
					nums = (n0,n1,n2,n3)
					sys.stderr.write("\rtrying: %r %r    " % (op, nums))
					if not all_unique(op, nums): continue 
					if valid_puzzle(op, nums):
						sys.stdout.write("\t\t[%r, %r, %r, %r, %r, %r, %s, %s, %s, %s],\n" % (op+nums))
						sys.stdout.flush()
	sys.stderr.write("\n")
