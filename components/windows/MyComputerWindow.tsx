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
          <h2 className="text-lg font-bold text-black mb-2">My Computer</h2>
          <p className="text-sm text-gray-800">System Information</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">💾</div>
            <span className="text-xs text-black font-semibold">Floppy (A:)</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">💿</div>
            <span className="text-xs text-black font-semibold">CD-ROM (D:)</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">🖥️</div>
            <span className="text-xs text-black font-semibold">Hard Drive (C:)</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 hover:bg-win95-lightgray cursor-pointer">
            <div className="text-2xl">🖨️</div>
            <span className="text-xs text-black font-semibold">Printers</span>
          </div>
        </div>
        
        <div className="win95-inset p-3 mt-4">
          <div className="font-win95-mono text-xs space-y-1 text-black">
            <div><strong>System:</strong> Windows 95</div>
            <div><strong>Processor:</strong> 486 DX2 66MHz</div>
            <div><strong>Memory:</strong> 16 MB RAM</div>
            <div><strong>Available:</strong> 8 MB</div>
          </div>
        </div>
      </div>
    </div>
  )
}