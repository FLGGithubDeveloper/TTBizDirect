var Parse = require('parse').Parse;
//ParseReact sits on top of the Parse singleton
var ParseReact = require('parse-react');
var React = require('react');
var ParseComponent = ParseReact.Component(React);

var BusinessItem = require('./BusinessItem.react.js');

export default class BusinessList extends ParseComponent{
    observe(props,state){
        return{
            
            businesses: new Parse.Query('Business').include('BusinessCategory').equalTo('objectId',this.props.categoryId)
            }
            /*deferred.resolve(category);
            var query = new Parse.Query('Business');
            query.matchesKeyInQuery('category',this.props.categoryId, query);
            query.find({
                success(function(results){

                }
            });*/


           // businesses: new Parse.Query('Business').equalTo('category', Parse.Object('_BusinessCategory', { objectId: 'yzf5JukFRb'}))
        };

    

    render() {
       return (
        <ul className = "table-view">
            {this.data.businesses.map(function (business){
            //Loop over objects returned by the items query, rendering them with 
            //ReviewItem compnents
                return(
                    <BusinessItem key={business.objectId} business={business} />
                );
            },this)}             
        </ul>
        );
    }
}

/*var BusinessList = React.createClass({

    render: function(){
        return (
        <ul className = "table-view">
            {this.data.businesses.map(function (business){
            //Loop over objects returned by the items query, rendering them with 
            //ReviewItem compnents
                return(
                    <BusinessItem key={business.objectId} business={business} />
                );
            },this)}             
        </ul>
        );

    }
});*/