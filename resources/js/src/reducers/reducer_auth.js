export default function (state = {}, action) {
    console.log(state);
    console.log('reducer pre state above');
    switch (action.type) {
        case 'register_user':
            return {
                ...state,
                currentUser: action.payload.data,
                isAuthenticated: true
            }

        case 'login_user':
            return {
                ...state,
                currentUser: action.payload.data,
                isAuthenticated: true
            }

        case 'logout_user':
            console.log('user logged out');
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false
            }

        case 'set_current_user':
            console.log(action.payload);
            console.log('current user payload above');
            return {
                ...state,
                currentUser: action.payload.data,
                isAuthenticated: true
            }
    
        default:
            return state;
    }
}