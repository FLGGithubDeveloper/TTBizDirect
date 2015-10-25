var React = require('react');

var Header = React.createClass({
    render: function () {
        /*return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")} data-transition="slide-out" ></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );*/
		return(
			<header className="bar bar-nav">
            <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")} data-transition="slide-out" ></a>
				<h1 className="title">{this.props.text}</h1>
			</header>
		);
    }
});

module.exports = Header;