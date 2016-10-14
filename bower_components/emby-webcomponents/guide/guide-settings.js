define(["dialogHelper","globalize","userSettings","layoutManager","connectionManager","require","loading","scrollHelper","emby-checkbox","emby-radio","css!./../formdialog","material-icons"],function(dialogHelper,globalize,userSettings,layoutManager,connectionManager,require,loading,scrollHelper){"use strict";function save(context){var i,length,chkIndicators=context.querySelectorAll(".chkIndicator");for(i=0,length=chkIndicators.length;i<length;i++){var type=chkIndicators[i].getAttribute("data-type");userSettings.set("guide-indicator-"+type,chkIndicators[i].checked)}userSettings.set("guide-colorcodedbackgrounds",context.querySelector(".chkColorCodedBackgrounds").checked),userSettings.set("livetv-favoritechannelsattop",context.querySelector(".chkFavoriteChannelsAtTop").checked);var sortBys=context.querySelectorAll(".chkSortOrder");for(i=0,length=sortBys.length;i<length;i++)if(sortBys[i].checked){userSettings.set("livetv-channelorder",sortBys[i].value);break}}function load(context){var i,length,chkIndicators=context.querySelectorAll(".chkIndicator");for(i=0,length=chkIndicators.length;i<length;i++){var type=chkIndicators[i].getAttribute("data-type");"true"===chkIndicators[i].getAttribute("data-default")?chkIndicators[i].checked="false"!==userSettings.get("guide-indicator-"+type):chkIndicators[i].checked="true"===userSettings.get("guide-indicator-"+type)}context.querySelector(".chkColorCodedBackgrounds").checked="true"===userSettings.get("guide-colorcodedbackgrounds"),context.querySelector(".chkFavoriteChannelsAtTop").checked="false"!==userSettings.get("livetv-favoritechannelsattop");var sortByValue=userSettings.get("livetv-channelorder")||"Number",sortBys=context.querySelectorAll(".chkSortOrder");for(i=0,length=sortBys.length;i<length;i++)sortBys[i].checked=sortBys[i].value===sortByValue}function showEditor(){return new Promise(function(resolve,reject){var settingsChanged=!1;require(["text!./guide-settings.template.html"],function(template){var dialogOptions={removeOnClose:!0,scrollY:!1};layoutManager.tv?dialogOptions.size="fullscreen":dialogOptions.size="small";var dlg=dialogHelper.createDialog(dialogOptions);dlg.classList.add("formDialog");var html="";html+=globalize.translateDocument(template,"sharedcomponents"),dlg.innerHTML=html,dlg.addEventListener("change",function(){settingsChanged=!0}),dlg.addEventListener("close",function(){layoutManager.tv&&scrollHelper.centerFocus.off(dlg.querySelector(".formDialogContent"),!1),save(dlg),settingsChanged?resolve():reject()}),dlg.querySelector(".btnCancel").addEventListener("click",function(){dialogHelper.close(dlg)}),layoutManager.tv&&scrollHelper.centerFocus.on(dlg.querySelector(".formDialogContent"),!1),load(dlg),dialogHelper.open(dlg)})})}return{show:showEditor}});