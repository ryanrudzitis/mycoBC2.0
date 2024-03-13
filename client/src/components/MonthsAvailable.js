export const MonthsAvailable = (props) => {

  const months = [
    "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"
  ];

  return (
    <div className="w-full">
      <div className="flex">
        {months.map((month, index) =>
          <div key={index} className={`${props.months.includes(index + 1) ? "bg-green-500/75" : "bg-red-600/75"} roboto-mono grid grid-rows-1 w-1/12 min-h-[30px] justify-items-center items-center`}>
              <span>{month}</span>
          </div>
        )}
      </div>
    </div>
  );
};