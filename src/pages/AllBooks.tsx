/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import TableRow from "../components/TableRow";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/IBook";

export default function AllBooks() {
  const { data, isLoading } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [filteredData, setFilteredData] = useState<IBook[]>([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    setFilteredData(data?.data || []);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  const handleGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  useEffect(() => {
    const filteredBooks = data?.data.filter((individualBook: IBook) => {
      const titleMatch = individualBook.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const authorMatch = individualBook.author
        .toLowerCase()
        .includes(search.toLowerCase());
      const genreMatch =
        genre === "All" || individualBook.genre.includes(genre);
      const publicationYearMatch =
        year === "" ||
        parseInt(individualBook.publicationDate.slice(-4)) === parseInt(year);
      return (titleMatch || authorMatch) && genreMatch && publicationYearMatch;
    });
    setFilteredData(filteredBooks || []);
  }, [data, search, year, genre]);

  return (
    <div className="container mx-auto px-4 mt-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        List of All Books
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex-1 sm:max-w-md">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or author"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="year" className="sr-only">
              Publication Year
            </label>
            <select
              name="year"
              id="year"
              value={year}
              onChange={handleYear}
              className="block w-full sm:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Any Publication Year</option>
              <option value={2019}>2019</option>
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="genre" className="sr-only">
              Genre
            </label>
            <select
              name="genre"
              id="genre"
              value={genre}
              onChange={handleGenre}
              className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Genres</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
              <option value="Poem">Poem</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="text-center">No books found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Author
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Genre
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Publication Date
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((book: IBook, idx: number) => (
                  <TableRow key={book._id} idx={idx} book={book} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
