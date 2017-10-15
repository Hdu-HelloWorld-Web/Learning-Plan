const objArr = [
	{ name: 'xiaowang', score: 30 },
	{ name: 'xiaosi', score: 80},
	{ name: 'xiaoli', score: 54},
	{ name: 'xiaoming', score: 79},
];
objArr.sort((a, b) => a.score - b.score);
console.log(objArr);