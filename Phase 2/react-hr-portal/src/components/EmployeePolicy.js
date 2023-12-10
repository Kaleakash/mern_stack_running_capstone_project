import React from 'react';
import '../App.css';
const EmployeePolicyPage = () => {
  const policies = [
    {
      id: 1,
      title: 'Vacation Policy',
      description: 'Information about vacation days, leave accrual, and requesting time off.',
      // Add more fields as needed for each policy
    },
    {
      id: 2,
      title: 'Healthcare Benefits',
      description: 'Details about health insurance plans, coverage, and enrollment procedures.',
      // Add more fields as needed for each policy
    },
    {
      id: 3,
      title: 'Remote Work Policy',
      description: 'Guidelines for working remotely, including eligibility and expectations.',
      // Add more fields as needed for each policy
    },
    {
      id: 4,
      title: 'Code of Conduct',
      description: 'Expectations for ethical behavior, professionalism, and workplace conduct.',
      // Add more fields as needed for each policy
    },
    {
      id: 5,
      title: 'Expense Reimbursement',
      description: 'Procedures for submitting and reimbursing business-related expenses.',
      // Add more fields as needed for each policy
    },
    {
      id: 6,
      title: 'Employee Benefits',
      description: 'Overview of additional benefits like retirement plans, bonuses, etc.',
      // Add more fields as needed for each policy
    },
    {
      id: 7,
      title: 'Workplace Safety',
      description: 'Protocols and guidelines for ensuring a safe working environment.',
      // Add more fields as needed for each policy
    },
    {
      id: 8,
      title: 'Performance Reviews',
      description: 'Process and criteria for employee performance evaluations.',
      // Add more fields as needed for each policy
    },
    {
      id: 9,
      title: 'Training and Development',
      description: 'Information about employee training programs and opportunities for growth.',
      // Add more fields as needed for each policy
    },
    {
      id: 10,
      title: 'Equal Employment Opportunity',
      description: 'Policy ensuring fair treatment and opportunities for all employees.',
      // Add more fields as needed for each policy
    },
    // Add more policies as necessary
  ];

  return (
    <div className="employee-policy-page">
      <h1>Employee Policies</h1>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id}>
            <h3>{policy.title}</h3>
            <p>{policy.description}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeePolicyPage;
