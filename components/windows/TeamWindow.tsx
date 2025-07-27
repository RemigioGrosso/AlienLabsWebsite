export default function TeamWindow() {
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
      <div className="p-4 space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold green-glow-text mb-2">Team Directory</h2>
          <p className="text-sm text-gray-600">Meet the Alien Labs crew</p>
        </div>
        
        <div className="space-y-3">
          {[
            { name: 'Alex Chen', role: 'Lead Developer', avatar: '👨‍💻', status: 'Online' },
            { name: 'Sarah Kim', role: 'UI/UX Designer', avatar: '👩‍🎨', status: 'Away' },
            { name: 'Mike Johnson', role: 'Project Manager', avatar: '👨‍💼', status: 'Online' },
            { name: 'Lisa Wang', role: 'QA Engineer', avatar: '👩‍🔬', status: 'Busy' },
          ].map((member, index) => (
            <div key={index} className="win95-inset p-3 flex items-center space-x-3">
              <div className="text-2xl">{member.avatar}</div>
              <div className="flex-1">
                <div className="font-bold text-sm">{member.name}</div>
                <div className="text-xs text-gray-600">{member.role}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                member.status === 'Online' ? 'bg-green-200 text-green-800' :
                member.status === 'Away' ? 'bg-yellow-200 text-yellow-800' :
                'bg-red-200 text-red-800'
              }`}>
                {member.status}
              </div>
            </div>
          ))}
        </div>
        
        <div className="win95-panel p-3 text-center">
          <p className="text-sm">
            🛸 &quot;Building the future with retro style&quot; 🛸
          </p>
        </div>
      </div>
    </div>
  )
}