import { Link } from "react-router-dom";
import "../styles/footer.css";
import instagramIcon from "../assets/images/insta.png";
import facebookIcon from "../assets/images/facebook.png";
import youtubeIcon from "../assets/images/youtube.png";
import snapchatIcon from "../assets/images/snapchat.png";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>GLAMSLOT</h2>
          <p>
            Premium salon booking platform connecting you with trusted
            professionals and seamless beauty experiences.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <Link to="/services">Services</Link>
            <Link to="/salons">Salon Finder</Link>
            <Link to="/shop">Shop Online</Link>
            <Link to="/our-story">Our Story</Link>
          </div>

          <div>
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Create Account</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/orders">Orders</Link>
          </div>

          <div>
            <h4>Support</h4>
            <button className="footer-btn">Help Center</button>
            <button className="footer-btn">Contact</button>
            <Link to="/gift-cards">Gift Cards</Link>
            <Link to="/refer">Refer a Friend</Link>
          </div>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
      <a href="https://www.instagram.com/sukhmansidhu091" target="_blank" rel="noreferrer">
         <img src={instagramIcon} alt="Instagram" />
       </a>
     
       <a href="https://facebook.com" target="_blank" rel="noreferrer">
         <img src={facebookIcon} alt="Facebook" />
       </a>
     
       <a href="https://www.youtube.com/@simranjeetsingh7106" target="_blank" rel="noreferrer">
         <img src={youtubeIcon} alt="YouTube" />
       </a>
     
       <a href="https://www.snapchat.com/@sukhman1565" target="_blank" rel="noreferrer">
         <img src={snapchatIcon} alt="Snapchat" />
       </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} GlamSlot. All rights reserved.
      </div>
    </footer>
  );
}