' Create WScript Shell Object to access filesystem.
Set WshShell = WScript.CreateObject("WScript.Shell")

' Start / Run NOTEPAD.EXE
WshShell.Run "C:\projetos\podcast-cuts-creator\sourceContent\templates\photoshop\logo.psd"

WScript.Sleep 3000

' Select, or bring Focus to a window named `NOTEPAD`
WshShell.AppActivate "Adobe Photoshop 2022"

' Wait for 5 seconds
WScript.Sleep 5000

WshShell.SendKeys "{ENTER}"
WScript.Sleep 500
WshShell.SendKeys "%"
WScript.Sleep 500
WshShell.SendKeys "a"
WScript.Sleep 500
WshShell.SendKeys "p"
WScript.Sleep 500
WshShell.SendKeys "p"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 100
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{DOWN}"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000
WshShell.SendKeys "{TAB}"
WshShell.SendKeys "{TAB}"
WshShell.SendKeys "{TAB}"
WshShell.SendKeys "{TAB}"
WshShell.SendKeys "{TAB}"
WshShell.SendKeys "{ENTER}"
WshShell.SendKeys "+{C}"
WshShell.SendKeys "+{;}"
WshShell.SendKeys "{\}"
WshShell.SendKeys "{p}"
WshShell.SendKeys "{r}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{j}"
WshShell.SendKeys "{e}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{s}"
WshShell.SendKeys "{\}"
WshShell.SendKeys "{p}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{d}"
WshShell.SendKeys "{c}"
WshShell.SendKeys "{a}"
WshShell.SendKeys "{s}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{-}"
WshShell.SendKeys "{c}"
WshShell.SendKeys "{u}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{s}"
WshShell.SendKeys "{-}"
WshShell.SendKeys "{c}"
WshShell.SendKeys "{r}"
WshShell.SendKeys "{e}"
WshShell.SendKeys "{a}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{r}"
WshShell.SendKeys "{\}"
WshShell.SendKeys "{s}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{u}"
WshShell.SendKeys "{r}"
WshShell.SendKeys "{c}"
WshShell.SendKeys "{e}"
WshShell.SendKeys "+{c}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{n}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{e}"
WshShell.SendKeys "{n}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{\}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{e}"
WshShell.SendKeys "{m}"
WshShell.SendKeys "{p}"
WshShell.SendKeys "{l}"
WshShell.SendKeys "{a}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{e}"
WshShell.SendKeys "{s}"
WshShell.SendKeys "{\}"
WshShell.SendKeys "{p}"
WshShell.SendKeys "{h}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{s}"
WshShell.SendKeys "{h}"
WshShell.SendKeys "{o}"
WshShell.SendKeys "{p}"
WshShell.SendKeys "{\}"
WshShell.SendKeys "{s}"
WshShell.SendKeys "{c}"
WshShell.SendKeys "{r}"
WshShell.SendKeys "{i}"
WshShell.SendKeys "{p}"
WshShell.SendKeys "{t}"
WshShell.SendKeys "{s}"
WScript.Sleep 100
WshShell.SendKeys "{ENTER}"
WScript.Sleep 500
WshShell.SendKeys "{TAB}"
WScript.Sleep 500
WshShell.SendKeys "{TAB}"
WScript.Sleep 500
WshShell.SendKeys "{TAB}"
WScript.Sleep 500
WshShell.SendKeys "{TAB}"
WScript.Sleep 500
WshShell.SendKeys "{DOWN}"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
