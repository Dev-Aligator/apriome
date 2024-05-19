import { AxiosInstance } from "axios";
import { Anime } from "./Interface/InterfaceCollection";
import { UserCollectionDetails } from "./UserPage/UserCollectionDetails";
import { UserCollectionInfo } from "./UserPage/UserCollectionInfo";
import { UserCollectionSelection } from "./UserPage/UserCollectionSelection";
import { UserHeader } from "./UserPage/UserHeader";
import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

interface UserPageProps {
  client: AxiosInstance;
}

interface AnimeInCollection extends Anime {
  genres: String[];
}

const UserPage = ({ client }: UserPageProps) => {
  const [userData, setUserData] = useState<String>("");
  const [userCollectionAnime, setUserCollectionANime] = useState<
    AnimeInCollection[]
  >([]);
  const [selectedCollection, setSelectedCollection] =
    useState<String>("watchlist");
  const [isLoadingUserProfile, setIsLoadingUserProfile] = useState(true);
  const [isLoadingUserCollection, setIsLoadingUserCollection] = useState(true);

  const fetchUserCollection = async () => {
    try {
      const response = await client.get(
        `/api/user/collection?typeOfCollection=${selectedCollection}`
      );
      const fetchedCollection = response.data["collection"];
      cleanhUserCollection(fetchedCollection);
      setUserCollectionANime(fetchedCollection);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingUserProfile(false);
      setIsLoadingUserCollection(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await client.get(`/api/get/user/`);
      setUserData(response.data["user"]["email"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cleanhUserCollection = (fetchedCollection: AnimeInCollection[]) => {
    const maxSynopsisLength = 260;
    fetchedCollection.forEach((anime) => {
      if (anime.synopsis) {
        if (anime.synopsis.length > maxSynopsisLength)
          anime.synopsis =
            anime.synopsis.substring(0, maxSynopsisLength - 3) + "...";
      }

      if (!anime.genre) {
        anime.genre = "['Unknown']";
      }
      anime.genres = JSON.parse(anime.genre.replace(/'/g, '"')) as String[];
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    fetchUserCollection();
  }, [selectedCollection]);

  return (
    <>
      {isLoadingUserProfile ? (
        <div className="centered-div" style={{ height: "40vh" }}>
          <PuffLoader
            color={"#F07489"}
            loading={isLoadingUserProfile}
            size={200}
          />
        </div>
      ) : (
        <>
          <div
            className="flex flex-row"
            style={{
              background:
                "rgba(255, 255, 255, 0.05) none repeat scroll 0% 0% / auto padding-box border-box",
            }}
          >
            <UserHeader userData={userData}></UserHeader>
            {false && (
              <UserCollectionInfo
                setSelectedCollection={setSelectedCollection}
              ></UserCollectionInfo>
            )}
          </div>
          <UserCollectionSelection
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
          ></UserCollectionSelection>
          <UserCollectionDetails
            collectionAnimes={userCollectionAnime}
            isLoadingUserCollection={isLoadingUserCollection}
          ></UserCollectionDetails>
        </>
      )}
    </>
  );
};

export default UserPage;
