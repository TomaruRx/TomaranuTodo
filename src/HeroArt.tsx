const HeroArt = () => {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg className="orbit-art" viewBox="0 0 320 260" fill="none">
        <path d="M0 130H320M160 0V260" className="art-guide" />
        <g stroke="currentColor" strokeWidth="1.2">
          <ellipse
            cx="160"
            cy="130"
            rx="139"
            ry="51"
            transform="rotate(-35 160 130)"
          />
          <ellipse
            cx="160"
            cy="130"
            rx="139"
            ry="65"
            transform="rotate(-35 160 130)"
          />
          <ellipse
            cx="160"
            cy="130"
            rx="139"
            ry="81"
            transform="rotate(-35 160 130)"
          />
          <ellipse
            cx="160"
            cy="130"
            rx="139"
            ry="99"
            transform="rotate(-35 160 130)"
          />
          <ellipse
            cx="160"
            cy="130"
            rx="109"
            ry="112"
            transform="rotate(-35 160 130)"
          />
          <ellipse
            cx="160"
            cy="130"
            rx="79"
            ry="112"
            transform="rotate(-35 160 130)"
          />
          <ellipse
            cx="160"
            cy="130"
            rx="44"
            ry="112"
            transform="rotate(-35 160 130)"
          />
        </g>
        <path
          d="M149 130H171M160 119V141"
          stroke="black"
          strokeWidth="3"
        />
        <circle cx="261" cy="62" r="8" fill="black" />
        <circle cx="61" cy="191" r="5" fill="currentColor" />
      </svg>
      <div className="art-caption">
        <span>TASKS IN MOTION</span>
        <span>↗</span>
      </div>
    </div>
  );
};

export default HeroArt;
