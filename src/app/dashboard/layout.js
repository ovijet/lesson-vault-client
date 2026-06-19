import Sidebar from "../components/dashBoard/sidebar";

export default function DashBoardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      
      {/* Sidebar */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <header className="h-16 border-b border-default-200 bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <button className="relative">
              🔔
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Mobile Sidebar */}
        <div className="md:hidden p-4 border-b">
          <Sidebar />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
