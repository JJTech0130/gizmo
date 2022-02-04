// gizmo-display.js
// Description: The JS needed for gizmo display (resize, fullscreen mode, etc)
// Author: Jordan Marshall
// Created: September 2015 (some content created earlier)

var windowWidth;
var windowHeight;

var lastSavedGizmoState;
var savedScale;

var gizmoOnLoadFired = false;

$(document).ready(function(){

	// Initialize Gizmo
	if($('#gizmoHolder').length){

		if($('#g.html5').length){

			if($('#gizmoHolder').data('getset-enabled')){
				initializeGetterSetterGizmo();
			} 
			else if ($('#gizmoHolder').data('mbg')){
				initializeMasteryBasedGizmo();
			}
			else {
				// This sets up the iframe.  Getter/Setter does not need it.
				initializeHTML5Gizmo();
			}
		}

		// Initial gizmo resize
		resizeGizmo();

		// iPad was calling resize too often
		windowWidth = $(window).width();
		windowHeight = $(window).height();

		$(window).resize(function(){
			if($(window).width() != windowWidth || $(window).height() != windowHeight){
				resizeGizmo();
				windowWidth = $(window).width();
				windowHeight = $(window).height();
			}
		});

		// Check where Gizmo Loaded
		// setTimeout(function(){
		// 	if(!shockwaveGizmo.length && !gizmoOnLoadFired){
		// 		console.log('Gizmo Failed to Load');
		// 		$.ajax({
		// 			method: 'POST',
		// 			url: 'https://api.explorelearning.com/api/v3/write-to-log',
		// 			data: {
		// 					Key: 'SoylentGreen1974',
		// 					MessageType: 'ERROR',
		// 					Message:	'[GIZMO FAILED TO LOAD] - ' +
		// 								'Gizmo ID: ' + $('#gizmoHolder').data('resourceid') + ' | ' +
		// 								'User Agent String: ' + navigator.userAgent + ' | ' +
		// 								'Server ID: ' + getServerID() + ' | ' +
		// 								'Referrer: ' + document.referrer + ' | ' +
		// 								'User: ' + JSON.stringify(elUser) + ' | ' +
		// 								'Cookie: ' + document.cookie
		// 				}
		// 		}).done(function(){
		// 			console.log('Gizmo Load Failure reported to ExploreLearning');
		// 		}).fail(function(){
		// 			console.log('Failure to report Gizmo Load Issue to ExploreLearning');
		// 		}).always(function(){
		// 			console.log('Sorry for the inconvenience. Try refreshing your browser (F5). If the problem persists please contact ExploreLearning customer service.');
		// 		});
		// 	}
		// }, 15000);
	}

	// Exit fullscreen mode
	$('body').on('click', '#exitFullScreenMode', onFullScreenExit);
	$('body').keyup(function(event){
		if (event.keyCode == 27 ){
			onFullScreenExit();
		}
	});


	// The "Gizmo Info" popover that is shown in fullscreen mode
	$('#openGizmoInfo').popover({ html : 'true'});
	$('#openGizmoInfo').on('show.bs.popover', function(){
		$(this).tooltip('hide');
		$(this).tooltip('disable');
		$('#openGizmoInfo').removeClass('glyphicon-info-sign').addClass('glyphicon-remove-circle');
	});
	$('#openGizmoInfo').on('hidden.bs.popover', function(){
		$(this).tooltip('enable');
		$('#openGizmoInfo').removeClass('glyphicon-remove-circle').addClass('glyphicon-info-sign');
	});

	$('#openGizmoInfo').tooltip({ title : 'View Gizmo Info'});

	$('.launch-fullscreen-mode').on('click', function(event){
		enterFullScreen();
	});

	$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function(e){
		if(!isFullscreen()){
			onFullScreenExit();
		}
	});

	// Toggle lesson Info

	$('#affixedBarWrap.gizmo-bar').on('click', '.header', function(e){
		if($(e.target).parents('.pull-right').length == 0){
			$('#lessonInfo').collapse('toggle');
		}
	});

	// The answer key modal lives in the lesson info bar.  Unfortunately, this has absolute positioning, so the modal (which is a child)
	// looks weird.  For that reason, we need to move it to the body.

	if($('#answerKey').length){
		$('body').append($('#answerKey').remove());
	}


	// This functionality is for closing the lesson info bar by clicking outside of it.

	function closeLessonInfo(e){
		$('#lessonInfo').collapse('toggle');
	}

	$('#lessonInfo').on('shown.bs.collapse', function(){
		$('body').append($('<div/>', { 'id' : 'closeLessonInfoBackgroundDiv', 'style' : 'position:absolute; top: 0; left: 0; right: 0; bottom: 0;'}))
		$('body').on('click', '#closeLessonInfoBackgroundDiv', closeLessonInfo);
	});

	$('#lessonInfo').on('hide.bs.collapse', function(){
		$('body').unbind('click', closeLessonInfo);
		$('#closeLessonInfoBackgroundDiv').remove();
	});


});

