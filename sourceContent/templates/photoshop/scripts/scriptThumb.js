var quantity = 1;

for (var imageIndex = 1; imageIndex >= quantity; imageIndex++) {
  var frontImageLayer = app.activeDocument.artLayers.getByName('imagem-1-plano');

  selectLayer(frontImageLayer.name);
  app.runMenuItem(stringIDToTypeID('placedLayerEditContents'));


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
