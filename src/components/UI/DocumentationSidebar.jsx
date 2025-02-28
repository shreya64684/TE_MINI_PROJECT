import React, { useState } from "react";
import { ChevronRight, ChevronDown, Search, Book } from "lucide-react";

const menuItems = [
  { title: "Add Electricity Data", subItems: ["Data Fetching"] },
  { title: "Add Raw Material Data", subItems: ["Data Fetching"] },
  { title: "Add Fuel Data", subItems: ["Data Fetching"] },
  { title: "Add Goods & Logistics Data", subItems: ["Data Fetching"] },
  { title: "Add Waste Data", subItems: ["Data Fetching"] },
];

const DocumentationSidebar = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="flex h-[100vh] bg-green-200 text-black">
      {/* Sidebar */}
      <aside className="w-64 p-4 border-r border-black">
        <div className="flex items-center space-x-2 text-lg font-semibold">
          <Book className="text-black" />
          <span>Company Dashboard</span>
          <span className="text-black text-sm"></span>
        </div>


        {/* Menu */}
        <nav className="mt-6 space-y-2">
          {menuItems.map(({ title, subItems }) => (
            <div key={title}>
              <button
                onClick={() => toggleSection(title)}
                className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-black hover:bg-gray-800 hover:text-white"
              >
                {title}
                {subItems.length > 0 &&
                  (openSections[title] ? (
                    <ChevronDown className="w-4 h-4 text-black" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-black" />
                  ))}
              </button>
              {openSections[title] && subItems.length > 0 && (
                <div className="pl-6 mt-1 space-y-1">
                  {subItems.map((sub) => (
                    <button
                      key={sub}
                      className="block text-black hover:text-white text-sm"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      {/* <main className="flex-1 p-6">
        <nav className="text-gray-400 text-sm">
          <span>Building Your Application</span> &gt;{" "}
          <span className="text-white">Data Fetching</span>
        </nav> */}

      {/* Content Placeholder */}
      {/* <div className="mt-6 bg-gray-800 h-64 rounded-lg"></div>
      </main> */}
    </div>
  );
};

export default DocumentationSidebar;