// getter-setter.js
// Description: The JS needed for getter setter functionality
// Author: Jordan Marshall
// Created: September 2015 (some content created earlier)

var lastSavedGizmoState;
var initialGizmoState;
var resourceID;

// version information
var releaseVersion;

// Getter/Setter Debug mode
var debugModeEnabled = false;

// Presets are being used
var presetsEnabled = false;

// An array of objects, loaded dynamically
var allSavedPresets;
var mySavedPresets;
var pctParameters;
var pctInProgress = false;

var iframeWindow; // Gizmo Iframe

var AJAX_PRESET_ENDPOINT = 'cUserSecure.actUserResourcePresets';
var GETTER_SRC_DEBUG = "debug";
var GETTER_SRC_PRESET = "preset";
var GETTER_SRC_INITIALIZE = "initialize";
var GETTER_SRC_PRESET_TEST = "presetTest";
var GETTER_SRC_PAUSE = "pause";


var PRESET_TITLE_DISPLAY_LIMIT = 45;

function createPresetObject(gizmoData){

	// We don't want it as a string when converted
	// var convertedPresetData = JSON.parse(gizmoDataString);

	// var presetObject = {
	// 	id : resourceID,
	// 	gizmoVersion : gizmoVersion,
	// 	comFileVersion : comFileVersion,
	// 	data : convertedPresetData
	// }

	// stringify creates the smallest possible string
	var gizmoDataString = JSON.stringify(gizmoData);

	// console.log('Size: '+numBytes(gizmoDataString));

	var stringifiedPresetObject = '{"id" : '+resourceID+', "releaseVersion": "'+releaseVersion+'", "data" : '+gizmoDataString+' }';
	return stringifiedPresetObject;
}

function numBytes(string) {
    var escaped_string = encodeURI(string);
    if (escaped_string.indexOf("%") != -1) {
        var count = escaped_string.split("%").length - 1;
        count = count == 0 ? 1 : count;
        count = count + (escaped_string.length - (count * 3));
    }
    else {
        count = escaped_string.length;
    }

	return count;
}


function receiveMessage(event){
	var origin = event.origin;

	if(origin != elPaths.amzPath) {
		console.warn('Message rejected due to unknown origin.')
		return;
	}

	var data = event.data;
	var messageName = data.messageName; 

	switch(messageName){
		case 'getterData':
			if(data.source == GETTER_SRC_DEBUG){

				lastSavedGizmoState = data.contents;
				addDataToDebugWindow(lastSavedGizmoState);

				// lastSavedGizmoState = JSON.parse(data.contents);
				// addDataToDebugWindow(lastSavedGizmoState);
				notify('Get Complete.', 500);
			}
			else if (data.source == GETTER_SRC_PRESET){
				var name = $('#presetTitle').val().trim();
				savePreset(elUser.userID, resourceID, name, createPresetObject(data.contents));
			}
			else if (data.source == GETTER_SRC_INITIALIZE) {
				initialGizmoState = data.contents;
				lastSavedGizmoState = initialGizmoState;
				addDataToDebugWindow(lastSavedGizmoState);
			}
			else if (data.source == GETTER_SRC_PRESET_TEST){
				iteratePCTReceive(JSON.stringify(data.contents, null,3));
				// console.log('Data returned from preset test');
			}
			else if(data.source == GETTER_SRC_PAUSE){
				pauseGizmo(data.contents);
			}

			break;

		case 'cameraList':
			var cameraData = JSON.parse(data.contents);
			addCamerasToDebugWindow(cameraData)
			break;
		case 'cameraData':
			showScreenShot(data.contents);
			break;
		case 'activityScreenshot':
			addImageToActivity(data.contents);
			break;
		case 'errorReported':
			var errorString = data.contents;

			if(pctInProgress){
				pctRegisterError(errorString);
			}

			if(debugModeEnabled) {
				notifyError("<strong>Error In Gizmo:</strong> "+errorString, 1000);
			}
			else {
				userPresetErrorNotification(data);
			}

			break;
		default:
			window.console.log('Unknown message passed to getter-setter.js')
			break;
	}
}

function userPresetErrorNotification(data){
	// notifyError('<strong>There was a problem setting your preset.</strong> Try refreshing the page.  You may need to re-create the preset.', 2000);
	logPresetError('Preset failed for Gizmo: ' + resourceID + '.  Error Message: ' + data.contents);
}

var ERROR_LOG_ENDPOINT = 'cUserSecure.logUserError';

function logPresetError(message){

	$.ajax({
		method: 'POST',
		url: AJAX_REQUEST_URL,
		data : {
			method : ERROR_LOG_ENDPOINT,
			type : 'ERROR',
			subsystem : 'PRESET',
			message : message,	
		},
	}).done(function(data){
		console.log('Error Logged');
	}).fail(function(data){
		console.log('There was a problem logging the error.')
	});
}


$(document).ready(function(){
	resourceID = $('#gizmoHolder').data('resourceid');

	window.addEventListener('message', receiveMessage, false);

	presetsEnabled = $('#presetHelp').length > 0;
	if(presetsEnabled) initializePresets();

	debugModeEnabled = ($('.gs-debug-menu').length > 0);
	if(debugModeEnabled) initializeGSDebug(resourceID);

	$('.preview-release').on('click', function(){
		var previewVersion = $(this).data('version');
		var deployedVersion = $('#deployedVersion').val();
		if(previewVersion != deployedVersion){
			// set so that "load gizmo" can pick them up
			// TODO: update this so that they are passed via function
			$('#deployedRelease').val(previewVersion);
			$('.gizmo-version').text(previewVersion);

			// These are found in gizmo-display.js
			resetIframewindow();
			clearCurrentGizmo();
			initializeGetterSetterGizmo();
			resizeGizmo();
		}

	});
	
});

