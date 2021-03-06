import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import {useForm} from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';
export const NoteScreen = () => {
    const {active: note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {title, body, id} = formValues;
    const dispatch = useDispatch();

    const activeId = useRef(note.id);
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch( activeNote(formValues.id, {...formValues}) );
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input type="text" placeholder="Awesome title" name="title" className="notes__title-input" autoComplete="off" value={title} onChange={handleInputChange}/>
                <textarea placeholder="what happend?" name="body"className="notes__textarea" value={body} onChange={handleInputChange}></textarea>
                {
                    (note.url) &&
                        <div className="notes__image">
                            <img src={note.url} alt={note.title}/>
                        </div>
                }
            </div>
            <button className="btn btn-danger" onClick={ handleDelete }>Delete</button>
        </div>
    )
}
