import React from "react";

const ContactInfo = () => {
  const contactInfo = [
    {
      id: 1,
      title: "",
      phone: "+48 779 985 6875",
      phoneHref: "tel:+48 779 985 6875", // Updated phoneHref to use "tel" URI
    },
    {
      id: 2,
      title: "",
      email: "kontakt@teneryfa.org.pl",
      emailHref: "mailto:kontakt@teneryfa.org.pl", // Updated emailHref to use "mailto" URI
    },
  ];

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref}>{info.phone}</a>
              </h6>
            )}
            {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref}>{info.email}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
