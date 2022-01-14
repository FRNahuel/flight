sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "../utils/odataAPI",
    "../model/MessageDialog"
], function (Controller, UIComponent,odataAPI,MessageDialog) {

    "use strict";

    return Controller.extend("flight.controller.BaseController", {


        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        setBusy: function (sName, busy) {
            return this.getView().getModel(sName).setProperty('/busy', busy)
        },

        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },       
        getOdataModel: function (sName) {
           
            let oData = new odataAPI(this.getModel(sName));
         
            return oData
        },
        getMessageDialog: function() {
            return MessageDialog.getInstance();
        }

    });

});