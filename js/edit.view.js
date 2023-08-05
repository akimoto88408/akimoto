var editView = function(){
    var DOMstrings = {
        formEdit: "#form__edit",
        tableRequest: "#table-request",
        editButton: '[data-action="edit"]',
        dataActionAttr: "data-action",
        requestIDNumber: "#request-number",
        requestDate: "#request-date",
        selectProduct: ".select__product",
        inputName: ".input__name",
        inputEmail: ".input__email",
        inputPhone: ".input__phone",
        selectStatus: ".select__status",
        saveButton: '[data-action="save"]',
        removeButton: '[data-action="remove"]'
    }

    function getDOMstring() {
        return DOMstrings;
    }

    function loadCurrentInfo(requestID, date, product,  name, email, phone, status){
        //Отображение номера заявки 
        var IDNumber = document.querySelector(DOMstrings.requestIDNumber).innerText;
        document.querySelector(DOMstrings.requestIDNumber).innerText = IDNumber.replace("1", requestID)
        // Отображения даты заявки 
        document.querySelector(DOMstrings.requestDate).innerText = date;
        // Отображения заказанного продукта 
        document.querySelector(DOMstrings.selectProduct).value = product;
        //Отображение имени заказчика
        document.querySelector(DOMstrings.inputName).value = name;
        //Отображение email
        document.querySelector(DOMstrings.inputEmail).value = email;
        //Отображение телефона
        document.querySelector(DOMstrings.inputPhone).value = phone;
        //Отображение статуса заявки
        document.querySelector(DOMstrings.selectStatus).value = status;
    }

    function editName(){
        return document.querySelector(DOMstrings.inputName).value 
    }

    function editEmail(){
        return document.querySelector(DOMstrings.inputEmail).value 
    }

    function editPhone(){
        return document.querySelector(DOMstrings.inputPhone).value 
    }

    function editProduct(){
        return document.querySelector(DOMstrings.selectProduct).value 
    }

    function editStatus(){
        return document.querySelector(DOMstrings.selectStatus).value
    }

    return{
        getDOMstring: getDOMstring,
        loadCurrentInfo:loadCurrentInfo,
        editName: editName,
        editEmail: editEmail,
        editPhone: editPhone,
        editProduct: editProduct,
        editStatus: editStatus
    }
}();
