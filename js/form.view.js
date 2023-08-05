var formView = function() {
    var DOMstrings = {
        formRequest: "#POST",
        formAnswer: "#answer",
        inputName: '[name="name"]',
        inputPhone: '[name="phone"]',
        inputEmail: '[name="email"]',
        productSelect: '[name="product"]',
    }

    function getDOMstring() {
        return DOMstrings;
    }

    function addPhoneMask() {
        var element = document.getElementById('input__phone');
        var maskOptions = {
          mask: '+{7}(000)000-00-00'
        };
        var mask = IMask(element, maskOptions);    
    }

    function getInput(){
        return{
            name: document.querySelector(DOMstrings.inputName).value,
            phone: document.querySelector(DOMstrings.inputPhone).value,
            email: document.querySelector(DOMstrings.inputEmail).value,
            product: document.querySelector(DOMstrings.productSelect).value
        }
    }

    function clearFields() {
        var inputName = document.querySelector(DOMstrings.inputName);
        var inputPhone = document.querySelector(DOMstrings.inputPhone);
        var inputEmail = document.querySelector(DOMstrings.inputEmail);

        inputName.value = "";
        inputPhone.value = "";
        inputEmail.value = "";
    }
    
    function addResponseToRequest(){
        var form = document.querySelector(DOMstrings.formRequest)
        console.log(form)
        var html = `<div>
                        <h3>Заявка отправлена успешно!</h3>
                        <p>Мы свяжемся с&nbsp;Вами в&nbsp;ближайшее время!</p>
                        <p><a href="01-form.html">Отправить ещё одну заявку</a></p>
	                </div>`
        
        form.insertAdjacentHTML("beforebegin",  html);
        form.remove();
    }

    function showValidation(value){
        // var input = document.querySelector(DOMstrings[`input${value}`])
        // input.style = 'border: 1px solid #eb340a;'
        var form = document.querySelector(DOMstrings.formRequest)
        var html = `<div class="validate-error">
                        <p>Телефон имеет неверный формат</p>
	                </div>`
        
        form.insertAdjacentHTML("beforebegin",  html);
    }

    function removeValidation(){
        var error = document.querySelector('.validate-error')
        if(error !== null){
            error.remove()
        }
    }

    return {
        getDOMstring: getDOMstring,
        getInput: getInput,
        clearFields: clearFields,
        addPhoneMask: addPhoneMask,
        addResponseToRequest: addResponseToRequest,
        showValidation: showValidation,
        removeValidation: removeValidation
    }
}();
