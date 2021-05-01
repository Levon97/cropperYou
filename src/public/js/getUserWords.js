let words=[];

function getWords(){
    let textField=document.getElementById("formText");
    //document.getElementById("formText").value="stacvec";
     words=textField.value.split(" ");
    words= words.filter(words=> words!=="")
    console.log(words)

    return words;
}

module.exports={
    words
}