Set WshShell = WScript.CreateObject("WScript.Shell")

Function ShowAbsolutePath(path)
   Dim fso
   Set fso = CreateObject("Scripting.FileSystemObject")
   ShowAbsolutePath = fso.GetAbsolutePathName(path)
End Function

folderPath = ShowAbsolutePath(".")

WshShell.Run folderPath & "\sourceContent\templates\photoshop\thumbnail-template.psd", 3

WScript.Sleep 3000

WshShell.AppActivate "Adobe Photoshop 2022"

' ' WScript.Sleep 5000
' WScript.Sleep 20000

' ' WScript.Sleep 500
' WScript.Sleep 5000
' WshShell.SendKeys "%"
' WScript.Sleep 500
' WshShell.SendKeys "a"
' WScript.Sleep 500
' WshShell.SendKeys "p"
' WScript.Sleep 500
' WshShell.SendKeys "p"
' WScript.Sleep 500
' WshShell.SendKeys "{ENTER}"
' WScript.Sleep 100
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{DOWN}"
' WshShell.SendKeys "{ENTER}"
' WScript.Sleep 1000

' scriptPath = ShowAbsolutePath(".") & "\sourceContent\templates\photoshop\scripts\scriptThumb.jsx"
' For i = 1 To Len(scriptPath)
'   WshShell.SendKeys "{" & Mid(scriptPath, i, 1) & "}"
' Next

' WScript.Sleep 100
' WshShell.SendKeys "{ENTER}"

WScript.Quit