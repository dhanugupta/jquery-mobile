var app = app || {};
// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
function extend( ns, ns_string ) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "myApp") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}
var alertContentView = Backbone.View.extend({
  initialize: function () {
    this.template = $.tpl['alert-content'];
  },

  render: function (eventName) {
      console.log($(this.el).html());
      $(this.el).html(this.template());
      return this;
  },
});
var onErrorHandler = function(collection, response, options) {
      console.log('global error handler!!');
      //console.log(response);
      //display the alert View
      new alertContentView({el: $('.ui-content', this.el)}).render();
  };



var Workspace = Backbone.Router.extend({
  appData:{},
  pageId:"home",
  pageSharedData:{},    
  getAppData:function(id){
     var self = this;
      var tmpArray = [];
     if(!self.appData) return "";
      //console.log(self.appData);
      if(self.appData){
          var tmpData = self.appData.models;
        for(var i=0;i<tmpData.length;i++) {
            if(tmpData[i]["attributes"]["id"] == id) {
               tmpArray.push(tmpData[i]);
                return tmpArray;
            }
        }
      }
  },
  routes: {
    "": "homeCard",
    "cardPreview/:id":"cardPreview",
    "card/:id":"cardDetails",
    "about":"about"  
  },
    initialize:function(){
         var self = this;
            this.routesHit = 0;
            //keep count of number of routes handled by your application
            Backbone.history.on('route', function() { self.routesHit++; }, this);

            //window.Workspace.render();
            window.Workspace.router = this;
    },
    routesHit:0,
    back:function(){
        if(this.routesHit > 1) {
                window.history.back();
            } else {
                //otherwise go to the home page. Use replaceState if available so
                //the navigation doesn't create an extra history entry
                this.navigate('/', { trigger: true, replace: true });
            }
    },
  main: function() {
    //this.changePage(new MainPageView());
      this.changePage(new WorkAppView());
  },
  home: function() {
      this.changePage(new WorkAppView());
     /*var products = new Products();  
     var self = this;
     this.changePage(new HomePageView({collection:products}));
      products.fetch({
          beforeSend:function(){$.mobile.showPageLoadingMsg();},
          complete:function(){$.mobile.hidePageLoadingMsg();},
          success:function(products){ console.log('set the data');
                                     self.appData = products;
                                    },
          error:onErrorHandler
      });*/
  },
  homeCard:function(){
      var  cards = new Cards();  
     var self = this;
     this.changePage(new CardView({collection:cards}));
      cards.fetch({
          beforeSend:function(){$.mobile.showPageLoadingMsg();},
          complete:function(){$.mobile.hidePageLoadingMsg();},
          success:function(products){ console.log('set the data');
                                     self.appData = products;
                                    },
          error:onErrorHandler
      });
        
  },
    cardDetails:function(id){
        var self = this;
        console.log(self.pageSharedData);
        self.pageId = "cardDetails";
        var tmpModels = self.appData.models;
        for(var i=0;i<tmpModels.length;i++){
                if(id == tmpModels[i].id){
                    this.model = tmpModels[i];
                    break;
                }
        }
        this.changePage(new CardDetailsPageView({model:this.model,pageSharedData:this.pageSharedData}));
    },
    cardPreview:function(id){
        var self = this;
        console.log('get the card data');
        self.pageSharedData.cardDetail = $(".autogrow").html();
        self.pageId = "cardPreview";
        var tmpModels = self.appData.models;
        for(var i=0;i<tmpModels.length;i++){
                if(id == tmpModels[i].id){
                    this.model = tmpModels[i];
                    break;
                }
        }
        this.changePage(new CardPreviewPageView({model:this.model,pageSharedData:self.pageSharedData}));
        
    },
  productView:function(id,sku){
      
      //initialize the model for the product view
      var self = this;
      var model = {id:id,sku:sku};
     // console.log(self.appData);
      this.changePage(new ProductView({model:model,collection:self.appData}));
      //console.log(Backbone.history.fragment);
     
  },
  postList: function() {
    var postList = new PostList();
    this.changePage(new PostListPageView({collection: postList}));
    postList.fetch();
  },

  postAdd: function() {
    this.changePage(new PostAddPageView());
  },

  postDetails: function(id) {
    var post = new Post({id: id});
    this.changePage(new PostDetailsPageView({model: post}));
    post.fetch();
  },

  postDelete: function(id) {
    var post = new Post({id: id});
    this.showDialog(new PostDeleteDialogView({model: post}));
    post.fetch();
  },
    productSendEmail:function(){
        this.changePage(new productSendEmailView());
    },
  changePage: function (page) {
      console.log('h');
      var self = this;
    
    $(page.el).attr('data-role', 'page');
    $(page.el).attr('id',self.pageId);  
    page.render();

    $('body').append($(page.el));

    $.mobile.changePage($(page.el), {
      changeHash: false,
      transition: this.routesHit++ ? $.mobile.defaultPageTransition : 'none',
    });
  },

  about: function() {
this.changePage(new AboutPageView());
  },

  historyCount: 0,
});

app = {
    isPhonegapEnabled:function(){
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
    },
    // Application Constructor
    initialize: function() {
       (this.isPhonegapEnabled() == null || this.isPhonegapEnabled() == undefined)? this.onDeviceReady():this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('deviceready', this.onLoadReady, false);
        document.addEventListener('deviceready', this.onOfflineReady, false);
        document.addEventListener('deviceready', this.onOnlineReady, XMLHttpRequest);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('device is ready to start');
        window.workspace = new Workspace();
        Backbone.history.start();
    },
    onLoadReady:function(){
        console.log('device is on load');
    },
    onOfflineReady:function(){
         console.log('device is on offline');
    },
    onOnlineReady:function(){
         console.log('device is on online');
    }
};
$(document).ready(function () {
    
  //First: Bind the events     
  app.initialize();
    
    
});
