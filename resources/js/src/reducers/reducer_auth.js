export default function (state = {}, action) {
    switch (action.type) {
        case 'register_user':
            return {
                ...state,
                currentUser: action.payload.data
            }

        case 'login_user':
            console.log(action.payload.data);
            console.log('payload above');
            return {
                ...state,
                currentUser: action.payload.data
            }

        case 'logout_user':
            return {
                ...state,
                currentUser: {}
            }
    
        default:
            return state;
    }
}