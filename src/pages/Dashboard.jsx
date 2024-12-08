import React from "react";


function Dashboard({ title, value }){
  return (
    <div className="dashboard">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Dashboard;