function hidePresetBar(){
	$('#presetID').val('');
	$('#newPreset').collapse('hide');
	$('#presetTitle').val('');
	$('#newPreset .delete-preset-btn').removeClass('confirm').find('.confirm-text').remove();
	$('#newPreset .save-btn').text('Save');
	$('#newPreset .title-action').text('Add New Preset');

}

function initializePresets(){

	// TODO: the headers on these files in S3 are WRONG.  They are binary/octet, but should be .json
	// Not sure how they got that way, but they are all like that.  Changing them requires changing the code.

	// var GIZMO_VERSION_FILE = elPaths.imageRoot + "/resources/html5gs/" + resourceID + "/package.json";

	// $.get(GIZMO_VERSION_FILE, function(data){
	// 	var versionInfo = jQuery.parseJSON(data);

	// 	gizmoVersion = versionInfo['version'];
	// 	gizmoVersionLog = versionInfo['log'];
	// });

	// var COM_VERSION_FILE = elPaths.imageRoot + "/resources/html5gs/com/package.json";

	// $.get(COM_VERSION_FILE, function(data){
	// 	var versionInfo = jQuery.parseJSON(data);
	// 	comFileVersion = versionInfo['version'];
	// });

	releaseVersion = $('#deployedRelease').val();

	$('#presetTitleForm').validate({
		errorElement : 'em',
		errorClass : 'text-danger',
		errorPlacement : function(error, element){
			error.insertAfter(element.parent());
		},
		submitHandler: function(form,e){

			// If presetID is defined then user is editing, not creating a new preset
			var presetID = $('#presetID').val();
			if(presetID){
				var name = $('#presetTitle').val();
				renamePreset(presetID, name);
			}
			else {
				getGizmoData(GETTER_SRC_PRESET);
			}

			$('#newPreset').collapse('hide');
			return false;
 		},
	});

	// This function is used to hide the preset bar when someone clicks outside
	var clickHandler = function(e){
		var container = $('#newPreset');
		if(!container.is(e.target) && container.has(e.target).length == 0){
			hidePresetBar();
		}
	}

	// We bind the event when the preset window is open
	$('#newPreset').on('show.bs.collapse', function(){
		$(document).bind('mouseup', clickHandler);
	});

	// Focus the text bar when visible
	$('#newPreset').on('shown.bs.collapse', function(){
		$('#presetTitle').focus();
	});

	// Unbind the event when the preset window is closed
	$('#newPreset').on('hide.bs.collapse', function(){
		$(document).unbind('mouseup', clickHandler);
	});

	$('.new-preset-btn').on('click', function(){
		initiatePause();
		$('#lessonInfo').collapse('hide');
		$('#newPreset .delete-preset-btn').hide();
	});

	// Close and clear preset
	$('.edit-bar').on('click', '.close-btn', function(){
		hidePresetBar();
	})

	$('.list-of-presets').on('click', '.preset-menu', function(){
		var id = $(this).siblings('a').data('id');
		var title = $(this).siblings('a').text();
		$('#presetTitle').val(title);
		$('#presetID').val(id);
		$('#newPreset .save-btn').text('Rename')
		$('#newPreset .delete-preset-btn').show();
		$('#newPreset').collapse('show');
		$('#newPreset .title-action').text('Edit Preset');
	});

	// Delete Preset
	$('#newPreset .delete-preset-btn').on('click', function(e){

		if($(this).hasClass('confirm')){

			var onSuccess = function(data){
				$('.list-of-presets').find('li.id-'+id).remove();
				if($('.list-of-presets .saved-preset').length == 0){
					$('.gs-btns').hide();
					$('.new-preset').show();
				}
				notify('Gizmo Preset Deleted', 500);
				hidePresetBar();
			}

			var id = $('#presetID').val();
			deletePreset(id, onSuccess());
			$('#newPreset').collapse('hide');
		} else {
			$(this).addClass('confirm');
			$(this).append($('<span>').addClass('confirm-text').text('  \xa0Confirm'));
		}
		e.preventDefault();
	});

	$('.list-of-presets').on('click', '.saved-preset > a', function(){
		loadPreset($(this).data('id'));
	});

	$('#pauseGizmo').on('click', initiatePause);

	// Load all existing presets if they have any
	if($('.list-of-presets').length > 0) loadSavedPresets(elUser.userID, resourceID);
}

var presetMenu = '<span class="glyphicon glyphicon-option-vertical preset-menu" data-rel="tooltip" title="Edit"></span>';

function presetTitleLengthCheck(title){
	if(title.length > PRESET_TITLE_DISPLAY_LIMIT){
		return title.substring(0,PRESET_TITLE_DISPLAY_LIMIT) + "... ";
	}

	return title;
}

function getPresetListEntry(name, id, version){

	var title = presetTitleLengthCheck(name);

	if(debugModeEnabled) {
	title += ' -&nbsp;<span class="text-muted">'+version+'</span>';
	}

	return $('<li>').addClass('saved-preset').addClass('id-'+id).append($('<a>').html(title).data('id', id)).append(presetMenu);
}

function loadAllPresets(resourceID, username, callback){
	var data = {
		method: AJAX_PRESET_ENDPOINT,
		act: 'getAll',
		resourceID : resourceID,
		username : username
	}

	makeRequest('get', data, callback);
}

function loadPreset(id){
	var data = {
		method: AJAX_PRESET_ENDPOINT,
		act: 'load',
		id : id
	}

	var onSuccess = function(data){
		// { title, id, data : "{id, version, data}"} - data is a string
		var presetObject = JSON.parse(data.data);
		setGizmoData(presetObject.data)
	}

	makeRequest('get', data, onSuccess);
}

function deletePreset(id, callback){
	var data = {
		method : AJAX_PRESET_ENDPOINT,
		act: 'delete',
		id : id
	}

	var onSuccess = function(data){
		$('.list-of-presets').find('li.id-'+id).remove();
		if($('.list-of-presets .saved-preset').length == 0){
			$('.gs-btns').hide();
			$('.new-preset').show();
		}
		notify('Gizmo Preset Deleted', 500);
		hidePresetBar();
	}

	makeRequest('post', data, callback);
}

