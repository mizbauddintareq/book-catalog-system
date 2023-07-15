/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import TableRow from "../components/TableRow";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/IBook";
import { useState, useEffect } from "react";

export default function AllBooks() {
  const { data, isLoading } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(isLoading);

  let [filteredData, setFilteredData] = useState<IBook[] | undefined>(
    data?.data
  );

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    setFilteredData(data?.data);
  }, [data?.data]);

  const handleSearch = (e: {
    preventDefault: () => void;
    currentTarget: any;
  }) => {
    e.preventDefault();

    const search = e.currentTarget.value;
    console.log({ search });
    setSearch(search);
  };

  const handleYear = (e: {
    preventDefault: () => void;
    currentTarget: any;
  }) => {
    e.preventDefault();

    const year = e.currentTarget.value;
    console.log({ year });
    setYear(year);
  };

  const handleGenre = (e: {
    preventDefault: () => void;
    currentTarget: any;
  }) => {
    e.preventDefault();

    const genre = e.currentTarget.value;
    console.log({ genre });
    setGenre(genre);
  };

  const genres = data?.data.map((indivBook: IBook) => indivBook.genre);

  if (search.length && year.length && genre.length) {
    filteredData = data?.data.filter(
      (indivBook: IBook) =>
        (indivBook.title.toLowerCase().includes(search.toLowerCase()) ||
          indivBook.author.toLowerCase().includes(search.toLowerCase()) ||
          indivBook.genre.toLowerCase().includes(search.toLowerCase())) &&
        parseInt(indivBook.publicationDate.slice(-4)) < parseInt(year) &&
        (genre !== "All"
          ? indivBook.genre.includes(genre)
          : genres.includes(indivBook.genre))
    );
  } else if (search.length && year.length) {
    filteredData = data?.data.filter(
      (indivBook: IBook) =>
        (indivBook.title.toLowerCase().includes(search.toLowerCase()) ||
          indivBook.author.toLowerCase().includes(search.toLowerCase()) ||
          indivBook.genre.toLowerCase().includes(search.toLowerCase())) &&
        parseInt(indivBook.publicationDate.slice(-4)) < parseInt(year)
    );
  } else if (search.length && genre.length) {
    filteredData = data?.data.filter(
      (indivBook: IBook) =>
        (indivBook.title.toLowerCase().includes(search.toLowerCase()) ||
          indivBook.author.toLowerCase().includes(search.toLowerCase()) ||
          indivBook.genre.toLowerCase().includes(search.toLowerCase())) &&
        (genre !== "All"
          ? indivBook.genre.includes(genre)
          : genres.includes(indivBook.genre))
    );
  } else if (year.length && genre.length) {
    filteredData = data?.data.filter(
      (indivBook: IBook) =>
        parseInt(indivBook.publicationDate.slice(-4)) < parseInt(year) &&
        (genre !== "All"
          ? indivBook.genre.includes(genre)
          : genres.includes(indivBook.genre))
    );
  } else if (search.length) {
    filteredData = data?.data.filter(
      (indivBook: IBook) =>
        indivBook.title.toLowerCase().includes(search.toLowerCase()) ||
        indivBook.author.toLowerCase().includes(search.toLowerCase()) ||
        indivBook.genre.toLowerCase().includes(search.toLowerCase())
    );
  } else if (year.length) {
    filteredData = data?.data.filter(
      (indivBook: IBook) =>
        parseInt(indivBook.publicationDate.slice(-4)) < parseInt(year)
    );
  } else if (genre.length) {
    if (genre === "All") {
      filteredData = data?.data;
    } else {
      filteredData = data?.data.filter(
        (indivBook: IBook) => indivBook.genre === genre
      );
    }
  }

  console.log({ filteredData });

  // setFilteredData(filteredData);

  return (
    <div className="w-8/12 mx-auto mt-12">
      <p className="text-center text-xl font-semibold underline text-cyan-600 underline-offset-8 uppercase">
        List of all books
      </p>

      <div className="mt-8">
        <form className="w-9/12 mx-auto grid 2xl:grid-cols-3 lg:grid-cols-2 gap-8">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                name="search"
                onChange={handleSearch}
                placeholder="name, author or genre"
                className="input input-bordered focus:outline-none"
              />
              <button type="submit" className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="form-control">
            <label className="input-group">
              <span>Publication Year upto</span>
              <select
                onChange={handleYear}
                name="year"
                className="select select-bordered focus:outline-none"
              >
                <option defaultValue={2023}>2023</option>
                <option value={1950}>1950</option>
                <option value={1900}>1900</option>
                <option value={1850}>1850</option>
                <option value={1800}>1800</option>
              </select>
            </label>
          </div>

          <div className="form-control">
            <label className="input-group">
              <span>Genre</span>
              <select
                onChange={handleGenre}
                name="year"
                className="select select-bordered focus:outline-none"
              >
                <option defaultValue="All">All</option>
                <option value="Fiction">Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Dystopian">Dystopian</option>
              </select>
            </label>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publication Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((book: IBook, idx: number) => (
              <TableRow key={book._id} idx={idx} book={book}></TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
