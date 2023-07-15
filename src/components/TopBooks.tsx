/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useGetLatestBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/IBook";

export default function TopBooks() {
  const { data } = useGetLatestBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="container mx-auto my-12">
      <p className="text-center text-xl font-semibold underline text-cyan-600 underline-offset-8 uppercase">
        Here are the latest top books
      </p>

      <div className="grid lg:grid-cols-3 gap-6 mt-12 text-center">
        {data?.data.map((book: IBook) => (
          <p key={book._id} className="text-lg font-semibold">
            {book.title}
          </p>
        ))}
      </div>
    </div>
  );
}
