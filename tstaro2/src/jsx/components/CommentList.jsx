import BaseComponent from './BaseComponent.jsx'
import Comment from './Comment.jsx'

export default class CommentList extends BaseComponent {
    render() {
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
}
