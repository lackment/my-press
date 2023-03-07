---
title: 条件类型
author: 冴羽
date: '2021-12-12'
---

### 隐式转换

当运算符的两端的数据类型不一样时，编译器会自动的将两端的数据转换成同一种类型来计算，这个过程就叫做隐式转换

|       转换目标        |                            运算符                            |                             备注                             |
| :-------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 数据转换为string类型  |                           + 字符串                           | 当'+'运算符的一端的一个数据类型为string类型时，就会将另外一端的数据变为string类型，然后进行字符串的拼接 |
| 数据转换为number类型  | ++/-- (自增自减运算符)<br/>\+ - * / % (算术运算符)<br/>> <  >=  <= ==  !=  ===  !== (关系运算符) | 当使用了上述计算符时，会将两端数据转为Number类型，再进行计算 |
| 数据转换为boolean类型 |                              ！                              | 当使用！运算符时，会先将！运算符后面的数据转换为Boolean类型，然后再将结果反转 |

引用类型的数据（Object、Array和function等）进行运算的时候会先执行valueOf方法得到数据的原始类型，再通过toString方法转换成字符串类型，最终通过这个字符串转换成其他的基本类型数据。

* 对象类型（{a:2}）：通过valueOf方法得到原始数据（{a:2}）再通过toString方法得到字符串（'[object Object]'）,实际上就是数据的类型
* 数组类型（[1,2]）: 通过valueOf方法得到原始数据（[1,2]）再通过toString方法得到字符串（’12‘），实际上数组的toString方法调用了数组的join方法来组合数组数据
* 函数类型（function(){}）:通过valueOf方法得到原始数据（function(){}）再通过toString方法得到字符串（function(){}）

特殊的点

* number(undefined)得到NaN
* number(null)得到0
* Boolean([])得到true
* Boolean({})得到true

~~~javascript
'1'+undefined  //'1undefined'
'1'+null //'1null'

1+undefined // NaN  1+Number(undefined)
1+null  // 1 1+Number(null)=> 1+0
1+true // 2 1+Number(true) => 1+1

'2'>'10' // true 关系运算符的两端都是字符串类型时，会将其转为Ascall码来比较
'abc' > 'aad' //true

//无视规则的一些转换
null == undefined //true
NaN == NaN //false

//复杂类型的转换
[] == [] //false 引用地址不同
[] == ![] //true Number('') == !Boolean([]) =>Number('') == Number(false) => 0 == 0

{} == {} //false 引用地址不同
{} == !{} //false   Number('[object,Object]') == !Boolean({}) => Number('[object,Object]') == Number(false)                     => NaN == 0

[] == 0 // true   Number('') == 0 => 0 == 0
![] == 0 // true  !Boolean([]) == 0 => Number(false) == 0 => 0==0
 
[] + [] //得到'' 两端都会被转化字符串类型，然后进行字符串的连接
[] + {} //得到'[object Object]' 
{} + [] //得到0  这是因为这段代码被解析为{}; +[] ,前面的对象为看为一个代码块
{} + {} //NaN

~~~

### 数值的扩展

~~~javascript
Math.trunc() //获取数值除去小数部分的值
Math.sign() //判断一个值是正数、0、负数
Math.cbrt()//得到这个值得立方根
Math.hypot([1,2,3]) //得到所有数据平方和的平方根
2**2  即2的平方
Math.ceil()//向上取整
Math.floor()//向下取整
Math.random() //取0-1之间的随机数
num.toFixed(2)//保留小数点后两位的值
~~~

### 对象的扩展

~~~javascript
Object.create() //继承一个对象
const b = {
    getSData(){
    }
}
const a = Object.create(b) //此时a.__proto__ === b.prototype 原型链构成可实现对象的继承
（1）属性名的简写
 let x = 's'
 let y = {                  let y = {
     x         =>                x : 's'
       }                              }
 (2)表达式作为属性名(要加上[]):
 let x = {
   ['ac'+'b'] : 'x'
 }

Object.is(判断传入的两个值是否相等，当比’===‘更好，能判断NAN==NAN)
let  x = {}
let y = {}
Object.is(x,y) //false

Object.assign(将目标对象内所有可枚举的属性复制到源对象中):
注意：
//此方法会返回一个对象，返回的这个对象和源对象相同
//此方法是浅复制，复制得到的对象改变时，原对象也会进行改变，可选择lodash库中的_.defalutsDeep()
//当合并的对象拥有共同的属性名时，此属性会后面的对象的覆盖
(1)合并多个对象（不采用这个方法）
let x = {
   a:'a'
}
let  y = {
   b:'b'
}
let u = {
  c:'c'
}
Object.assign(x,y,c) // x = {a:'a',b:'b' ,c:'c'}
(2)为一个对象添加多个属性或者方法
let x = {
            a: 'c',
            b: 'd'
        }
        let y = {
            c() {
                console.log(sdads)
            }
        }
        let t = {
           c:'e'
        }
let i = Object.assign(t, x, y);

对象的枚举属性（对象中可以循环得到的属性）：
每一个属性都有一个enumerable属性，当这个属性为true时，此对象可以被循环

对象的循环：
（1）循环的顺序
  先循环属性名为数字，在循环属性名为字符串的，最后循环sysmbol类型的
 (2)循环方法
  for...in //循环对象中所有可枚举的属性，包括对象自身和继承得到的属性，所以一般不用此方法循环对象
  Object.keys() //返回一个数组，数组内是对象的属性名，只包括对象自身的属性（可枚举属性），一般用此方法循环对象
  Object.getOwnPropertyNames() //返回一个数组，包括此对象自身内所有属性，包括不可枚举的属性

setPrototypeOf(设置一个对象的原型)：

let a =  {
    
}
let b = {
     a:'c'
}
Object.setPrototype(a,b)
等同于
a._proto_ = b
所以 a.a // 'c'

getPrototypeOf(Object) //获取一个对象的原型

Object.keys(object) //返回一个数组，数组内是对象的属性名（不包括继承来的属性）
Object.values(object)//放回一个数组，包含对象的属性值（不包括继承来的属性）

Object.entries(object) //放回一个数组，数组内每一项是[属性名：属性值],可用来将对象转化为map对象

let a = {
     c:'c'
}
let map = new Map(Object.entries(a));

扩展运算符:
（1）用于解构赋值
let a = {
    a:'a'
    b:'b'
    c:"c"
}
let {a,...z} = a
a // 'a'
z //{
   b:'b'
   c:"c"
}
解构时，扩展运算符只能用在后面

（2）复制对象(浅复制，且复制的只有被复制对象本身的属性，不包括其继承来的属性)
let a = {
     a:'c'
}
let b = {...a}

（3）合并多个对象
let a = {
     a:'a'
}
let b = {
     b:'b'
}
let c = {...a,...b}
   
对象的深拷贝：
（1）最简单的：
let b = {
    a:"c"
}
let z = JSON.parse(JSON.stringify(b)) //既将b对象先转为字符串复制进栈内存中，在转为对象，丢进堆内存中
 缺点：1、无法拷贝对象内的正则、函数和Symbol
      2、循环引用会报错
      
 （2）利用递归进行拷贝：
 function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.has(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);

in 操作符
//判断一个属性名是否存在对象中
let b = {
     a："c" 
}
 'c' in b  //false


//ES6提供的判断一个属性名是否在对象中
let b = {
     a："c" 
}
b.hasOwnProtery('a') //得到true

~~~

### 数组的扩展

