interface UnorderedListProps {
  children: React.ReactNode;
}

function UnorderedList({ children, ...props }: UnorderedListProps) {
  return (
    <ul {...props} className="list-disc ml-10 my-2 list-outside">
      {children}
    </ul>
  );
}

export default UnorderedList;