function renamePreset(id, name){
	var data = {
		method : AJAX_PRESET_ENDPOINT,
		act: 'rename',
		id : id,
		title : name,
	}

	var onSuccess = function(data){
		$('.list-of-presets li.id-'+id+' a').text(name);
		notify('Gizmo Preset Modified', 500);
		hidePresetBar();
	}

	makeRequest('post', data, onSuccess);
}

function loadSavedPresets(userID, resourceID){

	var data = {
		method: AJAX_PRESET_ENDPOINT,
		act: 'get',
		userID: userID,
		resourceID: resourceID
	}

	var onSuccess = function(data){
		
		var list = $('.list-of-presets .dropdown-header');

		if(data.viewstates.length > 0){
			$('.no-saved-presets').hide();
		}

		for(var i =0; i < data.viewstates.length; i++){
			list.after(getPresetListEntry(data.viewstates[i].title, data.viewstates[i].id, data.viewstates[i].version));
		}

		$('.fullscreen-presets .preset-menu').remove();
		$('.header .list-of-presets [data-rel="tooltip"]').tooltip({});

	}

	makeRequest('get', data, onSuccess);
}

function savePreset(userID, resourceID, name, gizmoDataString){

	var presetVersion = releaseVersion;
	if(debugModeEnabled){
		presetVersion = $('#loadedGizmoVersion').text();
	}

	var data = {
		method: AJAX_PRESET_ENDPOINT,
		act: 'save',
	  	id: 0, // Pass '0' for ID of new presets
	  	title: name,
	  	resourceID: resourceID,
	  	userID: userID,
	  	gizmoVersion : presetVersion,
	  	data: gizmoDataString
	}

	// console.log('Saved Preset Size: '+numBytes(gizmoDataString));

	var onSuccess = function(data){
		notify('Gizmo Preset Saved');
		// $('.no-saved-presets').hide();
		$('.new-preset').hide();
		$('.gs-btns').show();

		$('.list-of-presets .dropdown-header').after(getPresetListEntry(name, data.id));
		$('.fullscreen-presets .preset-menu').remove();
		$('.header .list-of-presets [data-rel="tooltip"]').tooltip({});
		hidePresetBar();
	}

	makeRequest('post', data, onSuccess);
}

function makeRequest(method, data, onSuccess){

	$.ajax({
		method: method,
		dataType: 'json',
		url: AJAX_REQUEST_URL,
		data: data,
	}).done(function(data){
		if(data.success){
			if(onSuccess) onSuccess(data); 
		}
		else {
			if(data.errors) {
				console.log(data.errors);
			}
			else {
				// if the user is logged out the server just returns '2', not even JSON, no other arguments.
				notifyError('There was a problem with your request.  Check to make sure you are still logged in.');
			}
		} 
	});
}

function checkIframeWindow(){
	if(!iframeWindow){
		var iframe= $('#gizmoIframe')[0];
		iframeWindow= iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;
	}	
}

function resetIframewindow(){
	iframeWindow = null;
}

function getGizmoData(source){

	checkIframeWindow();

	var message = {messageName : 'get', parentOrigin : elPaths.myself, source : source}
	iframeWindow.postMessage(message, elPaths.amzPath);
}

function setGizmoData(dataString){
	checkIframeWindow();

	var message = {messageName : 'set', contents : dataString}
	iframeWindow.postMessage(message, elPaths.amzPath);
}

function initiatePause(){
	checkIframeWindow();

	var message = {messageName : 'get', parentOrigin : elPaths.myself, source : GETTER_SRC_PAUSE}
	iframeWindow.postMessage(message, elPaths.amzPath);	
}

function pauseGizmo(getData){
	console.log(getData);

	if(Object.keys(getData).indexOf('Controls') != -1){
		var controls =  getData['Controls']['values'];

		if( (Object.keys(controls).indexOf('play') != -1) && (Object.keys(controls).indexOf('pause') != -1)){
			// Sometimes when simulations end both pause and play are "true" - in this case, don't modify.
			if(controls['play'] && !(controls['pause'] == true)){
				console.log('Simulation running.  Sending call to pause.');

				controls['play'] = false;
				controls['pause'] = true;
				setGizmoData(getData);
			}
			else {
				console.log('Simulation not running.')
			}
		}
		else {
			console.error('Pause: Controls found, but they do not contain play and pause options.');
		}

	}
	else {
		console.log('no controls - not pausing');
	}
}

function resetGizmo(){
	checkIframeWindow();

	var message = {messageName : 'reset', contents : ""};
	iframeWindow.postMessage(message, elPaths.amzPath);
}

function getListOfCameras(){

	checkIframeWindow();

	var message = {messageName : 'cameraList',parentOrigin : elPaths.myself, contents : ""};
	iframeWindow.postMessage(message, elPaths.amzPath);	
}

function cameraCapture(cameraID){

	checkIframeWindow();

	var message = {messageName : 'cameraCapture', parentOrigin : elPaths.myself, contents : cameraID};
	iframeWindow.postMessage(message, elPaths.amzPath);		
}

var SCREENSHOT_CAMERA_ID = "toolPanel";

function activityScreenshot(){

	checkIframeWindow();

	var message = {messageName : 'activityScreenshot', parentOrigin : elPaths.myself, contents : SCREENSHOT_CAMERA_ID};
	iframeWindow.postMessage(message, elPaths.amzPath);		
}

function validateObject(key, data){

	if(typeof data != "object") return { 'valid' : false, 'trace' : 'No object found for key '+key };

	var valid = true;
	var EXPECTED_KEYS = ['values', 'caption', 'common', 'componentname', 'settable'];
	var trace = "";

	for (var i = 0; i<EXPECTED_KEYS.length; i++){
		if(!(EXPECTED_KEYS[i] in data)){
			valid = false;
			trace += 'Expected key '+EXPECTED_KEYS[i]+ ' missing\n';
		}
	}

	return {'valid' : valid, 'trace' : trace};
}

