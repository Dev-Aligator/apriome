import {
  github
} from "../assets";

import { Anime } from "../components/Interface/InterfaceCollection";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    path: "",
  },
  {
    id: "authentication",
    title: "Sign In",
    path: "",
  },
];


export const socialMedia = [
  {
    id: "social-media-1",
    icon: github,
    link: "https://github.com/Dev-Aligator/apriome",
  },
];


export const defaultAnime:Anime = {
    id: "0",
    title: "",
    synopsis: "",
    genre: "",
    aired: "",
    episodes: 0,
    popularity: 0,
    ranked: 0,
    score: 0,
    img_url: "",
}


