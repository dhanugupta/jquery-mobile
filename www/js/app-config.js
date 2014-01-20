// Enable cross site scripting
jQuery.support.cors = true;

// Disable ajax cache
jQuery.ajaxSetup({ cache: false });

// Add REST service URL
var appConfig = {
  cardUrl:'http://dhanugupta.com/demos/api/egreeting/load.php'    
}