function addDataToDebugWindow(gizmoData){

	$('#editGSData .raw-data').val(JSON.stringify(gizmoData, null, 3));

	$('#setEditedData').on('click', function(){
		var data = $('#editGSData textarea').val();
		setGizmoData(data);
		$('#editGSData').modal('hide');
	});

	// var gizmoData = JSON.parse(gizmoDataString);
	var dataTable = $('#gizmoDebugWindow #getterData table');

	dataTable.find('tr:not(:first-child)').remove();

	function getGlyphicon(boolVal, key){

		if(typeof key == 'undefined') key = '-';

		if(typeof boolVal == 'undefined') return $('<span class="glyphicon glyphicon-minus" data-toggle="tooltip" title="Undefined"></span>');

		if( (typeof boolVal == 'string' && boolVal == 'true') || (typeof boolVal == 'boolean' && boolVal)){
			return $('<span class="glyphicon glyphicon-ok" data-toggle="getset" data-key="'+key+'" data-value="false"></span>');
		}
		return $('<span class="glyphicon glyphicon-remove" data-toggle="getset" data-key="'+key+'" data-value="true"></span>');
	}

	function newRow(name, validationObject, common, componentname, values, visible, disabled ){
		var row = $('<tr>');

		var titleRow = $('<td>').text(name);

		if(common && validationObject['valid']){
			titleRow = $('<td>').html('<span data-toggle="tooltip" title="'+componentname+'">'+name+'</span>')
		}

		if(!common) titleRow.append(' <span class="glyphicon glyphicon-flag" data-toggle="tooltip" title="Not a Common Element"></span>')
		if(!validationObject['valid']){
			titleRow.css('color', 'red');
			titleRow.attr('data-toggle', 'tooltip').attr('title', validationObject['trace']);
		} 
		row.append(titleRow);

		if(jQuery.isEmptyObject(values) || typeof values == 'string'){
			var valuePopover = "-";
		} 
		else if ('value' in values && Object.keys(values).length == 1){
			// Only one value
			var valuePopover =values['value'];
		}
		else {
			var valuePopover = $('<button>').text('V').addClass('btn btn-xs btn-default values-popover');
			valuePopover.attr('data-toggle', 'popover').attr('data-placement','right').attr('data-html', 'true').attr('data-container','.gizmo-debug-bar').attr('data-content', "<pre class='gizmo-debug-window'>"+JSON.stringify(values, null, '\t')+"</pre>");
		}

		row.append($('<td>').append(valuePopover));
		row.append($('<td>').append(getGlyphicon(visible, 'visible')));
		row.append($('<td>').append(getGlyphicon(disabled, 'enabled')));

		return row;
	}

	for(key in gizmoData){
		var values = gizmoData[key];

		dataTable.append(newRow(key, validateObject(key, values), values['common'], values['componentname'], values['values'], values['visible'], values['enabled']));
	}

	// Enable the tooltips
	$('.values-popover').popover({});
	$('#gizmoDebugWindow [data-toggle="tooltip"]').tooltip({});
}

function addCamerasToDebugWindow(cameraData){
	var cameras = Object.keys(cameraData);
	for(var i =0; i<cameras.length;i++){
		var caption = cameraData[cameras[i]]['caption'];
		var cameraID = cameraData[cameras[i]]['id'];
		$('.gizmo-camera-window').append('<li><a href="#" data-cameraid="'+cameraID+'">'+caption+'</a></li>');
	}

	$('.gizmo-camera-window').on('click', '[data-cameraid]', function(){
		cameraCapture($(this).data('cameraid'));
	});
}


function pctRegisterError(errorString){
	if(!pctParameters) return;
	pctParameters.results[pctParameters.currentIndex].errors.push(errorString);
}

function iteratePCTSend(){
	if(!pctParameters){
		console.error('Error: iterating PCT, but test parameters undefined.');
		return;
	}

	var current = pctParameters.currentIndex;

	setGizmoData(pctParameters.testData[current].data);

	var currentPreset = (current+1)+"/"+pctParameters.testData.length;
	$('.pct-current-preset').text(currentPreset);

	// The "Get" has a timeout because it appears that set might involve async operations
	// This also might give time to register an error.
	setTimeout(function(){
		getGizmoData(GETTER_SRC_PRESET_TEST)
	}, pctParameters.timeBetweenPresets);
}

function iteratePCTReceive(getterDataString){
	if(!pctParameters){
		console.error('Error: iterating PCT, but test parameters undefined.');
		return;
	}
	// pctParameters.results.push(getterDataString);
	pctParameters.results[pctParameters.currentIndex].data = getterDataString;

	if(pctParameters.currentIndex < pctParameters.testData.length - 1){
		pctParameters.currentIndex += 1;
		iteratePCTSend();
	}
	else {
		pctParameters.callback();
	}
}

var ROUNDING_THRESHOLD = .1;
var DIFF_VALUE_CLASS = "value-compare-warning";
var STRUCTURE_WARNING_CLASS = "structure-compare-warning";

function searchAllOriginalPresets(targetValue, pathArray){

	var valueFound = false;

	for(var i=0;i<pctParameters.testData.length;i++){
		var originalPreset = pctParameters.testData[i].data;
		var currentObject = originalPreset;

		pathArray.forEach(function(value, index){
			if(currentObject != null && currentObject.hasOwnProperty(value)){
				currentObject = currentObject[value];

				if(index == pathArray.length-1) {
					console.log('Final Check.  Target: '+targetValue + " Actual: "+currentObject+" Path: "+pathArray.join('->'));


					if(currentObject == targetValue) {
						valueFound = true;
						console.log('Confirmed match!');
					}
				}
			}
		});
	}

	return valueFound;
}

