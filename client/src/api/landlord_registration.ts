import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000"; // Backend URL

export interface RegistrationData {
  businessName: string;
  businessAddress: string;
  blpoCertificate: FileList | null;
  bfpCertificate: FileList | null;
  meoClearance: FileList | null;
  propertyName: string;
  propertyAddress: string;
  propertyDescription: string;
  monthlyRate: number;
  propertyPhotos: FileList | null;
}

export interface PaymentData {
  fullName: string;
  proofOfPayment: FileList | null;
  referenceNumber: string;
}

export async function submitRegistration(formData: RegistrationData) {
  const data = new FormData();

  // Use snake_case keys to match backend expectations
  data.append("business_name", formData.businessName);
  data.append("business_address", formData.businessAddress);
  data.append("property_name", formData.propertyName);
  data.append("property_address", formData.propertyAddress);
  data.append("property_description", formData.propertyDescription);
  data.append("monthly_rate", formData.monthlyRate.toString());

  // Append file fields (certificates) - only if present
  if (formData.blpoCertificate && formData.blpoCertificate.length > 0) {
    data.append("blpo_certificate", formData.blpoCertificate[0]);
  }
  if (formData.bfpCertificate && formData.bfpCertificate.length > 0) {
    data.append("bfp_certificate", formData.bfpCertificate[0]);
  }
  if (formData.meoClearance && formData.meoClearance.length > 0) {
    data.append("meo_clearance", formData.meoClearance[0]);
  }

  // Append property photos (can be multiple)
  if (formData.propertyPhotos && formData.propertyPhotos.length > 0) {
    Array.from(formData.propertyPhotos).forEach((file) => {
      data.append("property_photos", file);
    });
  }

  // Debug: log FormData keys
  for (const [key] of data.entries()) {
    console.log("FormData key:", key);
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/landlord/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data); // Handle the response (success)
    alert("Registration submitted successfully!");
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      // Backend responded with an error status code
      console.error("Backend error:", err.response.data);
      alert(`Registration failed: ${JSON.stringify(err.response.data)}`);
    } else if (err.request) {
      // Request was made but no response received
      console.error("No response received:", err.request);
      alert("No response from server. Please try again.");
    } else {
      // Something else happened
      console.error("Error submitting registration:", err.message);
      alert("Registration failed. Please try again.");
    }
  }
}

export async function submitPayment(data: PaymentData): Promise<void> {
  if (!data.proofOfPayment || data.proofOfPayment.length === 0) {
    throw new Error("Proof of payment file is required");
  }

  const formData = new FormData();
  formData.append("full_name", data.fullName);
  formData.append("proof_of_payment", data.proofOfPayment[0]); // Correct field name
  formData.append("reference_number", data.referenceNumber);

  // Debug: log FormData keys
  for (const [key] of formData.entries()) {
    console.log("FormData key:", key);
  }

  try {
    await axios.post(`${BASE_URL}/api/landlord/payment`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error("submitPayment backend error:", err.response.data);
      throw new Error(JSON.stringify(err.response.data));
    } else if (err.request) {
      console.error("submitPayment no response:", err.request);
      throw new Error("No response from server.");
    } else {
      console.error("submitPayment error:", err.message);
      throw err;
    }
  }
}