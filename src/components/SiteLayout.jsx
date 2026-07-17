import SiteNav from "./SiteNav";

const SiteLayout = ({ active, children }) => (
  <>
    <SiteNav active={active} />

    <main className="page">{children}</main>
  </>
);

export default SiteLayout;
