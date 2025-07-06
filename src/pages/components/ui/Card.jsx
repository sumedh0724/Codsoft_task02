import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`shadow rounded-lg border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
