import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch( login(user.uid, user.displayName) );
            dispatch( finishLoading() );
        })
        .catch(e => {
            Swal.fire(
                'Error', e.message, 'error'
            );
            dispatch( finishLoading() );
        });
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await user.updateProfile({displayName: name});
            dispatch(
                login(user.uid, user.displayName)
            )
        })
        .catch((e) => {
            Swal.fire(
                'Error', e.message, 'error'
            );
        });
    };
}

export const startGoogleLogin = () => {
    return (dispatch) => [
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName))
        })
    ]
}

export const login = (uId, displayName) => ({
    type: types.login,
    payload: {
        uId,
        displayName
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})