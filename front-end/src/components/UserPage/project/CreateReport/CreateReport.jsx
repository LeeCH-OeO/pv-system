import React from "react";
import { useState } from "react";
const CreateReport = () => {
  const [openCreateReport, setOpenCreateReport] = useState(false);
  const [duration, setDuration] = useState({ start: "", end: "" });
  const handleOnSubmit = () => {
    console.log(duration);
  };
  return (
    <div>
      {openCreateReport ? (
        <div>
          <label>From:</label>
          <input
            type="date"
            value={duration.start}
            onChange={(e) =>
              setDuration({ ...duration, start: e.target.value })
            }
          />
          <label>until:</label>
          <input
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
      ) : (
        <button onClick={() => setOpenCreateReport(true)}>create report</button>
      )}
    </div>
  );
};

export default CreateReport;
