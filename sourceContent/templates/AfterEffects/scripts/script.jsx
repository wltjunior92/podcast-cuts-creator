#include json2.js

var defaultData = loadJson("defaultConfigurationContent");
var contentData = loadJson("content");

function loadJson(name) {
  var rootPath = app.project.file.parent.parent.parent.parent.path;
  var jsonFile = new File(rootPath + "/src/" + name + ".json");

  jsonFile.open();
  var str = jsonFile.read();
  jsonFile.close();

  return JSON.parse(str);
}

var selectedUsefulDurationData = {};
for (var selectedIndex = 0; selectedIndex < defaultData.length; selectedIndex++) {
  if (defaultData[selectedIndex].name === contentData.sourceChannel) {
    selectedUsefulDurationData = defaultData[selectedIndex];
    break;
  }
}

var mainComp = app.project.item(12);
var contentComp = app.project.item(9);
var introComp = app.project.item(11);
var endingComp = app.project.item(10);

// Content component config
var sourceVideo = contentComp.layer(2);
var logo = contentComp.layer(1);

var usefulDuration = contentData.originVideoDuration - selectedUsefulDurationData.introDuration - selectedUsefulDurationData.endingDuration;
if (contentData.logoSide === 'right') {
  logo.property('position').setValue([1915, 10, 0])
} else {
  logo.property('position').setValue([367, 10, 0])
}

contentComp.duration = usefulDuration;
sourceVideo.outPoint = usefulDuration;
logo.outPoint = usefulDuration;
sourceVideo.startTime = -selectedUsefulDurationData.introDuration;

// Main composition config
var contentCompDuration = contentComp.duration;
var introCompDuration = introComp.duration;
var endingCompDuration = endingComp.duration;

var mainCompDuration = contentCompDuration + introCompDuration + endingCompDuration;
mainComp.duration = mainCompDuration;

var introLayer = mainComp.layer(1);
var contentLayer = mainComp.layer(2);
var endingLayer = mainComp.layer(3);

contentLayer.outPoint = introCompDuration + contentCompDuration;

introLayer.startTime = 0;
contentLayer.startTime = introCompDuration;
endingLayer.startTime = introCompDuration + contentCompDuration;

// Clear opacity keyFrames
var keyFramesOpacityQuantity = contentLayer.property('opacity').numKeys;
var keyFramesLevelQuantity = contentLayer.property('audioLevels').numKeys;

for (var selectedKeyframe = 1; selectedKeyframe <= keyFramesOpacityQuantity; selectedKeyframe++) {
  contentLayer.property('opacity').removeKey(1);
}
for (var selectedKeyframe = 1; selectedKeyframe <= keyFramesLevelQuantity; selectedKeyframe++) {
  contentLayer.property('audioLevels').removeKey(1);
}

contentLayer.property('opacity').setValueAtTime((introCompDuration - 0.5), 0);
contentLayer.property('opacity').setValueAtTime((introCompDuration + 2.5), 100);

contentLayer.property('opacity').setValueAtTime((introCompDuration + contentCompDuration - 3), 100);
contentLayer.property('opacity').setValueAtTime((introCompDuration + contentCompDuration), 0);

contentLayer.property('audioLevels').setValueAtTime((introCompDuration - 0.5), [-30, -30]);
contentLayer.property('audioLevels').setValueAtTime((introCompDuration + 2.5), [0, 0]);

contentLayer.property('audioLevels').setValueAtTime((introCompDuration + contentCompDuration - 2), [0, 0]);
contentLayer.property('audioLevels').setValueAtTime((introCompDuration + contentCompDuration), [-30, -30]);

app.project.save();

$.sleep(3000)

// app.quit();