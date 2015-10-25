var React = require('react');

var BusinessItem = React.createClass({

	//this.setState({businessId: this.props.business.objectId});

    render: function (){
        return (
            <li className="table-view-cell">
                <a href={"#businesses/:" + this.props.business.objectId} className = "navigate-right">
                <span className="badge">{this.props.business.phone}</span>
                    {this.props.business.name}
                </a>
            </li>
        );
    }
});

module.exports = BusinessItem;