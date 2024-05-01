import styles from "../style";
import { socialMedia } from "../constants";

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
          2024 Apriome. All Rights Reserved.
        </p>
        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
          <a href={social.link} key={social.id} target="_blank" rel="noopener noreferrer">
            <img
              src={social.icon}
              key={social.id}
              alt={social.id}
              className={`w-[42px] h-[42px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
            />
          </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
