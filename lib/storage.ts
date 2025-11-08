export interface UploadBillResult {
  success: boolean;
  fileUrl?: string;
  filePath?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  error?: string;
}

/**
 * Upload a bill file via API route (client-side safe)
 * @param file - The file to upload
 * @returns Upload result with file URL
 */
export async function uploadBill(
  file: File
): Promise<UploadBillResult> {
  try {
    // Validate file on client side first
    const validationError = validateBillFile(file);
    if (validationError) {
      return { success: false, error: validationError };
    }

    // Create form data
    const formData = new FormData();
    formData.append("file", file);

    // Upload via API route
    const response = await fetch("/api/upload-bill", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to upload file"
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Unexpected upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Validate bill file
 * @param file - The file to validate
 * @returns Error message if invalid, null if valid
 */
function validateBillFile(file: File): string | null {
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return "File size must be less than 10MB";
  }

  // Check file type (PDF or images)
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    return "File must be a PDF or image (JPEG, PNG, WebP)";
  }

  return null;
}
