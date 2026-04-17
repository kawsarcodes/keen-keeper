import { format } from 'date-fns';
import { Archive, Clock, History, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { timeline, addTimelineEntry, addToast } = useOutletContext();
  
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await fetch('/friends.json');
        const data = await response.json();
        const found = data.find(f => f.id === Number(id));
        if (found) {
          setFriend(found);
        } else {
          navigate('/404', { replace: true });
        }
      } catch (error) {
        console.error("Failed to fetch friend:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriend();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!friend) return null;

  const handleInteraction = (type) => {
    addTimelineEntry({
      friendId: friend.id,
      friendName: friend.name,
      type,
      title: `${type} with ${friend.name}`
    });
    addToast(`Successfully logged a ${type.toLowerCase()} with ${friend.name}!`, 'success');
  };

  const recentInteractions = (timeline || [])
    .filter(t => t.friendId === friend.id)
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div className="md:col-span-1 space-y-4">
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
          <img 
            src={friend.picture} 
            alt={friend.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 mb-4"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{friend.name}</h2>
          
          <div className={`px-4 py-1 text-xs font-semibold rounded-full mb-4 ${
            friend.status === 'on-track' ? "bg-emerald-500 text-white" :
            friend.status === 'almost due' ? "bg-amber-500 text-white" :
            "bg-red-500 text-white"
          }`}>
            {friend.status === 'on-track' && "On-Track"}
            {friend.status === 'almost due' && "Almost Due"}
            {friend.status === 'overdue' && "Overdue"}
          </div>

          <div className="flex flex-wrap gap-1 justify-center mb-6">
            {friend.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold tracking-wider rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-600 text-sm italic mb-4">"{friend.bio}"</p>
          <p className="text-xs text-gray-500">Preferred: {friend.email}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors">
            <Clock className="w-4 h-4" />
            Snooze 2 Weeks
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors">
            <Archive className="w-4 h-4" />
            Archive
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 py-2.5 rounded-sm text-sm font-medium hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="md:col-span-2 space-y-6">
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col justify-center">
            <div className="text-3xl font-bold text-emerald-900 mb-1">{friend.days_since_contact}</div>
            <div className="text-xs text-gray-500">Days Since Contact</div>
          </div>
          <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col justify-center">
            <div className="text-3xl font-bold text-emerald-900 mb-1">{friend.goal}</div>
            <div className="text-xs text-gray-500">Goal (Days)</div>
          </div>
          <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col justify-center">
            <div className="text-xl font-bold text-emerald-900 mb-1">
              {format(new Date(friend.next_due_date), "MMM d, yyyy")}
            </div>
            <div className="text-xs text-gray-500">Next Due</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-emerald-900 mb-1">Relationship Goal</h3>
            <p className="text-sm text-gray-600">Connect every <span className="font-bold text-gray-900">{friend.goal} days</span></p>
          </div>
          <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-sm font-medium transition-colors">
            Edit
          </button>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-emerald-900 mb-4">Quick Check-In</h3>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleInteraction('Call')}
              className="flex flex-col items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200 rounded-sm transition-all"
            >
              <img src={callIcon} alt="Call" className="w-5 h-5 object-contain" />
              <span className="text-xs font-medium">Call</span>
            </button>
            <button 
              onClick={() => handleInteraction('Text')}
              className="flex flex-col items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200 rounded-sm transition-all"
            >
              <img src={textIcon} alt="Text" className="w-5 h-5 object-contain" />
              <span className="text-xs font-medium">Text</span>
            </button>
            <button 
              onClick={() => handleInteraction('Video')}
              className="flex flex-col items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200 rounded-sm transition-all"
            >
              <img src={videoIcon} alt="Video" className="w-5 h-5 object-contain" />
              <span className="text-xs font-medium">Video</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-emerald-900 text-[15px] font-semibold">Recent Interactions</h3>
            <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-sm transition-colors border border-gray-200">
              <History className="w-3.5 h-3.5" />
              Full History
            </button>
          </div>
          
          <div className="divide-y divide-gray-50">
            {recentInteractions.length > 0 ? (
              recentInteractions.map(interaction => (
                <div key={interaction.id} className="py-4 flex items-start justify-between first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3.5">
                     <div className="mt-0.5 shrink-0 flex items-center justify-center">
                        {interaction.type === 'Call' ? <img src={callIcon} alt="Call" className="w-[18px] h-[18px] object-contain opacity-80" /> :
                         interaction.type === 'Text' ? <img src={textIcon} alt="Text" className="w-[18px] h-[18px] object-contain opacity-80" /> :
                         <img src={videoIcon} alt="Video" className="w-[18px] h-[18px] object-contain opacity-80" />}
                     </div>
                     <div className="flex flex-col gap-0.5">
                       <span className="font-semibold text-gray-800 text-[13px]">{interaction.type}</span>
                       <span className="text-[12px] text-gray-500">{interaction.description || 'Just checked in'}</span>
                     </div>
                  </div>
                  <div className="text-[11px] text-gray-500 shrink-0 pt-0.5 whitespace-nowrap">
                    {format(new Date(interaction.date), "MMM d, yyyy")}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[13px] text-gray-500">
                No recent interactions recorded.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
