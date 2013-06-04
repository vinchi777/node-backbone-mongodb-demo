$(function(){
//Models
	var QuoteModel = Backbone.Model.extend({
		urlRoot: "/quotes",
		defaults: {
			id: null,
			hero: '',
			quote: ''
		}
	});

	var QuoteList = Backbone.Collection.extend({
		model: QuoteModel,

		getQuotes: function(hero){
			return this.where({ hero: hero });
		}
	});

	var quotes = new QuoteList(
		[
			new QuoteModel({hero: 'batman',quote: 'Im bruce wayne' }),
			new QuoteModel({hero: 'batman',quote: 'Why so serious' }),
			new QuoteModel({hero: 'batman',quote: 'Why do we fall? so we can pick ourselves up.' }),
			new QuoteModel({hero: 'spiderman',quote: 'With great power comes great responsibilities.' }),
			new QuoteModel({hero: 'spiderman',quote: 'Web swing' }),
			new QuoteModel({hero: 'spiderman',quote: 'We all have secrets; the ones we keep, and the ones that are kept from us.' })
		]
	);

//Views
	QuoteView = Backbone.View.extend({
		el: $('body'),
		initialize: function(){
			this.quote_select = $("#quotes");
			that = this;
		},
	    events:{
			'change #hero': "loadQuotes",
		    'click #random': "randomQuote",
			'click #post': "postQuote",
			'click .remove': "removeQuote"
		},
		loadQuotes: function(env){
			var result = quotes.getQuotes($(env.target).val());
			that.quote_select.html("");
			_.each(result, function(q){
				that.quote_select.append("<option>" + q.get('quote') + "</option>");
			});
		},
		randomQuote: function(){
			if($("#quotes option").size() > 0 && $("#hero").val() != "Select Hero"){
				that.quote_select.val([]);
				var index = _.random(0, $("#quotes option").size()-1);
				$("#quotes option").eq(index).attr("selected", "selected");
			}
		},
		postQuote: function(){
			if(that.quote_select.val() != null){
				var q =  quotes.findWhere({ quote: that.quote_select.val() });
				var details = { hero: q.get('hero'), quote: q.get('quote') };
				var quote = new QuoteModel();
				quote.save(details, {
					success: function(model,response){
						$("#posts").append("<li>" + that.quote_select.val() + " - " + q.get('hero') + " <a href='#' class='remove' ><i id="+ response._id+" class='icon-remove-circle'></i></a></li>");
					},
					error: function(model, response){
						console.log("Error");
					}
				});
			}else{
				alert("Please choose a quote.");
			}
		},
		removeQuote: function(env){
			var id = $(env.target).attr("id");
			var quote = new QuoteModel({id: id});
			quote.destroy({success: function(model, response){
					$(env.target).closest("li").fadeOut();
			}});
		}
	});
	var quoteView = new QuoteView
});
