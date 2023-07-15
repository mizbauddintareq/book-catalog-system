/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useGetLatestBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/IBook";

export default function TopBooks() {
  const { data } = useGetLatestBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="container mx-auto my-12">
      <p className="text-center text-3xl font-bold text-slate-950 underline-offset-8 ">
        Best books of the world
      </p>

      <div className="grid lg:grid-cols-3 mt-10">
        {data?.data.map((book: IBook) => (
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 key={book._id} className="card-title">
                {book.title}
              </h2>
              <p>Author: {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
