// gizmo-config.js
// Description: Require.js configuration file needed to load iframe-less Gizmos
// Author: Mitr, modified by Jordan Marshall
// Created: May 2016

// Config variables (gConfigBase) are set in the gizmo-loader.html

function loadCss(_path)
{
    var lnk = document.createElement("link");
    lnk.type = "text/css";
    lnk.rel = "stylesheet";
    lnk.setAttribute('href',_path),
    document.getElementsByTagName('head')[0].appendChild(lnk)
}

var gConfig = {
    elContainer : 'body',
    el: document.getElementById('body'),
    paths: {
        gRoot: gConfigBase + gID + '/',
        gImg: gConfigBase + gID + '/images/',
        gCss: gConfigBase + gID + '/css/activity.css',
        gAudio: gConfigBase + gID + '/audio/',
        comRoot: gConfigBase + 'com/',
        comImg: gConfigBase + 'com/images/',
        comCss: gConfigBase + 'com/css/custom/common.css',
        comAudio: gConfigBase + 'com/audio/',
        gJs: gConfigBase + gID + '/js/',
    }
}

var requireConfiguration = {
    baseUrl: gConfigBase,
    waitSeconds: 200,
    paths: {
        config: 'com/js/custom/config',
        mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
        html2canvas: 'com/js/custom/html2canvas',
        resizeinternal: 'com/js/custom/ResizeInternal',
        ResizeMitr: 'com/js/custom/ResizeMitr',
        globalfunctions: 'com/js/custom/GLOBALFUNCCLS',
        audioplayer: 'com/js/custom/AudioPlayer',
        commoncomponent: 'com/js/custom/CommonComponent',
        gettersetter: 'com/js/custom/getterSetter',
        polyanglesumcomp: 'com/js/lab/polyanglesumcomp',
        circlecomp : 'com/js/lab/circlecomp',
        quadrilateralComp : 'com/js/lab/quadrilateralComp',
        triangleComp : 'com/js/lab/triangleComp',
        piechartcomp : 'com/js/lab/piechartcomp',
        matrix : 'com/js/custom/Matrix',
        graphcomponent: 'com/js/custom/GraphComponent',
        scaleComponent: 'com/js/custom/scaleComponent',
        jsfl_parser: 'com/js/custom/jsfl_parser',
        tablecomp: 'com/js/custom/TableComp',
        mathformula: 'com/js/custom/MathFormula',
        customStopWatch: 'com/js/custom/customStopWatch',
        runner: 'com/js/custom/runner',
        maths: 'com/js/custom/Maths',
        physics: 'com/js/custom/Physics',
        tools: 'com/js/custom/tools',
        preloadtextimages: 'com/js/custom/preloadTextImages',
        jsxcompressor: 'com/js/custom/jsxcompressor.min',
        spine: 'com/js/custom/Spine',
        vein: 'com/js/custom/Vein',
        comlang: 'com/lang/en',
        gizmolang: gID + '/lang/en/text',
        data: gID + '/js/data',
        activity: gID + '/js/activity',
        tide: 'com/js/lab/tide',
        periodictable: 'com/js/lab/periodictable',
        jquery1:'com/js/jquery/jquery-1.10.2.min',
        jquery2:'com/js/jquery/jquery-ui-1.10.3.custom.min',
        jquery3:'com/js/jquery/jquery.ui.touch-punch.min',
        importjs:gID + '/js/import',
        katexJs : 'com/katex/katex.min',
        katexJsV5 : 'com/katex/katex.min.v5.0',
        moonCJS:"com/js/lab/moonCJS",
        create1:"com/js/createjs/easeljs-1.1.0.min",
        create2:"com/js/createjs/tweenjs-0.5.1.min",
        create3:"com/js/createjs/movieclip-0.7.1.min",
        create4:"com/js/createjs/preloadjs-0.4.1.min",
        create5:"com/js/createjs/createjs-2015.11.26.min",

        threeJS1:"com/js/3d/three.min",
        threeJS2:"com/js/3d/Projector",
        threeJS3:"com/js/3d/Detector",
        threeJS4:"com/js/3d/CanvasRenderer",
        threeJS5:"com/js/3d/typedarray",
        threeJS6:"com/js/3d/OrbitControls",
        threeJS7:"com/js/3d/CombinedCamera",
        threeJS8:"com/js/3d/Three",
        threeJS9:"com/js/3d/three.updated",

        perFracDecComp_231 : gID + '/js/perFracDecComp',
        JSFL_1005 : gID + '/js/JSFL',
        treeComponent_126 : gID + '/js/treeComponent',
        MeanMedianAct_262 : gID + '/js/MeanMedianAct',
        MeanMedianAct_302 : gID + '/js/MeanMedianAct',
        graphcontrol_390 : gID + '/js/graphcontrol',
        pendulum_390 : gID + '/js/pendulum',
        terrainGenerator_471 : gID + '/js/terrainGenerator',
        terrainGenerator_493 : gID + '/js/terrainGenerator',
        circuitCalc_509 : gID + '/js/circuitCalc',
        circuitCalc_638 : gID + '/js/circuitCalc',
        wheelComp_1015 : gID + '/js/wheelComp',
        Studentsrunning_JS_1015 : gID + '/js/Studentsrunning_JS',
        celebrate_1032 : gID + '/js/celebrate',
        Result_237 : gID + '/js/Result',
        MeanMedianAct_100 : gID + '/js/MeanMedianAct',
        unitConv_1051 : gID + '/js/unitConv',
        Main_ani_1060 : gID + '/js/Main_ani',
        Nose_1060 : gID + '/js/Nose',
        PhenolRedtest_1060 : gID + '/js/PhenolRedtest',
        ActDnDClass_599 : gID + '/js/ActDnDClass',
        mainLeftFile_627 : gID + '/js/mainLeftFile',
        mainRightFile_627 : gID + '/js/mainRightFile',
        oderingApproxSqrtComp_230 : gID + '/js/oderingApproxSqrtComp',
        bodmas_255 : gID + '/js/bodmas',
        Stoichiometry_515 : gID + '/js/Stoichiometry',
        calculation_606 : gID + '/js/calculation',
        canvasTile_606 : gID + '/js/canvasTile',
        TileComp_606 : gID + '/js/TileComp',
        audioPlayBtn_662 : gID + '/js/audioPlayBtn',
        electron_424 : gID + '/js/electron',
        neutron_424 : gID + '/js/neutron',
        orbitComp_424 : gID + '/js/orbitComp',
        proton_424 : gID + '/js/proton',
        Gear_1003 : gID + '/js/Gear',
        QuiltArray_1016 : gID + '/js/QuiltArray',
        ActDnDClass_109 : gID + '/js/ActDnDClass',
        ActDnDClass_226 : gID + '/js/ActDnDClass',
        treeComponent_307 : gID + '/js/treeComponent',
        solarSystem_441 : gID + '/js/solarSystem',
        orbitComp_513 : gID + '/js/orbitComp',
        position_513: gID + '/js/position',

        solarSystem_636 : gID + '/js/solarSystem',
        pollination_451 : gID + '/js/pollination',
        pollination2_451 : gID + '/js/pollination2',
        pollination_635 : gID + '/js/pollination',
        pollination2_635 : gID + '/js/pollination2',
        linePlot_236 : gID + '/js/linePlot',
        numberEventClass_236 : gID + '/js/numberEventClass',
        stemLeafPlot_236 : gID + '/js/stemLeafPlot',
        easeljs_1064 : gID + '/js/easeljs-0.8.1',
        movieclip_1064 : gID + '/js/movieclip-0.8.1',
        preloadjs_1064 : gID + '/js/preloadjs-0.6.1',
        tweenjs_1064 : gID + '/js/tweenjs-0.6.1',
        weathering_abrasion_1_1064 : gID + '/js/weathering_abrasion_1',
        weathering_clayFormation_1_1064 : gID + '/js/weathering_clayFormation_1',
        weathering_dissolving_1_1064 : gID + '/js/weathering_dissolving_1',
        weathering_frostWedging_1_1064 : gID + '/js/weathering_frostWedging_1',
        weathering_pressureRelease_1_1064 : gID + '/js/weathering_pressureRelease_1',
        weathering_rusting_1_1064 : gID + '/js/weathering_rusting_1',
        roadTrip : gID + "/js/roadtrip",
        dropArea_1048 : gID + "/js/dropAreaComp",
        dropper_1048 : gID + "/js/dropper",
        magnifier_1048 : gID + "/js/magnifier",
        measure_1048 : gID + "/js/measure",
        objectComp_1048 : gID + "/js/objectComp",
        tapWater_1048 : gID + "/js/tapWater",
        waterComp_1048 : gID + "/js/waterComp",
        SledClass : gID + "/js/SledClass",
        AudioPlayer2Class : gID + "/js/AudioPlayer2Class",

        analysisTable : gID + "/js/analysisTable",
        dropArea : gID + "/js/dropArea",
        food : gID + "/js/food",
        food_canvas : gID + "/js/food_canvas",
        foodTable : gID + "/js/foodTable",
        largeorgan : gID + "/js/largeorgan",
        largeOrganCanvas : gID + "/js/largeOrganCanvas",
        smallorgan : gID + "/js/smallorgan",
        smallOrganCanvas : gID + "/js/smallOrganCanvas",
        Capillaries : gID + "/createJS/Capillaries",
        ChiefCell : gID + "/createJS/ChiefCell",
        Esophagus : gID + "/createJS/Esophagus",
        GallBladder : gID + "/createJS/GallBladder",
        LargeIntestineNew_1 : gID + "/createJS/LargeIntestineNew_1",
        Lymph : gID + "/createJS/Lymph",
        Mouth : gID + "/createJS/Mouth",
        movieClipObjects : gID + "/createJS/movieClipObjects",
        Pancreas : gID + "/createJS/Pancreas",
        ParietalCell : gID + "/createJS/ParietalCell",
        RectumNew_1 : gID + "/createJS/RectumNew_1",
        Salivary : gID + "/createJS/Salivary",
        SmallIntestine : gID + "/createJS/SmallIntestine",
        SmallIntestineBNew_Part1 : gID + "/createJS/SmallIntestineBNew_Part1",
        SmallOrgans : gID + "/createJS/SmallOrgans",
        Stomach : gID + "/createJS/Stomach",
        timeline : gID + "/createJS/timeline",

        // AnimPlayer_1065 : gID + "/js/AnimPlayer",
        // easel_1065 : gID + "/js/easeljs-0.8.1",
        // Investigation_1065 : gID + "/js/Investigation",
        // jrumble_1065 : gID + "/js/jquery.jrumble.1.3.modified",
        // mclip_1065 : gID + "/js/movieclip-0.8.1",
        // preload_1065 : gID + "/js/preloadjs-0.6.1",
        // Reaction_1065 : gID + "/js/Reaction",
        // Tween_1065 : gID + "/js/tweenjs-0.6.1",

        createjs_1066 : gID + "/js/createjs-2015.11.26.min",
        protists_40x_smaller_1066 : gID + "/js/protists_40x_smaller",
        stackblur_1066 : gID + "/js/stackblur",
        createjs_1069: gID + "/js/createjs-2015.11.26.min",
        CreatCnvs_1069 : gID + "/js/CreatCnvs",
        ear_trancjs_1069: gID + "/js/ear_trancjs",
        eye_trancjs_1069: gID + "/js/eye_trancjs",
        lines_1069: gID + "/js/lines",
        nose_trancjs_1069: gID + "/js/nose_trancjs",
        skin_trancjs_1069: gID + "/js/skin_trancjs",
        tab1boxAnim_1069: gID + "/js/tab1boxAnim",
        tab1pathwayAnim_1069: gID + "/js/tab1pathwayAnim",
        tab2cjs_1069: gID + "/js/tab2cjs",
        tongue_trancjs_1069: gID + "/js/tongue_trancjs",
        neuclearReaction_1068: gID + "/js/neuclearReactions",

        // createjs_1074: gID + "/js/createjs-2015.11.26.min",
        // custom_slider_1074: gID + "/js/custom_slider",
        // fileLoader_1074: gID + "/js/fileLoader",
        // investigation_1074: gID + "/js/investigation",
        // Layer_1_1074: gID + "/js/Layer 1",
        // manifest_1074: gID + "/js/manifest",
        // player_1074: gID + "/js/player",

        geneticEngineering_1_1072: gID + "/js/geneticEngineering_1",
        Mclips_1072: gID + "/js/Mclips",

        three_updated : "com/js/3d/three.updated",
        Detector:"com/js/3d/Detector",
        CanvasRenderer:"com/js/3d/CanvasRenderer",
        Projector:"com/js/3d/Projector",
        createjs_2015_11_26_min: gID + "/js/createjs-2015.11.26.min",
        CustomPreloader: gID + "/js/CustomPreloader",
        CreatCnvs: gID + "/js/CreatCnvs",
        CityData: gID + "/js/CityData",
        OrbitControls: gID + "/js/OrbitControls",
        mclips_1073: gID + "/js/Mclips",
        
        createjs_1022: gID + "/js/createjs-2015.11.26.min",
        flightAnimation_1002: gID + "/js/flightAnimation",
        remainderAnimation_1002: gID + "/js/remainderAnimation",
        starA_1057 : gID+'/js/createJs/StarA091',
        starA2_1057 : gID+'/js/createJs/StarA171',          
        starB_1057 : gID+'/js/createJs/StarB618',           
        starC_1057 : gID+'/js/createJs/StarC197',           
        starD_1057 : gID+'/js/createJs/StarD819',           
        starE_1057 : gID+'/js/createJs/StarE429',           
        starF_1057 : gID+'/js/createJs/StarF520',           
        starG_1057 : gID+'/js/createJs/StarG958',           
        starH_1057 : gID+'/js/createJs/StarH716',           
        starI_1057 : gID+'/js/createJs/StarI450',
        
        introAnim_1021: gID+'/js/introAnim',

        bg_Clips_1075 :gID+'/js/bg_Clips',
        Mc_Clips_1075 :gID+'/js/Mc_Clips',
        
        // tween_1070:gID + "/js/TweenMax.min",
        // createjs_1070:gID + "/js/createjs-2015.11.26.min",
        // activityFile_1_1070:gID + "/js/female_meiosis_anaphaseIIAlt_1",
        // activityFile_2_1070:gID + "/js/female_meiosis_anaphaseIIAlt_1_swap",
        // activityFile_3_1070:gID + "/js/female_meiosis_cytokinesisIIAlt",
        // activityFile_4_1070:gID + "/js/female_meiosis_cytokinesisIIAlt_swap",
        // activityFile_5_1070:gID + "/js/female_meiosis_metaphaseAlt_1",
        // activityFile_6_1070:gID + "/js/meiosis_metaphaseAlt_1",
        // activityFile_7_1070:gID + "/js/meiosis_anaphaseIIAlt_1",
        // activityFile_8_1070:gID + "/js/meiosis_anaphaseIIAlt_1_swap",
        // activityFile_9_1070:gID + "/js/meiosis_cytokinesisIIAlt",
        // activityFile_10_1070:gID + "/js/meiosis_cytokinesisIIAlt_swap",
        // activityFile_11_1070:gID + "/js/meiosis_intAltTest_1",
        // activityFile_12_1070:gID + "/js/meiosis_meiosis_lower",
        // activityFile_13_1070:gID + "/js/meiosis_meiosis_lower_female",
        // activityFile_14_1070:gID + "/js/meiosis_meiosis_main",
        // activityFile_15_1070:gID + "/js/meiosis_meiosis_main_female",
        // activityFile_16_1070:gID + "/js/meiosis_meiosis_lower_swap",
        // activityFile_17_1070:gID + "/js/meiosis_meiosis_lower_female_swap",
        // activityFile_18_1070:gID + "/js/meiosis_meiosis_main_swap",
        // activityFile_19_1070:gID + "/js/meiosis_meiosis_main_female_swap",
        // activityFile_20_1070:gID + "/js/extras",
        // activityFile_21_1070:gID + "/js/stage_diagram",
        // activityFile_22_1070:gID + "/js/Tab2",
        // activityFile_23_1070:gID + "/js/Tab1",
        // activityFile_24_1070:gID + "/js/manifest",

        light_1201: gID + "/js/lights",
        water_1201: gID + "/js/water",
        manifest_1201: gID + "/js/manifest",
        ducks_1201: gID + "/js/Ducks",
        duckReveal_1201: gID + "/js/DuckReveal_Animation",
        hangingPrize_1201: gID + "/js/hangingPrize",

        easel_1076: gID + "/js/easeljs_min",
        tween_1076: gID + "/js/tweenjs_min",
        cladogramsTest_1076: gID + "/js/cladogramsTest",

        orbitComp_1077: gID + "/js/orbitComp",
        periodictable_1077: gID + "/js/periodictable",
        tools_1077: gID + "/js/tools",
        exploreTab_1077: gID + "/js/exploreTab",
        trendsTab_1077: gID + "/js/trendsTab",
        electron_1077: gID + "/js/electron",

        TweenMax_min_1079: gID + "/js/TweenMax.min",
        beeHiveColony_1_1079: gID + "/js/beeHiveColony_1",
        beeHiveColony_2_1079: gID + "/js/beeHiveColony_2",
        beesAnim_1079: gID + "/js/beesAnim",
        flowers_1079: gID + "/js/flowers",
        path_robot_Bee_1079: gID + "/js/path_robot_Bee",
        path_worker_Forager_Bee_1079: gID + "/js/path_worker_Forager_Bee",
        path_other_worker_Bee_1079: gID + "/js/path_other_worker_Bee",
        path_designMode_1079: gID + "/js/path_designMode",
        positions_1079: gID + "/js/positions",
        hive_1079: gID + "/js/hive",
        outside_1079: gID + "/js/outside",

        states_1081: gID + "/js/states",
        orbitcomp_1081: gID + "/js/orbitComp",

        storedData_1083: gID + "/js/storedData",
        feelTheHeatTest_1083: gID + "/js/feelTheHeatTest",
        mathModel_1083: gID + '/js/mathModel',
        inset_1083: gID+'/js/inset',
        otherClass_1083: gID + '/js/otherClass',

        fastPlantsTest1_1085: gID + '/js/fastPlantsTest1',
        flower_1085: gID + '/js/flower',
        otherClass_1085: gID + '/js/otherClass',
        storedData_1085: gID + '/js/storedData',

        states_1088: gID + "/js/states",
        isotope_test_1088: gID + "/js/isotope_test",
        motion_1088: gID + "/js/Motion",
        animation_1088: gID + "/js/Animation",
        otherClasses_1088: gID + "/js/otherClasses",

        easel_1078: gID + "/js/easeljs_min",

        carClip_1078: gID + "/js/carClip",
        debrisClip_1078: gID + "/js/debris",

        easel_1084: gID + "/js/easeljs_min",
		
        addMole_1084: gID + "/js/addMole",
        addMole_0_1084: gID + "/js/addMole_0",				
        addMole_1_1084: gID + "/js/addMole_1",				
        addMole_2_1084: gID + "/js/addMole_2",				
        addMole_3_1084: gID + "/js/addMole_3",				
        addMole_4_1084: gID + "/js/addMole_4",				
        addMole_5_1084: gID + "/js/addMole_5",				
        addMole_6_1084: gID + "/js/addMole_6",				
        addMole_7_1084: gID + "/js/addMole_7",
        Tab_1_1084: gID + "/js/Tab_1",
        Tab_1_0_1084: gID + "/js/Tab_1_0",
        Tab_1_1_1084: gID + "/js/Tab_1_1",
        Tab_1_2_1084: gID + "/js/Tab_1_2",
        Tab_1_3_1084: gID + "/js/Tab_1_3",
        Tab_1_4_1084: gID + "/js/Tab_1_4",
        Tab_1_5_1084: gID + "/js/Tab_1_5",
        Tab_1_6_1084: gID + "/js/Tab_1_6",
        Tab_1_7_1084: gID + "/js/Tab_1_7",
        stringMath: gID + '/js/stringMath',
		
		    playcanvas: "com/js/playcanvas/playcanvas-stable.min",
        playCanvasComp: "com/js/playcanvas/playCanvasComponent",
        
        robotArmTest_1202: gID + "/js/robotArmTest",
        challenge_1202: gID + "/js/challenge",
        conveyorBelt_1202: gID + "/js/conveyorBelt",
        conveyorBeltF_1202: gID + "/js/conveyorBeltF",
        measure_1202: gID + "/js/measure",

        TweenMax_min_1202: gID + "/js/TweenMax.min",
        bg_Clips_1090: gID + '/js/bg_Clips',
        easeljs_min_1090: gID + '/js/easeljs_min',
        burner_1090: gID + '/js/burner',
        dropperAnimation_1093: gID + "/js/dropper_animation",
        molecularInsets_1093: gID + "/js/molecular_insets",
        easel_1093: gID + '/js/easeljs_min',
        animClass_1090: gID + '/js/animClass',
        calcClass_1090: gID + '/js/calcClass',
        anatomyStage_1089:gID + '/js/anatomyStage',
        designStage_1089:gID + '/js/designStage', 
        anatomyLib_1089:gID + '/js/anatomyLib', 
        designLib_1089:gID + '/js/designLib', 
        designTest:gID + '/js/design&Test',
        humerus:gID + '/js/humerus',
        assets:gID + '/js/assets',
        humerus_model:gID + '/js/humerus_model',
        DNA_1092:gID + '/js/DNA',
        PCR_1092:gID + '/js/pcr',
        GELELECTRO_1092 : gID + "/js/gelElectro",
        testerStep_1092 : gID + "/js/testerStep",
        testerAnim_1092 : gID + "/js/testerAnim",
        solveCaseStep_1092 : gID + "/js/solveCaseStep",
        designStep_1092 : gID + "/js/designStep",
        foreStep_1092 : gID + "/js/foreStep",
        case_detail_1092 : gID + "/js/case_detail",
        Mclips_1095: gID + '/js/Mclips',
    },
    shim:{
        // tween_1070:{
        //   deps: ['create3','create4'],
        // },
        // activityFile_1_1070:{
        //     deps:["tween_1070"]
        // },
        // activityFile_2_1070:{
        //     deps:["activityFile_1_1070"]
        // },
        // activityFile_3_1070:{
        //     deps:["activityFile_2_1070"]
        // },
        // activityFile_4_1070:{
        //     deps:["activityFile_3_1070"]
        // },
        // activityFile_5_1070:{
        //     deps:["activityFile_4_1070"]
        // },
        // activityFile_6_1070:{
        //     deps:["activityFile_5_1070"]
        // },
        // activityFile_7_1070:{
        //     deps:["activityFile_6_1070"]
        // },
        // activityFile_8_1070:{
        //     deps:["activityFile_7_1070"]
        // },
        // activityFile_9_1070:{
        //     deps:["activityFile_8_1070"]
        // },
        // activityFile_10_1070:{
        //     deps:["activityFile_9_1070"]
        // },
        // activityFile_11_1070:{
        //     deps:["activityFile_10_1070"]
        // },
        // activityFile_12_1070:{
        //     deps:["activityFile_11_1070"]
        // },
        // activityFile_13_1070:{
        //     deps:["activityFile_12_1070"]
        // },
        // activityFile_14_1070:{
        //     deps:["activityFile_13_1070"]
        // },
        // activityFile_15_1070:{
        //     deps:["activityFile_14_1070"]
        // },
        // activityFile_16_1070:{
        //     deps:["activityFile_15_1070"]
        // },
        // activityFile_17_1070:{
        //     deps:["activityFile_16_1070"]
        // },
        // activityFile_18_1070:{
        //     deps:["activityFile_17_1070"]
        // },
        // activityFile_19_1070:{
        //     deps:["activityFile_18_1070"]
        // },
        // activityFile_20_1070:{
        //     deps:["activityFile_19_1070"]
        // },
        // activityFile_21_1070:{
        //     deps:["activityFile_20_1070"]
        // },
        // activityFile_22_1070:{
        //     deps:["activityFile_21_1070"]
        // },
        // activityFile_23_1070:{
        //     deps:["activityFile_22_1070"]
        // },
        // activityFile_24_1070:{
        //     deps:["activityFile_23_1070"]
        // },
		OrbitControls : {
			deps : ["threeJS1","three_updated"],
		},
		CanvasRenderer : {
			deps : ["threeJS1","three_updated"],
		},
		Projector : {
			deps : ["threeJS1","three_updated"],
		},	    
        AudioPlayer2Class : {
            deps : ["globalfunctions"]
        },
        preloadjs_1064 : {
            deps : ["movieclip_1064"]
        },
        movieclip_1064 : {
            deps : ["tweenjs_1064"]
        },
        tweenjs_1064 : {
            deps : ["easeljs_1064"]
        }, 
        jquery3: {
            deps: ['jquery2'],
            init:function(){
                // loadCss(gConfigBase + 'com/css/jquery/jquery-ui-1.10.4.custom.min.css');
            }
        },
        threeJS2: {
            deps: ['threeJS1']
        },
        threeJS3: {
            deps: ['threeJS1']
        },
        threeJS4: {
            deps: ['threeJS1']
        },
        threeJS5: {
            deps: ['threeJS1']
        }, 
        threeJS6: {
            deps: ['threeJS1']
        }, 
        threeJS7: {
            deps: ['threeJS1']
        }, 
        threeJS8: {
          deps: ['threeJS1',],
        },
        jquery2: {
            deps: ['jquery1']
        },  
        resizeinternal: {
             deps: ['jquery2']
        },
        ResizeMitr: {
             deps: ['resizeinternal']
        },
        globalfunctions: {
            deps: ['jquery3', 'html2canvas', 'resizeinternal' ,'comlang', 'gizmolang','threeJS1']
        }, 
        commoncomponent: {
            deps: ['globalfunctions'],
            init:function(){
                loadCss(gConfigBase + 'com/css/custom/common.css');
            }
        },
        polyanglesumcomp: {
            deps: ['globalfunctions']
        },
        circlecomp: {
            deps: ['globalfunctions']
        },
        quadrilateralComp: {
            deps: ['globalfunctions']
        },
        moonCJS:{
            deps:["create4","create3"],
            init:function(){
                // if(typeof onMoonCJS !== 'undefined') onMoonCJS();
            }
        },
        create3:{
            deps:["create2","create1"],
            init: function(){
                // if(typeof onCreateJS !== 'undefined') onCreateJS();
            }
        },
        katexJs: {
            init:function(){
                loadCss(gConfigBase + 'com/katex/katex.min-2015-05-18d.css')
            }
        },
        katexJsV5: {
            init:function(){
                loadCss(gConfigBase + 'com/katex/katex.min.v5.0.css')
            }
        },
        triangleComp: {
            deps: ['globalfunctions']
        },
        piechartcomp: {
            deps: ['globalfunctions']
        },
        tablecomp: {
            deps: ['globalfunctions']
        },
        audioplayer: {
            deps: ['globalfunctions']
        },
        graphcomponent: {
            deps: ['globalfunctions']
        },
        data: {
            deps: ['globalfunctions','commoncomponent','preloadtextimages','jsxcompressor','audioplayer']
        },
        spine: {
            deps: loadArray
        },
        vein: {
            deps: ['data']
        },
        activity: {
            deps: ['spine', 'vein'],
            init:function(){
                loadCss(gConfigBase + gID + '/css/activity.css');
            }
        }
    }
}

