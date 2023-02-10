export const TakeSnapshotIcon = (props) => {
  return (
    <svg width="18" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.126.834A.75.75 0 016.75.5h4.5a.75.75 0 01.624.334l1.277 1.916h2.599A2.25 2.25 0 0118 5v8.25a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 13.25V5a2.25 2.25 0 012.25-2.25h2.599L6.126.834zM7.151 2L5.874 3.916a.75.75 0 01-.624.334h-3A.75.75 0 001.5 5v8.25a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V5a.75.75 0 00-.75-.75h-3a.75.75 0 01-.624-.334L10.849 2H7.15z"
        fill={props.color? props.color:'#fff'}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 6.5A2.25 2.25 0 109 11a2.25 2.25 0 000-4.5zM5.25 8.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z"
        fill={props.color? props.color:'#fff'}
      ></path>
    </svg>
  );
};
