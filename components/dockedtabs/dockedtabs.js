define(['css!./dockedtabs'],function(){function render(options){var elem=document.createElement('div');elem.classList.add('dockedtabs');elem.classList.add('dockedtabs-bottom');document.body.appendChild(elem);return elem;}
function initHeadRoom(instance,elem){require(["headroom"],function(){var headroom=new Headroom(elem,{tolerance:{down:20,up:0},classes:{pinned:'dockedtabs--pinned',unpinned:'dockedtabs--unpinned',top:'dockedtabs--top',notTop:'dockedtabs--not-top',initial:'dockedtabs-headroom'}});headroom.init();instance.headroom=headroom;});}
function dockedTabs(options){var self=this;self.element=render(options);initHeadRoom(self,self.element);}
dockedTabs.prototype.destroy=function(){var self=this;if(self.headroom){self.headroom.destroy();}
self.Element=null;};return dockedTabs;});