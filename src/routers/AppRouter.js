import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import {firebase} from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setisLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            }else{
                setisLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setisLoggedIn]);
    if(checking){
        return (
            <h1>Wait...</h1>
        )
    }
    return (
        <Router>
            <Switch>
                <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLoggedIn}/>
                <PrivateRoute exact path="/" component={JournalScreen} isAuthenticated={isLoggedIn}/>
                <Redirect to="/auth/login"/>
            </Switch>
        </Router>
    )
}
