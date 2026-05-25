type AppointmentCardProps = {
  children: React.ReactNode;
  as?: "li" | "div";
  className?: string;
};

export function AppointmentCard({ children, as: Tag = "li", className }: AppointmentCardProps) {
  return (
    <Tag
      className={`w-full p-4 shadow-[0px_2px_8px_.5px_rgba(0,0,0,0.28)] rounded-2xl ${className}`}
    >
      {children}
    </Tag>
  );
}
