var quantity = 1;
// var data = [
//   {

//   }
// ]

for (var imageIndex = 1; imageIndex <= quantity; imageIndex++) {
  var frontImageLayer = app.activeDocument.artLayers.getByName('imagem-1-plano');
  replaceSmartObjectImage(2, frontImageLayer);

  var backgroundImageLayer = app.activeDocument.artLayers.getByName('imagem-bg');
  replaceSmartObjectImage(2, backgroundImageLayer);

  var clickbaitTextLayer = app.activeDocument.artLayers.getByName('texto-clickbait');
  setNewText('O Cu do Matheus ta todo roxo?', clickbaitTextLayer)
};

function replaceSmartObjectImage(imageIndex, layer) {
  selectLayer(layer.name);

  var replacementFile = new File("C:/projetos/podcast-cuts-creator/sourceContent/renderedContent/processingVideo/assets/thumbImageSource-" + imageIndex + ".jpg");
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
