var CardContentItemView = Backbone.View.extend({
  tagName: "li",

  className: 'ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c',

  initialize: function() {
    this.template = $.tpl['card-content'];
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.destroy, this);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  destroy: function() {
    this.remove();
  }
});


var CardContentView = Backbone.View.extend({
  initialize: function () {
    this.collection.bind("reset", this.render, this);
    this.collection.bind("add", this.append, this);
  },

  render: function () {
    $(this.el).empty();
    _.each(this.collection.models, this.append, this);
    $(this.el).listview('refresh');
    return this;
  },

  append: function(post) {
    $(this.el).append(new CardContentItemView({model: post}).render().el);
  }
});
var CardView = Backbone.View.extend({
  initialize: function () {
    this.template = $.tpl['home-page'];
  },

  render: function (eventName) {
      $(this.el).html(this.template()); 
      if(this.collection.length == undefined) this.alertContentView = new alertContentView({el: $('ul', this.el)}).render()
       if(this.collection.length != undefined) this.CardContentView = new CardContentView({el: $('ul', this.el), collection: this.collection});
      return this;
  }
});