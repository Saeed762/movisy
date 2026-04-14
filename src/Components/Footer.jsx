import "../Style/footer.css";
import { FaGithub } from "react-icons/fa";
import { SiVercel } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-copy">Built by Saeed Hafez</p>
      <div className="footer-links">
        <a
          href="https://github.com/Saeed762"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <FaGithub />
          GitHub
        </a>
        <a
          href="https://vercel.com/saeedhafez60-2412"
          target="_blank"
          rel="noreferrer"
          aria-label="Vercel website"
        >
          <SiVercel />
          Vercel
        </a>
        <a href="tel:+96392284290" aria-label="Phone number">
          +96392284290
        </a>
        <a href="mailto:saeedhafez60@gmail.com" aria-label="Email address">
          saeedhafez60@gmail.com
        </a>
      </div>
    </footer>
  );
}
