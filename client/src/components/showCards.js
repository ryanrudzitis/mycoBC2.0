import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal.js";

// const Record = (props) => (
//   <>
//     <Modal />
//     <tr>
//       <td>{props.record.nam}</td>
//       <td>{props.record.binomial}</td>
//       <td>{props.record.edible}</td>
//       <td>
//         <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
//         <button className="btn btn-link"
//           onClick={() => {
//             props.deleteRecord(props.record._id);
//           }}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   </>
// );

export default function ShowCards() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      console.log(records);
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5001/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function showCards() {
    return records.map((record) => {
      return (
        <Modal
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.

  const styles = {
    backgroundImage: `url(/trees.jpg)`,
    backgroundPosition: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: "100%",
    filter: "blur(5px)"
  };

  return (
    <>
      <div className="relative">
        <div style={styles} className="absolute top-0 right-0 bottom-0 left-0">
        </div>
        <div className="shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center border gap-3 px-[2%] py-4 bg-img">
          {showCards()}
        </div>
      </div>
    </>
  );
}