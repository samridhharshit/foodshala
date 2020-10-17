const initState = {
    user: null,
    restaurant: null,
    cart: null,
    currentlyLoggedIn: null
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "MOUNT_USER": return {
            ...state,
            user: action.user,
            currentlyLoggedIn: "user"
        }
        case "MOUNT_RESTAURANT": return {
            ...state,
            restaurant: action.restaurant,
            currentlyLoggedIn: "restaurant"
        }
        case "UNMOUNT_USER": return {
            ...state,
            user: null,
            currentlyLoggedIn: null
        }
        case "UNMOUNT_RESTAURANT": return {
            ...state,
            restaurant: null,
            currentlyLoggedIn: null
        }
        case "UPDATE_CART": return {
            ...state,
            cart: action.cart
        }
        default: return state
    }
}

export default rootReducer