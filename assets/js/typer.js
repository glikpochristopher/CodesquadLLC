const typeWriter=function(txtElement,words,wait=3000){
    this.txtElement=txtElement;
    this.words=words;
    this.txt="";
    this.wordIndex=0;
    this.wait=parseInt(wait,10);
    this.type();
    this.isDeleting=false;
}
//Type Method
typeWriter.prototype.type=function(){
   //Current index word
   const current=this.wordIndex % this.words.length;
   //Get full text of current word
   const fulltxt=this.words[current];

   //Check if deleting
   if(this.isDeleting){
       //Remove Char
       this.txt=fulltxt.substring(0,this.txt.length -1);
   }
   else{
       //Add Char
       this.txt=fulltxt.substring(0,this.txt.length +1);
   }

   //Insert txt into Element
   this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`;

   //Initial Type Speed
   let typeSpeed=300;
   if(this.isDeleting){
       typeSpeed /=2;
   }
   
   //If words is complete
   if(!this.isDeleting && this.txt===fulltxt){
       //make pause at the end
       typeSpeed=this.wait;
       //Set delete to true
       this.isDeleting=true;
   }else if(this.isDeleting && this.txt===''){
       this.isDeleting=false;
       //Move to next word
       this.wordIndex++;
       //Pause before you start
       typeSpeed=500;
   }

    setTimeout(()=>this.type(),typeSpeed);
}
// Init on Dom Load
document.addEventListener("DOMContentLoaded",init);
//Init app
function init(){
    const txtElement=document.querySelector(".txt-type");
    const words=JSON.parse(txtElement.getAttribute("data-words"));
    const wait=txtElement.getAttribute("data-wait");
    //Init TyperWriter
    new typeWriter(txtElement,words,wait);
}