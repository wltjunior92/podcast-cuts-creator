' Set WshShell = WScript.CreateObject("WScript.Shell")

scriptPath = ShowAbsolutePath(".") & "\sourceContent\templates\photoshop\scripts\scriptThumb.jsx"
' stringArray = SplitStringPath(folderPath)
' WScript.Echo stringArray

my_string = ":teste\"

For i = 1 To Len(my_string)
     MsgBox "Caratere nº " & i & ": " & Mid(my_string, i, 1)
Next


Function ShowAbsolutePath(path)
  Dim fso
  Set fso = CreateObject("Scripting.FileSystemObject")
  ShowAbsolutePath = fso.GetAbsolutePathName(path)
End Function