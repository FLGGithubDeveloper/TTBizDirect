var Parse = require('parse').Parse;
//ParseReact sits on top of the Parse singleton
var ParseReact = require('parse-react');
var React = require('react');
var ParseComponent = ParseReact.Component(React);

var ReviewItem = require('./ReviewItem.react.js');
var ReviewCreator = require('./ReviewCreator.react.js');

// Top-Level component that binds to Parse using the ParseReact Mixin.
export default class ReviewList extends ParseComponent{
	observe(props,state){
		return{
			items: new Parse.Query('Review').ascending('createdAt')
		};
	}

	render(){
		return (
		<div className = {this.pendingQueries().length ? 'review_list loading': 'review_list'}>
			<a onClick={this._refresh.bind(this)} className='refresh'>Refresh</a>
			{this.data.items.map(function (i){
			//Loop over objects returned by the items query, rendering them with 
			//ReviewItem compnents
				return(
					<ReviewItem key={i.objectId} item = {i} update = {this._updateItem} destroy={this._destroyItem} />
				);
			},this)}
			<ReviewCreator submit = {this._createItem} />
		</div>
		);
	}

	_refresh(){
		this.refreshQueries('items');
	}

	//Create mutation takes a className and a set of attributes
	_createItem(text){
		ParseReact.Mutation.Create('ReviewItem', { comment: comment}).dispatch();
	}

	_updateItem(id, comment){
		ParseReact.Mutation.Set(id, {comment: comment}).dispatch();
	}

	_destroyItem(id){
		ParseReact.Mutation.Destroy(id).dispatch();
	}
}