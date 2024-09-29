import { useState } from 'react'
import '../themes/addContactStyle.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const EditContact = ({ updateContact }) => {
    let location = useLocation();
    let navigate = useNavigate()
    let [contact, setContact] = useState({ id: location.state.id, name: location.state.name, email: location.state.email })
    const update = (e) => {
        e.preventDefault()
        if (contact.name === '' || contact.email === '') {
            alert('Each field should be filled')
            return;
        }
        updateContact(contact)
        setContact({ name: '', email: '' })
        navigate('/')
    }
    return (
        <div className='addContactContainer'>
            <h3>Edit Contact</h3>
            <form className='form' onSubmit={update}>
                <div className='formContainer'>
                    <label className='label'>Name</label>
                    <input type='text' name='name' placeholder='Enter your name' value={contact.name} onChange={(e) => { setContact({ ...contact, name: e.target.value }) }} />
                </div>
                <div className='formContainer'>
                    <label className='label'>Email</label>
                    <input type='text' name='email' placeholder='Enter your mail' value={contact.email} onChange={(e) => { setContact({ ...contact, email: e.target.value }) }} />
                </div>
                <button type='submit' className='formButton'>Update</button>
            </form>
        </div>
    )
}

export default EditContact;