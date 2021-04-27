
function getWords(){
    let textField=document.getElementById("formText");
    //document.getElementById("formText").value="stacvec";
    let words=textField.value.split(" ");
    words= words.filter(words=> words!=="")
    console.log(words)

    return words;
}

/*textField.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById("ButtonEnter").value="stacvec";
});*/

module.exports ={
    getWords
};