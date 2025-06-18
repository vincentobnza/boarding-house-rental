import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChartNoAxesGantt, CheckCircle, PencilLine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOutDialog } from "@/components/logout-modal";

export default function LandlordInquirer() {
  return (
    <div className="min-h-[80vh] p-8">
      <div className="flex h-full w-full items-start space-x-6">
        {/* SIDEBAR */}
        <div className="sticky top-48 flex h-[40vh] w-1/4 flex-col items-start justify-between rounded-lg border border-zinc-200 p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Inquirer</h1>
            <p className="text-zinc-600">
              Manage inquiries from potential tenants.
            </p>
          </div>

          <LogOutDialog redirectAfterLogoutUrl="/landlord/login" />
        </div>

        <div className="w-3/4 rounded-lg border border-zinc-200 p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Inquiry Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {DUMP_INQUIRY.map((inquiry, index) => (
              <InquiryCard key={index} inquiry={inquiry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DUMP_INQUIRY = [
  {
    tenant_name: "John Doe",
    apartment_name: "Sunset Apartments",
    date_sent: "June  15, 2025",
    status: "Pending",
    beds: "3",
    apartment_type: "2 Bedroom",
  },
  {
    tenant_name: "Jane Smith",
    apartment_name: "Green Valley Estates",
    date_sent: "June  16, 2025",
    status: "Reviewed",
    beds: "1",
    apartment_type: "Studio",
  },
  {
    tenant_name: "Alice Johnson",
    apartment_name: "Ocean View Condos",
    date_sent: "June  17, 2025",
    status: "Pending",
    beds: "2",
    apartment_type: "1 Bedroom",
  },
] as const;

type Inquiry = {
  tenant_name: string;
  apartment_name: string;
  date_sent: string;
  status: "Pending" | "Reviewed" | "Archived";
  beds: string;
  apartment_type: string;
};

const InquiryCard = ({ inquiry }: { inquiry: Inquiry }) => {
  return (
    <div className="flex w-full justify-between rounded-lg border border-zinc-200 p-8">
      <div className="flex flex-col space-y-2">
        <div className="mb-6 flex items-center gap-3 self-start">
          <Avatar>
            <AvatarImage
              src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
              alt="@landlord owner"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">{inquiry.tenant_name}</h3>
        </div>
        <p className="mb-2 text-zinc-700">{inquiry.apartment_name}</p>
        <p className="text-sm text-zinc-400">
          Inquiorange on: {inquiry.date_sent}
        </p>
      </div>

      <ViewDetailsModal {...inquiry} />
    </div>
  );
};

type ViewDetailsModalProps = {
  tenant_name: string;
  apartment_name: string;
  apartment_type: string;
  beds: string;
};
const ViewDetailsModal = (
  props: ViewDetailsModalProps = {
    tenant_name: "John Doe",
    apartment_name: "Villa Starva",
    apartment_type: "Studio Type",
    beds: "2",
  },
) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-start justify-start gap-3">
          <Button className="rounded" variant="outline">
            <ChartNoAxesGantt />
            View Details
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="z-[999999] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tenant Details</DialogTitle>
          <DialogDescription>
            Here you can view the details of the tenant's inquiry and manage
            their status.
          </DialogDescription>

          <div className="mt-8 flex flex-col gap-4">
            <Label label="Tenant Name" tenant_name={props.tenant_name} />
            <Label label="Apartment Name" tenant_name={props.apartment_name} />
            <Label label="Apartment Type" tenant_name={props.apartment_type} />
            <Label label="Beds" tenant_name={props.beds} />
          </div>

          <div className="mt-10 flex w-full gap-2">
            <Button className="h-12 flex-1 rounded" variant="outline">
              <PencilLine />
              Mark as Reviewed
            </Button>
            <Button className="h-12 flex-1 rounded bg-emerald-600 text-white shadow-none hover:bg-emerald-700">
              <CheckCircle />
              Approved
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Label = ({
  tenant_name,
  label,
}: {
  tenant_name: string;
  label: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-1 border-b border-zinc-200 pb-4">
      <p className="text-xs opacity-70">{label}</p>
      <h1 className="text-lg font-bold">{tenant_name}</h1>
    </div>
  );
};
