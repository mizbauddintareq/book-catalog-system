/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hooks";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function EditeBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const { user } = useAppSelector((state) => state.user);

  if (data?.data?.uploader !== user.email) {
    return (
      <p className="text-red-500 text-center mt-20 text-lg">
        You are not Valid user
      </p>
    );
  }

  const [editBook] = useEditBookMutation();

  const date: Date = new Date(data?.data?.publicationDate);
  const defaultDate = date.toLocaleDateString("en-CA");

  const handleEdit = async (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const publishDate = form.publishDate.value;

    const dateObject = new Date(publishDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateObject
    );

    // console.log({ title, author, genre, formattedDate });

    const option = {
      id,
      data: {
        title,
        author,
        genre,
        publicationDate: formattedDate,
      },
    };

    await editBook(option);

    toast.success("Success fully update a book");
    navigate("/AllBooks");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-4/12 p-8 rounded-lg bg-white shadow-md">
        <form onSubmit={handleEdit} className="space-y-6">
          <h1 className="text-center text-2xl font-bold text-slate-950">
            Edit the {data?.data?.title}
          </h1>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={data?.data?.title}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              defaultValue={data?.data?.author}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Genre</label>
            <input
              type="text"
              name="genre"
              defaultValue={data?.data?.genre}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              defaultValue={data?.data?.date}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="btn hover:bg-slate-950 bg-slate-950 text-white w-full"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
