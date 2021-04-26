function getWords(){
    let a=document.getElementById("formText");
    document.getElementById("formText").value="stacvec";
    let words=a.split(" ");
    console.log(words)

    return words;
}

module.exports ={
    getWords
};