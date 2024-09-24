import React from "react";
import TodayIcon from "@mui/icons-material/Today";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user-actions";
const Header = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <nav>
      <TodayIcon htmlColor="white" />
      {user.length !==0 ? (
        <div>
          <p>
            {user?.fName} {user?.lName}
          </p>

          <p onClick={()=> dispatch(logoutUser())}>Logout</p>
        </div>
      ) : (
        <div>
          <p>Login</p>
          <p>Signup</p>
        </div>
      )}
    </nav>
  );
};

export default Header;
