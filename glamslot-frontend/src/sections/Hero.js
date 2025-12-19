import'../styles/hero.css'
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
 <h1 className="hero-title">GLAMSLOT</h1>
      <div className="hero-content">
        <h1>WELCOME TO GLAMSLOT</h1>

        <p>
          House of GlamSlot is the embodiment of modern beauty, where
          salons, education, hair care, fashion, and heritage come
          together in perfect harmony.
        </p>

        <div className="hero-buttons">
          <Link to="/follow-us" className="btn-outline">
            EXPLORE
          </Link>

          <Link to="/services" className="btn-filled">
            BOOK ONLINE
          </Link>
        </div>
      </div>
    </section>
  );
}