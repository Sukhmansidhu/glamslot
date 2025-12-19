import { Link } from "react-router-dom";
import "../styles/campaignBanner.css";

export default function CampaignBanner() {
  return (
    <section className="campaign">
      <div className="campaign-content">
        <h2>THE GLAMSLOT EXPERIENCE</h2>
        <p>
          Where style meets confidence. Discover premium salon services
          designed for modern beauty.
        </p>

        <div className="campaign-actions">
          <Link className="outline-btn" to="/our-story">EXPLORE</Link>
         <Link className="primary-btn" to="/my-bookings">MY BOOKINGS</Link>
          
        </div>
      </div>
    </section>
  );
}