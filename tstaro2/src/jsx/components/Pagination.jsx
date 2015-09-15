export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var pagination = Array.from(new Array(this.props.pageCount), (x, i) => i + 1)
            .map(page => {
                let cnPage = "";
                if (this.props.currentPage == page)
                    cnPage = "active";
                return (
                    <li className={cnPage}><a href="#" onClick={this.handlePageClick.bind(this, page)}>{page}</a></li>
                );
            });
        var cnPrev = "";
        if (this.props.currentPage == 1)
            cnPrev = "disabled";
        var cnNext = "";
        if (this.props.currentPage == this.props.pageCount)
            cnNext = "disabled";
        return (
            <ul className="pagination">
                <li className={cnPrev}>
                    <a href="#" aria-label="Previous" onClick={this.handlePageClick.bind(this, this.props.currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pagination}
                <li className={cnNext}>
                    <a href="#" aria-label="Next" onClick={this.handlePageClick.bind(this, this.props.currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        );
    }

    handlePageClick(page, e) {
        e.preventDefault();
        if (page < 1 || page > this.props.pageCount)
            return;
        this.props.handlePageClick(page);
    }
}﻿
