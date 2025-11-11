"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X, Upload, FileText } from "lucide-react";
import Image from "next/image";

interface UploadedFile {
  file: File;
  preview?: string;
  uploading?: boolean;
  error?: string;
}

interface Step4Props {
  onNext: (files: File[]) => void;
  onBack: () => void;
}

export default function Step4BillUpload({ onNext, onBack }: Step4Props) {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => {
      // Limit to 3 files total
      const remainingSlots = 3 - prev.length;
      if (remainingSlots <= 0) {
        alert("Maximum 3 bills allowed");
        return prev;
      }

      const filesToAdd = acceptedFiles.slice(0, remainingSlots);
      const newFiles = filesToAdd.map((file) => ({
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }));

      return [...prev, ...newFiles];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 3,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleNext = () => {
    onNext(files.map((f) => f.file));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Your Electric Bills
        </h2>
        <p className="text-gray-600">
          Please upload your recent electric bills (PDF or images). This helps us calculate your potential savings.
        </p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-300 hover:border-yellow-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-lg text-gray-700">Drop the files here...</p>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2">
              Drag & drop your bills here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              PDF, JPG, PNG, or WebP (max 10MB per file)
            </p>
          </>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">
            Uploaded Files ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((uploadedFile, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  {uploadedFile.preview ? (
                    <Image
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <FileText className="w-12 h-12 text-red-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(uploadedFile.file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Upload bills from the last 3-12 months for the most accurate savings estimate.
          Your bills are securely stored and only used to calculate your potential savings.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="px-8"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
        >
          {files.length === 0 ? "Skip for Now" : `Continue with ${files.length} bill${files.length !== 1 ? 's' : ''}`}
        </Button>
      </div>
    </div>
  );
}
