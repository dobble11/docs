var infoObj=[
            {
                name:"张三",
                age:30
            },
            {
                name:"李四",
                age:20
            },
            {
                name:"王五",
                age:40
            }
];
//升序排列
function compare(property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;
    }
}
function demo(){

}
var unusevar;
var sortObj = infoObj.sort(compare("age"));
console.log(sortObj); 