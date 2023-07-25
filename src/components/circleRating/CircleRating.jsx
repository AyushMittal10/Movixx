import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// library use kr rhe (circular progressbar) and issi meh css bhi hai
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

// iss component meh value bhejni pdegi (rating) and gol gol ke andar kitna fill hua vo ye library kr rhi
// and max rating 10 hogi (and rating ke hisab se color aayega)
// by default rating 100 meh se hoga
const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;