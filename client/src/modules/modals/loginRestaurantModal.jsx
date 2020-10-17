import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import SignUpModal from "./signupModal";

export default function LoginRestaurantModal(props) {

    const [signupStatus, setSignUpStatus] = useState(false)

    const signupToggle = () => setSignUpStatus(!signupStatus)

    const handleSignUpModalSubmit = (e) => {
        e.preventDefault()
        const { type, veg, non_veg } = e.target.elements
        console.log(type.value, veg.value, non_veg.value)
    }

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div>
            <Modal isOpen={props.restaurantLoginModal} toggle={props.loginRestaurantToggle} >
                <ModalHeader toggle={props.loginRestaurantToggle}>Login as Restaurant</ModalHeader>
                <form onSubmit={props.handleRestaurantLogin} className="form">
                    <ModalBody>
                        <div className="input-group">
                            <label htmlFor="restaurant_email">Email:</label>
                            <input
                                type="email"
                                id="restaurant_email"
                                name="restaurant_email"
                                required={true}
                            />
                        </div><br/>
                        <div className="input-group">
                            <label htmlFor="restaurant_password">Password:</label>
                            <input
                                type="password"
                                id="restaurant_password"
                                name="restaurant_password"
                                required={true}
                            />
                        </div><br/>
                    </ModalBody>
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
                            <Button color="danger" outline={true} onClick={props.loginRestaurantToggle}>Cancel</Button>
                            <Button type="submit" color="success" outline={true} >Login as restaurant...</Button>{' '}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    )
}