import BaseComponent from './BaseComponent.jsx'

export default class CommentForm extends BaseComponent {
	constructor() {
		super();
		this._bind('_handleSubmit');
	}

    _handleSubmit(e) {
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
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this._handleSubmit}>
                <input type="text" placeholder="登録No" ref="regno" />
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="title" />
                <input type="submit" value="Post" />
            </form>
        );
    }
}
