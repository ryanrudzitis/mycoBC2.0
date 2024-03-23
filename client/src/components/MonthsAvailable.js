export const MonthsAvailable = (props) => {
  const months  = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /**
   * Convert array of months to array of numbers
   * @param {string} input - Comma separated list of months
   * @returns {number[]} - Array of numbers representing the months that were passed in
   * @example convertArray("January, February, March") // [1, 2, 3]
   * 
   */
  function convertArray(input) {
    let inputArray = input.split(", ");
    let output = [];

    for (let i = 0; i < inputArray.length; i++) {
      output[i] = months.indexOf(inputArray[i]) + 1;
    }
    return output;
  }

  return (
    <div className="w-full">
      <div className="flex">
        {months.map((month, index) =>
          <div key={index} className={`${convertArray(props.months).includes(index + 1) ? "bg-green-500/75" : "bg-red-600/75"} roboto-mono grid grid-rows-1 w-1/12 min-h-[30px] justify-items-center items-center`}>
              <span>{month.substring(0, 1)}</span>
          </div>
        )}
      </div>
    </div>
  );
};