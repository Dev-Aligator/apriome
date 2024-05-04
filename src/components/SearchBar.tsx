import { Variants, motion } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";

interface SearchBarProps {
  animationVariants: Variants | undefined;
}
const SearchBar = ({animationVariants}:SearchBarProps) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Kuroshitsuji: Book of Circus", "Vinland Saga", "Kekkai Sensen & Beyond", "Nanatsu no Taizai: Seisen no Shirushi", "Durarara!!x2 Ten", "Sayonara Zetsubou Sensei", "Overlord", "Bishoujo Senshi Sailor Moon"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
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
    
    if(isDisable) {
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
  return (
    <motion.div
      className="flexCenterSearch search-bar animate__animated animate__wobble"
      initial="hidden"
      animate="visible"
      variants={animationVariants}
    >
      <HiOutlineSearch color="#b0122d" size={25} />
      <input type="text" placeholder={text} onBlur={()=>{setIsDisable(false)}} onFocus={()=>{setIsDisable(true)}} />
      <button className="searchButton">Search</button>
    </motion.div>

  )
};

export default SearchBar;
