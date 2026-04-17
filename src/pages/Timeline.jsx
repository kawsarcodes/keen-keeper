import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

export default function Timeline() {
  const { timeline } = useOutletContext();
  const [filterType, setFilterType] = useState('All');

  const filteredEntries = useMemo(() => {
    return (timeline || [])
      .filter(entry => filterType === 'All' || entry.type === filterType)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [timeline, filterType]);

  const getIcon = (type) => {
    const iconClass = "w-8 h-8 object-contain";
    switch (type) {
      case 'Call': return <img src={callIcon} alt="" className={iconClass} />;
      case 'Text': return <img src={textIcon} alt="" className={iconClass} />;
      case 'Video': return <img src={videoIcon} alt="" className={iconClass} />;
      default: return <img src={textIcon} alt="" className={iconClass} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-[#1e293b] mb-8">Timeline</h1>

      <div className="relative mb-8 w-64">
        <select
          className="appearance-none w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all cursor-pointer"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-3">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-gray-100 rounded-sm p-5 flex items-center gap-5 transition-shadow hover:shadow-sm"
            >
              <div className="shrink-0 w-10 flex justify-center">
                {getIcon(entry.type)}
              </div>

              <div className="flex flex-col">
                <div className="text-[15px]">
                  <span className="font-bold text-gray-800">{entry.type}</span>
                  <span className="text-gray-500 font-medium"> with {entry.friendName}</span>
                </div>
                <div className="text-sm text-gray-400 mt-0.5">
                  {format(new Date(entry.date), "MMMM d, yyyy")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center bg-white rounded-sm border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">No timeline entries found.</p>
          </div>
        )}
      </div>
    </div>
  );
}