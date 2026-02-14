import { Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="library-header">
      <div className="header-container">
        <MuiLink component={RouterLink} to="/" className="logo-link" underline="none">
          <img src="/Images/Icon.png" alt="Logo Biblioteca" className="library-logo" />
        </MuiLink>

        <div className="header-text">
          <Typography component="h1" className="library-title">
            BIBLIOTECA POPULAR
          </Typography>
          <Typography component="p" className="library-subtitle">
            Dr. Antonio Novaro
          </Typography>
        </div>
      </div>
    </header>
  );
};

export default Header;
