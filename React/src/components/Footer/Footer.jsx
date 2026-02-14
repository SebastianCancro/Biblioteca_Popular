import "./Footer.css";
import { LocationOn, Phone, Email as EmailIcon } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <footer className="library-footer">
      <div className="footer-container">
        <h3>BIBLIOTECA POPULAR Dr. Antonio Novaro</h3>

        <div className="footer-info">
          <p>
            <LocationOn className="icon" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Moreno+30+Chivilcoy+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
            >
              Moreno 30, Chivilcoy
            </a>
          </p>

          <p>
            <Phone className="icon" />
            <a href="tel:+542346432493">(2346) 432493</a>
          </p>

          <p>
            <EmailIcon className="icon" />
            <a
              href="mailto:bibliotecanovarro@hotmail.com"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=bibliotecanovarro@hotmail.com&su=Consulta%20desde%20la%20web",
                  "_blank"
                );
              }}
            >
              bibliotecanovarro@hotmail.com
            </a>
          </p>

          <p>
            <InstagramIcon className="icon" />
            <a
              href="https://www.instagram.com/bibliotecanovaroantonio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            |{" "}
            <FacebookIcon className="icon" />
            <a
              href="https://www.facebook.com/100064143998729"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </p>

          <p>
            Lunes a Viernes de 8:00 a 19:00 · Sábados de 9:00 a 13:00
          </p>
        </div>

        <p className="footer-copy">
          © 2025 Biblioteca Popular Dr. Antonio Novaro — Chivilcoy, Buenos Aires
        </p>
      </div>
    </footer>
  );
};

export default Footer;


