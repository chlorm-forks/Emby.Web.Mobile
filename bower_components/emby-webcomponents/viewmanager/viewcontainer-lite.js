define(["browser","dom","css!./viewcontainer-lite"],function(browser,dom){"use strict";function enableAnimation(){return!browser.tv&&(navigator.userAgent.toLowerCase().indexOf("embytheaterpi")===-1&&browser.supportsCssAnimation())}function loadView(options){if(!options.cancel){cancelActiveAnimations();var selected=selectedPageIndex,previousAnimatable=selected===-1?null:allPages[selected],pageIndex=selected+1;pageIndex>=pageContainerCount&&(pageIndex=0);var view=document.createElement("div");options.type&&view.setAttribute("data-type",options.type),view.innerHTML=options.view;var currentPage=allPages[pageIndex],animatable=view;return view.classList.add("mainAnimatedPage"),currentPage?(triggerDestroy(currentPage),mainAnimatedPages.replaceChild(view,currentPage)):mainAnimatedPages.appendChild(view),allPages[pageIndex]=view,onBeforeChange&&onBeforeChange(view,!1,options),beforeAnimate(allPages,pageIndex,selected),animate(animatable,previousAnimatable,options.transition,options.isBack).then(function(){return selectedPageIndex=pageIndex,currentUrls[pageIndex]=options.url,!options.cancel&&previousAnimatable&&afterAnimate(allPages,pageIndex),view})}}function beforeAnimate(allPages,newPageIndex,oldPageIndex){for(var i=0,length=allPages.length;i<length;i++)newPageIndex===i||oldPageIndex===i||allPages[i].classList.add("hide")}function afterAnimate(allPages,newPageIndex){for(var i=0,length=allPages.length;i<length;i++)newPageIndex===i||allPages[i].classList.add("hide")}function animate(newAnimatedPage,oldAnimatedPage,transition,isBack){if(enableAnimation()&&oldAnimatedPage){if("slide"===transition)return slide(newAnimatedPage,oldAnimatedPage,transition,isBack);if("fade"===transition)return fade(newAnimatedPage,oldAnimatedPage,transition,isBack)}return Promise.resolve()}function slide(newAnimatedPage,oldAnimatedPage,transition,isBack){return new Promise(function(resolve,reject){var duration=450,animations=[];oldAnimatedPage&&(isBack?setAnimation(oldAnimatedPage,"view-slideright-r "+duration+"ms ease-out normal both"):setAnimation(oldAnimatedPage,"view-slideleft-r "+duration+"ms ease-out normal both"),animations.push(oldAnimatedPage)),isBack?setAnimation(newAnimatedPage,"view-slideright "+duration+"ms ease-out normal both"):setAnimation(newAnimatedPage,"view-slideleft "+duration+"ms ease-out normal both"),animations.push(newAnimatedPage),currentAnimations=animations;var onAnimationComplete=function(){dom.removeEventListener(newAnimatedPage,dom.whichAnimationEvent(),onAnimationComplete,{once:!0}),resolve()};dom.addEventListener(newAnimatedPage,dom.whichAnimationEvent(),onAnimationComplete,{once:!0})})}function fade(newAnimatedPage,oldAnimatedPage,transition,isBack){return new Promise(function(resolve,reject){var duration=400,animations=[];oldAnimatedPage&&(setAnimation(oldAnimatedPage,"view-fadeout "+duration+"ms ease-out normal both"),animations.push(oldAnimatedPage)),setAnimation(newAnimatedPage,"view-fadein "+duration+"ms ease-in normal both"),animations.push(newAnimatedPage),currentAnimations=animations;var onAnimationComplete=function(){dom.removeEventListener(newAnimatedPage,dom.whichAnimationEvent(),onAnimationComplete,{once:!0}),resolve()};dom.addEventListener(newAnimatedPage,dom.whichAnimationEvent(),onAnimationComplete,{once:!0})})}function setAnimation(elem,value){requestAnimationFrame(function(){elem.style.animation=value})}function cancelActiveAnimations(){for(var animations=currentAnimations,i=0,length=animations.length;i<length;i++)animations[i].animation="none"}function setOnBeforeChange(fn){onBeforeChange=fn}function tryRestoreView(options){var url=options.url,index=currentUrls.indexOf(url);if(index!==-1){var animatable=allPages[index],view=animatable;if(view){if(options.cancel)return;cancelActiveAnimations();var selected=selectedPageIndex,previousAnimatable=selected===-1?null:allPages[selected];return onBeforeChange&&onBeforeChange(view,!0,options),beforeAnimate(allPages,index,selected),animatable.classList.remove("hide"),animate(animatable,previousAnimatable,options.transition,options.isBack).then(function(){return selectedPageIndex=index,!options.cancel&&previousAnimatable&&afterAnimate(allPages,index),view})}}return Promise.reject()}function triggerDestroy(view){view.dispatchEvent(new CustomEvent("viewdestroy",{cancelable:!1}))}function reset(){allPages=[],currentUrls=[],mainAnimatedPages.innerHTML="",selectedPageIndex=-1}var onBeforeChange,mainAnimatedPages=document.querySelector(".mainAnimatedPages"),allPages=[],currentUrls=[],pageContainerCount=3,selectedPageIndex=-1,currentAnimations=[];return{loadView:loadView,tryRestoreView:tryRestoreView,reset:reset,setOnBeforeChange:setOnBeforeChange}});