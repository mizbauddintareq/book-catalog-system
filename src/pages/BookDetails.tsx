/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useAddToWishlistMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
  useGetSingleUserQuery,
} from "../redux/api/apiSlice";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import cardIMG from "../assets/pexels-oziel-2846814.jpg";
import Loader from "../components/Loader";
import { useAppSelector } from "../redux/hooks";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  const [addComment] = useAddCommentMutation();
  const [deleteBook] = useDeleteBookMutation();
  const { user } = useAppSelector((state) => state.user);

  const { data: webUser } = useGetSingleUserQuery(user.id);
  const [addToWishlist] = useAddToWishlistMutation();

  const navigate = useNavigate();

  //   console.log(isLoading);

  if (isLoading) {
    return <Loader />;
  }

  const handleComment = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    console.log({ comment });

    const option = {
      id,
      data: {
        comment,
      },
    };
    await addComment(option);
    toast.success("Review Added Successfully");
    form.reset();
  };

  const handleGoToEdit = () => {
    navigate(`/editbook/${data.data._id}`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Do you want to delete it ?");
    if (confirm) {
      await deleteBook(id);
      toast.success("Deleted Successfully");
      navigate("/allbooks");
    }
  };

  const handleWishlist = async () => {
    const book = data?.data?.title;

    const option = {
      id: user.id,
      data: {
        book,
      },
    };

    await addToWishlist(option);
    toast.success("Added to Wishlist Successfully");
  };

  return (
    <div className="w-9/12 mx-auto my-12">
      <p className="text-center text-xl font-semibold underline text-cyan-600 underline-offset-8 uppercase">
        Details of {data?.data?.title}
      </p>
      <div className="card lg:card-side bg-base-100 shadow-xl mt-8">
        <figure>
          <img src={cardIMG} alt="Album" className="lg:w-64" />
        </figure>
        <div className="card-body">
          <h2 className="card-title"> {data?.data?.title} </h2>
          <p className="flex-grow-0">
            Author : <span className="text-cyan-500">{data?.data?.author}</span>
          </p>
          <p className="flex-grow-0">
            Genre : <span className="text-cyan-500">{data?.data?.genre}</span>
          </p>
          <p className="flex-grow-0">
            Publication Date :{" "}
            <span className="text-cyan-500">{data?.data?.publicationDate}</span>
          </p>
          <div className="card-action mt-4 flex gap-4">
            <button
              onClick={handleWishlist}
              className={`${
                webUser?.data?.wishlist.includes(data?.data?.title) &&
                `btn-disabled`
              } btn bg-cyan-500 text-white hover:bg-cyan-600`}
            >
              Wishlist
            </button>
            <button className="btn bg-transparent border-cyan-500 text-cyan-500">
              Plan To Read
            </button>
          </div>

          <div>
            {data?.data?.uploader === user.email && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleGoToEdit}
                  className="btn bg-cyan-500 px-10 text-white hover:bg-cyan-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="btn bg-transparent px-8 border-red-500 text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleComment} className="mt-8">
        <div className="form-control">
          <label className="input-group input-group-lg">
            <input
              type="text"
              name="comment"
              placeholder="Type your Review"
              className="input input-bordered w-full focus:outline-none focus:border-cyan-500"
            />
            <span>
              <button type="submit">Submit</button>
            </span>
          </label>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-lg text-cyan-500">Reviews</p>
        {data?.data?.comments.map((comment: string, idx: number) => (
          <div key={idx} className="flex items-center gap-4 mt-4">
            <FaUserAlt />
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
