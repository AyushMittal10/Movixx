import React, { useState, useEffect } from "react";
// search icon
import { HiOutlineSearch } from "react-icons/hi";
// hamburger icon
import { SlMenu } from "react-icons/sl";
// close icon
import { VscChromeClose } from "react-icons/vsc";
// movie and pages pe jaana -- toh navigator (move and tv show)
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    // hooks and states are created

    // scrolling effect of menu create
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);

    // 3 line rhs meh in mobile
    const [mobileMenu, setMobileMenu] = useState(false);
    // search icon vli chiz
    const [query, setQuery] = useState("");
    // dikhega search ya nhi vo state
    const [showSearch, setShowSearch] = useState("");

    const navigate = useNavigate();

    // route jaane pe -- iski value change ho jaati hai (current location btata)
    const location = useLocation();


    // next page pe scroll top pe aa jae -- random jgh se start nhi
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location])


    // scroll pr gyb vli functionality (logic likho)
    const controlNavbar = () => {
      // scroll amount btata
      // console.log(window.scrollY); 

      // lastscrollY humara state hai -- jo initially 0 tha
      // 200 se jyada -- toh hide varna show ho jaaye (jo top pe tha)
      // IMPPP -- mobile menu mtlb movie tv dropdown dikh rha toh hide nhi
      if(window.scrollY > 200) {
          if(window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
          } else {
            setShow("show");
          }
          
        }
      // 200 se km -- vohi blurr top vli position set krdo
      else {
        setShow("top");
      }  
      setLastScrollY(window.scrollY);
    }

    // jab bhi value change -- toh ye useEffect use hoga (uss m function hum bnaenge)
    useEffect(() => {
      window.addEventListener("scroll", controlNavbar)

      // Impp -- unmount krro event listener ko
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      }
    }, [lastScrollY])


    // dusre page pr jb redirect -- toh search icon open hi reh jayega
    const searchQueryHandler = (event) => {
      if(event.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`);
        setTimeout(() => {
          setShowSearch(false)
        }, 1000);
      }
    };

    // mobile menu ko handle krne ke liye
    const openSearch = () => {
      setMobileMenu(false)
      setShowSearch(true)
    }

    const openMobileMenu = () => {
      // open hua -- true ho jayegi ye mobile menu vli state
      setMobileMenu(true)
      setShowSearch(false)
    }

    // movie pe jana ya tv pe (dropdown meh dikhega uske type ke liye hai)
    // laptop mob, dono ke liye ho jayega yeah
    const navigationHandler = (type) => {
        if(type === "movie") {
            navigate("/explore/movie")
        }

        else{
          navigate("/explore/tv")
        }

        setMobileMenu(false)
    }

    // conditionally add classes -- curly bracket use (mobile styling add krne ke liye)
    return (
        // ye class header meh css se daalte hi img front upar and 3 tv, movie search on right
        <header className={`header ${mobileMenu ? "mobileView" 
        : ""} ${show}`}>
          {/* ye show krte hi background color top navbar ka aa jaega (and icon click krte hi homepage pe aa jaenge)*/}
            <ContentWrapper>
              <div className="logo" onClick={() => navigate("/")}>
                {/* normally load krwao picture ko -- lazy zrurt nhi (movix logo ke liye)*/}
                <img src={logo} alt=""/>

              </div>

              {/* movie, tv inko click krk move krre yeh (use navigate) */}
              <ul className="menuItems">
                <li className="menuItem" onClick={() => {
                  navigationHandler("movie")
                }}>Movies</li>
                <li className="menuItem" onClick={() => {
                  navigationHandler("tv")
                }}>TV Shows</li>
                {/* search vla icon (iss meh open search for desktop)*/}
                <li className="menuItem">
                    <HiOutlineSearch onClick={openSearch} />
                </li>
              </ul>

              {/* mobile icon and close button for mobiles */}
              <div className="mobileMenuItems">
                  <HiOutlineSearch onClick={openSearch}/>
                  {/* true hai tbhi execute ho ye condition */}
                  {/* true hai state -- close button varna hamburger icon*/}
                  {mobileMenu ? (
                    <VscChromeClose onClick={() => {
                      setMobileMenu(false)
                    }}/>
                  ) : (
                    <SlMenu onClick={openMobileMenu}/>
                  )}
                  
                  
              </div>
            </ContentWrapper>

            {/* search bar ke liye add kro ye (search input add krna)*/}
            {/* search icon pe click se hi khule ye (showSearch state true) */}
            { showSearch && <div className="searchBar">
                  <ContentWrapper>
                      <div className="searchInput">
                        <input type="text" 
                        placeholder='Search for a movie or tv show....'
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyUp={searchQueryHandler}/>
                        
                        <VscChromeClose onClick={() => {
                        setShowSearch(false)
                        }}/>
                      </div>  
                  </ContentWrapper>

            </div>}

        </header>
    );
};

export default Header;