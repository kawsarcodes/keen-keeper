import { Link } from 'react-router-dom';

export default function FriendCard({ friend }) {
  return (
    <Link
      to={`/friend/${friend.id}`}
      className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-md transition-shadow group text-center"
    >
      <div className="relative mb-4">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-gray-50"
          referrerPolicy="no-referrer"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
        {friend.name}
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        {friend.days_since_contact}d ago
      </p>

      <div className="flex flex-wrap gap-1 justify-center mb-4 min-h-[32px]">
        {friend.tags.slice(0, 2).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold tracking-wider rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className={`px-3 py-1 text-xs font-semibold rounded-full mt-auto ${friend.status === 'on-track' ? "bg-emerald-500 text-white" :
        friend.status === 'almost due' ? "bg-amber-500 text-white" :
          "bg-red-500 text-white"
        }`}>
        {friend.status === 'on-track' && "On-Track"}
        {friend.status === 'almost due' && "Almost Due"}
        {friend.status === 'overdue' && "Overdue"}
      </div>
    </Link>
  );
}
