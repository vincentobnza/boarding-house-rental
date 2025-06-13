import Pending from "./pending";

export default function Dashboard() {
  const isRegisteredLandlord = false;
  return <div className="w-full">{!isRegisteredLandlord && <Pending />}</div>;
}
