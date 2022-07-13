var click=0,tops,left,move,oldtop,oldleft;
var arr=[]
class Pair{
	constructor(t,l){
		this.t=t;
		this.l=l;
	}
	t(){
		return this.t;
	}
	l(){
		return this.l;
	}
}
colorcod=[];
for (var i = 65; i <=69 ; i++)
	colorcod[i-65]=String.fromCharCode(i);
for (var i = 0; i < 10; i++)
	colorcod.push(i);
function randomcolor(){
	str="#";
	for (var i = 0; i < 6; i++)
		str+=colorcod[Math.floor(Math.random()*colorcod.length)];
	return str;
}
window.addEventListener("mousemove",function (e) {
	tops=e.y;
	left=e.x;
	
});
var oldloca=[]
function update(sid) {
	sid.style.top=tops-oldtop+"px";
	sid.style.left=left-oldleft+"px";
	oldloca.push(new Pair(sid.style.top,sid.style.left));
}
//reverting Back to old location
function oldlocation(circle){
		circle.style.top=oldloca[oldloca.length-1].t;
		circle.style.left=oldloca[oldloca.length-1].l;
		oldloca.pop();
		if(oldloca.length==0)
			clearInterval(relocating);
}
var relocating;
function toggle(solidId,idd) {
	click++;
	if(click==1){
		oldtop=tops;
		oldleft=left;
		move=setInterval(function (){ update(solidId); },1);
	}
	else{
		clearInterval(move);
		if(!elementsOverlap(idd)){
			relocating =setInterval(function (){ oldlocation(solidId);},10);
		}
		else
			oldloca=[];
		click=0;
	}
}
//suffels array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
//checks wheather element is inside the correct circle
function elementsOverlap(no) {
  domRect1 = document.getElementById("hollowCircle"+no).getBoundingClientRect();
  domRect2 = document.getElementById("solidCircle"+no).getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}
function createsElement(no,cn,idName,color) {
	div_obj=document.getElementById(idName);
	spans=document.createElement("span");
	spans.id=idName+no;
	spans.className=cn;
	spans.style.color=color;
	spans.style.fontSize=150+"px";
	if(cn=="gamecircle-solid"){
		spans.style.position="relative";
		spans.setAttribute("onclick","toggle("+spans.id+","+no+")");
		arr.push(spans);
	}
	else
		div_obj.appendChild(spans);
}
function appendit() {
	div_obj=document.getElementById("solidCircle");
	for (var i = 0; i < arr.length; i++){
		div_obj.appendChild(arr[i]);
		if ((i+1)%3==0)
				div_obj.innerHTML+="<br>";
	}
}
function create(no){
	count=0;
	for (var i = 0; i < no; i++) {
		for (var j = 0; j <=i ; j++) {	
			color=randomcolor();	//Random color generator
			createsElement(count,"gamecircle-regular","hollowCircle",color);
			createsElement(count,"gamecircle-solid","solidCircle",color);
			count++;
		}
		document.getElementById("hollowCircle").innerHTML+="<br>";
	}
	arr=shuffle(arr);
	appendit();
}
function start(no){
	document.getElementById("gameplay").remove();
	document.getElementById("retry").hidden=false;
	document.body.style.backgroundColor = "#f0f8ff";
	create(no)
}
function retry() {
	window.location.reload();
}