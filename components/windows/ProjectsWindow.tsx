export default function ProjectsWindow() {
  return (
    <div>
      {/* Menu Bar */}
      <div className="bg-win95-gray border-b border-win95-darkgray px-2 py-1">
        <div className="flex space-x-4 text-sm">
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">File</span>
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">Edit</span>
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">View</span>
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">Tools</span>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="bg-win95-gray border-b border-win95-darkgray p-2 flex items-center space-x-2">
        <button className="win95-button text-xs px-2 py-1">New</button>
        <button className="win95-button text-xs px-2 py-1">Open</button>
        <button className="win95-button text-xs px-2 py-1">Save</button>
        <div className="win95-inset flex-1 px-2 py-1 text-sm">
          C:\AlienLabs\Projects\
        </div>
      </div>
      
      {/* Content - Empty Projects Folder */}
      <div className="win95-inset m-2 p-3 h-64 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-gray-600">
          <div className="text-4xl mb-4">📁</div>
          <p className="text-sm text-center">
            This folder is empty.
          </p>
          <p className="text-xs text-center mt-2 text-gray-500">
            Future project folders will appear here.
          </p>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="bg-win95-gray border-t border-win95-darkgray px-2 py-1 text-xs">
        0 object(s)
      </div>
    </div>
  )
}