function iterateObject(obj1, obj2, pathString, structureLog, valuesLog, objOneIsOriginal){
	
	var obj2Description = objOneIsOriginal ? "Returned Preset" : "Original Preset";

	if (obj2 == null){
		structureLog.push(pathString+" expecting object, but found: null");
		return;
	}

	for (var property in obj1){

		if(Array.isArray(obj1)){
			var modifiedPath = pathString.length == 0 ? property : pathString + "[" + property + "]";
		}
		else {
			var modifiedPath = pathString.length == 0 ? property : pathString + "->" + property;
		}

		if(typeof obj2 != "object"){
			structureLog.push(modifiedPath+" expecting object, but found: "+(typeof obj2));			
		}
		else if(!(property in obj2)){
			structureLog.push(modifiedPath+" not found in "+obj2Description);
			// obj2[property] = "<span class='"+STRUCTURE_WARNING_CLASS+"'><em> Missing " + property + "</em></span>";
		}
		else if (obj1.hasOwnProperty(property) && obj2.hasOwnProperty(property)){
			if(typeof obj1[property] == "object"){

				if(obj1[property] == null){
					obj1[property] = "<span class='"+STRUCTURE_WARNING_CLASS+"'><strong>NULL</strong></span>";
				}
				else {
					// var updatedPathArray = pathArray.slice();
					// updatedPathArray.push(property);
					iterateObject(obj1[property], obj2[property], modifiedPath, structureLog, valuesLog, objOneIsOriginal);
				}
			}
			else {
				var t1 = typeof obj1[property];
				var t2 = typeof obj2[property];

				if(t1 != t2){
					valuesLog.push(modifiedPath + ": object types differ ("+t1 + "/"+t2+")");
				}
				else if (t1 == "string" || t1 == "number" || t1 == "boolean") {
					if(t1 == "string"){
						if(obj1[property].trim() != obj2[property].trim()){
							// console.log('Difference: '+' "'+obj1[property]+'" | "'+obj2[property]+'" ');
							// valuesLog.push(modifiedPath + ": values differ ("+obj1[property]+"/"+obj2[property]+")");
							valuesLog.push("Values differ:  "+modifiedPath+"  ('"+obj1[property]+"' / '"+obj2[property]+"')");
							obj1[property] = "<span class='"+DIFF_VALUE_CLASS+"'>" + obj1[property] + '</span>';
						}
					}
					else if (t1 == "number"){
						if(obj1[property]!= obj2[property] && (Math.abs(obj1[property] - obj2[property]) > ROUNDING_THRESHOLD)){
							valuesLog.push("Values Differ:  "+modifiedPath+"  ( "+obj1[property]+" / "+obj2[property]+" )");

							// if(objOneIsOriginal){
							// 	var updatedPathArray = pathArray.slice();
							// 	updatedPathArray.push(property);
							// 	var presetSearch = searchAllOriginalPresets(obj2[property], updatedPathArray);
							// 	if(presetSearch) valuesLog.push("VALUE NOT BEING CORRECTLY SET: "+modifiedPath+".  Incorrect value in returned preset ("+obj2[property]+") found in other presets.");
							// }

							obj1[property] = "<span class='"+DIFF_VALUE_CLASS+"'>" + obj1[property] + '</span>';
						}
					}
					else if (t1 == "boolean"){
						if(obj1[property]!= obj2[property]){
							valuesLog.push("Values Differ: " + modifiedPath+"  &nbsp; ( "+obj1[property]+" / "+obj2[property]+" )");
							obj1[property] = "<span class='"+DIFF_VALUE_CLASS+"'>" + obj1[property] + '</span>';
						}
					}
				}
			}
		}
	}

	// This loop is for error highlighting
	if(obj2 != null){
		for (var property in obj2){

			if(obj1 != null && !(property in obj1)){
				obj1[property] = "<span class='"+STRUCTURE_WARNING_CLASS+"'><strong>MISSING</strong></span>";
			}
		}		
	}
}


function pctAddErrorMessage(testIndex, presetTitle, presetVersion, errorString, originalPreset){
	// var newNode = $('<li class="list-group-item list-group-item-danger"></li>"');
	var newNode = $('<li class="list-group-item list-group-item-danger pct-error-'+testIndex+'" data-preset-title="'+presetTitle+'"></li>"');
	newNode.append('<p class="pull-right"><small>preset version: '+presetVersion+"</small></p>")
	newNode.append('<p><strong>'+presetTitle+'</strong></p>');
	newNode.append('<p class="error-body">'+errorString+'</p>');

	var errorIcons = $('<p class="error-icons"></p>');
	errorIcons.append('<a href="#" data-action="view" data-target="'+testIndex+'"><span class="glyphicon glyphicon-new-window"></span> View</a> &nbsp; &nbsp;');
	errorIcons.append('<a href="#" data-action="copy" data-target="'+testIndex+'"><span class="glyphicon glyphicon-copy"></span> Copy</a> &nbsp; &nbsp;');
	errorIcons.append('<a href="#" data-action="set" data-target="'+testIndex+'"><span class="glyphicon glyphicon-import"></span> Set</a>');

	newNode.append(errorIcons);
	newNode.append('<textarea class="original-preset" style="display: none;">'+originalPreset+'</textarea>');

	$('.error-report').append(newNode);
}

