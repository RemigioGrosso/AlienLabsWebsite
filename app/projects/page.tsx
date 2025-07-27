export default function Projects() {
  return (
    <div className="h-full p-4">
      <div className="win95-window max-w-6xl mx-auto">
        {/* Title Bar */}
        <div className="win95-titlebar">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 text-black text-xs flex items-center justify-center">📁</div>
            <span>Projects - File Explorer</span>
          </div>
          <div className="flex space-x-1">
            <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs">_</button>
            <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs">□</button>
            <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs">×</button>
          </div>
        </div>
        
        {/* Menu Bar */}
        <div className="bg-win95-gray border-b border-win95-darkgray px-2 py-1">
          <div className="flex space-x-4 text-sm">
            <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">File</span>
            <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">Edit</span>
            <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">View</span>
            <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">Tools</span>
            <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">Help</span>
          </div>
        </div>
        
        {/* Toolbar */}
        <div className="bg-win95-gray border-b border-win95-darkgray p-2 flex items-center space-x-2">
          <button className="win95-button text-xs px-2 py-1">Back</button>
          <button className="win95-button text-xs px-2 py-1">Forward</button>
          <button className="win95-button text-xs px-2 py-1">Up</button>
          <div className="win95-inset flex-1 px-2 py-1 text-sm">
            C:\AlienLabs\Projects\
          </div>
        </div>
        
        {/* Content Area */}
        <div className="win95-inset m-4 p-4 min-h-96">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold green-glow-text mb-2">Our Projects</h1>
            <p className="text-sm text-gray-600">
              Discover the innovative projects we&apos;re working on at Alien Labs.
            </p>
          </div>
          
          {/* File/Folder Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Coming Soon Projects */}
            {[
              { name: 'Project_Alpha.exe', icon: '🚀', type: 'Application' },
              { name: 'RetroUI_Kit', icon: '📁', type: 'Folder' },
              { name: 'WebApp_Beta.html', icon: '🌐', type: 'HTML Document' },
              { name: 'AI_Assistant', icon: '📁', type: 'Folder' },
              { name: 'GameDev_Tools', icon: '📁', type: 'Folder' },
              { name: 'README.txt', icon: '📄', type: 'Text Document' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-1 cursor-pointer group p-2 hover:bg-win95-lightgray">
                <div className="text-2xl">{item.icon}</div>
                <span className="text-xs text-center break-words max-w-full">{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* Status Message */}
          <div className="mt-8 win95-panel p-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-400 text-black text-xs flex items-center justify-center">⚠️</div>
              <span className="text-sm">Projects are currently in development. Check back soon for updates!</span>
            </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-win95-gray border-t border-win95-darkgray px-2 py-1 text-xs flex justify-between">
          <span>6 object(s)</span>
          <span>Ready</span>
        </div>
      </div>
    </div>
  )
}