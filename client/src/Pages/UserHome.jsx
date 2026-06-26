import React from 'react';
import PrivateNavbar from '../Components/PrivateNavbar';
import UserHeader from './UserHeader';
import Explore from './explore';
import FoodDisplay from './FoodDisplay';
import JuiceDisplay from './JuiceDisplay';

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
