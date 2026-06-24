"use client";

import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

export function DeleteModal({lesson}) {

    const router=useRouter()

    const {_id}=lesson||{}

    const handleDelete = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/addLesson/${_id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    console.log(data,'xxxxxxx');

         if (res.ok) {
      toast('Delete Room')
        router.push('/dashboard/user/home')
      }

    
  } catch (error) {
    console.log(error);
  }
};
  return (
    <AlertDialog>
      <Button variant="danger"><FaTrash /></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}