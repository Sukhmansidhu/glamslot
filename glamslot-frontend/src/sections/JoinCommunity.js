import { Link } from "react-router-dom";
import "../styles/joinCommunity.css";

export default function JoinCommunity() {
  return (
    <section className="community">
      <div className="community-content">
        <span>JOIN THE EXPERIENCE</span>
        <h2>Be Part of the GlamSlot Community</h2>
        <p>
          Discover premium salons, trusted professionals, and effortless
          beauty bookings — all in one place.
        </p>

        <div className="community-actions">
          <Link to="/register" className="btn-primary1">
            Create Account
          </Link>

          <Link to="/login" className="btn-secondary1">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}