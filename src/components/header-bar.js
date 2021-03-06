import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import requiresLogin from './requires-login';
import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button 
                    onClick={() => this.logOut()}
                    className="logout-button"
                >Log out</button>
            );
        }
        return (
            <div className="header-bar">
                <h1 className="logo">Staccato</h1>
                <div className="logout-section">
                    <div className="header-username">
                        Username: {this.props.username}
                    </div>
                    <div className="header-name">
                        Name: {this.props.name}
                    </div>
                    <div className="logout-button">
                        {logOutButton}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        loggedIn: state.auth.currentUser !== null,
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        qList: state.auth.currentUser.qList,
        currentUser: state.auth.currentUser.id,
        question: state.questions.question
    };
};

export default requiresLogin()(connect(mapStateToProps)(HeaderBar));

