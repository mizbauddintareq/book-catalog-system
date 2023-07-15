/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import { useAppSelector } from "../redux/hooks";
import { useEditBookMutation, useGetSingleBookQuery } from "../redux/features/book/bookApi";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function EditeBook() {
  const { id } = useParams();

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

    toast.success("Updated Successfully");
  };

  return (
    <div className="container mx-auto mt-12">
      <p className="text-center text-xl font-semibold underline text-cyan-600 underline-offset-8 uppercase">
        Edit Your Book Information
      </p>
      <div className="mt-8 py-8 bg-slate-200 rounded-lg">
        <form onSubmit={handleEdit}>
          <div className="grid lg:grid-cols-2 gap-8 w-9/12 mx-auto">
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              defaultValue={data?.data?.title}
              className="input input-bordered w-full focus:outline-none focus:border-cyan-500"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Enter Author"
              defaultValue={data?.data?.author}
              className="input input-bordered w-full focus:outline-none focus:border-cyan-500"
              required
            />
            <input
              type="text"
              name="genre"
              placeholder="Enter Genre"
              defaultValue={data?.data?.genre}
              className="input input-bordered w-full focus:outline-none focus:border-cyan-500"
              required
            />

            <div className="form-control">
              <label className="input-group">
                <span className="bg-neutral text-white">Publish Date</span>
                <input
                  type="date"
                  name="publishDate"
                  defaultValue={defaultDate}
                  className="input input-bordered w-full focus:outline-none focus:border-cyan-500"
                  required
                />
              </label>
            </div>
          </div>
          <div className="w-9/12 mx-auto mt-8">
            <button
              type="submit"
              className="btn btn-block btn-neutral text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
