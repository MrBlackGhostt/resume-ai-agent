"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Resume } from "@/types/resume";

interface ResumeUploaderProps {
  onResumeUploaded: (resume: Resume) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onResumeUploaded,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging]
  );

  const processFile = async (file: File) => {
    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);

      const response = await fetch("http://localhost:8000/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload Failed");

      const file = await response.json();

      console.log("🚀 -----------------------------🚀");
      console.log("🚀 ~ processFile ~ data:", file);
      console.log("🚀 -----------------------------🚀");
      onResumeUploaded(file);
      toast.success("Resume uploaded Successfully");
      toast.success("RESPOSNE", file);
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing resume. Please try again.");
    } finally {
      setIsUploading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <Card
      className={`flex flex-col items-center justify-center p-10 border-2 border-dashed transition-colors ${
        isDragging ? "border-brand-500 bg-brand-50" : "border-muted"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <Upload className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">Upload Your Resume</h2>
      <p className="text-muted-foreground text-center mb-6">
        Drag and drop your PDF resume or click below to browse
      </p>
      <div className="relative">
        <input
          type="file"
          id="resume-upload"
          accept=".pdf"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Button
          disabled={isUploading}
          variant={"destructive"}
          // className="bg-brand-500 hover:bg-brand-600"
        >
          {isUploading ? "Uploading..." : "Select Resume"}
        </Button>
      </div>
    </Card>
  );
};

export default ResumeUploader;