function getServerID(){
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();
    return req.getResponseHeader('serverID');
}

function isFullscreen(){
	if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
		return true;
	}
	return false;
}

function enterFullScreen(){

	window.scrollTo(0,0); // Scroll to top of page.
	$('#gizmoHolder').closest('.bg-panel').addClass('full-screen-enabled');

	// For iPad.  The tooltip sometimes lingers.
	$('.launch-fullscreen-mode').tooltip('hide');

	$('#fullscreenModeToolbar').show();
	$('.launch-fullscreen-mode').hide();

	$('#belowGizmoButtons').hide();
	$('body').css('overflow', 'hidden'); // Hide scroll bar
	resizeGizmo();

	var element = $('#gizmoHolder').closest('.bg-panel').addClass('full-screen-enabled')[0];
	if(element.requestFullscreen){
		element.requestFullscreen();
	} else if (element.msRequestFullscreen){
		element.msRequestFullscreen();
	} else if (element.mozRequestFullScreen){
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen){
		element.webkitRequestFullscreen();
	}
	resizeGizmo();
}

function onFullScreenExit(){
	$('.launch-fullscreen-mode').show();

	if(document.fullscreenElement){
		document.exitFullscreen();
	} else if (document.msFullscreenElement){
		document.msExitFullscreen();
	} else if (document.mozFullScreenElement){
		document.mozCancelFullScreen();
	} else if (document.webkitFullscreenElement){
		document.webkitExitFullscreen();
	}

	$('#gizmoHolder').closest('.bg-panel').removeClass('full-screen-enabled');
	$('#belowGizmoButtons').show();
	$('body').css('overflow', 'scroll');

	$('#fullscreenModeToolbar').hide();
	$('#openGizmoInfo').popover('hide');

	resizeGizmo();
}


function initializeMasteryBasedGizmo(){

	console.log("initialize MBG!")

	var gizmoHolder = $('#gizmoHolder');
	var iframeHolder = $('#g.html5');

	var resourceID = gizmoHolder.data('resourceid');
	var title = encodeURIComponent(gizmoHolder.data('title'));
	var apiPath = encodeURIComponent(elPaths.apiPath);
	var userID = elUser.publicUserID;
	var classID = gizmoHolder.data('classid');

	var server = elPaths.amzPath;

	var mbgSrc = server + '/resources/mbg/loader.html?resourceID='+resourceID+'&title='+title +"&userID=" + userID+"&classID="+classID+"&api="+apiPath;

	console.log(mbgSrc)

	var ifrm = $('<iframe/>', {
		src: mbgSrc,
		id:  'myFrame',
		frameborder: 0,
		scrolling: 'no',
	});

	var deferred = $.Deferred();
	ifrm.load(deferred.resolve);

	deferred.done(function(){
		gizmoOnLoadFired = true;
		gizmoHolder.find('.icon-el-line-logo').remove();
	});

	deferred.promise();
	
	iframeHolder.append(ifrm);

	// Initializing the Gizmo to any other size (smaller or larger) seems to cause problems.
	ifrm.css({'width': 1024,'height': 696});
}

