const { maskify, numberToOrdinal, calculate } = require('./exe.js');

test('ex1. mask digits from 2nd to 5th to last', () => {
	expect(maskify('6542313256')).toBe('6#####3256');
	expect(maskify('12345678')).toBe('1###5678');
});
test('ex1. handle empty string', () => {
	expect(maskify(' ')).toBe(' ');
	expect(maskify('')).toBe('');
});
test('ex1. do not mask short strings', () => {
	expect(maskify('1234')).toBe('1234');
	expect(maskify('54321')).toBe('54321');
});
test('ex1. do not mask letters', () => {
	expect(maskify('1234abc12ac1234')).toBe('1###abc##ac1234');
	expect(maskify('abc123')).toBe('abc123');
});
test('ex1. do not mask special characters', () => {
	expect(maskify('1234.12-12.1-4')).toBe('1###.##-##.1-4');
	expect(maskify('--12/22/22')).toBe('--##/#2/22');
});
test('ex1. do not mask  spaces', () => {
	expect(maskify('12 34 12 12 14')).toBe('1# ## ## #2 14');
	expect(maskify('   22 22 22')).toBe('   ## #2 22');
});
test('ex1. false tests', () => {
	expect(maskify('12 34 56')).not.toBe('1# ###56');
	expect(maskify('12345 55555')).not.toBe('1##45 ##555');
});
test('ex2. handle single digits', () => {
	expect(numberToOrdinal(0)).toBe('0');
	expect(numberToOrdinal(1)).toBe('1st');
	expect(numberToOrdinal(2)).toBe('2nd');
	expect(numberToOrdinal(3)).toBe('3rd');
	expect(numberToOrdinal(4)).toBe('4th');
});
test('ex2. handle numbers from 1 to 1000', () => {
	for (let i = 1; i < 1001; i += 1) {
		if (i % 10 === 1 && i !== 11) {
			expect(numberToOrdinal(i)).toBe(`${i}st`);
		} else if (i % 10 === 2 && i !== 12) {
			expect(numberToOrdinal(i)).toBe(`${i}nd`);
		} else if (i % 10 === 3 && i !== 13) {
			expect(numberToOrdinal(i)).toBe(`${i}rd`);
		} else {
			expect(numberToOrdinal(i)).toBe(`${i}th`);
		}
	}
});
test('ex3. handle simple arithmetic', () => {
	expect(calculate('2 2 +')).toBe(4);
	expect(calculate('2 1 -')).toBe(1);
	expect(calculate('2 3 *')).toBe(6);
	expect(calculate('2 2 /')).toBe(1);
	expect(calculate('1 2 3')).toBe(3);
	expect(calculate('1 2 3.5')).toBe(3.5);
});
test('ex3. handle complex arithmetic', () => {
	expect(calculate('1 2 2 + *')).toBe(4);
	expect(calculate('3 10 5 + *')).toBe(45);
	expect(calculate('3 10 5 * -')).toBe(-47);
	expect(calculate('20 2 5 * /')).toBe(2);
	expect(calculate('3 10 5 - *')).toBe(15);
	expect(calculate('3 10 5 - * 2 -')).toBe(13);
	expect(calculate('1 2 2 3 + * 2 +')).toBe(12);
});
