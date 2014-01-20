
var CardPreviewPageView = Backbone.View.extend({
  initialize: function (options) {
    this.template = $.tpl['card-preview-page'];
    this.pageSharedData = options.pageSharedData;  
      console.log(this.pageSharedData);
  },
  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    $(this.el).find(".editText").html(this.pageSharedData['cardDetail']);
    return this;
  }
});
