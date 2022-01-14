sap.ui.define([], function () {
    "use strict";

    return {
        getEnabledButtonCreate: function(sName, sId, sCurr) {
           const bEnabled =  Boolean(sName) && Boolean(sId ) && Boolean(sCurr) 
           return bEnabled
        }
    };
});