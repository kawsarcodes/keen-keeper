import { Link } from 'react-router-dom';

export default function FriendCard({ friend }) {
  return (
    <Link to={`/friend/${friend.id}`} className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-md transition-shadow group text-center">
      <img src={friend.picture} alt={friend.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700">{friend.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{friend.days_since_contact}d ago</p>
      <div className={`px-3 py-1 text-xs font-semibold rounded-full mt-auto ${friend.status === 'on-track' ? "bg-emerald-500 text-white" : friend.status === 'almost due' ? "bg-amber-500 text-white" : "bg-red-500 text-white"}`}>
        {friend.status === 'on-track' && "On-Track"}
        {friend.status === 'almost due' && "Almost Due"}
        {friend.status === 'overdue' && "Overdue"}
      </div>
    </Link>
  );
}