import React from "react";
import "./ReviewList.css";
import Review from "./Review";

const Reviews = (props) => {
    let products = props.products;
  if (products === undefined) return <p>No reviews yet.</p>;

    if(products.length === 0) {
        return <p>No reviews yet.</p>
    }
  return (
    <main className="content">
        {products.map((each)=>{
            return(
                <div className={'review-product-container'}>
                    <div className={'review-product-title'}>
                        {each.title}
                    </div>
                    <div className={'review-product-reviews'}>
                        <Review reviews={each.reviews}/>
                    </div>
                    <hr />
                </div>
            )
        })}
    </main>
  );
};

export default Reviews;