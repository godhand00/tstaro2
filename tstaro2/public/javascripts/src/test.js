var data = [
    { author: "Pete Hunt", text: "This is one comment" },
    { author: "Jordan Walke", text: "This is *another* comment" }
];

var Comment = React.createClass( {
    render: function () {
        return (
            <div classname="comment">
                <h2 classname="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var CommentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div classname="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});

var CommentBox = React.createClass({
    render: function() {
        return (
            <div classname="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>
        );
    }
});

React.render(
    <CommentBox data={data} />,
    document.getElementById('content')
);
