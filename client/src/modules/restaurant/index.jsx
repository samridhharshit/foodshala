import React, {useEffect, useState} from 'react'
import {Redirect, useParams} from "react-router-dom";
import { Button } from "reactstrap";
import axios from 'axios'
import { connect } from 'react-redux'
import AddDishToMenuModal from "../modals/addDishToMenuModal";
import AddDishToCartModal from "../modals/addDishToCart";
import LoginRestaurantModal from "../modals/loginRestaurantModal";
import UserLoginModal from "../modals/userLoginModal";

function RestaurantMenu(props) {
    let { id } = useParams()
    const [login, setLogin] = useState(false)

    const [addDishToMenuModal, setAddDishToMenuModal] = useState(false)
    const [addDishToCartModal, setAddDishToCartModal] = useState(false)
    const [userLoginModal, setUserLoginModal] = useState(false)
    const [restaurantLoginModal, setRestaurantLoginModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [menuList , setMenuList] = useState(null)
    const [emptyMenuMessage, setEmptyMenuMessage] = useState(null)

    const addDishToMenuToggle = () => setAddDishToMenuModal(!addDishToMenuModal)
    const addDishToCartToggle = () => setAddDishToCartModal(!addDishToCartModal)
    const loginRestaurantToggle = () => setRestaurantLoginModal(!restaurantLoginModal)
    const loginUserToggle = () => setUserLoginModal(!userLoginModal)



    useEffect(() => {
        console.log(props.user, props.outlet)
        async function getItems() {
            const response = await axios.get(`/api/restaurant/get_items/${id}`)
            if (response.data.status === 200) {
                await setMenuList(response.data.data)
            } else {
                await setEmptyMenuMessage(response.data.message)
            }
            setLoading(false)
        }
        getItems()
    }, [loading])

    const handleCartModalSubmit = (e) => {
        alert('handle cart modal submit')
    }

    const handleUserLogin = (e) => {
        alert('handle user login modal submit')
        const { email, password } = e.target.elements
        if (email.name !== "sign_up_email" && password.name === "sign_up_password") {
            //@TODO process login for user
        }
    }

    const authorizeUserToAddDishToCart = async (e) => {
        e.preventDefault()
        if (props.user.access_token) {
            const user = await axios.get(`/api/user/get_user_details/${props.user.access_token}`)
            console.log(user)
            if (user.data.status === 200) {
                addDishToCartToggle()
            } else {
                // loginUserToggle()
                setLogin(!login)
            }
        } else {
            alert('You are not logged in! Login as a user to add item to your cart.')
            // loginUserToggle()
            setLogin(!login)
        }
    }

    const handleDishAdditionToRestaurantMenu = (e) => {
        e.preventDefault()
        console.log('submitting form')

    }

    const handleRestaurantLogin = (e) => {
        e.preventDefault()
        const { email, password } = e.target.elements
        if (email.name !== "sign_up_email" && password.name === "sign_up_password") {
            //@TODO process login for restaurant
        }
    }

    const checkForRestaurantOfficial = async (e) => {
        e.preventDefault()
        const outlet = await axios.get(`/api/restaurant/get_restaurant_details/${props.outlet.access_token}`)
        console.log(outlet)
        if (outlet.data.status === 200) {
            addDishToMenuToggle()
        } else {
            alert('You are not logged in! Login as a Restaurant official to add item to your menu.')
            // loginRestaurantToggle()
            setLogin(!login)
        }
    }

    if (loading) {
        return (
            <div className="container col-lg-9 align-content-center">
                <div className="list_story_header fixed-top">
                    <h1 className={'homelink logo'}>Loading...</h1>
                </div>
            </div>
        )
    }

    if (login) {
        return <Redirect to={'/login'} />
    }

    if (emptyMenuMessage) {
        return (
            <div className="container col-lg-9 align-content-center">
                <div className="list_story_header fixed-top">
                    <h4>{emptyMenuMessage}</h4>
                </div>
                <Button
                    onClick={checkForRestaurantOfficial}
                    className="add-dish"
                    size="lg"
                    block
                >
                    If you are the restaurant manager. Add your first dish here...
                </Button>
                <AddDishToMenuModal
                    addDishToMenuModal={addDishToMenuModal}
                    addDishToMenuToggle={() => addDishToMenuToggle()}
                    handleDishAdditionToRestaurantMenu={handleDishAdditionToRestaurantMenu}
                />
                <LoginRestaurantModal
                    restaurantLoginModal={restaurantLoginModal}
                    loginRestaurantToggle={() => loginRestaurantToggle()}
                    handleRestaurantLogin={handleRestaurantLogin}
                />
            </div>
        )
    }

    return (
        <>
            <div className="container col-lg-9 align-content-center">
                <div className="list_story_header fixed-top">
                    <h1 className={'homelink logo'}>Select item from below menu</h1>
                </div>
                {
                    menuList.map(menu => (
                        <div
                            key={menu._id}
                            className="row row-cols-1 row-cols-md-1"
                        >
                            <div className="col mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">{menu.name}</h4>
                                        <div className="text">{menu.desc ? menu.desc : "description"}</div>
                                    </div>
                                    <div className="card-footer">
                                        {
                                            menu.type && menu.type === "veg" ? (
                                                <img
                                                    src="https://img.icons8.com/fluent/24/000000/vegetarian-food-symbol.png"
                                                    alt="veg"
                                                />
                                            ) : null
                                        }
                                        {
                                            menu.type && menu.type === "non-veg" ? (
                                                <img
                                                    src="https://img.icons8.com/fluent/24/000000/non-vegetarian-food-symbol.png"
                                                    alt="non-veg"
                                                />
                                            ) : null
                                        }
                                        <button
                                            onClick={authorizeUserToAddDishToCart}
                                            className="footer-button"
                                        >
                                            Move Item to cart
                                        </button>
                                        <AddDishToCartModal
                                            addDishToCartModal={addDishToCartModal}
                                            addDishToCartToggle={() => addDishToCartToggle()}
                                            handleCartModalSubmit={handleCartModalSubmit}
                                        />
                                        <UserLoginModal
                                            userLoginModal={userLoginModal}
                                            loginUserToggle={() => loginUserToggle()}
                                            handleUserModalSubmit={handleUserLogin}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        outlet: state.restaurant
    }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu)