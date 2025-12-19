import { Link } from "react-router-dom";
import "../styles/editorialSplit.css";

export default function EditorialSplit() {
  return (
    <section className="editorial">

      <div className="editorial-image">
      </div>

      <div className="editorial-content">
        <span className="editorial-tag">OUR PHILOSOPHY</span>

        <h2>
          Crafted by Experts.<br />
          Designed for You.
        </h2>

        <p>
          At GlamSlot, we believe beauty is personal. Every service,
          every stylist, and every product is carefully curated to
          deliver an experience that goes beyond expectations.
        </p>

        <Link to='/shop'>DISCOVER MORE</Link>
      </div>
    </section>
  );
}