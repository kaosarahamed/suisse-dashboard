import PropTypes from "prop-types";

function JobQuestions({ data }) {
  let jobDes;
  if (data) {
    jobDes = JSON.parse(data?.jobQuestions);
  }
  return (
    <ul className=" question-list">
      {data &&
        Object.entries(jobDes).map(([key, value], index) => {
          let displayValue;

          // Check the type of value to handle arrays and objects
          if (Array.isArray(value)) {
            displayValue = value.join(", "); // Join array values with a comma
          } else if (typeof value === "object" && value !== null) {
            displayValue = Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey}>{`${subKey}: ${subValue}`}</div>
            ));
          } else {
            displayValue = value; // Handle string or number
          }

          return (
            <li key={index}>
              <h3 className="text-black text-base font-medium capitalize">
                {key.replace(/_/g, " ")}
              </h3>
              <p className="text-black text-base font-normal capitalize">
                {displayValue}
              </p>
            </li>
          );
        })}
    </ul>
  );
}
JobQuestions.propTypes = {
  data: PropTypes.object,
};
export default JobQuestions;
