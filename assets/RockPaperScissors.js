(function(){
	var jankenImg = $('#janken');
	var startButton = $('#start-button');
	var resetButton = $('#reset-button');
	var resultsDiv = $('#results');
	
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
	
	// init number list and storage
	var numberListAll = [1,2,3];

	var storage = localStorage;
	var resultKey = 'janken.resultlist';
	var setResultList = function(a) {
		storage.setItem(resultKey, JSON.stringify(a));
	};
	var getResultList = function() {
		return JSON.parse(storage.getItem(resultKey));
	};
	var resetLists = function() {
		setResultList([]);
	};

	// initialize
	resetLists();

	var getNumberRamdom = function(){
		var numberList = numberListAll;
		var i = Math.floor(Math.random() * numberList.length);
		return numberList[i];
	};
	var resultIndex = function() {
		var resultList = getResultList();
		return resultList.length;
	}
	var resultNumberRamdom = function(){
		var numberList = numberListAll;
		var i = Math.floor(Math.random() * numberList.length);
		var result = numberList[i];
		var resultList = getResultList();
		resultList.push(result);
		setResultList(resultList);
		return result
	};
	
	var isStarted = false;
	function randomFunc() {
		if(isStarted) {
			jankenImg.attr("src",toJankenSrc(getNumberRamdom()));
			setTimeout(randomFunc, 50);
		}
	} 
	var stop = function(time) {
		isStarted = false;
		startButton.text('Start');
		var n = resultNumberRamdom();
		var i = resultIndex();
		jankenImg.attr("src",toJankenSrc(n));
		addResult(i,n);
	};
	var start = function(){
		isStarted = true;
		startButton.text('Stop');
		randomFunc();
	};
	// click the start
	var startClicked = function(e){
		if(isStarted) {
			stop(null);
		} else {
			start();
		}
	};
	startButton.click(startClicked); // button
	startButton.focus();
	
	// init reset button
	var resetClicked = function() {
		if (confirm('Do you want to reset?')) {
			resetLists();
			jankenImg.attr("src",toJankenSrc(0));
			resultsDiv.empty();
			startButton.focus();
		}
	};
	resetButton.click(resetClicked);
	
})();