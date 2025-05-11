import { getSupabase } from "../lib/supabase";

// Servicio para manejar operaciones relacionadas con usuarios
export const userService = {
  // Verificar credenciales de usuario
  async login(username, password) {
    try {
      const supabase = getSupabase();

      // Consultar el usuario por nombre de usuario
      const { data, error } = await supabase
        .from("Usuarios")
        .select("*")
        .eq("usuario", username)
        .single();

      if (error) {
        console.error("Error al buscar usuario:", error);
        return { success: false, error: "Error al verificar credenciales" };
      }

      // Si no se encuentra el usuario
      if (!data) {
        return { success: false, error: "Usuario no encontrado" };
      }

      // Verificar la contraseña
      // Nota: En un entorno de producción, las contraseñas deberían estar hasheadas
      if (data.contrasenha === password) {
        return {
          success: true,
          user: {
            username: data.usuario,
            name: data.nombre,
            role: data.rol,
          },
        };
      } else {
        return { success: false, error: "Contraseña incorrecta" };
      }
    } catch (error) {
      console.error("Error en el servicio de login:", error);
      return { success: false, error: "Error en el servidor" };
    }
  },

  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from("Usuarios").select("*");

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },

  // Obtener un usuario por su nombre de usuario
  async getUserByUsername(username) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("Usuarios")
        .select("*")
        .eq("usuario", username)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  },
};
