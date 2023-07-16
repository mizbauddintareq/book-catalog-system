/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Loader from "../components/Loader";
import ReadCard from "../components/ReadCard";
import { useGetSingleUserQuery } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";
import { IReadList } from "../types/IReadList";

export default function ReadingList() {
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetSingleUserQuery(user.id);

  if (isLoading) {
    return <Loader />;
  }

  if (data?.data?.readList.length < 1) {
    return <p className="text-center text-lg mt-12">No book found</p>;
  }

  return (
    <section className="container mx-auto my-12">
      <p className="text-center text-2xl text-slate-950 font-bold">
        Welcome to my reading list
      </p>

      <div className="grid lg:grid-cols-4 gap-8 mt-8">
        {data?.data?.readList.map((list: IReadList, idx: number) => (
          <ReadCard key={idx} list={list}></ReadCard>
        ))}
      </div>
    </section>
  );
}
