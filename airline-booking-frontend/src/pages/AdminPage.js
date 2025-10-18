
import React from 'react';
import FlightManagement from '../components/admin/FlightManagement';


const AdminPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-8">
        <FlightManagement />
        
      </div>
    </div>
  );
};

export default AdminPage;