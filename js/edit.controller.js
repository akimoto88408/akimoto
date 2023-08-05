var editController = function(modelCtrl, uiEditCtrl, uiTableCtrl){
    function setupEventListeners(){
        var DOM = uiEditCtrl.getDOMstring();

        document.querySelector(DOM.saveButton).addEventListener('click', editRequest);
        document.querySelector(DOM.removeButton).addEventListener('click', removeToArchive);
    }

    function editRequest(){
        var clickedRequest =  modelCtrl.loadFromLocalStorage("clickedRequest");
 
        //Получение из LocalStorage номера заявки, по которой произошел клик
        var requests = modelCtrl.loadFromLocalStorage("formData").requests
        // Нахождение в масссове с заявками соответствующего номеру заявки объекта с данными
        requestForEdit = requests[clickedRequest - 1];

        requestForEdit.product = uiEditCtrl.editProduct()
        requestForEdit.name = uiEditCtrl.editName();
        requestForEdit.email = uiEditCtrl.editEmail();
        requestForEdit.phone = uiEditCtrl.editPhone();
        requestForEdit.status =  uiEditCtrl.editStatus();

        var editedRequests = {requests:[]}
        editedRequests.requests = requests

        modelCtrl.saveToLocalStorage("formData", editedRequests)
    }

    function ctrlLoadCurrentInfo(){
        //Получение из LocalStorage номера заявки, по которой произошел клик
        var clickedRequest = modelCtrl.loadFromLocalStorage("clickedRequest");

        // Получени из LocalStorage данных о редактируемой заявке 
        requests =  modelCtrl.loadFromLocalStorage("formData").requests
        requestForEdit = requests[clickedRequest - 1];

        uiEditCtrl.loadCurrentInfo(clickedRequest, requestForEdit.date, requestForEdit.product,  requestForEdit.name, requestForEdit.email, requestForEdit.phone, requestForEdit.status);
    }

    function removeToArchive(){
        //Получение из LocalStorage номера заявки, по которой произошел клик
        var clickedRequest = modelCtrl.loadFromLocalStorage("clickedRequest");

        // Получени из LocalStorage данных о редактируемой заявке 
        requests = modelCtrl.loadFromLocalStorage("formData").requests
        requestForEdit = requests[clickedRequest - 1];
    
        requestForEdit.status = "archive";

        var editedRequests = {requests:[]}
        editedRequests.requests = requests
        modelCtrl.saveToLocalStorage("formData", editedRequests)
    }

    function ctrlCountRequests(){
        var formDataFromJson = modelCtrl.loadFromLocalStorage("formData");
        uiTableCtrl.countRequests(formDataFromJson);
    }

    return{
        init: function() {
            setupEventListeners();
            ctrlLoadCurrentInfo();
            ctrlCountRequests();
        }
    }
}(model, editView, tableView);

editController.init();