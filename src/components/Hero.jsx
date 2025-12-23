import { heroContent } from "../data/content";
import ParticleCanvas from "./ParticleCanvas";
import LightRays from "./LightRays";

const Hero = ({ enableParticles }) => (
  <section id="hero" className="hero section-morph visible">
    <LightRays
      raysOrigin="top-center"
      raysColor="#ffffff"
      raysSpeed={1}
      lightSpread={1.2}
      rayLength={2}
      pulsating={false}
      fadeDistance={1.0}
      saturation={1.0}
      followMouse={true}
      mouseInfluence={0.1}
    />
    <ParticleCanvas enabled={enableParticles} />
    <div className="hero-content">
      <div className="hero-date">{heroContent.location}</div>
      <div className="hero-logo parallax-element parallax-medium">
        <div className="hero-logo-text">
          <span className="logo-j">J</span>
          <span className="logo-r">R</span>
        </div>
        <div className="hero-number">{heroContent.coordinates}</div>
        <div className="hero-name">{heroContent.title}</div>
      </div>
    </div>
  </section>
);

export default Hero;
