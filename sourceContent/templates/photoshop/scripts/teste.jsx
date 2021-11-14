#include json2.js

var obj = loadJson();
alert(obj.originVideoDuration);

function loadJson() {
  var rootPath = app.activeDocument.path.parent.parent.parent;
  var jsonFile = new File(rootPath + "/src/content.json");

  jsonFile.open();
  var str = jsonFile.read();
  jsonFile.close();

  return JSON.parse(str);
}