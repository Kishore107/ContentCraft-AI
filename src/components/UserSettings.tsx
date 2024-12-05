import { XMarkIcon as XIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

function UserSettings({ isOpen, onClose }: UserSettingsProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">User Settings</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="font-medium mb-2 block">Theme</label>
          <div className="space-y-2">
            {['Technology', 'Business', 'Creative', 'Academic'].map((theme) => (
              <label key={theme} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedThemes.includes(theme)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedThemes([...selectedThemes, theme]);
                    } else {
                      setSelectedThemes(selectedThemes.filter(t => t !== theme));
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <span>{theme}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            // Save changes logic here
            onClose();
          }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg
                   hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default UserSettings; 