~~~javascript
Array.prototype.every() // 此方法传入一个数组，当数组内元素都满足条件时返回true，否则返回false
Array.prototype.map() //这个方法返回一个数组，并不会对原数组产生变化
Array.prototype.slice() //数组截取，传入三个参数，分别是原数组，截取开始位置，截取最终位置。此方法返回一个新的数组
Array.pop() //删除数组的最后一位元素并返回此元素
Array.shift() // 删除数组第一位元素并返回此元素
Array.unshift()//往数组开头添加元素 
Array.splice() //改变数组本身，用于删除或者取代数组某一部分
运算扩展符（...）
本质是将数组内所有元素取出来
作用：
(1)合并数组
let a = [1,2,3]
let b = [4,5,6]
let c = [...a,...b] //[1,2,3,4,5,6]
(2)与结构赋值组合
let a = [1,2,3]
let [b,...c] = a
那么 b = 1  ...c = [2,3]
(3)替代部分apply的作用
运用max方法时
let a = [3,4,5]
Math.max(...a) //得到5
(5)将字符串转变为数组
let b = '123'
let c = [...b] 得到[1,2,3]
(6)将具有Iterator接口的对象转化为数组(但一般不使用此运算符进行转换）
 let set  = new Set([1,2,3])
 let b = [...set] //[1,2,3] 
 
Array.from(将具有Iterator接口和类似数组的对象(具有lenght元素的)转化为数组)
let b = '234
let a = Array.from(b)// [2,3,4]

Array.of:将一组数值转为数组

Array.copyWithIn(将数组内一部分进行复制，并覆盖到数组内的一部分,对数组本身进行改变)
let a  = [2,3,4,5]
a.copyWithIn(0,2,4) //三个参数 第一个是从哪里开始覆盖 第二个和第三个分别是复制的起始，范围包括终止但是不包括起始
                    //得到 [4,5,4,5]

Array.find //循环数组找到第一个符合条件的元素，并将这个元素返回
Array.findIndex //循环数组找到第一个符合条件的元素，并将此元素的下标返回

Array.keys //返回一个Iterator对象，对象内包含此数组所有下标
Array.values //返回一个Iterator对象，对象内包含此数组内所有元素
Array.entries //返回一个Iterator对线，对象内包含下标和元素的键值对
let  b = [4,5,6];
b.entries() //得到[[0,4],[1,5],[2,6]]

Array.includes(判断一个数组内是否含有此对象）
let a = [1,2,3]
a.includes(1) //true

Array.fill(数组填充方法)
let a = [1,2,3]
a.fill(3,0,1) //得到[3,2,3] //第一个参数是要填充的数值

数组空位：
let A  = [,3,,]
不要出现上面的数组空位的现象，因为数组方法处理空位的流程不一样

~~~

### 函数的扩展

~~~javascript
function a(x ,a=0){  //允许函数参数带有默认值，但这种情况一般只适用尾参数而不是用于头参数
    
}

function b({a,c}){  //允许函数参数为解构赋值
      a  //'c'
      c // 'b'
}
b({a:'c',
  c："b"})
//有一个特殊的操作
function f ({a,...b}){
    //这里的b就为{c："d"}
}
f({a:'c',c:'d'})

let {a,...b} = {a:"c",c:'d'};
 //这里 b为{c:'d'}

函数的参数长度：
//function.length
（function （a ,b）{}）().lenght //可获取函数参数的个数，但若参数为解构的或者带有默认值则不被计算

rest参数
function a(...tes){
     tes.forEach() //tes为[1，2，3]的数组
}

a(1,2,3)
注意rest参数只能是尾参数
~~~

### 字符串的扩展

~~~javascript
 //模板字符串可以进行嵌套
        let c = '22';
        let d = '33';
        let e = `嵌套1${c}${`嵌套2${d}`}`;
        console.log(e);

        //对模板字符串两端进行去除空格的操作
        let h = ` ${c}空格操作 `.trim();
        console.log(h);

        //标签模板，作用于限制用户的输入，转义用户的输入，例如<转义为&lt; 防止xss攻击
        let g = change`测试<>${c}测试${d}测试`; //这一步相当于将模板字符串当做参数chage函数中
        function change(...rest) {
            console.log(rest);
           // rest返回一个数组，数组的第一位也是个数组，这个数组里面是模板字符串除开变量后的数据，例如上面就等于['测试<>','测试','测试']
           //除开第一位，剩下的每一个元素就为模板字符串中的变量
           //即rest返回[['测试<>','测试','测试'],'22','33']
           console.log(rest[0].raw)
           //我们输入的字符串是会被js进行一层转义的例如\n，会被转义为\\n，要拿到转义前的数据，就需要通过第一个参数中的raw属性
           //返回['测试<>','测试','测试']
        }
~~~

### 字符串新增的方法

~~~javascript

let a = 'asdcf'
a.At(0) //得到“a”,其作用和charAt一样用于获取字符串中指定位置的字符，但是相对于charAt来说，At能更精准的获取字符

//判断一个字符是否存在于字符串中
a.includes('a',0)//判断字符串中是否包含有传进的字符，可传第二个参数表示从第几位开始找
a.startsWith('a',0) //判断该字符串是否以传入的字符作为开始，也可传入第二个参数
a.endsWith('f',0)//判断该字符串是否以传入的字符串作为结尾，也可传入第二个参数

//使一个字符串重复
a.repeat(3) //得到'asdcfasdcfasdcf',即将a字符串重复3次

//截取字符串
let a = '123';
a.substr(0,2) //得到12 substr(从哪个位置开始，截取多少位);
a.substring(1,2) //得到12 substring(开始位置，结束位置),截取的内容不包括结束位置的内容

//填充字符串
a.padStart(2,"0")//往字符串开头填充字符0，但是填充后的字符串数为2，但是a字符串本身的长度为5，大于填充后的长度，这次填充只会返回'asdcf'本身
a.padEnd(2,'0')//效果同上，只是这个是从字符串尾部进行填充
a.padStart('7','012345')//填充后的长度为7，而a本身的长度为5，填充的字符串长度为6，加起来为11大于填充后的长度，所以会对填充字符串进行裁剪，最终得到的字符串为'01asdcf'

//去掉字符串的空格，返回一个新的字符串
a.trim(); //去掉a字符的前后空格，包括换行符等
a.trimStart()//去掉a字符串的前空格
a.trimEnd() //去掉a字符串的后空格

//快速的全部替换
let c ='12131245';
a.replace('12','00') //得到的字符串为00131245，只替换了一次
a.replaceAll('12','00') //得到的字符串为00130045
//如果替换的法则是正则，则必须加上g修饰符,不然会报错
a.replaceAll(/12/g,'00') //得到的字符串为00130045

//替换的字符串也可以是个函数
function changeString(){
    return '000'
}
a.replaceAll('12',changeString)

//获得模板字符串的结果
let index = '22';
String.raw`${index}456` //得到22456
~~~

### 正则

~~~javascript
两种写法：
let a = new regExp(/\s/);
let a = new regExp('s','g');
//还可以以变量的方式
let stringList = "asdsafwfefsjkjcj";
let test = 'asds'
let str = `^${test}`;
let regexp = new RegExp(str);

//第二种写法
let a = /\s/;
let b = 'asd vsfas'
//test方法，判断一个字符串中是否包含正则对象中的内容，包含则返回true
 a.test(b); //true

//exec方法，进行字符串截取方法，注意如果不加g修饰符，就算字符串中有多个符合的字符串，也只会返回第一个符合的字符串
let d = /a\w/
let c = 'ssa_sag'
d.exec(c) //得到["a_", index: 2, input: "ssa_sag", groups: undefined]
d.exec(c) //得到["a_", index: 2, input: "ssa_sag", groups: undefined]
//加上g修饰符
let d = /a\w/g
d.exec(c) //得到["a_", index: 2, input: "ssa_sag", groups: undefined]
d.exec(c) //得到["ag", index: 5, input: "ssa_sag", groups: undefined]

//lastIndex属性：
//RegEXP对象都会有这个属性，这个表明匹配从字符串的第几位开始，可进行改变
let d = /a\w/g
let c = 'ssa_sag'
d.lastIndex = 5
d.exec(c) //得到["ag", index: 5, input: "ssa_sag", groups: undefined],不从0开始，直接从5开始搜索，前提是在g修饰符的情况下


//字符串方法中有四种可使用正则：
str.match(/\s/) //返回匹配到的字符串，如果不加g或者y修饰符，则只会拿到一个字符串中的符合条件的字符串，加上的话会以数组返回
str.replace(/\s/,'') //取代，将匹配到的字符串用第二个参数值进行取代，不加g或者y修饰符只会替换字符串中一个符合条件的字符串
str.search(/\s/)//返回符合条件的第一个字符串的下标，无法使用g修饰符，且每次匹配都会从字符串的开头进行匹配
str.split(/\s/)//按照条件进行拆分

let a = /s/g
a.flags() //可获取到正则对象所用到的修饰符，得到g
//修饰符
/\s/i //表示匹配的内容不区分大小写
/\s/g //表示全局搜索，可用 str.exec(/\s/g)来获取匹配到的字符串,使用这个修饰符则不可以使用^头修饰符和$尾修饰符
/\s/m //表示多行匹配

/\s/y //与全局搜索类似，但不同的是，y修饰符必须从上一个匹配到的字符串之后的第一个字符开始进行搜索，特别重点注意，Y修饰符其实集合了^头修饰符
//例如
let c = 'asges';
let d = /s/g
let h = /s/y
d.exec(c) //得到s，不需要顾忌从字符串的第几位开始匹配，只要符合条件的就获取到
h.exec(c) //得到null，每次都从上一次找到符合字符串的下一位开始
d.sticky //false, 判断这个正则对象是否带有y修饰符
d.sticky //true, 判断这个正则对象是否带有y修饰符

/\s/u //u修饰符，使正则对象可以匹配utf-16的编码字符串
let a = '鷄'
let c = /鷄/
let d = /鷄/u

c.test(a)//false
d.test(a) //true
c.unicode //false,判断一个正则是否带有u修饰符
d.unicode //true,判断一个正则是否带有u修饰符

/\s/s //s修饰符，与.混合使正则对象能够匹配回车符\r、换行符\n等，做到真正的能匹配所有

let s = 'ervd\nde'
let d = /ervd.de/
let h = /ervd.de/s

d.test(s) //false
h.test(s) //true
d.doAll //false，判断一个正则对象是否带有s修饰符
h.doAll //true，判断一个正则对象是否带有s修饰符

//多数匹配
{n,m}//表示匹配个数，最少n个，最多m个
* //表示匹配数至少为0
+ //表示匹配数至少为1
? //表示匹配数为0或者1
A|B //表示和A或者B匹配

//快捷符
^a //表示字符串的必须以a开头
e$ //表示字符串必须以e结尾
\s //表示匹配空格
\S //表示匹配非空格
\w //表示匹配数字、字母、下划线
\W //表示匹配特殊字符串(例如<)
\d //表示匹配数字
\D //表示匹配一个非数字
.  //表示全部匹配

//正则的否定
/[^\d\s]/ //表示匹配的应该非数字非空格的字符


            //正则的一些匹配方法
            //前置断言，匹配必须在某某之前的字符串，规则/x(?=y)/
            let d = /\d+(?=%)/; //匹配必须在%号之前的数字
            let e = '100%er';
            let c = '100';
            d.test(e); //true
            d.test(c); //false
            //前置断言，匹配必须不在某某之前的字符串，规则/x(?!y)/
            let d = /\d+(?!%)/; //匹配必须不在%号之前的数字
            let e = '100%er';
            let c = '100';
            d.test(e); //false
            d.test(c); //true
            //后置断言，匹配必须在某某之后的字符串，规则/(?<=y)x/
            let d = /(?<=%)\d+/;
            let e = '%100er';
            let c = '100';
            d.test(e); //true
            d.test(c); //false
            //后置断言，匹配必须不在某某之后的字符串，规则/(?<!y)x/
            let d = /(?<!%)\d+/;
            let e = '%100er';
            let c = '100';
            d.test(e); //false
            d.test(c); //true

            //unicode特殊的匹配方法，用于匹配一些特殊字符规则/\p{}/
            let d = /\p{Number}/;
            let c = '①②';
            d.test(c); //true

            //具名组匹配,规则/(?<组名>d+)/
            //一般组匹配，拿到截取的数据的方法
            let f = /(\d+)-(\d+)/;
            let g = '2020-04';
            let h = f.exec(g); //得到一个数组[2020-04,,2020,04]
            //需要通过h[1],h[2]的方式拿到截取的字符串

            //具名组方式
            let f = /(?<year>\d+)-(?<month>\d+)/;
            let g = '2020-04';
            let h = f.exec(g); //得到一个对象，对象内有一个groups对象,groups:{year:2020,month:04}
            let year = h.groups.year;
            let month = h.groups.month;

            //可以结合解构的方式获取
            let {
                groups: { year, month }
            } = h;

            //配合replace方法进行替换,通过$<组名>来引用组
            let f = /(?<year>\d+)-(?<month>\d+)/;
            let g = '2020-04';
            g.replace(f, '$<month>-$<year>');

            //具名组的引用,通过\k<组名>
            let f = /(?<year>\d+)-\k<year>/;
            let g = '2020-04';
            f.test(g); //true
            //也可以通过\1来引用组名
            let f = /(?<year>\d+)-\1/; //效果与上面的相同
            let g = '2020-04';
            f.test(g); //true

            //一种提案，为exec()添加一个indices属性，用于获取截取字符串的开始位置和结束位置(还未通过)
            let d = /ac/;
            let h = d.exec('aseacfe');
            h.indices; //得到一个数组[[3,5]] //注意结束的位置是在截取的字符串的后一位
            //如果是具名
            let f = /(?<year>\d+)-(?<month>\d+)/;
            let h = f.exec('2020-04');
            let year = h.indices.groups.year; //[0,5]
            let month = h.indices.groups.month; //[6,8]

            //matchAll方法，可一次获得多个截取对象，注意使用时正则对象必须带有g修饰符,且返回一个遍历器对象
            //可以通过[...iterator]或者Array.from(iterator)将遍历器对象转为数组
            const string = 'test1test2test3';
            const regex = /t(e)(st(\d?))/g; //如果匹配的法则是正则，则需要带上g修饰符
           
 
            for (const match of string.matchAll(regex)) {
                console.log(match);
            }
            // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
            // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
            // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]

            // 和match的不同之处在于，match不会返回截取的字符串
            regex.match(string); //得到[test1,test2,test3]

//正则匹配的贪婪模式和懒惰模式
//默认的正则匹配都是贪婪模式的
let d = /\d*/
let c = 123456
d.exec(c) //得到123456，贪婪模式下，尽可能的获取满足正则的字符串

//懒惰模式，在数字匹配修饰符的后面加上?
let d = /\d*?/;
let c = /\d+?/;
let g = 123456;
d.exec(g) //得到""，因为.数字修饰符满足的最低条件是0个
c.exec(g) //得到1，因为+数字修饰符满足的最低条件是1个
~~~

### 解构赋值的原理

解构赋值的核心思想是利用iterator接口遍历对象或数组，再利用key值或者下标一一对应赋值

### module的使用

~~~javascript
     //es6的模块设定是编译时加载（静态加载），而不是运行时加载
        import {
            a,
            b,
            c
        } from 'test.js' //这个意思是从test.js文件中加载a,b,c三个方法，而不是执行test.js文件，在获取a，b，c三个方法

        require('test.js') //这种称为运行时加载，即是先执行test.js文件，再获取文件中的方法

        //es6模块默认使用严格模式
        // 变量必须声明后再使用
        // 函数的参数不能有同名属性，否则报错
        // 不能使用with语句
        // 不能对只读属性赋值，否则报错
        // 不能使用前缀 0 表示八进制数，否则报错
        // 不能删除不可删除的属性，否则报错
        // 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
        // eval不会在它的外层作用域引入变量
        // eval和arguments不能被重新赋值
        // arguments不会自动反映函数参数的变化
        // 不能使用arguments.callee
        // 不能使用arguments.caller
        // 禁止this指向全局对象
        // 不能使用fn.caller和fn.arguments获取函数调用的堆栈
        // 增加了保留字（比如protected、static和interface）

        //要注意this的指向，在模块中this并不指向window，而是undefined


        //export关键词，用于导出模块模块，只能写在顶层代码块中，不能写在函数或者其他代码块中
        //export导出的必须是有声明的有类型的
        let c = '22';
        export c //这样会报错
        //要写成以下方式
        export let c = '22';
        //或者
        let c = '22';
        export {
            c
        }

        //导出的数据发生了改变，被导出的数据也会实时改变
        let c = [];
        export {
            c
        }
        import {
            c
        } from 'test.js'
        c.push('2') //这时引入的test文件的c数组内就会增加一个'2'元素

        //导出的数据可以改变名字
        let c = [];
        export {
            c as testName
        }
        //引入的时候要用改变后的名字
        import {
            testName
        } from 'test.js'


        //import关键词，用于的导入模块，不管写在代码的前面还是后面，都会被第一个执行
        //如果多次引入同一个模块的同一个数据，那么只会执行一次
        //对引入的数据进行改名
        import {
            c as testName
        } from 'test.js'

        //import导入的模块数据是只读的，不可以进行修改，除非是修改导入数据对象内部的数据
        export let c = '22';
        import {c} from 'test.js'
        c = 66; //这样会报错

        export let c = {
            a: '22'
        };
        import {c} from 'test.js'
        c.a = 66; //这样不会错误

        // import是静态导入，所以不能使用变量，函数，或者可执行的代码
        import {
            c + a
        } from 'module'; //这样会报错

//test.js文件
//export let a ='22';
//export function abc(){
// }

//模块的整体加载
import * as test from 'test.js'; //这表示获取test文件的输出内容，并重命名为test,即得到一个test:{a:'22',abc:function(){}}

//模块的默认输出，即模块默认会输出这个内容
function abc(param) {}
export default abc
//等同于
export { abc as default }

import test from 'test' //这个test就是abc方法
//等同于使用export导出的
import { default as test } from 'test';
//即引入export导出的也引入export default导出的
import a, { b } from 'test'; //a代表以export default导出，b代表export导出

//继承模块
//test.js文件
export let a = '22';
export function abc() {}
export default {
    a: '2'
}
//当前是a.js文件
export * as test from 'test'; //这段的意思是在a文件引入test中的所有输出，并将这些引入输出，但是*会将忽略export default的输出内容，即拿不到{a:'2'}
export b from 'test'; //通过这样 修复上述问题
//注意通过export...from...获取的内容在当前文件中无法使用，即在a文件中无法使用test文件的abc函数，除非是import引入
export let c = '22';

//c.js文件
import * as name from 'a'; //得到a中所有导出

//跨模块共享常量，就是在一个公共文件中定义好所有的常量，并导出，再在需要的模块中引入

  //因为import无法动态加载（运行时加载）模块，且必须写在模块的顶层代码块中所以引入import()来进行改变
  //import()可以动态的加载，是一种异步的操作，加载结果返回一个Promise对象，在then中可以拿到引入模块的对象
        //test.js
        // export default{
        //     c:'33'
        // }
        let c = "./test.js";
        import(c).then((res) => {
            //这个res就是{c:'33'}
        });
        if (true) {
            //可以在条件语句中使用
            import("./test.js").then((res) => {
                //这个res就是{c:'33'}
            });
        }

//commonJs和ES6模块的区别
    commonJs采用module.exports = {}导出，ES6模块使用export和export default{}导出
    commonJs采用require导入，ES6模块采用import导入

    //commnJs导入得到的是一个拷贝值,而ES6模块得到的是值的引用
    //例如test.js文件
    export default {a:'2'}; ES6模块导出
    module.exports = {a:'2'}; commonJs模块导出
     
    //ES6模块
    import test from 'test.js'; test.a = '33';
    //得到的是值的引用,在当前文件中改变这个值的内容,源头的值也会发生变化
    //在当前文件中改变了a的值, 那么test.js文件中也会a变为'33',如果有其他文件也引用了test文件，那么此时在其他文件中a的值也为'33'
    
    //commonJs模块
    const test = require('test.js'); test.a = '44';
    //得到的是值的拷贝，在当前文件中改变了这个值的内容，源头的值不会发生变化
    //当前文件改变了a的值，但是在test.js文件中a的值不会发生改变

    //ES6模块是编译时加载的,commonJs模块是运行时加载的
    //ES6模块是异步加载进来的,commonJs模块是同步加载的

    //CommonJS模块加载ES6模块
    (async() => {
      let res =  await import('test.js');
    })();

    //ES6模块加载CommonJS模块
    import{createRequire} from 'module';
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    const cjs = require('./cjs.cjs'); 

    //在node.js环境中
    //node.js本身就支持CommonJS，所以默认每一个js文件都是CommonJS模块,如果要每一个js文件默认是ES6模块，需要在packge.json中写
    type:'module'  //这时候要使用CommonJS模块，需要将文件名改为.cjs
    //如果不修改packge.json的话就需要将ES6模块的文件名改为.mjs
    //在ES6模块中不能使用,arguments require module exports __filename  __dirname 这些变量

    //循环加载,即在a文件中加载了b文件，在b文件中加载了a文件
    //ES6模块中，要保证能正常的循环加载，就需要将两个文件互相引用的值转变为函数
    //a.js中
    import {bar} from "b.js";
    console.log('这是a文件');
    console.log(bar());
    function foo(){
        //注意必须写成函数的形式，函数表达式都不行
        return 'foo'
    }
    export {
        foo
    }
    //b.js中
    import {foo} from "a.js";
    console.log('这是b文件');
    console.log(foo());
    function bar(){
        //注意必须写成函数的形式，函数表达式都不行
        return 'bar'
    }
    export {
        bar
    }

    //从a文件开始执行得到的输出是
    //这是b文件
    //foo
    //这是a文件
    //bar
~~~

### module的加载实现

~~~javascript
 //加载js文件的方式,defer会使该js文件在当前Dom全部渲染完毕后一个一个加载js文件，即test1执行完毕后，test2文件再执行
    <script src='test1.js' defer></script>
    <script src='test2.js' defer></script>

    //async的方式不会在Dom完全渲染完毕后在执行，当某个文件下载完毕后，就会暂停dom的渲染，执行下载完毕的js文件 
    //同时它是无序的，例如test1和test2都是async类型加载的，但是并不会等test1执行完后再执行test2，而是谁先下载完毕，就先执行谁，执行完后再执行下一个
    <script src='test1.js' async></script>
    <script src='test2.js' async></script>

    //加载ES6模块需要标明它的类型
    <script src='test1.js' type="module" async></script>
    //注意在ES6模块中，顶层的this并不等于window，而是等于undefined，可以利用这点判断当前模块是不是ES6模块 

~~~

### 装饰器的使用（可能会有大变）

~~~javascript
      //装饰器的使用，可以更好帮助我们了解类型
        //装饰器写在类的class前面 以@+函数名的形式构成
        function test(age) {
            //这里传入进来的age 实际上就是装饰的类，即Age类
            age.number = 12;
        }
        @test
        class Age() {

        }
        new Age.number //得到1

        //装饰类的函数，如果希望能够传入参数，那么就需要在装饰函数中返回一个函数
        function testRest(param) {
            return (age) => {
                //返回的这个函数才是真正的装饰函数，age代表的就是装饰的类
                //这样定义的是静态成员
                age.number = param;

                //这样定义则定义在类的原型上
                age.prototype.number = param;
            }
        }
        @testRest(23) class Age() {

        }
        new Age.number //得到23

        //装饰函数可以用于装饰类中的方法
        function testFun(object, name, descriptor) {
            //object代表方法的prototype
            //name代表prototype上的一个属性,
            //descriptor代表对这个属性的描述，例如是否可以写入、遍历等
        }
        class Age() {
            @testFun name() {

            }
        }

        //如果有多个装饰函数，那么会从外到内，再从内执行到外
        function dec(id) {
            console.log('evaluated', id);
            return (target, property, descriptor) => console.log('executed', id);
        }

        class Example {
            @dec(1)
            @dec(2)
            method() {}
        }
        // evaluated 1
        // evaluated 2
        // executed 2
        // executed 1

        //装饰器不能使用在函数上

        //mixin的写法
        //在mixin.js文件中
        function foo() {}
        export function mixin(...rest) {
            return (target) => {
                Object.assign(target.property, {
                    foo
                })
            }
        }
        //在要用的文件中
        import mixin from "mixin.js";
        @mixin(22) class C {

            }
            //这样在类C的prototype上就会有一个foo方法
            //但是这样如果方法重名，那么就会覆盖类C的prototype上的方法
~~~

### apply、call和bind的使用

* 三者都可以显式绑定函数的this指向

* 三者第一个参数都是this要指向的对象，若该参数为undefined或null，this则默认指向全局window

* 传参不同：apply是数组、call是参数列表，而bind可以分为多次传入，实现参数的合并

* call、apply是立即执行，bind是返回绑定this之后的函数，如果这个新的函数作为构造函数被调用，那么this不再指向传入给bind的第一个参数，而是指向新生成的对象

~~~javascript
//传入参数的方式不同
object.apply(null,[1,2,3]);
object.bind(null,1,2,3)(); //bind返回的是一个函数，需要()来使这个函数立即运行
object.call(null,1,2,3)

// 手写call
Function.prototype.Call = function(context, ...args) {
  // context为undefined或null时，则this默认指向全局window
  if (!context || context === null) {
    context = window;
  }
  // 利用Symbol创建一个唯一的key值，防止新增加的属性与obj中的属性名重复
  let fn = Symbol();
  // this指向调用call的函数
  context[fn] = this; 
  // 隐式绑定this，如执行obj.foo(), foo内的this指向obj
  let res = context[fn](...args);
  // 执行完以后，删除新增加的属性
  delete context[fn]; 
  return res;
};

// apply与call相似，只有第二个参数是一个数组，
Function.prototype.Apply = function(context, args) {
  if (!context || context === null) {
    context = window;
  }
  let fn = Symbol();
  context[fn] = this;
  let res = context[fn](...args);
  delete context[fn];
  return res;
};

// bind要考虑返回的函数，作为构造函数被调用的情况
Function.prototype.Bind = function(context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  let fn = this;
  let f = Symbol();
  const result = function(...args1) {
    if (this instanceof fn) {
      // result如果作为构造函数被调用，this指向的是new出来的对象
      // this instanceof fn，判断new出来的对象是否为fn的实例
      this[f] = fn;
      let res = this[f](...args1, ...args);
      delete this[f];
      return res;
    } else {
      // bind返回的函数作为普通函数被调用时
      context[f] = fn;
      let res = context[f](...args1, ...args);
      delete context[f];
      return res;
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(fn.prototype);
  return result;
};

~~~

### this指针

**this的5种绑定方式**

* 默认绑定(非严格模式下this指向全局对象，严格模式下函数内的this指向`undefined`)

* 隐式绑定(当函数引用有上下文对象时, 如 `obj.foo()`的调用方式, foo内的this指向`ob`)

* 显示绑定(通过call或者apply方法直接指定this的绑定对象, 如`foo.call(obj)`)

* new构造函数绑定，this指向新生成的对象

* 箭头函数，this指向的是定义该函数时，外层环境中的this，**箭头函数的this在定义时就决定了，不能改变**

~~~javascript
"use strict";
var a = 10; // var定义的a变量挂载到window对象上
function foo () {
  console.log('this1', this)  // undefined
  console.log(window.a)  // 10
  console.log(this.a)  //  报错，Uncaught TypeError: Cannot read properties of undefined (reading 'a')
}
console.log('this2', this)  // window
foo();
// 注意：开启了严格模式，只是使得函数内的this指向undefined，它并不会改变全局中this的指向。因此this1中打印的是undefined，而this2还是window对象。


let a = 10
const b = 20
function foo () {
  console.log(this.a)  // undefined
  console.log(this.b)  // undefined
}
foo();
console.log(window.a) // undefined  
// 如果把 var 改成了 let 或 const，变量是不会被绑定到window上的，所以此时会打印出三个undefined


var a = 1
function foo () {
  var a = 2
  console.log(this)  // window
  console.log(this.a) // 1
}
foo()
// foo()函数内的this指向的是window，因为是window调用的foo，打印出的this.a是window下的a



var obj2 = {
    a: 2,
    foo1: function () {
      console.log(this.a) // 2
    },
    foo2: function () {
      setTimeout(function () {
        console.log(this) // window
        console.log(this.a) // 3
      }, 0)
    }
  }
  var a = 3
 
  obj2.foo1()
  obj2.foo2() 
// 对于setTimeout中的函数，这里存在隐式绑定的this丢失，也就是当我们将函数作为参数传递时,会被隐式赋值，回调函数丢失this绑定，因此这时候setTimeout中函数内的this是指向window

let c ={ a:2,foo:function(){console.log(this,this.a)}}
undefined
let d = {a:3,foo:function(fn){fn()}}

var a= 4

d.foo(c.foo) // window 4

// 由此可以看出当把任意一个函数当作参数传递给一个函数时，那么这个函数内部的this就会丢失，从而指向全局的window对象（如果是严格模式下，则指向undefined）


var obj = {
 name: 'obj',
 foo1: () => {
   console.log(this.name) // window
 },
 foo2: function () {
   console.log(this.name) // obj
   return () => {
     console.log(this.name) // obj
   }
 }
}
var name = 'window'
obj.foo1()
obj.foo2()()

// 箭头函数内的this是由外层作用域决定的
// 对于obj.foo1()函数的调用，它的外层作用域是window，对象obj当然不属于作用域了(作用域只有全局作用域、函数作用域、块级作用域)，所以会打印出window
// obj.foo2()()，首先会执行obj.foo2()，这不是个箭头函数，所以它里面的this是调用它的obj对象，因此第二个打印为obj，而返回的匿名函数是一个箭头函数，它的      this由外层作用域决定，那也就是它的this会和foo2函数里的this一样，第三个打印也是obj


~~~

### 原生Ajax写法

~~~javascript
 const xml = new XMLHttpRequest();
        xml.open('get', '') //打开链接，第一个参数的请求的类型，第二个参数是请求的路径
            //open之后才可以设置请求头的一些数据
        xml.setRequestHeader('Content-type', 'application/json');
        //发送数据,如果是post请求的话
        xml.send();

        //监听请求的整个过程
        xml.onreadystatechange = function() {
            switch (xml.readyState) {
                case 0: //表示成功创建xmlHttpRequest对象
                case 1: //表示已经与服务端建立连接
                case 2: //表示正在传输数据给服务端
                case 3: //表示服务端正在处理数据，这个时候也可以获取返回的数据，但是只能获取到一部分返回的数据
                case 4:
                    //可以接收到服务端返回的全部数据
                    xml.responseText //响应报文
                    xml.response //响应对象
            }
        }

        //取消请求
        xml.abort();
~~~

### promise异步函数

~~~javascript
promise使单线程的js多出了异步模式，即微任务(其内部是同步代码，即js会先执行其内部的代码，而其成功回调是微任务)

状态： 默认运行是为pending
      成功回调后为fulfilled
      失败回调后为rejected

let c = new XMLHtttpRequest() 
let a = new Promise(function(resolve,reject){
          //这里执行异步任务，并且设定好何时调用resolve，何时调用rejcet
    if(c.onreadystatechange === 4){
        if(readystate === '200'){
            resolve(c.responseText);
        }else{
            reject()
        }
    }
    c.open(method,url);
    c.send(data);
}).then(function(res){
       //成功回调，执行resolve中函数
}，function（error）{
        //then中可以传两个方法，一个是成功的，一个是失败的，但是一般不在then中处理失败
        }
       ).catch(function(error){
           //处理reject中的函数，即失败的回调
       }).finally(function(){
           //不管成功或者失败都会执行这个函数
       }) 


//promise的一些方法
Promise.all([promise1,promise2]).then(result=> {
    //result为一个数组，包含了promise1和promise2中成功后返回的数据
    //then方法的调用必须是在promise1和promise2全部执行完以后才会被调用
})
Promise.race([promise1,promise2]).then(res => {
     //res为最先执行完的那个promise返回的数据    
})
//构成promise对象
Promise.resolve()会将传入的内容包装成promise对象,然后返回这个promise对象
//如果resolve中传入的是一个promise对象,那么会将这个对象直接返回
//如果传入resolve中的是带有then方法的对象，那么会执行这个对象的then方法,然后将结果包装为promise对象返回
let thenObj = {
    then(resolve,reject){
        resolve('66')
    }
};
Promise.resolve(thenObj).then(res => console.log(res)) //输出'66'
//如果传入的不是promise对象,也没有then方法
let test = '44';
Promise.resolve(test).then(res => console.log(res)) //输出'44'
//实际的转化
new Promise(resolve => resolve(test))
//不带任何参数的话,resolve会创造一个空的promise且将它的状态变为resolve
Promise.resolve();
//等同于
new Promise(resolve => resolve())

//Promise.reject也会将传入内容包裹为promise对象,并将其状态变为reject,注意Promise.reject中传入内容，会原原本本的传入reject方法中，不管传入的是什么
Promise.reject('22');
//等同于
new Promise(resolve,reject => reject('22'));

let thenObj = {
    then(resolve,reject){
        resolve('66')
    }
};
Promise.reject(thenObj).then(res => console.log(res)) 
//输出
//{
//then(resolve,reject){
  //    resolve('66')
  //  }
//}

//promise允许两个then回调的使用
function callBack(){
    return new Promise((resolve,reject)=> {
        
    }).then(()=>console.log('执行1'))
}
callBack().then(()=>console.log('执行2')) //当异步任务结束以后，会先输出执行1，再输出执行2
~~~

### async/await语法糖

* `async`函数是`generator`（迭代函数）的语法糖

* `async`函数返回的是一个Promise对象，有无值看有无return值

* `await`关键字只能放在`async`函数内部，await关键字的作用 就是获取Promise中返回的resolve或者reject的值

* `async、await`要结合`try/catch`使用，防止意外的错误

~~~javascript
// 这个方法的引入只是为了使异步的代码看起来像同步一样，且不再写then来回调

async function adc (){
      //async表明此方法为异步方法
     await promise  //await后面必须是promise对象，await会暂停异步函数的执行，即只有promise对象执行完毕，且返回数据后， 函数才会继续执行
    
    //这里面没有获取错误的方法，要通过try/cacth来捕获错误
    try {
         await promise
    } catch(err){
         
    }
      
}

adc() //会返回一个promise对象，告诉底层此为一个异步执行的方法
~~~

### Generator函数

每次调用`Generator函数`就会返回一个`iterator`遍历器对象，不断的调用这个遍历器对象的`next`方法，可以拿到在Generator函数中使用`yield关键词`返回的内容

* `generator函数`跟普通函数在写法上的区别就是，多了一个星号`*`

* 只有在generator函数中才能使用`yield`，相当于generator函数执行的`中途暂停点`

* generator函数是不会自动执行的，每一次调用它的`next`方法，会停留在下一个yield的位置

~~~javascript
function *test(){
     yield 10;
     yield 30;
     yield 20;
}
let testIterator = test();
testIterator.next();//返回一个对象，{vlaue:10,done:false}
testIterator.next();//返回一个对象，{vlaue:30,done:false}
testIterator.next();//返回一个对象，{vlaue:20,done:false}
testIterator.next();//返回一个对象，{vlaue:undefined,done:true}，当done为true时，表明已经执行完generator函数
~~~

**generator函数**转换为**`async、await`**

~~~javascript
const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000));
async function test() {
  const data = await getData();
  console.log("data: ", data);
  const data2 = await getData();
  console.log("data2: ", data2);
  return "success";
}
test().then(res => console.log(res))

// 将上面示例转化为generator函数
function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}

// 手动执行generator函数

// 执行结果与`async、await`示例一致
const getData = () =>
  new Promise(resolve => setTimeout(() => resolve("data"), 1000));

function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}
var gen = testG();
var dataPromise = gen.next();
dataPromise.value.then(value1 => {
  // data1的value被拿到了，继续调用next
 
  var data2Promise = gen.next(value1);
  // 调用的generator的next方法时，传入一个值时，这个值就代表着上次yield返回的内容
  // 上述的value1就代表着在 testG()方法中data的值等于value1
    
  data2Promise.value.then(value2 => {
    // data2的value拿到了 继续调用next并且传递value2
    gen.next(value2);
  });
});

