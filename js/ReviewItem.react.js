var React = require('react');

var PrettyDate = require('./PrettyDate.react.js');

var ReviewItem = React.createClass({
  getInitialState: function() {
    return ({
      editing: false,
      editComment: ''
    });
  },

  render: function() {
    if (this.state.editing) {
      return (
        <div className="review_item editing">
          <input
            ref="edit_input"
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            value={this.state.editComment}
          />
          <a className="save" onClick={this._stopEdit}>
            <i className="icon_submit" />
          </a>
        </div>
      );
    }
    return (
      <div className="review_item">
        <div className="item_comment">
          {this.props.item.comment}
          <div className="options">
            <a onClick={this._startEdit}><i className="icon_edit" /></a>
            <a onClick={this._removeItem}><i className="icon_delete" /></a>
          </div>
        </div>
        <div className="item_date">
          <PrettyDate value={this.props.item.createdAt} />
        </div>
      </div>
    );
  },

  _startEdit: function() {
    this.setState({
      editComment: this.props.item.comment,
      editing: true
    }, function() {
      // Set the cursor to the end of the input
      var node = this.refs.edit_input.getDOMNode();
      node.focus();
      var len = this.state.editComment.length;
      node.setSelectionRange(len, len);
    });
  },

  _onChange: function(e) {
    this.setState({
      editComment: e.target.value
    });
  },

  _onKeyDown: function(e) {
    if (e.keyCode === 120) {
      this._stopEdit();
    }
  },

  _stopEdit: function() {
    if (this.state.editComment) {
      this.props.update(this.props.item.objectId, this.state.editComment);
      this.setState({
        editing: false
      });
    } else {
      this.props.destroy(this.props.item.objectId);
    }
  },

  _removeItem: function() {
    this.props.destroy(this.props.item.objectId);
  }
});

module.exports = ReviewItem;