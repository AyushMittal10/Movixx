import React from 'react'

// store meh se data chahiye
// import { UseSelector } from 'react-redux/es/hooks/useSelector';
import { useSelector} from 'react-redux';


import "./style.scss";

// genre meh ids ko destructure kiya -- jo carousel meh as props passed thi
// data meh -- movie ke object meh jo ids hai vo
const Genres = ({data}) => {
    // store meh jo genres hai -- vo iss meh store ho gye
    const {genres} = useSelector((state) => state.home);

    return (
        <div className="genres">
            {data?.map((g) => {
                // store meh available nhi -- simply return
                if(!genres[g]?.name) return;
                return (
                    // iske andar genre name print krwana -- vo genres se lenge
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                )
            })}

        </div>
  )
};

export default Genres
