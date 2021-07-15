import React, { useContext } from 'react'
import { IoIosAddCircleOutline, IoIosCheckmark, IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { Accordion, Button, ButtonGroup, Col, Row, Tab, ToggleButton, useAccordionToggle } from 'react-bootstrap';
import { useState } from 'react';


function ProductDetail(props) {
    const [activeId, setActiveId] = useState('0');

    function toggleActive(id) {
      if (activeId === id) {
        setActiveId(null);
      } else {
        setActiveId(id);
        console.log(id);
      }
    }
    const [toppingValue, setToppingValue] = useState([]);
    const [addon_to_add, setAddOns] = useState([])
    const addToCart = (product) => {
        props.calculateBill(product);
    }
    const addToppings = (addons, product, addon_product, e) => {
        setToppingValue(topping => [...topping, e.currentTarget.value]);
        setTimeout(() => {
            setAddOns(addon => [...addon, addon_product]);
        }, 100);

        props.addNutitions(addons, product, addon_product)

    }
    return (

        <div className="product-detail">

            {
                props.productData.length === 0 ?
                    <div className="detail-box">
                        <p className="mb-0 no-product-found">No Products Found</p>
                    </div>
                    :
                    props.isLoading === false && props.productData.length > 0 && props.productData.map((product, i) => {
                        return (
                            <div className="detail-box" key={i}>
                                <p className="product-title">{product.name}</p>
                                <div className="nutition-detail">
                                    <div className="product-image">
                                        <img src={product.img} className="img-fluid" alt="product" />
                                        <div className="price-tag">
                                            {product.price}
                                        </div>
                                    </div>
                                    <div className="nutrition-box">
                                        <Row>
                                            <Col lg={4} className="mb-5">
                                                <div className="amount">
                                                    <p className="mb-0 box-title">Carbs</p>
                                                    <span className="value">{product.nutrition_data.carbs}</span>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-5">
                                                <div className="amount">
                                                    <p className="mb-0 box-title">Energy</p>
                                                    <span className="value">{product.nutrition_data.energy}</span>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-5">
                                                <div className="amount">
                                                    <p className="mb-0 box-title">Fat</p>
                                                    <span className="value">{product.nutrition_data.fat}</span>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-5">
                                                <div className="amount">
                                                    <p className="mb-0 box-title">Protein</p>
                                                    <span className="value">{product.nutrition_data.protein}</span>
                                                </div>
                                            </Col>

                                            <Col lg={4} className="mb-5">
                                                <div className="amount">
                                                    <p className="mb-0 box-title">Sodium</p>
                                                    <span className="value">{product.nutrition_data.sodium}</span>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-5">
                                                <div className="amount">
                                                    <p className="mb-0 box-title">Sugar</p>
                                                    <span className="value">{product.nutrition_data.sugar}</span>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-5">
                                                <div className="amount">
                                                    <p className="mb-0 box-title">Saturated Fat</p>
                                                    <span className="value">{product.nutrition_data.saturated_fat}</span>
                                                </div>
                                            </Col>
                                        </Row>


                                    </div>
                                </div>
                               
                                <Col lg={12} className="mb-5">
                                    <Accordion>
                                    {
                                        product.addons.map((addon, i) => {
                                            return (
                                                    <div className="amount" key={addon.addon_categ_id}>

                                                        <p className="mb-0 box-title">{addon.addon_categ_name}
                                                            <Accordion.Toggle as={Button} 
                                                                onClick={() => toggleActive(addon.addon_categ_name)}  className="toggle-button" variant="link" eventKey={addon.addon_categ_name}>
                                                                    {
                                                                        activeId === addon.addon_categ_name ? <IoIosArrowDropup /> :  <IoIosArrowDropdown />
                                                                    }
                                                               
                                                            </Accordion.Toggle>
                                                        </p>

                                                        <Accordion.Collapse eventKey={addon.addon_categ_name}>
                                                            <div className="w-100">

                                                                <Tab.Container id="left-tabs-example" defaultActiveKey={product.name}>
                                                                    <>
                                                                        <div className="btn-group w-100" role="group" aria-label="Basic example">
                                                                            <ButtonGroup className="button-selection-group toppings">
                                                                                {addon.products.map((topping, idx) => (
                                                                                    <>
                                                                                        <div className="img-button text-center">
                                                                                            <ToggleButton
                                                                                                key={idx}
                                                                                                id={`radio-${idx}`}
                                                                                                type="checkbox"
                                                                                                variant={'outline-success'}
                                                                                                name={`checkbox-${idx}`}
                                                                                                value={topping.name}
                                                                                                // disabled={topping.is_mod ? true : false}
                                                                                                checked={topping.is_mod}
                                                                                                onChange={(e) => addToppings(addon, product, topping, e)}
                                                                                            >
                                                                                                <img src={topping.img} alt="topping" />
                                                                                                <div className="selected">
                                                                                                    <IoIosCheckmark />
                                                                                                </div>
                                                                                            </ToggleButton>
                                                                                            <p>{topping.name}</p>
                                                                                        </div>
                                                                                    </>
                                                                                ))}
                                                                            </ButtonGroup>

                                                                        </div>

                                                                    </>
                                                                </Tab.Container>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </div>
                                            )
                                        })
                                    }
                                    </Accordion>

                                </Col>
                                <Col lg={12} className="text-end">
                                    <Button color="success" variant="success" onClick={() => addToCart(product)}>Add to Cart <IoIosAddCircleOutline /></Button>
                                </Col>
                            </div>

                        )
                    })
            }


        </div>
    )
}

export default ProductDetail
