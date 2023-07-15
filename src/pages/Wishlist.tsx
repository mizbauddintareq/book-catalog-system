/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useGetSingleUserQuery } from "../redux/api/apiSlice";
import { useAppSelector } from "../redux/hooks";
import { FaBook } from "react-icons/fa";

export default function Wishlist() {
  const { user } = useAppSelector((state) => state.user);

  const { data } = useGetSingleUserQuery(user.id);

  return (
    <section className="container mx-auto mt-12">
      <p className="text-center text-xl font-semibold underline text-cyan-600 underline-offset-8 uppercase">
        Here are your book from wishlist
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {data?.data?.wishlist.map((book: string, idx: number) => (
          <div
            key={idx}
            className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200"
          >
            <div className="p-6 flex items-center gap-4 justify-center">
              <FaBook />
              <p>{book}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
