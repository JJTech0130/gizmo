function _typeof(o){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}var AudioPlayerClass=function(){var u,c={click:{source:gConfig.paths.comAudio+"common_audio.mp3"},down:{source:gConfig.paths.comAudio+"common_down.mp3"},up:{source:gConfig.paths.comAudio+"common_up.mp3"},camera:{source:gConfig.paths.comAudio+"snapshot.mp3"},confirm:{source:gConfig.paths.comAudio+"common_confirm.mp3"}},n=this,a=!0,d=new Object,e=1,r=[],l=[],i=new Object;new GlobalAnimClass,new Date;$(window).off("click",p).on("click",p);var f=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext||window.msAudioContext,s=!1;function p(){if(f)try{window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext||window.msAudioContext,u=new AudioContext}catch(o){f=!1}else for(var o=0;o<20;o++)r[o]=new Audio,r[o].id=o;if(!f)for(var o in c)d[o]=new Object,d[o].src=c[o].source;if(s=!0,u)for(var o in c)x(o,!0);$(window).off("click",p)}function m(){}function x(t,n,o,e){var i=new XMLHttpRequest;i.open("GET",c[t].source,!0),i.responseType="arraybuffer",i.onload=function(){u.decodeAudioData(i.response,function(o){c[t].buffer=o,n||w(t,n,e)},m),void 0!==o&&o()},i.send()}function w(n,o,t){if(c[n].context=u.createBufferSource(),u.createGain&&(c[n].gainNode=u.createGain()),u.createGainNode&&(c[n].gainNode=u.createGainNode()),c[n].context.buffer=c[n].buffer,c[n].context.connect(c[n].gainNode),c[n].gainNode.connect(u.destination),c[n].gainNode.gain.value=void 0===c[n].volume?void 0===e?1:e:c[n].volume,c[n].context.loop=c[n].loop,c[n].context.onended=function(o){var t;c[t=n]&&(c[t].loop||(c[t].context=void 0,"function"==typeof c[t].callBack&&c[t].callBack(),delete i[t]))},!o){if(i[n]=c[n],c[n].context.start&&c[n].context.noteOn)return c[n].context.start&&(null==_typeof(t)||isNaN(t)?!o&&c[n].context.start(0):!o&&c[n].context.start(t)),!1;if(c[n].context.start)return null==_typeof(t)||isNaN(t)?!o&&c[n].context.start(0):!o&&c[n].context.start(t),!1;if(c[n].context.noteOn)return null==_typeof(t)||isNaN(t)?!o&&c[n].context.noteOn(0):!o&&c[n].context.noteOn(t),!1}}this.add=function(o,t,n,e,i){"click"!=o.toLowerCase()&&(f?(c[o]={source:t},null!=_typeof(i)&&(c[o].noClean=i),null!=_typeof(n)&&(c[o].callBack=n),s&&x(o,!0,e)):(d[o]=new Object,d[o].oncanplaythrough=e,d[o].index=[],d[o].src=t,null!=_typeof(n)&&(d[o].onended=n),void 0!==e&&setTimeout(function(){e()},100)))},this.remove=function(o){f?c[o]&&(n.stop(o,!0),c[o].context=void 0,c[o].gainNode=void 0,c[o].volume=void 0,c[o].loop=void 0,c[o].callBack=void 0,c[o]=void 0):d[o]&&(d[o].audio&&(d[o].audio.src="",d[o].audio=null),d[o].index=null,d[o].oncanplaythrough=null,d[o].onended=null,d[o].loop=null,d[o].volume=null,d[o]=null)},this.destroyContext=function(){u.uninitialize()},this.setVolume=function(o){e=o},this.sVolume=function(o,t){c[o]&&(c[o].volume=t,c[o].gainNode&&c[o].gainNode.gain&&(c[o].gainNode.gain.value=t)),f||d[o]&&d[o].audio&&(d[o].audio.volume=t)},this.stop=function(o,t){if(f){if(c[o]&&c[o].context){c[o].context.onended=null;try{if(c[o].context.stop)return c[o].context.stop(0),t||delete i[o],!1;if(c[o].context.noteOff)return c[o].context.noteOff(0),t||delete i[o],!1}catch(o){}}}else d[o]&&d[o].audio&&(d[o].audio.onended=null,d[o].audio.pause())},this.stopAll=function(o){if(u)for(var t in c)n.stop(t,o);else for(var t in d)n.stop(t,o)},this.enable=function(o){!(a=o)&&this.stopAll()},this.playAudio=function(o,t,n,e,i){if(s||p(),a){if(!f)for(var u=0;u<r.length;u++)if(-1==l.indexOf(r[u].id)){l.push(r[u].id),d[o].audio=r[u];break}"function"==typeof t&&f&&(c[o].callBack=t),f||d[o].audio&&(d[o].audio.onended=function(o){l.splice(l.indexOf(o.target.id),1),"function"==typeof t&&t()}),n?f?c[o].loop=!0:d[o].audio&&(d[o].audio.loop=!0):f?c[o].loop=!1:d[o].audio&&(d[o].audio.loop=!1),f&&e&&(c[o].volume=e),f?c[o]&&(c[o].buffer?w(o,!1,i):x(o,!1,void 0,i)):d[o]&&d[o].audio&&(e&&(d[o].audio.volume=e),d[o].audio.src=d[o].src,d[o].audio.currentTime&&(null==_typeof(i)||isNaN(i)?d[o].audio.currentTime=.01:d[o].audio.currentTime=i),d[o].audio.play())}},this.getCurrentTime=function(o){if(f){if(c[o]&&c[o].context)return{type:"audioContext",time:c[o].context.context.currentTime}}else if(d[o])return{type:"audioObject",time:d[o].currentTime}},this.getAudioStatus=function(){return a}},audioPlayerObj=new AudioPlayerClass;