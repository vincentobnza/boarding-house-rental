export default function BookmarkPage() {
  const isThereAnyBookmark = false; // This should be replaced with actual logic to check for bookmarks
  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-grow flex-col items-start p-12">
      <div className="mt-10 w-full">
        {!isThereAnyBookmark && (
          <div className="flex flex-col items-center justify-center gap-8">
            <img
              src="https://cdn-icons-png.flaticon.com/128/17568/17568932.png"
              alt="bookmark"
              className="size-10"
            />

            <h1 className="opacity-70">
              It seems you haven't bookmarked any properties yet.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
