type Props = {
  color?: string;
  children: React.ReactNode;
};

export default function Tag({ color = "green", children }: Props) {
  return (
    <p
      className={`${color}-tag inline-flex rounded-full px-2 text-xs font-semibold leading-5`}
    >
      {children}
    </p>
  );
}
