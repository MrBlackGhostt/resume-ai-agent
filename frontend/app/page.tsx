"use client";
import React, { useState } from "react";
import { Resume } from "@/types/resume";
import Image from "next/image";
import ChatInterface from "./component/ChatInterface";
import ResumeUploader from "./component/ResumeUploader";

export default function Home() {
  const [resume, setResume] = useState<Resume | null>(null);

  const handleResumeUploaded = (uploadedResume: Resume) => {
    setResume(uploadedResume);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-50">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Resume AI Assistant
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your resume and talk with our AI assistant to get
            personalized career advice
          </p>
        </header>

        {!resume ? (
          <div className="max-w-xl mx-auto">
            <ResumeUploader onResumeUploaded={handleResumeUploaded} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Your Resume</h2>
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="p-4 border-b bg-muted/30">
                    <p className="font-medium truncate">{resume.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* Uploaded {resume.uploadDate.toLocaleDateString()} */}
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm">
                      {resume.content.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 border-t">
                    <button
                      className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                      onClick={() => setResume(null)}>
                      Upload a different resume
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 h-[600px]">
              <h2 className="text-xl font-semibold mb-4">
                Chat with AI Assistant
              </h2>
              <ChatInterface resume={resume} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
