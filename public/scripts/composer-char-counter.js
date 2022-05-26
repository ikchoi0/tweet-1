// Checks the text length in textarea. Then updates the valid remaining length to <output>

$(document).ready(function() {
  $(".new-tweet > form > textarea").on('input', function() {
    let $errorDiv = $(".error-message-content");
    if (!$errorDiv.val()) {
      $errorDiv.val("");
      $errorDiv.css("display", "none")
    }
    const currentLen = $(this).val().length;
    const wordCount = $(this).next().find("output");
    wordCount.val(140 - currentLen);
    wordCount.css('color', wordCount.val() < 0 ? "red" : "rgb(111, 109, 109)");
  })
});