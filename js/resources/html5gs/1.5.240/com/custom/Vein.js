var VeinClass=function VeinClass(_callbackFn){var veinObjects=new Array;if("undefined"!=typeof actComponentJson)for(var i in actComponentJson)for(var j=0;j<actComponentJson[i].length;j++){var _item=actComponentJson[i];this[_item[j].id]=eval("new "+i+"()"),_item[j].target=eval(_item[j].target),this[_item[j].id].init(_item[j]),veinObjects.push(this[_item[j].id])}};