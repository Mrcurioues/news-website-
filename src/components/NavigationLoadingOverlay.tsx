import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  targetPath?: string;
}

export const NavigationLoadingOverlay: React.FC<LoadingScreenProps> = ({ isLoading, targetPath = '' }) => {
  if (!isLoading) return null;

  const isArticle = targetPath.startsWith('/news/');
  const isCategory = targetPath.startsWith('/category/');
  const isVideo = targetPath.startsWith('/videos');
  const isPhoto = targetPath.startsWith('/photos');

  return (
    <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-y-auto animate-fade-in flex flex-col justify-between">
      {/* Top Animated Progress Red Ribbon */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-rose-600 animate-pulse z-50"></div>

      {/* Dynamic Page-Specific Shadow Skeleton Structure */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8 animate-pulse">
        {/* Common Header Skeleton */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="h-7 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* 1. ARTICLE DETAIL PAGE SKELETON */}
        {isArticle ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-4 w-24 bg-rose-200 rounded-md"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded-lg"></div>
            <div className="flex gap-4 items-center py-2 border-y border-gray-100">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="space-y-1">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="w-full aspect-16/9 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : isCategory ? (
          /* 2. CATEGORY PAGE SKELETON */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 space-y-3 border border-gray-200">
                  <div className="w-full aspect-16/9 bg-gray-200 rounded-lg"></div>
                  <div className="h-5 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : isVideo || isPhoto ? (
          /* 3. MEDIA (VIDEO & PHOTO) PAGE SKELETON */
          <div className="space-y-6">
            <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-48 space-y-2 p-2 border border-gray-200">
                  <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 4. HOMEPAGE & GENERAL SECTIONS SKELETON */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Hero & Main News Column Skeleton */}
            <div className="md:col-span-8 space-y-6">
              {/* Main Featured Big Card Skeleton */}
              <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 space-y-4">
                <div className="w-full aspect-16/9 bg-gray-200 rounded-xl"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md"></div>
              </div>

              {/* Grid Cards Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl p-3 border border-gray-200 space-y-3">
                    <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Column Skeleton */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 space-y-4">
                <div className="h-5 w-1/2 bg-gray-200 rounded-md"></div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-20 h-16 bg-gray-200 rounded-lg shrink-0"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-full bg-gray-200 rounded-md"></div>
                      <div className="h-3 w-2/3 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
