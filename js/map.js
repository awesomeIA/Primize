
import { supabase, isSupabaseConfigured } from "./supabase-client.js";

/**
 * Obtiene las ofertas visibles públicamente desde Supabase.
 * La vista active_map_offers ya filtra las ofertas vigentes
 * de comercios verificados.
 */
export async function getActiveOffers() {
  if (!isSupabaseConfigured) {
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
 * Si no se especifican filtros, devuelve todas las ofertas públicas.
 */
export async function searchOffers({
  query = "",
  category = ""
} = {}) {
  let offers = await getActiveOffers();

  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const normalizedCategory = category.trim().toLocaleLowerCase("es");

  if (normalizedQuery) {
    offers = offers.filter((offer) => {
      const searchableText = [
        offer.title,
        offer.category,
        offer.store_name,
        offer.store_address
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("es");

      return searchableText.includes(normalizedQuery);
    });
  }

  if (normalizedCategory) {
    offers = offers.filter(
      (offer) =>
        offer.category?.toLocaleLowerCase("es") === normalizedCategory
    );
  }

  return offers;
}

