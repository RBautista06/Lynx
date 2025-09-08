const PostSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center animate-pulse">
        {/* Avatar skeleton */}
        <div className="size-12 rounded-full bg-base-300" />

        {/* Input placeholder */}
        <div className="flex-1 h-full">
          <div className="h-10 w-full rounded-full bg-base-300" />
        </div>

        {/* Button placeholder */}
        <div className="size-12 rounded-full bg-base-300" />
      </div>
      <div className="bg-base-200 rounded-xl p-5 flex flex-col gap-5 animate-pulse">
        {/* post header */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="rounded-full size-12 bg-base-300" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-base-300 rounded" />
              <div className="flex gap-2 items-center">
                <div className="h-3 w-16 bg-base-300 rounded" />
                <div className="h-3 w-3 rounded-full bg-base-300" />
              </div>
            </div>
          </div>
          <div className="h-5 w-5 bg-base-300 rounded" />
        </div>

        {/* media placeholder */}
        <div
          className="w-full rounded-lg bg-base-300"
          style={{ aspectRatio: "1/1" }}
        />

        {/* likes/comments */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="h-6 w-6 bg-base-300 rounded" />
              <div className="h-6 w-6 bg-base-300 rounded" />
              <div className="h-6 w-6 bg-base-300 rounded" />
            </div>
            <div className="h-6 w-6 bg-base-300 rounded" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-3 w-48 bg-base-300 rounded" />
          </div>
        </div>
      </div>
      <div className="bg-base-200 rounded-xl p-5 flex flex-col gap-5 animate-pulse">
        {/* post header */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="rounded-full size-12 bg-base-300" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-base-300 rounded" />
              <div className="flex gap-2 items-center">
                <div className="h-3 w-16 bg-base-300 rounded" />
                <div className="h-3 w-3 rounded-full bg-base-300" />
              </div>
            </div>
          </div>
          <div className="h-5 w-5 bg-base-300 rounded" />
        </div>

        {/* media placeholder */}
        <div
          className="w-full rounded-lg bg-base-300"
          style={{ aspectRatio: "1/1" }}
        />

        {/* likes/comments */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="h-6 w-6 bg-base-300 rounded" />
              <div className="h-6 w-6 bg-base-300 rounded" />
              <div className="h-6 w-6 bg-base-300 rounded" />
            </div>
            <div className="h-6 w-6 bg-base-300 rounded" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-3 w-48 bg-base-300 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostSkeleton;
