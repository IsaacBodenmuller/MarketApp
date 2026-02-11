export default function TextInput(props) {
  return (
    <div className="">
      <input
        type="text"
        className="border rounded-md w-fit h-8 text-gray-300"
        placeholder={props.children}
      />
    </div>
  );
}
