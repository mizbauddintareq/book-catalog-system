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
      <td> {idx + 1} </td>
      <td> {title} </td>
      <td> {author} </td>
      <td> {genre} </td>
      <td> {publicationDate} </td>
      <td>
        <button
          onClick={handleNavigate}
          className="btn btn-neutral text-white btn-xs bg-slate-950"
        >
          Details
        </button>
      </td>
    </tr>
  );
}