function pctAddWarningMessage(testIndex, presetTitle, presetVersion, valueErrors, structureErrors, originalPreset, originalPresetAnnotated, returnedPresetAnnotated){
	var newNode = $('<li class="list-group-item list-group-item-warning pct-error-'+testIndex+'" data-preset-title="'+presetTitle+'"></li>"');
	newNode.append('<p class="pull-right"><small>preset version: '+presetVersion+"</small></p>")
	newNode.append('<p><strong>'+presetTitle+'</strong></p>');

	if(valueErrors.length > 0){
		newNode.append("<p class='pct-error-title'><a href='#valueErrorsCollapse"+testIndex+"' data-toggle='collapse'><span class='glyphicon glyphicon-warning-sign'></span> &nbsp;Value Differences  <span class='pct-error-count'>"+valueErrors.length+"</span></a></p>")
		newNode.append("<p class='pct-errors collapse' id='valueErrorsCollapse"+testIndex+"'>"+valueErrors.join('<br>')+"</p>")
	}

	if(structureErrors.length > 0){
		newNode.append("<p class='pct-error-title'><a href='#structureErrorsCollapse"+testIndex+"' data-toggle='collapse'><span class='glyphicon glyphicon-warning-sign'></span> &nbsp; Missing or Inconsistent Values <span class='pct-error-count'>"+structureErrors.length+"</span></a></p>")
		newNode.append("<p class='pct-errors collapse' id='structureErrorsCollapse"+testIndex+"'>"+structureErrors.join('<br>')+"</p>")
	}

	var errorIcons = $('<p class="error-icons"></p>');
	errorIcons.append('<a href="#" data-action="compare" data-target="'+testIndex+'"><span class="glyphicon glyphicon-new-window"></span> View</a> &nbsp; &nbsp;');
	errorIcons.append('<a href="#" data-action="copy" data-target="'+testIndex+'"><span class="glyphicon glyphicon-copy"></span> Copy</a> &nbsp; &nbsp;');
	errorIcons.append('<a href="#" data-action="set" data-target="'+testIndex+'"><span class="glyphicon glyphicon-import"></span> Set</a>');

	newNode.append(errorIcons);
	newNode.append('<textarea class="original-preset" style="display: none;">'+originalPreset+'</textarea>');
	// newNode.append('<pre class="returned-preset" style="display: none;">'+returnedPreset+'</pre>');

	newNode.append('<pre class="original-preset-annotated" style="display: none;">'+originalPresetAnnotated+'</pre>');
	newNode.append('<pre class="returned-preset-annotated" style="display: none;">'+returnedPresetAnnotated+'</pre>');

	$('.error-report').append(newNode);
}

function pctAddEventListeners(){
	$('#gizmoDebugWindow').on('click', '[data-action]', function(event){
		var action=$(this).data('action');
		var target=$(this).data('target');

		if(action == 'compare'){
			var originalPresetData = $('.pct-error-'+target+' .original-preset-annotated').html();
			var returnedPresetData = $('.pct-error-'+target+' .returned-preset-annotated').html();
			var presetTitle = $('.pct-error-'+target).data('preset-title');


			$('#pctCompareResults .preset-original').html(originalPresetData);
			$('#pctCompareResults .preset-returned').html(returnedPresetData);
			$('#pctCompareResults .preset-title').text(presetTitle);
			$('#pctCompareResults').modal('show');
		}
		else if(action == 'view'){
			var originalPresetData = $('.pct-error-'+target+' .original-preset').html();
			var presetTitle = $('.pct-error-'+target).data('preset-title');

			$('#pctViewResults .preset-original').html(originalPresetData);
			$('#pctViewResults .preset-title').text(presetTitle);
			$('#pctViewResults').modal('show');
		}
		else if(action == "copy"){
			var originalPresetData = $('.pct-error-'+target+' .original-preset');
			originalPresetData.show();
			copyVisibleText('.pct-error-'+target+' .original-preset');
			originalPresetData.hide();
		}
		else if(action == "set"){
			var originalPresetData = $('.pct-error-'+target+' .original-preset').text();
			setGizmoData(originalPresetData);
		}

	});
}

function addToSummaryTab(errorTotals){
	var table = $('#pctSummary table');

	var sortable = [];
	for (var key in errorTotals){
		sortable.push([key, errorTotals[key]]);		
	}
	sortable.sort(function(a,b){
		return b[1] - a[1];
	});


	for(var i=0;i<sortable.length;i++){
		var newNode = $('<tr></tr>');
		newNode.append('<td>'+sortable[i][1]+'</td>');
		newNode.append('<td>'+sortable[i][0]+'</td>');

		table.append(newNode);
	}
}

