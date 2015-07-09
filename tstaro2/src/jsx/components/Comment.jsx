import BaseComponent from './BaseComponent.jsx'

export default class Comment extends BaseComponent {
    render() {
        return (
            <div classname="comment">
                <h2 classname="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
}