~~~

### 箭头函数

~~~javascript
特点：
//没有this指针，在它里面获取时，this指针为其上一层中的this，所以箭头函数中的this不由调用者决定，而由其定义时的上一层对象决定
//即箭头函数在声明的时候就绑定自身的this指向(为其上一层对象),而不是像普通函数一样在调用的时候决定其内部this的指向
let b = {
    a:'c',
    d:function (){
         return ()=>{
              console.log(this.a) 
         }
    }
}
b.d()() //输出'c'

//普通函数
let common = {
    a:'d',
    d:function(){
       return function(){
              console.log(this.a) 
         }
    }
}
common.d()() //输出undefined

//不能通过new创建
// 不能使用argement参数
//不能当做generator函数
~~~

### symbol类型

~~~javascript
用于保证对象的属性名是唯一的
let a = Symbol() // 不可用new来构造

let s = {
     
}
s[a] = 's' //通过[]来为对象添加属性，和获取Symbol类型的属性值
let s = {
    [a]:'c'  //在对象内也要通过[]来定义
}

s.a // 不可以通过.运算符来添加和获取，因为.运算符后面的是字符串

let b = Symbol('a') 
console.log(b) //得到Symbol('a') //传入参数主要是为了区分Symbol

for..in 和 object.keys()都不可以得到对象中的Symbol属性，只能通过Obejct.getOwnPropertySymbols()来获取
~~~

