import { useState, useEffect} from "react";
import "../styles/AnimeDetails.sass";
import { AleartProps, Anime } from "./Interface/InterfaceCollection";
import { AxiosInstance } from "axios";
import { defaultAnime } from "../constants";
interface AnimeDetailsProps {
    client: AxiosInstance;
    setAleartInfo: React.Dispatch<React.SetStateAction<AleartProps>>;
}


const AnimeDetails = ({ client, setAleartInfo }: AnimeDetailsProps) => {


    const animeId = window.location.href.split("/")[6];
    const [anime, setAnime] = useState<Anime>(defaultAnime);
    const [genres, setGenres] = useState<String[]>();
    const fetchAnimeData = async () => {
        try {
            const apiUrl = `/api/anime/${animeId}`;
            const response = await client.get(apiUrl);
            setAnime(response.data["anime"]); // Update animes state using functional update to avoid dependency on previous state
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    };

    const handleSubmit = async (collectionType: String) => {
    const formData = {
      "animeId": animeId,
      "typeOfCollection": collectionType,
    }
    client.post("/api/anime/add-collection/", formData, {withCredentials: true}).then(function () {
      setAleartInfo({
         isAleart: 1,
          title: "Success",
          normalText: `Adding ${anime.title} to ${collectionType} !`,

      })
    });

  }

    useEffect(() => {
        fetchAnimeData();
    }, []);

    useEffect(() => {
        if (anime) {
            anime.img_url = anime.img_url ? anime.img_url : "";
            anime.episodes = anime.episodes ? anime.episodes : 0;

            if (!anime.genre) {
                anime.genre = "['Unknown']";
            }
            setGenres(JSON.parse(anime.genre.replace(/'/g, '"')) as String[]);
        }
    }, [anime])


    return (
        <>
            <div className="header-container">
                <div className="header">
                    <div itemProp="name">
                        <h1 className="header-title" style={{ fontSize: "25px" }}><strong>{anime.title}</strong></h1>
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
                                            <img data-src={anime.img_url ? anime.img_url : ""} alt={anime.title} itemProp="image" src={anime.img_url ? anime.img_url : ""} /> </a>
                                    </div>
                                    <div className="action-link"> <a onClick={()=>{handleSubmit("watchlist")}}>Add to My List</a></div>

                                    <div className="action-link"><a onClick={()=>{handleSubmit("favorite")}}>Add to Favorites</a></div>


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
                                         
                                                <a key={index} href={`/anime/genre/ ${String(tag.replace(/\s/g, ''))}`} title={String(tag)} > {tag}{index == genres.length - 1 ? "" : ","}</a>
                                           
                                        ))}
                                    </div>

                                    <h2 className="section-header">Statistics</h2>
                                    <div itemProp="aggregateRating" itemType="http://schema.org/AggregateRating" className="statistics-header" data-id="info1">
                                        <span className="anime-details-score">Score:</span> <span itemProp="ratingValue" className="rating-value">{anime.score}</span><sup className="sup-text">1</sup>
                                        <meta itemProp="bestRating" content="10" />
                                        <meta itemProp="worstRating" content="1" />

                                    </div>
                                    <div className="statistics-header" data-id="info2">
                                        <span className="style-104">Ranked:</span>
                                        #{anime.ranked}<sup className="sup-text">2</sup>

                                    </div>
                                    <div className="popularity-header" style={{ padding: "3px 0px" }}>
                                        <span>Popularity:</span>
                                        #{anime.popularity}
                                    </div>

                                </div>
                            </td>
                            <td valign="top" className="right-column">
                                <div>

                                    <div className="anime-details-navigation">
                                        <div><a href="/" itemProp="item" className="anchor-text"><span itemProp="name" className="style-194">
                                            Anime
                                        </span></a>
                                            <meta itemProp="position" content="2" />
                                        </div>&nbsp; &gt; &nbsp;<div itemProp="itemListElement" itemType="http://schema.org/ListItem"><a href={`/anime/${anime.id}`} itemProp="item" className="anchor-text"><span itemProp="name">
                                            {anime.title}
                                        </span></a>
                                            <meta itemProp="position" content="3" />
                                        </div>
                                    </div>
                                    <table border={0} cellSpacing={0} cellPadding={0} width="100%">
                                        <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <div style={{ paddingBottom: "16px" }}>
                                                        <div className="table-display">
                                                            <div className="anime-details-statistics-container">
                                                                <div className="stats-block-po-r-clearfix">
                                                                    <div className="anime-details-cell-score" data-title="score" data-user="1,399,252 users" title="indicates a weighted score. Please note that 'Not yet aired' titles are excluded.">
                                                                        <div>{anime.score}</div>
                                                                    </div>

                                                                    <div className="anime-details-cell-rank"><span title="based on the top anime page. Please note that 'Not yet aired' and 'R18+' titles are excluded.">Ranked <strong>#{anime.ranked}</strong></span><span>Popularity <strong>#{anime.popularity}</strong></span></div>
                                                                </div>
                                                                <br></br>
                                                                <div className="user-status-block"><input type="hidden" value="9253" /><input type="hidden" value="" /><a href="https://myanimelist.net/ownlist/anime/add?selected_series_id=9253&amp;hideLayout=1&amp;click_type=list-add-anime-title-btn-att-to-my-list&amp;more_type=1&amp;only_white=1" className="add-to-my-list-anchor" data-ga-click-type="list-add-anime-title-btn-att-to-my-list" data-ga-impression-type="list-add-anime-title-btn-att-to-my-list" >Add to My List</a>

                                                                </div>
                                                            </div>
                                                            <div className="anime-details-right-poster-container">
                                                                <div><img src={anime.img_url ? anime.img_url : ""} >
                                                                </img></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h2 className="section-header">Synopsis</h2>
                                                    </div>

                                                    <p itemProp="description" className="anime-details-synopsis">{anime.synopsis}</p><br></br>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="anime-details-bottom-container">

                                                    <div>
                                                        {/* <div className="more-recommendations-div action-link"><a href="/anime/9253/Steins_Gate/userrecs" className="anchor-text">More recommendations</a></div> */}
                                                        <h2 className="section-header">Recommendations
                                                        </h2>
                                                    </div>
                                                    <div><a href="https://myanimelist.net/anime/9253/Steins_Gate/userrecs" className="anime-details-recommendation-container" >
                                                        <span>View All</span> <span><i className="style-884" aria-hidden="true"></i></span> </a>
                                                        <div className="recommendation-div" data-json="{&quot;width&quot;:702,&quot;btnWidth&quot;:40,&quot;margin&quot;:8}">
                                                            <div className="recommendations">
                                                                <ul data-slide="7">
                                                                    <li className="anime-recommended" title="Boku dake ga Inai Machi"><a href="https://myanimelist.net/recommendations/anime/9253-31043" className="anime-recommended" data-ga-click-type="anime-user-recommend" ><span>Boku dake ga Inai Machi</span><span className="style-895">133 Users</span><img src="https://cdn.myanimelist.net/images/anime/1935/127974.jpg" width="90" height="140" alt="Boku dake ga Inai Machi" /></a></li>

                                                                </ul>
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
    )
};

export default AnimeDetails;
