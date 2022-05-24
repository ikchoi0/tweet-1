$(document).ready(function() {
  $(".new-tweet > form > textarea").on('input', function(){
    const inputCount = this.value.length;
    const wordCount = document.querySelector("output");
    const resultCount = 140 - inputCount ;
    wordCount.innerHTML = resultCount
    wordCount.style.color = resultCount < 0 ? "red" : "rgb(111, 109, 109)";
  })
});