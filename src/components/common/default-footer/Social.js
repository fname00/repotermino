import React from "react";

const Social = () => {
  const socialIcons = [
    { class: "fab fa-facebook-f", link: "https://www.facebook.com" },
    { class: "fab fa-twitter", link: "https://www.twitter.com" },
    { class: "fab fa-instagram", link: "https://www.instagram.com" },
    { class: "fab fa-linkedin-in", link: "https://www.linkedin.com" },
  ];

  return (
    <div className="social-style1">
      {socialIcons.map((icon, index) => (
        <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
          <i className={icon.class + " list-inline-item"} />
        </a>
      ))}
    </div>
  );
};

export default Social;
