import React, { useEffect } from 'react'
import { useState } from 'react';
function PaymentDetail(props) {
    
    const [paymentData, setPaymentData] = useState([]);
    useEffect(() => {
        return () => {
            setPaymentData(props.paymentDetail)
        }
    },[props.paymentDetail])
    return (
        
       
        <div className="payment-detail px-5">
            <h2 className="main-title title-md my-3 border-bottom pb-2">Bill</h2>
            {
           paymentData.length > 0 && paymentData.map((payment, i) => {
                    return (
                        <div className="bill-info py-4 border-bottom" key={i}>
                            <p className="d-flex justify-content-between">
                                <span className="fw-bold fs-4">{payment.name}</span>
                                <span className="fw-bold fs-4 text-success">63</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span className="fs-4">Amount</span>
                                <span className="fs-4">63</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span className="fs-4">Size</span>
                                <span className="fs-4">L</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span className="fs-4">Sugar</span>
                                <span className="fs-4">30%</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span className="fs-4">Ice</span>
                                <span className="fs-4">30%</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span className="fs-4">Topping</span>
                                <span className="fs-4">Pineapple Jelly</span>
                            </p>
                        </div>
                    )
                })
            }

            <div className="total my-4">
                <p className="d-flex justify-content-between">
                    <span className="fw-bold fs-4">Subtotal</span>
                    <span className="fw-bold fs-4 text-success">63.00</span>
                </p>
                <p className="d-flex justify-content-between">
                    <span className="fw-bold fs-4">Taxes</span>
                    <span className="fw-bold fs-4 text-success">03.00</span>
                </p>
                <p className="d-flex justify-content-between">
                    <span className="fw-bold fs-3">Total</span>
                    <span className="fw-bold fs-3 text-success">66.00</span>
                </p>
            </div>
        </div>
    )
}

export default PaymentDetail
