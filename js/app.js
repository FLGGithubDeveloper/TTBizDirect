var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var ParseComponent = ParseReact.Component(React);


Parse.initialize('Xf0pO13G4G4nM3Y0yh39Iup7XmwL1tdh9yTiYygP', '1LcUYGybK7YM1tXUvGGGxxQyYdz2Zd9DFlASWacA');

var CategoryList = require('./CategoryList.react.js');
var BusinessList = require('./BusinessList.react.js');
var Header = require('./Header.react.js');
var SearchBar = require('./SearchBar.react.js');
var NavBar = require('./NavBar.react.js');


/*export default class HomePage extends ParseComponent
{
    observe(props,state){
        return{
            categories: new Parse.Query('BusinessCategory').ascending('frequency')
        };
    }
    render() {
        return (
            <div>
                <Header text="Categories" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <CategoryList />
                </div>
                <NavBar />
            </div>
        );
    }
};*/


var HomePage = React.createClass({

    //this.setState({businessId: this.props.business.objectId});

    render: function (){
        return (
            <div>
                <Header text="Categories" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <CategoryList />
                </div>
                <NavBar />
            </div>
        );
    }
});


var CategoryPage = React.createClass({

    render: function (){
        return (
            <div>
            <Header text="Category" back="true"/>
                <div className="content">
                    <BusinessList categoryId={this.props.categoryId}/>
                </div>
                <NavBar />                                
            </div>
            
        );
    }
});



export default class BusinessPage extends ParseComponent
{
    observe(props,state){
        return{
            business: new Parse.Query('Business').equalTo("objectId", this.props.businessId)
        };
    }

    render() {        
        return (
            <div>
                <Header text={this.data.business.objectId} back="true"/>
                
                //<NavBar />                                
            </div>
            
        );
    }

};

/*var CategoryPage = React.createClass({
    getInitialState: function() {
        return {
            category: {},
            businesses: {}
        };
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.categoryId).done(function(result) {
            this.setState({category: result});
        }.bind(this));
        
    },
    render: function () {
        return (
            <div>
            <Header text="Category" back="true"/>
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <img className="media-object big pull-left" src={"pics/" + this.state.category.name + ".jpg" }/>
                            <h1>{this.state.category.name} </h1>
                            <p>{this.state.category.frequency}</p>
                        </li>                     
                    </ul>               
                </div>
                <div className="content">
                    <BusinessList businesses={this.state.businesses}/>
                </div>                                
            </div>
            
        );
    }
});*/


var App = React.createClass({
    getInitialState: function() {
        return {
            searchKey: '',
            categories: [],
            page: null
        }
    },

    findByName: function(searchKey) {

        /*var categories = [
        {"createdAt":"2015-09-24T21:33:34.485Z","frequency":0,"name":"Media","objectId":"bCitRsX0Dp","updatedAt":"2015-09-24T21:33:34.485Z","businesses":[{"id":1,"name":"Futureline Global"}, {"id":2,"name":"Glory Technology"}]}
        ];*/
            
            var deferred = $.Deferred();
            var results = this.categories.filter(function (element) {
                var name = element.name;
                return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
    },
    searchHandler: function(searchKey) {
        this.findByName(searchKey).done(function(categories) {
            this.setState({searchKey:searchKey, categories: categories, page: <HomePage searchKey={searchKey} searchHandler={this.searchHandler} categories={categories}/>});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.setState({page: <HomePage /*searchKey={this.state.searchKey} searchHandler={this.searchHandler}*/ categories={this.state.categories}/>});
        }.bind(this));
        router.addRoute('categories/:id', function(id) {
            this.setState({page: <CategoryPage categoryId={id}/>});
        }.bind(this));
        router.addRoute('businesses/:id', function(id) {
            this.setState({page: <BusinessPage businessId={id}/>});
        }.bind(this));
        router.start();
    },
    
    render: function() {

        return this.state.page;
    }
});


React.render(<App/>, document.getElementById('app'));