function initializeHTML5Gizmo(){
	var gizmoHolder = $('#gizmoHolder');
	var iframeHolder = $('#g.html5');

	var resourceID = gizmoHolder.data('resourceid');

	var server = elPaths.amzPath;

	// TODO: COMMENT OUT BEFORE PROMOTING!
	// server = 'http://s3.amazonaws.com/el-gizmos-dev';

	var ifrm = $('<iframe/>', {
		src: server + '/resources/html5_new/'+ resourceID +'/inner.html',
		id:  'myFrame',
		frameborder: 0,
		scrolling: 'no',
	});

	var deferred = $.Deferred();
	ifrm.load(deferred.resolve);

	deferred.done(function(){
		gizmoOnLoadFired = true;
		gizmoHolder.find('.icon-el-line-logo').remove();
	});

	deferred.promise();
	
	iframeHolder.append(ifrm);

	// Initializing the Gizmo to any other size (smaller or larger) seems to cause problems.
	ifrm.css({'width': 1024,'height': 680});
}

function clearCurrentGizmo(){
	$('#g.html5 iframe').remove();
}

function getGizmoIDToLoad(){
	var gizmoID = $('#gizmoHolder').data('resourceid');

	// Keys are returned as a string, so the ID needs to be converted to match
	if(Object.keys(gizmoDuplicates).indexOf(gizmoID + '') != -1){
		console.log('Duplicate found, loading '+gizmoDuplicates[gizmoID]);
		return gizmoDuplicates[gizmoID];
	}

	return gizmoID;
}

function initializeGetterSetterGizmo(){

	var gizmoHolder = $('#gizmoHolder');
	var iframeHolder = $('#g.html5');

	// var deployedVersion = $('#deployedVersion').val();
	// var comVersion = $('#deployedComVersion').val();
	var deployedRelease = $('#deployedRelease').val();

	var iframeSrc = elPaths.amzPath;

	var ifrm = $('<iframe/>', {
		src: iframeSrc + "/resources/html5gs/gizmo-loader.html",
		id:  'gizmoIframe',
		frameborder: 0,
		scrolling: 'no'
	});
	
	iframeHolder.append(ifrm);

	var iframe= $('#gizmoIframe')[0];
	var iframewindow= iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;

	$('#gizmoIframe').on('load', function(){
		var gizmoID = getGizmoIDToLoad();
		var gizmoLoadEvent = { messageName : "loadGizmo", gizmoID : gizmoID, releaseVersion : deployedRelease, basePath : iframeSrc };
		iframewindow.postMessage(gizmoLoadEvent, iframeSrc);
		gizmoHolder.find('.icon-el-line-logo').remove();
	});

	// Initializing the Gizmo to any other size (smaller or larger) seems to cause problems.
	ifrm.css({'width': 1024,'height': 680});
	$('#g.html5').css({'width': 1024,'height': 680});
}

// function loadGizmoFrame(gizmoID, gizmoVersion, comVersion){
// 	var gizmoHolder = $('#gizmoHolder');
// 	var iframeHolder = $('#g.html5');
// 	var deployedVersion = $('#deployedVersion').val();
// 	var comVersion = $('#deployedComVersion').val();
// 	var iframeSrc = elPaths.amzPath;

// 	// COMMENT OUT BEFORE DEPLOYING
// 	// var iframeSrc = elPaths.imageRoot;

// 	var ifrm = $('<iframe/>', {
// 		src: iframeSrc + "/resources/html5gs/gizmo-loader.html",
// 		id:  'gizmoIframe',
// 		frameborder: 0,
// 		scrolling: 'no'
// 	});
	
// 	iframeHolder.append(ifrm);

// 	var iframe= $('#gizmoIframe')[0];
// 	var iframewindow= iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;

// 	$('#gizmoIframe').load(function(){
// 		var gizmoID = $('#gizmoHolder').data('resourceid');
// 		var gizmoLoadEvent = { messageName : "loadGizmo", gizmoID : gizmoID, gizmoVersion : deployedVersion, comVersion : comVersion, basePath : iframeSrc };
// 		iframewindow.postMessage(gizmoLoadEvent, iframeSrc);
// 	});

// 	// Initializing the Gizmo to any other size (smaller or larger) seems to cause problems.
// 	ifrm.css({'width': 1024,'height': 680});
// 	$('#g.html5').css({'width': 1024,'height': 680});
// }

