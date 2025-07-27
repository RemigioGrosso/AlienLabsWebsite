export default function WelcomeWindow() {
  return (
    <div>
      {/* Menu Bar */}
      <div className="bg-win95-gray border-b border-win95-darkgray px-2 py-1">
        <div className="flex space-x-4 text-sm">
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">File</span>
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">Edit</span>
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">View</span>
          <span className="cursor-pointer hover:bg-win95-lightgray px-2 py-1">Help</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold earthy-glow-text font-win95-mono">
            ALIEN LABS
          </h1>
          <p className="text-lg text-gray-700">
            welcome tbd
          </p>
          
          {/* Terminal-style welcome message */}
          <div className="win95-inset bg-earthy-darkest text-earthy-medium p-4 font-win95-mono text-sm text-left">
            <div className="space-y-1">
              <div>C:\&gt; Welcome to Alien Labs</div>
              <div>C:\&gt; System initialized...</div>
              <div>C:\&gt; Loading interface...</div>
              <div>C:\&gt; Ready.</div>
              <div className="flex items-center">
                <span>C:\&gt; </span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <button className="win95-button text-xs px-3 py-1">
            📁 Projects
          </button>
          <button className="win95-button text-xs px-3 py-1">
            👥 Team
          </button>
          <button className="win95-button text-xs px-3 py-1">
            ℹ️ About
          </button>
        </div>
      </div>
    </div>
  )
}