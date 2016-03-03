define([],function(){function playItems(items,shuffle){if(shuffle){items=shuffleArray(items);}
items=items.map(function(i){return i.Id;});if(items.length){MediaController.play({ids:items});}
else{require(['toast'],function(toast){toast(Globalize.translate('MessageNoItemsFound'));});}}
function shuffleArray(array){var currentIndex=array.length,temporaryValue,randomIndex;while(0!==currentIndex){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temporaryValue;}
return array;}
return function(result){result.success=false;var query={Limit:result.item.limit||100,UserId:result.userId,ExcludeLocationTypes:"Virtual"};if(result.item.itemType){query.IncludeItemTypes=result.item.itemType;}
if(result.item.sourceid==='nextup'){ApiClient.getNextUpEpisodes(query).then(function(queryResult){playItems(queryResult.Items,result.item.shuffle);});result.success=true;return;}
if(result.item.shuffle){result.item.sortBy=result.sortBy?'Random,'+result.item.sortBy:'Random';}
query.SortBy=result.item.sortBy;query.SortOrder=result.item.sortOrder;query.Recursive=true;if(result.item.filters.indexOf('unplayed')!==-1){query.IsPlayed=false;}
if(result.item.filters.indexOf('played')!==-1){query.IsPlayed=true;}
if(result.item.filters.indexOf('favorite')!==-1){query.Filters='IsFavorite';}
ApiClient.getItems(Dashboard.getCurrentUserId(),query).then(function(queryResult){playItems(queryResult.Items,result.item.shuffle);});result.success=true;return;}});