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

  /**
   * This useEffect will fetch the record being edited by id.
   */
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
  }, [params.id, navigate]);

  /**
   * This method will update the state properties.
   * @param {object} value - The value to update the state with.
   * @returns {object} - The updated state.
   */
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  /**
   * This method will handle the form submission.
   * @param {object} e - The event object.
   */
  async function onSubmit(e) {
    e.preventDefault();
    const editedMushroom = {
      name: form.name,
      binomial: form.binomial,
      edible: form.edible,
      poisonous: form.poisonous,
      availability: form.availability,
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

  // This following section will display the form that takes input from the user to update the data.
  // NOTE: Cannot edit the image in this form.
  return (
    <div className="container md:mt-5 lg:w-1/2 md:border p-4 md:rounded-md shadow-lg bg-green-600">
      <h3 className="text-xl">Edit Mushroom</h3>
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