属性：

* `Symbol.length`: 长度属性，值为`0`。

* `Symbol.prototype`: `symbol`构造函数的原型。

* `Symbol.iterator`: 返回一个对象默认迭代器的方法，被`for...of`使用。

* `Symbol.match`: 用于对字符串进行匹配的方法，也用于确定一个对象是否可以作为正则表达式使用，被`String.prototype.match()`使用。

* `Symbol.replace`: 替换匹配字符串的子串的方法，被`String.prototype.replace()`使用。

* `Symbol.search`: 返回一个字符串中与正则表达式相匹配的索引的方法，被`String.prototype.search()`使用。

* `Symbol.split`: 在匹配正则表达式的索引处拆分一个字符串的方法，被`String.prototype.split()`使用。

* `Symbol.hasInstance`: 确定一个构造器对象识别的对象是否为它的实例的方法，被`instanceof`使用。

* `Symbol.isConcatSpreadable`: 布尔值，表明一个对象是否应该`flattened`为它的数组元素，被`Array.prototype.concat()`使用。

* `Symbol.unscopables`: 拥有和继承属性名的一个对象的值被排除在与环境绑定的相关对象外。

* `Symbol.species`: 一个用于创建派生对象的构造器函数。

* `Symbol.toPrimitive`: 一个将对象转化为基本数据类型的方法。

* `Symbol.toStringTag`: 用于对象的默认描述的字符串值，被`Object.prototype.toString()`使用。

方法：

`Symbol.for(key)`
`Symbol.for(key)`方法会根据给定的键`key`，来从运行时的`symbol`注册表中找到对应的`symbol`，如果找到了就返回它，否则就新建一个与该键关联的`symbol`，并放入全局`symbol`注册表中。和`Symbol()`不同的是，用`Symbol.for()`方法创建的的`symbol`会被放入一个全局`symbol`注册表中。当然`Symbol.for()`并不是每次都会创建一个新的`symbol`，它会首先检查给定的`key`是否已经在注册表中了。假如是则会直接返回上次存储的那个，否则它会再新建一个。

* `key`: 一个字符串，作为`symbol`注册表中与某`symbol`关联的键，同时也会作为该`symbol`的描述。

```javascript
var s1 = Symbol.for();
var s2 = Symbol.for("s");
var s3 = Symbol.for();
var s4 = Symbol.for("s");
console.log(s1 === s3); // true
console.log(s2 === s4); // trueCopy to clipboardErrorCopied
```

`Symbol.keyFor(sym)`
`Symbol.keyFor(sym)`方法用来获取全局`symbol`注册表中与某个`symbol`关联的键，如果全局注册表中查找到该`symbol`，则返回该`symbol`的`key`值，返回值为字符串类型，否则返回`undefined`。

* `sym`: 必选参数，需要查找键值的某个`Symbol`。

```javascript
var s1 = Symbol();
var s2 = Symbol.for("s");
var key1 = Symbol.keyFor(s1);
var key2 = Symbol.keyFor(s2);
console.log(key1); // undefined
console.log(key2); // sCopy to clipboardErrorCopied
```

`symbol.toString()`
`toString()`方法返回当前`symbol`对象的字符串表示，`Symbol`对象拥有自己的`toString`方法，因而遮蔽了原型链上的`Object.prototype.toString()`，`symbol`原始值不能转换为字符串，所以只能先转换成它的包装对象，再调用`toString()`方法。

```javascript
var s = Symbol.for("s");
console.log(s.toString()); // Symbol(s)
console.log(Object(Symbol("s")).toString()); // Symbol(s)Copy to clipboardErrorCopied
```

`symbol.valueOf()`
`valueOf()`方法返回当前`symbol`对象所包含的`symbol`原始值。在`JavaScript`中，虽然大多数类型的对象在某些操作下都会自动的隐式调用自身的`valueOf()`方法或者`toString()`方法来将自己转换成一个原始值，但`symbol`对象不会这么干，`symbol`对象无法隐式转换成对应的原始值。

```javascript
var s = Symbol.for("s");
console.log(s.valueOf()); // Symbol(s)
```

### proxy代理对象

~~~javascript
Proxy对象：用于对一个对象进行拦截操作，即获取或者修改对象都必须经过这层拦截操作

let proxy = new Proxy(target,handle);
//target:要代理的对象，可以是对象、数组和函数或者另外一个代理对象
//handle:要进行拦截的操作

