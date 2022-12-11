interface UnorderedListProps {
  children: React.ReactNode;
}

function UnorderedList({ children }: UnorderedListProps) {
  return <ul className="list-disc ml-10 my-2 list-outside">{children}</ul>;
}

export default UnorderedList;
