import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import SignUpModal from "./signupModal";

export default function UserLoginModal(props) {

    const [signupStatus, setSignUpStatus] = useState(false)

    const signupToggle = () => setSignUpStatus(!signupStatus)

    const handleSignUpModalSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.elements)
    }

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <Modal isOpen={props.userLoginModal} toggle={props.loginUserToggle} >
            <ModalHeader toggle={props.loginUserToggle}>Login as User</ModalHeader>
            <form onSubmit={props.handleUserModalSubmit} className="form">
                <ModalBody>
                    <div className="input-group">
                        <label htmlFor="user_email">Email:</label>
                        <input
                            type="email"
                            id="user_email"
                            name="user_email"
                            required={true}
                        />
                    </div><br/>
                    <div className="input-group">
                        <label htmlFor="user_password">Password:</label>
                        <input
                            type="password"
                            id="user_password"
                            name="user_password"
                            required={true}
                        />
                    </div><br/>
                </ModalBody>
                <SignUpModal
                    signupStatus={signupStatus}
                    signupToggle={() => signupToggle()}
                    handleSignUpModalSubmit={handleSignUpModalSubmit}
                />
                <ModalFooter>
                    <Button
                        block={true}
                        color="info"
                        outline={true}
                        onClick={signupToggle}
                    >
                        Click here to create a restaurant account with us...
                    </Button>
                    <SignUpModal
                        signupStatus={signupStatus}
                        signupToggle={() => signupToggle()}
                        handleSignUpModalSubmit={handleSignUpModalSubmit}
                    />
                    <div className="modal-submit">
                        <Button color="danger" outline={true} onClick={props.loginUserToggle}>Cancel</Button>
                        <Button type="submit" color="success" outline={true}>Login as user...</Button>{' '}
                    </div>
                </ModalFooter>
            </form>
        </Modal>
    )
}