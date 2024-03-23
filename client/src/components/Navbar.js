export const Navbar = () => {
  return (
    <div className="max-w-screen-2xl mx-auto overflow-hidden">
      <div className="navbar bg-green-600 z-10 h-[70px]">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            mycoBC
          </a>
        </div>
        <div className="flex-none">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl" href="/create">
              Create
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
