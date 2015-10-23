var Parse = require('parse').Parse;
//ParseReact sits on top of the Parse singleton
var ParseReact = require('parse-react');
var React = require('react');
var ParseComponent = ParseReact.Component(React);

var Header = require('./Header.react.js');
var SearchBar = require('./SearchBar.react.js');
var CategoryList = require('./CategoryList.react.js');

/*export default class categoryServiceObject extends ParseComponent
{

    observe(props,state) {
        return {
            categories: new Parse.Query('BusinessCategory').ascending('frequency')
        };
    }

    findById(id){
        var deferred = $.Deferred();
            var category = null;
            var l = categories.length;
            for (var i = 0; i < l; i++) {
                if (categories[i].objectId == id) {
                    category = categories[i];
                    break;
                }
            }
            deferred.resolve(category);
            return deferred.promise();
    }

    findByName(searchKey)
    {
        var deferred = $.Deferred();
            var results = categories.filter(function (element) {
                var name = element.name;
                return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
    }*/

export default class HomePage extends ParseComponent
{

    observe(props,state) {
            return {
                categories: new Parse.Query('BusinessCategory').ascending('frequency')
            };
        }

    getInitialState() {

        return {categories = this.data.categories}
    }    

    render() {
        return (
            <div>
                <Header text="Categories" back="false"/>
                <SearchBar/>
                <div className="content">
                    <CategoryList categories={this.data.categories}/>
                </div>
            </div>
        );
    }


}


categoryService = (function () {

    var findById = function (id) {
            var deferred = $.Deferred();
            var category = null;
            var l = this.data.categories.length;
            for (var i = 0; i < l; i++) {
                if (this.data.categories[i].objectId == id) {
                    category = categories[i];
                    break;
                }
            }
            deferred.resolve(category);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            var results = ths.data.categories.filter(function (element) {
                var name = element.name;
                return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

       /* findBusinessList = function(id) {
            var deferred = $.Deferred();
            var category = null;
            var l = categories.length;
            for(var i = 0; i < l; i++){
                if(categories[i].objectId == id){
                    category = categories[i];
                    break;
                }
            }
            var businesses = category.businesses;
            deferred.resolve(businesses);
            return deferred.promise();

        },*/


    // The public API
    return {
        findById: findById,
        findByName: findByName
        //findBusinessList: findBusinessList
    };

};