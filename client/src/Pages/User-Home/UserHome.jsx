import React from 'react';
import PrivateNavbar from '../../Components/PrivateNavbar';
import UserHeader from '../User-Home/UserHeader';
import Explore from '../User-Home/explore';
import FoodDisplay from '../Food/FoodDisplay';
import JuiceDisplay from '../Juice/JuiceDisplay';

const UserHome = () => {
  return (
    <div>
       <UserHeader/>
      
       <Explore/>
      
       <div id="food-display">
         <FoodDisplay/>
       </div>
        <hr className="explore-menu-hr" />
       <div id="juice-display">
         <JuiceDisplay/>
       </div>
    </div>
  );
}

export default UserHome;
