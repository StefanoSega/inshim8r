### Import
Shim and import a JS file
##### Parameters
- **path:** Relative path of the file to require
- **prependedCode:** Code to be attached at the beginning of the required file. Can be in the form of a string (e.g.: "var global_var = 'a';") or of a function (e.g.: function() { var global_var = 'a'; } )
- **appendedCode:** Code to be attached at the end of the required file. Can be in the form of a string (e.g.: "var global_var = 'a';") or of a function (e.g.: function() { var global_var = 'a'; } )
- **methodsContainerName:** String containing the name of the object to whom the global functions of the file will be attached as properties with the same name (e.g.: specifying "window" as the methodsContainerName and having in the file a global function "GlobalFun" this last will be accessible with the property "window.GlobalFun")