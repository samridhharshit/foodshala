import React, {useEffect, useState} from "react";
import { FormGroup, CustomInput, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function SignUpModal(props) {

    const [checkbox, setCheckBox] = useState([])

    useEffect(() => {
        console.log(checkbox)
    }, [checkbox])


    return (
        <Modal isOpen={props.signupStatus} toggle={props.signupToggle} >
            <ModalHeader toggle={props.signupToggle}>Signup as a User or Restaurant...</ModalHeader>
            <form onSubmit={props.handleSignUpModalSubmit} className="form">
                <ModalBody>
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required={true}
                        />
                    </div><br/>
                    <div className="input-group">
                        <label htmlFor="sign_up_email">Email:</label>
                        <input
                            type="email"
                            id="sign_up_email"
                            name="sign_up_email"
                            required={true}
                        />
                    </div><br/>
                    <div className="input-group">
                        <label htmlFor="sign_up_password">Password:</label>
                        <input
                            type="password"
                            id="sign_up_password"
                            name="sign_up_password"
                            required={true}
                        />
                    </div><br/>
                    <div className="input-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="select"
                            name="type"
                            id="type"
                            required={true}
                        >
                            <option value="Restaurant">Restaurant</option>
                            <option value="User">Customer</option>
                        </select>
                    </div><br/>
                    <div className="input-group">
                        <label htmlFor="rest-desc">If opted Restaurant. Let us know more about it.</label>
                        <input
                            style={{"width": "100%"}}
                            type="text"
                            id="rest-desc"
                            name="desc"
                        />
                    </div><br/>
                    <div className="input-group">
                        <label htmlFor="veg_as_a_preference">Do you prefer veg?</label>
                        <select
                            className="select"
                            name="veg"
                            id="veg_as_a_preference"
                            required={true}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div><br/>
                    <div className="input-group">
                        <label htmlFor="non-veg_as_a_preference">Do you prefer Non-veg?</label>
                        <select
                            className="select"
                            name="non_veg"
                            id="non-veg_as_a_preference"
                            required={true}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div><br/>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" outline={true} onClick={props.signupToggle}>Cancel</Button>
                    <Button type="submit" color="success" outline={true} >Signup...</Button>{' '}
                </ModalFooter>
            </form>
        </Modal>
    )
}