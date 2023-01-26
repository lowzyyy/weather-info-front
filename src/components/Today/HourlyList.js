import HourlyItem from "./HourlyItem";

const HourlyList = (props) => {
  return (
    <div className=" flex h-24 gap-3 overflow-x-scroll py-2">
      {props.hourlyData.map((hourEl, index) => {
        return (
          <HourlyItem
            key={index}
            category={props.category}
            sunTimes={props.sunTimes}
            hourInfo={hourEl}
          ></HourlyItem>
        );
      })}
    </div>
  );
};

export default HourlyList;
