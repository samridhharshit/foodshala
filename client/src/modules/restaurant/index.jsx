import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'
import { connect } from 'react-redux'

function RestaurantMenu(props) {
    let { id } = useParams()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [menuList , setMenuList] = useState(null)
    const [emptyMenuMessage, setEmptyMenuMessage] = useState(null)

    const toggle = () => setModal(!modal);

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

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log('submitting form')

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
        console.log(emptyMenuMessage)
        return (
            <div className="container col-lg-9 align-content-center">
                <div className="list_story_header fixed-top">
                    <h4>{emptyMenuMessage}</h4>
                </div>
                <Button
                    onClick={toggle}
                    className="add-dish"
                    size="lg"
                    block
                >
                    If you are the restaurant manager. Add your first dish here...
                </Button>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Add coupon</ModalHeader>
                    <form onSubmit={handleFormSubmit} className="form">
                        <ModalBody>
                            <div className="input-group">
                                <label htmlFor="value">Code Value</label>
                                <input
                                    type="number"
                                    id="value"
                                    name="value"
                                />
                            </div><br/>
                            <div className="input-group">
                                <label htmlFor="codeValue">Your Code</label>
                                <input
                                    type="text"
                                    id="codeValue"
                                    name="code_string"
                                />
                            </div><br/>
                            <div className="input-group">
                                <label htmlFor="start-date">Start Date</label>
                                <input type="date" id="start-date" name="start_date"/>
                            </div><br/>
                            <div className="input-group">
                                <label htmlFor="end-date">End Date</label>
                                <input type="date" id="end-date" name="end_date"/>
                            </div><br/>
                            <div className="input-group">
                                <label htmlFor="thresholdAmount">Threshold Amount</label>
                                <input
                                    type="number"
                                    id="thresholdAmount"
                                    name="minAmount"
                                />
                            </div><br/>
                            <div className="input-group">
                                <label htmlFor="type">Type</label>
                                <select className="select" name="type" id="type">
                                    <option value="percentage">Percentage</option>
                                    <option value="flat">Flat</option>
                                </select>
                            </div><br/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" outline={true} onClick={toggle}>Cancel</Button>
                            <Button type="submit" color="success" outline={true} onClick={toggle}>Add Coupon...</Button>{' '}
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        )
    }

    return (
        <>
            <div className="container col-lg-9 align-content-center">
                <div className="list_story_header fixed-top">
                    <h1 className={'homelink logo'}>Select from below Restaurants</h1>
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
                                            className="footer-button"
                                        >
                                            Move Item to cart
                                        </button>
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