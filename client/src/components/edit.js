import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    binomial: "",
    edible: "",
    poisonous: "",
    availability: "",
    img: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5001/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedMushroom = {
      name: form.name,
      binomial: form.binomial,
      edible: form.edible,
      poisonous: form.poisonous,
      availability: form.availability,
      // img: form.img,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5001/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedMushroom),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  const styles = {
    backgroundImage: `url(/trees.jpg)`,
    backgroundPosition: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100%",
    filter: "blur(5px)",
  };

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="container mt-5 w-1/2 mx-auto border p-4 rounded-md shadow-lg">
      <h3>Edit Mushroom</h3>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="flex flex-col gap-2 mt-3">
          <label
            htmlFor="name"
            className="input input-bordered flex items-center gap-2"
          >
            Common Name
            <input
              type="text"
              className="grow"
              id="name"
              value={form.name}
              required
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </label>
          <label
            htmlFor="binomial"
            className="input input-bordered flex items-center gap-2"
          >
            Binomial
            <input
              type="text"
              className="grow"
              id="binomial"
              value={form.binomial}
              required
              onChange={(e) => updateForm({ binomial: e.target.value })}
            />
          </label>
          <label
            htmlFor="edible"
            className="input input-bordered flex items-center gap-2"
          >
            Edible
            <input
              type="text"
              className="grow"
              id="edible"
              value={form.edible}
              required
              onChange={(e) => updateForm({ edible: e.target.value })}
            />
          </label>
          <label
            htmlFor="poisonous"
            className="input input-bordered flex items-center gap-2"
          >
            Poisonous
            <input
              type="text"
              className="grow"
              id="poisonous"
              value={form.poisonous}
              required
              onChange={(e) => updateForm({ poisonous: e.target.value })}
            />
          </label>
          <label
            htmlFor="availability"
            className="input input-bordered flex items-center gap-2"
          >
            Availability
            <input
              type="text"
              className="grow"
              id="availability"
              value={form.availability}
              required
              onChange={(e) => updateForm({ availability: e.target.value })}
            />
          </label>
          {/* <label
            htmlFor="img"
            className="input input-bordered flex items-center gap-2"
          >
            Image
            <input
              type="file"
              className="grow"
              id="img"
              name="mushroom_img"
              required
              onChange={(e) => {
                // get the file name
                const imgName = e.target.files[0].name;
                updateForm({ img: imgName });
              }}
            />
          </label> */}
          <input
            type="submit"
            value="Save changes"
            className="btn btn-primary max-w-xs"
          />
        </div>
      </form>
    </div>
  );
}
