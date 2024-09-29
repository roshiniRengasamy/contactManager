import '../themes/contactCardStyle.css'
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const ContactCard = ({ item, deleteContact }) => {
    let navigate = useNavigate()
    return (
        <div className='listContainer' >
            <BiUser className='user' size={25} />
            <div className='textContainer' onClick={() => { navigate(`/view/${item.id}`, { state: { name: item.name, email: item.email } }) }}>
                <text>{item.name}</text>
                <text>{item.email}</text>
            </div>
            <div className='iconContainer'>
                <MdEdit color='black' size={22} onClick={() => { navigate(`/edit/${item.id}`, { state: { id: item.id, name: item.name, email: item.email } }) }} />
            </div>
            <div className='iconContainer'>
                <IoMdTrash color='red' size={22} onClick={() => { deleteContact(item.id) }} />
            </div>
        </div>
    )
}

export default ContactCard;