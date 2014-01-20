var Product = Backbone.Model.extend({
  defaults: {
    title: "",
    body: "",
    created: new Date().toString(),
  },

  url: function() {
    if (_.isUndefined(this.attributes.id)) {
      return appConfig.baseURL + 'posts' + appConfig.addURL;
    }
    else {
      return appConfig.baseURL + 'posts/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
    }
  },
});
var Products = Backbone.Collection.extend({
  model: Product,
  url: function() {
    return appConfig.baseURL + 'posts' + appConfig.addURL;
  }  
});

var Cards = Backbone.Collection.extend({
  model: Product,
  url: function() {
    return appConfig.cardUrl;
  }  
});