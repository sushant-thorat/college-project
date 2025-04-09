import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import PropertyFeatures from "./pages/PropertyFeatures";
import ClientSays from "./pages/ClientSays";
import Team from "./pages/Team";
import Users from "./pages/Users";
import Property from "./pages/Property";
import NewProperty from "./pages/NewProperty";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="my-property" element={<Property />} />
        <Route path="new-property" element={<NewProperty />} />
        <Route path="property-features" element={<PropertyFeatures />} />
        <Route path="client-says" element={<ClientSays />} />
        <Route path="team" element={<Team />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
