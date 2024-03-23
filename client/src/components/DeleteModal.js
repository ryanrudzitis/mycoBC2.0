export const DeleteModal = (props) => {
  return (
    <dialog
      id={"modal-" + props.id}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">Delete Confirmation</h3>
        <p className="py-4">
          Are you sure you want to delete {props.name}?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-error mr-2"
              onClick={() =>
                props.deleteRecord(props.id, props.img)
              }
            >
              Delete
            </button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
