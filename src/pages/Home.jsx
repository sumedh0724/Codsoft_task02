import React from "react";
import { Card, CardContent } from "./components/ui/Card.jsx";
import { Button } from "./components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";


export default function Home({ jobs = [] }) {
  const navigate = useNavigate();

  const handleApply = (id) => {
    alert(`Applied to job title: ${id}`);
  };

  return (
    <div className="text-center py-6 space-y-6  overflow-hidden">
      <h2 className="text-2xl font-semibold">Welcome to the Job Board</h2>
      <p className="text-gray-600">Find your next opportunity here!</p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.id} className="bg-white">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="mb-2 text-gray-700">{job.description}</p>
                <Button onClick={() => handleApply(job.title)}>Apply</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-2">No jobs available.</p>
        )}
      </div>

      <Button onClick={() => navigate("/listings")} className="mt-4">
        Browse All Jobs
      </Button>
    </div>
  );
}
