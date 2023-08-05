var formController = function(modelCtrl, uiCtrl) {
    function setupEventListeners(){
        var DOM = uiCtrl.getDOMstring();
        document.querySelector(DOM.formRequest).addEventListener('submit', CtrlAddRequst);
    }

    //Функция для проверки email
    function validateEmail(email) {
        var pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        return pattern.test(email);
    }

    //Функция для проверки телефона
    function validatePhone(phone) {
        var pattern = /^\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/;
        return pattern.test(phone);
    }

    function CtrlAddRequst(event){
        uiCtrl.removeValidation();
        event.preventDefault();

        var input = uiCtrl.getInput();

        if(input.name.trim() !== "" && validateEmail(input.email) && validatePhone(input.phone) || input.phone == ""){
            var ID =  modelCtrl.createIdRequest();
            var date = modelCtrl.creatDate();

            modelCtrl.addRequest(ID, date,  input.name.trim(), input.phone, input.email, input.product, "new");
            
            var formData = modelCtrl.getData();
            modelCtrl.saveToLocalStorage("formData", formData);

            uiCtrl.clearFields();
            uiCtrl.addResponseToRequest();

        }else{
            if(!validatePhone(input.phone)){
                uiCtrl.showValidation("Phone")
            }
        }
    }

    return{
        init: function(){
            setupEventListeners();
            uiCtrl.addPhoneMask()
        }
    }
}(model, formView);

formController.init();