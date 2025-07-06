import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/Card.jsx";
import { Input } from "./components/ui/Input.jsx";
import { Button } from "./components/ui/Button.jsx";

const sampleJobs = [
  { id: 1, title: "Frontend Developer", description: "Build UIs using React." },
  { id: 2, title: "Backend Developer", description: "Work with Node.js and databases." },
  { id: 3, title: "Full Stack Engineer", description: "Develop and maintain full-stack apps." }
];

export default function Listings({ jobs }) {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = (id) => {
    alert(`You applied to job title: ${id}`);
  };

  return (
    <div className="py-6 space-y-6">
      <h2 className="text-xl font-semibold text-center">Job Listings</h2>
      <Input
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mx-auto max-w-md"
      />

      <div className="grid gap-4 mt-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="bg-white">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="mb-2 text-gray-700">{job.description}</p>
                <Button onClick={() => handleApply(job.title)}>Apply</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No matching jobs found.</p>
        )}
      </div>
    </div>
  );
}
