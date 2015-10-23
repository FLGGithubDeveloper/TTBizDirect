/*
 *  Copyright (c) 2015, Parse, LLC. All rights reserved.
 *
 *  You are hereby granted a non-exclusive, worldwide, royalty-free license to
 *  use, copy, modify, and distribute this software in source code or binary
 *  form for use in connection with the web services and APIs provided by Parse.
 *
 *  As with any software that integrates with the Parse platform, your use of
 *  this software is subject to the Parse Terms of Service
 *  [https://www.parse.com/about/terms]. This copyright notice shall be
 *  included in all copies or substantial portions of the software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 *
 */

var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var ParseComponent = ParseReact.Component(React);


// Insert your app's keys here:
Parse.initialize('Xf0pO13G4G4nM3Y0yh39Iup7XmwL1tdh9yTiYygP', '1LcUYGybK7YM1tXUvGGGxxQyYdz2Zd9DFlASWacA');

//var ReviewList = require('./ReviewList.react.js');
//var HomePage = require('./HomePage.react.js');
var CategoryList = require('./CategoryList.react.js');
var Header = require('./Header.react.js');




var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Header text="Categories" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <CategoryList categories={this.props.categories}/>
                </div>
            </div>
        );
    }
});



/*var App = React.createClass({
    mixins: [ParseReact.Mixin],*/

export default class App extends ParseComponent {

    getInitialState() {
        return {
            searchKey: '',
            categories: [],
            page: null
        };
    }

    observe(props,state) {
            return {
                categories: new Parse.Query('BusinessCategory').ascending('frequency'),
                user: ParseReact.currentUser
            };
    }

    findByName(searchKey) {
            var deferred = $.Deferred();
            var results = this.data.categories.filter(function (element) {
                var name = element.name;
                return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
    }

   searchHandler(searchKey) {
        this.findByName(searchKey).done(function(categories) {
            this.setState({searchKey:searchKey, categories: categories, page: <HomePage searchKey={searchKey} searchHandler={this.searchHandler} categories={categories}/>});
        }.bind(this));
    }

    componentDidMount() {
        router.addRoute('', function() {
            this.setState({page: <HomePage searchKey={this.state.searchKey} searchHandler={this.searchHandler} categories={this.state.categories}/>});
        }.bind(this));
        
        router.start();
    }

    render() {

        return this.state.page;
    }
    
};

//React.render(<App/>, document.getElementById('app'));  