let b = {
     a:'c'
}
let proxy = new Proxy(b,{
    //new Proxy会返回一个对象，返回的这个对象才有拦截操作，而对目标对象b来说并没有，除非将b赋值为此返回的对象
    get:function(target,key,proxy){
          //target 代表目标对象b
          //key 代表要获取的属性名
          //proxy 代表proxy构造函数，即new后面的这个Proxy对象
        console.log(target,key,proxy)
         //没有操作则返回原属性值
         
    },
    set:function(target,key,newValue){
         // target 代表目标对象b
         // key 代表要修改的属性名
         // newValue 代表修改后的属性值
        console.log(target,key,newValue)
        //没有操作则返回原属性值
    
}    
})
//只有拿proxy才会触发拦截操作，直接拿b对象，是不会触发拦截操作
proxy.a //得到“c”  同时输出 b{a:'c'}, a, Proxy{target:b{a:'c'},handle:{get,set}}
proxy.a = 'b' //输出 b{a:'c'} ， a , 'b'

new Proxy(obj,{
 apply(taget,contentThis,args){
    //taget:要代理的方法
    //contentThis:这个方法的上文的对象（即this）
    //args：传入的参数数组
    在调用代理的方法，和使用apply、call时触发
 }
 has(target,key){
   //target:代理的对象
   //key：调用的属性名
   在判断一个属性名是否在一个对象时触发 （ test in obj 触发）
 }
 constuctor（target，args）{
    //taget:要代理的构造方法
    //args：传入的参数数组
    在new一个对象时触发
 }
 deleteProperty（target,key）{
  //target:代理的对象
   //key：调用的属性名
   在删除一个属性名时触发，即 delete obj.a
 }
})
//proxy中的所有拦截方法都需要return
//proxy中所用的this指向的是new Proxy返回的对象，而不是obj这个目标对象

撤销代理
proxy.revocable() //调用此方法会销毁产生的代理对象proxy，同时代理的源对象或者方法也可能被垃圾回收机制回收
~~~

其中handle对象中有的方法：

* `handler.getPrototypeOf()`: `Object.getPrototypeOf`方法的捕捉器。
* `handler.setPrototypeOf()`: `Object.setPrototypeOf`方法的捕捉器。
* `handler.isExtensible()`: `Object.isExtensible`方法的捕捉器。
* `handler.preventExtensions()`: `Object.preventExtensions`方法的捕捉器。
* `handler.getOwnPropertyDescriptor()`: `Object.getOwnPropertyDescriptor`方法的捕捉器。
* `handler.defineProperty()`: `Object.defineProperty`方法的捕捉器。
* `handler.has()`: `in`操作符的捕捉器。
* `handler.get()`: 属性读取操作的捕捉器。
* `handler.set()`: 属性设置操作的捕捉器。
* `handler.deleteProperty()`: `delete`操作符的捕捉器。
* `handler.ownKeys()`: `Reflect.ownKeys`、`Object.getOwnPropertyNames`、`Object.keys`、`Object.getOwnPropertySymbols`方法的捕捉器。
* `handler.apply()`: 函数调用操作的捕捉器。
* `handler.construct()`: `new`操作符的捕捉器。

### reflect对象

`Reflect`是`ES6`起`JavaScript`内置的对象，提供拦截`JavaScript`操作的方法，这些方法与`Proxy`对象的`handlers`中的方法基本相同。

`Reflect`并非一个构造函数，所以不能通过`new`运算符对其进行调用，或者将`Reflect`对象作为一个函数来调用，就像`Math`对象一样，`Reflect`对象的所有属性和方法都是静态的。
实际上`Reflect`对象是`ES6`为操作对象而提供的新`API`，而这个`API`设计的目的主要有：

* 将`Object`对象的一些属于语言内部的方法放到`Reflect`对象上，从`Reflect`上能拿到语言内部的方法，例如`Object.defineProperty`方法。
* 修改某些`Object`方法返回的结果，例如`Object.defineProperty(obj, name, desc)`方法在无法定义属性的时候会抛出异常，而`Reflect.defineProperty(obj, name, desc)`方法在操作失败时则会返回`false`。
* 让`Object`的操作都变成函数行为，例如`Object`的命令式`name in obj`和`delete obj[name]`与`Reflect.has(obj, name)`、`Reflect.deleteProperty(obj, name)`相等。
* 使`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要`Proxy`对象上能够定义的`handlers`方法`Reflect`也能找到。

### set数据类型

~~~javascript
//类似数组的新解构，有iterator属性，所以可以使用for...of进行循环，但注意不是of的set对象
//set解构可以去重，且使用的是精确对等，即‘5’和5是不相同的
//set解构传入一个数组，但不会改变数组内部任何一个对象的类型

本身带有的方法：
let a = new Set([1,2,3,2,3]) // a的结果为类似数组的[1,2,3],这表明其有去重的特性
a.add(0) //往其中添加一个值
a.delete(2)//删除其中2的值
a.has(2) //判断其中是否有2这个值
a.clear() //清空a中的所有值

可转化为数组，然后使用数组的方法：
[...a].map(item => {})

遍历的方法：
(1) keys： a.keys() //返回一个a中所有元素值的iterator遍历器，需要通过[...a.keys()]或者Array.from(a.keys())转化为数组
(2) values: a.values() //结果同上
(3) entries:a.entries() //返回一个类似[[1,1],[2,2]]的遍历器，也需要通过转化，才能使用数组方法

去重：
let a = [1,2,1,2,3,4,5,6,5];
let c = [...new Set(a)];

求两数组并集、差集和交集：
let a = [1,2];
let b = [2,3,4]
并集：
let c = [...new Set(a),...newSet(b)];
交集：
let d = [...new Set(a)].filter(item => new Set(b).has(item))
差集：
let g = [...new Set(a)].filter(item => !new Set(b).has(item))
~~~

### weakSet类型

~~~javascript
//只能由对象构成，不可以遍历，没有size属性，所以无法获取其内容长度
let temp = new weakSet(); //构建
temp.add({}) //添加元素
temp.delete() //删除元素
temp.clear() //清空整个对象
//因为其不进入垃圾清理机制，或者说弱引用，所以一帮用来存储一组DOM节点，或者临时存放一组对象
~~~

### Map数据类型

~~~javascript
//ES6新增的一种数据结构，是真正的键-值对的结构

let temp = new Map();
temp.set("a",1); //添加成员
temp.get("a"); //获取成员
temp.delete("a"); //删除成员
temp.has("a"); //判断是否有该成员
temp.clear();// 清除对象内全部成员

遍历的方法
//因为有itrator接口所以可以通过 for..of进行循环,但是循环的必须是以下值
temp.keys(); //返回只有键名的遍历器
temp.values();//返回只有键值的遍历器
temp.entires();//返回以键值对形式的遍历器
~~~

### weakMap数据类型

~~~javascript
//键名必须是对象的结构，同样是弱引用，主要用于以DOM节点作键名的时候，利用这个可以不用考虑使用这个DOM节点创建事件后需要取消事件。
//不可遍历，所以没有size属性
let temp = new weakMap();
temp.set({},{}) //添加元素
temp.get({}) //获取元素
temp.delete() //删除元素
temp.clear() //清空整个对象
~~~

### 闭包

概述：闭包指的是在一个函数中将返回或者在window对象上挂载一个函数，这个函数能使用包裹其函数的内部变量。

作用：

* 防抖
* 节流
* 定义私有变量
* 模拟块级作用域
* 防止全局变量污染

~~~javascript
function constant(){
  let name = 'asd';
  let test = function () {
    console.log(name+'er')
  }
  return test
}
let teOne = constant();
let teTwo = constant();
teOne() //‘asder'
teTwo() // 'asderer'
~~~

* 对回调提供支持

~~~javascript
function constant(){
  let name = 'asd';
  let test = function () {
    console.log(name+'er')
  }
 setTimeOut(test,1000)
}
constant();

~~~

缺点：

* 造成内存泄漏，因为外层包裹函数中定义的变量，不会被垃圾回收机制回收，而存在于内存之中
* 在处理速度和内存的消耗上对脚本的性能有负面影响

### 节流与防抖

`节流`与`防抖`实际上都是通过减少回调函数的执行数来达成降低浏览器性能损耗的。

不同：

* 节流是在事件不断自动触发的一段时间内，保证回调函数只在一定时间后被触发一次，减少回调函数的执行数
* 防抖是在事件被人为的不断触发的一段时间内，保证当停止事件触发的一定时间后执行回调函数，减少回调函数的执行数

防抖

~~~javascript
//延迟防抖，即事件最后被触发的一段时间后，才执行回调函数
//核心：利用闭包，定义一个定时器，事件每次被触发后，就会把原先的定时器去除，产生新的定时器，只有等定时器被完整的执行完后，才执行回调函数

function debounce(waitTime,callBack){
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(callBack,waitTime);
    }
}
window.onscroll = debounce(1000,()=>console.log('1')) //表明当事件被最后触发之后的1秒以后，执行回调函数

//立即防抖，即事件触发后立即执行一次回调函数，但之后必须等到一定时间后才会执行回调函数，在此期间事件被触发多少次都不会执行回调函数
//核心：利用闭包，设定一个时间对象，当这个时间对象为空时，执行回调函数，之后清除这个时间对象，在重新通过setTimeout设定时间对象，且新时间对象的回调函数是将这个对象设置为空。
function debounce(waitTime,callBack){
    let timer = null,
       return () => {
            if(!timer){
                 callBack();
            }
           clearTimeout(timer);
           timer = setTimeout(()=>timer=null,waitTime)
       }
}
window.oncsroll = debounce(1000,()=>console.log('1'))
~~~

节流

~~~javascript
//时间戳方式
//核心：通过判断当前事件触发的时间戳和上一次事件触发的时间戳的差是否大于规定的时间，大于则执行回调函数，不大于则不执行回调函数。

function throttle(waitTime,callBack){
    let lastTime = 0;
    renturn () => {
        let now = new Date().now();
        if(now-lastTime >= waitTime){
             callBack();
            lastTime = now;
        }
    }
}

window.onscroll = throttle(1000,()=>console.log('1'));

//定时器方式
//核心：利用闭包，当一个时间对象为空时，执行回调函数，同时将时间对象重新通过setTimeout赋值，且其回调函数是将这个时间对象设置为空。

function throttle(waitTime,callBack){
     let timer = null;
    return () => {
        if(!timer){
            callBack();
            timer = setTimeout(()=>timer = null,waitTime)
        }
    }
}
window.onscroll = throttle(1000,()=>console.log('1'))
~~~

修改成vue框架的写法，是不需要以闭包的方式来保留timer的状态

### 全局变量污染

指的是在代码的不同部分定义相同名字的全局变量且其用途不同时，命名发生冲突，就会发生全局变量污染（即在一个部分内改变这个全局变量则另外一部分也会发生改变）

~~~javascript
//将所有的全局变量放置在一个对象内，类似vue的data对象
//namespace模式就是把变量装在对象里面，在全局定义一个对象，然后把所有的你想写的全局变量定义在对象内部。你可以随时打印对象查询你是否定义过某个变量
let obj={
a：“1”，
b：“2”}
//namespace模式的缺点：就是由于我们把变量装在了一个对象当中，对象内部的东西是可以通过操作对象的方式进行增删改查的，不安全

//使用自执行匿名函数的方式
 (function(window){
     let msg="module4";
     function foo(){
         console.log("foo()",msg);
     }
     window.module4=foo; 
     // 我们在window对象上写入一个属性名为module4属性值为foo函数 
    })()



~~~

### 匿名函数和自执行函数

匿名函数即不需要函数名的函数，但必须将其赋值给一个变量，或者令其自执行，不然这个匿名函数毫无意义。

~~~javascript
let test = (){
     console.log(1)
}

~~~

自执行函数即不需要调用的函数，在定义的时候就会执行。

~~~javascript
(()=>{
    console.log(1)
})()

//传入参数
((item)=>{
  console.log(item)
 })(22)   //按照item的值，立刻执行一遍，常用于循环中

~~~

简写方法(可去掉包裹函数的括号，但必须是在函数的表达式的时候)：

~~~javascript
let i = (item)=>{
    console.log(item)
}(item)
~~~

### `EventLoop`（事件循环）

js是一门单线程的语言，这意味着js中的任务必须一件一件的执行，哪怕前面的任务需要话很长的时间，排在后面的任务也必须等前面的任务执行完后再执行

广义上将任务定义为以下两种类型：

* **同步任务**，不需要花费时间去等待执行的任务
* **异步任务**，需要花费时间去等待执行的任务

js执行时：

* 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数

* 当指定的事情完成时，Event Table会将这个函数移入Event Queue

* 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行

* 上述过程会不断重复，也就是常说的Event Loop(事件循环)

![image-20221129000816957](image-20221129000816957.png)

代码层面的解析：

~~~javascript
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');

~~~

* ajax进入Event Table，注册回调函数success
* 执行console.log('代码执行结束')
* ajax事件完成，回调函数success进入Event Queue（任务队列）
* 主线程从Event Queue读取回调函数success并执行

从上面可以知道 **异步任务花费的时间决定着其回调函数进入Event Queue中的时候**

js将任务更将精细的定义为以下两种：

* **macro-task(宏任务)**：script全部代码（注意同步代码也属于宏任务）、setTimeout、setInterval、setImmediate（node.js环境）、I/O - UI交互事件、postMessage、MessageChannel
* **micro-task(微任务)**：Promise，MutationObserver

**以上两种任务会分别进入到不同的Event Queue中，不同的是在于两个任务队列的执行时机**

![image-20221129004750481](image-20221129004750481.png)

setTimeout和setInterval的解释：

setTimeout和setInterval中传入的时间决定着其回调函数什么时候被压入进宏队列中

```javascript
setTimeout(() => {
    task()
},3000)

