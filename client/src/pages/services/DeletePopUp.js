import { useDispatch } from "react-redux";
import { deleteCallAction } from "../../redux/service/CallAction";
import { deleteMessageAction } from "../../redux/service/personalAction";

const DeletePopUp = (props) => {
  const { setDeleteToggle, deleteType, deleteId } = props;
  const dispatch = useDispatch();
  const handleDelete = () => {
    switch(deleteType){
        case "onetoone":
            dispatch(deleteCallAction({ serviceId: deleteId }))
          break;
        case "message":
            dispatch(deleteMessageAction({ serviceId: deleteId }))
          break;
        default:
          break;
    }
    setDeleteToggle(false)
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[30rem]  bg-white rounded-lg p-5">
          <div className="space-y-3">
            <div className="text-3xl font-bold">Delete Service</div>
            <div className="">Are you sure to delete the service ?</div>
            <div className="flex gap-2 justify-end w-full">
              <button onClick={()=>setDeleteToggle(false)} className="w-[10rem] border-2 p-2 rounded-lg">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="w-[10rem] bg-black p-2 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeletePopUp;
