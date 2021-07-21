import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
function ProductListing(props) {
    const [active, setActiveClass] = useState();
    const getProductDataList = (product_data, category) => {
        setActiveClass(category.pos_categ_id)
        props.getProductData(product_data, category);
    }
    return (
        <div className="product-listing">
            {/* <h2 className="main-title title-md my-3">Drink</h2> */}
            <ul className="listing">
                {
                    props.productCategory.map((category, i) => {
                        return (
                            // onClick={ () => getProductDataList(category.products,category)}
                            <li key={i} className={active === category.pos_categ_id ? 'active' : ''}>
                                <button className="btn btn-link" onClick={() => getProductDataList(category.products, category)}>
                                    {category.pos_categ_name}
                                    {
                                        active === category.pos_categ_id ? <IoIosArrowForward /> : null
                                    }

                                </button>

                            </li>

                        )
                    })
                }

            </ul>

        </div>
    )
}

export default ProductListing
