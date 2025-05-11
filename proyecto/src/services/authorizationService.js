import { getSupabase } from "../lib/supabase";

// Servicio para manejar operaciones relacionadas con autorizaciones
export const authorizationService = {
  // Obtener todas las autorizaciones
  async getAllAuthorizations() {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from("Autorizaciones").select(`
          *,
          Usuarios (nombre, usuario),
          Productos (nombre)
        `);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error al obtener autorizaciones:", error);
      throw error;
    }
  },

  // Crear una nueva solicitud de autorización
  async createAuthorizationRequest(userId, productId, initialStock, newStock) {
    try {
      const supabase = getSupabase();

      // Obtener el ID más alto para generar uno nuevo
      const { data: authorizations, error: fetchError } = await supabase
        .from("Autorizaciones")
        .select("ID_auth")
        .order("ID_auth", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      // Generar nuevo ID
      const newId =
        authorizations.length > 0 ? authorizations[0].ID_auth + 1 : 1;

      // Insertar nueva autorización
      const { data, error } = await supabase
        .from("Autorizaciones")
        .insert([
          {
            ID_auth: newId,
            usuario: userId,
            ID_prod: productId,
            stock_inicial: initialStock,
            nuevo_stock: newStock,
          },
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Error al crear solicitud de autorización:", error);
      throw error;
    }
  },

  // Eliminar una autorización
  async deleteAuthorization(id) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from("Autorizaciones")
        .delete()
        .eq("ID_auth", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error al eliminar autorización:", error);
      throw error;
    }
  },
};
