// sorting json
var sortByProperty = function (property) {
  return function (x, y) {
      return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
  };
};
// search function
Vue.filter('searchFor', function (value, searchString) {
  var result = [];
  if(!searchString){
    return value;
  }
  searchString = searchString.trim().toLowerCase();
  result = value.filter(function(item){
    if(item.title.toLowerCase().indexOf(searchString) !== -1){
        return item;
    }
  })
  return result;
})
// vue
var demo = new Vue({
	el: '#main',
	data: {
		layout: 'list',
		searchString: "",
		films:[],
	},
	ready: function() {
		this.getFilms();
	},
	methods:{
		getFilms:function(){
			this.$http.get('http://cors.io/?u=http://swapi.co/api/films').then((response)=>{
				var results = response.json().results;
				//sorting by episode id
				results.sort(sortByProperty('episode_id'));
				for(i=0;i<response.json().count;i++){
					//add img, price, active into json
					results[i].image="img/"+(i+1)+".jpg";
					results[i].price=19.99;
					results[i].active=false;
				}
				this.$set('films',results); 
			},(response)=>{
				console.log(response);
			})
		},
		//set active or not
		toggleActive: function(s){
        s.active = !s.active;
    },
    //get total price
		total: function(){
    	var total = 0;
    	this.films.forEach(function(s){
    		if (s.active){
    			total+= s.price;
    		}
    	});
	   return total;
    },
    //get sum item
    sum: function(){
    	var count = 0;
    	this.films.forEach(function(s){
    		if(s.active){
    			count++;
    		}
    	});
    	return count;
    }
	}
});