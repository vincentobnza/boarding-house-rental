import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  FileText,
  Upload,
  Camera,
  DollarSign,
  AlertCircle,
  Shield,
  CheckCircle2,
  User,
} from "lucide-react";
import Footer from "@/components/footer";

const CERTIFICATES = [
  { label: "BPLO Certificate", required: true },
  { label: "BFP Certificate", required: true },
  { label: "MEO Clearance", required: true },
];

export default function Registration() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Form />
      </div>

      <Footer />
    </div>
  );
}

const Header = () => (
  <div className="bg-white border-b border-gray-200">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center space-x-3">
        <Building2 className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-semibold text-gray-900">
          Landlord Registration
        </h1>
      </div>
      <p className="text-center text-gray-600 mt-2">
        Register your rental business and properties
      </p>
    </div>
  </div>
);

const Form = () => {
  return (
    <div className="space-y-8">
      {/* Fee Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">
              Registration Fees Required
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              A registration fee is required to activate your account, plus an
              additional fee for uploading property listings.
            </p>
          </div>
        </div>
      </div>

      {/* Business Registration Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <User className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-medium text-gray-900">
            Business Registration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building2 className="h-4 w-4" />
              <span>
                Business Name <span className="text-red-500">*</span>
              </span>
            </label>
            <Input
              type="text"
              required
              placeholder="Enter your business name"
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4" />
              <span>
                Business Address <span className="text-red-500">*</span>
              </span>
            </label>
            <Input
              type="text"
              required
              placeholder="Enter your business address"
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Certificates Section */}
        <div className="space-y-4">
          <h3 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-4">
            <Shield className="h-4 w-4" />
            <span>Required Certificates</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CERTIFICATES.map((cert) => (
              <div className="space-y-2" key={cert.label}>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" />
                  <span>
                    {cert.label}{" "}
                    {cert.required && <span className="text-red-500">*</span>}
                  </span>
                </label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    required={cert.required}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <Upload className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Registration Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Building2 className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-medium text-gray-900">
            Property Registration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building2 className="h-4 w-4" />
              <span>
                Property Name <span className="text-red-500">*</span>
              </span>
            </label>
            <Input
              type="text"
              required
              placeholder="Enter property name"
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4" />
              <span>
                Property Address <span className="text-red-500">*</span>
              </span>
            </label>
            <Input
              type="text"
              required
              placeholder="Enter property address"
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <FileText className="h-4 w-4" />
            <span>
              Property Description <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
            placeholder="Describe your property, amenities, location benefits, etc."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <DollarSign className="h-4 w-4" />
              <span>
                Monthly Rate (₱) <span className="text-red-500">*</span>
              </span>
            </label>
            <Input
              type="number"
              min="0"
              required
              placeholder="e.g. 5000"
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Camera className="h-4 w-4" />
              <span>
                Property Photos <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                multiple
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <Upload className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="flex items-center space-x-2 text-sm font-medium text-green-900 mb-4">
          <CheckCircle2 className="h-4 w-4" />
          <span>What you'll get after registration:</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-800">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-3 w-3" />
            <span>Dashboard for managing property listings</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-3 w-3" />
            <span>Secure messaging with potential tenants</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-3 w-3" />
            <span>Tenant review system management</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-3 w-3" />
            <span>Safety compliance monitoring</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="h-12 bg-zinc-700 hover:bg-zinc-700 text-white px-8 py-2 rounded-md transition-colors duration-200"
        >
          Submit Registration
        </Button>
      </div>
    </div>
  );
};
