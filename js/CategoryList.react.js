var Parse = require('parse').Parse;
//ParseReact sits on top of the Parse singleton
var ParseReact = require('parse-react');
var React = require('react');
var ParseComponent = ParseReact.Component(React);

var CategoryItem = require('./CategoryItem.react.js');

export default class CategoryList extends ParseComponent{
	observe(props,state){
		return{
			items: new Parse.Query('BusinessCategory').descending('frequency')
		};
	}

	render() {
       return (
        <ul className = "table-view">
            {this.data.items.map(function (category){
            //Loop over objects returned by the items query, rendering them with 
            //ReviewItem compnents
                return(
                    <CategoryItem key={category.objectId} category={category} />
                );
            },this)}             
        </ul>
        );
    }
}