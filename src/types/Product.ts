// src/types/Product.ts
export interface Product {
    codigo_producto: string;
    marca: string;
    codigo_marca: string;
    nombre: string;
    stock: number;
    valor: number;
    foto?: string;  // 'foto' puede ser opcional
    categoria: string;
    fecha?: string;  // Fecha también podría ser opcional
}