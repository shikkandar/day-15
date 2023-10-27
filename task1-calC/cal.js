// let output=document.getElementById("input")
// function cl(num){
//     output.value +=num;
// }

// function calculate(){
//     try{
//         output.value=eval(output.value)
//     }
//     catch(err)
//     {
//         alert("Invalid")
//     }
// }
// function cle(){
//     output.value = "";
// }
// function del(){
//     output.value=output.value.slice(0,-1)
// }

let output=document.getElementById("input")
function cl(num) {
    output.value += num
}

function calculate() {
    try {
        output.value=eval(output.value)
    } catch (err) {
        alert("Invalid")
    }
}
function cle() {
    output.value="";
}

function del() {
    output.value=output.value.slice(0,-1)
}