function analyzePCTResults(){

	pctAddEventListeners();

	var totalTestCases = pctParameters.testData.length;

	for(var i=0;i<totalTestCases;i++){
		var resultSet = pctParameters.results[i];
		var originalData = pctParameters.testData[i].data;
		var getData = JSON.parse(resultSet.data);

		pctParameters.testData[i].originalPresetAnnotated = JSON.parse(JSON.stringify(pctParameters.testData[i].data)); // Clone the object
		pctParameters.testData[i].returnedPresetAnnotated = JSON.parse(pctParameters.results[i].data);

		console.log('Processing: '+i);

		// iterateObject(originalData, getData, "", pctParameters.results[i].structureCompare, pctParameters.results[i].valueCompare,"Returned Preset");
		// iterateObject(pctParameters.testData[i].originalPresetAnnotated, getData, "", [], pctParameters.results[i].structureCompare, pctParameters.results[i].valueCompare, true);
		iterateObject(pctParameters.testData[i].originalPresetAnnotated, getData, "", pctParameters.results[i].structureCompare, pctParameters.results[i].valueCompare, true);


		// Value log is not needed here because it just adds the same values
		// iterateObject(pctParameters.testData[i].returnedPresetAnnotated, originalData, "", [], pctParameters.results[i].structureCompare, [], false);
		iterateObject(pctParameters.testData[i].returnedPresetAnnotated, originalData, "", pctParameters.results[i].structureCompare, [], false);

		// var compareResults = compareDataSets(originalData, getData, pctParameters.results[i].structureCompare, pctParameters.results[i].valueCompare);
	}

	$('.total-presets-analyzed').text(totalTestCases);

	$('.error-report').empty();

	var totalErrors = 0;
	var totalStructureWarnings = 0;
	var totalValueWarnings = 0;

	var errorTotals = {};

	function addToErrorTotals(errorArray){
		for(var i=0;i<errorArray.length;i++){
			var errorString = errorArray[i];
			if(Object.keys(errorTotals).indexOf(errorString) == -1){
				errorTotals[errorString] = 1;
			}
			else {
				errorTotals[errorString] += 1;
			}
		}
	}

	for(var i=0;i<totalTestCases;i++){

		var resultSet = pctParameters.results[i];
		var presetTitle = pctParameters.testData[i].title;
		var presetVersion = pctParameters.testData[i].version;
		// var presetDataString = pctParameters.testData[i].data;
		// var prettyPresetDataString = JSON.stringify(presetDataString, null, 3);


		// var returnedPreset = resultSet.data;
		var returnedPresetAnnotated = JSON.stringify(pctParameters.testData[i].returnedPresetAnnotated, null, 3);

		var originalPreset = JSON.stringify(pctParameters.testData[i].data, null, 3);
		var originalPresetAnnotated = JSON.stringify(pctParameters.testData[i].originalPresetAnnotated, null, 3);

		if(resultSet.errors.length > 0){
			totalErrors += 1;

			// Assume one error for now.
			var errorString = resultSet.errors[0];
			pctAddErrorMessage(i, presetTitle, presetVersion, errorString, originalPreset);

		}
		else { // no errors

			if(resultSet.structureCompare.length > 0 || resultSet.valueCompare.length > 0){

				var warningString = resultSet.structureCompare.join("<br>")	+ "<br>" + resultSet.valueCompare.join("<br>");

				addToErrorTotals(resultSet.structureCompare);
				addToErrorTotals(resultSet.valueCompare);

				pctAddWarningMessage(i, presetTitle, presetVersion, resultSet.valueCompare, resultSet.structureCompare, originalPreset, originalPresetAnnotated, returnedPresetAnnotated);

				if(resultSet.structureCompare.length) totalStructureWarnings += 1;
				if(resultSet.valueCompare.length) totalValueWarnings += 1;
			}

			// if(resultSet.valueCompare.length > 0){
			// 	addToErrorTotals(resultSet.valueCompare);
			// 	var structureString = resultSet.valueCompare.join("<br>");
			// 	pctAddWarningMessage("Data Value Test", i, presetTitle, presetVersion, structureString, originalPresetPretty, returnedPreset);
			// 	totalValueWarnings += 1;
			// }
		}
	}

	$('.error-test-total').text(totalErrors);
	$('.warnings-total').text(totalStructureWarnings + totalValueWarnings);

	$('.no-test-results').hide();
	$('.test-results').show();
	$('#gizmoDebugWindow').show();

	$('.pct-results-tab-handle.results').tab('show');

	addToSummaryTab(errorTotals);

	// Re-enable PCT button
	$('.run-pct').attr('disabled', false);

	pctParameters = null;
	pctInProgress = null;

	console.log('** Finished Running Preset Compatibility Test **');
}

function startPresetCompatabilityTest(presets, onCompletion, timeBetweenPresets){

	console.log('** Starting Preset Compatibility Test **');

	pctInProgress = true;

	// Create object to contain results
	pctParameters = {
		testData : [],
		currentIndex : 0,
		results : [],
		callback : onCompletion,
		timeBetweenPresets : timeBetweenPresets
	}

	// Initialize results
	for(var i=0; i<presets.length; i++){

		try {
			presetData = JSON.parse(presets[i].data);

			var releaseVersion = "N/A";

			if(Object.keys(presetData).indexOf('releaseVersion') != -1){
				releaseVersion = presetData.releaseVersion;
			}

			pctParameters.testData.push({
				title : presets[i].title,
				version : releaseVersion,
				data : presetData.data
			})


			pctParameters.results.push({
				data : 'NULL',
				errors : [],
				structureCompare : [],
				valueCompare : []
			});

		} catch(e){
			notifyError("Preset found with incorrect JSON. See console.", 800);
			console.log("Preset With Error: " + presets[i].data);
		}
	}

	iteratePCTSend();

	// for(var i = 0; i< presets.length;i++){
	// 	var presetData = presets[i].data;
	// 	// Do a "set" and check for errors
	// 	// setGizmoData(presetData);

	// 	function setGizmoFunction(index, data){

	// 		var SGF = function(){
	// 			console.log('Running: '+index);
	// 			setGizmoData(data)
	// 			getGizmoData(GETTER_SRC_PRESET_TEST);
	// 		}

	// 		return SGF;
	// 	}

	// 	setTimeout(setGizmoFunction(i, presetData), 100 * i);
	// }

	// console.log('** Finished Running Preset Compatability Test **');
}

function copyVisibleText(target){
	var getterDataTextField = document.querySelector(target);
	getterDataTextField.select();

	try {
		var result = document.execCommand('copy')
		if(result){
			notify('Data copied to clipboard.', 500);
		}
	}
	catch (err){
		notifyError('There was a problem copying the data', 800);
	}

	//unselect
	$(target).blur();
}


LOAD_PRESETS_ALL_USERS = "all";
LOAD_PRESETS_ALL_GIZMOS = -1;


