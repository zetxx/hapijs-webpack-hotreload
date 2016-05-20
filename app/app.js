import React from 'react';
import ReactDOM from 'react-dom';

var CommentBox = React.createClass({
    render() {
        return (
            <div>
                Just a CommentBox
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);
