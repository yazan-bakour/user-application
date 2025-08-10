import { Skeleton } from "@heroui/react";
import BottomNavigation from "./BottomNavigation";

interface LoadingSkeletonProps {
  variant?: "form" | "table" | "card" | "wizard";
  rows?: number;
  className?: string;
}

export default function LoadingSkeleton({
  variant = "form",
  rows = 3,
  className = "",
}: LoadingSkeletonProps) {
  const renderFormSkeleton = () => (
    <div className="container mx-auto px-4 pb-24">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-64 rounded-lg mb-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Skeleton */}
        <div className="bg-background border border-divider rounded-none">
          <div className="bg-primary-50 p-4">
            <Skeleton className="h-6 w-40 rounded-lg" />
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-20 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-16 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-28 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-12 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Work Preferences Skeleton */}
        <div className="bg-background border border-divider rounded-none">
          <div className="bg-primary-50 p-4">
            <Skeleton className="h-6 w-36 rounded-lg" />
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Skeleton className="h-4 w-32 rounded-lg mb-2" />
              <Skeleton className="h-6 w-24 rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-28 rounded-lg mb-2" />
              <Skeleton className="h-5 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-16 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Skeleton */}
        <div className="lg:col-span-2 bg-background border border-divider rounded-none">
          <div className="bg-primary-50 p-4">
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-6 w-32 rounded-lg" />
              <Skeleton className="h-6 w-20 rounded-lg" />
              <Skeleton className="h-6 w-28 rounded-lg" />
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-6 w-36 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Languages Skeleton */}
        <div className="lg:col-span-2 bg-background border border-divider rounded-none">
          <div className="bg-primary-50 p-4">
            <Skeleton className="h-6 w-24 rounded-lg" />
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-28 rounded-lg" />
              <Skeleton className="h-6 w-32 rounded-lg" />
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-6 w-36 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Education Skeleton */}
        <div className="lg:col-span-2 bg-background border border-divider rounded-none">
          <div className="bg-primary-50 p-4">
            <Skeleton className="h-6 w-24 rounded-lg" />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Skeleton className="h-4 w-20 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Links Skeleton */}
        <div className="bg-background border border-divider rounded-none">
          <div className="bg-primary-50 p-4">
            <Skeleton className="h-6 w-32 rounded-lg" />
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Skeleton className="h-4 w-28 rounded-lg mb-2" />
              <Skeleton className="h-5 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 rounded-lg mb-2" />
              <Skeleton className="h-5 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 rounded-lg mb-2" />
              <Skeleton className="h-5 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* References Skeleton */}
        <div className="bg-background border border-divider rounded-none">
          <div className="bg-primary-50 p-4">
            <Skeleton className="h-6 w-24 rounded-lg" />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-12 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-12 rounded-lg mb-2" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation>
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </BottomNavigation>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex gap-4">
          <Skeleton className="h-12 w-full rounded" />
          <Skeleton className="h-12 w-full rounded" />
          <Skeleton className="h-12 w-full rounded" />
        </div>
      ))}
    </div>
  );

  const renderCardSkeleton = () => (
    <div className={`space-y-4 ${className}`}>
      <Skeleton className="h-6 w-48 rounded" />
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full rounded" />
        ))}
      </div>
    </div>
  );

  const renderWizardSkeleton = () => (
    <div className="min-h-screen bg-background w-full">
      {/* Header Skeleton */}
      <div className="border-b border-divider px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 rounded" />
              <Skeleton className="h-4 w-48 rounded" />
            </div>
            <Skeleton className="h-10 w-20 rounded" />
          </div>

          {/* Progress Steps Skeleton */}
          <div className="flex justify-between w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="mt-1 h-3 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-12 w-full rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-content1 border-t border-divider px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <Skeleton className="h-10 w-20 rounded" />
          <Skeleton className="h-10 w-20 rounded" />
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case "table":
      return renderTableSkeleton();
    case "card":
      return renderCardSkeleton();
    case "wizard":
      return renderWizardSkeleton();
    case "form":
    default:
      return renderFormSkeleton();
  }
}
