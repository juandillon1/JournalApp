import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    const {notes} = useSelector(state => state.notes);
    const objNotes = Object.values(notes)
    return (
        <div className="journal__entries">
            {
                objNotes.map(note => (
                    <JournalEntry key={note.id} {...note}/>
                ))
            }
        </div>
    )
}
