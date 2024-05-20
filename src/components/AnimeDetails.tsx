import { useState, useEffect } from "react";
import "../styles/AnimeDetails.sass";
import { AleartProps, Anime } from "./Interface/InterfaceCollection";
import { AxiosInstance } from "axios";
import { defaultAnime } from "../constants";
import PuffLoader from "react-spinners/PuffLoader";
import { HiStar } from "react-icons/hi";
interface AnimeDetailsProps {
  client: AxiosInstance;
  setAleartInfo: React.Dispatch<React.SetStateAction<AleartProps>>;
  authenticated: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimeDetails = ({
  client,
  setAleartInfo,
  authenticated,
  setModelOpen,
}: AnimeDetailsProps) => {
  const [animeId, setAnimeId] = useState(window.location.href.split("/")[6]);
  const [anime, setAnime] = useState<Anime>(defaultAnime);
  const [genres, setGenres] = useState<String[]>();
  const [similarAnimes, setSimilarAnimes] = useState<Anime[]>([]);
  const [isLoadingSimilarAnimes, setIsLoadingSimilarAnimes] = useState(true);
  const [isLoadingAnimeDetails, setIsLoadingAnimeDetails] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [userScore, setUserScore] = useState(10);
  const fetchAnimeData = async () => {
    try {
      const apiUrl = `/api/anime/${animeId}`;
      const response = await client.get(apiUrl);
      setIsLoadingAnimeDetails(false);
      setAnime(response.data["anime"]); // Update animes state using functional update to avoid dependency on previous state
      setIsFavorite(response.data["is_favorite"]);
      setIsWatchlist(response.data["is_watchlist"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const fetchSimilarAnimes = async () => {
    try {
      const apiUrl = `/api/anime/similar?id=${animeId}`;
      const response = await client.get(apiUrl);
      setSimilarAnimes(response.data["similar_animes"]);
      setIsLoadingSimilarAnimes(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const handleSubmit = async (collectionType: String) => {
    if (!authenticated) {
      setModelOpen(true);
      return;
    }
    const formData = {
      animeId: animeId,
      typeOfCollection: collectionType,
      rating: userScore,
    };
    client
      .post("/api/anime/add-collection/", formData, { withCredentials: true })
      .then(function (response) {
        setAleartInfo({
          isAleart: 1,
          title: "Success",
          normalText: `${response.data["action"]} ${anime.title} - ${collectionType} !`,
        });
        if (collectionType == "favorite") {
          setIsFavorite(!isFavorite);
        } else {
          setIsWatchlist(!isWatchlist);
        }
      });
  };

  useEffect(() => {
    setIsLoadingSimilarAnimes(true);
    setIsLoadingAnimeDetails(true);
    fetchAnimeData();
    fetchSimilarAnimes();
  }, [animeId, authenticated]);

  useEffect(() => {
    if (anime) {
      anime.img_url = anime.img_url ? anime.img_url : "";
      anime.episodes = anime.episodes ? anime.episodes : 0;
      if (!anime.genre) {
        anime.genre = "['Unknown']";
      }
      setGenres(JSON.parse(anime.genre.replace(/'/g, '"')) as String[]);
    }
  }, [anime]);

  return (
    <>
      {isLoadingAnimeDetails ? (
        <div className="centered-div" style={{ height: "40vh" }}>
          <PuffLoader
            color={"#F07489"}
            loading={isLoadingAnimeDetails}
            size={200}
          />
        </div>
      ) : (
        <>
          <div className="header-container">
            <div className="header">
              <div itemProp="name">
                <h1 className="header-title" style={{ fontSize: "25px" }}>
                  <strong>{anime.title}</strong>
                </h1>
              </div>
            </div>
          </div>

          <div className="anime-details-body-container">
            <table border={0} cellPadding={0} cellSpacing={0} width="100%">
              <tbody>
                <tr>
                  <td className="left-column" width="225" valign="top">
                    <div style={{ width: "225px" }}>
                      <div style={{ textAlign: "center" }}>
                        <a href={anime.img_url ? anime.img_url : ""}>
                          <img
                            data-src={anime.img_url ? anime.img_url : ""}
                            alt={anime.title}
                            itemProp="image"
                            src={anime.img_url ? anime.img_url : ""}
                          />{" "}
                        </a>
                      </div>
                      <div className="action-link">
                        {" "}
                        <a
                          onClick={() => {
                            handleSubmit("watchlist");
                          }}
                        >
                          {isWatchlist ? "Remove from List" : "Add to My List"}
                        </a>
                      </div>

                      <div className="action-link">
                        <a
                          onClick={() => {
                            handleSubmit("favorite");
                          }}
                        >
                          {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                        </a>
                      </div>

                      <h2 className="section-header">Information</h2>

                      <div className="text-box-container">
                        <span className="textbox-title">Episodes:</span>
                        {anime.episodes}
                      </div>
                      <div className="text-box-container">
                        <span className="textbox-title">Status:</span>
                        Finished Airing
                      </div>
                      <div className="text-box-container">
                        <span className="textbox-title">Aired:</span>
                        {anime.aired}
                      </div>

                      <div className="text-box-container">
                        <span className="textbox-title">Genres:</span>

                        {genres?.map((tag, index) => (
                          <a
                            key={index}
                            href={`/anime/genre/ ${String(
                              tag.replace(/\s/g, "")
                            )}`}
                            title={String(tag)}
                          >
                            {" "}
                            {tag}
                            {index == genres.length - 1 ? "" : ","}
                          </a>
                        ))}
                      </div>

                      <h2 className="section-header">Statistics</h2>
                      <div
                        itemProp="aggregateRating"
                        itemType="http://schema.org/AggregateRating"
                        className="statistics-header"
                        data-id="info1"
                      >
                        <span className="anime-details-score">Score:</span>{" "}
                        <span itemProp="ratingValue" className="rating-value">
                          {anime.score?.toFixed(2)}
                        </span>
                        <sup className="sup-text">1</sup>
                        <meta itemProp="bestRating" content="10" />
                        <meta itemProp="worstRating" content="1" />
                      </div>
                      <div className="statistics-header" data-id="info2">
                        <span className="style-104">Ranked:</span>#
                        {anime.ranked}
                        <sup className="sup-text">2</sup>
                      </div>
                      <div
                        className="popularity-header"
                        style={{ padding: "3px 0px" }}
                      >
                        <span>Popularity:</span>#{anime.popularity}
                      </div>
                    </div>
                  </td>
                  <td valign="top" className="right-column">
                    <div>
                      <div className="anime-details-navigation">
                        <div>
                          <a href="/" itemProp="item" className="anchor-text">
                            <span itemProp="name" className="style-194">
                              Anime
                            </span>
                          </a>
                          <meta itemProp="position" content="2" />
                        </div>
                        &nbsp; &gt; &nbsp;
                        <div
                          itemProp="itemListElement"
                          itemType="http://schema.org/ListItem"
                        >
                          <a
                            href={`/anime/${anime.id}`}
                            itemProp="item"
                            className="anchor-text"
                          >
                            <span itemProp="name">{anime.title}</span>
                          </a>
                          <meta itemProp="position" content="3" />
                        </div>
                      </div>
                      <table
                        border={0}
                        cellSpacing={0}
                        cellPadding={0}
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td valign="top">
                              <div style={{ paddingBottom: "16px" }}>
                                <div className="table-display">
                                  <div className="anime-details-statistics-container">
                                    <div className="stats-block-po-r-clearfix">
                                      <div
                                        className="anime-details-cell-score"
                                        data-title="score"
                                        data-user="1,399,252 users"
                                        title="indicates a weighted score. Please note that 'Not yet aired' titles are excluded."
                                      >
                                        <div>{anime.score?.toFixed(2)}</div>
                                      </div>

                                      <div className="anime-details-cell-rank">
                                        <span title="based on the top anime page. Please note that 'Not yet aired' and 'R18+' titles are excluded.">
                                          Ranked{" "}
                                          <strong>#{anime.ranked}</strong>
                                        </span>
                                        <span>
                                          Popularity{" "}
                                          <strong>#{anime.popularity}</strong>
                                        </span>
                                      </div>
                                    </div>
                                    <br></br>
                                    <div
                                      className="flex flex-row"
                                      style={{ alignItems: "center" }}
                                    >
                                      <div className="user-status-block">
                                        <input type="hidden" value="9253" />
                                        <input type="hidden" value="" />
                                        <a
                                          onClick={() => {
                                            handleSubmit("watchlist");
                                          }}
                                          className="add-to-my-list-anchor"
                                          data-ga-click-type="list-add-anime-title-btn-att-to-my-list"
                                          data-ga-impression-type="list-add-anime-title-btn-att-to-my-list"
                                        >
                                          {isWatchlist
                                            ? "Remove from List"
                                            : "Add to My List"}
                                        </a>
                                      </div>
                                      <select
                                        name="myinfo_score"
                                        style={{
                                          borderColor: "rgb(216, 216, 216)",
                                          borderStyle: "solid",
                                          borderWidth: "1px",
                                          fontSize: "11px",
                                          padding: "6px 6px 6px 10px",
                                          minWidth: "150px",
                                        }}
                                        value={userScore}
                                        onChange={(e) => {
                                          setUserScore(Number(e.target.value));
                                        }}
                                      >
                                        <option value="0" style={ScoringStyle}>
                                          Select
                                        </option>
                                        <option value="10" style={ScoringStyle}>
                                          (10) Masterpiece
                                        </option>
                                        <option value="9" style={ScoringStyle}>
                                          (9) Great
                                        </option>
                                        <option value="8" style={ScoringStyle}>
                                          (8) Very Good
                                        </option>
                                        <option value="7" style={ScoringStyle}>
                                          (7) Good
                                        </option>
                                        <option value="6" style={ScoringStyle}>
                                          (6) Fine
                                        </option>
                                        <option value="5" style={ScoringStyle}>
                                          (5) Average
                                        </option>
                                        <option value="4" style={ScoringStyle}>
                                          (4) Bad
                                        </option>
                                        <option value="3" style={ScoringStyle}>
                                          (3) Very Bad
                                        </option>
                                        <option value="2" style={ScoringStyle}>
                                          (2) Horrible
                                        </option>
                                        <option value="1" style={ScoringStyle}>
                                          (1) Appalling
                                        </option>
                                      </select>
                                      <div
                                        style={{
                                          position: "relative",
                                          left: "-50px",
                                        }}
                                      >
                                        <HiStar
                                          color="#ffcd3c"
                                          size="20"
                                        ></HiStar>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="anime-details-right-poster-container">
                                    <div>
                                      <img
                                        src={anime.img_url ? anime.img_url : ""}
                                      ></img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h2 className="section-header">Synopsis</h2>
                              </div>

                              <p
                                itemProp="description"
                                className="anime-details-synopsis"
                              >
                                {anime.synopsis}
                              </p>
                              <br></br>
                            </td>
                          </tr>
                          <tr>
                            <td className="anime-details-bottom-container">
                              <div>
                                {/* <div className="more-recommendations-div action-link"><a href="/anime/9253/Steins_Gate/userrecs" className="anchor-text">More recommendations</a></div> */}
                                <h2 className="section-header">
                                  Recommendations
                                </h2>
                              </div>
                              <div>
                                <a
                                  className="anime-details-recommendation-container"
                                  style={{
                                    backgroundImage: `url(${anime.img_url})`,
                                  }}
                                ></a>
                                <div
                                  className="recommendation-div"
                                  data-json='{"width":702,"btnWidth":40,"margin":8}'
                                >
                                  <div className="recommendations">
                                    {isLoadingSimilarAnimes ? (
                                      <div className="centered-div">
                                        <PuffLoader
                                          color={"#F07489"}
                                          loading={isLoadingSimilarAnimes}
                                          size={150}
                                        />
                                      </div>
                                    ) : (
                                      <ul>
                                        {similarAnimes.map((anime, index) => (
                                          <li
                                            key={String(index)}
                                            className="anime-recommended"
                                            title={anime.title}
                                          >
                                            <a
                                              href={`#/anime/${anime.id}`}
                                              onClick={() => {
                                                setAnimeId(anime.id);
                                              }}
                                              className="anime-recommended"
                                              data-ga-click-type="anime-user-recommend"
                                            >
                                              <span>{anime.title}</span>
                                              <span className="style-895">
                                                {anime.score?.toFixed(2)}
                                              </span>
                                              <img
                                                src={
                                                  anime.img_url
                                                    ? anime.img_url
                                                    : ""
                                                }
                                                width="90"
                                                height="140"
                                                alt={anime.title}
                                              />
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
const ScoringStyle: React.CSSProperties = {
  margin: "0px",
  padding: "0px",
};
export default AnimeDetails;
