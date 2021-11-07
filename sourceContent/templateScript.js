var contentData = eval('($toSwap$)');
var usefulContentDurationData = [
  {
    name: 'Cortes do flow',
    introDuration: 0,
    endingDuration: 30,
  },
  {
    name: 'Cortes do venus',
    introDuration: 0,
    endingDuration: 28,
  },
  {
    name: 'Cortes do inteligencia',
    introDuration: 5,
    endingDuration: 18,
  },
];

var selectedUsefulDurationData = {};
for (var selectedIndex = 0; selectedIndex < usefulContentDurationData.length; selectedIndex++) {
  if (usefulContentDurationData[selectedIndex].name === source) {
    selectedUsefulDurationData = usefulContentDurationData[selectedIndex];
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

var usefulDuration = totalDuration - selectedUsefulDurationData.introDuration - selectedUsefulDurationData.endingDuration;
if (logoSide === 'right') {
  logo.property('position').setValue([1724, 132, 0])
} else {
  logo.property('position').setValue([188, 132, 0])
}

contentComp.duration = usefulDuration;
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

// alert(contentLayer.property('audioLevels').propertyValueType);

app.project.save();