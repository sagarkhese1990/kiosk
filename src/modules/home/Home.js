import React from 'react'
import ProductDetail from './ProductDetail'
import ProductListing from './ProductListing'
// import getProductList from '../../services/ProductServices'
import { connect } from 'react-redux';
import { getProducts, getProductList, paymentCheckout } from '../../redux/actions/products.actions'
import Header from '../../components/shared/Header';
import { Button, Form, Modal } from 'react-bootstrap';
import { Helper } from '../../utils/Helper';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productsList: [],
            productData: [],
            paymentDetail: [],
            ispaymentLoading: true,
            subTotal: 0,
            totalTaxes: 0,
            totalprice: 0,
            isLoading: true,
            nutrition_prod_list: [],
            no_product_found: false,
            addonToppings: [],
            currentSelectedProduct: {},
            selectedProductDetails: {},
            checkoutDetail: {},
            show: false,
            name: '',
            phone_number: '',
            errors: [],
        }
    }
    componentDidMount() {
        this.props.getProducts();
        console.log(this.props.messgae);
        setTimeout(() => {
            this.setState({
                products: this.props.products
            })
            this.getProductData(this.props.products[0].products, this.props.products[0])
        }, 1000);

    }

    getProductData = (data, category) => {
        // console.log('user has selected following product: ', data, category);
        // this.setState(
        //     {
        //         selectedProductDetails: {
        //             pos_categ_id: category.pos_categ_id,
        //             pos_categ_name: category.pos_categ_name,
        //         }
        //     })
        this.props.getProductList(data);
        this.setState({
            isLoading: true,
        })
        setTimeout(() => {
            this.setState({
                productsList: this.props.productsList,

            })
        }, 0);
        this.setState({
            isLoading: false,
        })
    }
    calculateBill = (product) => {
        this.setState({
            currentSelectedProduct: product
        }, () => {
            // now create addons object
            const tempObj = JSON.parse(JSON.stringify(product));
            // get add on categories which user has selected

            const newAddonsObj = [];
            this.state.addonToppings.forEach((val) => {
                tempObj.addons.forEach((prodVal) => {
                    if (prodVal.addon_categ_id === val.addOnCategoryId) {
                        const it = newAddonsObj.filter((addOnVal) => {
                            return addOnVal.addon_categ_id === val.addOnCategoryId
                        }).length;
                        if (it === 0) {
                            newAddonsObj.push(prodVal);
                        }
                    }
                })
            });

            // console.log('new add ons objects', newAddonsObj);
            // separate out only values of addons which needs to pass

            const newAddonsProdObj = [];
            this.state.addonToppings.forEach((val) => {
                if (tempObj.id === val.productId) {
                    newAddonsProdObj.push({ ...val.nutrition_prod, addOnCategoryId: val.addOnCategoryId });
                }
            });
            // console.log('current add on for the selected product: ', newAddonsProdObj);

            // now push each addonds to respective newAddonsObj
            newAddonsObj.forEach((val, index) => {
                // console.log('val', val);
                newAddonsObj[index].products = [];
                newAddonsProdObj.forEach((val1, ind1) => {
                    // val1['sales_extras'] = val1.sale_extra_id
                    // newAddonsObj.push(val1['sales_extras'])
                    if (val1.addOnCategoryId === val.addon_categ_id) {
                        newAddonsObj[index].products.push(val1);
                    }
                })
            })
            // console.log('new', newAddonsObj);
            // now push each addonds to respective newAddonsObj
            let addSalesExtras = [];
            newAddonsObj.forEach((val, index) => {
                // console.log('val', val.products);
                val.products.forEach(ele => {
                    addSalesExtras.push(ele.sale_extra_id)
                })
            })
            // ?after adding slaes_extras
            // console.log('after adding slaes_extras', this.state.paymentDetail);
            // now set to current selected product
            // add product's basic details before applying it
            const prodItems = [{
                price: product.price,
                nutrition_data: product.nutrition_data,
                id: product.id,
                // img: product.img,
                name: product.name,
                addons: newAddonsObj
            }];

            const currentState = { ...this.state.selectedProductDetails, price: product.price, product_id: product.id, nutrition_data: product.nutrition_data, name: product.name, addons: newAddonsObj, sales_extras: addSalesExtras, qty: 1 }


            this.setState({
                selectedProductDetails: currentState,
            }, () => {
                // console.log('updated state', this.state.selectedProductDetails)

                // now check whether product alredy pushed or not
                const currentCartItems = this.state.paymentDetail;
                // console.log('current cart items', currentCartItems);
                // console.log('before pushing product details', this.state.selectedProductDetails);
                let isAvailFlg = false;
                // if already present then get that object from payment details and update the value of count and then again replace the object
                for (let i = 0; i < currentCartItems.length; i++) {
                    if (currentCartItems[i].name === this.state.selectedProductDetails.name) {
                        if (currentCartItems[i].sales_extras.toString() === this.state.selectedProductDetails.sales_extras.toString()) {
                            // console.log('both products are identical');
                            // we need to change the value of qty only
                            currentCartItems[i].qty = Number(currentCartItems[i].qty) + 1;
                            currentCartItems[i].price = product.price;
                            this.setState({ paymentDetail: currentCartItems }, () => {
                                // console.log('lets check the value ');
                                this.state.paymentDetail.map((price) => {
                                    this.setState({
                                        subTotal: this.state.subTotal + price.price,

                                    }, () => { this.taxes() })
                                })
                            })
                            isAvailFlg = true;
                            break;
                        } else {
                            isAvailFlg = false;
                        }
                    } else {
                        isAvailFlg = false;
                        // console.log('both products are different');
                    }
                }
                // })
                if (!isAvailFlg) {
                    //else directly add that object in the list item
                    this.state.paymentDetail.push(this.state.selectedProductDetails)
                    this.state.paymentDetail.map((price) => {
                        this.setState({
                            subTotal: this.state.subTotal + price.price,

                        }, () => { this.taxes() })
                    })
                    this.setState({
                        ispaymentLoading: false,
                    })
                }
                if (currentCartItems.length === 0) {
                    this.state.paymentDetail.push(this.state.selectedProductDetails)
                    this.state.paymentDetail.map((price) => {
                        this.setState({
                            subTotal: this.state.subTotal + price.price,

                        }, () => { this.taxes() })
                    })
                    this.setState({
                        ispaymentLoading: false,
                    })

                }
            })
        })
    }
    taxes = () => {
        this.setState({
            totalTaxes: this.state.subTotal * (12 / 100),

        }, () => {
            this.setState({
                totalprice: this.state.subTotal + this.state.totalTaxes
            })
        })
    }
    addNutitions = (nutritions, product, nutrition_prod, addon_to_add) => {
        if (nutrition_prod.is_mod === false) {
            this.state.addonToppings.push({
                nutrition_prod,
                addOnCategoryId: nutritions.addon_categ_id,
                productId: product.id
            });
        } else {
            const newAddonArray = this.state.addonToppings.filter((filter) => {
                return filter.nutrition_prod.sale_extra_id !== nutrition_prod.sale_extra_id
            })
            this.setState({
                addonToppings: newAddonArray
            })
        }
        // console.log('add nutrition values: ', nutritions, product, nutrition_prod, addon_to_add);
        // console.log('addonToppings 2: ', this.state.addonToppings);
        let result = this.state.productsList;
        result.map((data, i) => {
            if (data.id === product.id) {
                data.addons.map((addon, i) => {
                    if (addon.addon_categ_id === nutritions.addon_categ_id) {
                        if (nutrition_prod.is_mod === false) {
                            nutrition_prod.is_mod = true;
                            data.price = nutrition_prod.price + data.price;
                            data.nutrition_data.sugar = nutrition_prod.nutrition_data.sugar + data.nutrition_data.sugar;
                            data.nutrition_data.carbs = nutrition_prod.nutrition_data.carbs + data.nutrition_data.carbs;
                            data.nutrition_data.energy = nutrition_prod.nutrition_data.energy + data.nutrition_data.energy;
                            data.nutrition_data.fat = nutrition_prod.nutrition_data.fat + data.nutrition_data.fat;
                            data.nutrition_data.protein = nutrition_prod.nutrition_data.protein + data.nutrition_data.protein;
                            data.nutrition_data.saturated_fat = nutrition_prod.nutrition_data.saturated_fat + data.nutrition_data.saturated_fat;
                            data.nutrition_data.sodium = nutrition_prod.nutrition_data.sodium + data.nutrition_data.sodium;
                        } else {
                            nutrition_prod.is_mod = false;
                            data.price = data.price - nutrition_prod.price;
                            data.nutrition_data.sugar = data.nutrition_data.sugar - nutrition_prod.nutrition_data.sugar;
                            data.nutrition_data.carbs = data.nutrition_data.carbs - nutrition_prod.nutrition_data.carbs;
                            data.nutrition_data.energy = data.nutrition_data.energy - nutrition_prod.nutrition_data.energy;
                            data.nutrition_data.fat = data.nutrition_data.fat - nutrition_prod.nutrition_data.fat;
                            data.nutrition_data.protein = data.nutrition_data.protein - nutrition_prod.nutrition_data.protein;
                            data.nutrition_data.saturated_fat = data.nutrition_data.saturated_fat - nutrition_prod.nutrition_data.saturated_fat;
                            data.nutrition_data.sodium = data.nutrition_data.sodium - nutrition_prod.nutrition_data.sodium;
                        }

                    }
                })
            }
        })
        this.setState(result)
    }

    handleSearch = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") {
            this.setState({
                productsList: this.props.productsList
            })
        }
        else {
            const filteredData = this.state.productsList.filter(item => {
                return Object.keys(item).some(key =>
                    item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });

            if (filteredData.length === 0) {
                this.setState({
                    no_product_found: true
                })
            }
            this.setState({
                productsList: filteredData
            })
        }
    }

    proceedForPayment = (event) => {
        event.preventDefault();
        const { name, phone_number } = this.state;
        if (this.validate()) {
            this.setState({
                checkoutDetail: {
                    params: {
                        customer_name: name,
                        phone: phone_number,
                        order_lines: this.state.paymentDetail,
                    }
                    // total_price: this.state.totalprice
                }
            }, () => {
                // console.log('checkout data', JSON.stringify(this.state.checkoutDetail));
                // const params = this.state.checkoutDetail;
                // console.log('params', this.state.checkoutDetail);
                this.props.paymentCheckout(this.state.checkoutDetail)
                this.setState({
                    show: false,
                    checkoutDetail: {},
                    paymentDetail: [],
                    subTotal: 0,
                    totalTaxes: 0,
                    totalprice: 0
                }, () => {
                    // console.log('messgae', this.props.messgae.products.message);
                    this.props.getProducts();
                })

            })
        }

    }

    handlePlaceOrder = () => {
        this.setState({
            show: !this.state.show
        })
    }
    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    validate = () => {
        const { name, phone_number } = this.state;
        let fieldError = [];
        let result = true;
        if (Helper.isNull(name)) {
            fieldError['name'] = "Please enter name";
            result = false;
        }
        // var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (Helper.isNull(phone_number) || Helper.isNumber(phone_number)) {
            fieldError['phone_number'] = "Please enter valid phone number";
            result = false;
        }
        this.setState({ errors: fieldError });
        return result;
    }
    render() {
        return (
            <>
                <Header handleSearch={this.handleSearch} />
                <div className="grid-layout">

                    <ProductListing productCategory={this.state.products} getProductData={this.getProductData} />
                    <ProductDetail
                        productData={this.state.productsList}
                        isLoading={this.state.isLoading}
                        calculateBill={this.calculateBill}
                        addNutitions={this.addNutitions}

                    />


                    <div className="payment-detail px-5">
                        <h2 className="main-title title-md my-3  pb-2">Bill</h2>
                        {
                            this.state.ispaymentLoading === false && this.state.paymentDetail.map((payment, i) => {
                                return (
                                    <div className="bill-info py-4 border-bottom" key={i}>
                                        <p className="d-flex justify-content-between">
                                            <span className="fw-bold fs-4">{payment.name}</span>
                                            <span className="fw-bold fs-4 text-coffie">{payment.price}</span>
                                        </p>
                                        <p className="d-flex justify-content-between">
                                            <span className="fw-bold fs-4">Quantity</span>
                                            <span className="fw-bold fs-4 text-coffie">{payment.qty}</span>
                                        </p>
                                        <p className="d-flex justify-content-start">
                                            {payment.addons.map((addons, idx) => {
                                                return (
                                                    <React.Fragment key={idx}>
                                                        {addons.products.map((category, index) => {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <span className="fw-bold fs-5 d-inline-block me-2">{category.name},</span>
                                                                </React.Fragment>
                                                            )
                                                        })}
                                                    </React.Fragment>
                                                )
                                            })}
                                        </p>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Fat</th>
                                                    <th>Protein</th>
                                                    <th>Sugar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{payment.nutrition_data.fat}</td>
                                                    <td>{payment.nutrition_data.protein}</td>
                                                    <td>{payment.nutrition_data.sugar}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>


                                )
                            })
                        }

                        <div className="total">
                            <p className="d-flex justify-content-between">
                                <span className="fw-bold fs-4">Subtotal</span>
                                <span className="fw-bold fs-4 text-coffie">{this.state.subTotal}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span className="fw-bold fs-4">Taxes</span>
                                <span className="fw-bold fs-4 text-coffie">{parseFloat(this.state.totalTaxes).toFixed(2)}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span className="fw-bold fs-3">Total</span>
                                <span className="fw-bold fs-3 text-coffie">{parseFloat(this.state.totalprice).toFixed(2)}</span>
                            </p>
                            <div className="text-center">
                                {/* <Button color="success" variant="success" onClick={this.proceedForPayment}> Place Order</Button> */}
                                <Button color="success" disabled={this.state.paymentDetail.length > 0 ? false : true} variant="success" onClick={this.handlePlaceOrder}> Place Order</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={this.handlePlaceOrder}>
                    <Modal.Header>
                        <Modal.Title className="fs-3">User Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-5" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={this.state.name}
                                    onChange={(e) => this.onChangeText('name', e.target.value)}
                                />
                                {this.state.errors['name'] !== undefined ?
                                    <span className='error text-danger'>{this.state.errors['name']} </span>
                                    : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-5" controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    onChange={(e) => this.onChangeText('phone_number', e.target.value)}
                                    value={this.state.phone_number}
                                />
                                {this.state.errors['phone_number'] !== undefined ?
                                    <span className='error text-danger'>{this.state.errors['phone_number']} </span>
                                    : null
                                }
                            </Form.Group>
                            <div className="text-center">
                                <Button color="success" variant="success" onClick={this.proceedForPayment}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    products: state.products.products,
    productsList: state.products.productsList,
    messgae: state
})
const mapDispatchToProps = {
    getProducts,
    getProductList,
    paymentCheckout
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
