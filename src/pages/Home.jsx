import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FriendCard from '../components/FriendCard';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { timeline } = useOutletContext();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/friends.json');
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchFriends();
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status === 'almost due' || f.status === 'overdue').length;
  const interactionsThisMonth = timeline ? timeline.length : 0;

  return (
    <div className="space-y-12">
      {/* Banner */}
      <div className="text-center space-y-6 pt-8 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="inline-flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-sm font-medium transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add a Friend</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalFriends}</div>
          <div className="text-sm text-gray-500">Total Friends</div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{onTrack}</div>
          <div className="text-sm text-gray-500">On Track</div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{needAttention}</div>
          <div className="text-sm text-gray-500">Need Attention</div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{interactionsThisMonth}</div>
          <div className="text-sm text-gray-500">Interactions This Month</div>
        </div>
      </div>

      {/* Friends Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Friends</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Loading friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
