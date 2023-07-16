/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Loader from "../components/Loader";
import { useGetSingleUserQuery } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";

export default function Wishlist() {
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetSingleUserQuery(user.id);

  if (isLoading) {
    return <Loader />;
  }

  if (data?.data?.wishlist.length < 1) {
    return <p className="text-center text-lg mt-12">No book found</p>;
  }

  return (
    <section className="container mx-auto my-12">
      <p className="text-center font-bold text-2xl text-slate-950">
        Welcome to wishlist
      </p>

      <div className="grid lg:grid-cols-4 gap-8 mt-8">
        {data?.data?.wishlist.map((book: string, idx: number) => (
          <div
            key={idx}
            className="overflow-hidden rounded shadow-lg text-slate-950"
          >
            <div className="p-6 flex items-center gap-4 justify-center">
              <p>
                Title: <span className="font-semibold">{book}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