// Needed for Gizmo 471 (and maybe more)
var gizmoImageObj;

function addGizmoDependencies(){
  /**
   * gizmoDependencies are specified in import.js, which is unique to each Gizmo.
   * Some Gizmos don't have this object (as it is relatively new)
   */
  if(typeof gizmoDependencies != 'undefined'){

    // Path
    if(typeof gizmoDependencies.paths != 'undefined' && gizmoDependencies.paths.length > 0){
      for(var i = 0; i<gizmoDependencies.paths.length; i++){
        var newPath = gizmoDependencies.paths[i];
        requireConfiguration.paths[newPath.name] = gID + newPath.path;
      }
    }

    // Shim
    if(typeof gizmoDependencies.dependencies != 'undefined' && gizmoDependencies.dependencies.length > 0){
      for(var i = 0; i < gizmoDependencies.dependencies.length; i++){
        var newDep = gizmoDependencies.dependencies[i];

        requireConfiguration.shim[newDep.name] = {
          deps: newDep.deps
        }
      }
    }
  }
}

addGizmoDependencies();

/**
 * Initialize require.js after we have had a chance to add Gizmo dependencies.
 */
require.config(requireConfiguration);

require(['activity'], function(activity){

    var resize = function()
    {
        getterSetter.isFromInit = true;
        initGizmoValue = getterSetter.get();
        getterSetter.isFromInit = false;
    }

    initializeGizmo(resize);

});


