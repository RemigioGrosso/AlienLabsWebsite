export default function AboutPage() {
    return (
        <div className="h-full p-4">
            <div className="win95-window max-w-4xl mx-auto">
                {/* Title Bar */}
                <div className="win95-titlebar">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-400 text-white text-xs flex items-center justify-center">ℹ️</div>
                        <span>About Alien Labs - Company Info</span>
                    </div>
                    <div className="flex space-x-1">
                        <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs">_</button>
                        <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs">□</button>
                        <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs">×</button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-6">
                    {/* Company Logo/Header */}
                    <div className="text-center mb-8">
                        <div className="win95-panel p-4 inline-block">
                            <h1 className="text-3xl font-bold green-glow-text font-win95-mono mb-2">
                                ALIEN LABS
                            </h1>
                            <p className="text-sm">A Remigio Grosso Company</p>
                        </div>
                    </div>

                    {/* Tabbed Interface */}
                    <div className="win95-window">
                        <div className="bg-win95-gray border-b border-win95-darkgray">
                            <div className="flex">
                                <div className="win95-button border-b-0 bg-win95-white">Mission</div>
                                <div className="win95-button border-b-0">Team</div>
                                <div className="win95-button border-b-0">Contact</div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="win95-inset p-6">
                            <h2 className="text-lg font-bold green-glow-text mb-4">Our Mission</h2>
                            <p className="text-sm leading-relaxed mb-4 text-black">
                                At Alien Labs, we oversee the production of YouTube videos for the Gio Grosso youtube channel.
                            </p>
                            <p className="text-sm leading-relaxed text-black">
                                Many things are to come
                            </p>
                        </div>
                    </div>

                    {/* System Specs Style Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="win95-window">
                            <div className="win95-titlebar text-xs">
                                <span>Stats</span>
                            </div>
                            <div className="p-4 font-win95-mono text-sm space-y-2">
                                <div>Founded: 2025</div>
                                <div>Team Size: Growing</div>
                                <div>Projects: In Development</div>
                                <div>Status: Active</div>
                                <div>Specialty: Electronics and Videography</div>
                            </div>
                        </div>

                        <div className="win95-window">
                            <div className="win95-titlebar text-xs">
                                <span>Connect With Us</span>
                            </div>
                            <div className="p-4 space-y-3">
                                <button className="win95-button w-full text-left">
                                    Email Newsletter
                                </button>
                                <button className="win95-button w-full text-left">
                                    Social Media
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="win95-panel p-3 text-center">
                        <p className="text-sm">
                            &quot;We try&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}