var model = function(){

    var data = {
        requests: []
    }

    var state = {
        status:"all",
        product: "Все продукты"
    }

    var Request = function(ID, date, name, phone, email, product, status){
        this.ID = ID;
        this.date = date;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.product = product;
        this.status = status;
    }

    function creatDate(){
        var date = new Date().toLocaleDateString();
        return date;
    }

    function createIdRequest(){
        data = checkLocalStorage("formData");
        var ID = data.requests.length + 1;
        return ID;
    }

    function addRequest(ID, date, name, phone, email, product, status) {
        var newRequest = new Request(ID, date, name, phone, email, product, status);
        data.requests.push(newRequest);
    }
    
    function saveToLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    function checkLocalStorage(key){
        if(localStorage.getItem(key)){
            return loadFromLocalStorage(key);
        } else if(!localStorage.getItem(key)){
            return {requests: []}
        }
    }

    function loadFromLocalStorage(key){
        if(localStorage.getItem(key)){
            return data = JSON.parse(localStorage.getItem(key));
        }
    }

    // Фильтрация объекта с заявками на основе полей status и product объкта state
    function filterFormData(state){
        var filteredData = {}
        var formDataFromJson = loadFromLocalStorage("formData");

        filteredData.requests = formDataFromJson.requests
        .filter(function(request){
            if(state.product == "Все продукты" && state.status !== "all"){
                return request.status == state.status
            }else if(state.status == "all" && state.product !== "Все продукты"){
                return request.product == state.product
            }else if(state.status !== "all" && state.product !== "Все продукты"){
                return request.product == state.product && request.status == state.status
            }else{
                return true;
            }
        })
    
        return filteredData;   
    }

    return{
        addRequest: addRequest,
        getData: function(){
            return data
        },
        getState: function(){
            return state
        },
        creatDate: creatDate,
        createIdRequest: createIdRequest,
        loadFromLocalStorage: loadFromLocalStorage,
        saveToLocalStorage:  saveToLocalStorage,
        filterFormData: filterFormData
    }
}();