sleep(10000000)
```

上述代码的执行过程：

* `task()`进入Event Table并注册,计时开始
* 执行`sleep`函数，很慢，非常慢，计时仍在继续
* 3秒到了，计时事件`timeout`完成，`task()`进入Event Queue，但是`sleep`也太慢了吧，还没执行完，只好等着
* `sleep`终于执行完了，`task()`终于从Event Queue进入了主线程执行

上述的流程走完，我们知道`setTimeout`这个函数，是经过指定时间后，把要执行的任务(本例中为`task()`)加入到Event Queue中，又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间远远大于3秒

我们还经常遇到`setTimeout(fn,0)`这样的代码，0秒后执行又是什么意思呢？是不是可以立即执行呢？

答案是不会的，`setTimeout(fn,0)`的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。举例说明：

```javascript
//代码1
console.log('先执行这里');
setTimeout(() => {
    console.log('执行啦')
},0);
复制代码
//代码2
console.log('先执行这里');
setTimeout(() => {
    console.log('执行啦')
},3000);  

```

代码1的输出结果是：

```javascript
//先执行这里
//执行啦
```

代码2的输出结果是：

```javascript
//先执行这里
// ... 3s later
// 执行啦
```

关于`setTimeout`要补充的是，即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒

`setInterval`是循环的执行。对于执行顺序来说，`setInterval`会每隔指定的时间将注册的函数置入Event Queue，如果前面的任务耗时太久，那么同样需要等待。

需要注意的一点是，对于`setInterval(fn,ms)`来说，我们已经知道不是每过`ms`秒会执行一次`fn`，而是每过`ms`秒，会有`fn`进入Event Queue。一旦**`setInterval`的回调函数`fn`执行时间超过了延迟时间`ms`，那么就完全看不出来有时间间隔了**

**代码解释事件循环：**

~~~javascript
// 在此暂时将process.nextTick当作微任务的一种，实际上process.nextTick比微任务更早执行
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

~~~

第一轮事件循环流程分析如下：

* 整体script作为第一个宏任务进入主线程，遇到`console.log`，输出1
* 遇到`setTimeout`，将其记录在Event Table中，当其花费的时间结束后，将其回调函数被分发到宏任务Event Queue中。我们暂且记为`setTimeout1`。
* 遇到`process.nextTick()`，将其记录在Event Table中，当其花费的时间结束后，将其回调函数被分发到微任务Event Queue中。我们记为`process1`。
* 遇到`Promise`，`new Promise`直接执行，输出7。将其记录在Event Table中，当其花费的时间结束后，将`then`分发到微任务Event Queue中。我们记为`then1`。
* 又遇到了`setTimeout`，将其记录在Event Table中，当其花费的时间结束后，将其回调函数被分发到宏任务Event Queue中，我们记为`setTimeout2`。

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
| setTimeout1       | process1          |
| setTimeout2       | then1             |

* 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
* 我们发现了`process1`和`then1`两个微任务。
* 执行`process1`,输出6。
* 执行`then1`，输出8。

好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。那么第二轮时间循环从`setTimeout1`宏任务开始：

* 首先输出2。接下来遇到了`process.nextTick()`，同样将其分发到微任务Event Queue中，记为`process2`。`new Promise`立即执行输出4，`then`也分发到微任务Event Queue中，记为`then2`。

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
| setTimeout2       | process2          |
|                   | then2             |

* 第二轮事件循环宏任务结束，我们发现有`process2`和`then2`两个微任务可以执行。
* 输出3。
* 输出5。
* 第二轮事件循环结束，第二轮输出2，4，3，5。
* 第三轮事件循环开始，此时只剩setTimeout2了，执行。
* 直接输出9。
* 将`process.nextTick()`分发到微任务Event Queue中。记为`process3`。
* 直接执行`new Promise`，输出11。
* 将`then`分发到微任务Event Queue中，记为`then3`。

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
|                   | process3          |
|                   | then3             |

* 第三轮事件循环宏任务执行结束，执行两个微任务`process3`和`then3`。
* 输出10。
* 输出12。
* 第三轮事件循环结束，第三轮输出9，11，10，12。

整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。 (请注意，node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差)

**事件循环，宏任务，微任务的关系图**：

![image-20221129005549392](image-20221129005549392.png)

* 代码执行过程中，宏任务和微任务放在不同的任务队列中

* 当某个宏任务执行完后,会查看微任务队列是否有任务。如果有，执行微任务队列中的所有微任务(注意这里是执行所有的微任务)

* 微任务执行完成后，会读取宏任务队列中排在最前的第一个宏任务（注意宏任务是一个个取），执行该宏任务，如果执行过程中，遇到微任务，依次加入微任务队列

* 宏任务执行完成后，再次读取微任务队列里的任务，依次类推

**async、await事件轮询执行时机**

* async隐式返回Promise，会产生一个微任务
* await后面的代码是在微任务时执行

```javascript
console.log("script start");
async function async1() {
  await async2(); // await 隐式返回promise
  console.log("async1 end"); // 这里的执行时机：在执行微任务时执行
}
async function async2() {
  console.log("async2 end"); // 这里是同步代码
}
async1();
setTimeout(function() {
  console.log("setTimeout");
}, 0);
new Promise(resolve => {
  console.log("Promise"); // 这里是同步代码
  resolve();
})
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  }); 
console.log("script end");

// 打印结果:  script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout

