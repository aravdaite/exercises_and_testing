// mask digits of a credit card:
// only mask digits from second to fifth from the back
// do not mask letters
// do not mask signs like special characters"/-."
// don ot mask number shorter than 6 numbers in length
// do not mask empty spaces
exports.maskify = function maskify(creditCard) {
	let newCreditCard = creditCard.split('');
	if (creditCard !== ' ' || creditCard.length > 6) {
		for (let i = 1; i < creditCard.length - 4; i++) {
			if (!isNaN(creditCard[i]) && creditCard[i] !== ' ') {
				newCreditCard[i] = '#';
			}
		}
	}
	newCreditCard = newCreditCard.join('');
	return newCreditCard;
};

// turn a number into a string and add an inclination
// 1 should return "1st", 2 - "2nd", 3 - "3rd" and so on
// 11, 12, and 13 get an inclination "th"
// 0 stays "0"

exports.numberToOrdinal = function numberToOrdinal(n) {
	let st = n.toString();
	if (st !== '0') {
		if (st[st.length - 1] === '1' && st !== '11') {
			st += 'st';
		} else if (st[st.length - 1] === '2' && st !== '12') {
			st += 'nd';
		} else if (st[st.length - 1] === '3' && st !== '13') {
			st += 'rd';
		} else {
			st += 'th';
		}
	}
	return st;
};

// reverse Polish notation
// calculate arithmetic functions written in reverse Polish notation
// "2 2 +" should return 4 like 2 + 2
// "2 3 *" should return 6 like 2 * 3
// it should also work on complex equations "1 2 2 3 + * 2 +" should work like  (2 + 3) * 2 + 2 = 12
//  "1 2 3" should return 3
// " 1 2 3.5" should return 3.5

exports.calculate = function calculate(expression) {
	const newExpression = expression.split(' ');
	const arr = [];
	let sum = '';
	let num1;
	let num2;

	if (newExpression !== '') {
		for (let i = 0; i < newExpression.length; i++) {
			if (!isNaN(expression[i]) && isFinite(newExpression[i])) {
				arr.push(newExpression[i]);
			} else {
				num1 = parseInt(arr.pop());
				num2 = parseInt(arr.pop());

				if (newExpression[i] === '+') {
					sum = num1 + num2;
				} else if (newExpression[i] === '-') {
					sum = num2 - num1;
				} else if (newExpression[i] === '*') {
					sum = num1 * num2;
				} else if (newExpression[i] === '/') {
					sum = num2 / num1;
				}
				if (isNaN(expression[i]) || !isFinite(newExpression[i])) {
					arr.push(sum);
				}
			}
		}
		if (sum === '') {
			sum = parseFloat(arr.pop());
		}
	}
	return sum;
};
