import TextField from "@/components/shared/text-field";
import { ArrowLeft, Copy, Shield } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react"; // Added import
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Added import
import { ScrollRestoration } from "react-router-dom";

export default function RegistrationPayment() {
  const { isCopied, handleCopy } = useCopyToClipboard();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 h-full w-full max-w-screen-lg flex flex-col items-center relative ">
        <Button
          variant="ghost"
          className="absolute top-6 left-6 rounded"
          onClick={() => window.history.back()}
        >
          <ArrowLeft />
          Go Back
        </Button>
        <img
          src="https://cdn-icons-png.flaticon.com/128/726/726488.png"
          alt="payment icon"
          className="size-14 mb-1"
        />
        <h1 className="mt-8 text-2xl font-bold mb-2">Registration Payment</h1>
        <p className="text-gray-600 mb-5 text-sm">
          Please complete your payment to finalize your registration.
        </p>

        <div className="w-full max-w-2xl mx-auto mt-5 pb-8">
          <form className="flex flex-col justify-center items-center">
            <TextField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              className="mb-5 w-full"
              required
            />

            <GcashNumber handleCopy={handleCopy} isCopied={isCopied} />

            <div className="w-full grid md:grid-cols-2 gap-4">
              <TextField
                label="Attached Proof of Payment"
                type="file"
                placeholder="Upload your proof of payment"
                className="mb-5 w-full"
                required
              />
              <TextField
                label="Enter reference number"
                placeholder="Enter the reference number"
                className="mb-5 w-full"
                required
              />
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-4 p-4 bg-green-50 border border-emerald-500 rounded-md">
              <Shield className="size-5 text-emerald-700 mt-1" />
              <p className="text-sm text-emerald-700">
                <strong>Secure Process:</strong> Your payment information is
                encrypted and processed securely. We never store your financial
                details.
              </p>
            </div>

            <div className="self-start flex items-start justify-start gap-3 mt-5">
              <input
                type="checkbox"
                id="privacy-policy"
                className="mt-1"
                required
              />
              <label htmlFor="privacy-policy" className="text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Terms of Service
                </a>
              </label>
            </div>

            <Button
              onClick={() => {
                window.location.href = "/landlord/pending";
              }}
              className="rounded bg-zinc-800 mt-8 "
              size="lg"
            >
              Submit Payment
            </Button>
          </form>
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}

const GcashNumber = ({
  handleCopy,
  isCopied,
}: {
  handleCopy: (number: string) => void;
  isCopied: boolean;
}) => {
  const gcashNumber = "091224456789";

  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className="w-full flex flex-col mb-8 gap-2">
      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor="gcash_number"
          className="text-sm font-medium text-gray-700"
        >
          Recipient's GCash Number
        </label>
        <div className="flex items-center justify-between border-2 border-dashed border-zinc-200 bg-zinc-50 p-4 rounded-md">
          <span className="font-mono text-gray-900">{gcashNumber}</span>
          <button
            type="button"
            onClick={() => handleCopy(gcashNumber)}
            className="px-3 py-1 flex items-center gap-2 text-sm text-zinc-600 bg-white border border-zinc-200 rounded hover:bg-zinc-100 transition"
            aria-label="Copy GCash Number"
          >
            {isCopied ? (
              <span className="font-medium">Copied</span>
            ) : (
              <>
                <Copy className="size-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <p
        onClick={() => setShowQRCode(!showQRCode)}
        className="cursor-pointer text-sm underline"
      >
        {showQRCode ? "Hide QR Code" : "Show QR Code"}
      </p>
      {showQRCode && (
        <div className="mt-4 p-4 border rounded-md bg-white self-center">
          <QRCodeCanvas
            value={gcashNumber}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="Q"
          />
        </div>
      )}
    </div>
  );
};
