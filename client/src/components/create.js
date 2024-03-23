import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    binomial: "",
    edible: "",
    poisonous: "",
    availability: "",
    img: "",
  });
  const navigate = useNavigate();

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
    const newMushroom = { ...form };
    const img = e.target.img.files[0];
    console.log("newMushroom: ", newMushroom);
    console.log("img: ", img);

    // add new record to the database
    await fetch("http://localhost:5001/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMushroom),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    // upload image to public folder
    await fetch("http://localhost:5001/uploadImage", {
      method: "POST",
      body: new FormData(e.target),
    })
      .catch((error) => {
        window.alert(error);
        return;
      })
      .then((response) => {
        console.log("response: ", response);
      });

    setForm({
      name: "",
      binomial: "",
      edible: "",
      poisonous: "",
      availability: "",
      img: "",
    });
    navigate("/");
  }

  return (
    <div className="container md:mt-5 lg:w-1/2 md:border p-4 md:rounded-md shadow-lg bg-green-600">
      <h3 className="text-xl">Add New Mushroom</h3>
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
          <label
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
          </label>
          <input
            type="submit"
            value="Add mushroom"
            className="btn btn-primary max-w-xs"
          />
        </div>
      </form>
    </div>
  );
}
