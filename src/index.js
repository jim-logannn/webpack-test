import $ from "jquery";
import './css/index.css'
import './css/index.less'
$(function(){
    $('li:odd').css('backgroundColor','red')
    $('li:even').css('backgroundColor','pink')
})

class Person{
    static info='Person info'
}
console.log(Person);