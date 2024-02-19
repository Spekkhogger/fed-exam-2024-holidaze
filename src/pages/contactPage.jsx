import { useToken } from "../stores/useUserStore";
import { useRole } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function ContactPage() {
    const {sendForm, handleSubmit} = useForm();
    const token = useToken();
    const navigate = useNavigate();

    function onSubmit() {
        navigate('/');
    }


    return (
        <div>
            <h1>Contact Us</h1>
            <p>Hello here goes text</p>
            {!token ? (
                <form id="loggedOutContact" className="form">
                    <input type="text" placeholder="Name" className="shadow appearance-none border rounded"/>
                    <input type="email" placeholder="Email" className="shadow appearance-none border rounded"/>
                    <textarea placeholder="Message" className="shadow appearance-none border rounded"></textarea>
                    <button className="button">Send</button>
                </form>
            ) : (
                <form id="loggedInContact" className="form">
                    <input type="text" placeholder="Name" className="shadow appearance-none border rounded"/>
                    <input type="email" placeholder="Email" className="shadow appearance-none border rounded"/>
                    <textarea placeholder="Message" className="shadow appearance-none border rounded"></textarea>
                    <button className="button" >Send</button>
                </form>
            )}

        </div>
    )
}

export default ContactPage;