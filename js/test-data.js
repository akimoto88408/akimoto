var generateTestData = function(){
    var ExampleItem = function(name, phone, email, product){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.product = product;
    }
   
    var testData = [
        new ExampleItem("Анастасия Герасимова", "+7(911)124-23-81", "anastasiagerasimova@gmail.com", "Курс по JavaScript"),
        new ExampleItem("Илья Крюков", "+7(904)363-61-11", "ilya.krukov@gmail.com", "Курс по PHP"),
        new ExampleItem("Александр Смирнов", "+7(924)450-77-83", "smirnov_alexsander@yandex.ru", "Курс по WordPress"),
        new ExampleItem("Екатерина Филимонова", "+7(914)760-30-34" ,"filimonova.k@gmail.com", "Курс по верстке"),
        new ExampleItem("Вечяслав Филиппов", "+7(999)140-72-99", "vyacheslav-filippov@yandex.ru","Курс по VUE JS"),
        new ExampleItem("Алина Ханенко", "+7(992)143-06-81", "khanenko@gmail.com", "Курс по верстке")
    ]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function insertInUI() {
        var random = getRandomInt(testData.length);
        var randomItem = testData[random];
    
        document.querySelector("#input__name").value = randomItem.name;
        document.querySelector("#input__phone").value = randomItem.phone;
        document.querySelector("#input__email").value = randomItem.email;
        document.querySelector("#exampleFormControlSelect1").value = randomItem.product;
    }

    return{
        init: insertInUI
    }
}();

generateTestData.init();