"use strict";
// import Util from '../utils/Util';
import LoginStore from '../stores/LoginStore';

export default class LoginForm {
    render() {
        return (
            <div className="container">
                <div className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <input type="text" ref="account" className="form-control" placeholder="Account" required autofocus />
                    <input type="password" ref="password" className="form-control" placeholder="Password" required />
                    <input type="text" ref="domain" className="form-control" placeholder="Domain" required />
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit"
                        onClick={this.handleSubmit.bind(this)}>Sign in</button>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        var account = React.findDOMNode(this.refs.account).value;
        var password = React.findDOMNode(this.refs.password).value;
        var domain = React.findDOMNode(this.refs.domain).value;
        if (account && password && domain)
            LoginStore.login(domain, account, password);
    }
}
