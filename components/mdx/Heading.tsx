export const Heading = {
  H1: ({ children, ...props }) => (
    <h1 {...props} className="text-2xl font-bold">
      {children}
    </h1>
  ),
  H2: ({ children, ...props }) => (
    <h2 {...props} className="text-xl font-bold">
      {children}
    </h2>
  ),
};
