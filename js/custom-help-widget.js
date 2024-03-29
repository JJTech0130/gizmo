// custom-help-widget.js
// formerly custom-zendesk.js
// Description: JS needed for the help widget 
// Author: Jordan Marshall
// Created: May 2015
// Updated and renamed for Salesforce switch: May 2019

var POPOVER_TITLE = 'How can we help you?';

var SUPPORT_FORM_SUCCCESS_STRING = "Your request has been submitted";
var SALESFORCE_SEARCH_LINK = elPaths.salesforcePath + "global-search/";


function goToSearch(term){

	term = sanitize(term);
	window.open(SALESFORCE_SEARCH_LINK + encodeURIComponent(term));
}

function resizePopover(){
	// Needed for correct popover positioning, as the dimensions are likely to change after a search.
    $('.helpdesk-widget .popover').css('bottom', '65px');
	$('.helpdesk-widget .popover').css('top', 'auto');
}

function createPopover(){
	$('#help-popover').popover({
		placement: 'top',
		container : '.helpdesk-widget',
		html : true,
		title: POPOVER_TITLE,
		content : function () {
		  return $('#popoverContainer').html();
		}
	});
}

function initializeHelpdeskContactFormValidation(formElement){
	formElement.validate({
		errorClass : 'text-danger',
 		errorElement : 'em',
 		rules : {
 			supportFormUserData : {
 				emailWithDot : true
 			}
 		},
 		errorPlacement : function(error, element){
 			// Empty so that all we do is highlight
 		},
 		submitHandler : function(supportForm){
 			var form = $(supportForm);

 			form.find('#helpdeskContactSubmit').attr('disabled', true);

 			var parameters = {
 				method : form.find('input[name=method]').val(),
 				hiddenUserKey : form.find('input[name=hiddenUserKey]').val(),
				supportFormSubject : form.find('select[name=supportFormSubject]').val(),
				supportFormUserData : form.find('input[name=supportFormUserData]').val(),
				supportFormUS : form.find('input[name=supportFormUS]').val(),
				supportFormDetail : form.find('textarea[name=supportFormDetail]').val(),
				supportFormEmail : form.find('input[name=supportFormEmail]').val(),
				supportFormMessage : form.find('textarea[name=supportFormMessage]').val(),
 			}

 			// Add system information (os, browser)
 			$.extend(parameters, getSupportFormData());

 			$.post(AJAX_URL, parameters,

			function(data){

				// TODO: Add an animation to show that the message is being sent
				if(data.indexOf(SUPPORT_FORM_SUCCCESS_STRING) != -1){
					notify('<strong>Success:</strong> An ExploreLearning representative will be in touch with you shortly.');
				}
				else {
					notify('<strong>Error:</strong> There was a problem with your request.');
				}

				// Close the popover once the form retpurns
				$('#help-popover').trigger('click');
			});
 		},
 		highlight: function(element, errorClass, validClass){
 			$(element).parent('div').addClass('has-error');
 		},
 		unhighlight: function(element, errorClass, validClass){
 			$(element).parent('div').removeClass('has-error');
 		}
	});

	formElement.on('change keyup focusout', function(){
		if($(this).valid()){
			$(this).find('button#helpdeskContactSubmit').removeClass('disabled');
		} else {
			$(this).find('button#helpdeskContactSubmit').addClass('disabled');
		}
	});

	// This is to better emulate the behavior of the existing search element
	formElement.find('input, textarea').on('focusout', function(){
		$(this).valid();
	});
}

function sanitize(input){
	var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
					 replace(/<[\/\!]*?[^<>]*?>/gi, '').
					 replace(/<style[^>]*?>.*?<\/style>/gi, '').
					 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
	return output;
}

$(document).ready(function(){

	createPopover();

	// Separate handlers because some pages have handlers that will trigger hide events on all popovers
	// Thus we need to set the icons specifically instead of toggling them.
	$('#help-popover').on('show.bs.popover', function(event){
		$(this).find('span.glyphicon').removeClass('glyphicon-question-sign').addClass('glyphicon-remove-circle');		
	}).on('hide.bs.popover', function(event){
		$(this).find('span.glyphicon').removeClass('glyphicon-remove-circle').addClass('glyphicon-question-sign');		
	});

	$('.helpdesk-widget').on('change', 'select', function(event){
		$('#whatInfo .panel-body').addClass('hide')
		var selected = $(this)[0].value
		$('#whatInfo .panel-body[data-sel='+selected+']').removeClass('hide')
	});

	// Needed for correct sizing if the user has carried out a search
	$('#help-popover').on('hide.bs.popover', function(){
		$('.popover').removeAttr('style');
	});

	$('.helpdesk-widget').on('submit', '#helpdeskSearchForm', function(event){
		event.preventDefault();
		var searchTerm = $(this).find('#helpdeskSearchField').val();

		if (searchTerm.length < 2){
			$(this).find('div.form-group').addClass('has-error');
			$(this).find('div.text-danger').remove();
			$(this).find('div.input-group').after('<div class="text-danger"><em>Your search term must have 2 or more characters.</em></div>');
			$(this).find('.btn').removeClass('btn-primary').addClass('btn-danger');
		}
		else {
			$(this).find('div.form-group').removeClass('has-error');
			$(this).find('div.text-danger').remove();
			$(this).find('.btn').removeClass('btn-danger').addClass('btn-primary');
		
			goToSearch(searchTerm);
		}
	});

	$('.helpdesk-widget').on('click', function(event){

	  var $target = $(event.target);

	  if (event.target.id == 'helpdeskContactButton'){

	  	var popoverContent = $(event.target).parents('.popover-content');

	    popoverContent.empty().html($('#popoverContainerContact').html()).siblings('.popover-title').html('Contact ExploreLearning');

	  	initializeHelpdeskContactFormValidation(popoverContent.find('#supportForm'));
	  	resizePopover();
	  	event.stopPropagation();
	  }
	  else if (event.target.id == 'helpdeskContactBack'){
		$(event.target).parents('.popover-content').empty().html($('#popoverContainer').html())
			  		   .siblings('.popover-title').html(POPOVER_TITLE);
		resizePopover();
		event.preventDefault();
		event.stopPropagation();
	  } else if (event.target.id == 'whatInfoTrigger'){
	  	$(event.target).children('span').toggleClass('hide')
	  	// Do not prevent default!
	  } else if ($target.hasClass('show-widget-hidden')){
	  		$('.widget-hidden').css('display', 'block').parent('.list-group').addClass('list-group-overflow');
	  		$('.show-widget-hidden').remove();
			event.preventDefault();
			event.stopPropagation();
	  } else {
		// GIZ-8325 - Code in class.js accidentally closes this popover, as it appears that the
		// event target is not in a popover (since the target has been removed).  The listener
		// for that is on the body, so we dont propogate this event.
		event.stopPropagation();
		}
	});

	//Couple of things for the Support Form Page
	$('#ContactUsForm').on('change', 'select', function(event){
		$('#whatInfo2 .panel-body').addClass('hide')
		var selected = $(this)[0].value
		$('#whatInfo2 .panel-body[data-sel='+selected+']').removeClass('hide')
	});
	$('#whatInfoTrigger2').on('click', function(event){
		$(event.target).children('span').toggleClass('hide')
	})

});
