import React from "react";
import {useNavigate} from "react-router-dom";
import './OrderPlaced.css'
const OrderPlaced = () => {
    const navigate = useNavigate();


    return (
        <div className="orderPlaced">
            <h2>Thank You for your Order!</h2>
            <h3>Your Mugs Order will be processed for shipping in by EOD</h3>
          <button className="homeBtn" onClick={(event) => {navigate('/')}}>Back to Shopping!</button>
        </div>
      );
}

export default OrderPlaced
