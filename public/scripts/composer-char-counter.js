$(document).ready(function() {
  $(".new-tweet > form > textarea").on('input', function(){
    const currentLen = $(this).val().length;
    const wordCount = $(this).next().find("output");
    wordCount.val(140 - currentLen);
    wordCount.css('color', wordCount.val() < 0 ? "red" : "rgb(111, 109, 109)");
  })
});