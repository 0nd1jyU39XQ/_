!function(){"use strict";function e(e){var t=e.dataset.width,a=e.dataset.height,i=a/t*100,s=e.previousElementSibling;s.setAttribute("style","padding-bottom:"+i+"%;");var r=e.parentElement,n=r.offsetWidth,o=r.offsetHeight;r.setAttribute("style","max-width:"+n+"px; max-height:"+o+"px;");var d=e.querySelector(".progressiveMedia-thumbnail"),h=d.width,g=d.height,c=e.querySelector(".progressiveMedia-canvas");c.getContext("2d");c.height=g,c.width=h;var l=new Image;l.src=d.src,l.onload=function(){var t=new CanvasImage(c,l);t.blur(2),e.classList.add("is-canvasLoaded")};var m=e.querySelector(".progressiveMedia-image");m.src=m.dataset.src,m.onload=function(){e.classList.add("is-imageLoaded")}}for(var t=document.querySelectorAll(".progressiveMedia"),a=0;a<t.length;a++)e(t[a])}(),CanvasImage=function(e,t){this.image=t,this.element=e,e.width=t.width,e.height=t.height,this.context=e.getContext("2d"),this.context.drawImage(t,0,0)},CanvasImage.prototype={blur:function(e){this.context.globalAlpha=.5;for(var t=-e;e>=t;t+=2)for(var a=-e;e>=a;a+=2){this.context.drawImage(this.element,a,t);a>=0&&t>=0&&this.context.drawImage(this.element,-(a-1),-(t-1))}}};
