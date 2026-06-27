// seedrandom function
(function (a, b, c, d, e, f) {
	function k(a) {
		var b, c = a.length, e = this, f = 0, g = e.i = e.j = 0, h = e.S = [];
		for (c || (a = [c++]); d > f;) h[f] = f++;
		for (f = 0; d > f; f++) h[f] = h[g = j & g + a[f % c] + (b = h[f])], h[g] = b;
		(e.g = function (a) {
			for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;) b = h[f = j & f + 1], c = c * d + h[j & (h[f] = h[g = j & g + b]) + (h[g] = b)];
			return e.i = f, e.j = g, c
		})(d)
	}

	function l(a, b) {
		var e, c = [], d = (typeof a)[0];
		if (b && "o" == d) for (e in a) try {
			c.push(l(a[e], b - 1))
		} catch (f) {
		}
		return c.length ? c : "s" == d ? a : a + "\0"
	}

	function m(a, b) {
		for (var d, c = a + "", e = 0; c.length > e;) b[j & e] = j & (d ^= 19 * b[j & e]) + c.charCodeAt(e++);
		return o(b)
	}

	function n(c) {
		try {
			return a.crypto.getRandomValues(c = new Uint8Array(d)), o(c)
		} catch (e) {
			return [+new Date, a, a.navigator.plugins, a.screen, o(b)]
		}
	}

	function o(a) {
		return String.fromCharCode.apply(0, a)
	}

	var g = c.pow(d, e), h = c.pow(2, f), i = 2 * h, j = d - 1;
	c.seedrandom = function (a, f) {
		var j = [], p = m(l(f ? [a, o(b)] : 0 in arguments ? a : n(), 3), j), q = new k(j);
		return m(o(q.S), b), c.random = function () {
			for (var a = q.g(e), b = g, c = 0; h > a;) a = (a + c) * d, b *= d, c = q.g(1);
			for (; a >= i;) a /= 2, b /= 2, c >>>= 1;
			return (a + c) / b
		}, p
	}, m(c.random(), b)
})(this, [], Math, 256, 6, 52);



