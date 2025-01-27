import React from "react";
import Image from "next/image";

const ContactInfo = () => {
  const contactInfo = [
    {
      id: 1,
      title: "",
      phone: "+44 779 985 6875",
      phoneHref: "https://api.whatsapp.com/send/?phone=447799856875", // Updated phoneHref to use "tel" URI
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
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref}>    <Image
                  src="/images/whatsapp.svg" // Upewnij się, że ścieżka jest poprawna
                  alt="WhatsApp"
                  width={100} // Dostosuj rozmiar według potrzeb
                  height={30}
                />   
                </a>
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
