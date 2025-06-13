export default function Pending() {
  return (
    <div className="w-full max-w-2xl mx-auto p-9 flex flex-col justify-center items-center text-center">
      <h4 className="text-lg mb-4 py-1 px-8 bg-amber-50 text-amber-600 font-bold rounded-full">
        Pending Approval
      </h4>
      <h1 className="text-4xl font-bold mb-4">We're evaluating your profile</h1>
      <p className="text-zinc-700 mb-10">
        In order to make sure our community holds up a standard, we don't allow
        any profile to get in
      </p>
      <img
        src="https://cdn-icons-gif.flaticon.com/11677/11677478.gif"
        alt="pending approval"
        className="size-20"
      />
    </div>
  );
}
