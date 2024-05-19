import { useState } from "react";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { AxiosInstance } from "axios";
import ProfileSettingsDropdown from "./User/ProfileSettingsDropdown";
import { UserFeature } from "./Interface/InterfaceCollection";

interface NavbarProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  authenticated: boolean;
  client: AxiosInstance;
  userInfo: [String, UserFeature | null];
}

const Navbar = ({
  setOpenModal,
  setAuthenticated,
  authenticated,
  client,
  userInfo,
}: NavbarProps) => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className="w-full flex py-6 justify-between items-center navbar"
      style={{ position: "relative", zIndex: "9999" }}
    >
      <img src={logo} alt="apriome" className="w-[124px] h-[64px]" />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, i) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              i === navLinks.length - 1
                ? authenticated
                  ? "profile-li"
                  : "mr-0"
                : "mr-10"
            } text-white mr-10`}
          >
            {i === navLinks.length - 1 ? (
              authenticated ? (
                // <a
                //   onClick={() => {
                //     if (authenticated) {
                //       client
                //         .post("/api/logout/", { withCredentials: true })
                //         .then(function (res: any) {
                //           console.log(res);
                //           setAuthenticated(false);
                //         });
                //     }
                //   }}
                // >
                //   Logout
                // </a>
                <ProfileSettingsDropdown
                  userInfo={userInfo}
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  client={client}
                ></ProfileSettingsDropdown>
              ) : (
                <a
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  {nav.title}
                </a>
              )
            ) : (
              <a href={`/apriome/${nav.path}`}>{nav.title}</a>
            )}
          </li>
        ))}
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((previous) => !previous)}
        />
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav, i) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  i === navLinks.length - 1 ? "mr-0" : "mb-4"
                } text-white mr-10`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
