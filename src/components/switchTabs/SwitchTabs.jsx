import React, {useState} from 'react'

import "./style.scss";

// jo trending meh call -- vha se data and onchange destructure krk lelo
// data is of array (day, week ) ese
const SwitchTabs = ({data, onTabChange}) => {

    const [selectedTab, setSelectedTab] = useState(0);
    // background move ke liye -- vo left state
    // div hai actually -- position left krenge to effect aa jayega
    const [left, setLeft] = useState(0);

    // css meh fixed width jisse -- index se multiply par vo vli chiz apne position pe pahauch jayegi
    const activeTab = (tab, index) => {
        setLeft(index * 100);

        // animation smooth ke liye -- shift hone pr set ho
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);

        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs">
            {/* saare tabs issi meh rehne vaale hai */}
            <div className="tabItems">
                {data.map((tab, index) => (
                    // dynamic rhegi ye class cz sbke liye hai
                    <span 
                    key={index} 
                    className={`tabItem ${
                        selectedTab === index ? "active" : ""
                    }`}
                    onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                
                {/* inline style krk left vle var ko left property de rhe */}
                <span className="movingBg" style={{left}}/>
            </div>
        </div>
   )
}

export default SwitchTabs
