import AnimeCard from "./AnimeCard";
import "../styles/AnimePage.sass";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { Anime } from "./Interface/InterfaceCollection";
import { Pagination } from "@mui/material";
import PuffLoader from "react-spinners/PuffLoader";
interface AnimePageProps {
  client: AxiosInstance;
  animes: Anime[];
  setAnimes: React.Dispatch<React.SetStateAction<Anime[]>>;
  usePagination: boolean;
}

const AnimePage = ({
  client,
  animes,
  setAnimes,
  usePagination,
}: AnimePageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePaginationChange = (event: any, value: number) => {
    event.preventDefault();
    setPageNumber(value);
    fetchAnimeData(value);
  };

  const fetchAnimeData = async (page: number = 1, shuffle: number = 0) => {
    setIsLoading(true);
    // localStorage.topper = window.scrollY;

    try {
      const apiUrl = `/api/anime?page=${page}&shuffle=${shuffle}`;
      const response = await client.get(apiUrl);
      const fetchedAnimes = response.data["animes"];
      setAnimes(fetchedAnimes); // Update animes state using functional update to avoid dependency on previous state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   window.scrollTo({
  //     top: localStorage.topper,
  //     behavior: "instant",
  //   });
  // }, [isLoading]);
  useEffect(() => {
    fetchAnimeData(1, 1);
  }, [usePagination]);

  return (
    <>
      {isLoading ? (
        <div className="centered-div" style={{ width: "100%" }}>
          <PuffLoader color={"#F07489"} loading={isLoading} size={150} />
        </div>
      ) : (
        <div className="movie-page">
          {animes?.map((anime, index) => (
            <AnimeCard key={index} anime={anime} />
          ))}
        </div>
      )}
      <div className="centered-div pagination">
        {usePagination && (
          <Pagination
            count={676}
            page={pageNumber}
            onChange={handlePaginationChange}
            size="large"
            style={{ color: "#F07489" }}
          ></Pagination>
        )}
      </div>
    </>
  );
};

export default AnimePage;
