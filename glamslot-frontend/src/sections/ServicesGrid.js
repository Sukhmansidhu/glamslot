import "../styles/servicesGrid.css";

export default function ServicesGrid() {
  return (
    <section className="services-grid">
      <div className="service-card">
        <img src="../assets/images/service1.png" alt="Hair Styling" />
        <div className="service-overlay">
          <h3>OUR SERVICES</h3>
        </div>
      </div>

      <div className="service-card">
        <img src="/images/service2.jpg" alt="Salon Finder" />
        <div className="service-overlay">
          <h3>SALON FINDER</h3>
        </div>
      </div>

      <div className="service-card">
        <img src="/images/service3.jpg" alt="Education" />
        <div className="service-overlay">
          <h3>EDUCATION</h3>
        </div>
      </div>
    </section>
  );
}