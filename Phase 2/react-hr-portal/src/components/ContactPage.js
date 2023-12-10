import React from 'react';
import ContactUs from './ContactUs';

const ContactPage = () => {
  const customContent = {
    title: 'Contact Our HR Team',
    description: 'Get in touch with our HR department for any employment-related queries.',
    address: '456 HR Avenue, Town, Country',
    email: 'hr@example.com',
    phone: '+9876543210',
  };

  return (
    <div>
      {/* Pass the content property to customize ContactUs */}
      <ContactUs content={customContent} />
    </div>
  );
};

export default ContactPage;
