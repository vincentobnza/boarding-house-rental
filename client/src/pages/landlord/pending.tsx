export default function Pending() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center p-9 text-center">
      <h4 className="mb-4 rounded-full bg-amber-50 px-8 py-1 text-lg font-bold text-amber-600">
        Pending Approval
      </h4>
      <h1 className="mb-4 text-4xl font-bold">We're evaluating your profile</h1>
      <p className="mb-10 text-zinc-700">
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
