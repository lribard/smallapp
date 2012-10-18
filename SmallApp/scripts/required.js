Array.prototype.getRandomElement = function()
{
	var x = rangedRandom(0, this.length-1);
	return this[x];
}

// un autre essai

function rangedRandom(from, to)
{
	from = from || 0;
	to = to || 1000;
	var range = to - from;
	return Math.round((Math.random() * range) + from);
}


//ceci est un test  

