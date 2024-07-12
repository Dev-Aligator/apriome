import PuffLoader from "react-spinners/PuffLoader";
import { useState, useEffect } from "react";
import { Anime } from "../Interface/InterfaceCollection";
import { AxiosInstance } from "axios";

interface UserAnimeAnalyticsContainerProps {
  client: AxiosInstance;
  isLoadingUserAnalytics: boolean;
  setIsLoadingUserAnalytics: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserAnimeAnalyticsContainer = ({
  client,
  isLoadingUserAnalytics,
  setIsLoadingUserAnalytics,
}: UserAnimeAnalyticsContainerProps) => {
  const userAnimeAnimesStyle:React.CSSProperties = {
    backgroundColor: "#19171c",
    minHeight: "210px",
    overflowX: "auto",
    overflowY: "hidden",
  };

  const [analyticsAnimes, setAnalyticsAnimes] = useState<Anime[]>([]);

  const fetchUserCollection = async () => {
    try {
      const response = await client.get(`/api/user/recommendations/`);
      const fetchedCollection = response.data["recommendations"];
      setAnalyticsAnimes(fetchedCollection);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingUserAnalytics(false);
    }
  };

  useEffect(() => {
    if (isLoadingUserAnalytics) {
      fetchUserCollection();
    }
  }, [isLoadingUserAnalytics]);

  return (
    <div style={userAnimeAnimesStyle}>
      <div
        className="recommendation-div"
        data-json='{"width":702,"btnWidth":40,"margin":8}'
      >
        <div className="recommendations" style={{ marginTop: "10px", height: "fit-content" }}>
          {isLoadingUserAnalytics ? (
            <div className="centered-div">
              <PuffLoader
                color={"#F07489"}
                loading={isLoadingUserAnalytics}
                size={180}
              />
            </div>
          ) : (
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
                alignItems: "center",
                position: "relative",
                width: "fit-content",
                height: "fit-content",
              }}
            >
              {analyticsAnimes.map((anime, index) => (
                <li
                  key={String(index)}
                  className="anime-recommended"
                  title={anime.title}
                >
                  <a
                    href={`#/anime/${anime.id}`}
                    onClick={() => {}}
                    className="anime-recommended"
                    data-ga-click-type="anime-user-recommend"
                    style={{ height: "fit-content", width: "fit-content"}}
                  >
                    <span>{anime.title}</span>
                    <span>{anime.score?.toFixed(2)}</span>
                    <img
                      src={anime.img_url ? anime.img_url : ""}
                      alt={anime.title}
                      style={{
                        maxWidth: "130px",
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
