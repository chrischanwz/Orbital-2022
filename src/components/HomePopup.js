import "./HomePopup.css";

export default function HomePopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="inner-popup">
        <button className="closebtn" onClick={() => props.setTrigger(false)}>
          {" "}
          close{" "}
        </button>
      </div>

      {props.children}
    </div>
  ) : (
    ""
  );
}
