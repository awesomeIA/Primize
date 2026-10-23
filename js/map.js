
import { supabase, isSupabaseConfigured } from "./supabase-client.js";

/**
 * Obtiene las ofertas visibles públicamente desde Supabase.
 * La vista filtra las ofertas vigentes de comercios verificados.
 */
export async function getActiveOffers() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase no está configurado. Revisa js/supabase-client.js."
    );
  }

  const { data, error } = await supabase
    .from("active_map_offers")
    .select("*")
    .order("is_sponsor", { ascending: false })
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error al cargar las ofertas:", error);
    throw new Error("No se pudieron cargar las ofertas.");
  }

  return data ?? [];
}

/**
 * Busca ofertas por texto y categoría.
 * Los filtros son opcionales.
 */
export async function searchOffers({
  query = "",
  category = "",
} = {}) {
  const offers = await getActiveOffers();

  const normalizedQuery = String(query)
    .trim()
    .toLocaleLowerCase("es");

  const normalizedCategory = String(category)
    .trim()
    .toLocaleLowerCase("es");

  return offers.filter((offer) => {
    const searchableText = [
      offer.title,
      offer.category,
      offer.store_name,
      offer.store_address,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("es");

    const matchesQuery =
      !normalizedQuery || searchableText.includes(normalizedQuery);

    const matchesCategory =
      !normalizedCategory ||
      offer.category?.toLocaleLowerCase("es") === normalizedCategory;

    return matchesQuery && matchesCategory;
  });
}
