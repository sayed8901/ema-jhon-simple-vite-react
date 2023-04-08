import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const ReviewItem = ({product, handleRemoveFromCart}) => {
    const {name, id, quantity, img, price, shipping} = product;

    return (
        <div className='review-item'>
            <div className='item-info'>
                <img src={img} alt="" />
                <div className='item-description'>
                    <h3>{name}</h3>
                    <p>price: <span className='orange-text'>${price}</span></p>
                    <p>Shipping Charge: <span className='orange-text'>${shipping}</span></p>
                    <p>Order quantity: <span className='orange-text'>{quantity} pcs</span></p>
                </div>
            </div>

            {/* button to remove a single item */}
            <button className='btn-delete'>
                <FontAwesomeIcon className='delete-icon' icon={faTrashCan } onClick={() => handleRemoveFromCart(id)} />
            </button>
        </div>
    );
};

export default ReviewItem;