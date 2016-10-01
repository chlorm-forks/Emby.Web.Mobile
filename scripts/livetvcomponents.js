define(["datetime","cardBuilder"],function(datetime,cardBuilder){function enableScrollX(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function getBackdropShape(){return enableScrollX()?"overflowBackdrop":"backdrop"}function getProgramScheduleHtml(items,options){options=options||{};var i,length,groups=[],currentGroupName="",currentGroup=[];for(i=0,length=items.length;i<length;i++){var item=items[i],dateText="";if(options.indexByDate!==!1&&item.StartDate)try{var premiereDate=datetime.parseISO8601Date(item.StartDate,!0);dateText=LibraryBrowser.getFutureDateText(premiereDate,!0)}catch(err){}dateText!=currentGroupName?(currentGroup.length&&groups.push({name:currentGroupName,items:currentGroup}),currentGroupName=dateText,currentGroup=[item]):currentGroup.push(item)}currentGroup.length&&groups.push({name:currentGroupName,items:currentGroup});var html="";for(i=0,length=groups.length;i<length;i++){var group=groups[i];group.name&&(html+='<div class="homePageSection">',html+='<h1 class="listHeader">'+group.name+"</h1>"),html+=enableScrollX()?'<div is="emby-itemscontainer" class="itemsContainer hiddenScrollX">':'<div is="emby-itemscontainer" class="itemsContainer vertical-wrap">',html+=cardBuilder.getCardsHtml({items:group.items,shape:getBackdropShape(),preferThumb:!0,showTitle:!0,showAirTime:!0,showAirEndTime:!0,showChannelName:!0,cardLayout:!0,action:"programdialog",cardFooterAside:"none",preferThumb:!0,coverImage:!0,overlayText:!1}),html+="</div>",group.name&&(html+="</div>")}return Promise.resolve(html)}function getTimersHtml(timers,options){options=options||{};var i,length,items=timers.map(function(t){return t.Type="Timer",t}),groups=[],currentGroupName="",currentGroup=[];for(i=0,length=items.length;i<length;i++){var item=items[i],dateText="";if(options.indexByDate!==!1&&item.StartDate)try{var premiereDate=datetime.parseISO8601Date(item.StartDate,!0);dateText=LibraryBrowser.getFutureDateText(premiereDate,!0)}catch(err){}dateText!=currentGroupName?(currentGroup.length&&groups.push({name:currentGroupName,items:currentGroup}),currentGroupName=dateText,currentGroup=[item]):currentGroup.push(item)}currentGroup.length&&groups.push({name:currentGroupName,items:currentGroup});var html="";for(i=0,length=groups.length;i<length;i++){var group=groups[i];group.name&&(html+='<div class="homePageSection">',html+='<h1 class="listHeader">'+group.name+"</h1>"),html+=enableScrollX()?'<div is="emby-itemscontainer" class="itemsContainer hiddenScrollX">':'<div is="emby-itemscontainer" class="itemsContainer vertical-wrap">',html+=cardBuilder.getCardsHtml({items:group.items,shape:getBackdropShape(),showTitle:!0,showAirTime:!0,showAirEndTime:!0,showChannelName:!0,lazy:!0,cardLayout:!0,action:"edit",cardFooterAside:"none",preferThumb:!0,coverImage:!0,overlayText:!1}),html+="</div>",group.name&&(html+="</div>")}return Promise.resolve(html)}window.LiveTvHelpers={getTimersHtml:getTimersHtml,getProgramScheduleHtml:getProgramScheduleHtml}});