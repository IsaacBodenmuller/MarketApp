export default function SidebarSection(props) {
  return (
    <div className="flex">
      <span className="text-xs text-gray-300">{props.children}</span>
    </div>
  );
}
