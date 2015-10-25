var Parse = require('parse').Parse;
//ParseReact sits on top of the Parse singleton
var ParseReact = require('parse-react');
var React = require('react');
var ParseComponent = ParseReact.Component(React);

var BusinessItem = require('./BusinessItem.react.js');


export default class BusinessList extends ParseComponent{
    observe(props,state){

       var categoryPointer = {
                                __type: 'Pointer',
                                className: 'BusinessCategory',
                                objectId: this.props.categoryId
                            }       

        return{

        businesses: new Parse.Query('Business').equalTo("category", categoryPointer)
        

        }
    }

    render() {
                        return (
                            <ul className = "table-view">
                                {this.data.businesses.map(function (business){
                                //console.log(business);
                                return(
                                    <BusinessItem key={business.objectId} business={business} />
                                );
                                },this)}             
                            </ul>
                        );
                    }

}