function getSpellCost(spell, gspell, mana, success){
	// spell being casted, spell being casted through gfd (if N/A then input should be 0), max mana when casting spell, whether the spell succeeds (only useful for g!se success)

	// [base, % of max mana]
	const cbg = [2, 40/100]
	const fthof = [10, 60/100]
	const st = [8, 20/100]
	let se;
	if (success == true) {
		se = [0, 0] // assumed to refund since youd have > 400 of all buildings
	} else {
		se = [20, 75/100]
	}
	const hc = [10, 10/100]
	const scp = [10, 20/100]
	const ra = [0, 0] // assumed to refund since youd be outside of gpoc
	const di = [5, 20/100]
	const gfd = [3, 5/100]
	let spells = [cbg, fthof, st, se, hc, scp, ra, di, gfd]
	let gspells = [[0, 0], cbg, fthof, st, se, hc, scp, ra, di]

	// floor((first spell base + mana * first spell % of max mana) * sirbmult) + floor(same thing but its the gspell)/2
	return Math.floor((spells[spell][0]+mana*spells[spell][1])*0.89)+Math.floor((gspells[gspell][0]+mana*gspells[gspell][1])*0.89)/2
}
0
// outputs an array of spells gfd can cast with the current and max mana being used, where spells have an id: cbg = 1, fthof = 2, etc, di = 8
function getSpellPool(curmana, maxmana){
	let out = []
	for (let i = 1; i <= 8; i++) {
		if (getSpellCost(8, i, maxmana, true) <= curmana) {
			out.push(i);
		}
	}
	return out;
}
// current mana, randomseed of this row, randomseed of next row, whether gfds is possible, and di is whether di success would mess with the combo or not (true means that it wouldnt)
// this shit is a fucking MESS bro like do not read for your sanity but i do think its probably correct tm
function getSkipCost(mana, randomSeed, randomSeed2, gfds, di){
	if (randomSeed2 > 0.5){
		randomSeed2 = false
	} else {
		randomSeed2 = true
	}
	if (gfds !== true){
		if (mana < 3){
			return undefined;
		}

		if (mana <= 11) {
			// the last parameter only is relevant for se so in this function when se is not being casted the value of it wont be accurate necessarily
			return getSpellCost(0, 0, mana, true);
		}
		if (mana === 12){
			if (randomSeed > 5/7 && randomSeed < 6/7){
				return 0;
				} else {
					return getSpellCost(0, 0, mana, true);
				}
		}
		if (mana >= 12.5 && mana <= 14){
			if (randomSeed > 4/6 && randomSeed < 6/7){
				return 0
			} else {
				return getSpellCost(0, 0, mana, true)
			}

		}
		if (mana >= 14.5 && mana <= 17){
			if (randomSeed > 4/6 && randomSeed < 6/7){
				return 0
		}
			if (randomSeed < 1/7){
				return getSpellCost(8, 1, mana, true)
			}
			if (randomSeed > 6/7 && randomSeed < 7/7) {
			return getSpellCost(8, 7, mana, true)
			} else {
				return getSpellCost(0, 0, mana, true)
			}
	}
		if (mana >= 17.5 && mana <= 18){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			if (randomSeed < 1/7){
				return getSpellCost(8, 1, mana, true)
			}
				if ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8)){
				return getSpellCost(0, 0, mana, true) // dont cast g!di if it messes with things
				}
				if (!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) {
					return getSpellCost(0, 0, mana, true) // dont cast g!st backfire
				} else {
					return Math.min(getSpellCost(0, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true) )
				}
	}
		if (mana == 18.5){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			if (randomSeed < 1/8){
				return getSpellCost(8, 1, mana, true)
			}
			if (randomSeed < 1/7){
				return 7.5 // converted g!cbg, because we NEED that 0.5 mana btw
			}
				if ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8)){
				return getSpellCost(0, 0, mana, true) // dont cast g!di if it messes with things
				}
				if (!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) {
					return getSpellCost(0, 0, mana, true) // dont cast g!st backfire
				} else {
					return Math.min(getSpellCost(0, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true) )
				}
	}
		if (mana >= 19 && mana <= 19.5){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
				if ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8)){
				return getSpellCost(0, 0, mana, true) // dont cast g!di if it messes with things
				}
				if (!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) {
					return getSpellCost(0, 0, mana, true) // dont cast g!st backfire
				} else {
					return Math.min(getSpellCost(0, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true) )
				}
			}
		if (mana >= 20 && mana <= 20.5){
			if (randomSeed > 2/4 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
				if ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8) || (!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8)){
					if (di && randomSeed < 0.835){
						return getSpellCost(7, 0, mana, true)
					} else {
					return getSpellCost(0, 0, mana, true)
					}
				}
					if (di && randomSeed < 0.835){
					return Math.min(getSpellCost(7, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					} else {
						return Math.min(getSpellCost(0, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					}
				
	}
		if (mana >= 21 && mana <= 21.5){
			if (randomSeed > 2/4 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
				if ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8) || (!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8)){
					if (di && randomSeed < 0.835){
						return getSpellCost(7, 0, mana, true)
					} else {
					return getSpellCost(0, 0, mana, true)
					}
				}
					if (di && randomSeed < 0.835){
					return Math.min(getSpellCost(7, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					} else {
						return Math.min(getSpellCost(0, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					}
				
	}
		if (mana >= 22 && mana <= 28){
			if (randomSeed > 1/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
				if ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8)){
				return getSpellCost(0, 0, mana, true) // dont cast g!di if it messes with things
				}
				if (!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) {
					return getSpellCost(0, 0, mana, true) // dont cast g!st backfire
				} else {
					if (di && randomSeed < 0.835){
					return Math.min(getSpellCost(7, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					} else {
						return Math.min(getSpellCost(0, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					}
				}
	}
		if (mana >= 28.5 && mana <= 29){
			if (randomSeed > 2/4 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 1/3 && randomSeed < 2/4){
				return mana-28 // sell down to 28 current mana and do conversion from previous case, this will also be happening in the other if statements from here onwards
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
				if ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8)){
				return getSpellCost(0, 0, mana, true) // dont cast g!di if it messes with things
				}
				if (!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) {
					return getSpellCost(0, 0, mana, true) // dont cast g!st backfire
				} else {
					if (di && randomSeed < 0.835){
					return Math.min(getSpellCost(7, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					} else {
						return Math.min(getSpellCost(0, 0, mana, true), getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
					}
				}
	}
		if (mana >= 29.5 && mana <= 40){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// cast di or cast cbg
		if (di && randomSeed < 0.835){
			options.push(getSpellCost(7,0,mana,true))
		} else {
			options.push(getSpellCost(0,0,mana,true))
		}
		// cast gfd or dont cast gfd because of g!st/g!di backfire
		if ((!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) || ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8))){
				options.push(getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
		}
		// sell down to 29/29 then do the previous case's refund
		if (randomSeed > 2/4 && randomSeed < 3/8) {
			options.push(mana-29) 
			}
		
			return Math.min(...options)
					
				
	}
		if (mana >= 40.5 && mana <= 42){
			if (randomSeed > 2/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// cast di or cast cbg
		if (di && randomSeed < 0.835){
			options.push(getSpellCost(7,0,mana,true))
		} else {
			options.push(getSpellCost(0,0,mana,true))
		}
		// cast gfd or dont cast gfd because of g!st/g!di backfire
		if ((!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) || ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8))){
				options.push(getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
		}
		// sell down to 40/40 then do the previous case's refund
		if (randomSeed > 3/5 && randomSeed < 2/3) {
			options.push(mana-40) 
			}
		
			return Math.min(...options)
	}
		if (mana >= 42.5 && mana <= 49){
			if (randomSeed > 2/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// cast di or cast hc (hc becomes cheaper than cbg at this point)
		if (di && randomSeed < 0.835){
			options.push(getSpellCost(7,0,mana,true))
		} else {
			options.push(getSpellCost(4,0,mana,true))
		}
		// cast gfd or dont cast gfd because of g!st/g!di backfire
		if ((!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) || ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8))){
				options.push(getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
		}
		// sell down to 40/40 then do the previous case's refund
		if (randomSeed > 3/5 && randomSeed < 2/3) {
			options.push(mana-40) 
			}
		
			return Math.min(...options)
	}
		if (mana >= 49.5 && mana <= 59){
			if (randomSeed > 2/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// cast hc
		options.push(getSpellCost(4,0,mana,true))
		// cast gfd or dont cast gfd because of g!st/g!di backfire
		if ((!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) || ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8))){
				options.push(getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
		}
		// sell down to 40/40 then do the previous case's refund
		if (randomSeed > 3/5 && randomSeed < 2/3) {
			options.push(mana-40) 
			}
			return Math.min(...options)
	}
		if (mana >= 59.5 && mana <= 76){
			if (randomSeed > 5/7 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// cast hc
		options.push(getSpellCost(4,0,mana,true))
		// cast gfd or dont cast gfd because of g!st/g!di backfire
		if ((!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) || ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8))){
				options.push(getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
		}
		// sell down to 59/59 then do the previous case's refund
		if (randomSeed > 2/3 && randomSeed < 5/7) {
			options.push(mana-40) 
			}
			return Math.min(...options)
	}
		if (mana >= 76.5){
			if (randomSeed > 6/8 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// cast hc
		options.push(getSpellCost(4,0,mana,true))
		// cast gfd or dont cast gfd because of g!st/g!di backfire
		if ((!randomSeed2 && randomSeed < 3/8 && randomSeed > 2/8) || ((!randomSeed2 && randomSeed > 7/8) || (!di && randomSeed > 7/8))){
				options.push(getSpellCost(8, Math.floor(randomSeed*8)+1, mana, true))
		}
		// sell down to 76/76 then do the previous case's refund
		if (randomSeed > 5/7 && randomSeed < 6/8) {
			options.push(mana-40) 
			}
			return Math.min(...options)
	}
		} else {
		if (mana < 3){
			return undefined;
		}

		if (mana <= 11) {
			// the last parameter only is relevant for se so in this function when se is not being casted the value of it wont be accurate necessarily
			return getSpellCost(8, 0, mana, true);
		}
		if (mana === 12){
			if (randomSeed > 5/7 && randomSeed < 6/7){
				return 0;
				} else {
			return getSpellCost(8, 0, mana, true);
				}
		}
		if (mana >= 12.5 && mana <= 14){
			if (randomSeed > 4/6 && randomSeed < 6/7){
				return 0
			} else {
			return getSpellCost(8, 0, mana, true);
			}

		}
		if (mana >= 14.5 && mana <= 17){
			if (randomSeed > 4/6 && randomSeed < 6/7){
				return 0
		}
			return getSpellCost(8, 0, mana, true);
	}
		if (mana >= 17.5 && mana <= 18){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			return getSpellCost(8, 0, mana, true);
	}
		if (mana == 18.5){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			return getSpellCost(8, 0, mana, true);
	}
		if (mana >= 19 && mana <= 19.5){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			return getSpellCost(8, 0, mana, true);
			}
		if (mana >= 20 && mana <= 20.5){
			if (randomSeed > 2/4 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			return getSpellCost(8, 0, mana, true);
				
	}
		if (mana >= 21 && mana <= 21.5){
			if (randomSeed > 2/4 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			return getSpellCost(8, 0, mana, true);
				
	}
		if (mana >= 22 && mana <= 28){
			if (randomSeed > 1/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			return getSpellCost(8, 0, mana, true);
	}
		if (mana >= 28.5 && mana <= 29){
			if (randomSeed > 2/4 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
			if (randomSeed > 1/3 && randomSeed < 2/4){
				return mana-28 // sell down to 28 current mana and do conversion from previous case, this will also be happening in the other if statements from here onwards
		}

	}
		if (mana >= 29.5 && mana <= 40){
			if (randomSeed > 3/5 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// gfds
			options.push(getSpellCost(8, 0, mana, true));
		// sell down to 29/29 then do the previous case's refund
		if (randomSeed > 2/4 && randomSeed < 3/8) {
			options.push(mana-29) 
			}
			return Math.min(...options)
					
				
	}
		if (mana >= 40.5 && mana <= 42){
			if (randomSeed > 2/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// gfds
			options.push(getSpellCost(8, 0, mana, true));
		// sell down to 40/40 then do the previous case's refund
		if (randomSeed > 3/5 && randomSeed < 2/3) {
			options.push(mana-40) 
			}
		
			return Math.min(...options)
	}
		if (mana >= 42.5 && mana <= 49){
			if (randomSeed > 2/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// gfds
			options.push(getSpellCost(8, 0, mana, true));
		// sell down to 40/40 then do the previous case's refund
		if (randomSeed > 3/5 && randomSeed < 2/3) {
			options.push(mana-40) 
			}
		
			return Math.min(...options)
	}
		if (mana >= 49.5 && mana <= 59){
			if (randomSeed > 2/3 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// gfds
			options.push(getSpellCost(8, 0, mana, true));
		if (mana >= 59.5 && mana <= 76){
			if (randomSeed > 5/7 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// gfds
			options.push(getSpellCost(8, 0, mana, true));
		// sell down to 59/59 then do the previous case's refund

		if (randomSeed > 2/3 && randomSeed < 5/7) {
			options.push(mana-40) 
			}
			return Math.min(...options)
	}
		if (mana >= 76.5){
			if (randomSeed > 6/8 && randomSeed < 7/8){
				return 0
		}
			if (randomSeed > 3/8 && randomSeed < 4/8 && randomSeed2) {
				return 0
			}
		let options = []
		// gfds
			options.push(getSpellCost(8, 0, mana, true));
		// sell down to 76/76 then do the previous case's refund
		if (randomSeed > 5/7 && randomSeed < 6/8) {
			options.push(mana-40) 
			}
			return Math.min(...options)
	}
		}
	}
}
// returns the cost of an offset abuse
// you probably could implement binary search to go through the mana counts faster, but optimising this isnt that important since its precomputed
function getOffsetCost(offset) {
		let out = []
		let initialCost = 0
		let offsetLength = offset[0]-offset[1]
		let lastgfthof = 0;
		let lastgse; // this refers to the last g!fthof which requires g!se in the pool, which may be none of them.
		for (let j=offsetLength-1; j>=0; j--) {
			if (gfthofs.includes(offset[0] - j)) {
				// number of gfd casts before the last g!fthof in the offset
				lastgfthof = offsetLength-j-1;
			}
			if (rolls[offset[0] - j] < 2/7 && rolls[offset[0] - j] > 2/8) {
				lastgse = offsetLength-j;
			}
		}
			// this loop finds the minimum amount needed for the offset
			for (let i=14; true; i++) {
				if (getSpellCost(8, 0, i, true)*lastgfthof+getSpellCost(8, 2, i, true) < i) {
					if (lastgse == undefined){
						// if there is no last gse, take the number of gfd casts before the last fthof, minus one, plus the cost of 1 whole g!fthof (because gfd needs to select fthof)
						// also this one whole g!fthof includes the initial cost of gfd, hence the -1
					initialCost = getSpellCost(8, 0, i, true)*(lastgfthof-1)+getSpellCost(8, 2, i, true);
					break
} else { 
				// more of the same but account for lastgse because it exists (we need the cost of a g!se instead of a g!fthof and what not). then take the higher of the two values for the initial cost
				if (getSpellCost(8, 0, i, true)*lastgse+getSpellCost(8, 3, i, false) < i){
					initialCost = Math.max(getSpellCost(8, 0, i, true)*(lastgfthof-1)+getSpellCost(8, 2, i, true), getSpellCost(8, 0, i, true)*(lastgse-1)+getSpellCost(8, 3, i, false));
					break
}
	
}
				}
			}
		let maxFinalMana = [initialCost, -Infinity]
		// this loop finds the initial max magic number that maximises mana after refilling (can be the same as the lowest mana needed at times)
	for (let i=initialCost; i <= 66; i++) {
		let finalMana = 100+i
		for (let j=0; j<offsetLength; j++) {
		finalMana -= getSpellCost(8, choose(getSpellPool(i, i), rolls[offset[0]-j]), i, true);
		}
		if (finalMana > maxFinalMana[1]) {
			maxFinalMana = [i, finalMana]
		}
		if (i == initialCost){
		out.push([initialCost, finalMana])
		}
	}
out.push(maxFinalMana)
return out
}

// get random element from array
function choose(arr, roll) {
	return arr[Math.floor(roll * arr.length)];
}

// gfd outcome
function getGfd(spells, roll) {
	return spells[Math.floor(roll * spells.length)];
}

// fthof outcome
function check_cookies(season, success, dragonflight, roll) {
	let rolls = 2
	if (success !== false) {
		if (season === true) {
			rolls = 3
		}

		var choices = [];
		choices.push('Frenzy', 'Lucky');
		if (!dragonflight) choices.push('Click Frenzy');
		if (roll[0+rolls] < 0.1) choices.push('Cookie Storm', 'Cookie Storm', 'Blab');
		if (roll[1+rolls] < 0.25) choices.push('Building Special');
		if (roll[2+rolls] < 0.15) choices = ['Cookie Storm Drop'];
		if (roll[3+rolls] < 0.0001) choices.push('Free Sugar Lump');
		return choose(choices, roll[4+rolls]);;
	} else {
		let rolls = 2
		if (season == true) {
			rolls = 3
		}
		var choices = [];
		choices.push('Clot', 'Ruin');
		if (roll[0+rolls] < 0.1) choices.push('Cursed Finger', 'Elder Frenzy');
		if (roll[1+rolls] < 0.003) choices.push('Free Sugar Lump');
		if (roll[2+rolls] < 0.1) choices = ['Blab'];
		return choose(choices, roll[3+rolls]);;
	}
}
// inputs
const seed = "aaaaa"
let spellsCasted = 0;




let spells = [1, 2, 3, 4, 5, 6, 7, 8]
let outcomes = []
let rolls = []
for (let i = 0; i < 30; i++) {
	Math.seedrandom(seed + '/' + spellsCasted);
	spellsCasted++;
	let roll = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
	rolls.push(roll[0]);
	let cookie1 = check_cookies(false, true, false, roll); // success no change
	let cookie2 = check_cookies(true, true, false, roll); // success one change
	let cookie3 = check_cookies(false, false, false, roll); // backfire no change 
	let cookie4 = check_cookies(true, false, false, roll); // backfire one change
	let cookie5 = check_cookies(false, true, true, roll); // success no change df
	let cookie6 = check_cookies(true, true, true, roll); // success one change df
	outcomes.push([cookie1, cookie2, cookie3, cookie4, cookie5, cookie6, roll]);
}
// make arrays for g!fthofs, bses, efs, and cfs in the range of casts
let gfthofs = []
let convertedgfthofs = [] // g!fthofs that are only g!fthofs if se is removed
let bses = []
let dfbses = []
let efs = []
let cfs = []
let spellInfo = []
for (let i = 0; i < 30; i++) {
	if (outcomes[i][2] == 'Elder Frenzy' || outcomes[i][3] == 'Elder Frenzy') 			 efs.push(i);
	if ((outcomes[i][0] == 'Building Special' || outcomes[i][1] == 'Building Special'))  bses.push(i);
	if ((outcomes[i][4] == 'Building Special' || outcomes[i][5] == 'Building Special' ) && !bses.includes(i)) dfbses.push(i);
	if (outcomes[i][0] == 'Click Frenzy' || outcomes[i][1] == 'Click Frenzy') 			 cfs.push(i);
	spellInfo.push({
		roll  : outcomes[i][6][0],
		ef    : outcomes[i][2] == "Elder Frenzy" || outcomes[i][3] == "Elder Frenzy",
		bs    : outcomes[i][0] == "Building Special" || outcomes[i][1] == "Building Special",
		dfbs  : (outcomes[i][4] == "Building Special" || outcomes[i][5] == "Building Special") && !bses.includes(i),
		cf    : outcomes[i][0] == "Click Frenzy" || outcomes[i][1] == "Click Frenzy"
	});
	if (spellInfo[i].roll > 2/8 && spellInfo[i].roll < 3/8){
		gfthofs.push(i)
	}
	if (spellInfo[i].roll < 2/7 && spellInfo[i].roll > 2/8){
		convertedgfthofs.push(i)
	}
}


// get possible offset abuses
 // offsets array is: offset start, offset end, number of g!fthofs, offset length, [initoffsetcost, manaafteroffset] (minimises initmana), [initoffsetcost, manaafteroffset] (maximises finalmana)
 let offsets = []
 for (const i of bses) {
 	if (rolls[i-1] < 0.5){
 		let gfthofnum = 0
 	for (let j = i - 1; j >= i - 7; j--) {
 			if (gfthofs.includes(j) || (convertedgfthofs.includes(j) && j <= i-2)) {
 				gfthofnum++;
 				// basic thing to weed out bad offsets in the second condition, improvable but quite a bit of effort would be needed
 				if (gfthofnum >= 2 && j-i-gfthofnum <= gfthofnum) {
 				offsets.push([i-1, j, gfthofnum, i-j]);
 				offsets[offsets.length-1].push(getOffsetCost(offsets[offsets.length-1]));
 			}
 			}
 	}
 }
 }
 // offsets that require df
 let dfoffsets = []
 for (const i of dfbses) {
 	if (rolls[i-1] < 0.5){
 		let gfthofnum = 0
 		for (let j=1; j <= 2; j++) {
 		if (rolls[i-j] < 2/7 && rolls[i-j] > 2/8) {
 			convertedgfthofs.push(i-j)
 		}
 	}
 	for (let j = i - 1; j >= i - 7; j--) {
 			if (gfthofs.includes(j) || convertedgfthofs.includes(j)) {
 				gfthofnum++;
 				if (gfthofnum >= 2 && j-i-gfthofnum <= gfthofnum) {
 				dfoffsets.push([i-1, j, gfthofnum, i-j]);
 				dfoffsets[dfoffsets.length-1].push(getOffsetCost(dfoffsets[dfoffsets.length-1]));
 			}
 			}
 	}
 }
 }

// offsets which do not require refilling mid offset, and only 1 g!fthof because multiple efs/cfs are useless
// ending gfd, first gfd, number of gfds in offset
let offsetCf = []
let offsetEf = []
for (const i of cfs){
	if (rolls[i-1] < 0.5) {
		for (let j=i-1; j >= i-7; j--){
			if (cfs.includes(j)){
				offsetCf.push([i-1, j, i-j])
				break
			}
		}
	}
}
for (const i of efs){
	if (rolls[i-1] > 0.5) {
		for (let j=i-1; j >= i-7; j--){
			if ((rolls[j] >= 2/8 && rolls[j] < 3/8) || rolls[j] > 7/8) {
				break
				}
			if (cfs.includes(j)){
				offsetEf.push([i-1, j, i-j])
				break
			
		}
		}
	}
}






let stateRows = [[{
	mana: 150,
	spellsCasted: 0,
	df: false,
	ef: false,
	cf: false,
	bs: 0,
	lumpsLeft: 2
}]]

for (let i = 0; i < 30; i++) {
	let newRow = []
	for (const state of stateRows[i]) {
		// g!fthof
		if ((spellInfo[i + 1].ef && !state.ef) || spellInfo[i + 1].bs || (spellInfo[i + 1].cf && !state.cf)) {
			let gfthofState = {
				mana: Math.floor(state.mana - getSpellCost(8, 2, state.mana, false)),
				spellsCasted: state.spellsCasted + 1,
				df: state.df,
				ef: state.ef,
				cf: state.cf,
				bs: state.bs,
				lumpsLeft: state.lumpsLeft
			};

			if (getGfd(getSpellPool(state.mana, state.mana), spellInfo[i].roll) == 2) {
				if (spellInfo[i + 1].ef) gfthofState.ef = true;
				if (spellInfo[i + 1].bs) gfthofState.bs += 1;
				if (spellInfo[i + 1].cf) gfthofState.cf = true;
				newRow.push(gfthofState);
			} else {
				let refilledGfthofState = {
					mana: Math.min(150, Math.floor(state.mana) + 100),
					spellsCasted: state.spellsCasted + 1,
					df: state.df,
					ef: state.ef,
					cf: state.cf,
					bs: state.bs,
					lumpsLeft: state.lumpsLeft - 1
				};

				if (getGfd(getSpellPool(refilledGfthofState.mana, refilledGfthofState.mana), spellInfo[i].roll) == 2) {
					refilledGfthofState.mana -= getSpellCost(8, 2, state.mana, false);
					if (spellInfo[i + 1].ef) refilledGfthofState.ef = true;
					if (spellInfo[i + 1].bs) refilledGfthofState.bs += 1;
					if (spellInfo[i + 1].cf) refilledGfthofState.cf = true;
					newRow.push(refilledGfthofState);
				}
			}
		}

		// fthof
		if (spellInfo[i].ef && !state.ef || spellInfo[i].cf && !state.cf || spellInfo[i].bs) {

			if (getSpellCost(8, 0, state.mana, true) <= state.mana) {
				newRow.push({
					mana: Math.floor(state.mana - getSpellCost(8, 0, state.mana, true)),
					spellsCasted: state.spellsCasted + 1,
					df: state.df,
					ef: state.ef,
					cf: state.cf,
					bs: state.bs,
					lumpsLeft: state.lumpsLeft
				});
			} else {
				newRow.push({
					mana: Math.min(150, Math.floor(state.mana) + 100) - getSpellCost(8, 0, Math.floor(state.mana) + 100, true),
					spellsCasted: state.spellsCasted + 1,
					df: state.df,
					ef: state.ef || spellInfo[i].ef,
					cf: state.cf || spellInfo[i].cf,
					bs: state.bs + (spellInfo[i].bs ? 1 : 0),
					lumpsLeft: state.lumpsLeft - 1
				})
			}
		}
		
		// skip
		let skipCost = getSkipCost(state.mana, spellInfo[i].roll, spellInfo[i+1].roll, false, false);
		if (skipCost <= state.mana) {
			newRow.push({
				mana: Math.floor(state.mana - skipCost),
				spellsCasted: state.spellsCasted + 1,
				df: state.df,
				ef: state.ef,
				cf: state.cf,
				lumpsLeft: state.lumpsLeft
			});
		} else {
			let refilledSkipState = {
				mana: Math.min(150, Math.floor(state.mana) + 100),
				spellsCasted: state.spellsCasted + 1,
				df: state.df,
				ef: state.ef,
				cf: state.cf,
				lumpsLeft: state.lumpsLeft
			};
			if (getSkipCost(refilledSkipState.mana, spellInfo[i].roll, spellInfo[i+1].roll, false, false) <= refilledSkipState.mana) {
				refilledSkipState.mana -= getSkipCost(refilledSkipState.mana, spellInfo[i].roll, spellInfo[i+1].roll, false, false);
				newRow.push(refilledSkipState);
			}
		}

	}
}