function resizeIframe(){


	iframeHolder = $('#gizmoHolder #g');
	iframe = $('#g.html5 iframe');

	var oldHeight = Number(iframe.height());
	var oldWidth = Number(iframe.width());

	// This is set by the "ResizeGizmo" function
	var newHeight = iframeHolder.height();

	var scale = (oldHeight/newHeight).toFixed(4);

	iframe.css({
		"transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
		"-ms-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
		"-webkit-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
	});
}

function resizeWrapper(){

	var wrapperHolder = $('#gizmoHolder #g');
	var wrapper = $('#g .wrapper');
	// var wrapper = $('#iframeSubstitute');

	// var wrapper = $('#wrapperContainer');
	var gRatio = parseFloat(wrapperHolder.data('ratio'));

	var oldHeight = Number(wrapper.height());
	var oldWidth = Number(wrapper.width());

	// This is set by the "ResizeGizmo" function
	var newHeight = wrapperHolder.height();
	var newWidth = newHeight * gRatio;

	var scale = (oldHeight/newHeight).toFixed(2);

	savedScale = scale;

	console.log('Resize Gizmo Wrapper.  Old Height: '+oldHeight + ' New Height: '+newHeight + " Scale: "+scale);

	wrapper.css({
		"transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
		"-ms-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
		"-webkit-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
	});

	// wrapper.css({
	// 	"transform": "scale("+(1/scale)+","+(1/scale)+")",
	// 	"-ms-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
	// 	"-webkit-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
	// });

}

function resizeGizmo(){

	var holder = $('#gizmoHolder'),
		g = $('#g.scale');

	if(holder.length && g.length){
		var gRatio = parseFloat(g.data('ratio'));
		var windowHeight = $(this).height();
		var displayOffset = g.offset().top;
		var maxHeight = windowHeight - displayOffset-30;

		// var newHeight = holder.width() / gRatio;
		// var newWidth = holder.width();

		var gPadding = 5;
		var newHeight = (holder.width() - 2*gPadding) / gRatio;
		var newWidth = holder.width()-2*gPadding;

		if(newHeight > maxHeight){
			newHeight = maxHeight;
			newWidth = maxHeight * gRatio;
		}

		g.height(newHeight).width(newWidth);

		if($(this).scrollTop()>g.offset().top){
			$(this).scrollTop($('#affixedBarWrap').offset().top );
		}
		
		// if(g.hasClass('html5')){
		// 	if(holder.data('getset-enabled')){
		// 		resizeWrapper();
		// 	} else {
		// 		resizeIframe();
		// 	}
		// }

		if(g.hasClass('html5')){
			resizeIframe();
		}

		if((g.width()+90) < $(window).width()){
			$('#fullscreenModeToolbar').removeClass('fullscreen-toolbar-portrait').addClass('fullscreen-toolbar-landscape');
		}
		else {
			$('#fullscreenModeToolbar').removeClass('fullscreen-toolbar-landscape').addClass('fullscreen-toolbar-portrait');
		}
	}
}

function launchFixedSize(big, gizmoID, releaseNum) {

  var iframeSrc = elPaths.amzPath;

  var ifrm = document.createElement("iframe"), w = big ? 2048 : 1024, h = big ? 1360 : 680;   
  ifrm.src = iframeSrc + "/resources/html5gs/gizmo-loader.html";
  ifrm.id = 'gizmoIframe';
  ifrm.style.width = w + 'px';    
  ifrm.style.height = h + 'px'; 
  ifrm.frameborder = 0;    
  ifrm.scrolling = 'no';         
  ifrm.style.border = 'none';    
  document.body.style.margin = 0;
  document.body.style.padding = 0;
  document.body.style.overflow = 'auto';

  document.body.innerHTML = '';
  document.body.appendChild(ifrm);

  var iframe= $('#gizmoIframe')[0];
  var iframewindow= iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;

  $('#gizmoIframe').on('load', function(){
    var gizmoLoadEvent = { messageName : "loadGizmo", gizmoID : gizmoID, releaseVersion : releaseNum, basePath : iframeSrc };
    iframewindow.postMessage(gizmoLoadEvent, iframeSrc);
  });

}