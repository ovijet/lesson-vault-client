"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Modal, Surface,Button } from "@heroui/react";

const EditModal = ({ lesson }) => {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(lesson.image);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= Upload Image =================

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be below 5MB");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();


     

      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image Uploaded");
      }
    } catch (err) {
      console.log(err);
      toast.error("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  // ================= Update Lesson =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.target);

    const lessonData = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      emotionalTone: form.get("emotionalTone"),
      visibility: form.get("visibility"),
      accessLevel: form.get("accessLevel"),
      image: imageUrl,
    };


    console.log(lessonData,'ffffffff');

    try {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${lesson._id}`;
  console.log("Fetching URL:", url);         // URL দেখো
  console.log("Payload:", lessonData);       // Data দেখো

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lessonData),
  });

  console.log("Response status:", res.status);

  const data = await res.json();
  console.log("Response data:", data);

  if (data.modifiedCount > 0) {
    toast.success("Lesson Updated Successfully");
    router.refresh();
  } else {
    toast.info("Nothing Changed");
  }
} catch (err) {
  console.error("Caught error:", err.message); // exact error message
  toast.error("Update Failed");
}finally {
      setLoading(false);
    }
  };

  return (
     <Modal>
     
          <Button variant="outline">Edit</Button>
        

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-3xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Edit Room</Modal.Heading>

                <p className="mt-1 text-sm text-muted">
                  Update your room information
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}

                <div>
                  <label className="font-semibold">Title</label>

                  <input
                    name="title"
                    defaultValue={lesson.title}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>

                {/* Description */}

                <div>
                  <label className="font-semibold">Description</label>

                  <textarea
                    rows={6}
                    name="description"
                    defaultValue={lesson.description}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>

                {/* Image */}

                <div>
                  <label className="font-semibold">Lesson Image</label>

                  <label className="w-28 h-28 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "+"
                    )}
                  </label>
                </div>

                {/* Category */}

                <select
                  name="category"
                  defaultValue={lesson.category}
                  className="w-full border rounded-xl p-3"
                >
                  <option>Personal Growth</option>
                  <option>Career</option>
                  <option>Relationships</option>
                  <option>Mindset</option>
                  <option>Mistakes Learned</option>
                </select>

                {/* Emotional */}

                <select
                  name="emotionalTone"
                  defaultValue={lesson.emotionalTone}
                  className="w-full border rounded-xl p-3"
                >
                  <option>Motivational</option>
                  <option>Sad</option>
                  <option>Realization</option>
                  <option>Gratitude</option>
                </select>

                {/* Visibility */}

                <select
                  name="visibility"
                  defaultValue={lesson.visibility}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>

                {/* Access */}

                <select
                  name="accessLevel"
                  defaultValue={lesson.accessLevel}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>

                <button
                  disabled={loading || uploading}
                  className="w-full bg-green-600 text-white py-3 rounded-xl"
                >
                  {loading ? "Updating..." : "Update Lesson"}
                </button>
              </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
  );
};

export default EditModal;