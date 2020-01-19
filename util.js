function Util(){}

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}
function getPixelValRGB(x,y){
	if(contextTmp ==null){
		return null;
	}
	var myData = contextTmp.getImageData(x, y, 1,1).data;
	return {r:myData[0],g:myData[1],b:myData[2]};
}
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function validValue(values){
	return values.r + values.g + values.b ==0;
}