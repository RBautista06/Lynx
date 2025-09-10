import { Image, Send, X } from "lucide-react";





const MessageInput = () => {
  return (
    <div className="p-4 w-full bg-base-200">
      <div className="flex flex-col items-start gap-2">
        <div className="relative">
          <img
            src="/img/avatar.png"
            alt="Preview"
            className="w-25 h-25 object-cover rounded-lg border border-zinc-700"
          />
          <button
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
            type="button">
            <X className="size-3" />
          </button>
        </div>

        <form className="flex w-full items-center gap-2">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              className="w-full input input-bordered rounded-lg input-sm sm:input-md"
              placeholder="Type a message..."
            />
            <input type="file" accept="image/*" className="hidden" />

            <button
              type="button"
              className="hidden sm:flex btn btn-circle
                    text-emerald-500 ">
              <Image size={20} />
            </button>
          </div>
          <button type="submit" className="btn btn-circle">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
