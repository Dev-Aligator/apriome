interface UserHeaderProps {
  userData: String;
}

export const UserHeader = ({ userData }: UserHeaderProps) => {
  const headerStyle = {
    padding: "28px 21px 14px",
    flexFlow: "row nowrap",
    gap: "14px",
    marginRight: "auto",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const h1Style = {
    fontSize: "28px",
    flex: "0 0 auto",
    marginTop: "0px",
    fontWeight: "400",
    margin: "0px",
    padding: "0px",
    fontFamily: "Roboto, sans-serif",
  };

  const spanStyle: React.CSSProperties = {
    color: "rgb(204, 204, 204)",
    boxSizing: "border-box",
    margin: "0px",
    padding: "0px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "flex",
  };

  return (
    <div style={headerStyle}>
      <h1 style={h1Style}>
        <span className="username-span" data-href="/@/" style={spanStyle}>
          <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
            <circle
              r="8"
              cx="30"
              cy="18"
              fill="green"
              stroke="green"
              strokeWidth="3"
            />
          </svg>{" "}
          {userData}
        </span>
      </h1>
      <div
        style={{
          right: "21px",
          position: "absolute",
          top: "35px",
          height: "40px",
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          marginTop: "0px",
          boxSizing: "border-box",
          margin: "0px",
          padding: "0px",
        }}
      ></div>
    </div>
  );
};
