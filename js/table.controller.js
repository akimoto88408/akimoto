var tableController = function(modelCtrl, uiTableCtrl){
    function setupEventListeners(){
        var DOM = uiTableCtrl.getDOMstring();

        document.querySelector(DOM.statusFilter).addEventListener('click', uiTableCtrl.writeToHiddenInput);
        document.querySelector(DOM.statusFilter).addEventListener('click', filterRequests);
        document.querySelector(DOM.leftNav).addEventListener('click', uiTableCtrl.writeToHiddenInput);
        document.querySelector(DOM.leftNav).addEventListener('click', filterRequests);
        document.querySelector(DOM.productFilter).addEventListener('change', filterRequests);
        
        document.querySelector(DOM.tableRequest).addEventListener('click', uiTableCtrl.getRequestID);
    }

    //Добавляем все завки из LocalStorage в таблицу 
    function ctrlAddRowRequest() {
        var formDataFromJson = modelCtrl.loadFromLocalStorage("formData")
        uiTableCtrl.addRowRequest(formDataFromJson);
    }

    // Фильтрация всех заявок 
    function filterRequests(event){
        var DOM = uiTableCtrl.getDOMstring();
        var state = modelCtrl.getState();

        // Проверяем на какой фильтр нажал или изменил польтзователь
        // Изменяем соответствующие поля объекта state на выбранное значение
        if(event.target.classList.contains(DOM.statusBtn)){
            updateStatusInState(state)

            uiTableCtrl.addActiveClass()
        }else if(event.target.classList.contains(DOM.selectProduct)){
            updateProductInState(state)
        }

        // Фильтруем все заявки на основе полей status и product в объекте state
        var  filteredData = modelCtrl.filterFormData(state);
        // Очищаем таблицу с заявками
        uiTableCtrl.clearTableRequest()
        // Добавляем все заявки, которые соответствуют значениям двух фильтров
        uiTableCtrl.addRowRequest(filteredData);
    }

    //Запись быбранного статуса заказа в объкт state
    function updateStatusInState(state){
        var selectedStatus = uiTableCtrl.getStatusValue();
        state.status = selectedStatus
    }

    //Запись названия нового быбранного курса в объкт state 
    function updateProductInState(state){
        var selectedProduct = uiTableCtrl.getProductValue();
        state.product = selectedProduct
    }

    function ctrlCountRequests(){
        var formDataFromJson = modelCtrl.loadFromLocalStorage("formData");
        uiTableCtrl.countRequests(formDataFromJson);
    }

    return{
        init: function() {
            setupEventListeners()
            ctrlAddRowRequest()
            ctrlCountRequests()
        }
    }
}(model, tableView);

tableController.init();