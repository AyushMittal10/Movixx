import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

// avtaar ki image hai (fallback img use agr koi nhi milegi toh)
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        // jab tk load nhi hota -- naam (top cast and cast data ye 2 word hi show)
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">

                        {/* img meh url daalna toh vo aap build krlo (nhi h toh fallback aa jayegi cast ki photo)*/}
                        {data?.map((item) => {
                            let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;

                            return (
                                // cast meh jitne bhi objects hai (har object meh id hai vo key bnali)
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl}/>
                                    </div>

                                    <div className="name">
                                        {item.name}
                                    </div>

                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;