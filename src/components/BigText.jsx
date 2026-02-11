export default function BigText(props) {
  return (
    <div className="flex justify-center self-center text-center">
      <span className="text-2xl font-bold">{props.children}</span>
    </div>
  );
}
