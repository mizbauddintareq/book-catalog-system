/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash, FaUserAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import {
  useAddCommentMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import {
  useAddToReadListMutation,
  useAddToWishlistMutation,
  useGetSingleUserQuery,
} from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";
import { IReadList } from "../types/IReadList";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  const [addComment] = useAddCommentMutation();
  const [deleteBook] = useDeleteBookMutation();
  const { user } = useAppSelector((state) => state.user);

  const { data: webUser } = useGetSingleUserQuery(user.id);
  const [addToWishlist] = useAddToWishlistMutation();
  const [addToReadList] = useAddToReadListMutation();

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

  const handleRead = async () => {
    const book = data?.data?.title;
    const isComplete = false;

    const option = {
      id: user.id,
      data: {
        book,
        isComplete,
      },
    };

    await addToReadList(option);
    console.log(webUser?.data?.readList);

    toast.success("Added to Reading List");
  };

  return (
    <div className="w-5/12 mx-auto my-12">
      <p className="text-center text-2xl font-bold text-slate-950 ">
        Details of {data?.data?.title}
      </p>
      <div className="card lg:card-side bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <h2 className="card-title"> {data?.data?.title} </h2>
          <p className="flex-grow-0">
            Author :{" "}
            <span className="text-slate-950">{data?.data?.author}</span>
          </p>
          <p className="flex-grow-0">
            Genre : <span className="text-slate-950">{data?.data?.genre}</span>
          </p>
          <p className="flex-grow-0">
            Publication Date :{" "}
            <span className="text-slate-950">
              {data?.data?.publicationDate}
            </span>
          </p>
          <div className="card-action mt-4 flex gap-4">
            <button
              onClick={handleWishlist}
              className={`${
                webUser?.data?.wishlist.includes(data?.data?.title) &&
                `btn-disabled`
              } btn btn-xs text-white bg-slate-950`}
            >
              Wishlist
            </button>
            <button
              onClick={handleRead}
              className={`${
                webUser?.data?.readList.find(
                  (book: IReadList) => book?.book === data?.data?.title
                ) && `btn-disabled`
              } btn btn-xs text-white bg-slate-950 `}
            >
              Plan To Read
            </button>
          </div>

          <div>
            {data?.data?.uploader === user.email && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleGoToEdit}
                  className="btn btn-sm bg-slate-950 text-white"
                >
                  Edit <FaEdit />
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-sm bg-slate-950 text-white"
                >
                  Delete <FaTrash />
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
              placeholder="Leave a comment"
              className="input input-bordered w-full"
            />
            <span>
              <button type="submit" className="btn">
                Add comment
              </button>
            </span>
          </label>
        </div>
      </form>

      <div className="mt-8">
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
