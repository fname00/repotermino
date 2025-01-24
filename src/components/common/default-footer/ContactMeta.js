import React from "react";

const ContactMeta = () => {

  const contactInfoList = [
    {
      title: "Whats app",
      phone: "+44 779 985 6875",
      phoneLink: "tel:+44 779 985 6875", // Changed phoneLink to tel: URI
    },
    {
      title: "Email",
      mail: "kontakt@teneryfa.org.pl",
      mailLink: "mailto:kontakt@teneryfa.org.pl", // Changed mailLink to direct email address
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title">{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                Chat
                </a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
