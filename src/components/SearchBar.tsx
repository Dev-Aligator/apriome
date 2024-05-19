import { Variants, motion } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import { AxiosInstance } from "axios";
import { Anime } from "./Interface/InterfaceCollection";

interface SearchBarProps {
  animationVariants: Variants | undefined;
  client: AxiosInstance;
  setAnimes: React.Dispatch<React.SetStateAction<Anime[]>>;
  setUsePagination: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchBar = ({
  animationVariants,
  client,
  setAnimes,
  setUsePagination,
}: SearchBarProps) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = [
    "Kuroshitsuji: Book of Circus",
    "Vinland Saga",
    "Kekkai Sensen & Beyond",
    "Nanatsu no Taizai: Seisen no Shirushi",
    "Durarara!!x2 Ten",
    "Sayonara Zetsubou Sensei",
    "Overlord",
    "Bishoujo Senshi Sailor Moon",
  ];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const [searchText, setSearchText] = useState("");
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, isDisable]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    if (isDisable) {
      updatedText = "";
    }
    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const inputChangeHandler = (textValue: string) => {
    setSearchText(textValue);
    if (textValue == "") {
      setUsePagination(true);
    }
  };
  const fetchAnimeData = async () => {
    try {
      const apiUrl = `/api/anime-search/`;
      const response = await client.get(apiUrl, {
        params: { keyword: searchText },
      });
      setAnimes(response.data["animes"]); // Update animes state using functional update to avoid dependency on previous state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setUsePagination(false);
    }
  };

  return (
    <motion.div
      className="flexCenterSearch search-bar animate__animated animate__wobble"
      initial="hidden"
      animate="visible"
      variants={animationVariants}
    >
      <HiOutlineSearch color="#b0122d" size={25} />
      <input
        type="text"
        placeholder={text}
        onChange={(event) => inputChangeHandler(event.target.value)}
        onBlur={() => {
          setIsDisable(false);
        }}
        onFocus={() => {
          setIsDisable(true);
        }}
      />
      <button className="searchButton" onClick={fetchAnimeData}>
        Search
      </button>
    </motion.div>
  );
};

export default SearchBar;
