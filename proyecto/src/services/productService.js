import { getSupabase } from "../lib/supabase";

// Servicio para manejar operaciones relacionadas con productos
export const productService = {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from("Productos").select("*");

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  // Obtener un producto por su ID
  async getProductById(id) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("Productos")
        .select("*")
        .eq("ID_prod", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      throw error;
    }
  },

  // Añadir un nuevo producto
  async addProduct(product) {
    try {
      const supabase = getSupabase();

      // Obtener el ID más alto para generar uno nuevo
      const { data: products, error: fetchError } = await supabase
        .from("Productos")
        .select("ID_prod")
        .order("ID_prod", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      // Generar nuevo ID
      const newId = products.length > 0 ? products[0].ID_prod + 1 : 1;

      // Insertar nuevo producto
      const { data, error } = await supabase
        .from("Productos")
        .insert([
          {
            ID_prod: newId,
            nombre: product.name,
            categoria: product.category,
            precio: product.price,
            stock_act: product.stock,
            stock_min: product.stock_min || 5, // Valor por defecto
          },
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Error al añadir producto:", error);
      throw error;
    }
  },

  // Actualizar el stock de un producto
  async updateProductStock(id, newStock) {
    try {
      const supabase = getSupabase();

      // Verificar si el producto existe
      const { error: fetchError } = await supabase
        .from("Productos")
        .select("*")
        .eq("ID_prod", id)
        .single();

      if (fetchError) {
        if (fetchError.code === "PGRST116") {
          return { success: false, message: "Producto no encontrado" };
        }
        throw fetchError;
      }

      // Actualizar el stock
      const { data, error } = await supabase
        .from("Productos")
        .update({ stock_act: newStock })
        .eq("ID_prod", id)
        .select();

      if (error) throw error;

      return { success: true, product: data[0] };
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      throw error;
    }
  },

  // Verificar si un producto existe por ID
  async productExists(id) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("Productos")
        .select("ID_prod")
        .eq("ID_prod", id);

      if (error) throw error;
      return data.length > 0;
    } catch (error) {
      console.error("Error al verificar producto:", error);
      throw error;
    }
  },
};
