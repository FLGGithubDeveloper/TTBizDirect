var React = require('react');

var CategoryItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#categories/:" + this.props.category.objectId} className="navigate-right" data-transition="slide-in">
                <span className="badge">{this.props.category.frequency}</span>
                    <img className="media-object small pull-left" src={"pics/" + this.props.category.name + ".jpg" }/>
                    {this.props.category.name}                    
                </a>
            </li>
        );
    }
});

module.exports = CategoryItem;