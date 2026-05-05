import React from "react";

function Footer() {
  const footerBox = `mb-5 grow shrink basis-62.5 flex flex-col items-center justify-center`;
  return (
    <footer className="bg-mist-900 text-white px-40 py-10">
      <div className=" max-w-300 m-auto flex flex-wrap justify-between">
        {/* <!-- About Section --> */}
        <div className="mb-5 grow shrink basis-62.5 flex flex-col items-center justify-center">
          <p className="text-2xl mb-4 ">Rongpur Daily Needs</p>
          <p className="text-center mx-1.5">
            We provide affordable and trusted services to our Customers. Your
            satisfaction is our mission.
          </p>
          <p className="">
            &copy; 2025 Rongpur Daily Needs. All rights reserved.
          </p>
        </div>

        {/* <!-- Developer Info --> */}
        <div className={footerBox} id="developer-box">
          <p className="text-2xl mb-4">Developer</p>
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
        <div className={footerBox}>
          <p className="text-2xl mb-4">Contact Us</p>
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
