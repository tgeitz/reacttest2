export default function (state = {}, action) {
    switch (action.type) {
        case 'register_user':
            return {
                ...state,
                currentUser: action.payload.data,
                isAuthenticated: true,
                hasBeenChecked: true
            }

        case 'login_user':
            return {
                ...state,
                currentUser: action.payload.data,
                isAuthenticated: true,
                hasBeenChecked: true
            }

        case 'flush_user':
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
                hasBeenChecked: true
            }

        case 'set_current_user':
            return {
                ...state,
                currentUser: action.payload.data,
                isAuthenticated: true,
                hasBeenChecked: true
            }
    
        default:
            return state;
    }
}