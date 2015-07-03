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
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.Author}>
                    {comment.Title}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var regno = React.findDOMNode(this.refs.regno).value.trim();
        var author = React.findDOMNode(this.refs.author).value.trim();
        var title = React.findDOMNode(this.refs.title).value.trim();
        if (!regno || !title || !author) {
            return;
        }
        this.props.onCommentSubmit({regno: regno, author: author, title: title, tags: ""});
        React.findDOMNode(this.refs.regno).value = '';
        React.findDOMNode(this.refs.author).value = '';
        React.findDOMNode(this.refs.title).value = '';
        return;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="登録No" ref="regno" />
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="title" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var CommentBox = React.createClass({
    loadCommentFromServer: function() {
        var self = this;
        $.ajax({
            url: self.props.url,
            dataType: "json",
            cache: false
        }).done(function(data) {
            self.setState({data: data});
        }).fail(function(xhr, status, err) {
            console.error(self.props.url, status, err.toString());
        });
    },
    handleCommentSubmit: function(comment) {
        var self = this;
        $.ajax({
            url: self.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment
        }).done(function(data) {
            self.setState({data: data});
        }).fail(function(xhr, status, err) {
            console.error(self.props.url, status, err.toString());
        });
    },
    getInitialState: function() {
        return {data: {results: []}};
    },
    componentDidMount: function() {
        this.loadCommentFromServer();
    },
    render: function() {
        return (
            <div classname="commentBox">
                <h1>蔵書一覧</h1>
                <CommentList data={this.state.data.results} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

React.render(
    <CommentBox url="/api/books/sudako" />,
    document.getElementById('content')
);
