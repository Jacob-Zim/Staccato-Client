import React from 'react';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchQuestion, displayCorrectSuccess, displayIncorrectSuccess } from '../actions/questions';

class Correct extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="answer-status">
                    <label className="q-correct">Questions correct: {this.props.history.qCorrect}</label>
                    <label className="q-total">Questions answered: {this.props.history.qTotal}</label>
                </div>
                <label className="question">{this.props.question.question}</label>
                <section className="response-section">
                    <label className="correct-response">Your answer was correct!</label>
                </section>
                <button className="next-button" onClick={ () => {
                    return this.props.dispatch(fetchQuestion(this.props.displayCorrect))
                }}>Next</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        qList: state.auth.currentUser.qList,
        question: state.questions.question,
        history: state.questions.history,
        currentUser: state.auth.currentUser,
        displayCorrect: state.questions.displayCorrect
    };
};

export default requiresLogin()(connect(mapStateToProps)(Correct));