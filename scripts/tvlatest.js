define(["components/categorysyncbuttons","components/groupedcards","cardBuilder","apphost"],function(categorysyncbuttons,groupedcards,cardBuilder,appHost){"use strict";function getLatestPromise(context,params){Dashboard.showLoadingMsg();var userId=Dashboard.getCurrentUserId(),parentId=params.topParentId,options={IncludeItemTypes:"Episode",Limit:30,Fields:"PrimaryImageAspectRatio,BasicSyncInfo",ParentId:parentId,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+userId+"/Items/Latest",options))}function loadLatest(context,params,promise){promise.then(function(items){var html="",supportsImageAnalysis=appHost.supports("imageanalysis"),cardLayout=supportsImageAnalysis;html+=cardBuilder.getCardsHtml({items:items,shape:"backdrop",preferThumb:!0,showTitle:!0,showSeriesYear:!0,showParentTitle:!0,overlayText:!1,cardLayout:cardLayout,showUnplayedIndicator:!1,showChildCountIndicator:!0,centerText:!cardLayout,lazy:!0,overlayPlayButton:!0,vibrant:supportsImageAnalysis,lines:2});var elem=context.querySelector("#latestEpisodes");elem.innerHTML=html,ImageLoader.lazyChildren(elem),Dashboard.hideLoadingMsg()})}return function(view,params,tabContent){var self=this;categorysyncbuttons.init(tabContent);var latestPromise;self.preRender=function(){latestPromise=getLatestPromise(view,params)},self.renderTab=function(){loadLatest(tabContent,params,latestPromise)},tabContent.querySelector("#latestEpisodes").addEventListener("click",groupedcards.onItemsContainerClick)}});