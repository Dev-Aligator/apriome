import { HiDocumentSearch } from "react-icons/hi";
interface UserAnimeAnalyticsButtonProps {
  setIsLoadingUserAnalytics: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserAnimeAnalyticsButton = ({
  setIsLoadingUserAnalytics,
}: UserAnimeAnalyticsButtonProps) => {
  return (
    <a
      onClick={() => {
        setIsLoadingUserAnalytics(true);
      }}
      className="user-analytics-button"
      style={{
        transition: "all 0.15s ease 0s",
        color: "rgb(54, 146, 231)",
        flex: "0 0 auto",
        padding: "10px 12.6932px",
        border: "1px solid rgb(54, 146, 231)",
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        cursor: "pointer",
        textDecoration: "none solid rgb(255, 255, 255)",
        boxSizing: "border-box",
        width: "fit-content",
        position: "relative",
        right: "5px",
        height: "90%",
      }}
    >
      <div
        className="flex flex-row"
        style={{
          alignItems: "center",
          gap: "10px",
        }}
      >
        <HiDocumentSearch size={30}></HiDocumentSearch>
        <span
          style={{ boxSizing: "border-box", margin: "0px", padding: "0px" }}
        >
          <strong
            style={{
              display: "block",
              fontWeight: 400,
              fontSize: "19.0398px",
              boxSizing: "border-box",
              margin: "0px",
              padding: "0px",
            }}
          >
            Anime Recommendations
          </strong>
          <em
            style={{
              display: "block",
              fontStyle: "normal",
              boxSizing: "border-box",
              margin: "0px",
              padding: "0px",
            }}
          >
            Analytics from your preferences
          </em>
        </span>
      </div>
    </a>
  );
};
