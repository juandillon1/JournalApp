import { db } from "../firebase/firebaseConfig";
import {types} from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () =>{
    return async(dispatch, getState) => {
        const {uId} = getState().auth;
        console.log(uId)
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };
        const doc = await db.collection(`${uId}/journal/notes`).add( newNote );
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
};

export const setNotes= ( notes ) => (
    {
        type: types.notesLoad,
        payload: notes
    }
);

export const startSaveNote = (note) => {
    return async ( dispatch, getState ) => {
        const {uId} = getState().auth;
        if(!note.url){
            delete note.url;
        }
        const noteToFirestore = {...note};
        delete noteToFirestore.id;
        await db.doc(`${uId}/journal/notes/${note.id}`).update( noteToFirestore );
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
    }
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async(dispatch, getState) =>  {
        const {active: activeNote} = getState().notes;
        Swal.fire(
            {
                title: 'Uploading...',
                text: 'Please wait',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            }
        )
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote));
        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        const uId = getState().auth.uId;
        Swal.fire(
            {
                title: 'Removing...',
                text: 'Please wait',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            }
        )
        await db.doc(`${uId}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
        Swal.close();
        Swal.fire('Note Removed!', '', 'success')
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout= () => ({
    type: types.notesLogoutCleaning
});