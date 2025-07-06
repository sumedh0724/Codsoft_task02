import React, { useState } from "react";
import { Input } from "./components/ui/Input.jsx";
import { Button } from "./components/ui/Button.jsx";

export default function Dashboard({jobs, addJob}) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    resume: null,
  });

  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
  });

  const [alerts, setAlerts] = useState([]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleJobPost = () => {
    if (jobForm.title.trim() && jobForm.description.trim()) {
      addJob({ title: jobForm.title, description: jobForm.description });
      setAlerts([...alerts, `Job posted: ${jobForm.title}`]);
      setJobForm({ title: "", description: "" });
    }
  };

  return (
    <div className="py-6 space-y-6">
      <h2 className="text-xl font-semibold text-center">Candidate Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Profile Management</h3>
          <Input
            name="name"
            placeholder="Your Name"
            value={profile.name}
            onChange={handleProfileChange}
            className="mb-2"
          />
          <Input
            name="email"
            placeholder="Email Address"
            value={profile.email}
            onChange={handleProfileChange}
            className="mb-2"
          />
          <Input
            name="resume"
            type="file"
            onChange={handleProfileChange}
            className="mb-2"
          />
          <Button onClick={() => setAlerts([...alerts, "Profile updated successfully."])}>
            Save Profile
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Post a Job</h3>
          <Input
            placeholder="Job Title"
            value={jobForm.title}
            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Job Description"
            value={jobForm.description}
            onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleJobPost}>Post Job</Button>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg">
          <ul className="space-y-1">
            {alerts.map((alert, idx) => (
              <li key={idx}>• {alert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
