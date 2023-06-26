import React from "react";
import { useState } from "react";
const CreateReport = () => {
  const [openCreateReport, setOpenCreateReport] = useState(false);
  const [duration, setDuration] = useState({ start: "", end: "" });
  const handleOnSubmit = () => {
    console.log(duration);
  };
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const maxDate = today.toISOString().split("T")[0];
  const minDate = oneYearAgo.toISOString().split("T")[0];
  return (
    <div>
      <div>
        <label>From:</label>
        <input
          min={minDate}
          max={maxDate}
          type="date"
          value={duration.start}
          onChange={(e) => setDuration({ ...duration, start: e.target.value })}
        />
        <label>until:</label>
        <input
          min={minDate}
          max={maxDate}
          type="date"
          value={duration.end}
          onChange={(e) => setDuration({ ...duration, end: e.target.value })}
        />
        <button
          onClick={handleOnSubmit}
          disabled={duration.start && duration.end ? false : true}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default CreateReport;
