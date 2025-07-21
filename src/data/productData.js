import { db } from './firebase.js';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import ProductModel from '../models/ProductModel.js';

// Sistema de IDs secuenciales
let nextId = 1;

const initializeNextId = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const existingIds = [];
    querySnapshot.forEach((doc) => {
      const id = parseInt(doc.id);
      if (!isNaN(id)) {
        existingIds.push(id);
      }
    });
    nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  } catch (error) {
    nextId = 1;
  }
};

export const getAllProducts = async () => {
  const resultadoConsulta = await getDocs(collection(db, 'products'));
  const listaProductos = [];
  
  resultadoConsulta.forEach((documento) => {
    const producto = ProductModel.fromFirebaseData(documento.id, documento.data());
    listaProductos.push(producto);
  });
  
  listaProductos.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  
  return listaProductos;
};

export const getProductById = async (id) => {
  const referenciaDocumento = doc(db, 'products', id.toString());
  const documentoEncontrado = await getDoc(referenciaDocumento);
  
  if (documentoEncontrado.exists()) {
    return ProductModel.fromFirebaseData(documentoEncontrado.id, documentoEncontrado.data());
  } else {
    return null;
  }
};

export const createProduct = async (datosProducto) => {
  if (nextId === 1) {
    await initializeNextId();
  }
  
  const nuevoId = nextId.toString();
  const referenciaDocumento = doc(db, 'products', nuevoId);
  
  await setDoc(referenciaDocumento, datosProducto);
  
  nextId++;
  return nuevoId;
};

export const updateProduct = async (id, nuevosPrecios) => {
  const referenciaDocumento = doc(db, 'products', id.toString());
  await updateDoc(referenciaDocumento, nuevosPrecios);
  return id;
};

export const deleteProduct = async (id) => {
  const referenciaDocumento = doc(db, 'products', id.toString());
  await deleteDoc(referenciaDocumento);
  return id;
};
