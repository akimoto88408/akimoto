var tableView = function(){
    var DOMstrings = {
        tableRequest: "#table-request",
        productFilter: "#inputGroupSelect01",
        selectProduct: "select__product",
        statusBtn: "btn-status",
        counterNewRequests: ".badge-new",
        counterAllRequests: ".badge-all",
        counterInProcessRequests: ".badge-in-process",
        counterCompletedRequests: ".badge-completed",
        counterArchiveRequests: ".badge-archive",
        statusBadge: ".badge",
        statusFilter: ".btn-group",
        statusInput: ".status-value",
        tableRowRequest: ".table-row",
        leftNav: ".left-panel__navigation",
        classActive: "active",
        productFilterBtn: "a[data-filter]",
        dataFilterAttr: "data-filter",
        dataActionAttr: "data-action",
        editButton: '[data-action="edit"]',
    }

    function getDOMstring() {
        return DOMstrings;
    }

    var statusData = {
        new: ["Новый", "badge-danger"],
        completed: ["Завершенный", "badge-success"],
        "in-process": ["В работе", "badge-warning"],
        "waiting-for-payment": ["Ожидается оплата", "badge-primary"],
        rejected: ["Отклонен", "badge-dark"],
        archive: ["Архив", "badge-light"]
    }

    var allStatusesName = Object.keys(statusData)

    function addRowRequest(fData) {
    
        fData.requests.forEach(item => {
            var table = document.querySelector(DOMstrings.tableRequest);
            html = `<tr class="table-row" data-filter='["%data-filter-value%", "new"]'>
            <th scope="row">%id%</th>
            <td>%date%</td>
            <td>%product%</td>
            <td>%name%</td>
            <td>%email%</td>
            <td>%phone%</td>
            <td>
                <div class="badge badge-pill %class%">
                    %status%
                </div>
            </td>
            <td>
                <a href="03-crm-edit-bid.html" data-action="edit">Редактировать</a>
            </td>
            </tr>`

            var newHtml = html.replace("%id%",  item.ID);
            newHtml =  newHtml.replace("%date%",  item.date);
            newHtml =  newHtml.replace("%name%",  item.name);
            newHtml =  newHtml.replace("%phone%",  item.phone);
            newHtml =  newHtml.replace("%email%",  item.email);
            newHtml =  newHtml.replace("%product%",  item.product);
            newHtml =  newHtml.replace("%data-filter-value%",  item.product);
            newHtml =  newHtml.replace("%status%", statusData[item.status][0]);
            newHtml =  newHtml.replace("%class%", statusData[item.status][1]);

            table.insertAdjacentHTML("beforeend",  newHtml);
 
        });
    }

    function countRequests(formDataFromJson){
        var allRequestStatuses = [];

        formDataFromJson.requests.forEach(function(item){
            allRequestStatuses.push(item.status)
        });

        document.querySelector(DOMstrings.counterAllRequests).textContent =  allRequestStatuses.length
        document.querySelector(DOMstrings.counterNewRequests).textContent =  allRequestStatuses.filter(function(request){
            return request == allStatusesName[0]
        }).length
        document.querySelector(DOMstrings.counterCompletedRequests).textContent =  allRequestStatuses.filter(function(request){
            return request == allStatusesName[1]
        }).length
        document.querySelector(DOMstrings.counterInProcessRequests).textContent =  allRequestStatuses.filter(function(request){
            return request == allStatusesName[2]
        }).length
        document.querySelector(DOMstrings.counterArchiveRequests).textContent =  allRequestStatuses.filter(function(request){
            return request == allStatusesName[5]
        }).length
    }

    function clearTableRequest(){
        document.querySelectorAll(DOMstrings.tableRowRequest).forEach(function(item){
            item.remove();
        })
    }
    
    function addActiveClass(){
        document.querySelectorAll(DOMstrings.productFilterBtn).forEach(function(elem){
            elem.classList.remove(DOMstrings.classActive)
        })

        var dataFilterAttrValue = event.target.getAttribute(DOMstrings.dataFilterAttr)
    
        document.querySelectorAll(`[${DOMstrings.dataFilterAttr} = ${dataFilterAttrValue}]`).forEach(function(elem){
            elem.classList.add(DOMstrings.classActive)
        })

    }

    function getRequestID(event){

        if(event.target.hasAttribute(DOMstrings.dataActionAttr) && event.target.getAttribute(DOMstrings.dataActionAttr) == "edit"){
            var currentRowRequest = event.target.closest(DOMstrings.tableRowRequest)
            var requestID = currentRowRequest.firstElementChild.textContent;

            localStorage.setItem("clickedRequest", JSON.stringify(requestID));
        }
    }

    function writeToHiddenInput(){
        var valueOfDataFilter = event.target.getAttribute(DOMstrings.dataFilterAttr);

        var hiddenInput = document.querySelector(DOMstrings.statusInput);
        hiddenInput.value = valueOfDataFilter;
    }

    function getStatusValue(){
        return document.querySelector(DOMstrings.statusInput).value
    }

    function getProductValue(){
        return document.querySelector(DOMstrings.productFilter).value
    }

    return{
        getDOMstring: getDOMstring,
        addRowRequest: addRowRequest,
        clearTableRequest: clearTableRequest,
        addActiveClass: addActiveClass,
        getRequestID: getRequestID,
        writeToHiddenInput: writeToHiddenInput,
        getStatusValue: getStatusValue,
        getProductValue: getProductValue,
        countRequests: countRequests
    }
}();
