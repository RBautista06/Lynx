import { useDispatch, useSelector } from "react-redux";
import ActiveUsers from "../component/ActiveUsers";
import Sidebar from "../component/Sidebar";
import { updateProfile, userAuth } from "../store/storeSlice/authSlice";
import { Loader2, PencilIcon } from "lucide-react";
import type { AppDispatch } from "../store/store";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector(userAuth);

  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string | null>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  //this is for disabling the button when their is no input modified
  const [originalData, setOriginalData] = useState({
    fullName: "",
    bio: "",
    profilePic: "",
  });

  useEffect(() => {
    if (user) {
      const initialFullName = user.fullName || "";
      const initialBio = user.bio || "";
      const initialProfilePic = user.profilePic || "/img/avatar.png";

      setFullName(initialFullName);
      setBio(initialBio);
      setProfilePic(initialProfilePic);

      // Save original state
      setOriginalData({
        fullName: initialFullName,
        bio: initialBio,
        profilePic: initialProfilePic,
      });
    }
  }, [user]);

  const isChanged =
    fullName !== originalData.fullName ||
    bio !== originalData.bio ||
    (selectedFile && selectedFile !== originalData.profilePic);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be under 10MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result as string;
      setSelectedFile(base64Image); // just local preview
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        updateProfile({
          fullName,
          bio,
          profilePic: selectedFile || user?.profilePic || "",
        })
      );

      if (updateProfile.fulfilled.match(resultAction)) {
        const updated = resultAction.payload;
        setFullName(updated.fullName);
        setBio(updated.bio);
        setProfilePic(updated.profilePic);
        setSelectedFile(null); // optional: reset local preview
      }
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center  h-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-full  h-full">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          <div className=" h-full w-7xl flex justify-center">
            <div className="w-4xl  py-10 px-5 ">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* for profile photo change */}
                <div className="flex justify-between items-center p-5 rounded-xl bg-base-300">
                  <div className="flex gap-10 justify-center">
                    <div className="size-20 rounded-full overflow-hidden object-cover">
                      <img
                        src={selectedFile || profilePic || "/img/avatar.png"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-semibold text-lg">
                        {user?.username}
                      </span>
                      <span className="opacity-80">{user?.fullName}</span>
                    </div>
                  </div>
                  <label
                    htmlFor="profilePic"
                    className="h-full cursor-pointer flex justify-center items-center gap-3 p-3 rounded-xl bg-primary/50 text-white hover:bg-primary transition">
                    <span>Change Photo</span>
                    <PencilIcon className="size-5" />
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-5 p-5 rounded-xl bg-base-300">
                  <div className="flex gap-5 items-center">
                    <label htmlFor="" className="w-40">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      minLength={10}
                      maxLength={50}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-5 items-start">
                    <label htmlFor="" className="w-40">
                      Bio:{" "}
                    </label>

                    <textarea
                      className="textarea h-24 w-full"
                      placeholder="Bio"
                      maxLength={50}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}></textarea>
                  </div>
                </div>
                <div className="flex gap-5">
                  <p className="p-2 rounded-lg text-sm opacity-50 w-full">
                    Certain profile info, like your name, and bio, is visible to
                    everyone.
                  </p>

                  <button
                    className="btn btn-primary w-50"
                    type="submit"
                    disabled={!isChanged || isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin size-5 mr-2" />
                        Saving Profile...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
