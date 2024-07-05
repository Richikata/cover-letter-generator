"use client";

import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";


function Resume() {
  // State variables to store the resume and cover letter content
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  useCopilotReadable({
    description: "The user's cover letter.",
    value: coverLetter,
  });

  useCopilotReadable({
    description: "The user's resume.",
    value: resume,
  });

  useCopilotAction(
    {
      // Define the name of the action
      name: "createCoverLetterAndResume",
      // Provide a description for the action
      description: "Create a cover letter and resume for a job application.",
      // Define the parameters required for the action
      parameters: [
        {
          // Name of the first parameter
          name: "coverLetterMarkdown",
          // Type of the first parameter
          type: "string",
          // Description of the first parameter
          description:
            "Markdown text for a cover letter to introduce yourself and briefly summarize your professional background.",
          // Mark the first parameter as required
          required: true,
        },
        {
          // Name of the second parameter
          name: "resumeMarkdown",
          // Type of the second parameter
          type: "string",
          // Description of the second parameter
          description:
            "Markdown text for a resume that displays your professional background and relevant skills.",
          // Mark the second parameter as required
          required: true,
        },
      ],
      // Define the handler function to be executed when the action is called
      handler: async ({ coverLetterMarkdown, resumeMarkdown }) => {
        // Update the state with the provided cover letter markdown text
        setCoverLetter(coverLetterMarkdown);
        // Update the state with the provided resume markdown text
        setResume(resumeMarkdown);
      },
    },
    // Empty dependency array, indicating this effect does not depend on any props or state
    [],
  );

  return (
    // Main container with flex layout, full width, and minimum height of screen
    <div className="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Header section with a fixed height, padding, and border at the bottom */}
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-white dark:bg-gray-900">
        {/* Link component for navigation with custom styles */}
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          prefetch={false}>
          <span className="sr-only text-gray-500">Resume Dashboard</span>
          <h1>Resume & Cover Letter Generator</h1>
        </Link>
      </header>
      {/* Main content area with padding */}
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        {/* Container for the content with maximum width and centered alignment */}
        <div className="max-w-4xl mx-auto grid gap-8">
          {/* Section for displaying the resume */}
          <section>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
              <div className="p-6 md:p-8">
                <h2 className="text-lg font-bold">Resume</h2>
                <div className="my-6" />
                <div className="grid gap-6">
                  {/* Conditional rendering of the resume content */}
                  {resume ? (
                    <ReactMarkdown>{resume}</ReactMarkdown>
                  ) : (
                    <div>No Resume To Display</div>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* Section for displaying the cover letter */}
          <section>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
              <div className="p-6 md:p-8">
                <h2 className="text-lg font-bold">Cover Letter</h2>
                <div className="my-6" />
                <div className="grid gap-4">
                  {/* Conditional rendering of the cover letter content */}
                  {coverLetter ? (
                    <ReactMarkdown>{coverLetter}</ReactMarkdown>
                  ) : (
                    <div>No Cover Letter To Display</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Resume;