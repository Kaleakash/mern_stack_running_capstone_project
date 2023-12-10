import React from 'react';
import '../App.css'; // Import your CSS file

const HrPolicy = ({ contents }) => {
  return (
    <div className="employee-policy-page">
      <h1>HR Policies</h1>
      <ul className="policy-list">
       

{contents.map((policy,index) => (
          <li key={index}>
            <h3>{policy.title}</h3>
            <p>{policy.content}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HrPolicy;
