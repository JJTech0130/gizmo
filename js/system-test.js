// system-test.js
// Description: The JS needed for the system test page (method=cCorp.dspTest)
// Author: Jordan Marshall
// Created: May 2015
// Modified by JLG in January 2018 to remove flash, cookie related checks

/* CODE USED FOR GATHERING SYSTEM DATA FOR THE SUPPORT FORM */

var systest = {
	os: {
		name: '',
		ver: '',
		title: ''
	},
	browser: {
		name: '',
		ver: '',
		title: ''
	}
};


function getDetectedMsg(testItem){
	var detectedTitle = (testItem.title) ? testItem.title : '';
	return detectedTitle;
}

function getSupportFormData(){

	populateSystemTestData();

	var systemInformation = {
		osDetected : getDetectedMsg(systest.os),
		browserDetected : getDetectedMsg(systest.browser),
		rawClientInfo : navigator.userAgent
	} 

	return systemInformation;
}

function populateSystemTestData(){
	//OS properties 
	systest.os.name = systest.os.title = BrowserDetect.OS;
	systest.os.ver = (BrowserDetect.OSVersion != 'unknown') ? BrowserDetect.OSVersion : '';
	if (systest.os.ver != '') systest.os.title += (' ' + systest.os.ver);

	//Browser properties
	systest.browser.name = systest.browser.title = BrowserDetect.browser;	
	systest.browser.ver = (BrowserDetect.browserVersion != 'unknown') ? BrowserDetect.browserVersion : '';
	if (systest.browser.ver != '') systest.browser.title += (' ' + systest.browser.ver);
	systest.browser.testMsg = systest.browser.failMsg;
}
