sap.ui.define([
    "./Base.Controller",
    "../model/configurations",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/deepClone",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Basecontroller, Config, JSONModel, deepClone, Fragment, Filter, FilterOperator,MessageToast,formatter) {
        "use strict";

        return Basecontroller.extend("flight.controller.Home", {
            formatter: formatter,
            onInit: function () {
                this._initModels()
            },

            _initModels: function () {
                let oModel = new JSONModel()
                let oFilterClone = deepClone(Config.individual)

                oModel.setData(oFilterClone)
                this.setModel(oModel, 'filterModel')

                let homeModel = new JSONModel({
                    busy: false
                })

                this.setModel(homeModel, 'homeView')


                let oCreateModel = new JSONModel()
                let oCreateClone = deepClone(Config.create)
                oCreateModel.setData(oCreateClone)
                this.setModel(oCreateModel,'create')
            },

            onCreate: function () {
                if (!this._oFragment) {
                    this._oFragment = Fragment.load({
                        name: "flight.view.Fragments.create",
                        controller: this
                    })
                }
                this._oCreateBackup = deepClone(this.getModel('create').getProperty('/'))

                this._oFragment.then(function (oFragment) {
                    this.getView().addDependent(oFragment)
                    oFragment.open()
                }.bind(this))
            },

            onConfirm: function(oEvent) {
                const oSource = oEvent.getSource()
                const oEntry = this.getModel('create').getProperty('/')
                const oCreate = this.getOdataModel().create('/AerolineaSet', oEntry)

                oSource.getParent().close()
                this._undoCreateModel()
                oCreate.then(function(response) {
                    MessageToast.show('The Airline has been Successfully created')
                }.bind(this)).catch(function(error) {
                    this.getMessageDialog().addResponse(error)
                }.bind(this))
            },

            onCancel: function(oEvent) {                
                const oSource = oEvent.getSource()

                this._undoCreateModel()

                oSource.getParent().close()
            },

            _undoCreateModel: function() {
                this.getModel('create').setProperty('/',this._oCreateBackup)
            },

            onSearch: function (oEvent) {
                const oList = this.byId('flightList')
                const sQuery = oEvent.getParameter('query')
                let oBinding = oList.getBinding('items')
                let aFilter = []

                if (oEvent.getParameters().refreshButtonPressed) {
                    this.onRefresh();
                    return;
                }

                if (sQuery) {
                    aFilter.push(new Filter('Carrname',FilterOperator.StartsWith,sQuery))
                    oBinding.filter(aFilter)
                }

            },

            onRefresh: function () {
                const oList = this.byId('flightList')
                oList.getBinding("items").refresh();
            },


        });
    });
