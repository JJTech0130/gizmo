// assessment_questions.js
// Description: JS to process assessment questions submission
// Author: Jordan Marshall
// Created: August 2015

var saveResults = false;
var classIDForResults = 0;

$(document).ready(function(){

	// TODO: some sort of check to see that they have assessment questions?
	// IE #assessmentQuestionDisplay.length > 0?

	if($('#resultsStored').length){
		saveResults = $('#resultsStored').val().toLowerCase();
	}

	if($('#classIDForResults').length){
		classIDForResults = $('#classIDForResults').val();
	}

	$('#selectClassForResults ul a.list-group-item').on('click', function(event){
		event.preventDefault();

		$(this).siblings().removeClass('active');
		$(this).addClass('active')

		classIDForResults = $(this).data('classid');

		$('#submitAssessment').removeClass('disabled');
	});

	// Assessment Question Form
	$('#submitAssessment').on('click', function(event){
		event.preventDefault();

		if($(this).hasClass('disabled')){
			return
		}
		
		var totalAnswers = $('#assessmentForm ol ul.options input:checked').length;
		var totalQuestions = $('#assessmentForm ol ul.options').length;

		if(totalAnswers < totalQuestions){
			var unanswered = []

			$('#assessmentForm ol li.list-group-item ul.options').each(function(i, val){
				var checked = $(this).find('input:checked').length;
				if(checked == 0) unanswered.push(i+1);
			});

			$('#missingQuestions').html(unanswered.join(', '));
			$('#assessmentSubmitDialogue').show();
			$(this).parent().hide();
		}
		else {
			$(this).addClass('disabled');
			processAssessmentSubmit();
		}
	});

	$('#confirmAssessmentSubmit').on('click', function(event){
		event.preventDefault();
		$(this).addClass('disabled');

		processAssessmentSubmit();
	})

	$('#cancelAssessmentSubmit').on('click', function(event){
		event.preventDefault();
		$('#assessmentSubmitDialogue').hide();
		$('#submitAssessment').removeClass('disabled').parent().show();
	});

	// This is for the top of page links
	$('body').on('click', 'a.resultsTop', function(event){
		event.preventDefault();
		scrollToAssessmentResultsTop();	
	});

	// The other page top link
	$('body').on('click', 'a.assessmentTop', function(event){
		event.preventDefault();

		// If student results are on this page scroll to the top (results table)
		if($('#DeleteStudentAnswers').length > 0){
			$(window).scrollTop(0);	
		} else {
			$(document).scrollTop($('#assessmentQuestionSummary').offset().top-75);		
		}
	});

	// Print assessment questions
	$('body').on('click', '#printAssessmentQuestions', function(event){
		event.preventDefault();
		printAssessmentQuestions();
	});

	// Links from the scorecard to the answer summary
	$('body').on('click', '.question-click', function(event){
		event.preventDefault();
		var target = $(this).attr('href');
		$(window).scrollTop($(target).offset().top-55);
	});

	// When students click to view past results
	$('body').on('click', '.view-past-results', function(event){
		event.preventDefault();
		className = $(this).data('classname');
		answers = $(this).data('answers');
		resourceID = $('#assessmentForm').find('input[name="ResourceID"]').val();

		successFunction = function(data){
			var scorecard = $(data.html).find('#assessmentScorecard');
			scorecard.find('.student-answer-your-results').html('Saved Results for <strong>'+className+'</strong>').show();
			$('#pastResults').empty().append(scorecard).show();
		}

		getAssessmentAnswers(resourceID, true, answers, successFunction);
	});

	// For teachers who want to go straight to the explanations without checking answers
	$('#gotoAnswersExplanations').on('click', function(event){
		event.preventDefault();

		resourceID = $('#assessmentForm').find('input[name="ResourceID"]').val();
		getAssessmentAnswers(resourceID, false, "", displayAssessmentResults);
	});


	// This displays the assessment question summary on the teacher results page.
	if($('#assessmentQuestionSummaryContainer').length > 0){

		resourceID = $('#assessmentResourceID').val();
		successFunction = function(data){
			var questionData = $(data.html).find('#assessmentQuestionSummary');
			$('#assessmentQuestionSummaryContainer').append(questionData);
		}

		getAssessmentAnswers(resourceID, false, '', successFunction);
	}

}); // document.ready

function scrollToAssessmentResultsTop(){
	$(document).scrollTop($('#assessmentQuestionsForm').offset().top-125);	
}


function printAssessmentResults(){
	// $('#assessmentQuestionSummary,.col-md-12.header').addClass('no-print');	
	$('#assessmentQuestionSummary').addClass('no-print');
	printPage();
	// $('#assessmentQuestionSummary,.col-md-12.header').removeClass('no-print');	
	$('#assessmentQuestionSummary').removeClass('no-print');	
	
}

function printAssessmentAnswerSummary(){
	// $('.card.el-table-group, .col-md-12.header').addClass('no-print');
	$('.card.el-table-group').addClass('no-print');
	printPage();
	// $('.card.el-table-group, .col-md-12.header').removeClass('no-print');
	$('.card.el-table-group').removeClass('no-print');
}

function printAssessmentQuestions(){

	$('.gizmo-view').addClass('no-print');
	$('#affixedBarWrap').addClass('no-print');

	printPage();

	$('.gizmo-view').removeClass('no-print');
	$('#affixedBarWrap').removeClass('no-print');
}

