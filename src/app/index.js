$(document).ready(function() {
  var activeAccordion = localStorage.getItem("accordion");
  if (activeAccordion) {
    $("#accordion1 > .panel:eq(" + activeAccordion + ") .collapse").toggleClass(
      "in"
    );
    localStorage.removeItem("accordion");
  }

  $("#accordion1")
    .find(".panel-heading > a")
    .click(function() {
      localStorage.setItem(
        "accordion",
        $(this)
          .closest(".panel")
          .index()
      );
      //Expand or collapse this panel
      $(this)
        .next()
        .toggleClass("in");

      //Hide the other panels
      //$(".collapse").not($(this).next()).removeClass('in');
    });

  $("#accordion1 .collapse input:checkbox").change(function() {
    if ($(this).is(":checked")) {
      $(".collapse").addClass("in");
    } else {
      $(".collapse").removeClass("in");
    }
  });
});
