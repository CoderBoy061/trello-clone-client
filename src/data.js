export const statusData = [
  {
    title: "To Do",
    value: 0,
  },
  {
    title: "In Progress",
    value: 1,
  },
  {
    title: "Done",
    value: 2,
  },
];

export const formatISODate = (isoDateString) => {
  const date = new Date(isoDateString);

  // Format the date
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long", 
    day: "numeric",
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};
