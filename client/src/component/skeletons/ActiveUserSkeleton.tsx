const ActiveUsersSkeleton = () => {
  return (
    <aside className="border-l border-gray-700 h-screen w-20 lg:w-85 flex flex-col p-5 gap-5 animate-pulse ">
      {/* Own profile skeleton */}
      <div className="py-2 ">
        <div className="flex gap-5 items-center bg-base-200 rounded-xl py-2 px-3 ">
          <div className="size-10 rounded-full bg-base-300" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded bg-base-300" />
            <div className="h-3 w-16 rounded bg-base-300" />
          </div>
        </div>
      </div>

      {/* Toggle + User list skeleton */}
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        <div className="flex justify-between items-center ">
          <div className="h-4 w-24 rounded bg-base-200 " />
          <div className="h-5 w-10 rounded bg-base-200" />
        </div>

        {/* Fake list */}
        <div
          className="flex-1 overflow-y-auto flex flex-col gap-2 mt-2"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="flex gap-4 items-center p-2 rounded bg-base-200">
              <div className="w-10 h-10 rounded-full bg-base-300" />
              <div className="flex flex-col gap-1">
                <div className="h-4 w-28 rounded bg-base-300" />
                <div className="h-3 w-20 rounded bg-base-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ActiveUsersSkeleton;
