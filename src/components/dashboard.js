import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { Message } from 'semantic-ui-react';
import InputForm from './InputForm';
import Correct from './Correct';
import Incorrect from './Incorrect';
import './dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
    }

    render() {
        console.log('props', this.props);
        if (this.props.displayCorrect && !this.props.displayIncorrect) {
            return (
                <div className="dashboard row">
                    <div className="question-answer">
                        <Message
                            floating
                            className="question-card"
                        >
                            <Correct />
                        </Message>
                    </div>
                </div>
            );
        } else if (this.props.displayIncorrect && !this.props.displayCorrect) {
            return (
                <div className="dashboard row">
                    <div className="question-answer">
                        <Message
                            floating
                            className="question-card"
                        >
                            <Incorrect />
                        </Message>
                    </div>
                </div>
            );
        } else if (!this.props.displayIncorrect && !this.props.displayCorrect) {
            return (
                <div className="dashboard row">
                    <div className="question-answer">
                        <Message
                            floating
                            className="question-card"
                        >
                            <InputForm />
                        </Message>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    console.log('current user --->', currentUser)
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        qList: state.auth.currentUser.qList,
        currentUser: state.auth.currentUser.id,
        question: state.questions.question,
        displayCorrect: state.questions.displayCorrect,
        displayIncorrect: state.questions.displayIncorrect
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
