import React, {useEffect, useState} from "react";
import './Review.css';
import {Button, CircularProgress} from "@mui/material";

const Review = (props) => {
    const [count, setCount] = useState(3);
    let reviews = props.reviews;

    const [reviewDetails, setReviewDetails] = useState(<CircularProgress />)

    useEffect(() => {
        if(reviews.length > 0){
            setReviewDetails(
                <div className={'reviews'}>
                    {reviews.map((each,index) => {
                        return (
                            index < count ? <div className={'review'} key={index}>
                                <div className={'review-title'}>
                                    <div className={'review-user'}>
                                        <p>User: {each.reviewer_name}</p>
                                    </div>
                                    <div className={'review-rating'}>
                                        <p>Rating: {each.rating}</p>
                                    </div>
                                </div>
                                <div className={'review-content'}>
                                    <div className={'long-comment-container'}>{each.comment.length > 200 ? <div className={'long-string'}>
                                        <p id={'long-comment' + index} className={'long-string-comment'}>{each.comment.slice(0,200)}</p>
                                        <Button id={'long-comment-button' + index} sx={{marginBottom: "10px", backgroundColor:'#102027', color:'white'}} variant={'contained'} onClick={() => {
                                            let id = 'long-comment' + index;
                                            document.getElementById(id).innerText = each.comment;
                                            document.getElementById('long-comment-button' + index).style.display = 'none';
                                        }}>Show More</Button>
                                    </div> : <p className={'long-string-comment'}>{each.comment}</p>}</div>
                                </div>
                            </div> : null
                        )
                    })}
                </div>
            )
        }else{
            setReviewDetails(<div className={'reviews'}>
                No reviews yet.
            </div>)
        }
    },[count])

    function showMore(){
        if(count >= reviews.length){
            alert('No more reviews');
        }else{
            let curCount = count + 3;
            setCount(curCount);
        }
    }


    return(
        <div className={'review-container'}>
            {reviewDetails}
            <div className={'review-more-button'}>
                <Button variant={"contained"} sx={{color:'white', backgroundColor:'#102027', borderRadius:'25px'}} size={'large'} onClick={showMore} disabled={count >= reviews.length}>{count >= reviews.length ? "No More Views": "Show More"}</Button>
            </div>
        </div>
    )
}


export default Review;