```

**event loop 与 浏览器更新渲染时机**

* 浏览器更新渲染会在event loop中的 宏任务 和 微任务 完成后进行，即`宏任务 →  微任务  →  渲染更新`（先宏任务 再微任务，然后再渲染更新）

* 宏任务队列中，如果有大量任务等待执行时，将`dom的变动作为微任务，能更快的将变化呈现给用户`，这样就可以在这一次的事件轮询中更新dom

**event loop与 vue nextTick**

**vue nextTick为什么要优先使用微任务实现？**

* vue nextTick的源码实现，优先级判断，总结就是`Promise > MutationObserver > setImmediate > setTimeout`

* 这里优先使用Promise，因为根据event loop与浏览器更新渲染时机，使用微任务，本次event loop轮询就可以获取到更新的dom

* 如果使用宏任务，要到下一次event loop中，才能获取到更新的dom

**Node中的process.nextTick**

有很多文章把Node的process.nextTick和微任务混为一谈，但其实并不是同一个东西

process.nextTick 是 Node.js 自身定义实现的一种机制，有自己的 `nextTickQueue`

**process.nextTick执行顺序早于微任务**

**示例**

```javascript
console.log("start");
setTimeout(() => {
  console.log("timeout");
}, 0);
Promise.resolve().then(() => {
  console.log("promise");
});
process.nextTick(() => {
  console.log("nextTick");
  Promise.resolve().then(() => {
    console.log("promise1");
  });
});
console.log("end");
// 执行结果 start end nextTick  promise promise1 timeout 
```

### JS的事件流

* 事件捕获，层层寻找事件的目标节点
* 目标阶段，触发目标对象上的方法
* 事件冒泡，向上层层的触发事件

### JS的事件委托

将原本挂载在子节点上的事件进行改变，将其挂载在父节点上，主要是利用事件冒泡的原理

作用：

* 减少性能的损耗和内存的占用，因为降低DOM的操作，同时每注册一个事件，就会占用内存中的位置，减少事件的注册，则减少了内存的占用
* 动态绑定事件，当新增一个子节点，这个新增的子节点同样能触发父节点身上的方法

### `setTimeout`和`setInterval`的特点

这两个函数的第一个参数必须是一个函数，或者还未编译的代码

~~~javascript
  function a() {
            console.log(231)
        }
        //会立马执行，并不会延迟6秒执行
        setTimeout(a(), 6000)
         //修改后的形式，即使被传入的函数执行，则需要用匿名函数包裹起来
        setTimeout(() => {
            a();
        }, 6000);
        //或者
        setTimeout(a,6000)
~~~

对于vue框架来说，同样具有这个特点

~~~javascript
//对于setTimeout和setinterval这种宏任务来说,他们的执行顺序，评判的标准是他们的传入时间

//代码中3000延迟的setInterval比1000延迟的setInterval先进入宏任务队列中，但是会先挑选延迟时间短的回调来执行
//其实A和B是同时执行的，当执行栈内任务执行完毕了，就把这A和B同时开起来，开始计时，当时间到达了第1秒，就执行B的回调函数,当B的回调函数执行完后，时间还没有达到第3秒，那么就等待时间到达第3秒，再执行A的回调函数
A：setInterval(() => {
            console.log(1)
            
        }, 3000);

B：setInterval(() => {
             console.log(2)       
        }, 1000);
//输出 2 1

//特殊点一
//A和B同时开始，6秒后，执行A的回调函数，在A的回调函数里面，执行了好久，时间超过了6.5秒，但是并不会执行B的回调函数，而是一定要等A的回调函数执行完之后，再执行B的回调函数
A：setTimeout(() => {
            console.log(1);
            for (let i = 0; i < 10000000000; i++) {
                i += 1;
            }
            console.log(3)
        }, 6000);

B： setTimeout(() => {
            console.log(2);
        }, 6500);
//输出 1  3 2

//特殊点二
//A和B同时开始，6秒后执行A的回调函数，这时候执行一个微任务，这个异步任务的执行时间就从现在开始，但是这个微任务需要7秒后执行回调函数，而B任务的时间要到了，所以在6.5秒后执行B的回调函数，在13秒后执行微任务的回调函数
A：setTimeout(() => {
            console.log(1);
           new Promise((resolve,reject)=>{
               setTimeout(()=>{ 
                   resolve()
               },7000)
           }).then(res=> console.log(4))
        }, 6000);
B：setTimeout(() => {
            console.log(2);
        }, 6500);
//输出 1 2 4

//特殊3
setTimeout(() => {
            console.log(1);
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 2000); //这只是用来模拟new promise函数需要2秒钟完成
            }).then((res) => {
                for (var a = 0; a < 10000000000; a++) {
                    a = a + 1;
                }
                console.log(3)
            });
        }, 6000);

setTimeout(() => {
            console.log(2);
        }, 9000);
//输出 1 3 2

//异步任务的执行，依赖于他们的执行时间，那个时间短就先执行那个的回调函数，如果这个执行完回调函数的时间已经超过了下一个异步任务的回调函数的时间，那么也必须要等到上一个异步任务的回调函数执行完毕以后，再去执行下一个异步函数的回调任务

~~~

**使用setTimeout模拟setInterval的理由**：

![这里写图片描述](20180901125221664.png)

上图可见，setInterval每隔100ms往队列中添加一个事件；100ms后，添加T1定时器代码至队列中，主线程中还有任务在执行，所以等待，some event执行结束后执行T1定时器代码；又过了100ms，T2定时器被添加到队列中，主线程还在执行T1代码，所以等待；又过了100ms，理论上又要往队列里推一个定时器代码，但由于此时T2还在队列中，所以T3不会被添加，结果就是此时被跳过；这里我们可以看到，T1定时器执行结束后马上执行了T2代码，所以并没有达到定时器的效果

**因此，setInterval有两个缺点：**

* 使用setInterval时，某些间隔会被跳过；
* 可能多个定时器会连续执行；

可以这么理解：每个setTimeout产生的任务会直接push到任务队列中；而setInterval在每次把任务push到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中)

**经典的例子：**

~~~javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
~~~

**问题：是每隔1秒输出一个5 ？还是一秒后立即输出5个5？**

答案是：一秒后立即输出5个5

**为什么一秒后立即输出5个5？**
首先JS引擎线程 要运行for循环，在每次循环中都会调用一个setTimeout函数，每个setTimeout计时结束后都会将其回调函数添加到 事件队列 中。等for循环结束后（即JS引擎线程空闲后），才开始按顺序执行事件队列中的函数

每次循环都会在一秒后将回调函数添加到事件队列中，但由于两次相邻的循环时间是短到可以忽略不计的，所以表面看上去 一秒后立即执行了5次回调函数，即一秒后立即输出5个5

**使用setTimeout模拟setInterval能够解决两个问题**

* `在前一个定时器执行完前，不会向队列插入新的定时器`（解决缺点一）
* 保证定时器间隔（解决缺点二）

### Attribute和property的区别

`Attribute`：用于获取标签上的属性值，即标签上等号后面的值，这个等号的值是固定的，不会动态改变

`property`：当页面渲染到某一标签之后，就会产生一个element对象，这个标签上的属性名（不包括自定义属性）会进入这个element对象中，这时候这些属性名叫property。

~~~javascript
<input  type='t' value='text' customAttribute="hh" />
    
 document.querySelector('input').getAttribute('type') //得到t，只获取等号后面的值，不会改变
 document.querySelector('input').type //得到text,property会自动补齐属性

//当你输入内容，改变value值后，比如你输入了ty
 document.querySelector('input').getAttribute('value') //得到text,不会自动改变，只得到之前的值
 document.querySelector('input').value //得到ty，会根据输入的改变而改变
 document.querySelector('input').defaultValue //得到text,得到改变之前的值

 document.querySelector('input').getAttribute('customAttribute') //得到hh
 document.querySelector('input').customAttribute //得到undefined，property中不包括自定义属性
~~~

### js文件的异步载入

异步载入的目的是为了使页面在一开始载入的时候不出现假死的现象，因为在浏览器中渲染引擎和js引擎是互斥的，当解析文档时，发现有js文件，就会停下来解析js文件，导致dom没有继续渲染。

`defer关键词`：

* 当有多个文件使用defer载入时，会按先后顺序来一一载入
* 只适用于外联的文件
* 会在onload方法之前执行

~~~JavaScript
<script type="text/javascript" defer="defer" src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" ></script>
~~~

`async关键词`:

* 当有多个文件采用async方法载入时，那个文件先载入是不确定的，因为是异步载入，文件的载入和执行都是无序的
* 只适用于外联的文件
* 会在onload方法之前执行

~~~javascript
<script type="text/javascript" async="async" src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" ></script>
~~~

### js中堆与栈

`栈内存(stack)`：是自动分配好内存空间的，且在代码运行的过程中释放。

在栈内存中会提供一个空间给js代码执行，当解释器执行到了一个函数时，就会把这个函数丢入这个空间中执行，且当这个函数中调用了另外一个函数，则会把另外一个函数也压入这个栈中，同时先执行这个新的函数，这个新的函数执行完以后，再执行原先函数后面的代码。

js中的基础数据类型String,Boolean,Number,Null,undefined,Symbol的值都保留在栈内存中，所以在执行区域被销毁后，也会把它们释放掉。而引用类型的数据类型Array和Object两种类型数据，它们的指针放在栈内存中，实际存放的位置是在堆内存中。

栈内存的空间是有限的，当执行的内存超出了栈内存的大小，就会报栈内存溢出的错误，例如在无限循环赋值中，没有终止循环的条件。

`堆内存`：存储Object和Array的实际对象，每个对象的大小不固定。因为js中时没有类似`c语言`中的内存清理函数，堆内存中内存的释放只能依赖于垃圾回收机制。

![Image_20210112174205](Image_20210112174205.png)

`闭包`：闭包中的变量保存在堆内存中，因为闭包通常返回的是一个引用，只有手动将这个引用去除掉，不然其就会一直留在堆内存中。

### 深拷贝与浅拷贝浅讲

`浅拷贝`:只是拷贝了一层，将第一层中简单类型的值（Boolean、Number、null、symbol、undefined、string）进行赋值，引用类型的值
（Array、Object）只拷贝其引用地址（栈内存中的地址）。

`深拷贝`:多层拷贝，循环深入的将对象中所有成员进行拷贝。一个简单的思路，传入一个对象，先通过Object.prototype.toString来判断这个对象是Array还是Object，如果是Object的话，先将要返回的对象继承传入对象的父对象。然后通过for...in循环整个对象，如果成员是array或者Object的话，则递归调用，如果不是，则直接赋值。

~~~javascript
//不考虑对象中成员调用自身的情况
       function deepClone(obj) {
            let result = '';
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                result = [];
            }
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                result = {};
            }
            Reflect.ownKeys(obj).forEach(item => {
                if (obj[item] instanceof Date) {
                    result[item] = new Date(obj[item])
                } else if (obj[item] instanceof RegExp) {
                    result[item] = new RegExp(obj[item].source, obj[item].flags)

                } else if (Object.prototype.toString.call(obj[item]) === '[object Array]') {
                    result[item] = deepClone(obj[item])
                } else if (Object.prototype.toString.call(obj[item]) === '[object Object]') {
                    result[item] = deepClone(obj[item])
                } else {
                    result[item] = obj[item]
                }
            });
            return result;

        }
        let d = {
            a: '2',
            b: 4,
            e: true,
            g: Symbol(3),
            h: [1, {
                value: '4'
            }, true],
            j: {
                value: '22',
                d: Symbol(777)
            },
            [Symbol(7)]: '555'
        }
        let e = deepClone(d);
        // console.log(e, d, 99);
        // e.h[1].value = '777';
        // console.log(e, d, 99);
        // e.j.d = '222'
        // console.log(e, d, 99);
        // let g = ['1', 3, {
        //     value: '33'
        // }];
        // let h = deepClone(g);
        // h[2].value = '99'
        // console.log(h, g, 88)

~~~

### 内存回收机制浅讲

js不像c语言一样，拥有释放内存的函数，只能通过底层的垃圾回收机制来回收内存中不需要的变量。垃圾回收机制一共有两种方式回收垃圾。

`引用计数算法`：将变量是否不在被需要转化为变量是否不在被引用，但这个方法过于老旧，只在IE7和IE8中使用，故此不在展开说明。

`标记清除算法`:  将变量是否不在被需要转化为变量是否可以被获取。每个HTML文档都会有一个`root`根，垃圾回收器会定时的从`root`根出发，找所有从根开始引用的对象（全局变量），再找这些对象的引用对象，从而获得所有可以被获得的对象和不可以被获得的对象。

* 垃圾回收器标在运行时记存储在内存中的所有变量
* 垃圾回收器清除处在执行环境中的变量，以及引用这些变量的对象们身上的标记
* 此后，身上有标记的变量即是要被销毁的变量，因为已经无法在执行环境中获取到它们
* 最后，垃圾回收器销毁这些带有标记的变量，并回收它们占用的内存空间

### Iterator遍历器

一种遍历的机制，`Iterator`可以看做是一个指针对象，在循环的时候不断的调用这个对象，可以获取到数组的每一项内容。作用有以下三点：

* 提供一种统一的方式来遍历j`avascript`现存的多种数据结构。
* 使数据结构按照某种顺序进行排列。
* 给与for...of循环支持

在以下场合会调用iterator接口：

* 解构赋值的时候
* `...`扩展运算符的时候，这也表明了只有部署了iterator接口，才能是使用[...some]的方式将其转化为数组
* 使用`yield`关键词的时候，yield其实决定了next函数中返回的value的值。
* 使用数组作为参数的方法，例如`for...of`,`Arrary.form()`

原生具有Iterator接口的对象有：

* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

~~~javascript
 let a = {
            //iterator接口都定义在Symbol.iterator属性上，这个属性是个函数，返回一个遍历器对象
            [Symbol.iterator]: function () {
                return {
                    next: function () {
                        //每一个遍历器对象都会有一个next方法用来返回遍历的每一项的值和是否遍历结束的判断符
                        return {
                            value: '1', //返回遍历的每一项的值，如果到了遍历终止时，这个值为undefined
                            done: false, //如果当前遍历的是有值的，则返回false,如果到了遍历的最终，则返回true
                        }
                    },
                    return: function () {
                        //这个函数用于当使用for..of进行循环时，出现了错误或者使用break等提前终止了循环，就会执行这个函数
                    }
                }
            }
        }
        //部署itertor接口的一种快捷模式
        let b = {};
        //借助数组构造函数的[Symbol.iterator]来快速的部署iterator接口
        b[Symbol.iterator] = Array.prototype[Symbol.iterator]


        //使用generator函数进行包装iterator接口
        let c = {
            [Symbol.iterator]: function* () {
                yield '1'
            }
        }
        for (item of c) {
            //得到的item为‘1’
        }

        //for...of有一个特殊的地方，即循环的每一项，必须以数字作为下标
        let a = [1, 2, 3];
        a.foo = 4;
        for (let item of a) {
            //得到的item为 1,2,3 是得不到4这个值，因为不会循环到foo这一项
        }
        for (let item in a) {
            //得到的item为 1,2,3,foo for...in比较特殊，会拿到foo这一项
        }

        //类似数组的对象的特点
        let d = {
            0: '1',
            1: '2', //以数字作为属性名
            length: 2, //拥有length属性
            [Symbol.iterator]: Array.prototype[Symbol.iterator],
            //部署了itrerator接口后，就可以通过[...d]转为数组，以及使用for...of进行循环
        }
        //以上的对象就可以通过Array.from()转为数组
~~~

### js运行过程中的错误类型

浏览器会输出的错误种类：

* `EvalError`: 创建一个`error`实例，表示错误的原因：与`eval()`有关。
* `RangeError`: 创建一个`error`实例，表示错误的原因：数值变量或参数超出其有效范围。
* `ReferenceError`: 创建一个`error`实例，表示错误的原因：无效引用。
* `SyntaxError`: 创建一个`error`实例，表示错误的原因：`eval()`在解析代码的过程中发生的语法错误。
* `TypeError`: 创建一个`error`实例，表示错误的原因：变量或参数不属于有效类型。
* `URIError`: 创建一个`error`实例，表示错误的原因：给`encodeURI()`或`decodeURl()`传递的参数无效。

`eval()`：此方法为解析字符串，并执行此字符串中的代码

### class对象

class实际上是构造函数的语法糖

~~~javascript
let privateData = Symbol('data');
let privateMethod = Symbol('method');

class Point {
    //Point本质上是一个构造函数，所以typeof Point 时结果是function
    // 如果不写constructor的话，在new的时候会默认添加一个没有任何内容的constructor
    age = '12' //实例属性的新定义法
    constructor(age) {
            let isClass = new.target // new.target会返回当前的是否是使用new关键词创建的类，如果是则返回此类，即Point对象，如果不是则返undefined
                                    //如果有类继承了此类，则new.tartget返回的是子类
            
            //这里的参数就是new时传进来的参数
            this.age = age; //通过this将传进来的参数绑定在实例身上，this在class中默认指向实例本身
        
            //constructor如果没有返回，则会默认的返回this
        }

    //在class中定义的方法并不是挂载在this上的，而是挂载在其原型上的，即point.prototype
    toStirngData() {
        console.log(this.age)
    }

    testMethod() {
            //虽然方法不挂载在实例对象上，但是通过作用域链也能进行访问，所以在类的方法中可以通过this访问其他的方法
            this.toStirngData();
        }

        // 类中的所有方法都是不可以枚举的
        //通过这个Object.getOwnPropertyNames(Point.prototype)可以获取

    //类中的值都是可以通过set和get来设置的
    get testName() {
        return this.age
    }

    set testName(name) {
        console.log(this.age + name)
    }

    //静态方法，只能通过Point类来实际调用，不能通过实例对象来调用
    static testStatic() {
            this //静态方法中的this指向的Ponit,即类本身，而不是实例对象
        }

    //静态属性的写法
    static testStaticData = '123';

    //私有函数
    [privateMethod]() {

    }
    //私有方法
    [privateData] = '123'

    //私有函数和属性也有这么一个提案，使用#作为标识符，进行区分

}

Point.testStatic //静态方法的调用
Point.propertyData = '123' //静态属性的设置
Point.prototype.constructor === Point //class本身指向的是它的构造函数

let testObj = new Point(12) //class必须要用new来实例化

testObj.testMethod();

testObj.testName = '2324';
testObj.testName;

//可以通过表达式的方式定义一个class

let test = new class {
        constructor(age) {

        }
    }(2) //匿名函数的写法
~~~

### class对象的继承

~~~javascript
 class A {
            constructor(a) {
                this.a = a
            }
            testA() {};
            static testA2() {};

        }
        class B extends A {
            constructor(a, b) {
                super(a);
                //super这一步先执行父类的构造函数，把父类的方法和属性定义在this上，这个this的指向是子类，再执行子类构造函数
                //可以看做是A.prototype.constructor.call(this)
                //一旦是继承，则在构造函数里必须要写super(),要不然new实例的时候就会报错   
                this
                //这里的this可以得到子类和父类中所有的属性和方法
            }
            testB() {
                super.testA();
                //在子类的普通方法中super指向父类的prototype，所以在父类构造函数中定义的方法和属性，是无法通过super来拿到，只能通过this拿到
                //使用super调用时，如果涉及到了this，则this指向的是子类的实例

                super.a
                //这里的super指向了父类的prototype，但是父类的prototype中没有a这个属性，所以这里得到的是undefined
                super.a = '2';
                //这里与是上面的不同，这里不是去获取a这个属性，而是定义a这个属性，即为子类实例定义一个a变量
                //等同于 this.a = '2'
            }
            static testB2() {
                super.testA2();
                //在子类的静态方法中，super指向父类，即A这个函数
                //如果在调用中涉及到了this，则this表示为子类，即B这个函数
            }
        }

        let b = new B();
        b instanceof A //true
        b instanceof B // true
        //从上可以看出子类的实例即与父类相同，也与子类相同

        Object.getPrototypeOf(B)=== A
        //可以通过以上拿到父类
      
~~~

class的两种继承

~~~javascript
        //一、构造函数的继承
        B.__proto__ = A
        //即是通过
        Object.setPrototypeOf(B, A);

        //二、prototype的继承
        B.prototype.__proto__ = A.prototype;
        //即是通过
        Object.setPrototypeOf(B.prototype, A.prototype);
~~~

实例的`_proto__`属性

~~~javascript
        //实例的__proto__属性
        let a = new A();
        let b = new B();
        b.__proto__.__proto__ = a.__proto__;
~~~

原生构造函数的继承和基类

~~~javascript
        //原生构造函数包括
        /**
         * Boolean()
         *Number()
         *String()
         *Array()
         *Date()
         *Function()
         *RegExp()
         *Error()
         *Object()
         */
        class MyArray extends Array {
            constructor(...args) {
                super(...args);
            }
            //继承了Array函数，同时是可以写一些自己的方法，这样实例对象既有独有的方法也有Array函数的方法
        }

        var arr = new MyArray();
        arr[0] = 12;
        arr.length // 1

        arr.length = 0;
        arr[0] // undefined

        //基类
        class C {
            //没有明确的继承可以看作是一个基类    
        }
        //实际上基类也有继承
        C.__proto__ = Function.prototype;
        C.prototype.__proto__ = Object.prototype
~~~

### `__proto__`、prototype和constructor

`__proto__`：对象独有的属性，指向原型对象（构造函数的原型对象或者说`protoype`)，也可以说是由一个对象指向另外一个对象。每一个对象都有这个属性，用于形成原型链，即当获取对象内的一个属性时，先从对象本身找起，如果对象本身没有则通过`__proto__`向其父类寻找，直到找到`Obejct.prototype`中，如果还是没有，则返回null。虽然其可以获取到单前对象的原型，但是不建议通过这个来获取原型，而是通过`Object.getPrototypeOf`来获得原型。

`prototype`：函数独有的属性，构造函数的原型对象，可以说是由一个函数指向一个对象，每个对象创建的时候都会新建一个这个属性。作用是帮助实例对象获取继承的属性和方法。其内部包含一个constructor 、 `__proto__`指针和定义的方法和属性,不包括定义的实例方法和属性，同时每一个函数自身的prototype并不等于其继承的`Function.prototype`。

`constructor`：对象独有的属性，指向对象的构造函数，可以说是由一个对象指向一个函数，每个对象一定会有构造函数，这是说每一个对象都可以在本身或者通过`__proto__`来找到其构造函数，但单论属性来说，constructor属性只存在于prototype对象中，实际上构建一个函数和一个对象时，并不会用到这个字段，这个字段实际上是用来帮助寻找到该函数或者对象的构造函数

函数是个特殊的存在，因为函数也可以看做一个对象，所以函数拥有`__proto__`、prototype和constructor。

### Function构造函数和Object构造函数

`Function`:所有函数的构造函数，其产生的函数都继承着`Function.prototype`。

`Object`：在没有继承的情况下，所有对象的构造函数都是它，`Object.protoype`可以看做一切对象继承的源头，可以叫做源型。

由`Object.prototype`产生`Function.prototype`,由`Function.prototype`产生Function，借由Function产生Object，然后又将`Object.prototype`指定给Object,但是`Object.__proto__`等于`Function.prototype`。

图解：

![20210428094152](/jsimages/20210428094152.jpg)

在没有继承的情况下，所有函数的`__proto__`等同于`Function.prototype`,所有函数的`__proto__.contructor`等同于Function,所有函数的`prototype.__prototype`等同于`Object.prototype`

无论继承与否所有函数的`contructor`等同于`Function`

继承情况下的解析：

~~~javascript
class b {}

class d extends b {}

console.log(d.__proto__ === b) // true
// 当继承后，继承的函数的__proto__不再指向Function.prototype,而是指向要继承的函数


console.log(d.prototype.__proto__.constructor === b) // true


console.log(d.prototype.__proto__ === b.prototype) // true


console.log(d.constructor === b) // false


console.log(d.constructor === Function) // true
// 所有函数的contructor等同于Function


console.log(b.__proto__ === Function) // false
~~~

### 原型链和原型

原型链即多个原型连接起来的对象

~~~javaScript
// 继承的手写版本
        function A(a) {
            this.a = a;
        };
        A.prototype.testA = function() {
            console.log('222')
        };

        function B(a, b) {
            A.call(this, a) //调用A，同时使this指向B，这样就使得b的实例对象拥有A的实例属性
            this.b = b;
        }
        Object.setPrototypeOf(B.prototype, A.prototype); //开启继承，使B的原型链接到A的原型，实现继承
        let b = new B(2, 3);
        //原型链
        console.log(Object.getPrototypeOf(b) === B.prototype);
        console.log(Object.getPrototypeOf(Object.getPrototypeOf(b)) === A.prototype);
        console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(b))) === Object.prototype);
~~~

### new的作用

* new的时候通过构造函数产生了一个实例对象，这个实例对象上拥有构造函数的所有属性和方法。
* new的时候产生的实例对象可以通过`__proto__`获取到构造函数的原型（prototype），`new`关键词将实例对象和构造函数的原型对象链接在了一起。

~~~javascript
let a = new Object() //在这一步new做了四件事： 1.创建了一个空的{}；
                     //                    2.将这个空的{}与Object.prototype链接在一起
                     //                    3.将this指绑定给这个空的{}
                     //                    4.将这个空{}对象返回
~~~

**new一个对象，到底发生什么？**

* 创建一个对象，该对象的原型指向构造函数的原型

* 调用该构造函数，构造函数的this指向新生成的对象

* 判断构造函数是否有返回值，如果有返回值且返回值是一个对象或一个方法，则返回该值；否则返回新生成的对象

手动创建一个new方法，解释上面的4个步骤：

~~~javascript
  function testNew(constructor, ...args) {
            //constructor 表示传进来的构造函数
            //args 表示传进来的初始化参数

            //首先先创建一个空对象
            let obj = {};
            //使用Object.setPrototypeOf来链接这个空对象和构造函数的原型
            Object.setPrototypeOf(obj, constructor.prototype)
            //执行构造函数并通过call改变构造函数中this的指向，使构造函数中的方法和属性绑定到obj上
            let res = constructor.call(obj, ...args);
            //判断构造函数的返回，如果是对象则返回其，如果不是则返回obj对象
            return res instanceof Object ? res : obj
        }

        function A(name) {
            this.name = name;
        }
        let a = testNew(A, 2233)
        console.log(a, 99)
~~~

### 4个优雅的逻辑运算符

`？.`:存在判断符

~~~javascript
let a = [0];
//当想要判断数组a存在，且数组a的第一位即a[0]存在时候
if(a?.[0]){
}
//此逻辑运算符有一特性，即当获取到不存在的对象时，就终止逻辑，不在执行
let c = a?.[0]; //当数组a和a[0]都存在时，c就等于a[0]，而其中有一个不存在时，c就为空值
~~~

`??`：默认赋值符

~~~javascript
let a = [0];
let c = a?.[0] ?? 'c' //当a和a[0]都存在时，c等于a[0]，否则c等于’c‘
~~~

`??=`:空值赋值符

~~~javascript
a??= y;
//仅当左侧为null值或者undefined时，将右侧赋值给左侧，即当a为null值或者undefined时,a=y,y也可以是一个函数

~~~

`||=`:与逻辑赋值

~~~javascript
a||=y;
//仅当左侧为虚值（null，undefined，空字符串，单引号，双引号，0，NAN）时，将右侧赋值给左侧
~~~

`&&=`:或逻辑赋值

~~~JavaScript
a&&=y
//仅当右侧为真值时，将右侧的值赋予左侧
~~~

### 协商缓存和强缓存

强缓存指的是当响应头返回的内容中有expires(过期时间),或者cache-Control(max-age=600过期时间为600分钟)时浏览器就会将资源文件进行缓存，返回的code是200.如果是图像、网页等资源会存储在硬盘中，操作系统等文件就会放在内存中,但是不一定，实际上是浏览器自动分配资源放置在哪里。

当强缓存没有命中，则启动协商缓存，即携带缓存标识向服务端发起请求，由服务端决定是否启用缓存。实际上是服务器端响应一个请求时，在返回的响应头中带有`Etag`字段，是返回的资源的唯一标识，当再次去请求这个请求时，就会在请求头的if-none-Match字段中带上`Etag`的标识，然后服务器端判断如果这个值和服务器端的值一样，则返回`code:304`,浏览器直接使用本地缓存。如果不一样，则返回新的资源和`code:200`

当第一次访问请求的时候,浏览器先判断这个请求是否有缓存,如果没有则向服务端发起请求，服务端返回的响应头中如果带有expires字段**(这个字段的值为一个时间，例如20200708 18:32:45,表明这个请求的缓存内容在这个时间段后失效,缓存被清除)**或者cache-Control字段**(max-age=600 表明这个请求的过期时间为600分钟，600分钟后清除这个缓存)**则告诉浏览器要对这个请求的内容及缓存标识**（Etag:服务端会在响应头中加入这个字段，是返回资源的唯一标识；Last-Modified:也存在于响应头中，用来表明返回资源最后的修改时间）**进行缓存，返回的code为200,且如果是图像、网页等资源会存储在硬盘中，操作系统等文件就会放在内存中,但是不一定，实际上是浏览器自动分配资源放置在哪里。

当第二次访问同一个请求时，浏览器发现有这个请求的缓存，就会去执行强缓存的判断，即先**判断expries或者cache-Control的时间是否已经过期**，如果没有过期，则直接返回`code:200`,然后调用缓存内的数据。如果发现时间已经过期，则开启协商缓存。

协商缓存就是带着缓存标识符去向服务器端发起请求,缓存标识符附加在请求头中，Etag缓存标识符用if-none-match来代表(即if-none-match:Etag的值)，Last-Modified缓存标识符用 If-Modified-Since代表(即 If-Modified-Since:Last-Modified的值)，服务器端接受到这个请求后就去判断传来的if-none-match值是否和服务器端保存的一致或者传来的If-Modified-Since是否和服务器端保持一致，如果保持一致，说明资源没有发生改变，则返回`code:304`，浏览器就会从缓存中读取数据。如果不一致，则返回新的资源和缓存标识符，以及code:200，浏览器就会再次把请求的内容和缓存标识符缓存起来。

**在第二次访问同一个请求的时候，如果命中强缓存，则不会去向服务端发起请求，而执行协商缓存的话，就会去向服务端发起请求。**

前端通过Ajax执行缓存的方式：

* xhr.setRequestHeader('cache-Control','max-age=0‘);执行强缓存
* xhr.setRequestHeader('If-Modified-Since','0‘);执行协商缓存

![缓存](C:\Users\LY\Desktop\缓存.jpg)
