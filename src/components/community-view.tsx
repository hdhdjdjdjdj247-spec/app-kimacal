"use client";

import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  foodName: string;
  calories: number;
  imageUrl: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    userName: 'Maria Silva',
    userAvatar: '👩',
    foodName: 'Salada Caesar com Frango',
    calories: 450,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    likes: 24,
    comments: 5,
    timestamp: 'há 2 horas'
  },
  {
    id: '2',
    userName: 'João Santos',
    userAvatar: '👨',
    foodName: 'Bowl de Açaí com Granola',
    calories: 380,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop',
    likes: 18,
    comments: 3,
    timestamp: 'há 4 horas'
  },
  {
    id: '3',
    userName: 'Ana Costa',
    userAvatar: '👩‍🦰',
    foodName: 'Salmão Grelhado com Legumes',
    calories: 520,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop',
    likes: 32,
    comments: 8,
    timestamp: 'há 6 horas'
  },
  {
    id: '4',
    userName: 'Pedro Lima',
    userAvatar: '👨‍🦱',
    foodName: 'Smoothie Verde Detox',
    calories: 180,
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=400&fit=crop',
    likes: 15,
    comments: 2,
    timestamp: 'há 8 horas'
  }
];

export default function CommunityView() {
  return (
    <div className="min-h-full bg-gradient-to-b from-white to-gray-50 px-4 py-8 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Comunidade
          </h2>
          <p className="text-gray-600">
            Veja o que outros usuários estão comendo
          </p>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-[#39FF14] to-[#2ecc00] rounded-full flex items-center justify-center text-2xl shadow-lg shadow-[#39FF14]/20">
                  {post.userAvatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {post.userName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {post.timestamp}
                  </p>
                </div>
                <div className="bg-[#39FF14]/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-[#39FF14]">
                    {post.calories} kcal
                  </span>
                </div>
              </div>

              {/* Post Image */}
              <img
                src={post.imageUrl}
                alt={post.foodName}
                className="w-full h-80 object-cover"
              />

              {/* Post Content */}
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-3">
                  {post.foodName}
                </h4>

                {/* Actions */}
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#39FF14] transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-[#39FF14]/10 transition-colors">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors group ml-auto">
                    <div className="p-2 rounded-full group-hover:bg-purple-50 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-br from-[#39FF14]/10 to-[#2ecc00]/5 rounded-3xl p-8 text-center border border-[#39FF14]/20">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Compartilhe suas Refeições
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Em breve você poderá compartilhar suas refeições e inspirar outros usuários!
          </p>
        </div>
      </div>
    </div>
  );
}