function initializeGSDebug(resourceID){

	// Initialize the window to 
	window.setTimeout(function(){
		getGizmoData(GETTER_SRC_INITIALIZE);
		getListOfCameras();
	}, 3000);

	// Setup preset compatability test
	loadAllPresets(resourceID, LOAD_PRESETS_ALL_USERS, function(data){
		$('.total-presets').text(data.viewstates.length);
		allSavedPresets = data.viewstates;

		if(allSavedPresets.length == 0) $('.run-pct-all').attr('disabled', true);
	});

	// Load user's presets
	loadAllPresets(resourceID, elUser.userName, function(data){
		$('.total-presets-mine').text(data.viewstates.length);
		mySavedPresets = data.viewstates;

		if(mySavedPresets.length == 0) $('.run-pct-mine').attr('disabled', true);

	});

	$('.run-pct-all').on('click', function(){
		console.log('Running PCT');
		$('.run-pct-all,.run-pct-mine').attr('disabled', true);
		$('.error-report').empty();

		var timeBetweenPresets = $('#pctDuration').val();

		startPresetCompatabilityTest(allSavedPresets, analyzePCTResults, timeBetweenPresets);
	});

	$('.run-pct-mine').on('click', function(){
		console.log('Running PCT');
		$('.run-pct-all,.run-pct-mine').attr('disabled', true);
		$('.error-report').empty();

		var timeBetweenPresets = $('#pctDuration').val();

		startPresetCompatabilityTest(mySavedPresets, analyzePCTResults, timeBetweenPresets);
	});

	// var GIZMO_VERSION_FILE = elPaths.imageRoot + "/resources/html5gs/" + resourceID + "/package.json";

	// $.get(GIZMO_VERSION_FILE, function(data){
	// 	var versionInfo = jQuery.parseJSON(data);

	// 	$('.gizmo-version').text(versionInfo['version']);

	// 	var versionLog = versionInfo['log'];
	// 	for(var i = versionLog.length-1; i >0 ; i--){
	// 		var newEntry = $('<li>').append('<strong>'+versionLog[i]['version'] + " </strong> - " + versionLog[i]['changes']);
	// 		$('.gizmo-history').append(newEntry);
	// 	}
	// });

	window.onerror = function(messageOrEvent, source, line, colno, error){
		var errorMessage = 'Gizmo Error: '+ messageOrEvent;
		notifyError(errorMessage, 1000);
		return false;
	}

	$('#gsGet').on('click', function(){
		getGizmoData(GETTER_SRC_DEBUG);
    });

	$('.copy-gs-data').on('click', function(){

		if($('#editGSData.in').length > 0){
			copyVisibleText('.raw-data');
		}
		else {
			$('#editGSData').toggle();
				copyVisibleText('.raw-data');
			$('#editGSData').toggle();
		}

	});


    $('#gsSet').on('click', function(){
        if(lastSavedGizmoState){
        	addDataToDebugWindow(lastSavedGizmoState);
        	setGizmoData(lastSavedGizmoState);
        }
    });

    $('.toggle-debug-window').on('click', function(){
    	$('#gizmoDebugWindow').toggle();
    });

    $('.minimize-debug-window').on('click', function(){
    	$('#gizmoDebugWindow').toggleClass('minimized');
    	$(this).toggleClass('glyphicon-remove').toggleClass('glyphicon-fullscreen')
    });

    var prettyID = $('<span/>', {'class' : 'text-muted', 'html' : ' (' + resourceID + ')'});
    $('#affixedBarWrap .header h1').append(prettyID);

    function getSingleComponentString(key){
    	var data = lastSavedGizmoState[key];
    	var newGSData = '{ "' + key + '" : ' + JSON.stringify(data) + ' }';
    	return newGSData;
    }

    function getSingleFieldString(parentKey, thisKey, newValue){
    	var newGSData = '{ "'+parentKey +'": { "'+thisKey + '": '+newValue + '}}';
    	return newGSData;
    }

    // Toggle Visibility
    $('#gizmoDebugWindow').on('click', '[data-toggle="getset"]', function(){

    	var parentKey = $.trim($(this).parents('tr').find('td:first-child').text());
    	var newValue = $(this).data('value');
    	var thisKey = $(this).data('key');

    	if(thisKey == '-') return;

    	lastSavedGizmoState[parentKey][thisKey] = newValue;

    	addDataToDebugWindow(lastSavedGizmoState);
    	// setGizmoData(getSingleFieldString(parentKey, thisKey, newValue));
    	setGizmoData(getSingleComponentString(parentKey));
    });

    $('#gsRefresh').on('click', function(){
    	resetGizmo();
    });

    var SETTABLE = ['checked', 'selected', 'value'];

    var newValue = function(field, oldValue){
        switch(field){
            case 'checked':
                return !oldValue;
                break;
            case 'selected':
                if(oldValue == 0) return 1;
                return 0;
                break;
            case 'value':
                if(typeof oldValue == 'string'){
                    var value = parseInt(oldValue)+1;
                    return "" + value;
                } else {
                    return oldValue + 1;
                }

                break;
            default:
                return oldValue;
        }
    }

    $('#runGSAutomation').on('click', function(){
        var stateObject = JSON.parse(getterSetter.get());

        // This redundant get/set is to set the 'visible' field, which
        // only seems to get set in some objects after the first set.
        getterSetter.set(JSON.stringify(stateObject));
        stateObject = JSON.parse(getterSetter.get());

        for(var key in stateObject){
            if (stateObject[key]['settable'] && key != 'Table') {
                console.log(key);
                console.group();
                // valuesObj = stateObject[key]['values'];
                for(var i = 0; i < SETTABLE.length; i++){
                    var field = SETTABLE[i];

                    if(field in stateObject[key]['values']){
                        var oldValue = stateObject[key]['values'][field];
                        stateObject[key]['values'][field] = newValue(field, oldValue);

                        getterSetter.set(JSON.stringify(stateObject));
                        var newObject = JSON.parse(getterSetter.get());

                        if(JSON.stringify(stateObject[key]) != JSON.stringify(newObject[key])){
                            console.log('Comparison failure for '+key+ ': '+field);
                            console.log('Modified:  '+JSON.stringify(stateObject[key]));
                            console.log('Retrieved: '+JSON.stringify(newObject[key]));
                        }

                        stateObject[key]['values'][field] = oldValue;                        
                        getterSetter.set(JSON.stringify(stateObject));
                    }
                }
                console.groupEnd();
            } // settable
        }

    });
}

function addImageToActivity(data){
	var _img = document.createElement("img");
	$(_img).attr("src", data).addClass('img-responsive');

	$('.saved-screenshots').append(_img);
}

function showScreenShot(data)
{		
	var _img = document.createElement("img");
	$(_img).attr("src", data).addClass('img-responsive');

	$('.gizmo-screenshot-modal .modal-dialog').css('width', '55vw');
	$('.gizmo-screenshot-modal .modal-body').empty().append(_img);

	$('.gizmo-screenshot-modal').modal('show');
}