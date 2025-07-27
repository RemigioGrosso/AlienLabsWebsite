export default function WelcomeTab() {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-black mb-2">
          Welcome to Alien Labs
        </h1>
        <p className="text-lg text-black">
          Misc Company
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* What We Do Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black border-b border-gray-600 pb-2">
            What We Do
          </h2>
          <div className="space-y-3 text-black">
            <p>
              At Alien Labs, we produce the YouTube Videos for the Gio Grosso YouTube Channel.
            </p>
            <p>
              Our members have experience in:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li>Web Development</li>
              <li>Robotics</li>
              <li>Photography/Videography</li>
              <li>Video Editing</li>
              <li>Programming tutoring</li>
            </ul>
            <p>
              Although we cant discolse it right now, we have multiple ventures in development.
            </p>
          </div>
        </div>

        {/* Photo & Bio Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black border-b border-gray-600 pb-2">
            The Founder (and the only person currently at the company)
          </h2>

          {/* Photo */}
          <div className="win95-inset p-4 bg-gray-800">
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src="/profile-photo.jpeg"
                alt="Founder Photo"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) nextElement.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center text-gray-400" style={{ display: 'none' }}>
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-sm">Add your photo to</p>
                  <p className="text-xs">/public/profile-photo.jpeg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-3 text-black">
            <p>
              <strong className="text-black">Bio</strong> Major: Eletrical Engineering. Minor: Computer Science. Freshman at University at Buffalo
            </p>
            <p>

            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 pt-8 border-t border-gray-600">
        <h3 className="text-xl font-semibold text-black">
          Want to work on something?
        </h3>
        <p className="text-black">
          Let&apos;s collaborate.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="win95-button px-6 py-2 text-sm">
            View Projects
          </button>
          <button className="win95-button px-6 py-2 text-sm">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  )
}