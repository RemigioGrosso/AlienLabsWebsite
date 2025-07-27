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
      
      {/* Content */}
      <div className="win95-inset m-2 p-3 h-64 overflow-y-auto">
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'WebApp_Alpha', icon: '🌐', type: 'Web Application' },
            { name: 'RetroUI_Kit', icon: '🎨', type: 'Design System' },
            { name: 'AI_Assistant', icon: '🤖', type: 'AI Project' },
            { name: 'GameDev_Tools', icon: '🎮', type: 'Game Tools' },
            { name: 'Mobile_App', icon: '📱', type: 'Mobile App' },
            { name: 'README.txt', icon: '📄', type: 'Text File' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 p-2 hover:bg-win95-lightgray cursor-pointer">
              <div className="text-xl">{item.icon}</div>
              <span className="text-xs text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="bg-win95-gray border-t border-win95-darkgray px-2 py-1 text-xs">
        6 object(s) selected
      </div>
    </div>
  )
}