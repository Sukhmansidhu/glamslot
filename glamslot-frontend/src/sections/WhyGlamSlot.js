import "../styles/whyGlamSlot.css";

import card1 from "../assets/images/card1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";
import card4 from "../assets/images/card4.png";

export default function WhyGlamSlot() {
  return (
    <section className="why-section">
      <div className="why-header">
        <span className="why-choose">WHY CHOOSE US</span>
        <h2 className="why-choose-tex">More Than a Booking Platform</h2>
      </div>

      <div className="why-grid">
        <div className="why-card">
          <div className="why-img">
            <img src={card1} alt="Expert Stylists" />
          </div>
          <h3 className="card-1">Expert Stylists</h3>
          <p>
            Only verified professionals with proven experience and top-rated
            performance.
          </p>
        </div>

        <div className="why-card">
          <div className="why-img">
            <img src={card2} alt="Premium Salons" />
          </div>
          <h3 className="card-2">Premium Salons</h3>
          <p>
            Carefully curated salons that meet our quality and hygiene standards.
          </p>
        </div>

        <div className="why-card">
          <div className="why-img">
            <img src={card3} alt="Seamless Booking" />
          </div>
          <h3 className="card-3">Seamless Booking</h3>
          <p>
            Book, reschedule, or manage appointments in seconds with ease.
          </p>
        </div>

        <div className="why-card">
          <div className="why-img">
            <img src={card4} alt="Secure Payments" />
          </div>
          <h3 className="card-4">Secure Payments</h3>
          <p>
            Transparent pricing with secure and trusted payment handling.
          </p>
        </div>
      </div>
    </section>
  );
}