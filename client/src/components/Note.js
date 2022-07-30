import React from "react";

const Note = ({ note, btnToggleHandler }) => {
  // console.log(note);
  return (
    <div>
      <li>
        {note.content} ({note.important.toString()}){" "}
        <button onClick={() => btnToggleHandler(note.id)}>
          change important
        </button>
      </li>
    </div>
  );
};

export default Note;
