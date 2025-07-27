export default function MyComputerWindow() {
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
          <h2 className="text-lg font-bold green-glow-text mb-2">My Computer</h2>
          <p className="text-sm text-gray-600">System Information</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">💾</div>
            <span className="text-xs">Floppy (A:)</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">💿</div>
            <span className="text-xs">CD-ROM (D:)</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">🖥️</div>
            <span className="text-xs">Hard Drive (C:)</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">🖨️</div>
            <span className="text-xs">Printers</span>
          </div>
        </div>
        
        <div className="win95-inset p-3 mt-4">
          <div className="font-win95-mono text-xs space-y-1">
            <div>System: Windows 95</div>
            <div>Processor: 486 DX2 66MHz</div>
            <div>Memory: 16 MB RAM</div>
            <div>Available: 8 MB</div>
          </div>
        </div>
      </div>
    </div>
  )
}