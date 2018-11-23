import * as actions from '../actions';

export function commentReducer(state = initialCommentState, action: actions.CommentActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.GET_COMMENT_SUCCESS:
            const getCommentSuccessAction = action as actions.GetCommentSuccess;
            newState.allComments = [...newState.allComments, getCommentSuccessAction.payload];
            return newState;
        default:
            return state;    
    }
}

export const initialCommentState = {
    allComments: []
}