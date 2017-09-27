var container=document.getElementById("container");
var list=document.getElementById("list");
var prev=document.getElementById("prev");
var next=document.getElementById("next");
var buttons=document.getElementById("buttons").getElementsByTagName("span");
var index=1;
var timer;

function animate(offset){
	var newLeft=parseInt(list.style.left)+offset
	list.style.left=newLeft+"px";
	if(newLeft<-3000){
		list.style.left=-600+"px";
	}
	if(newLeft>-600){
		list.style.left=-3000+"px";
	}
}
function showButtons(){
	for(var i=0;i<buttons.length;i++){
		if(buttons[i].className=="on"){
			buttons[i].className="";
			break;
		}
	}
	buttons[index-1].className="on";
}
next.onclick=function(){
	animate(-600);
	if(index==5){
		index=1;
	}else{
		index+=1;
	}
	showButtons();
}
prev.onclick=function(){
	animate(600);
	if(index==1){
		index=5
	}else{
		index-=1;
	}
	showButtons();
}
for(var i=0;i<buttons.length;i++){
	buttons[i].onclick=function(){
		//优化，如果一直点击同一个按钮，不执行代码
		if (this.className=="on") {
			return;
		}	
		myIndex=parseInt(this.getAttribute("index"));
		var offset=-600*(myIndex-index);
		animate(offset);
		index=myIndex;
		showButtons();
	}
}
function play(){
	timer=setInterval(function(){
		next.onclick();
	},3000);
}
function stop(){
	clearInterval(timer);
}
container.onmouseover=stop;
container.onmouseout=play;
play();