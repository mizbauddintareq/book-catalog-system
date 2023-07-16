/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { toast } from "react-hot-toast";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hooks";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function AddNewBook() {
  const { user } = useAppSelector((state) => state.user);

  const [addBook, { isLoading }] = useAddBookMutation();

  console.log({ isLoading });

  const handleAddBook = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
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

    console.log({ title, author, genre, formattedDate, user });

    const option = {
      title,
      author,
      genre,
      publicationDate: formattedDate,
      uploader: user.email,
    };

    try {
      const response = await addBook(option);

      if ("error" in response) {
        return toast.error("Failed to Add Book");
      }

      form.reset();
      toast.success("Book Added Successfully");
    } catch (error) {
      toast.error("Failed to Add Book");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-4/12 p-8 rounded-lg bg-white shadow-md">
        <form onSubmit={handleAddBook} className="space-y-6">
          <h1 className="text-center text-2xl font-bold text-slate-950">
            Please Add A New Book
          </h1>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
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
              placeholder="Enter Author"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Genre</label>
            <input
              type="text"
              name="genre"
              placeholder="Enter Genre"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="btn hover:bg-slate-950 bg-slate-950 text-white w-full"
            >
              Add The Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
