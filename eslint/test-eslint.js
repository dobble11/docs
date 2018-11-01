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
var sortObj = infoObj.sort(compare("age"));
console.log(sortObj);


// no-empty-function -- 不允许函数穿透，有空函数;
function demo(){

}

// for-direction -- 禁止 for 循环出现方向错误的循环
for (let i = 0; i < 10; i--) {
    // do something
}

// getter-return -- getter 必须有返回值，并且禁止返回空或者return;
let user = {
    get name() {
        // 无返回值
    }
};

// no-unused-vars -- 定义过的变量必须使用
var unusevar;

//curly -- if 后面必须要有 {，除非是单行 if
let foo = true
if (foo)
    console.log(foo);

//no-floating-decimal -- 表示小数时，禁止省略 0，比如 .1
let a=.1;
console.log(a);

//no-redeclare  -- 重复定义变量
var infoObj=[];
