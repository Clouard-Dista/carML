Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

document.initKeys = function(keyCodes) {
	if(!Array.isArray(keyCodes)){
		throw "\"initKeys\" need a number array.";
	}
	document.eventKey={
		param: keyCodes,
		active: new Array(keyCodes.length).fill(0)
	}
	document.getKey = function(key) {
		let selected = document.eventKey.param.indexOf(key);
		if (selected == -1)
			return -1;
		return document.eventKey.active[selected]
	};
	var editkey = function(event, value){
		let selected = document.eventKey.param.indexOf(event.keyCode);
		if (selected == -1)
			return;
		document.eventKey.active[selected] = value;
	}
	document.onkeydown = function(e){
		editkey(e, 1);
	}
	document.onkeyup = function(e){
		editkey(e, 0);
	}
};