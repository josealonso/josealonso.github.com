
// Not apply the @font-face rule for IE11
var browserType = navigator.userAgent;
if (browserType.indexOf("Chrome") > -1 || browserType.indexOf("Firefox") > -1) {
    var styleSheetElement = document.createElement("style"), customStyleSheet;
    document.head.appendChild(styleSheetElement);
    customStyleSheet = document.styleSheets[0];
    customStyleSheet.insertRule("@font-face {font-family: batman; src: url(../fonts/batmfo__.ttf); } ", 0);
}
