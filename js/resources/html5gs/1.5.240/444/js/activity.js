var HouseholdEnergyUsage=function(){var i,n,o={currTab:0,currRoom:0,showlight:!1,objectSelect:!1,hours:0,minutes:0,fromObject:!1,wattage:0,kwh:0,cost:10,duration:"1 day ",tableArr:[],usage:0,name:"",valueHolder:[],id:"",tempArr:0,animFlag:!1,nameToId:[]};o.tempArr=new Array;var s=!0;slideM=!0,slideC=!0,txtHr=!0,txtM=!0,txtC=!0;var l=[];function t(e){m({})}function a(e){exportToApiObj.exportImage({x:globalResizeCalc(517),y:globalResizeCalc(27),width:globalResizeCalc(506),height:globalResizeCalc(535)})}function r(e){exportToApiObj.exportImage({x:globalResizeCalc(20),y:globalResizeCalc(47),width:globalResizeCalc(467),height:globalResizeCalc(612)})}function d(e){E(e),e.originalEvent&&(i.slide_hr.disable(),i.slide_mns.disable(),i.txt_hrs.disable(),i.txt_mns.disable()),i.slide_hr.value(0),i.slide_mns.value(0),i.txt_hrs.setValue(0),i.txt_mns.setValue(0),i.txt_cost.setValue(10),i.slide_cost.value(10),e.originalEvent&&i.tab_1.activeTab("0"),i.name.setText(""),i.usage_1.setText(""),i.usage_2.setText(""),i.consumption_1.setText(""),i.consumption_2.setText(""),i.consumption_3.setText(""),i.name_1.setText(""),e.originalEvent&&A({index:0}),i.max_curr_lbl.setText("- -"),i.max_volt_lbl.setText("- -"),i.wattage_0.hide(),i.wattage_1.hide(),i.wattage_2.hide(),i.light_lbl.hide(),o.showlight=!1,o.objectSelect=!1,o.kwh=0,o.cost=10,e.originalEvent&&(o.duration="1 day ",i.radio.setSelected(0)),i.slide_cost.value(10),i.txt_cost.setValue(10..toFixed(1)),o.usage=0,o.name="",o.tableArr=[],i.table.clearData(),o.valueHolder=[],o.id="",u(),c(),m({});for(var t=0;t<o.tempArr.length;t++)n[$(o.tempArr[t]).attr("id")].switchOn(o.tempArr[t],$(o.tempArr[t]).attr("id"),!1);tempArr=[]}function h(e){0==e.selected?o.duration="1 day ":1==e.selected?o.duration="1 week (7 days)":2==e.selected?o.duration="1 month (30 days)":3==e.selected&&(o.duration="1 year (365 days)"),y()}function u(){for(var e in n)e in i&&i[e].hide()}function c(){for(var e in n)e in i&&(n[e].addEventListener("start",m),o.tempArr.push(n[e].getInner()))}function m(e){for(var t=0;t<o.tempArr.length;t++)if($(o.tempArr[t]).hasClass("clicked")){$(o.tempArr[t]).removeClass("clicked"),"0"==$(o.tempArr[t]).attr("value")?n[$(o.tempArr[t]).attr("id")].resetImage($(o.tempArr[t]).attr("id")):n[$(o.tempArr[t]).attr("id")].resetImage("on_"+$(o.tempArr[t]).attr("id"));break}e.div&&e.div.addClass("clicked")}function b(e){if(H=!0,o.name=e.name,e.name in o.valueHolder?(i.slide_hr.enable(),i.slide_mns.enable(),i.slide_hr.value(o.valueHolder[e.name].hour),i.slide_mns.value(o.valueHolder[e.name].minute),i.txt_hrs.setValue(o.valueHolder[e.name].hour),i.txt_mns.setValue(o.valueHolder[e.name].minute),i.max_volt_lbl.setText(o.valueHolder[e.name].obj.voltage),i.max_curr_lbl.setText(o.valueHolder[e.name].obj.current),o.hours=o.valueHolder[e.name].hour,o.minutes=o.valueHolder[e.name].minute,g(o.valueHolder[e.name].obj.current,o.valueHolder[e.name].obj.voltage),1==o.currTab&&(i.usage_1.show(),i.usage_2.show(),i.consumption_1.show(),i.consumption_2.show(),i.consumption_3.show()),T()):(o.hours=0,o.minutes=0,i.slide_hr.enable(),i.slide_mns.enable(),i.slide_hr.value(0),i.slide_mns.value(0),i.txt_hrs.setValue(0),i.txt_mns.setValue(0),i.txt_hrs.enable(),i.txt_mns.enable(),i.max_volt_lbl.setText(e.voltage),i.max_curr_lbl.setText(e.current),i.usage_1.hide(),i.usage_2.hide(),i.consumption_1.hide(),i.consumption_2.hide(),i.consumption_3.hide(),i.usage_1.setText(""),i.usage_2.setText(""),i.consumption_1.setText(""),i.consumption_2.setText(""),i.consumption_3.setText("")),o.objectSelect=!0,o.id=e.id,i.name.setText(e.name),i.name_1.setText(e.name),null!=e.light&0==o.currTab?(i.light_lbl.show(),i.light_lbl.setText(GlobalTextObj.light_lbl+"&nbsp;"+e.light+" (Im)"),o.showlight=!0):(i.light_lbl.hide(),o.showlight=!1),null!=e.light?o.showlight=!0:o.showlight=!1,0==o.currTab?(i.wattage_0.show(),i.wattage_1.show(),i.wattage_2.show(),u(),i[o.id].show()):(i.wattage_0.hide(),i.wattage_1.hide(),i.wattage_2.hide()),1==o.currTab&&i.wattage_tab_1.show(),g(e.current,e.voltage),0!=o.tableArr.length){if(-1==o.tableArr.indexOf(e.name)){var t=[];t.push(e.name),t.push(0),o.name=e.name,o.valueHolder[o.name]={hour:0,minute:0,obj:e};for(var a=0;a<o.tableArr.length;a++)t.push(o.tableArr[a]);o.tableArr=t}}else o.tableArr.push(e.name),o.tableArr.push(0),o.name=e.name,o.valueHolder[o.name]={hour:0,minute:0,obj:e}}function g(e,t){i.wattage_0.setText(GlobalTextObj.wattage+" = <i>I</i> • <i>V</i>"),i.wattage_1.setText(GlobalTextObj.wattage+" = ("+e+"&nbsp;A) • ("+t+"&nbsp;V)");var a=e*t,s=e*t/1e3;o.wattage=s,i.wattage_2.setText(GlobalTextObj.wattage+" = "+a+"&nbsp;W = "+s+"&nbsp;kW"),i.wattage_tab_1.setText(GlobalTextObj.wattage+" = "+s+"&nbsp;kW")}function v(e){24<Number(i.txt_hrs.getValue())?(i.slide_hr.value(24),w({value:24}),i.txt_hrs.setValue(24),o.hours=24):(i.slide_hr.value(i.txt_hrs.getValue()),w({value:1*i.txt_hrs.getValue()}),o.hours=i.txt_hrs.getValue()),o.hours=Number(o.hours),o.valueHolder[o.name]&&(o.valueHolder[o.name].hour=o.hours),T()}function _(e){60<Number(i.txt_mns.getValue())?(i.slide_mns.value(60),i.txt_mns.setValue(60),p({value:60}),o.minutes=60):(i.slide_mns.value(i.txt_mns.getValue()),p({value:1*i.txt_mns.getValue()}),o.minutes=i.txt_mns.getValue()),o.minutes=Number(o.minutes),o.valueHolder[o.name]&&(o.valueHolder[o.name].hour=o.hours),T()}function x(e){25<Number(i.txt_cost.getValue())?(i.slide_cost.value(25),i.txt_cost.setValue(25..toFixed(1)),o.cost=25):(i.slide_cost.value(i.txt_cost.getValue()),i.txt_cost.setValue((1*i.txt_cost.getValue()).toFixed(1)),o.cost=i.txt_cost.getValue(),o.cost=Number(o.cost)),y()}function w(e){o.hours=e.value,i.txt_hrs.setValue(e.value),i.usage_1.show(),i.usage_2.show(),i.consumption_1.show(),i.consumption_2.show(),i.consumption_3.show(),o.valueHolder[o.name]&&(o.valueHolder[o.name].hour=e.value),24==e.value?(i.slide_mns.value(0),i.slide_mns.disable(),i.txt_mns.setValue(0),i.txt_mns.disable(),o.minutes=0,o.valueHolder[o.name]&&(o.valueHolder[o.name].minute=0)):(i.slide_mns.enable(),i.txt_mns.enable()),T()}function p(e){o.minutes=e.value,i.txt_mns.setValue(e.value),i.usage_1.show(),i.usage_2.show(),i.consumption_1.show(),i.consumption_2.show(),i.consumption_3.show(),o.valueHolder[o.name]&&(o.valueHolder[o.name].minute=o.minutes),T()}function f(e,t){var a;return 0!=/\d*$/.exec(e*=1).index&&(a=/\d*$/.exec(e)[0].length>t?t:/\d*$/.exec(e)[0].length,"number"==typeof e&&(e=e.toFixed(a))),1*e}function T(){if(i.usage_1.setText(GlobalTextObj.usage+"&nbsp;&nbsp;&nbsp; = &nbsp;&nbsp;"+o.hours+"&nbsp;h&nbsp;"+o.minutes+"&nbsp;m"),o.usage=o.hours+o.minutes/60,o.usage=f(o.usage,3),i.usage_2.setText("&nbsp;&nbsp; = &nbsp;&nbsp;"+o.usage+"&nbsp;h"),i.consumption_1.setText(GlobalTextObj.consumption+"&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;"+GlobalTextObj.wattage+"&nbsp;•&nbsp;"+GlobalTextObj.usage),i.consumption_2.setText("&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;"+o.wattage+"&nbsp;kW&nbsp;•&nbsp;"+o.usage+"&nbsp;h"),o.kwh=o.wattage*o.usage,0==o.currRoom?o.kwh=f(o.kwh,3):o.kwh=f(o.kwh,4),o.tableArr[o.tableArr.indexOf(o.name)+1]=o.kwh,i.consumption_3.setText("&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;"+o.kwh+"&nbsp;kWh"),0==o.kwh&&(i.usage_1.hide(),i.usage_2.hide(),i.consumption_1.hide(),i.consumption_2.hide(),i.consumption_3.hide()),!o.valueHolder[o.name]||0==o.valueHolder[o.name].hour&&0==o.valueHolder[o.name].minute?o.valueHolder[o.name]&&n[o.valueHolder[o.name].obj.id].switchOn(o.valueHolder[o.name].obj.div,o.valueHolder[o.name].obj.id,!1):n[o.valueHolder[o.name].obj.id].switchOn(o.valueHolder[o.name].obj.div,o.valueHolder[o.name].obj.id,!0),0==o.tableArr.indexOf(o.name)||R){i.table.clearData(),C=[];for(var e=o.tableArr.length-1;0<=e;e--)if(e%2==0){var t=new Array;t.push(o.tableArr[e]),t.push(o.tableArr[e+1]),0!=o.tableArr[e+1]&&null!=o.tableArr[e+1]&&(C.push(t),i.table.addData(t))}}}function k(e){o.cost=e.value,i.txt_cost.setValue(e.value.toFixed(1)),y()}this.init=function(){i=new SpineClass,n=new VeinClass,i.tab_1.addEventListener("change",A),i.tab_0.addEventListener("change",O),i.txt_hrs.addEventListener("change",v),i.txt_hrs.addEventListener("isShown",function(e){txtHr=e.show,i.hr_1[e.show?"show":"hide"]()}),i.txt_mns.addEventListener("change",_),i.txt_mns.addEventListener("isShown",function(e){txtM=e.show,i.mn_1[e.show?"show":"hide"]()}),i.txt_cost.addEventListener("change",x),i.txt_cost.addEventListener("isShown",function(e){txtC=e.show,i.cost_txt_lbl[e.show?"show":"hide"]()}),i.slide_hr.addEventListener("slide",w),i.slide_mns.addEventListener("slide",p),i.slide_cost.addEventListener("slide",k),i.reset.addEventListener("click",d),i.export.addEventListener("click",L),i.radio.addEventListener("onRdSelect",h),i.camera.addEventListener("click",a),i.camera1.addEventListener("click",r),n.lamp.addEventListener("click",b),n.blanket.addEventListener("click",b),n.computer.addEventListener("click",b),n.fan.addEventListener("click",b),n.fax.addEventListener("click",b),n.hair_dryer.addEventListener("click",b),n.light.addEventListener("click",b),n.seilFan.addEventListener("click",b),n.Tlamp.addEventListener("click",b),n.TV.addEventListener("click",b),n.Lamp2.addEventListener("click",b),n.speaker.addEventListener("click",b),n.AC.addEventListener("click",b),n.backDiv.addEventListener("setOnDiv",t),n.fridge.addEventListener("click",b),n.Flight.addEventListener("click",b),n.Dishwasher.addEventListener("click",b),n.stove.addEventListener("click",b),n.oven.addEventListener("click",b),n.coffeeMaker.addEventListener("click",b),n.toaster.addEventListener("click",b),n.kettle.addEventListener("click",b),n.washer.addEventListener("click",b),n.dryer.addEventListener("click",b),n.heater.addEventListener("click",b),n.iron.addEventListener("click",b),audioPlayerObj.add("sound",elementJson[0].src);for(var e=0;e<29;e++)l.push(!0);i.slide_hr.disable(),i.slide_mns.disable(),E({originalEvent:!0}),O({index:o.currTab}),u(),c();for(e=0;e<o.tempArr.length;e++)o.nameToId[n[$(o.tempArr[e]).attr("id")].getName()]=$(o.tempArr[e]).attr("id");for(e=0;e<7;e++)i.table.setCellStyle(e,1,{"padding-left":"4.5em"});i.slide_hr.addEventListener("visiblityChanged",function(e){s=e.show,i.hr_0[e.show?"show":"hide"]()}),i.slide_mns.addEventListener("visiblityChanged",function(e){slideM=e.show,i.mn_0[e.show?"show":"hide"]()}),i.slide_cost.addEventListener("visiblityChanged",function(e){slideC=e.show,i.cost_lbl[e.show?"show":"hide"]()})};var j=0;function y(){for(var e=0,t=1,a="",s=0;s<o.tableArr.length;s++)s%2!=0&&(e+=o.cost*o.tableArr[s]/100);"1 day "==o.duration?(e*=1,t=1,a=GlobalTextObj.totalCost_html+o.duration+" = $"):"1 week (7 days)"==o.duration?(e*=7,t=7,a=GlobalTextObj.totalCost_html+o.duration+" = $"):"1 month (30 days)"==o.duration?(e*=30,t=30,a=GlobalTextObj.totalCost_html+o.duration+"<br>= $"):"1 year (365 days)"==o.duration&&(e*=365,t=365,a=GlobalTextObj.totalCost_html+o.duration+"<br>= $"),e=e.toFixed(2),i.totalCost_lbl.setText(a+e);for(a=0,s=0;s<o.tableArr.length;s++)s%2!=0&&(a+=1*o.tableArr[s]);j=f(a*t,3),i.tab4_lbl.setText(GlobalTextObj.tab4_html+f(a*t,3)+" kWh")}var C=[];function E(e){i.slide_hr.hide(),i.slide_mns.hide(),i.slide_cost.hide(),i.txt_hrs.hide(),i.txt_mns.hide(),i.txt_hrs.disable(),i.txt_mns.disable(),i.txt_cost.hide(),i.radio.hide(),i.table.hide(),i.hr_0.hide(),i.hr_1.hide(),i.mn_0.hide(),i.mn_1.hide(),i.cost_lbl.hide(),i.export.hide(),i.cost_txt_lbl.hide(),i.light_lbl.hide(),i.wattage_0.hide(),i.wattage_1.hide(),i.wattage_2.hide(),i.name_1.hide(),i.wattage_tab_1.hide(),i.usage_1.hide(),i.usage_2.hide(),i.consumption_1.hide(),i.consumption_2.hide(),i.consumption_3.hide(),i.tab3_lbl.hide(),i.tab4_lbl.hide(),i.totalCost_lbl.hide(),u()}C=[];function A(e){switch(o.currTab=e.index,E(),e.index){case 0:i.MainHeading.setText(GlobalTextObj.statusHead_0),i.SubHeading.setText(GlobalTextObj.statusSubHead_0),i.volt_lbl.show(),i.curr_lbl.show(),i.name.show(),i.max_curr_lbl.show(),i.max_volt_lbl.show(),i.line.show(),""!=o.id&&H&&i[o.id].show(),o.objectSelect&&(i.wattage_0.show(),i.wattage_1.show(),i.wattage_2.show()),o.showlight&&i.light_lbl.show();break;case 1:i.MainHeading.setText(GlobalTextObj.statusHead_1),i.SubHeading.setText(GlobalTextObj.statusSubHead_1),i.volt_lbl.hide(),i.curr_lbl.hide(),i.max_curr_lbl.hide(),i.max_volt_lbl.hide(),i.name.hide(),i.slide_hr.show(),i.slide_mns.show(),i.txt_hrs.show(),i.txt_mns.show(),s&&i.hr_0.show(),txtHr&&i.hr_1.show(),slideM&&i.mn_0.show(),txtM&&i.mn_1.show(),i.name_1.show(),i.line.show(),o.objectSelect&&(i.wattage_tab_1.show(),i.txt_hrs.enable(),i.txt_mns.enable(),0!=o.kwh&&(i.usage_1.show(),i.usage_2.show(),i.consumption_1.show(),i.consumption_2.show(),i.consumption_3.show()));break;case 2:i.MainHeading.setText(GlobalTextObj.statusHead_2),i.SubHeading.setText(""),i.volt_lbl.hide(),i.curr_lbl.hide(),i.max_curr_lbl.hide(),i.max_volt_lbl.hide(),i.name.hide(),i.line.hide(),i.table.show(),i.export.show(),i.tab3_lbl.show();for(var t=0,a=0;a<o.tableArr.length;a++)a%2!=0&&(t=1*t+1*o.tableArr[a]);i.tab3_lbl.setText(GlobalTextObj.tab3_html+f(t,3)+" kWh"),i.table.clearData(),i.table.refreshTable(),i.table.addWholeData(C);break;case 3:i.MainHeading.setText(GlobalTextObj.statusHead_3),i.SubHeading.setText(""),i.volt_lbl.hide(),i.curr_lbl.hide(),i.max_curr_lbl.hide(),i.max_volt_lbl.hide(),i.name.hide(),i.slide_cost.show(),i.radio.show(),i.txt_cost.show(),slideC&&i.cost_lbl.show(),txtC&&i.cost_txt_lbl.show(),i.totalCost_lbl.show(),i.tab4_lbl.show(),i.line.show(),y()}e.originalEvent&&i.table.getScrollIndex()}function O(e){o.animFlag&&o.currRoom!=e.index&&(n.animation.stopAnimation(),n.animation.startAnimation("pseudo"==e.event)),o.animFlag=!0,i.bg.setSource(gizmoImageObj[e.index+".png"].src),n.lamp.hide(),n.blanket.hide(),n.computer.hide(),n.fan.hide(),n.fax.hide(),n.hair_dryer.hide(),n.light.hide(),i.wallstand.hide(),i.table1.hide(),i.Table1.hide(),i.chair.hide(),n.seilFan.hide(),n.Tlamp.hide(),n.TV.hide(),n.Lamp2.hide(),n.speaker.hide(),n.AC.hide(),n.fridge.hide(),n.Flight.hide(),n.Dishwasher.hide(),n.stove.hide(),n.oven.hide(),n.coffeeMaker.hide(),n.toaster.hide(),n.kettle.hide(),n.washer.hide(),n.dryer.hide(),n.heater.hide(),n.iron.hide(),o.currRoom=e.index,function(){switch(o.currRoom){case 0:l[0]&&n.lamp.show(),l[1]&&n.blanket.show(),l[2]&&n.computer.show(),l[3]&&n.fan.show(),l[4]&&n.fax.show(),l[5]&&n.hair_dryer.show(),l[6]&&n.light.show(),i.wallstand.show(),i.table1.show(),i.chair.show();break;case 1:l[7]&&n.seilFan.show(),l[8]&&n.Tlamp.show(),l[9]&&n.TV.show(),l[10]&&n.Lamp2.show(),l[11]&&n.AC.show(),l[12]&&n.speaker.show();break;case 2:l[13]&&n.fridge.show(),l[14]&&n.Flight.show(),l[15]&&n.Dishwasher.show(),l[16]&&n.stove.show(),l[17]&&n.oven.show(),l[18]&&n.coffeeMaker.show(),l[19]&&n.toaster.show(),l[20]&&n.kettle.show();break;case 3:l[21]&&n.washer.show(),l[22]&&n.dryer.show(),l[23]&&n.heater.show(),l[24]&&n.iron.show(),i.Table1.show()}}(),z(e)}var H=!0;function z(e){H=!1,e.originalEvent&&(i.slide_hr.disable(),i.slide_mns.disable(),i.txt_hrs.disable(),i.txt_mns.disable()),i.slide_hr.value(0),i.slide_mns.value(0),i.txt_hrs.setValue(0),i.txt_mns.setValue(0),i.name.setText(""),i.usage_1.setText(""),i.usage_2.setText(""),i.consumption_1.setText(""),i.consumption_2.setText(""),i.consumption_3.setText(""),i.name_1.setText(""),i.max_curr_lbl.setText("- -"),i.max_volt_lbl.setText("- -"),i.wattage_0.hide(),i.wattage_1.hide(),i.wattage_2.hide(),i.light_lbl.hide(),i.wattage_tab_1.hide(),o.showlight=!1,o.objectSelect=!1,o.name="",u()}function L(e){exportToApiObj.exportCSV(i.table.getTable())}var R=!(this.getter=function(){var e=new Object;for(var t in e.caption="GizmoObject",e.common=!1,e.componentname="HouseholdEnergyUsage",e.values={currentSelected:o.name,cost:o.cost},e.values.Data=[],o.valueHolder)e.values.Data.push({name:t,hour:o.valueHolder[t].hour,minute:o.valueHolder[t].minute,current:o.valueHolder[t].current,light:o.valueHolder[t].light,voltage:o.valueHolder[t].voltage});e.values.RoomObject=[];var a=0;for(var t in o.nameToId)e.values.RoomObject.push({name:t,enable:n[o.nameToId[t]].isEnable(),visible:l[a]}),a++;return e.values.totalEnergy=j,e.settable=!0,e.enabled=!0,e.visible=!0,e});this.setter=function(e){if(R=!0,e.values){d({}),z({}),o.valueHolder=[],o.name=e.values.currentSelected;var t=i.table.getGetterData().values.values;for(var a in e.values.Data)n[o.nameToId[e.values.Data[a].name]].triggerClick(),o.valueHolder[e.values.Data[a].name].hour=e.values.Data[a].hour,o.valueHolder[e.values.Data[a].name].minute=e.values.Data[a].minute;for(var a in t)T(),y();j=e.values.totalEnergy;var s=[];for(a=t.length-1;0<=a;a--)s.push(t[a][0]),s.push(1*t[a][1]);for(var a in o.tableArr=s,x(),""!=e.values.currentSelected&&n[o.nameToId[e.values.currentSelected]].triggerClick(!0),A({index:1*i.tab_1.activeTab(),event:"pseudo"}),i.table.clearData(),C=[],t)C.push([t[a][0],t[a][1]]),i.table.addWholeData(C);for(var a in i.slide_cost.value(e.values.cost),k({value:e.values.cost}),1*i.slide_hr.value()==24&&(i.slide_mns.value(0),i.slide_mns.disable(),i.txt_mns.setValue(0),i.txt_mns.disable()),e.values.RoomObject)n[o.nameToId[e.values.RoomObject[a].name]].hide(),e.values.RoomObject[a].enable?n[o.nameToId[e.values.RoomObject[a].name]].enable(!0):n[o.nameToId[e.values.RoomObject[a].name]].disable(!0),e.values.RoomObject[a].visible?(0<=a&&a<=6&&0==o.currRoom?n[o.nameToId[e.values.RoomObject[a].name]].show():7<=a&&a<=12&&1==o.currRoom?n[o.nameToId[e.values.RoomObject[a].name]].show():13<=a&&a<=20&&2==o.currRoom?n[o.nameToId[e.values.RoomObject[a].name]].show():21<=a&&a<=24&&3==o.currRoom&&n[o.nameToId[e.values.RoomObject[a].name]].show(),l[a]=!0):(n[o.nameToId[e.values.RoomObject[a].name]].hide(),l[a]=!1);j=e.values.totalEnergy,o.name=e.values.currentSelected}R=!1},this.getCaption=function(){return"GizmoObject"}};function initializeGizmo(t){var a=new HouseholdEnergyUsage,e=new preloadTextImages;e.init({imgTextFile:gConfig.paths.gImg+"img_444.txt"}),e.preloadComplete=function(e){gizmoImageObj=e,a.init(),gizmoInstance=a,getterSetter.initArr(),t&&t()}}var BackDivEvent=function(){var s={};function i(e){s.setOnDiv({value:"backDiv"})}this.init=function(e){for(var t in e)s[t]=e[t];s.x=globalResizeCalc(s.x),s.y=globalResizeCalc(s.y),s.width=globalResizeCalc(s.width),s.height=globalResizeCalc(s.height);var a=document.createElement("div");s.target?s.target.append(a):$("body").append(a),s.target=$(a),s.index&&s.target.css("z-index",s.index),s.target.css({position:"absolute",left:s.x+"px",top:s.y+"px",width:s.width+"px",height:s.height+"px"}),$(s.target).off("touchend").off("touchstart").on("touchend",i).on("touchstart",i)},this.addEventListener=function(e,t){s[e]=t}},RoomClass=function(){var s,d={id:"",x:0,y:0,width:192,height:46,border:!1,txtsrc:"",maxVolt:0,maxCurr:0,light:null,name:"",visibility:!0,usage:0,isClicked:!1,ctx:null},a=this,i=new Image;this.init=function(e){for(var t in e)d[t]=e[t];d.x=globalResizeCalc(d.x),d.y=globalResizeCalc(d.y),d.width=globalResizeCalc(d.width),d.height=globalResizeCalc(d.height);var a=document.createElement("div");a.setAttribute("id",d.id),a.setAttribute("maxVolt",d.maxVolt),a.setAttribute("maxCurr",d.maxCurr),d.target?d.target.append(a):$("body").append(a),d.target=$(a),0==d.visible&&d.target.css("display","none"),d.index&&d.target.css("z-index",d.index),d.target.css({position:"absolute",left:d.x+"px",top:d.y+"px",width:d.width+"px",height:d.height+"px","text-align":"center",cursor:"pointer",maxVolt:d.maxVolt,maxCurr:d.maxCurr}),d.title&&d.target.attr("p_title",d.title),s=document.createElement("canvas"),d.ctx=s.getContext("2d"),s.setAttribute("id",d.id),s.setAttribute("value",0),s.setAttribute("width",d.width),s.setAttribute("height",d.height),d.target.append(s),i.src=gizmoImageObj[d.txtsrc].src,d.ctx.drawImage(i,0,0,d.width,d.height),$(s).css({left:d.x+"px",top:d.y+"px","z-index":d.index}),d.title&&$(s).attr("p_title",d.title);globalResizeCalc(1)<1||globalResizeCalc(1);BrowserDetect.any()?d.target.off("touchstart").on("touchstart",o):d.target.off("mousedown").on("mousedown",o).off("click").off("mousemove").on("click",o).on("mouseover",o).on("mouseout",o).on("mousemove",o)},this.addEventListener=function(e,t){d[e]=t},this.setState=function(e,t){e?a.enable(t):a.disable(t)};var t=!0;this.enable=function(e){t=!0,BrowserDetect.any()?d.target.off("touchstart",o).off("touchend",o).on("touchstart",o).on("touchend",o):d.target.off("mousedown",o).off("click",o).off("mousemove",o).on("mousedown",o).on("click",o).on("mousemove",o),e&&d.target.css({opacity:1})},this.disable=function(e){t=!1,BrowserDetect.any()?d.target.off("touchstart",o).off("touchend",o):d.target.off("mousedown",o).off("click",o).off("mousemove",o),e&&d.target.css({opacity:.5})};var e=!0;function n(e){e.id=d.id,e.voltage=d.maxVolt,e.current=d.maxCurr,e.light=d.light,e.name=d.name,e.div=s,e.isClicked=!1,d.click&&d.click(e)}function o(e){globalResizeCalc(1)<1||globalResizeCalc(1);"mousedown"==e.type&&$(window).unbind("mouseup mouseleave",l).bind("mouseup mouseleave",l),!function(e){"touchstart"==e.type&&e.originalEvent&&(e.pageX=e.originalEvent.touches[0].pageX,e.pageY=e.originalEvent.touches[0].pageY);var t=$(e.currentTarget).offset().left,a=$(e.currentTarget).offset().top,s=e.pageX-t,i=e.pageY-a,n=d.ctx.getImageData(s,i,1,1).data;("000000"+(o=n[0],l=n[1],r=n[2],(o<<16|l<<8|r).toString(16))).slice(-6);var o,l,r;return 0!=n[3]}(e)?($(s).css({cursor:"default"}),"0"==$(s).attr("value")?i.src=gizmoImageObj[$(d.target).attr("id")+".png"].src:i.src=gizmoImageObj["on_"+$(d.target).attr("id")+".png"].src,s.width=s.width,d.ctx.drawImage(i,0,0,d.width,d.height)):("mousedown"==e.type||"touchstart"==e.type?(audioPlayerObj.playAudio("sound"),$(d.target),e.preventDefault()):l(e),$(s).css({cursor:"pointer"}),"click"!=e.type&&"touchstart"!=e.type||n({}),"mousemove"!=e.type&&"touchstart"!=e.type||("0"==$(s).attr("value")?i.src=gizmoImageObj["shade_"+$(d.target).attr("id")+".png"].src:i.src=gizmoImageObj["on_shade_"+$(d.target).attr("id")+".png"].src,s.width=s.width,d.ctx.drawImage(i,0,0,d.width,d.height),$(s).hasClass("clicked")||"touchstart"==e.type&&d.start({id:$(d.target).attr("id"),div:$(s),usage:d.usage,type:e.type}))),"mouseout"!=e.type&&"touchend"!=e.type||(d.isClicked||0!=d.usage?"touchend"!=e.type||"touchstart"!=e.type?i.src=gizmoImageObj["on_"+$(d.target).attr("id")+".png"].src:i.src=gizmoImageObj["on_shade_"+$(d.target).attr("id")+".png"].src:"touchstart"!=e.type?i.src=gizmoImageObj[$(d.target).attr("id")+".png"].src:i.src=gizmoImageObj["shade_"+$(d.target).attr("id")+".png"].src,s.width=s.width,d.ctx.drawImage(i,0,0,d.width,d.height))}function l(e){globalResizeCalc(1)<1||globalResizeCalc(1);$(window).unbind("mouseup mouseleave",l)}this.show=function(){e=!0,d.target.show()},this.hide=function(){e=!1,d.target.hide()},this.isEnable=function(){return t},this.isVisible=function(){return e},this.getInner=function(){return $(s)},this.switchOn=function(e,t,a){a?(i.src=gizmoImageObj["on_"+t+".png"].src,s.width=s.width,d.ctx.drawImage(i,0,0,d.width,d.height),$(e).attr("value",1),d.usage=1):(i.src=gizmoImageObj[t+".png"].src,s.width=s.width,d.ctx.drawImage(i,0,0,d.width,d.height),$(e).attr("value",0),d.usage=0)},this.resetImage=function(e){i.src=gizmoImageObj[e+".png"].src,s.width=s.width,d.ctx.drawImage(i,0,0,d.width,d.height)},this.triggerClick=function(e){n({_flag:e})},this.getName=function(){return d.name}},AnimationClass=function(){var s={x:0,y:0,width:100,height:100,index:0,rectX:0,canvas:"",ctx:""},e=this,t=!(this.init=function(e){for(var t in e)s[t]=e[t];s.x=globalResizeCalc(s.x),s.y=globalResizeCalc(s.y),s.width=globalResizeCalc(s.width),s.height=globalResizeCalc(s.height);var a=document.createElement("div");s.target?s.target.append(a):$("body").append(a),s.target=$(a),s.canvas=document.createElement("canvas"),s.ctx=s.canvas.getContext("2d"),s.canvas.setAttribute("width",s.width),s.canvas.setAttribute("height",s.height),$(s.canvas).addClass("canvas"+s.id),s.target.css({position:"absolute"}),s.target.append(s.canvas),$(s.canvas).css({"z-index":s.index}),$(s.canvas).css({position:"absolute",left:s.x+"px",top:s.y+"px"})});function a(){s.canvas.width=s.canvas.width,s.ctx.beginPath(),s.ctx.fillStyle="#FFFFFF",s.ctx.fillRect(s.rectX,0,s.width,s.height),s.ctx.fill(),s.ctx.closePath(),s.rectX+=15,s.rectX>=s.canvas.width&&e.stopAnimation()}this.startAnimation=function(e){if($(s.canvas).css({"z-index":20}),t=!1,e)for(;!t;)a();else globalAnimClassObject.start({id:"frame1",fps:1e3,frame:a})},this.stopAnimation=function(){t=!0,globalAnimClassObject.stop("frame1"),$(s.canvas).css({"z-index":-1}),s.rectX=0}};