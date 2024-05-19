interface UserCollectionSelectionProps {
  selectedCollection: String;
  setSelectedCollection: React.Dispatch<React.SetStateAction<String>>;
}

export const UserCollectionSelection = ({
  selectedCollection,
  setSelectedCollection,
}: UserCollectionSelectionProps) => {
  const containerStyle: React.CSSProperties = {
    fontSize: "16.8px",
    height: "56px",
    borderTop: "1px solid rgb(64, 64, 64)",
    display: "flex",
    userSelect: "none",
    background:
      "rgba(0, 0, 0, 0) linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)) repeat scroll 0% 0% / auto padding-box border-box",
    textShadow: "none",
    boxSizing: "border-box",
    margin: "0px",
    padding: "0px",
  };

  const linkStyle: React.CSSProperties = {
    justifyContent: "center",
    color: "rgb(227, 227, 227)",
    marginTop: "10.584px",
    paddingBottom: "12.096px",
    transition: "all 0.15s ease 0s",
    flex: "1 1 auto",
    textAlign: "center",
    lineHeight: "21.168px",
    padding: "7.56px 5px 12.096px",
    textTransform: "capitalize",
    whiteSpace: "normal",
    fontSize: "15.12px",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    cursor: "pointer",
    textDecoration: "none solid rgb(227, 227, 227)",
    boxSizing: "border-box",
    margin: "10.584px 0px 0px",
    borderBottom: "1px solid rgb(64, 64, 64)",
  };

  const selectedLinkStyle: React.CSSProperties = {
    background:
      "rgba(0, 0, 0, 0.6) none repeat scroll 0% 0% / auto padding-box border-box",
    borderTopColor: "rgb(64, 64, 64)",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    borderImageSource: "none",
    borderImageSlice: "100%",
    borderImageWidth: "1",
    borderImageOutset: "0",
    borderImageRepeat: "stretch",
    borderBottom: "0px none rgb(227, 227, 227)",
    borderInlineStart: "0px none rgb(227, 227, 227)",
  };

  const watchlistLinkStyle: React.CSSProperties = {
    borderRightColor: "rgb(64, 64, 64)",
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    borderLeftColor: "rgb(227, 227, 227)",
    borderLeftStyle: "none",
    borderLeftWidth: "0px",
    borderTopRightRadius: "5px",
  };

  const favouriteLinkStyle: React.CSSProperties = {
    borderRightColor: "rgb(227, 227, 227)",
    borderRightStyle: "none",
    borderRightWidth: "0px",
    borderLeftColor: "rgb(64, 64, 64)",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderTopLeftRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <a
        style={
          selectedCollection == "watchlist"
            ? { ...linkStyle, ...selectedLinkStyle, ...watchlistLinkStyle }
            : linkStyle
        }
        onClick={() => {
          setSelectedCollection("watchlist");
        }}
      >
        My Watch List
      </a>
      <a
        style={
          selectedCollection == "favourite"
            ? { ...linkStyle, ...selectedLinkStyle, ...favouriteLinkStyle }
            : linkStyle
        }
        onClick={() => {
          setSelectedCollection("favourite");
        }}
      >
        My Favourites
      </a>
    </div>
  );
};
