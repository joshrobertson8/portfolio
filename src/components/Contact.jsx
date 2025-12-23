import { useState } from 'react';
import { contactMethods, mapUrls, socialLinks } from '../data/content';

const Contact = () => {
  const [mapDark, setMapDark] = useState(false);
  const mapSrc = mapDark ? mapUrls.dark : mapUrls.light;

  return (
    <section id="contact" className="contact section-morph visible">
      <div className="container section-content">
        <div className="section-header parallax-element parallax-slow">
          <span className="section-number reveal-left">04</span>
          <h2 className="section-title text-reveal reveal-element">Contact</h2>
        </div>
        <div className="contact-content">
          <div className="contact-intro">
            <h3>Let's Connect</h3>
          </div>

          <div className="contact-layout">
            <div className="contact-primary">
              <div className="contact-card">
                <h4>Get In Touch</h4>
                <div className="contact-methods">
                  {contactMethods.map((method) => (
                    <div className="contact-method" key={method.label}>
                      <div className="method-icon">
                        <i className={method.icon} />
                      </div>
                      <div className="method-details">
                        <span className="method-label">{method.label}</span>
                        {method.href ? (
                          <a href={method.href} className="method-value">
                            {method.value}
                          </a>
                        ) : (
                          <span className="method-value">{method.value}</span>
                        )}
                        {method.note && <span className="method-note">{method.note}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="social-card">
                <h4>Follow My Work</h4>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`social-link ${social.className}`}
                    >
                      <img src={social.icon} alt={social.name} width="24" height="24" />
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="map-section">
              <div className="map-card">
                <div className="map-header">
                  <h4>Find Me</h4>
                  <div className="map-toggle">
                    <input
                      type="checkbox"
                      id="toggle-map-mode"
                      checked={mapDark}
                      onChange={(event) => setMapDark(event.target.checked)}
                    />
                    <label htmlFor="toggle-map-mode">Dark Mode</label>
                  </div>
                </div>
                <div className="map-container">
                  <iframe
                    id="googlemap"
                    src={mapSrc}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chapel Hill, North Carolina"
                  />
                </div>
                <div className="map-footer">
                  <p>Chapel Hill, North Carolina</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