function processAssessmentSubmit(){
	
	resourceID = $('#assessmentForm').find('input[name="ResourceID"]').val();

	questionIDs = $('#assessmentForm').find('input[name="QuestionIDs"]').val();
	var selectedAnswers = $('#assessmentForm').find('input[type="radio"]:checked')

	var answerString = "";
	selectedAnswers.each(function(index){
		if(answerString.length > 0) answerString += ","
		answerString += $(this).val();
	});
	
	if(saveResults == "true"){
		if(classIDForResults == 0){
			alert('Error: no class ID defined.');
		}

		saveAssessmentResults(classIDForResults, resourceID, questionIDs, answerString);
	}
	else {
		getAssessmentAnswers(resourceID, true, answerString, displayAssessmentResults, false);
	}
}

var AJAX_REQUEST_URL = "index.cfm";

function saveAssessmentResults(classID, resourceID, questionIDs, answerString){

	$.post(AJAX_REQUEST_URL, 
	{
		method : "cResource.saveStudentAssessmentResults",
		classID : classID,
		questionIDs : questionIDs,
		resourceID : resourceID,
		assessmentChoiceList : answerString
	},
	function(data){
		if(data.success == true){
			classname = data.classname;
			getAssessmentAnswers(resourceID, true, answerString, displayAssessmentResults, classname);
		}
		else {
			notifyError('Problem.'+data.message);
		}
	},
	'json').fail(function(){
		// Probably not logged in - do not proceed.
		$('#resultsWarning').remove();
		$('#assessmentForm').hide();
		$('#assessmentResultsViewTop').find('div.clearfix').hide();

		var LOGGED_OUT_MESSAGE = '<div class="billboard">' +
		'<div class="graphic glyphicon glyphicon-remove"></div>'+
		'<h1 class="title">You have been logged out due to inactivity.</h1>'+
		'<h3>Please <a href="'+elPaths.myself+'cUser.dspLoginJoin">login</a> and re-take the assessment questions. </h3>'+
		'</div>';

		addAssessmentAnswersToPage(LOGGED_OUT_MESSAGE);
		$(document).scrollTop($('#assessmentQuestionsForm').offset().top);	
	});
}

function getAssessmentAnswers(resourceID, checkResults, answerString, successFunction, classname){

	$.post(AJAX_REQUEST_URL, 
	{
		method : "cResource.getAssessmentAnswers",
		resourceID : resourceID,
		answerList : answerString,
		checkResults : checkResults
	},
	function(data){
		
		if(data.success == true){
			
			// sending the grade back to LTI consumer (if needed)
			LTIRequestID = $('#assessmentForm').find('input[name="LTIRequestID"]').val();
			callBackURL = $('#assessmentForm').find('input[name="callBackURL"]').val();	
			if((LTIRequestID != undefined) && (callBackURL != undefined))
			{
				decimal = data.numofcorrectanswers/data.numofquestions;
				
				$.post(callBackURL, 
				{
					LTIRequestID : LTIRequestID,
					Grade : decimal,
					gizmostudentanswer : data.gizmostudentanswer
				},
				function(ltidata){
					
					console.log("lti returned = " + JSON.stringify(ltidata));
					
					if(ltidata.success)
					{
						successFunction(data, classname);
						refreshMathjax();
					}
					else
					{
						notifyError('Something Wrong. Please contact the school administrator.');
					}
					
				}, 'json');
								
				
			}
			else {
				successFunction(data, classname);
				refreshMathjax();
			}
		}
		else {
			notifyError('There was a problem retreiving the assessment answers.'+JSON.stringify(data.errors));
		}
	},
	'json');
}

function refreshMathjax(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	console.log('Refreshing mathjax');
}

function displayAssessmentResults(data, classname){
	$('#resultsWarning').remove();
	addAssessmentAnswersToPage(data.html);

	// studentPreviousResults is declared on the page, but only if the student has previous results.
	if (typeof studentPreviousResults != 'undefined'){
		var successFunction = function(data, newClassname){
			var results = $(data.html);
			var resultsRow = results.find('#assessmentScorecard table.el-table tbody tr');

			resultsRow.find('td:first-child').html("Saved Results for <strong>"+newClassname+"</strong>")

			$('#assessmentScorecard table.el-table tbody').append('<tr>'+resultsRow.html()+'</tr>');
		};

		// They have already taken the assessment.
		if(!classname){
			var notSavedMessage = "Current Results NOT Saved  &nbsp;&nbsp;<em>You have already taken this assessment</em>"
			$('#assessmentScorecard table tbody tr:first-child').addClass('student-duplicate-results').find('td:first-child').html(notSavedMessage);
		}

		// loop through studentPreviousResults
		for(var i=0;i<studentPreviousResults.length;i++){
			var className = studentPreviousResults[i].classname;
			var answerString = studentPreviousResults[i].answers;

			resourceID = $('#assessmentForm').find('input[name="ResourceID"]').val();
			getAssessmentAnswers(resourceID, true, answerString, successFunction, className);
		}
	}

	if(classname){
		$('#assessmentScorecard table tbody .student-answer-your-results').html('Your Results &nbsp;<em>saved for class <strong>'+classname+'</strong></em>')
	}

	$('#noResultsAlert').hide();
	$('#assessmentForm').hide().parents('.bg-panel').css('background-color', '#F9F9FB');
	$('#assessmentResultButtons').show();
	scrollToAssessmentResultsTop();
}

function addAssessmentAnswersToPage(answerTableHTML){
	var resultsDisplay = $('#assessmentQuestionResults');	
	resultsDisplay.append($(answerTableHTML));
	resultsDisplay.show();
	
	if((typeof elUser != 'undefined') && (!elUser.isTeacher)){
		$('#studentName').text(elUser.userFullName);
	}
	
}



