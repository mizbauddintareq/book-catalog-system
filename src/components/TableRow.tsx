/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useNavigate } from "react-router-dom";
import { ITable } from "../types/ITable";

export default function TableRow({ book, idx }: ITable) {
  const { title, author, genre, publicationDate, _id } = book;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/book/${_id}`);
  };

  return (
    <tr>
      <th> {idx + 1} </th>
      <td> {title} </td>
      <td> {author} </td>
      <td> {genre} </td>
      <td> {publicationDate} </td>
      <td>
        <button
          onClick={handleNavigate}
          className="btn btn-neutral text-white btn-xs"
        >
          Details
        </button>
      </td>
    </tr>
  );
}
