import styles from "../style";
import { discount } from "../assets";
import GetStarted from "./GetStarted";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "./Carousel";
import SearchBar from "./SearchBar";
import { AxiosInstance } from "axios";
import React from "react";
import { Anime } from "./Interface/InterfaceCollection";
interface HeroProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  client: AxiosInstance;
  setAnimes: React.Dispatch<React.SetStateAction<Anime[]>>;
  setUsePagination: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({
  setOpenModal,
  client,
  setAnimes,
  setUsePagination,
}: HeroProps) => {
  const animationVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        bounce: 0.2,
      },
    },
  };

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img
            src={discount}
            alt="discount"
            className="w-[32px] h-[32px] mr-2"
          />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">AI</span>-Powered{" "}
            <span className="text-white">Anime</span> Recommendation System
          </p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <AnimatePresence>
            <motion.div
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                Explore Your <br className="sm:block hidden" />{" "}
                <span className="text-gradient">Favorite Animes</span>{" "}
              </h1>
            </motion.div>
          </AnimatePresence>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted setOpenModal={setOpenModal} />
          </div>
        </div>
        <AnimatePresence>
          <motion.h1
            className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full"
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
          >
            With Apriome.
          </motion.h1>
        </AnimatePresence>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Tell us what kind of anime gets you excited! Share your favorites and
          we'll create a personalized list just for you!
        </p>
        <SearchBar
          animationVariants={animationVariants}
          client={client}
          setAnimes={setAnimes}
          setUsePagination={setUsePagination}
        ></SearchBar>
      </div>
      <motion.div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        initial={{ x: "7rem", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2,
          type: "ease-in",
        }}
      >
        <Carousel></Carousel>
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 scarlet__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 scarlet__gradient" />
      </motion.div>
      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted setOpenModal={setOpenModal} />
      </div>
    </section>
  );
};

export default Hero;
