// Funciones de utilidad para manejar el almacenamiento local

// Obtener todos los productos del localStorage
export const getProducts = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

// Guardar todos los productos en localStorage
export const saveProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

// Generar un ID único para un nuevo producto
export const generateProductId = () => {
  const products = getProducts();
  if (products.length === 0) return "001";

  // Encontrar el ID más alto y aumentarlo en 1
  const highestId = products.reduce((max, product) => {
    const id = Number.parseInt(product.id, 10);
    return id > max ? id : max;
  }, 0);

  // Formatear el ID con ceros a la izquierda
  return (highestId + 1).toString().padStart(3, "0");
};

// Añadir un nuevo producto
export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: generateProductId(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

// Actualizar el stock de un producto existente
export const updateProductStock = (id, newStock) => {
  const products = getProducts();
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return { success: false, message: "Producto no encontrado" };
  }

  products[productIndex].stock = Number.parseInt(newStock, 10);
  saveProducts(products);
  return { success: true, product: products[productIndex] };
};

// Verificar si un producto existe por ID
export const productExists = (id) => {
  const products = getProducts();
  return products.some((p) => p.id === id);
};
