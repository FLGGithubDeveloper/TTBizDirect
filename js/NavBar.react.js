var React = require('react');

var NavBar = React.createClass({
    render: function () {
        /*return (
            <header classNameName="bar bar-nav">
                <a href="#" classNameName={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")} data-transition="slide-out" ></a>
                <h1 classNameName="title">{this.props.text}</h1>
            </header>
        );*/
		return(
			<nav className="bar bar-tab">
                <a className="tab-item active" href="#">
                    <span className="icon icon-home"></span>
                    <span className="tab-label">Home</span>
                </a>
                <a className="tab-item" href="#">
                    <span className="icon icon-person"></span>
                    <span className="tab-label">Profile</span>
                </a>
                <a className="tab-item" href="#">
                    <span className="icon icon-star-filled"></span>
                    <span className="tab-label">Favorites</span>
                </a>
                <a className="tab-item" href="#">
                    <span className="icon icon-search"></span>
                    <span className="tab-label">Search</span>
                </a>
                <a className="tab-item" href="#">
                    <span className="icon icon-gear"></span>
                    <span className="tab-label">Settings</span>
                </a>
            </nav>
		);
    }
});

module.exports = NavBar;