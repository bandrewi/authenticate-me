import { csrfFetch } from "./csrf"

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

//don't need return the parenthesis makes it implicit
const setUser = (user) => ({
    type: SET_USER,
    user
})

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;

    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    })

    const data = await res.json()

    dispatch(setUser(data.user))
    return res
}

const initialiedState = { user: null }

export default function sessionReducer(state = initialiedState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = { ...state }
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState = { ...state }
            newState.user = null
            return newState
        default:
            return state
    }
}