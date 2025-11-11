"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Upload, FileText, Loader2 } from "lucide-react";
import { uploadBill } from "@/lib/storage";
import Image from "next/image";

interface UploadedFile {
  file: File;
  preview?: string;
  uploading?: boolean;
  error?: string;
}

interface UploadBillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function UploadBillDialog({
  open,
  onOpenChange,
  onSuccess,
}: UploadBillDialogProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      // Upload all files
      const uploadPromises = files.map((uploadedFile) =>
        uploadBill(uploadedFile.file)
      );

      const results = await Promise.all(uploadPromises);

      // Check for errors
      const errors = results.filter((result) => !result.success);
      if (errors.length > 0) {
        alert(`Failed to upload ${errors.length} file(s). Please try again.`);
        return;
      }

      // Success - close dialog and refresh
      onSuccess();
      onOpenChange(false);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading bills:", error);
      alert("Failed to upload bills. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    // Clean up previews
    files.forEach((uploadedFile) => {
      if (uploadedFile.preview) {
        URL.revokeObjectURL(uploadedFile.preview);
      }
    });
    setFiles([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Upload Additional Bills</DialogTitle>
          <DialogDescription>
            Upload your recent electric bills (PDF or images) to help us calculate your potential
            savings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-300 hover:border-yellow-400 hover:bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
            {isDragActive ? (
              <p className="text-gray-700">Drop the files here...</p>
            ) : (
              <>
                <p className="text-gray-700 mb-1">Drag & drop your bills here, or click to select</p>
                <p className="text-sm text-gray-500">PDF, JPG, PNG, or WebP (max 10MB per file)</p>
              </>
            )}
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">
                Selected Files ({files.length})
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {files.map((uploadedFile, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      {uploadedFile.preview ? (
                        <Image
                          src={uploadedFile.preview}
                          alt={uploadedFile.file.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                      ) : (
                        <FileText className="w-10 h-10 text-red-500" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedFile.file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                      disabled={isUploading}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-900">
              <strong>Tip:</strong> Upload bills from the last 3-12 months for the most accurate
              savings estimate.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                `Upload ${files.length} ${files.length === 1 ? "Bill" : "Bills"}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
