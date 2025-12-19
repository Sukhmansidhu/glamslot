import "../styles/ourStory.css";
import imgFounders from "../assets/images/story1.png";
import imgSalon from "../assets/images/story2.png";
import imgTraining from "../assets/images/story3.png";
import imgBehind from "../assets/images/story4.png";
import imgHero from "../assets/images/storyhero.png";
import { Link } from "react-router-dom";
export default function OurStory() {
  return (
    <div className="story-page">

      <section
        className="story-hero"
        style={{ backgroundImage: `url(${imgHero})` }} 
      >
        <div className="story-hero-overlay" />
        <div className="story-hero-content">
          <h1>Our Story</h1>
          <p>
            GlamSlot is not just a salon platform.  
            It is a movement built on confidence, craft & culture.
          </p>
        </div>
      </section>

      <section className="story-section split">
        <div className="story-text">
          <h2>Where It All Began</h2>
          <p>
            GlamSlot was born from a simple observation — people wanted great
            hair and beauty services, but the experience was inconsistent.
          </p>
          <p>
            Our founders believed salons deserved the same precision
            as luxury fashion houses and global beauty brands.
          </p>
        </div>
        <div
          className="story-image"
          style={{ backgroundImage: `url(${imgFounders})` }}
        />
      </section>

      <section className="story-section alt split reverse">
        <div
          className="story-image"
          style={{ backgroundImage: `url(${imgSalon})` }}
        />
        <div className="story-text">
          <h2>The First GlamSlot Space</h2>
          <p>
            Our first salon focused on calm, confidence and consultation.
            Every design decision was intentional.
          </p>
          <p>
            The goal was simple — clients should feel valued before
            a single service begins.
          </p>
        </div>
      </section>

      <section className="story-section split">
        <div className="story-text">
          <h2>Training Before Expansion</h2>
          <p>
            GlamSlot chose education before growth.
            Stylists trained in precision systems, hygiene,
            communication and ethics.
          </p>
          <p>
            Consistency became our signature.
          </p>
        </div>
        <div
          className="story-image"
          style={{ backgroundImage: `url(${imgTraining})` }}
        />
      </section>

      <section className="story-section alt split reverse">
        <div
          className="story-image"
          style={{ backgroundImage: `url(${imgBehind})` }}
        />
        <div className="story-text">
          <h2>The People Behind GlamSlot</h2>
          <p>
            Artists, educators, designers and engineers —
            all working together behind every appointment.
          </p>
          <p>
            Technology supports creativity, never replaces it.
          </p>
        </div>
      </section>

      <section className="story-section philosophy">
        <h2>Our Philosophy</h2>

        <div className="philosophy-grid">
          <div className="philosophy-card">
            ✂️ <h3>Precision</h3>
            <p>Measured. Structured. Refined.</p>
          </div>
          <div className="philosophy-card">
            🎨 <h3>Creativity</h3>
            <p>Inspired by trends, defined by individuality.</p>
          </div>
          <div className="philosophy-card">
            🎓 <h3>Education</h3>
            <p>Growth through continuous global learning.</p>
          </div>
          <div className="philosophy-card">
            🖤 <h3>Luxury</h3>
            <p>Luxury is how you feel, not what you pay.</p>
          </div>
        </div>
      </section>

      <section className="story-future">
        <h2>The Future of GlamSlot</h2>
        <p>
          We are building an intelligent beauty ecosystem —
          personalization, transparency and stylist empowerment.
        </p>
        <p>The journey has only begun.</p>

      <Link to="/my-bookings" className="story-cta">
  Book Your Experience
</Link>
      </section>

    </div>
  );
}