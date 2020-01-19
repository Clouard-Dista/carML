function Car(color,x,y,h,w){
	this.x = x||383;
	this.y = y||120;
	this.h = h||10;
	this.w = w||20;
	this.vit=0
	this.rad = 0;
	this.color= color||"blue";

	this.wLT = false;
	this.wLB = false;
	this.wRT = false;
	this.wRB = false;

	this.capL = {x:0,y:0};
	this.capLT = {x:0,y:0};
	this.capT = {x:0,y:0};
	this.capRT = {x:0,y:0};
	this.capR = {x:0,y:0};
}
Car.prototype.controle = function(value){
	if(value == -1){
		this.rad -=0.2;
		if(this.rad<0){
			this.rad=12;
		}
	}
	if(value == 1){
		this.rad +=0.2;
		if(this.rad>12){
			this.rad=0;
		}
	}
}
Car.prototype.vitesse = function(value){
	if(value == -1){
		this.vit -=0.2;
		if(this.vit<-2){
			this.vit=-2;
		}
	}
	if(value == 0.5){
		this.vit +=0.2;
		if(this.vit>1.5){
			this.vit=1.5;
		}
	}
	if(value == 1){
		this.vit +=0.2;
		if(this.vit>3){
			this.vit=3;
		}
	}
	if(value == 0){
		this.vit = 0;
	}
}
Car.prototype.move = function(){
	this.x += Math.cos(-this.rad*Math.PI/6)*this.vit;
	this.y -= Math.sin(-this.rad*Math.PI/6)*this.vit;
	var checkCar = this.allowDenny();
	this.detect()
	for (var i = 0; i < 1*checkCar; i++) {
		if(this.vit<-1){
			this.vit +=0.05;
		}
		if(this.vit>1){
			this.vit -=0.05;
		}
	}
	if(this.vit<0){
		this.vit +=0.05;
	}
	if(this.vit>0){
		this.vit -=0.05;
	}
	this.vit = Math.round(this.vit*100)/100
}
Car.prototype.isOut = function(){
	return (this.capT.y == this.y && this.capT.x == this.x)
}
Car.prototype.draw = function(ctx){
	ctx.save();  
	ctx.translate(this.x,this.y);
	ctx.rotate(this.rad*Math.PI/6);
	ctx.fillStyle=this.color;
	ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
	ctx.fillStyle="#000000";
	ctx.fillRect(2, -this.h/2+2, this.w/2-4, this.h-4)
	var blox=2;
	ctx.fillStyle = this.wLB?"green":"red";
	ctx.fillRect(-this.w/2-blox/2,-this.h/2-blox/2, blox, blox)
	ctx.fillStyle = this.wRB?"green":"red";
	ctx.fillRect(-this.w/2-blox/2,this.h/2-blox/2, blox, blox)
	ctx.fillStyle = this.wRT?"green":"red";
	ctx.fillRect(this.w/2-blox/2,this.h/2-blox/2, blox, blox)
	ctx.fillStyle = this.wLT?"green":"red";
	ctx.fillRect(this.w/2-blox/2,-this.h/2-blox/2, blox, blox)
	ctx.restore();

	var tab = [this.capL,this.capLT,this.capT,this.capRT,this.capR];
	for (var i = 0; i < tab.length; i++) {
		ctx.fillStyle = "#cc00cc";
		ctx.fillRect(tab[i].x-blox/2,tab[i].y-blox/2, blox, blox)
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(tab[i].x, tab[i].y);
		ctx.strokeStyle = "#996633";
		ctx.stroke();
	}
}
Car.prototype.allowDenny = function(ctx){
	var count = 0;
	var xtab = [this.x-this.w/2,this.x-this.w/2,this.x+this.w/2,this.x+this.w/2];
	var ytab = [this.y-this.h/2,this.y+this.h/2,this.y+this.h/2,this.y-this.h/2];
	for (var i = 0; i < xtab.length; i++) {
		var check = true;
		tmp =rotate(this.x,this.y,xtab[i],ytab[i],-Math.degrees(this.rad*Math.PI/6))
		XpW = tmp[0];
		YmH = tmp[1];
		if(validValue(getPixelValRGB(XpW,YmH))){
			count++;
			check = false;
		}
		if(i==3){
			this.wLT = check;
		}else if(i==0){
			this.wLB = check;
		}else if(i==2){
			this.wRT = check;
		}else if(i==1){
			this.wRB = check;
		}
	}
	return count;
}
Car.prototype.detect = function(){
	var xtab = [  0, 5, 5, 5,  0];
	var ytab = [-5,-5,  0, 5, 5];
	var resultValue = [];

	for (var i = 0; i < xtab.length; i++) {
		var tmpValue = {x:this.x,y:this.y};
		var lastValue = {x:this.x,y:this.y};
		var xtmp = xtab[i];
		var ytmp = ytab[i];
		while(xtmp < -1 || xtmp > 1 || ytmp < -1 || ytmp > 1){
			var tmp =rotate(this.x,this.y,tmpValue.x+xtmp,tmpValue.y+ytmp,-Math.degrees(this.rad*Math.PI/6))
			var XpW = tmp[0];
			var YmH = tmp[1];
			if(validValue(getPixelValRGB(XpW,YmH))){
				xtmp = xtmp / 2;
				ytmp = ytmp / 2;
			}else{
				tmpValue.x += xtmp;
				tmpValue.y += ytmp;
				lastValue.x = XpW;
				lastValue.y = YmH;
			}
		}
		resultValue[i] = lastValue;
	}
	this.capL = resultValue[0];
	this.capLT = resultValue[1];
	this.capT = resultValue[2];
	this.capRT = resultValue[3];
	this.capR = resultValue[4];
		
	
}

