$(function(){
	var resultsDiv = $('#results');

	var isStarted = false;
	var isStopAnim = false;
	var resultParam = null;

	// result function
	var toJankenSrc = function(n) {
		switch(n) {
			case 2:
				return "images/janken_choki.png";
			case 3:
				return "images/janken_pa.png";
		}
		return "images/janken_gu.png";
	}
	var addResult = function(i,n) {
		resultsDiv.append('<div><span class="uk-label uk-label-success">' + i + '</span><img class="uk-align-center" data-src="' + toJankenSrc(n) + '" width="145" height="135" alt="" uk-img></div>');
	};
  
	// roulett function
	var option = {
		speed : 10,
		duration : 300,
		stopImageNumber : -1,// ramdom
		startCallback : function() {
			console.log('start');
		},
		slowDownCallback : function() {
			console.log('slowDown');
		},
		stopCallback : function($stopElm) {
			resultParam = $stopElm.data('number');
			console.log('result %s',resultParam);
			stopEnd();
		}
	}
	var rouletter = $('div.roulette');
	rouletter.roulette(option);	
	
	// initialize
	var resultKey = 'janken.resultlist';
	var setResultList = function(a) {
		try {
			localStorage.setItem(resultKey, JSON.stringify(a));
		} catch(e) {
		}
	};
	var getResultList = function() {
		try {
			return JSON.parse(localStorage.getItem(resultKey));
		} catch(e) {
			return [];
		}
	};
	var resetLists = function() {
		setResultList([]);
	};

	resetLists();
	var resultIndex = function() {
		var resultList = getResultList();
		return resultList.length;
	}

	// click start
	$('.start').click(function(){
		if(!isStopAnim) {
			if(isStarted) {
				isStopAnim = true;
				rouletter.roulette('stop');	
			} else {
				isStarted = true;
				$('.start').text('Stop');
				rouletter.roulette('start');
			}
		}
	});
	// click stop
	var stopEnd = function() {
		isStarted = false;
		isStopAnim = false;
		var resultList = getResultList();
		resultList.push(resultParam);
		setResultList(resultList);

		var i = resultIndex();
		$('.start').text('Start');
		addResult(i,resultParam);
	};
	$('.start').focus();
	
	// init reset button
	$('.reset').click(function() {
		if (confirm('Do you want to reset?')) {
			resetLists();
			resultsDiv.empty();
			$('.start').focus();
		}
	});

	// init number list and storage
	var resultKey = 'janken.resultlist';
	var setResultList = function(a) {
		try {
			localStorage.setItem(resultKey, JSON.stringify(a));
		} catch(e) {
		}
	};
	var getResultList = function() {
		try {
			return JSON.parse(localStorage.getItem(resultKey));
		} catch(e) {
			return [];
		}
	};
	var resetLists = function() {
		setResultList([]);
	};

	// initialize
	resetLists();
	
});