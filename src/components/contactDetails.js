import { Link, useLocation } from "react-router-dom"
import '../themes/contactDetails.css'
const ContactDetails = () => {
    const location = useLocation()
    const { name, email } = location.state || {}
    return (
        <div className="detailsContainer">
            <h3>Contact Details</h3>
            <div className="displayDetails">
                <text>{name}</text>
                <text>{email}</text>
            </div>
            <Link to={'/'}>
                <button className="detailsButton">
                    Back to Contact List
                </button>
            </Link>
        </div>
    )
}

export default ContactDetails