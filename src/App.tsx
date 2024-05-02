import {
  Footer,
  Hero,
  Navbar,
  Modal,
  UserProfile,
} from "./components";
import styles from "./style";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  AleartProps,
  UserFeature,
} from "./components/Interface/InterfaceCollection";
import Aleart from "./components/Aleart";
import { environmentVariable } from "./constants/environment";
import AnimePage from "./components/AnimePage";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: environmentVariable.baseUrl,
});

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);


  const [userInfo, setUserInfo] = useState<[String, UserFeature | null]>([
    "undefine",
    null,
  ]);
  const [aleartInfo, setAleartInfo] = useState<AleartProps>({
    isAleart: 0,
  });

  useEffect(() => {
    client
      .get("/api/authenticate/", { withCredentials: true })
      .then(function () {
        setAuthenticated(true);
        getUser();
      })
      .catch(function () {
        setAuthenticated(false);
      });
  }, []);

  const getUser = () => {
    client
      .get("/api/get/user/")
      .then(function (res) {
        setUserInfo([res.data["user"]["email"], res.data["user_details"]]);
        setAleartInfo({
          isAleart: 1,
          title: "Success",
          normalText: "You're currently logged in !",
          strongText: "Start diving now",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-primary-custom w-full overflow-hidden main-modal">
            <Aleart
              isAleart={aleartInfo.isAleart}
              title={aleartInfo.title}
              normalText={aleartInfo.normalText}
              strongText={aleartInfo.strongText}
              setAleartInfo={setAleartInfo}
              severity={aleartInfo.severity}
              color={aleartInfo.color}
            ></Aleart>
            {modalOpen && !authenticated && (
              <Modal
                setOpenModal={setModalOpen}
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
                client={client}
                getUserFunction={getUser}
              />
            )}
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar
                  setAuthenticated={setAuthenticated}
                  setOpenModal={setModalOpen}
                  authenticated={authenticated}
                  client={client}
                  userInfo={userInfo}
                />
              </div>
            </div>
            <div className={`bg-primary-custom ${styles.flexStart}`}>
              <div className={`${styles.boxWidth}`}>
                <Hero setOpenModal={setModalOpen} />
              </div>
            </div>
            <div
              className={`bg-primary-custom ${styles.paddingX} ${styles.flexStart}`}
            >
              <div className={`movie-page-container ${styles.moviePageWidth} `}>
                <AnimePage client={client}></AnimePage>
                <Footer />
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/profile"
        element={
          <div className="bg-primary-profile">
            <Navbar
              setAuthenticated={setAuthenticated}
              setOpenModal={setModalOpen}
              authenticated={authenticated}
              client={client}
              userInfo={userInfo}
            />
            <UserProfile userInfo={userInfo} client={client}></UserProfile>
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default App;
