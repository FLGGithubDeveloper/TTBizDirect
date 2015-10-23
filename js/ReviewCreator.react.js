var React = require('react');

var ReviewCreator = React.createClass({
	getInitialState: function (){
		return ({
			value:''
		});
	},

	render: function (){
		return (
			<div className="review_creator">
			<input value={this.state.value}
			onChange={this._onChange}
			onKeyDown={this._onKeyDown}
			/>
			<a onClick={this._submit} className="review_submit">Submit</a>
			</div>
		);
	},

	_onChange: function (e){
		this.setState({
			value: e.target.value
		});
	},
	_onKeyDown: function(e){
		if(e.keyCode == 120){
			this._submit();
		}
	},
	_submit: function(){
		this.props.submit(this.state.value);
		this.setState({
			value:''
		});
	}
});

module.exports = ReviewCreator;