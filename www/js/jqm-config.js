$(document).bind("mobileinit", function () {

    console.log('mobile init');
  // Disable jQueryMobile routing.
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = false;
  $.mobile.hashListeningEnabled = false;
  $.mobile.pushStateEnabled = false;

  // Setup transitions and effects.
  $.extend($.mobile, {
    slideText: "slide",
    slideUpText: "slideup",
    defaultPageTransition: "slide",
    defaultDialogTransition: "slideup"
  });

  // Remove page from the DOM when it's being replaced
   $(document).on('pagehide','div[data-role="page"]',function(event, ui){
        //console.log("pagehide: " + ui.nextPage + " : " + ui.prevPage);
        $(event.currentTarget).remove();
    });
    
    $(document).on('tap','.back',function(event,ui){
            window.history.back();
        return false;
    });
});
