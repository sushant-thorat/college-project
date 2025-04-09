import { useState, useEffect } from "react";
import { PlusCircle, XCircle } from "lucide-react";
import TeamCard from "../components/TeamCard";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [newMember, setNewMember] = useState({
    first_name: "", // updated field name
    last_name: "", // updated field name
    position: "",
    email: "",
    image: "",
  });

  // Define an array of positions for the dropdown
  const positions = [
    "CEO",
    "Developer",
    "Designer",
    "Manager",
    "Marketing",
    "Support",
  ];

  // Fetch team members from the backend
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/team");

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setTeamMembers(result.data);
      } else {
        console.error("Unexpected API response:", result);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      setTeamMembers([]);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  // Add or Edit a Team Member
  const handleAddOrEditMember = async () => {
    if (
      !newMember.first_name ||
      !newMember.last_name ||
      !newMember.position ||
      !newMember.email ||
      !newMember.image
    ) {
      return;
    }

    try {
      let response;

      if (editingMember) {
        // Update team member in backend
        response = await fetch(
          `http://localhost:3000/api/team/${editingMember.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMember),
          }
        );
      } else {
        // Add new member to backend
        response = await fetch("http://localhost:3000/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMember),
        });
      }

      if (response.ok) {
        fetchTeamMembers(); // Fetch updated data after add/edit
      }
    } catch (error) {
      console.error("Error saving team member:", error);
    }

    // Reset form
    setNewMember({
      first_name: "", // updated field name
      last_name: "", // updated field name
      position: "",
      email: "",
      image: "",
    });
    setShowModal(false);
    setEditingMember(null);
  };

  // Edit a member
  const handleEditMember = (member) => {
    setEditingMember(member);
    setNewMember({
      first_name: member.first_name, // updated field name
      last_name: member.last_name, // updated field name
      position: member.position,
      email: member.email,
      image: member.image,
    });
    setShowModal(true);
  };

  // Delete a member
  const handleDeleteMember = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/team/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchTeamMembers(); // Fetch updated data after delete
        }
      } catch (error) {
        console.error("Error deleting team member:", error);
      }
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">
          🚀 Team Management
        </h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setNewMember({
              first_name: "", // updated field name
              last_name: "", // updated field name
              position: "",
              email: "",
              image: "",
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition-all hover:shadow-xl"
        >
          <PlusCircle size={22} /> Add Team Member
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              onEdit={() => handleEditMember(member)}
              onDelete={() => handleDeleteMember(member.id)}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No team members found.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <XCircle size={24} />
              </button>
            </div>

            {/* Form Inputs */}

            <input
              type="text"
              name="first_name" // updated field name
              placeholder="First Name"
              value={newMember.first_name} // updated field name
              onChange={handleInputChange}
              className="w-full p-2 mb-3 border rounded-md"
            />
            <input
              type="text"
              name="last_name" // updated field name
              placeholder="Last Name"
              value={newMember.last_name} // updated field name
              onChange={handleInputChange}
              className="w-full p-2 mb-3 border rounded-md"
            />

            {/* Dropdown for Position */}
            <select
              name="position"
              value={newMember.position}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 border rounded-md"
            >
              <option value="" disabled>
                Select Position
              </option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newMember.email}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 border rounded-md"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newMember.image}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 border rounded-md"
            />

            {newMember.image && (
              <div className="flex justify-center mb-3">
                <img
                  src={newMember.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover shadow-md"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditMember}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingMember ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
