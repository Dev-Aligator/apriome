import { Anime } from "../Interface/InterfaceCollection";
import PuffLoader from "react-spinners/PuffLoader";

interface AnimeInCollection extends Anime {
  genres: String[];
}
interface UserCollectionDetailsProps {
  collectionAnimes: AnimeInCollection[];
  isLoadingUserCollection: boolean;
}

export const UserCollectionDetails = ({
  collectionAnimes,
  isLoadingUserCollection,
}: UserCollectionDetailsProps) => {
  const imgageStyle = {
    maxWidth: "100px",
    maxHeight: "120px",
  };

  const animeEntryStyle = {
    display: "flex",
    marginTop: "10px",
    backgroundColor: "#16151a",
    cursor: "pointer",
  };

  const animeInfoStyle: React.CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    marginLeft: "10px",
    color: "#c7c7c7",
  };

  const genreTagStyle = {
    borderRadius: "5px",
    padding: "1px",
    marginRight: "2px",
  };

  const titleStyle = {
    width: "fit-content",
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "5px",
    marginRight: "10px",
  };

  return (
    <>
      {isLoadingUserCollection ? (
        <div className="centered-div">
          <PuffLoader
            color={"#F07489"}
            loading={isLoadingUserCollection}
            size={200}
          />
        </div>
      ) : (
        <div style={{ maxHeight: "60%", overflowY: "scroll" }}>
          {collectionAnimes.map((anime, index) => (
            <div
              key={index}
              style={animeEntryStyle}
              onClick={() => {
                window.location.href = `#/anime/${anime.id}`;
              }}
            >
              <img
                src={anime.img_url ? anime.img_url : ""}
                alt={anime.title}
                style={imgageStyle}
              />
              <div style={animeInfoStyle}>
                <div className="flex flex-row">
                  <span
                    style={{
                      ...titleStyle,
                      backgroundColor: "#030305",
                      marginRight: "auto",
                    }}
                  >
                    {anime.title}
                  </span>

                  <span
                    style={{
                      backgroundColor: "#F07489",
                      color: "#000",
                      marginTop: "10px",
                      ...titleStyle,
                      position: "relative",
                      right: "50px",
                    }}
                  >
                    {anime.score}
                  </span>
                </div>

                <div className="tags">
                  {anime.genres.map((tag, index) => (
                    <span
                      key={index}
                      className={`genre ${String(tag.replace(/\s/g, ""))}`}
                      style={genreTagStyle}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p style={{ marginTop: "10px" }}>{anime.synopsis}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
