define(['dialogHelper','jQuery','emby-button'],function(dialogHelper,$){var currentRecognition;var lang='en-US';var commandgroups;function getCommandGroups(){if(commandgroups){return Promise.resolve(commandgroups);}
return new Promise(function(resolve,reject){var file="grammar";var xhr=new XMLHttpRequest();xhr.open('GET',"voice/grammar/"+file+".json",true);xhr.onload=function(e){commandgroups=JSON.parse(this.response);resolve(commandgroups);}
xhr.onerror=reject;xhr.send();});}
function shuffleArray(array){var currentIndex=array.length,temporaryValue,randomIndex;while(0!==currentIndex){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temporaryValue;}
return array;}
function getSampleCommands(groupid){return getCommandGroups().then(function(commandGroups){groupid=typeof(groupid)!=='undefined'?groupid:'';var commands=[];commandGroups.map(function(group){if((group.items&&group.items.length>0)&&(groupid==group.groupid||groupid=='')){group.items.map(function(item){if(item.commandtemplates&&item.commandtemplates.length>0){item.commandtemplates.map(function(templates){commands.push(templates);});}});}});return shuffleArray(commands);});}
function getCommandGroup(groupid){if(commandgroups){var idx=-1;idx=commandgroups.map(function(e){return e.groupid;}).indexOf(groupid);if(idx>-1)
return commandgroups[idx];else
return null;}
else
return null;}
function renderSampleCommands(elem,commands){commands.length=Math.min(commands.length,4);commands=commands.map(function(c){return'<div class="exampleCommand"><span class="exampleCommandText">"'+c+'"</span></div>';}).join('');$('.exampleCommands',elem).html(commands);}
var currentDialog;function showVoiceHelp(groupid,title){var dlg=dialogHelper.createDialog({size:'medium',removeOnClose:true});dlg.classList.add('ui-body-b');dlg.classList.add('background-theme-b');var html='';html+='<h2 class="dialogHeader">';html+='<paper-fab icon="arrow-back" mini class="btnCancelVoiceInput"></paper-fab>';if(groupid){var grp=getCommandGroup(groupid);if(grp)
html+='  '+grp.name;}
html+='</h2>';html+='<div>';var getCommandsPromise=getSampleCommands(groupid);html+='<div class="voiceHelpContent">';html+='<div class="defaultVoiceHelp">';html+='<h1 style="margin-bottom:1.25em;">'+Globalize.translate('HeaderSaySomethingLike')+'</h1>';html+='<div class="exampleCommands">';html+='</div>';html+='</div>';html+='<div class="unrecognizedCommand" style="display:none;">';html+='<h1>'+Globalize.translate('HeaderYouSaid')+'</h1>';html+='<p class="exampleCommand voiceInputContainer"><i class="fa fa-quote-left"></i><span class="voiceInputText exampleCommandText"></span><i class="fa fa-quote-right"></i></p>';html+='<p>'+Globalize.translate('MessageWeDidntRecognizeCommand')+'</p>';html+='<br/>';html+='<button is="emby-button" type="button" class="raised submit block btnRetry"><iron-icon icon="mic"></iron-icon><span>'+Globalize.translate('ButtonTryAgain')+'</span></button>';html+='<p class="blockedMessage" style="display:none;">'+Globalize.translate('MessageIfYouBlockedVoice')+'<br/><br/></p>';html+='</div>';html+='<button is="emby-button" type="button" class="raised block btnCancelVoiceInput" style="background-color:#444;"><iron-icon icon="close"></iron-icon><span>'+Globalize.translate('ButtonCancel')+'</span></button>';html+='</div>';html+='</div>';dlg.innerHTML=html;document.body.appendChild(dlg);dialogHelper.open(dlg);currentDialog=dlg;dlg.addEventListener('close',function(){currentDialog=null;});$('.btnCancelVoiceInput',dlg).on('click',function(){destroyCurrentRecognition();dialogHelper.close(dlg);});$('.btnRetry',dlg).on('click',function(){$('.unrecognizedCommand').hide();$('.defaultVoiceHelp').show();startListening(false);});getCommandsPromise.then(function(commands){renderSampleCommands(dlg.querySelector('.voiceHelpContent'),commands);});}
function hideVoiceHelp(){$('.voiceInputHelp').remove();}
function showUnrecognizedCommandHelp(){$('.unrecognizedCommand').show();$('.defaultVoiceHelp').hide();}
function processTranscript(text,isCancelled){$('.voiceInputText').html(text);if(text||AppInfo.isNativeApp){$('.blockedMessage').hide();}
else{$('.blockedMessage').show();}
if(text){require(['voice/voicecommands.js','voice/grammarprocessor.js'],function(voicecommands,grammarprocessor){var processor=grammarprocessor(commandgroups,text);if(processor&&processor.command){voicecommands(processor).then(function(result){if(result.item.actionid==='show'&&result.item.sourceid==='group'){var dlg=currentDialog;if(dlg)
showCommands(false,result)
else
showCommands(true,result)}}).catch(showUnrecognizedCommandHelp);}
else
showUnrecognizedCommandHelp();var dlg=currentDialog;if(dlg){dialogHelper.close(dlg);}});}
else if(!isCancelled){showUnrecognizedCommandHelp();}}
function startListening(createUI){destroyCurrentRecognition();var recognition=new(window.SpeechRecognition||window.webkitSpeechRecognition||window.mozSpeechRecognition||window.oSpeechRecognition||window.msSpeechRecognition)();recognition.lang=lang;var groupid='';recognition.onresult=function(event){if(event.results.length>0){processTranscript(event.results[0][0].transcript||'');}};recognition.onerror=function(){processTranscript('',recognition.cancelled);};recognition.onnomatch=function(){processTranscript('',recognition.cancelled);};recognition.start();currentRecognition=recognition;showCommands(createUI);}
function destroyCurrentRecognition(){var recognition=currentRecognition;if(recognition){recognition.abort();currentRecognition=null;}}
function cancelListener(){destroyCurrentRecognition();hideVoiceHelp();}
function showCommands(createUI,result){if(createUI!==false){require(['paper-fab','css!voice/voice.css'],function(){if(result)
showVoiceHelp(result.groupid,result.name);else
showVoiceHelp();});}}
return{startListening:startListening};});