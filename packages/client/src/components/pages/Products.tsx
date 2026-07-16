import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../components/ui/button";
import {
  fallbackProperties,
  fetchProperties,
  publicPropertyImages,
  type Property,
} from "../lib/api";

const likesKey = "perfecthomes-property-likes";

function formatPrice(property: Property) {
  const amount = Number(property.price);
  if (Number.isNaN(amount)) {
    return `${property.currency} ${property.price}`;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: property.currency || "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PropertyGrid() {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const propertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    retry: 1,
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(likesKey);
    if (stored) {
      setLikedIds(JSON.parse(stored) as number[]);
    }
  }, []);

  const properties =
    propertiesQuery.data && propertiesQuery.data.length > 0
      ? propertiesQuery.data
      : fallbackProperties;

  const toggleLike = (propertyId: number) => {
    setLikedIds((current) => {
      const next = current.includes(propertyId)
        ? current.filter((id) => id !== propertyId)
        : [...current, propertyId];

      window.localStorage.setItem(likesKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <section>
      {propertiesQuery.isError && (
        <p className="mb-5 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
          Showing local properties.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property, index) => {
          const isLiked = likedIds.includes(property.id);

          return (
            <article
              key={property.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={publicPropertyImages[index % publicPropertyImages.length]}
                alt={property.title}
                className="h-56 w-full object-cover"
              />
              <div className="grid gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {property.title}
                    </h2>
                    <p className="text-sm uppercase tracking-wide text-blue-600">
                      {property.listing_type} / {property.property_type}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label={isLiked ? "Unlike property" : "Like property"}
                    onClick={() => toggleLike(property.id)}
                  >
                    {isLiked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </Button>
                </div>
                <p className="line-clamp-3 text-sm text-gray-600">
                  {property.description}
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  {property.bedrooms !== null && (
                    <span>{property.bedrooms} beds</span>
                  )}
                  {property.bathrooms !== null && (
                    <span>{property.bathrooms} baths</span>
                  )}
                  <span>{property.area} sqm</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t pt-4">
                  <strong className="text-lg text-gray-900">
                    {formatPrice(property)}
                  </strong>
                  <span className="text-sm text-gray-500">
                    {isLiked ? "Liked" : "Like this"}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function Properties() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
            <p className="mt-2 text-gray-600">
              Browse available homes, with local listings as a fallback.
            </p>
          </div>
          <PropertyGrid />
        </section>
      </main>
    </>
  );
}
