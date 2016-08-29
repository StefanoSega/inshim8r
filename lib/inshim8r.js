(function (inshim8rGlobal) {
    "use strict";

    var getFileContent = function(filePath) {
        var Fs = require("fs");

        return Fs.readFileSync(filePath + "", "utf-8");
    }

    var exposePublicMethods = function (fileContent, methodsContainerName) {
        var resultText = "";

        if (!methodsContainerName) {
            return "";
        }

        var fileContentRows = fileContent.split('\n');
        for (var idxRow = 0; idxRow < fileContentRows.length; idxRow++) {
            var fileContentRow = fileContentRows[idxRow].trim();
            
            if (fileContentRow.length > "function N".length &&
                fileContentRow.toLowerCase().substring(0, "function ".length) === "function " &&
                fileContentRow.toLowerCase().substring(0, "function N".length) !== "function (") {
                var functionName = fileContentRow.substring("function ".length).trim();
                if (functionName.substring(0, 1) !== "(") {
                    if (functionName.indexOf("(") >= 0) {
                        functionName = functionName.substring(0, functionName.indexOf("("));
                    }

                    functionName = functionName.trim();

                    resultText += functionName + ": " + functionName + ",";
                }
            }
        }

        if (resultText !== "") {
            resultText = resultText.substring(0, resultText.length - 1);

            resultText = methodsContainerName + " = {" + resultText + "}";
        }

        return resultText;
    };

    function makeApi(inshim8r) {
        // Allow to import a non-shimmed non-module js file
        // OPTIONS:
        // - path: Path of the file js to import
        // - prependedCode: additional code to prepend to the content of the imported js file
        // - appendedCode: additional code to append to the content of the imported js file
        inshim8r.import = function (options) {
            var fileContent = getFileContent(options.path);

            var prependedCode = !!options.prependedCode ? options.prependedCode : "";
            var appendedCode = !!options.appendedCode ? options.appendedCode : "";
            appendedCode += exposePublicMethods(fileContent, options.methodsContainerName);

            eval(prependedCode + fileContent + appendedCode);
        };

        return inshim8r;
    }

    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;

    function loadDependencies(require, exports) {
        makeApi(exports);
    }

    if (isAMD) {
        define(loadDependencies);
        return;
    }

    if (isNode) {
        loadDependencies(require, module.exports, module);
        return;
    }

    if (inshim8rGlobal) {
        makeApi(inshim8rGlobal);
    }
}(
    typeof inshim8rGlobal === "object" && inshim8rGlobal // eslint-disable-line no-undef
));