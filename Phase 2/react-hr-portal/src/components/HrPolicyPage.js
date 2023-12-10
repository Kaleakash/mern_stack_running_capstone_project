import React from 'react';
import HrPolicy from './HrPolicy';

const HrPolicyPage = () => {
  const policyContents = [
    {
      title: 'Code of Conduct',
      content: `Our Code of Conduct serves as a guide for ethical behavior in the workplace. 
      It covers areas such as conflicts of interest, compliance with laws and regulations, 
      confidentiality, and professional standards.`,
    },
    {
      title: 'Equal Opportunity Policy',
      content: `We are committed to providing equal opportunities in employment. 
      Discrimination based on race, color, religion, gender, sexual orientation, age, 
      disability, or any other characteristic is prohibited.`,
    },
    {
      title: 'Workplace Safety',
      content: `Ensuring a safe working environment is a priority. 
      Safety protocols include regular safety training, hazard identification, 
      and maintaining emergency response plans.`,
    },
    {
      title: 'Diversity and Inclusion',
      content: `Diversity is celebrated and embraced. We foster an inclusive environment 
      where diverse perspectives are valued and contribute to innovation and growth.`,
    },
    {
      title: 'Anti-Harassment Policy',
      content: `We have a zero-tolerance policy for harassment. 
      This includes any form of harassment based on race, gender, sexual orientation, 
      age, disability, religion, or any other protected characteristic.`,
    },
    {
      title: 'Remote Work Policy',
      content: `Our remote work policy outlines guidelines for employees working remotely. 
      It covers expectations, communication, security, and data protection.`,
    },
    {
      title: 'Performance Management',
      content: `Our performance management policy includes regular evaluations, 
      feedback sessions, and opportunities for growth and development.`,
    },
    {
      title: 'Leave and Time Off',
      content: `Employees have access to various types of leave, including vacation, 
      sick leave, parental leave, and other time-off policies.`,
    },
    // Add more policy objects as needed
  ];

  return (
    <div>
      <HrPolicy contents={policyContents} />
    </div>
  );
};

export default HrPolicyPage;
