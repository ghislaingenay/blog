import { NavBarPostId } from "@components/navigation/NavPostId";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarPostId />
      <>{children}</>
    </>
  );
}
