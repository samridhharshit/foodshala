import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { Alert, Button } from "reactstrap";
import axios from 'axios'
import { connect } from 'react-redux'
import AddDishToMenuModal from "../modals/addDishToMenuModal";
import AddDishToCartModal from "../modals/addDishToCart";
import * as firebase from "firebase";

function RestaurantMenu() {
    let { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [addDishToMenuModal, setAddDishToMenuModal] = useState(false)
    const [addDishToCartModal, setAddDishToCartModal] = useState(false)
    const [menuList , setMenuList] = useState(null)
    const [emptyMenuMessage, setEmptyMenuMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [errorVisible, setErrorVisible] = useState(false)
    const [itemName, setItemName] = useState(null)
    const [errorInCartAdditionMessage, setErrorInCartAdditionMessage] = useState(null)
    const [openToAddDish, setOpenToAddDish] = useState(false)

    const onDismiss = () => setVisible(false);
    const onErrorDismiss = () => setErrorVisible(false)

    const addDishToMenuToggle = () => setAddDishToMenuModal(!addDishToMenuModal)
    const addDishToCartToggle = () => setAddDishToCartModal(!addDishToCartModal)
    const openMenuToggle = () => setOpenToAddDish(!openToAddDish)



    useEffect(() => {
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
    }, [])

    const addDishToUserCart = async (e, dish) => {
        e.preventDefault()
        let token = null;
        if (await firebase.auth().currentUser && await firebase.auth().currentUser.getIdToken()) {
            token = await firebase.auth().currentUser.getIdToken()
        }
        if (token !== null) {
            const response = await axios.get(`/api/auth/get_user_details/${token}`)
            if (response.data.status === 200) {
                if (response.data.data.type === "user") {
                    console.log(dish)
                    const response = await axios.post('/api/user/order_food', {
                        foodId: dish._id,
                        access_token: token,
                        restaurantId: id
                    })
                    if (response.data.status === 200) {
                        await setItemName(`${dish.name}`)
                        await setVisible(!visible)
                    } else {
                        await setErrorInCartAdditionMessage(`${response.data.message}`)
                        await setErrorVisible(!errorVisible)
                    }
                } else if (response.data.data.type === "restaurant") {
                    alert("You are logged in as Restaurant. Kindly login as a user to view cart...")
                }
            } else {
                alert(response.data.message)
            }
        } else {
            alert('You are not logged in! login first...')
        }
    }

    const addDishToCartFormSubmit = async (e) => {
        e.preventDefault()
        const { name, price, type, desc } = e.target.elements
        console.log(name.value, price.value, type.value, desc.value)

        let token = null;
        if (await firebase.auth().currentUser && await firebase.auth().currentUser.getIdToken()) {
            token = await firebase.auth().currentUser.getIdToken()

            const response = await axios.post('/api/restaurant/addItem', {
                name: name.value,
                desc: desc.value,
                price: price.value,
                type: type.value,
                access_token: token
            })
            console.log(response)

            alert(`${response.data.message}`)
            openMenuToggle()
        } else {
            alert('token not valid. please logout once and again login...')
        }
    }

    const checkForRestaurant = async (e) => {
        e.preventDefault()
        let token = null;
        if (await firebase.auth().currentUser && await firebase.auth().currentUser.getIdToken()) {
            token = await firebase.auth().currentUser.getIdToken()

            const response = await axios.get(`/api/auth/get_user_details/${token}`)
            console.log(response.data)
            if (response.data.status === 200) {
                if (response.data.data.type === "user") {
                    alert('you have logged in with a user\'s account. Kindly log in as a restaurant to add item to menu list...')
                } else if (response.data.data.type === "restaurant"){
                    openMenuToggle()
                } else {
                    alert('login first')
                }
            } else {
                alert('Restaurant not found!.')
            }
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

    if (emptyMenuMessage) {
        return (
            <div className="container col-lg-9 align-content-center">
                <div className="list_story_header fixed-top">
                    <h4>{emptyMenuMessage}</h4>
                </div>
                <Button
                    onClick={checkForRestaurant}
                    className="add-dish"
                    size="lg"
                    block
                >
                    If you are the restaurant manager. Kindly login with the restaurant's credentials and add your first dish here...
                </Button>
                <AddDishToCartModal
                    openToAddDish={openToAddDish}
                    openMenuToggle={() => openMenuToggle()}
                    addDishToCartFormSubmit={addDishToCartFormSubmit}
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
                <Alert color="success" isOpen={visible} toggle={onDismiss}>
                    {itemName} added to your cart!
                </Alert>
                <Alert color="success" isOpen={errorVisible} toggle={onErrorDismiss}>
                    {errorInCartAdditionMessage}
                </Alert>
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
                                            onClick={(e) => addDishToUserCart(e, menu)}
                                            className="footer-button"
                                        >
                                            Move Item to cart
                                        </button>
                                        <AddDishToCartModal
                                            addDishToCartModal={addDishToCartModal}
                                            addDishToCartToggle={() => addDishToCartToggle()}
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
        outlet: state.restaurant,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(RestaurantMenu)