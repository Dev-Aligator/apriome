interface UserCollectionSelectionProps {
  setSelectedCollection: React.Dispatch<React.SetStateAction<String>>;
}

export const UserCollectionInfo = ({
  setSelectedCollection,
}: UserCollectionSelectionProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        margin: "0px",
        padding: "0px",
        position: "absolute",
        right: "30px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          margin: "0px 0px 2.68409px 13.4205px",
          display: "flex",
          userSelect: "none",
          boxSizing: "border-box",
          padding: "0px",
        }}
      >
        <a
          onClick={() => setSelectedCollection("watchlist")}
          style={{
            flex: "1 1 auto",
            color: "rgb(204, 204, 204)",
            textAlign: "center",
            lineHeight: "16.9098px",
            padding: "6.0392px 5px",
            textTransform: "capitalize",
            whiteSpace: "normal",
            fontSize: "12.0784px",
            fontFamily: "Roboto, sans-serif",
            cursor: "pointer",
            textDecoration: "none solid rgb(204, 204, 204)",
            boxSizing: "border-box",
            margin: "0px",
          }}
        >
          <strong
            style={{
              fontWeight: 400,
              fontSize: "13.2863px",
              boxSizing: "border-box",
              margin: "0px",
              padding: "0px",
            }}
          >
            Pending
          </strong>
          <br
            style={{ boxSizing: "border-box", margin: "0px", padding: "0px" }}
          />
          Watch List
        </a>
        <a
          onClick={() => setSelectedCollection("favourite")}
          style={{
            flex: "1 1 auto",
            color: "rgb(204, 204, 204)",
            textAlign: "center",
            lineHeight: "16.9098px",
            padding: "6.0392px 5px",
            textTransform: "capitalize",
            whiteSpace: "normal",
            fontSize: "12.0784px",
            fontFamily: "Roboto, sans-serif",
            cursor: "pointer",
            textDecoration: "none solid rgb(204, 204, 204)",
            boxSizing: "border-box",
            margin: "0px",
          }}
        >
          <strong
            style={{
              fontWeight: 400,
              fontSize: "13.2863px",
              boxSizing: "border-box",
              margin: "0px",
              padding: "0px",
            }}
          >
            Pending
          </strong>
          <br
            style={{ boxSizing: "border-box", margin: "0px", padding: "0px" }}
          />
          Favourites
        </a>
      </div>
    </div>
  );
};
