var CardDetailsView = Backbone.View.extend({
  initialize: function() {
      var self = this;
    this.model.bind('change', this.render, this);
    this.template = $.tpl['card-details'];
    this.render();
  },
 events: {
    //"click .autogrow" : "clickHandler",
     //"tap  .autogrow" :"clickHandler"
  },
  render: function() {
       var self = this;
      $(this.el).html(this.template(this.model.toJSON())).trigger('create');
      return this;
  }
});


var CardDetailsPageView = Backbone.View.extend({
  initialize: function (options) {
    this.template = $.tpl['card-details-page'];
    this.pageSharedData = options.pageSharedData;  
  },
  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    this.cardDetailsView = new CardDetailsView({ el: $('.card-details', this.el), model: this.model });
      if(this.pageSharedData.cardDetail != undefined) $(this.el).find(".autogrow").html(this.pageSharedData.cardDetail);
    return this;
  }
});

$(document).on("pageshow","#cardDetails",function(){
     $(".autogrow").editable("http://dhanugupta.com/demos/api/egreeting/save.php", {
        indicator : "<img src='img/ajax-loader.gif'>",
        type      : "autogrow",
        submit    : 'OK',
        cancel    : 'cancel',
        tooltip   : "Click to edit...",
        onblur    : "true", 
        autogrow : {
           lineHeight : 12,
           minHeight  : 32
        },
       submitdata:function(value,settings){
                var returnVal = {foo:'bar'};
                return returnVal;
       }
    });    
});