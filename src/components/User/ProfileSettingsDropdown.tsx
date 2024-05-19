import { useState } from "react";
import { userDefaultAvatat } from "../../assets";
import "../../styles/ProfileSettingsDropdown.sass";
import { UserFeature } from "../Interface/InterfaceCollection";
import { AxiosInstance } from "axios";

interface ProfileSettingsDropdownProps {
  userInfo: [String, UserFeature | null];
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  client: AxiosInstance;
}
const ProfileSettingsDropdown = ({
  userInfo,
  authenticated,
  setAuthenticated,
  client,
}: ProfileSettingsDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="profile-settings-dropdown-container">
      <div className="account">
        <div
          className="profile"
          onClick={() => {
            setOpenDropdown(!openDropdown);
          }}
        >
          <img
            src={
              userInfo[1]?.photoUrl ? userInfo[1].photoUrl : userDefaultAvatat
            }
            alt=""
          ></img>
        </div>

        <div
          className={openDropdown ? "menu acitvate-dropdown z-[10]" : "menu"}
        >
          <p>
            {userInfo[1]?.firstName && userInfo[1]?.lastName
              ? userInfo[1]?.firstName + " " + userInfo[1]?.lastName
              : "Default Username"}
          </p>
          <ul>
            <li>
              <i className="fa-regular fa-user"></i>
              <a href="/apriome/#/profile">Profile</a>
            </li>
            {/* <li>
              <i className="fa-solid fa-pen-to-square"></i>
              <a href="#">Edit</a>
            </li>
            <li>
              <i className="fa-regular fa-envelope"></i>
              <a href="#">Message</a>
            </li>
            <li>
              <i className="fa-solid fa-gear"></i>
              <a href="#">Settings</a>
            </li> */}
            <li>
              <i className="fa-solid fa-circle-question"></i>
              <a href="#">Help</a>
            </li>
            <li>
              <i className="fa-solid fa-right-from-bracket"></i>
              <a
                onClick={() => {
                  if (authenticated) {
                    client
                      .post("/api/auth/logout/", { withCredentials: true })
                      .then(function (res: any) {
                        console.log(res);
                        setAuthenticated(false);
                      });
                  }
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsDropdown;
