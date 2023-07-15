/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FaBook } from "react-icons/fa";
import { IList } from "../types/IList";
import { useAppSelector } from "../redux/hooks";
import { toast } from "react-hot-toast";
import { useUpdateReadlistMutation } from "../redux/features/user/userApi";

export default function ReadCard({ list }: IList) {
  const [updateReadlist] = useUpdateReadlistMutation();

  const { user } = useAppSelector((state) => state.user);

  const handleComplete = async (e: {
    target: {
      checked: any;
      value: any;
    };
  }) => {
    console.log(e.target.checked);
    console.log(list._id);

    if (e.target.checked) {
      const option = {
        id: user.id,
        data: {
          id: list._id,
          isComplete: true,
        },
      };

      await updateReadlist(option);

      toast.success("Congratulation");
    }
  };
  return (
    <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
      <div className="p-6 flex flex-col  gap-4 justify-center">
        <div className="flex items-center gap-4">
          <FaBook />
          <p>{list.book}</p>
        </div>

        {list.isComplete && (
          <p> Reading Status: {list.isComplete && "Finished"} </p>
        )}

        {!list.isComplete && (
          <div className="flex items-center gap-4">
            <span>Reading Status:</span>

            <div>
              <input
                type="checkbox"
                id={list._id}
                name="status"
                onChange={handleComplete}
              />
              <label htmlFor={list._id}> Complete</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
