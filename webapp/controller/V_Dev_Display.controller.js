sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, History, MessageToast, MessageBox) {
	"use strict";
	var oObjnr;
	var sMsg;
	var oCancelTable;
	var aIndex;
	return Controller.extend("ZNav.controller.V_Dev_Display", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZNav.view.V_Dev_Display
		 */
		onInit: function() {
			var oView = this.getView();
			var oTable = this.getView().byId("Dev_Table");
			oView.addEventDelegate({
				onAfterShow: function(oEvent) {
					oTable.bindRows({
                    path: "/DevMasterSet",
						key: ["Zdeveloper"]
					});

				}

			}, oView);
		
		},

		rebindTable: function() {
			// var dialog = new sap.m.BusyDialog({
			// 	text: 'Processing'
			// });
			// dialog.open();

			var oTable = this.getView().byId("Dev_Table");
			oTable.bindRows({
				path: "/DevMasterSet",
				Key: ["Zdeveloper"]
			});
			// dialog.close();
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZNav.view.V_Dev_Display
		 */
	
		handleRouteMatched: function(evt) {
			this.rebindTable();
		},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZNav.view.V_Dev_Display
		 //*/
			// onBeforeRendering: function() {
			// this.oModel = this.getView().getModel();
			// var dialog = new sap.m.BusyDialog({
			// 	text: 'Processing'
			// });
			// this.oModel.attachRequestSent(function() {
			// 	dialog.open();
			// });
			// this.oModel.attachRequestCompleted(function() {
			// 	dialog.close();
			// });
			// this.oModel.attachRequestFailed(function() {
			// 	dialog.close();
			// });
			// },
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZNav.view.V_Dev_Display
		 */
		// onAfterRendering: function() {
		// 	this.oModel = this.getView().getModel();
		// 	var dialog = new sap.m.BusyDialog({
		// 		text: 'Processing'
		// 	});
		// 	this.oModel.attachRequestSent(function() {
		// 		dialog.open();
		// 	});
		// 	this.oModel.attachRequestCompleted(function() {
		// 		dialog.close();
		// 	});
		// 	this.oModel.attachRequestFailed(function() {
		// 		dialog.close();
		// 	});
		// },
		onExit: function() {
			this.aDevMasterSet = [];
		},
		// fvalidation: function() {
		// 	{
		// 	    var oModel = this.getView().getModel();
		// 		var oEntry = {};
		// 		oEntry.Zdeveloper = this.getView().byId("cDeveloperId").getValue();
		// 		if (oEntry.Zdeveloper < 1 )
		// 		{
		// 		this.getView().byId("cDeveloperId").setValueState(sap.ui.core.ValueState.Error);	
		// 		}
		// 		else
		// 		{
		// 		this.getView().byId("cDeveloperId").setValueState(sap.ui.core.ValueState.None);		
		// 		}
		// 	}
		// 	},
		
		fGoToTarget_1: function() {
			//This code was generated by the layout editor.
			//This code was generated by the layout editor.
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			// Go one screen back if you find a Hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} // If you do not find a correct Hash, go to the Source screen using default router;
			else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("", true);
			}
		},
		fGoToDevCopy: function() {
			//This code was generated by the layout editor.
			var oView = this.getView();
			var oTable = oView.byId("Dev_Table");
			var aIndex = oTable.getSelectedIndex();
			var oDialog = oView.byId("idDevDialogCopy");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "ZNav.view.DevCopy", this);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
			var oContext = oTable.getContextByIndex(aIndex);
			var cZdeveloper = oContext.getProperty("Zdeveloper");
			var cZdeveloperName = oContext.getProperty("ZdeveloperName");
			var cZactive = oContext.getProperty("Zactive");
			oView.byId("cDeveloperId").setValue(cZdeveloper);
			oView.byId("cDeveloperName").setValue(cZdeveloperName);
			oView.byId("cActive").setSelected(cZactive);
	},
		
		fChangeDev: function() {
			// var dialog = new sap.m.BusyDialog({ text:'Processing...'});
			//         dialog.open();	
			var oView = this.getView();
			var oTable = oView.byId("Dev_Table");
		    aIndex = oTable.getSelectedIndex();
			var oDialog = oView.byId("idDevDialogChange");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "ZNav.view.DevChange", this);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
			}

			oDialog.open();
			var oContext = oTable.getContextByIndex(aIndex);
			var iZdeveloper = oContext.getProperty("Zdeveloper");
			var sZdeveloperName = oContext.getProperty("ZdeveloperName");
			var sZactive = oContext.getProperty("Zactive");
			oView.byId("chDeveloperId").setValue(iZdeveloper);
			oView.byId("chDeveloperName").setValue(sZdeveloperName);
			oView.byId("chActive").setSelected(sZactive);
		},
		

		fCancelFromDev: function() {
			this.getView().byId("idDevChange").setVisible(true);
			this.getView().byId("idDevSave").setVisible(false);
			this.getView().byId("idDevCancel").setVisible(false);
			var oTable = this.getView().byId("Dev_Table");
			var oModel = oTable.getModel();
			oModel.setProperty("/DevMasterSet", this.aDevMasterSet);
			this.rebindTable();
			var selectedRow = oTable.getRows()[aIndex];
			for (var i = 1; i < 3; i++) {
				selectedRow.getCells()[i].setProperty("editable", false);
			}
		},
        
		fSaveCopyDev: function() {
			var iError = 0;
			var oView = this.getView();
			var oTable = oView.byId("Dev_Table");
			var aIndex = oTable.getSelectedIndex();
			// var oContext = oTable.getContextByIndex(aIndex);
			// var set = oContext.sPath;
			/*Update operation*/
			var oModel = this.getView().getModel();
			var oEntry = {};
			oEntry.Zdeveloper = oView.byId("cDeveloperId").getValue();
			oEntry.ZdeveloperName = oView.byId("cDeveloperName").getValue();
			oEntry.Zactive = oView.byId("cActive").getSelected();
			// if (oEntry.Zdeveloper === "") {
			// 	MessageToast.show("Please enter Developer ID");
			// } 
			// else 
			// {
			if( oEntry.Zdeveloper === "" ||  oEntry.Zdeveloper < 1 ){ 
				this.getView().byId("cDeveloperId").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("cDeveloperId").setTooltip("Please enter a valid value");
				iError++;
		    	}
		    	else {
					this.getView().byId("cDeveloperId").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("cDeveloperId").destroyTooltip();
		     	}
		     	if (iError > 0){ 
				return;
			}
				else 
		 	{
				   oModel.create("/DevMasterSet", oEntry, {
					method: "POST",
					success: function(data) {
						
						MessageBox.success("Record has been saved");
						
						},
					error: function(e) {
						
						MessageBox.error("Entry already exist");
					}
				});
		 	}
			this.getView().byId("idDevDialogCopy").close();
			//this.rebindTable();
			
		},
		fSaveChangeDev: function() {
			var oView = this.getView();
			var oTable = oView.byId("Dev_Table");
			var aIndex = oTable.getSelectedIndex();
			var contexts = oTable.getContextByIndex(aIndex);
			var set = contexts.sPath;

			/*Update operation*/
			var oModel = this.getView().getModel();
			var oEntry = {};
			/*create operation*/
			oEntry.Zdeveloper = oView.byId("chDeveloperId").getValue();
			oEntry.ZdeveloperName = oView.byId("chDeveloperName").getValue();
			oEntry.Zactive = oView.byId("chActive").getSelected();
			oModel.update(set, oEntry, {
				method: "PUT",
				success: function(data) {
					// dialog.close();
					MessageBox.success("Record has been saved");
				},
				error: function(e) {
					// dialog.close();
					MessageBox.error("Error while saving the record");
				}
			});

			this.getView().byId("idDevDialogChange").close();
		//	this.rebindTable();
		},
		
		onCloseDialog: function() {
			this.getView().byId("idDevDialogChange").close();
			//this.rebindTable();
		},
		
		onCloseCopy  : function() {
			this.getView().byId("idDevDialogCopy").close();
		//	this.rebindTable();
		},
		
		fDeleteDev: function() {
		// 	var oView = this.getView();
		// 	var oTable = this.getView().byId("Dev_Table");
		// 	aIndex = oTable.getSelectedIndex();
		// 	var contexts = oTable.getContextByIndex(aIndex);
		// 	var set = contexts.sPath;
		// 	var oDialog = oView.byId("idDevDialogDelete");
		// 	// create dialog lazily
		// 	if (!oDialog) {
		// 		// create dialog via fragment factory
		// 		oDialog = sap.ui.xmlfragment(oView.getId(), "ZNav.view.DevDelete", this);
		// 		// connect dialog to view (models, lifecycle)
		// 		oView.addDependent(oDialog);
		// 	}

		// 	oDialog.open();
		// 	this.rebindTable();
		// },
		var oView = this.getView();
					var oTable = oView.byId("Dev_Table");
					var oModel =  oTable.getModel();
				MessageBox.show("Are you sure want to delete this Record?",
					{   actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose:function(oAction){
						if (oAction === sap.m.MessageBox.Action.YES)
						{
					var aIndex = oTable.getSelectedIndex();
					var contexts = oTable.getContextByIndex(aIndex);
					var set = contexts.sPath;
					oModel.remove(set, {
						method: "DELETE",
						success: function(data) {
							MessageBox.success("Record has been deleted");
						},
						error: function(e) {
							MessageBox.error("Error in delete");
						}
						});
					//	this.rebindTable();
						}
						else{
							oTable.clearSelection();
						}
					}}
					);
		
			oTable.setModel(oModel);
			},
		
		fsDeleteDev: function() {
				

			// var oView = this.getView();
			// var oTable = oView.byId("Dev_Table");
		 //   aIndex = oTable.getSelectedIndex();
			// var contexts = oTable.getContextByIndex(aIndex);
			// var set = contexts.sPath;

			/*Delete operation*/
			var oModel = this.getView().getModel();
			var oEntry = {};
			// /*create operation*/

			// oEntry.Zdeveloper = oView.byId("inDeveloperId").getValue();
			// oEntry.ZdeveloperName = oView.byId("inDeveloperName").getValue();
			// oEntry.Zactive = oView.byId("inActive").getValue();
			oModel.remove("/DevMasterSet", oEntry, {
				method: "DELETE",
				success: function(data) {
					MessageBox.success("Record has been deleted");
				},
				error: function(e) {
					MessageBox.error("Error while deleting the record");
				}
			});
			this.getView().byId("idDevDialogDelete").close();
		//	this.rebindTable();
		},

		onCloseDeleteDialog: function() {
			this.getView().byId("idDevDialogDelete").close();
		//	this.rebindTable();
		},
		});
});