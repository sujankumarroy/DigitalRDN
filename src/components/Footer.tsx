import React from "react";

function Footer() {
  return (
    <footer className="bg-mist-900 text-white ">
      <div className="footer-container">
        {/* <!-- About Section --> */}
        <div className="footer-box">
          <h3>Rongpur Daily Needs</h3>
          <p>
            We provide affordable and trusted services to our Customers. Your
            satisfaction is our mission.
          </p>
          <p className="copyright">
            &copy; 2025 Rongpur Daily Needs. All rights reserved.
          </p>
        </div>

        {/* <!-- Developer Info --> */}
        <div className="footer-box" id="developer-box">
          <h4>Developer</h4>
          <p>👨‍💻 Sujan Roy</p>
          <p>
            📧{" "}
            <a href="mailto:sujanroy63836@gmail.com">sujanroy63836@gmail.com</a>
          </p>
          <p>
            🌐 <a href="https://skrsportfolio.netlify.app/">Portfolio</a>
          </p>
          <p>
            🌐{" "}
            <a href="https://www.facebook.com/sujanroy0411" target="_blank">
              Facebook Profile
            </a>
          </p>
          <p>
            🐞{" "}
            <a
              href="https://github.com/SKR0411/digitalrdn/issues"
              target="_blank"
            >
              Report an Issue
            </a>
          </p>
        </div>

        {/* <!-- Contact Info --> */}
        <div className="footer-box">
          <h4>Contact Us</h4>
          <p>📍 Rongpur Part VI, Hailakandi 788163, Assam</p>
          <p>
            📧{" "}
            <a href="mailto:ranjan78412@gmail.com?subject=Inquiry%20from%20Website&body=Hello%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.">
              ranjan78412@gmail.com
            </a>
          </p>
          <p>
            📞 <a href="tel:+916003375755">+91-6003375755</a>
          </p>
          <p>
            📞{" "}
            <a
              href="https://wa.me/916003375755?text=Hello%2C%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20more%20details."
              target="_blank"
            >
              Chat Now
            </a>
          </p>
          <p>🕒 Mon–Sat: 6AM – 9PM</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
