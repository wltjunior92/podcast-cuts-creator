#include json2.js

var quantity = 2;
// var data = [
//   {

//   }
// ]

for (var imageIndex = 1; imageIndex <= quantity; imageIndex++) {
  var frontImageLayer = app.activeDocument.artLayers.getByName('imagem-1-plano');
  replaceSmartObjectImage(imageIndex, frontImageLayer);

  var backgroundImageLayer = app.activeDocument.artLayers.getByName('imagem-bg');
  replaceSmartObjectImage(imageIndex, backgroundImageLayer);

  var clickbaitTextLayer = app.activeDocument.artLayers.getByName('texto-clickbait');
  setNewText('Pq eu não cocei o braço antes?!', clickbaitTextLayer)

  var borderLayer = app.activeDocument.artLayers.getByName('borda');
  changePathColor('c7851c', borderLayer)

  var insideImageBorderLayer = app.activeDocument.artLayers.getByName('borda-lateral-imagem');
  changePathColor('c7851c', insideImageBorderLayer)

  saveJpeg('thumb-' + imageIndex);


};

app.activeDocument.save()
$.sleep(2000)
// var idquit = charIDToTypeID("quit");
// executeAction(idquit, undefined, DialogModes.ALL);

function replaceSmartObjectImage(imageIndex, layer) {
  selectLayer(layer.name);

  var replacementFile = new File("C:/DevProjects/podcast-cuts-creator/sourceContent/renderedContent/processingVideo/assets/thumbImageSource-" + imageIndex + ".jpg");
  frontImageLayer = replaceContents(replacementFile);

  function replaceContents(newFile) {
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(newFile));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return app.activeDocument.activeLayer
  };
}

function setNewText(text, layer) {
  selectLayer(layer.name);

  layer.textItem.contents = text
};

function changePathColor(color, layer) {
  selectLayer(layer.name);

  var newColor = new SolidColor();
  newColor.rgb.hexValue = color;

  setColorOfFillLayer(newColor)

  function setColorOfFillLayer(color) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(stringIDToTypeID('contentLayer'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc.putReference(charIDToTypeID('null'), ref);
    var fillDesc = new ActionDescriptor();
    var colorDesc = new ActionDescriptor();
    colorDesc.putDouble(charIDToTypeID('Rd  '), color.rgb.red);
    colorDesc.putDouble(charIDToTypeID('Grn '), color.rgb.green);
    colorDesc.putDouble(charIDToTypeID('Bl  '), color.rgb.blue);
    fillDesc.putObject(charIDToTypeID('Clr '), charIDToTypeID('RGBC'), colorDesc);
    desc.putObject(charIDToTypeID('T   '), stringIDToTypeID('solidColorLayer'), fillDesc);
    executeAction(charIDToTypeID('setd'), desc, DialogModes.NO);
  }
}

function selectLayer(id, add, viz) {
  try {
    var d = new ActionDescriptor();

    if (viz == undefined) viz = false;

    var r = new ActionReference();

    if (typeof (id) == "string") r.putName(charIDToTypeID("Lyr "), id);
    else r.putIdentifier(charIDToTypeID("Lyr "), id);

    d.putReference(charIDToTypeID("null"), r);

    d.putBoolean(charIDToTypeID("MkVs"), viz);

    if (add == true) d.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
    if (add == -1) d.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("removeFromSelection"));

    var ok = true;

    try { executeAction(charIDToTypeID("slct"), d, DialogModes.NO); } catch (e) { ok = false; }

    d = null;

    return ok;
  }
  catch (e) { alert(e); return false; }
};

function saveJpeg(name) {
  var document = app.activeDocument;
  var file = new File(document.path.parent.parent + '/renderedContent/processingVideo/render/' + name + '.jpg');

  var opts = new JPEGSaveOptions();
  opts.quality = 10;

  document.saveAs(file, opts, true);

  $.sleep(2000);
}
