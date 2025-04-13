export default function FlatButton({
  Text,
  onClick,
}: {
  Text: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="ml-2 px-4 py-2 bg-blaze-orange-600 rounded-lg hover:bg-orange-600  active:bg-blaze-orange-800 disabled:bg-blaze-orange-200"
      onClick={onClick}
    >
      {Text}
    </button>
  );
}
